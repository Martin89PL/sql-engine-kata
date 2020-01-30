import readline from 'readline';
import { EventEmitter } from 'events';

/**
 * An absraction on CLI
 * Stolen from firemark, defiled by dmazur
 * 
 * From the roguelike dojo (check it out!):
 * https://github.com/CodingDojoSilesia/roguelike
 */
export default class CLI extends EventEmitter {

  constructor() {
    super();
    this._initRL();
  }

  // Below methods are neccesary to run prompt in console
  // plz don't edit because firemark will be angry
  run() {
    this.rl.prompt();
  }

  log(s) {
    console.log(s);
  }

  table(s) {
    console.table(s);
  }

  /**
   * @private
   */
  _initRL() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    });

    this.rl
      .on('line', this._onLine.bind(this))
      .on('close', this._onClose.bind(this))
    ;
  }
  
  /**
   * @private 
   */
  _parseLine(line) {
    const trimmedLine = line.trim();
    this.emit('readline', trimmedLine);
  }

  /**
   * @private 
   */
  _onLine(line) {
    this._parseLine(line);
    this.rl.prompt();
  }
  
  /**
   * @private 
   */
  _onClose() {
    this.log('Have a great day!');
    process.exit(0);
  }

}