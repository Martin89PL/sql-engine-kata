import FieldTypes from '../../src/validator/FieldType';

describe('#fieldTypes validator', () => {
    test('valid field type', () => {
        expect(FieldTypes.valid('INTEGER')).toEqual(true);
        expect(FieldTypes.valid('BOOLEAN')).toEqual(true);
        expect(FieldTypes.valid('STRING')).toEqual(true);
        expect(FieldTypes.valid('DATE')).toEqual(true);
        expect(FieldTypes.valid('NUMBER')).toEqual(true);
        expect(FieldTypes.valid('INVALID')).toEqual(false);
    })
});