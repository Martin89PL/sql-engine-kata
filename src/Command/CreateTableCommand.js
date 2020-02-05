import Table from '../Model/Table';
import Schema from '../Model/Schema';
import FieldType from '../validator/fieldType';

export default class CreateTableCommand {
    constructor(input) {
        this.input = input;
    }

    execute() {
        const tableName = this.getTableName();
        const tableSchema = this.createTableSchema();
        const table = this.createTable(tableName, tableSchema);
        this.database.set(tableName, table);
    }

    createTableSchema() {
        const fields = this.getFields();
        const schema = new Schema();
        fields.forEach((e) => {
            let typeAndValue = e.split(/\s+/g); // @TODO filter types
            schema.set(typeAndValue[0], typeAndValue[1]);
        });
        return schema;
    }

    parseTypeAndValue(input) {
        const [value, type] = input.split(/\s+/g);
        if(FieldType.valid(type)) {
            return {value, type} 
        }
        throw new Error('Invalid field type!');
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