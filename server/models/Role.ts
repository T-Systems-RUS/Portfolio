import {Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {Schedule} from './Schedule';

@Scopes({
    withSchedules: {
        include: [() => Schedule ]
    }
})
@Table({
    timestamps: true,
    tableName: 'roles'
})
export class Role extends Model<Role> {

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    domain: string;

    @Column
    leadrole: boolean;

    @Column
    seniority: string;

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

}
