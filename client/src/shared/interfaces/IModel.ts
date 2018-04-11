/**
 * Base interface for generic methods
 * avoid usage of any
 */
export interface IModel {
  [key: string]: any;
  active: boolean;
  id:string;
}
