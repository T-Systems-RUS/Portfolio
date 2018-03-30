import {Types} from './constant-types';

const constants: { [key: string]: string[] } = {
    [Types.PRODUCTION_LINE]: [
      'automotive',
      'digital integration',
      'sap'
    ],
    [Types.DOMAIN]: [
      'Automotive',
      'Content management',
      'Health',
      'Transportation',
      'Public',
      'Logistics'
    ],
    [Types.PROGRAM]: [
      'Sales and Aftersales',
      'Product Lifecycle Management',
      'Supply Chain Management',
      'Airport Management',
      'Big Data Solutions',
      'Innovation & Product Enabling',
      'HealthCare Solutions',
      'Cloud Consulting & Transformation Services',
      'ECM Solutions',
      'Telecom Solutions',
      'Rail & Transport Management'
    ],
    [Types.PROJECT_TYPE]: [
      'Project',
      'Service',
      'Test'
    ],
  };

  export default constants;
