declare module '@salesforce/contentasseturl' {
    /**
     * Module resolver for @salesforce/contentAssetUrl/* that provides access to force.com content assets.
     *
     * Supported module identifiers:
     * 1. Content Asset URL: @salesforce/contentAssetUrl/*.
     *
     * @param asset The asset name; that is, the value after "@salesforce/contentAssetUrl/".
     * @returns The URL for the requested asset.
     */
    export default function contentAssetUrlResolver(asset: string): string | undefined;
}
