import * as _ from 'lodash';

export class Comparer {

  static propCompare(prop, isAssending) {
    return (a, b) => {
      if (isAssending) {
        return a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1;
      } else {
        return b[prop] > a[prop] ? 1 : a[prop] === b[prop] ? 0 : -1;
      }
    };
  }

  deepCompare(obj1: {}, obj2: {}) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    const keyDifference = _.difference(keys1, keys2);
    const difference = {};

    if (keys1.length !== keys2.length && !keyDifference.length) {
      return [];
    } else {
      for (const key of keys1) {
        if (Array.isArray(obj1[key])) {
          const ids1 = obj1[key].map(i => i.id);
          const ids2 = obj2[key].map(i => i.id);
          let diff = [];

          if (ids1.length >= ids2.length) {
            diff = ids1.filter(i => {
              return ids2.indexOf(i) < 0;
            });
          } else if (ids1.length < ids2.length) {
            diff = ids2.filter(i => {
              return ids1.indexOf(i) < 0;
            });
          }

          if (diff.length) {
            difference[key] = diff;
          }
        } else {
          if (key !== 'errors') {
            if (obj1[key] !== obj2[key]) {
              difference[key] = 'changed';
            }
          }

        }
      }
    }

    return difference;
  }
}
