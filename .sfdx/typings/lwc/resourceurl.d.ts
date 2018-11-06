declare module '@salesforce/resourceurl' {
    /**
     * Module resolver for @salesforce/resourceUrl/* that provides access to force.com static resources.
     *
     * Supported module identifiers:
     * 1. static resource url: @salesforce/resourceUrl/*.
     *
     * @param resource The module identifier.
     * @returns The value of the requested resource.
     */
    export default function resourceUrlResolver(resource: string): string | undefined;
}
