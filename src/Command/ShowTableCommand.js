export default class ShowTableCommand {
    constructor(input) {
        this.input = input;
    }

    setDatabase(database){
        this.database = database;
        return this;
    }

    execute() {
        return true;
    }
}