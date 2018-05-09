export class Util {
  public static getApiUrl(url: string) {
    return `/api/${url}`;
  }

  public static mapNameToProperty(name: string) {
    const words = name.trim().split(/\s+/);
    return words.length > 1 ? words[1].toLowerCase() : words[0].toLowerCase();
  }
}
