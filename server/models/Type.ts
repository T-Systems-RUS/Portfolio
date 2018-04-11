import {Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {Project} from './Project';
import {Tables} from '../sequelize/Tables';

@Scopes({
  withProjects: {
    include: [() => Project ]
  }
})
@Table({
  timestamps: true,
  tableName: Tables.TYPES
})
export class Type extends Model<Type> {

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
  programs: Project[];

}
