
/**
 * Enum for sequelize scopes
 * For usage in sevices
 * @export
 * @enum {number}
 */
export enum Scopes {
    ACTUAL_PROJECTS = 'actualProjects',
    FULL = 'full',
    WITH_EMPLOYESS = 'withEmployees',
    WITH_PROJECTS = 'withProjects',
    WITH_SCHEDULES = 'withSchedules',
    WITH_TECHNOLOGIES = 'withTechnologies'
}
