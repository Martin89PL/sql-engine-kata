import CreateCommand from './CreateCommand';

export default class CommandFactory {
    create (input) {
        if(/CREATE/g.test(input)) {
            return new CreateCommand(input);
        }
        throw new Error('Unsupported command!');
    }
}