import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import {Project} from './Project';
import {Customer} from './Customer';
import {Tables} from '../sequelize/Tables';

@Table({
  tableName: Tables.PROJECT_CUSTOMER
})
export class ProjectCustomer extends Model<ProjectCustomer> {

  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Customer)
  @Column
  customerId: number;
}
