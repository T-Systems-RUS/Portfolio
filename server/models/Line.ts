import {Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {Program} from './Program';
import {Tables} from '../sequelize/Tables';

@Scopes({
  withPrograms: {
    include: [() => Program ]
  }
})
@Table({
  timestamps: true,
  tableName: Tables.LINES
})
export class Line extends Model<Line> {

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

  @HasMany(() => Program)
  programs: Program[];

}
