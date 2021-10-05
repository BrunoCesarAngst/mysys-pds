import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react"
import * as AppleAuthentication from "expo-apple-authentication"

import * as GoogleAuth from "expo-google-app-auth"

import { IOS_CLIENT_ID, ANDROID_CLIENT_ID } from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { db } from "../config/firebase"
import firebase from "firebase"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppNavigatorParamsList } from "../routes/types"

type AuthScreenNavigationProps = StackNavigationProp<
  AppNavigatorParamsList,
  "Auth"
>

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  userId: string | undefined
  name: string | undefined
  email: string | undefined
  photo?: string | undefined
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

  // const navigation = useNavigation<AuthScreenNavigationProps>()

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
      const result = await GoogleAuth.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      })

      console.log(result)

      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        )

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => {
            const userLogged = {
              userId: result.user.id,
              email: result.user.email,
              name: result.user.givenName,
              photo: result.user.photoUrl,
            }

            setUser(userLogged)
            AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))

            const theUser = users.find((user) => user.userId === result.user.id)

            if (theUser) {
              console.log("O usuário já existe")
            } else {
              db.collection("users").add({
                userId: result.user.id,
                email: result.user.email,
                name: result.user.givenName,
                photo: result.user.photoUrl,
                date: new Date().getTime(),
                update: new Date().getTime(),
              })
            }
          })
      }
    } catch ({ message }) {
      alert("login: Error:" + message)
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
