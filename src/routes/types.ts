type CollectProps = {
  idStuff?: string
  title?: string
  description?: string
}

export type AppNavigatorParamsList = {
  Dashboard: undefined
  Collect: CollectProps
  Listing: undefined
}
