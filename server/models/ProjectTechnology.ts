import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import {Project} from './Project';
import {Technology} from './Technology';
import {Tables} from '../sequelize/Tables';

@Table({
  tableName: Tables.PROJECT_TECHNOLOGY
})
export class ProjectTechnology extends Model<ProjectTechnology> {

  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Technology)
  @Column
  technologyId: number;
}
