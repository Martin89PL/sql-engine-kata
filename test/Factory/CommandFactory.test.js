import CommandFactory from "../../src/Factory/CommandFactory";
import CreateTableCommand from "../../src/Command/CreateTableCommand";
import ShowCreateTable from '../../src/Command/ShowTableCommand';

describe('#CommandFactory', () => {
    let instance = null;
    beforeEach( () => {
        instance = new CommandFactory();
    });

    test('recognize CREATE TABLE COMMAND', () => {
        expect(instance.create('CREATE TABLE') instanceof CreateTableCommand).toEqual(true);
    })

    test('recognize SHOW CREATE TABLE COMMAND', () => {
        expect(instance.create('SHOW CREATE TABLE') instanceof ShowCreateTable).toEqual(true);
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