import {
  Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import {Project} from './Project';
import {Line} from './Line';
import {Tables} from '../sequelize/Tables';

@Scopes({
  withProjects: {
    include: [() => Project ]
  }
})
@Table({
  timestamps: true,
  tableName: Tables.PROGRAMS
})
export class Program extends Model<Program> {

  @AllowNull(false)
  @Column
  name: string;

  @Column
  active: boolean;

  @ForeignKey(() => Line)
  @Column
  lineId: number;

  @BelongsTo(() => Line)
  line: Line;

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

}
