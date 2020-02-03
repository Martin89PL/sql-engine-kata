'use strict';

import CommandFactory from './Factory/CommandFactory';

export default class SqlEngine {

    constructor() {
        this.database = [];
        this.CommandFactory = new CommandFactory();
    }

    handleQuery(queryString) {
        try {
            this.executeCommand(queryString);
        } catch (e) {
            this.displayError(e)
        }
    }

    normalizeQuery(queryString) {
        const stringRegex = /\'(.*?)\'/g;
        let matches = queryString.match(stringRegex);
        if (!matches) matches = [];

        let resultString = queryString;
        for (const match of matches) {
            resultString = resultString.replace(match, '$$');
        }

        resultString = resultString.toLowerCase();
        resultString = resultString.replace(/(\s)+/g, ' ');

        for (const match of matches) {
            resultString = resultString.replace('$', match);
        }
        return resultString;
    }

    checkCommand(input) {
        return this.CommandFactory.create(input);
    }

    executeCommand(queryString) {
        this.checkCommand(queryString)
        .setDatabase(this.database)
        .execute();
    }

    /**
     * @param {Error} error 
     */
    displayError(error) {
        console.log('-'.repeat(40))
        console.log(`Error in database engine: ${error.message}`)
        console.log('-'.repeat(40))
    }
}
