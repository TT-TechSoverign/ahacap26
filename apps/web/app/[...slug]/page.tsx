import { builder } from '@builder.io/sdk';
import { RenderBuilderContent } from '@builder.io/sdk-react';
import { builderConfig } from '../../lib/builder';
import { registerComponents } from '../../components/builder-registry';

// Initialize registry
registerComponents();

interface PageProps {
    params: {
        slug: string[];
    };
}

export default async function Page({ params }: PageProps) {
    // Builder.io expects the url path to match
    const urlPath = '/' + (params.slug?.join('/') || '');

    const content = await builder
        .get('page', {
            userAttributes: {
                urlPath: urlPath,
            },
            apiKey: builderConfig.apiKey,
        })
        .toPromise();

    return (
        <>
            {/* 
        Render content if found. 
        If not found, Builder will render null (or we can handle 404).
        Note: We are using the newer SDK-React capability or fallback to BuilderComponent if needed.
        The '@builder.io/sdk-react' package is designed for App Router.
      */}
            {content ? (
                <RenderBuilderContent model="page" content={content} apiKey={builderConfig.apiKey!} />
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
                    {/* Fallback 404 View - In production this should trigger meaningful 404 */}
                    <h1 className="text-2xl font-bold uppercase tracking-widest">Page Not Found</h1>
                    <p className="font-mono text-sm mt-2">The requested path {urlPath} does not exist in the CMS.</p>
                </div>
            )}
        </>
    );
}
