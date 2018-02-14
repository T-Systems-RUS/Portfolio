import {Model, Column, DataType, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany} from 'sequelize-typescript';
import {Schedule} from './Schedule';
import {Technology} from './Technology';
import {ProjectTechnology} from './ProjectTechnology';

@Scopes({
    full: {
        include: [
            () => Schedule,
            () => Technology
        ]
    },
    withTechnologies: {
        include: [
            { model: () => Technology }
        ]
    },
    withSchedules: {
        include: [
            { model: () => Schedule }
        ]
    }
})
@Table
export class Project extends Model<Project> {

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    line: string;

    @Column({ allowNull: false })
    domain: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description: string;

    @Column({ allowNull: false })
    customer: string;

    @Column({ allowNull: false })
    type: string;

    @Column({ allowNull: false })
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

    @Column({ allowNull: false })
    startdate: Date;

    @Column
    enddate: Date;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    @HasMany(() => Schedule)
    schedules: Schedule[];

    @BelongsToMany(() => Technology, () => ProjectTechnology)
    technologies: Technology[];

}
