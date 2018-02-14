import {Model, Column, DataType, Table, Scopes, CreatedAt, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Employee} from './Employee';
import {Project} from './Project';
import {Role} from './Role';

@Scopes({
    full: {
        include: [
            {
                model: () => Project
            },
            {
                model: () => Employee
            },
            {
                model: () => Role
            }
        ]
    }
})
@Table
export class Schedule extends Model<Schedule> {

    @Column({
        type: DataType.DECIMAL
    })
    participation: number;

    @Column
    startdate: Date;

    @Column
    enddate: Date;

    // Project
    @ForeignKey(() => Project)
    @Column
    projectid: number;

    @BelongsTo(() => Project)
    project: Project;

    // Employee
    @ForeignKey(() => Employee)
    @Column
    employeeid: number;

    @BelongsTo(() => Employee)
    employee: Employee;

    // Role
    @ForeignKey(() => Role)
    @Column
    roleid: number;

    @BelongsTo(() => Role)
    role: Role;
}
