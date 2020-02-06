import Db from '../../src/Model/Db';
import Table from '../../src/Model/Table';
import Schema from '../../src/Model/Schema';

describe('#CommandShowCreateTable', () => {
  let dbInstance = null;
  beforeEach(() => {
    dbInstance = new Db();
    // set table to db
    let customSchema = new Schema();
    customSchema.set('id', 'INTEGER');
    customSchema.set('name', 'STRING');
    let customTable = new Table('dojers', customSchema);
    dbInstance.set('dojers', customTable);
  });


  test('execute show create table command', () => {
    expect(true).toBe(true);
  });

});