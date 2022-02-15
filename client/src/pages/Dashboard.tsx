import { fetchProtectedData, onLogout } from "../api/auth";
import { Layout } from "../components/Layout";
import { unauthUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export function Dashboard() {
  const dispatch = useDispatch()
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
        const {data} = await fetchProtectedData()
        setProtectedData(data.info)
        setLoading(false)

      } catch (error) {
        logout()
      }
   }

   useEffect(() => {
     protectedInfo()
   }, [])

    return loading ? (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    ) : (
      <Layout>
        <div>
          <h1>Dashboard</h1>
          <h2>{protectedData}</h2>
        </div>
      </Layout>
    )
  }
  