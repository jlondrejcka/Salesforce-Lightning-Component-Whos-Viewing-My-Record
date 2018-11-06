declare module "@salesforce/resource-url" {
    /**
     * Module resolver for @salesforce/resource-url/* that provides access to external resources.
     *
     * Supported module identifiers:
     * 1. static asset url: @salesforce/resource-url/*.
     *
     * @param resource The module identifier.
     * @returns The value of the requested resource.
     */
    export default function resourceUrlResolver(resource: string): string | undefined;
    
}
