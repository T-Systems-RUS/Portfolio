import {IModel} from '../interfaces/IModel';
import {IProject} from '../interfaces/IProject';
import {Types} from '../../store/modules/projects/constant-types';

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

  public static checkFIltersInProjects(key:string, itemsToCheck:IModel[], projects:IProject[]) {

    if(key === this.mapNameToProperty(Types.CUSTOMER)) {
      const newArray = [].concat.apply([], projects.map(project => project[key]));

      itemsToCheck.forEach(item => item.active =
        newArray.map((model: IModel)=> model.id).indexOf(item.id) > -1 );
    } else if(key === this.mapNameToProperty(Types.PRODUCTION_LINE)) {
      itemsToCheck.forEach(item => item.active =
        projects.map(project => project['program'].lineId).indexOf(item.id)>-1);
    } else {
      itemsToCheck.forEach(item => item.active =
        projects.map(project => project[key].id).indexOf(item.id)>-1);
    }



    return itemsToCheck;
  }
}
