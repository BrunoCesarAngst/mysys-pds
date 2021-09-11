import React, { createContext, ReactNode, useContext } from "react"

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
}

const AuthContext = createContext({} as IAuthContextProps)

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "123456",
    name: "John Doe",
    email: "john@doe.com",
    photo: "http://www.doe.com",
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
