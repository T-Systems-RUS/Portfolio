import {IModel} from './IModel';
import {IProject} from './IProject';
import {IDomain} from './IDomain';

export interface ICustomer extends IModel{
  name: string;
  domain: IDomain;
  projects: IProject[];
}
