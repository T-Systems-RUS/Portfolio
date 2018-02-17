import {Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany} from 'sequelize-typescript';
import {Schedule} from './Schedule';
import {Technology} from './Technology';
import {EmployeeTechnology} from './EmployeeTechnology';

@Scopes({
    full: {
        include: [
            () => Schedule,
            () => Technology
        ]
    },
    withSchedules: {
        include: [() => Schedule]
    }
})
@Table({
    timestamps: true,
    tableName: 'Employees'
})
export class Employee extends Model<Employee> {

    @AllowNull(false)
    @Column
    firstname: string;

    @AllowNull(false)
    @Column
    lastname: string;

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

    @HasMany(() => Schedule)
    schedules: Schedule[];

    @BelongsToMany(() => Technology, () => EmployeeTechnology)
    technologies: Technology[];

}
