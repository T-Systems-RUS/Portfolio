import {IModel} from './IModel';
import {IProject} from './IProject';

export interface ITechnology extends IModel {
  name: string;
  domain: string;
  active: boolean;
  image: string;
  version: string;
  projects: IProject[];

  // TODO
  // employees: IEmployee[];
}


