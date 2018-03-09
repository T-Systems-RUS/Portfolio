import Vue from 'vue';

Vue.filter('date', function (value:any) {
    if (!value) return ''
    value = new Date(value);
    return `${value.getDate()} ${value.getMonth()+1} ${value.getFullYear()}`;
})