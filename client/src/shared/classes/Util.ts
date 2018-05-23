export class Util {
  public static getApiUrl(url: string) {
    return `/api/${url}`;
  }

  /**
   * maps name of filter header to property name of project opject
   * like Production line -> line, Customers -> customers
   * @param {string} name
   * @returns {string}
   */
  public static mapNameToProperty(name: string) {
    const words = name.trim().split(/\s+/);
    // if only one word in filter header -> only lowercase
    // if 2 words takes last word maps to project property
    return words.length > 1 ? words[1].toLowerCase() : words[0].toLowerCase();
  }
}
