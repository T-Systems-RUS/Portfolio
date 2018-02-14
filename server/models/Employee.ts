import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany} from 'sequelize-typescript';
import {Schedule} from './Schedule';
import {Technology} from './Technology';
import {EmployeeTechnology} from './EmployeeTechnology';

@Scopes({
    full: {
        include: [
            () => Schedule,
            () => Technology
        ]
    }
})
@Table
export class Employee extends Model<Employee> {

    @Column({ allowNull: false })
    firstname: string;

    @Column({ allowNull: false })
    lastname: string;

    @Column
    active: boolean;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    @HasMany(() => Schedule)
    schedules: Schedule[];

    @BelongsToMany(() => Technology, () => EmployeeTechnology)
    technologies: Technology[];

}
