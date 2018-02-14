import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import {Employee} from './Employee';
import {Technology} from './Technology';

@Table
export class EmployeeTechnology extends Model<EmployeeTechnology> {

  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @ForeignKey(() => Technology)
  @Column
  technologyId: number;
}
