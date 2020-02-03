import CreateTableCommand from '../../src/Command/CreateTableCommand';
import Schema from '../../src/Model/Schema';

describe('#CommandTableCommand', () => {  
  test('get table name from command', () => {
        const instance = new CreateTableCommand('CREATE TABLE dojers');
        expect(instance.getTableName()).toEqual('dojers');
    });

  test('get table schema', () => {
        const input = `CREATE TABLE dojoers (id INTEGER,first_name STRING,last_name STRING,unit_tests_written NUMBER,code_coverage NUMBER,photos_agreed BOOLEAN,last_dojo_date DATE)`;

        const instance = new CreateTableCommand(input);

        expect(instance.getFields()).toEqual([ 'id INTEGER','first_name STRING','last_name STRING','unit_tests_written NUMBER','code_coverage NUMBER','photos_agreed BOOLEAN','last_dojo_date DATE' ])
    });

    test('create Schema', () => {
        const input = `CREATE TABLE dojoers (id INTEGER,first_name STRING,last_name STRING,unit_tests_written NUMBER,code_coverage NUMBER,photos_agreed BOOLEAN,last_dojo_date DATE)`;
        const instance = new CreateTableCommand(input);
        expect(instance.createTableSchema() instanceof Schema).toEqual(true);
    });

    test('created Schema has expect values', () => {
        const input = `CREATE TABLE dojoers (id INTEGER,first_name STRING,last_name STRING,unit_tests_written NUMBER,code_coverage NUMBER,photos_agreed BOOLEAN,last_dojo_date DATE)`;
        const instance = new CreateTableCommand(input);
        const schema = instance.createTableSchema();
        
        expect(schema.get('id')).toEqual('INTEGER');
        expect(schema.get('first_name')).toEqual('STRING');
        expect(schema.get('last_name')).toEqual('STRING');
        expect(schema.get('unit_tests_written')).toEqual('NUMBER');
        expect(schema.get('code_coverage')).toEqual('NUMBER');
        expect(schema.get('photos_agreed')).toEqual('BOOLEAN');
        expect(schema.get('last_dojo_date')).toEqual('DATE');
    });
});