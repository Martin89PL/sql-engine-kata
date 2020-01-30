'use strict';

export default class SqlEngine {
    handleQuery(queryString) {        
      /**
        * This is a good place to start implementing your solution
        * Good luck!
        * 
        * Remember to ask anything mentors if anything is unclear or if you need help
        * there are no stupid questions, we are here you you <3
        */

        console.log(this.normalizeQuery(queryString));
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
}
