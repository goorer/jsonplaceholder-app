import { useReducer, createContext } from 'react'
import { User } from './type'

type STATE = { user: User }
type ACTION = { type: 'login' } | { type: 'logout' }

const initialUser: User = {
  id: -1,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: '',
  },
}

const reducer = (state: STATE, action: ACTION): STATE => {
  switch (action.type) {
    case 'login':
      return { user: state.user }
    case 'logout':
      return { user: initialUser }
    default:
      throw new Error()
  }
}

type CONTEXT = {
  state: STATE
  login: (user: User) => void
  logout: () => void
}

const initialContext = {
  state: { user: initialUser },
  login: () => {},
  logout: () => {},
}

export const UserContext = createContext<CONTEXT>(initialContext)

export const useCustomContext = (): CONTEXT => {
  const [state, dispatch] = useReducer(reducer, { user: initialUser })
  const login = (user: User): void => {
    state.user = user
    dispatch({ type: 'login' })
  }
  const logout = (): void => {
    state.user = initialUser
    dispatch({ type: 'logout' })
  }
  return { state, login, logout }
}
