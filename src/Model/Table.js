export default class Table {
    /**
     * @param {string} name 
     * @param {Schema} schema 
     */
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;
    }
}