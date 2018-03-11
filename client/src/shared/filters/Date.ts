import Vue from 'vue';

export default function (value:any) {
    if (!value) return ''
    value = new Date(value);
    return value.toLocaleDateString();
}