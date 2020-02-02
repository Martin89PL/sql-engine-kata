export default class CreateTableCommand {
    constructor(input) {
        this.input = input;
    }

    setDatabase(database){
        this.database = database;
    }

    execute() {
        const fields = this.getFields();
        this.database.push(this.getTableName());
    }

    getTableName() {
        return (this.input.split(" ", 3))[2];
    }

    getFields() {
        return /(?<=\()(.*?)(?=\))/.exec(this.input);
    }
}