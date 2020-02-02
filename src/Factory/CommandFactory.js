import CreateTableCommand from '../Command/CreateTableCommand';

export default class CommandFactory {
    create (input) {
        if(/CREATE TABLE/g.test(input)) {
            return new CreateTableCommand(input);
        }
        throw new Error('Unsupported command!');
    }
}