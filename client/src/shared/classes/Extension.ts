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

    public static getUniqueValues(source: any[] ,key: string):string[] {
        const uniqueSet=new Set(source.map(item=> item[key] ));
        
        return Array.from(uniqueSet).sort();
    }

    public static getKeys(source:any){
        const keys = [];
        for (const key in source) {
            keys.push(key);
        }

        return keys.sort();
    }
  }
  