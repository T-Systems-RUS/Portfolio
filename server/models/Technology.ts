import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany} from 'sequelize-typescript';
import {Employee} from './Employee';
import {EmployeeTechnology} from './EmployeeTechnology';
import {Project} from './Project';
import {ProjectTechnology} from './ProjectTechnology';

@Scopes({
    full: {
        include: [
            {
                model: () => Employee
            },
            {
                model: () => Project
            }
        ]
    },
    withEmployees: {
        include: [
            {
                model: () => Employee
            }
        ]
    },
    withProjects: {
        include: [
            {
                model: () => Project
            }
        ]
    }
})
@Table
export class Technology extends Model<Technology> {

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    domain: string;

    @Column
    active: boolean;

    @Column
    image: string;

    @Column
    version: string;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    @BelongsToMany(() => Employee, () => EmployeeTechnology)
    employees: Employee[];

    @BelongsToMany(() => Project, () => ProjectTechnology)
    projects: Project[];

}
