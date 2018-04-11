import {IModel} from './IModel';
import {ILine} from './ILine';
import {IProject} from './IProject';

export interface IProgram extends IModel{
  name: string;
  line: ILine;
  projects: IProject[];
}
