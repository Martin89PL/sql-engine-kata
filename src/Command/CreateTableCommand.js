import Table from '../Model/Table';
import Schema from '../Model/Schema';
import FieldType from '../Validator/FieldType';

export default class CreateTableCommand {
    constructor(input) {
        this.input = input;
    }

    execute() {
        try {
            const tableName = this.getTableName();
            const tableSchema = this.createTableSchema();
            const table = this.createTable(tableName, tableSchema);
            this.database.set(tableName, table);
        } catch (e) {
            throw new Error(`Error when creating table`);
        }
        this.consoleOutput()
        return true;
    }

    consoleOutput() {
        console.log(`Query OK, 0 rows affected`);
    }

    createTableSchema() {
        const fields = this.getFields();
        const schema = new Schema();
        fields.forEach((element) => {
            const parsed = this.parseTypeAndValue(element)
            schema.set(parsed.name, parsed.type);
        });
        return schema;
    }

    parseTypeAndValue(input) {
        const [name, type] = input.trim().split(/\s+/g);
        if(FieldType.valid(type)) {
            return {name, type} 
        }
        throw new Error(`Invalid field type! ${type}`);
    }

    createTable(tableName, Schema) {
        return new Table(tableName, Schema);
    }

    getTableName() {
        return (this.input.split(" ", 3))[2];
    }

    getFields() {
        const fields = /(?<=\()(.*?)(?=\))/.exec(this.input);
        const parsed = fields[0].split(',');
        return parsed;
    }

    setDatabase(database){
        this.database = database;
        return this;
    }
}