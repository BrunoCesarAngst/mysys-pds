type CollectProps = {
  idStuff?: string
  title?: string
  description?: string
  discerned?: boolean
  completed?: boolean
}

type AuthProps = {
  email: string
  name: string
  photoUri: string
}

export type AppNavigatorParamsList = {
  Routes: CollectProps
  Dashboard: undefined
  Collect: CollectProps
  Listing: undefined
  SignIn?: undefined
  Auth: AuthProps
  FastAction: undefined
  Context: undefined
  DatedAction: undefined
  Delegated: undefined
  Project: undefined
  Incubated: undefined
  Reference: undefined
  Trash: undefined
}
