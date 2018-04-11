import {IModel} from './IModel';
import {IProgram} from './IProgram';

export interface ILine extends IModel{
  name: string;
  programs: IProgram[];
}
