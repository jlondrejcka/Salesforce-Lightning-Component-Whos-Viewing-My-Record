declare module "@salesforce/label" {
    /**
     * Module resolver for @salesforce/label/* that provides access to labels.
     *
     * Supported module identifiers:
     * 1. label: @salesforce/label/*.
     *
     * @param resource The module identifier.
     * @returns The value of the requested resource.
     */
    export default function labelResource(resource: string): string | undefined;
    
}
