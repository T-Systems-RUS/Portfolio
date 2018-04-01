import {ISchedule} from './ISchedule';

export interface IProjectState {
    projects: IProject[],
    customers: String[],
    loading: boolean;
}

export interface IProject {
    id: string;
    name: string;
    description: string;
    domain: string;
    line: string;
    schedules: ISchedule[];
    startdate:string;
    enddate:string;
    createdAt:Date;
    updatedAt: Date;
}
