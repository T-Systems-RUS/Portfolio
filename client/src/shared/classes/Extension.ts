import {IModel} from '../interfaces/IModel';

export class Extension {

    /**
     * Get specific property from each object in Array
     * and returns list of unique values
     * @static
     * @param {Object[]} source array of objects to extract from
     * @param {string} key Property name
     * @returns array of strings
     * @memberof Extension
     */

    public static getUniqueValues(source: IModel[] ,key: string):string[] {
        const uniqueSet=new Set(source.map(item=> item[key]).filter(i => i));

        return Array.from(uniqueSet).sort();
    }
  }
