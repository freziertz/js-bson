function alphabetize(str: string) {
  return str
    .split('')
    .sort()
    .join('');
}

/**
 * A class representation of the BSON RegExp type.
 */
export default class BSONRegExp {
  /**
   * Create a RegExp type
   *
   * @param {string} pattern The regular expression pattern to match
   * @param {string} options The regular expression options
   */
  private pattern: string;
  private options: string;
  public _bsontype!: { value: 'BSONRegExp' };
  constructor(pattern: string, options: string) {
    // Execute
    this.pattern = pattern || '';
    this.options = options ? alphabetize(options) : '';

    // Validate options
    for (let i = 0; i < this.options.length; i++) {
      if (
        !(
          this.options[i] === 'i' ||
          this.options[i] === 'm' ||
          this.options[i] === 'x' ||
          this.options[i] === 'l' ||
          this.options[i] === 's' ||
          this.options[i] === 'u'
        )
      ) {
        throw new Error(`The regular expression option [${this.options[i]}] is not supported`);
      }
    }
  }

  /**
   * @ignore
   */
  toExtendedJSON() {
    return { $regularExpression: { pattern: this.pattern, options: this.options } };
  }

  /**
   * @ignore
   */
  static fromExtendedJSON(doc: any) {
    return new BSONRegExp(
      doc.$regularExpression.pattern,
      doc.$regularExpression.options
        .split('')
        .sort()
        .join('')
    );
  }
}

Object.defineProperty(BSONRegExp.prototype, '_bsontype', { value: 'BSONRegExp' });
module.exports = BSONRegExp;