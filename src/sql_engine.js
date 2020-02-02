'use strict';

import CommandResolver from './CommandResolver';

export default class SqlEngine {

    constructor() {
        this.database = [];
        this.commandResolver = new CommandResolver();
    }

    handleQuery(queryString) {        
        const Command = this.checkCommand(queryString);
        Command.setDatabase(this.database);
        Command.execute();
        console.log(this.database);
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
        return this.commandResolver.resolve(input);
    }
}
