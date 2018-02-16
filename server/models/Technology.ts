import {Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany} from 'sequelize-typescript';
import {Employee} from './Employee';
import {EmployeeTechnology} from './EmployeeTechnology';
import {Project} from './Project';
import {ProjectTechnology} from './ProjectTechnology';

@Scopes({
    full: {
        include: [
            () => Employee,
            () => Project
        ]
    },
    withEmployees: {
        include: [ () => Employee ]
    },
    withProjects: {
        include: [ () => Project ]
    }
})
@Table({
    timestamps: true,
    tableName: 'technologies'
})
export class Technology extends Model<Technology> {

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    domain: string;

    @Column
    active: boolean;

    @Column
    image: string;

    @Column
    version: string;

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

    @BelongsToMany(() => Employee, () => EmployeeTechnology)
    employees: Employee[];

    @BelongsToMany(() => Project, () => ProjectTechnology)
    projects: Project[];

}
