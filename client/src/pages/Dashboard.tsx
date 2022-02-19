import { fetchProtectedData, onLogout } from "../api/auth";
import { Layout } from "../components/Layout";
import { unauthUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { EditProfile } from "../components/EditProfile";

export function Dashboard() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(Object)
  const [showEditProfile, setShowEditProfile] = useState(false)

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
    ) : showEditProfile ? (
      <Layout>
        <EditProfile setShowEditProfile={setShowEditProfile} />
      </Layout>
    ) : (
      <Layout>
        <div className="d-flex flex-column mt-5 bg-dark w-75 rounded p-5 shadow">
          <h1>Dashboard</h1>
          <p className="text-light">Here you can see and edit your personal data.</p>
          <section className="w-100 bd-highlight">
            <div className="d-flex flex-row">
              <p className="w-25 text-info">E-mail:</p>
              <p className="text-light">{protectedData.email}</p>
            </div>
            <div className="d-flex flex-row">
              <p className="w-25 text-info">Username:</p>
              <p className="text-light">{protectedData.username}</p>
            </div>
            <div className="d-flex flex-row">
              <p className="w-25 text-info">Password:</p>
              <button className="btn btn-outline-success align-self-center">Reset password by email</button>
            </div>
          </section>
          <section className="w-100 mt-5">
            <div className="d-flex flex-row">
              <p className="w-25 text-info">Address:</p>
              <p className="text-light">{protectedData.address}</p>
            </div>
            <div className="d-flex flex-row">
              <p className="w-25 text-info">City:</p>
              <p className="text-light">{protectedData.city}</p>
            </div>
            <div className="d-flex flex-row">
              <p className="w-25 text-info">State:</p>
              <p className="text-light">{protectedData.state}</p>
            </div>
            <div className="d-flex flex-row">
              <p className="w-25 text-info">Country:</p>
              <p className="text-light">{protectedData.country}</p>
            </div>
          </section>
          <button className="w-25 mt-3 btn btn-danger" onClick={(e) => setShowEditProfile(!showEditProfile)}>Edit Profile</button>
        </div>
      </Layout>
    )
  }
  