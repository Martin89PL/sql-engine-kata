import FieldTypes from '../enum/fieldTypes';

export default class FieldType {
    static valid(value) {
        return Object.values(FieldTypes).includes(value);
    }
}