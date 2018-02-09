import {QueryEncoder} from '@angular/http';

// requiered for storing '+' in strings for phone numbers

export class PortfolioQueryEncoder extends QueryEncoder {
  encodeKey(k: string): string {
    k = super.encodeKey(k);
    return k.replace(/\+/gi, '%2B');
  }

  encodeValue(v: string): string {
    v = super.encodeKey(v);
    return v.replace(/\+/gi, '%2B');
  }
}
