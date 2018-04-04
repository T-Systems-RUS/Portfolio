import {
  Model, AllowNull, Column, DataType, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
  ForeignKey, BelongsTo
} from 'sequelize-typescript';
import {Schedule} from './Schedule';
import {Customer} from './Customer';
import {ProjectCustomer} from './ProjectCustomer';
import {Domain} from './Domain';
import {Employee} from './Employee';
import {Role} from './Role';
import {Program} from './Program';
import {Technology} from './Technology';
import {Type} from './Type';
import {ProjectTechnology} from './ProjectTechnology';
import {Tables} from '../sequelize/Tables';

@Scopes({
    full: {
        include: [
          { model: () => Schedule, include: [() => Employee, () => Role]},
          () => Technology,
          () => Program,
          () => Domain,
          () => Type
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
    tableName: Tables.PROJECTS
})
export class Project extends Model<Project> {

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    description: string;

    @Column
    image: string;

    @Column
    feedback: string;

    @Column({type: DataType.DECIMAL })
    pss: string;

    @Column
    active: boolean;

    @Column
    ishistory: boolean;

    @Column
    version: number;

    @ForeignKey(() => Program)
    @Column
    programId: number;

    @BelongsTo(() => Program)
    program: Program;

    @ForeignKey(() => Domain)
    @Column
    domainId: number;

    @BelongsTo(() => Domain)
    domain: Domain;

    @ForeignKey(() => Type)
    @Column
    typeId: number;

    @BelongsTo(() => Type)
    type: Type;

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

    @BelongsToMany(() => Technology, () => ProjectTechnology)
    technologies: Technology[];

    @BelongsToMany(() => Customer, () => ProjectCustomer)
    customers: Customer[];

}
