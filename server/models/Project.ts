import {Model, AllowNull, Column, DataType, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany} from 'sequelize-typescript';
import {Schedule} from './Schedule';
import {Employee} from './Employee';
import {Role} from './Role';
import {Technology} from './Technology';
import {ProjectTechnology} from './ProjectTechnology';

@Scopes({
    full: {
        include: [
            { model: () => Schedule, include: [() => Employee, () => Role]},
            () => Technology
        ]
    },
    withTechnologies: {
        include: [ () => Technology ]
    },
    withSchedules: {
        include: [ () => Schedule ]
    },
    actualProjects: { where: {ishistory: false} }
})
@Table({
    timestamps: true,
    tableName: 'projects'
})
export class Project extends Model<Project> {

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    line: string;

    @AllowNull(false)
    @Column
    domain: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    description: string;

    @Column({ allowNull: false })
    customer: string;

    @AllowNull(false)
    @Column
    type: string;

    @AllowNull(false)
    @Column
    program: string;

    @Column
    image: string;

    @Column
    feedback: string;

    @Column
    teamcount: string;

    @Column({type: DataType.DECIMAL })
    pss: string;

    @Column
    active: boolean;

    @Column
    ishistory: boolean;

    @Column
    version: number;

    @AllowNull(false)
    @Column({
        type: DataType.DATE
    })
    startdate: Date;

    @Column({
        type: DataType.DATE
    })
    enddate: Date;

    @CreatedAt
    @Column({
        type: DataType.DATE
    })
    createdAt: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE
    })
    updatedAt: Date;

    @HasMany(() => Schedule)
    schedules: Schedule[];

    @BelongsToMany(() => Technology, () => ProjectTechnology)
    technologies: Technology[];

}
