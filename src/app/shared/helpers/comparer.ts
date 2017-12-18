import * as _ from 'lodash';

export default  class Comparer {
    deepCompare(obj1:any, obj2:any){
        let keys1=Object.keys(obj1);
        let keys2=Object.keys(obj2);

        let keyDifference=_.difference(keys1,keys2);
        let difference=[];
    
        if(keys1.length!==keys2.length || keyDifference.length){
            return [];
        } else{
            for(let key of keys1){
                // obj1[key]=obj1[key] || '';
                // obj2[key]=obj2[key] || '';

                if(Array.isArray(obj1[key])){
                    let ids1=obj1[key].map(i=>i.id);
                    let ids2=obj2[key].map(i=>i.id);
                    let diff=[];

                    if(ids1.length>ids2.length){
                        diff=ids1.filter(function(i) {return ids2.indexOf(i) < 0;});
                    } else if(ids1.length < ids2.length){
                        diff=ids2.filter(function(i) {return ids1.indexOf(i) < 0;});
                    }

                    if(diff.length) difference=[...difference, { [key]: diff }];
                } else{
                    if( key!=='errors'){
                        if(obj1[key]!==obj2[key]) difference=[...difference, { [key]: 'changed' }];
                    }               
                }
            }
        }

        return difference;
    }

    
}

 