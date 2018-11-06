declare module "@salesforce/schema" {
    /**
     * Identifier for an object.
     */
    export interface ObjectId {
        /** The object's API name. */
        objectApiName: string;
    }
    /**
     * Identifier for an object's field.
     */
    export interface FieldId {
        /** The field's API name. */
        fieldApiName: string;
        /** The object's API name. */
        objectApiName: string;
    }
    /**
     * Module resolver for @salesforce/schema/* that provides access to force.com SObjects and field identifiers.
     *
     * Supported module identifiers:
     * 1. SObject schema: @salesforce/schema/[objectApiName]
     * 2. Field schema: @salesforce/schema/[objectApiName].[fieldApiName]
     * 3. Spanning field schema: @salesforce/schema/[objectApiName].[relationshipApiName+].[fieldApiName]
     *
     * @param resource The module identifier.
     * @returns The value of the requested resource.
     */
    export default function schemaResolver(resource: string): FieldId | ObjectId | undefined;
    
}
