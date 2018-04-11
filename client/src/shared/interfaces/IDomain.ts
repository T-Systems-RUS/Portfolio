import {IModel} from './IModel';
import {IProject} from './IProject';
import {ICustomer} from './ICustomer';

export interface IDomain extends IModel{
  name: string;
  projects: IProject[];
  customers: ICustomer[];
}
