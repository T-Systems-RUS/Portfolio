import Vue from 'vue';
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

  public static checkFIltersInProjects(key: string, itemsToCheck: IModel[], projects: IProject[]) {

    if (key === this.mapNameToProperty(Types.CUSTOMER)) {
      const newArray = [].concat.apply([], projects.map(project => project[key]));

      itemsToCheck.forEach(item => item.active =
        newArray.map((model: IModel) => model.id).indexOf(item.id) > -1);
    } else if (key === this.mapNameToProperty(Types.PRODUCTION_LINE)) {
      itemsToCheck.forEach(item => item.active =
        projects.map(project => project['program'].lineId).indexOf(item.id) > -1);
    } else {
      itemsToCheck.forEach(item => item.active =
        projects.map(project => project[key].id).indexOf(item.id) > -1);
    }


    return itemsToCheck;
  }

  /**
   * Create two way mapper Getter <-> Mutation for computed property
   * @param {string} getter
   * @param {string} mutation
   * @returns {any} Mapper for computed property
   */
  static mapTwoWay<T>(getter: string, mutation: string) {
    return {
      get(this: Vue): T {
        return this.$store.getters[getter];
      },
      set(this: Vue, value: T) {
        this.$store.commit(mutation, value);
      }
    };
  }

  /**
   * Sort by field function
   * @param {string} field Field to sort for
   * @param {boolean} reverse Reverse sorting direction
   * @param {boolean} ignoreCase case for strings
   * @returns {(a: {[p: string]: {}}, b: {[p: string]: {}}) => (number | number)} Sort function
   */
  static sortByField<T extends object>(field: keyof T, reverse = false, ignoreCase = false) {
    return (a: T, b: T) => {
      const aValue = Util.getNestedProperty(a as { [key: string]: {} }, field);
      const bValue = Util.getNestedProperty(b as { [key: string]: {} }, field);

      const aField = ignoreCase ? aValue.toString().toLowerCase() : aValue;
      const bField = ignoreCase ? bValue.toString().toLowerCase() : bValue;

      return reverse ?
        Util.compareValues(aField, bField) :
        Util.compareValues(bField, aField);
    };
  }

  private static getNestedProperty(object: { [key: string]: {} }, property: string): {} {
    if (typeof object === 'undefined') {
      return false;
    }
    const index = property.indexOf('.');
    if (index > -1) {
      return Util.getNestedProperty(object[property.substring(0, index)], property.substr(index + 1));
    }
    return object[property];
  }

  private static compareValues(a: {}, b: {}): number {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
}
