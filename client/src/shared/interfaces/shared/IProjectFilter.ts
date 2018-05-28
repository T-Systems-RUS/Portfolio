export  interface IProjectFilter {
  name: String,
  opened: Boolean,
  items: IProjectFilterCheck[]
}

export interface IProjectFilterCheck {
  active: boolean,
  checked: boolean,
  value: String,
  id: String
}
