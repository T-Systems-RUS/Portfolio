import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {Schedule} from './Schedule';

@Scopes({
    withSchedules: {
        include: [
            () => Schedule
        ]
    }
})
@Table
export class Role extends Model<Role> {

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    domain: string;

    @Column
    leadrole: boolean;

    @Column
    seniority: string;

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

}
