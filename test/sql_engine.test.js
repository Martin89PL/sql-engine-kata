import SqlEngine from "../src/sql_engine";

describe('SqlEngine', () => {
    let instance = null;
    beforeEach( () => {
        instance = new SqlEngine();
    });

    describe('#normalizeQuery', () => {
        test('transforms all letters that are not strings to lowercase', () => {
            const TEST_QUERY = "INSERT INTO dojoers (1, 'Jarek', 'Ptaszyński', 1337, 0.42, TRUE, '2019-11-28 18:00')";
            const EXPECTED = "insert into dojoers (1, 'Jarek', 'Ptaszyński', 1337, 0.42, true, '2019-11-28 18:00')";

            expect(instance.normalizeQuery(TEST_QUERY)).toEqual(EXPECTED);
        });
        
        test('reduces all white spaces to single space', () => {
            const TEST_QUERY = "insert into     dojoers (1, \n 'Jarek', 'Ptaszyński', 1337, 0.42, \n true, '2019-11-28 18:00')";
            const EXPECTED = "insert into dojoers (1, 'Jarek', 'Ptaszyński', 1337, 0.42, true, '2019-11-28 18:00')";

            expect(instance.normalizeQuery(TEST_QUERY)).toEqual(EXPECTED);
        });
    });
});
