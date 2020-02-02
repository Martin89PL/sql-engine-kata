import CreateCommand from './CreateCommand';

export default class CommandResolver {
    resolve (input) {
        if(/CREATE/g.test(input)) {
            return new CreateCommand(input);
        }
        throw new Error('unsupported command!');
    }
}