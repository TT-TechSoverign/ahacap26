const fs = require('fs');
const path = require('path');
const http = require('http');

function loadCssFile(fileName) {
    const candidates = [
        path.join(__dirname, fileName),
        path.join(process.cwd(), 'apps/web', fileName),
        path.join(process.cwd(), fileName),
    ];
    for (const p of candidates) {
        if (fs.existsSync(p)) {
            return fs.readFileSync(p, 'utf8').trim();
        }
    }
    return '';
}

const critCss = loadCssFile('critical-head.css');
const critShopCss = loadCssFile('critical-shop.css') || critCss;

const NEEDLE = Buffer.from('<meta charSet="utf-8"/>');
const INJECT = critCss
    ? Buffer.from(`<meta charSet="utf-8"/><style id="ahac-crit">${critCss}</style>`)
    : NEEDLE;
const INJECT_SHOP = critShopCss
    ? Buffer.from(`<meta charSet="utf-8"/><style id="ahac-crit">${critShopCss}</style>`)
    : INJECT;

const origEmit = http.Server.prototype.emit;
http.Server.prototype.emit = function (event, req, res) {
    if (event === 'request' && req && req.headers && req.url && !req.url.startsWith('/_next/')) {
        delete req.headers['accept-encoding'];
        if (res) {
            res._ahacUrl = req.url;
        }
    }
    return origEmit.apply(this, arguments);
};

const origWriteHead = http.ServerResponse.prototype.writeHead;
http.ServerResponse.prototype.writeHead = function (statusCode, statusMessage, headers) {
    const hdrs = typeof statusMessage === 'object' && statusMessage !== null ? statusMessage : headers;
    let ct = this.getHeader('content-type');
    if (!ct && hdrs) {
        for (const k of Object.keys(hdrs)) {
            if (k.toLowerCase() === 'content-type') ct = hdrs[k];
        }
    }
    if (typeof ct === 'string' && ct.includes('text/html') && critCss) {
        this._ahacIsHtml = true;
        this.removeHeader('content-length');
        this.removeHeader('etag');
        if (hdrs && !Array.isArray(hdrs)) {
            for (const k of Object.keys(hdrs)) {
                const lk = k.toLowerCase();
                if (lk === 'content-length' || lk === 'etag') {
                    delete hdrs[k];
                }
            }
        }
    }
    return origWriteHead.apply(this, arguments);
};

function transformFirstHtmlChunk(res, chunk, encoding) {
    if (res._ahacCritChecked || !chunk || !critCss) return chunk;
    const ct = res.getHeader('content-type');
    const isHtml = Boolean(res._ahacIsHtml || (typeof ct === 'string' && ct.includes('text/html')));
    if (!isHtml) {
        if (ct) res._ahacCritChecked = true;
        return chunk;
    }
    if (res.getHeader('content-encoding')) {
        res._ahacCritChecked = true;
        return chunk;
    }
    if (!res.headersSent) {
        res.removeHeader('content-length');
        res.removeHeader('etag');
    }
    const buf = Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(String(chunk), typeof encoding === 'string' ? encoding : 'utf8');
    const idx = buf.indexOf(NEEDLE);
    if (idx === -1) {
        if (buf.indexOf('</head>') !== -1) res._ahacCritChecked = true;
        return chunk;
    }
    res._ahacCritChecked = true;
    const isShop = typeof res._ahacUrl === 'string' && res._ahacUrl.startsWith('/shop');
    return Buffer.concat([
        buf.subarray(0, idx),
        isShop ? INJECT_SHOP : INJECT,
        buf.subarray(idx + NEEDLE.length),
    ]);
}

const origWrite = http.ServerResponse.prototype.write;
http.ServerResponse.prototype.write = function (chunk, encoding, cb) {
    if (!this._ahacCritChecked && chunk) {
        const nextChunk = transformFirstHtmlChunk(this, chunk, encoding);
        if (nextChunk !== chunk) {
            if (typeof encoding === 'function') {
                return origWrite.call(this, nextChunk, encoding);
            }
            return origWrite.call(this, nextChunk, cb);
        }
    }
    return origWrite.apply(this, arguments);
};

const origEnd = http.ServerResponse.prototype.end;
http.ServerResponse.prototype.end = function (chunk, encoding, cb) {
    if (!this._ahacCritChecked && chunk && typeof chunk !== 'function') {
        const nextChunk = transformFirstHtmlChunk(this, chunk, encoding);
        if (nextChunk !== chunk) {
            if (typeof encoding === 'function') {
                return origEnd.call(this, nextChunk, encoding);
            }
            return origEnd.call(this, nextChunk, cb);
        }
    }
    return origEnd.apply(this, arguments);
};

if (require.main === module) {
    const entryCandidates = [
        path.join(process.cwd(), 'server.js'),
        path.join(process.cwd(), 'apps/web/server.js'),
    ];
    for (const entry of entryCandidates) {
        if (fs.existsSync(entry)) {
            console.log(`[start-prod] Loaded ${critCss.length}B critical CSS; starting ${entry}`);
            require(entry);
            return;
        }
    }
    throw new Error('[start-prod] Next.js standalone server.js not found');
}

module.exports = { critCssLen: critCss.length };
