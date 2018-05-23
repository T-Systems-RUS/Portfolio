export  interface IProjectFilter {
  name: String,
  opened: Boolean,
  items: IProjectFilterCheck[]
}

export interface IProjectFilterCheck {
  checked: boolean,
  value: String,
  id: String
}
