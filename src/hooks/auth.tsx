import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react"
import * as AuthSession from "expo-auth-session"
import * as AppleAuthentication from "expo-apple-authentication"

import { CLIENT_ID, REDIRECT_URI } from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { db } from "../config/firebase"

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  userId: string
  name: string | null
  email: string | null
  photo?: string
}

interface IAuthContextProps {
  user: User
  signWithGoogle(): Promise<void>
  signWithApple(): Promise<void>
  signOut(): Promise<void>
  userStorageLoading: boolean
}

interface AuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

const AuthContext = createContext({} as IAuthContextProps)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [users, setUsers] = useState<User[]>([{} as User])
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  const userStorageKey = "@mysys:user"

  useEffect(() => {
    db.collection("users").onSnapshot((query) => {
      const list: any[] = []
      query.forEach((doc) => {
        list.push({ ...(doc.data() as User) })
      })

      setUsers(list)
    })
  }, [])

  async function signWithGoogle() {
    try {
      const clientId = CLIENT_ID
      const redirect_uri = REDIRECT_URI
      const RESPONSE_TYPE = "token"
      const SCOPE = encodeURI("profile email")

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse

      if (type == "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`
        )
        const userInfo = await response.json()

        const theId = userInfo.id

        const userLogged = {
          userId: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))

        const theUser = users.find((user) => user.userId === userInfo.id)

        if (theUser) {
          console.log("O usuário já existe")
        } else {
          await db.collection("users").add({
            userId: userInfo.id,
            email: userInfo.email,
            name: userInfo.given_name,
            photo: userInfo.picture,
            date: new Date().getTime(),
            update: new Date().getTime(),
          })
        }
      }
    } catch (error) {
      throw new Error({ error })
    }
  }

  async function signWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      if (credential) {
        const name = credential.fullName!.givenName!
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
        const userLogged = {
          userId: credential.user,
          email: credential.email!,
          name,
          photo,
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))

        const theUser = users.find((user) => user.email === credential.email)

        if (theUser) {
          console.log("O usuário já existe")
        } else {
          await db.collection("users").add({
            userId: credential.user,
            email: credential.email!,
            name: credential.fullName!.givenName,
            photo: undefined,
            date: new Date().getTime(),
            update: new Date().getTime(),
          })
        }
      }
    } catch (error) {
      throw new Error({ error })
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const useStorage = await AsyncStorage.getItem(userStorageKey)

      if (useStorage) {
        const userLogged = JSON.parse(useStorage) as User
        setUser(userLogged)
      }
      setUserStorageLoading(false)
    }

    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signWithGoogle,
        signWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
