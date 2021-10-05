type CollectProps = {
  idStuff?: string
  title?: string
  description?: string
}

type AuthProps = {
  email: string
  name: string
  photoUri: string
}

export type AppNavigatorParamsList = {
  Dashboard: undefined
  Collect: CollectProps
  Listing: undefined
  SignIn?: undefined
  Auth: AuthProps
}
