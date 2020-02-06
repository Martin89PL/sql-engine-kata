import FieldTypes from '../Enum/FieldTypes';

export default class FieldType {
    static valid(value) {
        return Object.values(FieldTypes).includes(value);
    }
}