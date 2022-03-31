import { useState } from "react";
import { onLogin } from "../api/auth";
import { Layout } from "../components/Layout";
import { useDispatch } from "react-redux";
import { authUser } from "../redux/slices/authSlice";
import { ForgotPassDialog } from "../components/ForgotPassDialog";

export function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const onChangeLogin = (e:any) => {
    setValues({
      ...values, [e.target.name]: e.target.value
    })

    if(error){
      setError('')
    }
  }

  const dispatch = useDispatch()
  const onSubmitLogin = async (e:any) => {
    e.preventDefault()

    try {
      await onLogin(values)
      dispatch(authUser())

      localStorage.setItem('isAuth', 'true')

    } catch (error) {
      setError(error.response.data.errors[0].msg)
      if (values.password.length < 8){
        setError("The password should be atleast 8 characters long.")
      }

    }
  }

  return (
    <Layout>
      <div className="d-flex flex-column mt-5 w-100">
        <h1>Log in to ShopApp</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic inventore qui obcaecati laudantium accusamus.</p>
      </div>
      <div className="bg-dark p-5 w-100">
        <form id="login-form" className="d-flex flex-column bg-dark rounded" style={{"width": 
        '100%'
        }} onSubmit={onSubmitLogin}>
          <div className="w-100">
            <input onChange={onChangeLogin} className="w-100 border border-primary p-2" id="email" name="email" type="email" placeholder="Email" value={values.email} style={
              {background: "#121416", color: "white"}} required></input>
          </div>
          <div className="w-100 mt-3">
            <input onChange={onChangeLogin} className="w-100 border border-primary p-2" id="password" name="password" type="password" placeholder="Password" value={values.password} style={
              {background: "#121416", color: "white"}} required></input>
            <div style={{
              color: "red", margin: "10px 0"
            }}>{error}</div>
          </div>
        </form>
        <div className="mt-3 d-flex">
            <button type="submit" className="btn btn-primary w-100" id="login-btn" form="login-form">Login</button>
            <ForgotPassDialog />
        </div>
      </div>
    </Layout>
  )
  }