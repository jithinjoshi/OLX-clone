import React from 'react'
import { createContext } from 'react'

export const ProfileContext = createContext()

export default function Profile({children}) {
  return (
    <ProfileContext.Provider>
        {{children}}
    </ProfileContext.Provider>
  )
}
