import {Line} from '../../../models/Line';
import {Program} from '../../../models/Program';
import {Domain} from '../../../models/Domain';
import {Customer} from '../../../models/Customer';
import {Type} from '../../../models/Type';

export class ProjectFilterDto {
  lines: Line[];
  programs: Program[];
  domains: Domain[];
  types: Type[];
  customers: Customer[];

  constructor(
    lines: Line[],
    programs: Program[],
    domains: Domain[],
    types: Type[],
    customers: Customer[]) {
    this.lines = lines;
    this.programs = programs;
    this.domains = domains;
    this.types = types;
    this.customers = customers;
  }
}
