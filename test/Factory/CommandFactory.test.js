import CommandFactory from "../../src/Factory/CommandFactory";
import CreateTableCommand from "../../src/Command/CreateTableCommand";

describe('#CommandFactory', () => {
    let instance = null;
    beforeEach( () => {
        instance = new CommandFactory();
    });

    test('recognize CREATE COMMAND', () => {
        expect(instance.create('CREATE TABLE') instanceof CreateTableCommand).toEqual(true);
    })

    test('throw error when not recognize command', () => {
        expect(() => {
            instance.create('TEST')
        }).toThrow(Error);
    })

    test('return correct message when throw error when not recognize command', () => {
        expect(() => {
            instance.create('TEST')
        }).toThrow('Unsupported command!');
    })
});