export interface IProjectState {
    projects: IProject[],
    loading: boolean;
}
  
export interface IProject {
    id: string;
    name: string;
    description: string;
    domain: string;
    line: string;
    updatedAt: Date;
}