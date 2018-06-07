export default function (value:string) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1);
}
