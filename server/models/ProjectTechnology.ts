import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import {Project} from './Project';
import {Technology} from './Technology';

@Table({
  tableName: 'project_technology'
})
export class ProjectTechnology extends Model<ProjectTechnology> {

  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Technology)
  @Column
  technologyId: number;
}
