declare module "@salesforce/user" {
    /**
     * Module resolver for @salesforce/user/* that provides access to user data.
     *
     * Supported module identifiers:
     * 1. User Id: @salesforce/user/Id.
     *
     * @param resource The module identifier.
     * @returns The value of the requested resource.
     */
    export default function userResolver(resource: string): string | undefined;
    
}
