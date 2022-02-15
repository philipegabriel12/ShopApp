import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true){
      return true
  }
  return false
}

interface CounterState {
  isAuth: any
}

const initialState = { isAuth: userAuthFromLocalStorage() } as CounterState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state) => {
        state.isAuth = true
    },
    unauthUser: (state) => {
        state.isAuth = false
    }
  }
})

export const {authUser, unauthUser} = authSlice.actions
export default authSlice.reducer