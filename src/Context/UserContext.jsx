import { createContext, useEffect, useState } from 'react'

export let UserContext = createContext(0)

export default function UserContextProvider (props) {
  const [userLogin, setuserLogin] = useState(null)
  const [userName,setuserName]=useState(null)
  

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setuserLogin(localStorage.getItem('userToken'))
      setuserName(localStorage.getItem('userName'))
      
    }
  }, [])

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin , userName , setuserName }}>
      {props.children}
    </UserContext.Provider>
  )
}
