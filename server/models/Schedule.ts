import {Model, Column, DataType, Table, Scopes, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Employee} from './Employee';
import {Project} from './Project';
import {Role} from './Role';
import {Tables} from '../sequelize/Tables';

@Scopes({
    full: {
        include: [
            () => Project,
            () => Employee,
            () => Role
        ]
    }
})
@Table({
    tableName: Tables.SCHEDULES
})
export class Schedule extends Model<Schedule> {

    @Column({
        type: DataType.DECIMAL
    })
    participation: number;

    @Column({
        type: DataType.DATE
    })
    startdate: Date;

    @Column({
        type: DataType.DATE
    })
    enddate: Date;

    // Project
    @ForeignKey(() => Project)
    @Column
    projectId: number;

    @BelongsTo(() => Project)
    project: Project;

    // Employee
    @ForeignKey(() => Employee)
    @Column
    employeeId: number;

    @BelongsTo(() => Employee)
    employee: Employee;

    // Role
    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @BelongsTo(() => Role)
    role: Role;

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
}
