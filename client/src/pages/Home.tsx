import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../api/auth";
import { homeIsAuth } from "../api/authVerify";
import { Layout } from "../components/Layout";
import { unauthUser } from "../redux/slices/authSlice";

export function Home() {
  const dispatch = useDispatch()
  const authState = useSelector((state:any) => state.auth)
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)

  const logout = async () => {
    try {
        await onLogout()

        dispatch(unauthUser())
        localStorage.removeItem('isAuth')

    } catch (error) {
        console.log(error.response)
    }
}

const protectedInfo = async () => {
  try {
    const {data} = await homeIsAuth()
    setProtectedData(data.info)
    setLoading(false)

  } catch (error) {
    logout()
  }
}

  async function loginState() {
    try {
      if (authState.isAuth) {
        protectedInfo()
        setLoading(false)
      } else{
        setLoading(false)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    loginState()
  })

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : authState.isAuth ? (
    <Layout>
      <h1>Main home</h1>
      <h2>{protectedData}</h2>
    </Layout>
  ) : (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}