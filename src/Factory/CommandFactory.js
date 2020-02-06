import CreateTableCommand from '../Command/CreateTableCommand';
import ShowCreateTable from '../Command/ShowTableCommand';

export default class CommandFactory {
    create (input) {
        if(/^CREATE TABLE/g.test(input)) {
            return new CreateTableCommand(input);
        }
        if(/^SHOW CREATE TABLE/g.test(input)) {
            return new ShowCreateTable(input);
        }
        throw new Error('Unsupported command!');
    }
}