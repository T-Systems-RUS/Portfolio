import {Types} from './constant-types';

const constants: { [key: string]: string[] } = {
  [Types.ROLES]: [
    'Configuration',
    'Development',
    'Management',
    'Testing'
  ],
  [Types.TECHNOLOGIES]: [
    'backend',
    'frontend',
    'information',
    'language',
    'methodology',
    'tools'
  ],
  [Types.SENIORITY]: [
    'Junior',
    'Middle',
    'Senior',
    'PM'
  ]
}

export  default constants;
