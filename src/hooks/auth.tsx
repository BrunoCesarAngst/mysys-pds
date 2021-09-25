import React, { createContext, ReactNode, useContext, useState } from "react"
import * as AuthSession from "expo-auth-session"

import { CLIENT_ID, REDIRECT_URI } from "@env"

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthContextProps {
  user: User
  signWithGoogle(): Promise<void>
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

  async function signWithGoogle() {
    try {
      const clientId = CLIENT_ID
      const redirect_uri = REDIRECT_URI
      const RESPONSE_TYPE = "token"
      const SCOPE = encodeURI("profile email")

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      console.log(authUrl)

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse

      if (type == "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`
        )
        const userInfo = await response.json()
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.give_name,
          photo: userInfo.picture,
        })
      }
    } catch (error) {
      throw new Error({ error })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
