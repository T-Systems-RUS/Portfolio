import {Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {Customer} from './Customer';
import {Project} from './Project';
import {Tables} from '../sequelize/Tables';

@Scopes({
  withProjects: {
    include: [() => Project ]
  },
  withCustomers: {
    include: [() => Customer ]
  }
})
@Table({
  timestamps: true,
  tableName: Tables.DOMAINS
})
export class Domain extends Model<Domain> {

  @AllowNull(false)
  @Column
  name: string;

  @Column
  active: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  updatedAt: Date;

  @HasMany(() => Project)
  projects: Project[];

  @HasMany(() => Customer)
  customers: Customer[];

}
