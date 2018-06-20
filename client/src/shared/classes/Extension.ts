import {IModel} from '../interfaces/IModel';
import {ISchedule} from '../interfaces/ISchedule';
import {IRole} from '../interfaces/IRole';

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

  /**
   * Checks if array has element
   * if has removes it if not adds it
   * @param {string[]} source array to be checked
   * @param {string} value to be checked if add or remove from array
   * @returns {(any | string)[] | string[]}
   */
    public static toggleArray(source: string[]=[], value: string) {
      const index = source.indexOf(value);
      return index === -1
        ? [...source, value]
        : source.filter(item => item !== value);
    }

  /**
   * group array by key
   * @param {{}[]} xs source array
   * @param {string} key property of all objects in array
   * @returns {{}}
   */
    public static groupBy(xs: {}[], key: string) {
      return xs.reduce((rv:any, x:any) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }

    public static setScheduleDate(schedules: ISchedule[], property:string, targetId:string, value: Date) {
      schedules.forEach(schedule => {
        if(schedule.employee.id===targetId) schedule[property]=value;
      });

      return schedules;
    }

    public static setScheduleRole(schedules: ISchedule[], targetId:string, role:IRole) {
      schedules.forEach(schedule => {
        if(schedule.employee.id===targetId) {
          schedule.roleId = role.id;
          schedule.role = role;
        }
      });

      return schedules;
    }

    public static setScheduleParticipation(schedules: ISchedule[],  targetId:string, value: number) {
      schedules.forEach(schedule => {
        if(schedule.employee.id===targetId) schedule.participation=value;
      });

      return schedules;
    }
  }
