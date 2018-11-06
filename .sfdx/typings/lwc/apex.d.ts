declare module "@salesforce/apex" {
    /**
     * Apex-related services.
     */
    export interface ApexServices {
        refreshApex: () => Promise<any>;
    }
    /**
     * An Apex method. May be invoked imperatively or used with @wire.
     */
    export type ApexMethod = () => Promise<any>;
    /**
     * Module resolver for @salesforce/apex/* that provides access to force.com Apex.
     *
     * Supported module identifiers:
     * 1. Service capabilities, like refresh: @salesforce/apex
     * 2. Wire adapter and imperative function of an Apex method in namespace: @salesforce/apex/Namespace.ClassName.methodName
     * 3. Wire adapter and imperative function of an Apex method in default ('c') namespace: @salesforce/apex/ClassName.methodName
     *
     * @param resource The module identifier. Eg "@salesforce/apex/ClassName.methodName".
     * @param resource The resource name; that is, the value after "@salesforce/apex/".
     * @returns {*} The value of the requested resource.
     */
    export default function apexResolver(resource: string): ApexServices | ApexMethod | undefined;
    
}
