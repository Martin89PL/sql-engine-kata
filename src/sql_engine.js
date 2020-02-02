'use strict';

import CommandFactory from './CommandFactory';

export default class SqlEngine {

    constructor() {
        this.database = [];
        this.CommandFactory = new CommandFactory();
    }

    handleQuery(queryString) {
        
        try {
            const Command = this.checkCommand(queryString);
            Command.setDatabase(this.database);
            Command.execute();
        } catch (e) {
            console.log(e.message)
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
}
