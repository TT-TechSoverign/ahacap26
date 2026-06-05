import os
import random
import asyncio
import re
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from starlette.requests import Request

# Configure basic logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("api")

SENSITIVE_PATTERNS = [
    (r'(email=)([^&]+)', r'\1[REDACTED]'),
    (r'(password=)([^&]+)', r'\1[REDACTED]'),
    (r'(token=)([^&]+)', r'\1[REDACTED]'),
    (r'(phone=)([^&]+)', r'\1[REDACTED]'),
    (r'(card_number=)([^&]+)', r'\1[REDACTED]'),
    (r'(cvc=)([^&]+)', r'\1[REDACTED]'),
]

class LogSanitizerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # 1. Log Request (Sanitized)
        raw_query = request.url.query
        sanitized_query = raw_query
        for pattern, replacement in SENSITIVE_PATTERNS:
            sanitized_query = re.sub(pattern, replacement, sanitized_query, flags=re.IGNORECASE)

        # Note: We don't read body here to avoid consuming stream.
        # For full body sanitization, we'd need a more complex wrapper.
        # This covers URL params which are often leaked.

        logger.info(f"{request.method} {request.url.path}?{sanitized_query}")

        try:
            response = await call_next(request)
            return response
        except Exception as e:
            import traceback
            traceback.print_exc()
            logger.error(f"CRITICAL API ERROR: {e}")
            raise e

class ChaosMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        if os.getenv("CHAOS_MODE", "false").lower() == "true":
            # 10% chance of 500 Error
            if random.random() < 0.1:
                return Response("Chaos Monkey Strike!", status_code=500)
            # 500ms Latency
            await asyncio.sleep(0.5)
        response = await call_next(request)
        return response

class HeaderMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        path = request.url.path
        if path.startswith("/api/v1/admin") or path.startswith("/api/v1/payments") or path.startswith("/api/v1/maintenance"):
            response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        else:
            response.headers["Cache-Control"] = "public, max-age=60, s-maxage=60, stale-while-revalidate=30"
        return response
