import {
  Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
  ForeignKey, BelongsTo
} from 'sequelize-typescript';
import {Project} from './Project';
import {Domain} from './Domain';
import {ProjectCustomer} from './ProjectCustomer';
import {Tables} from '../sequelize/Tables';

@Scopes({
  full: {
    include: [
      () => Project,
      () => Domain
    ]
  },
  withProjects: {
    include: [ () => Project ]
  }
})
@Table({
  timestamps: true,
  tableName: Tables.CUSTOMERS
})
export class Customer extends Model<Customer> {

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

  @ForeignKey(() => Domain)
  @Column
  domainId: number;

  @BelongsTo(() => Domain)
  domain: Domain;

  @BelongsToMany(() => Project, () => ProjectCustomer)
  projects: Project[];

}
