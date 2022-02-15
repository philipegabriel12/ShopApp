import { useState } from "react";
import { onLogin } from "../api/auth";
import { Layout } from "../components/Layout";
import { useDispatch } from "react-redux";
import { authUser } from "../redux/slices/authSlice";

export function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const onChange = (e:any) => {
    setValues({
      ...values, [e.target.name]: e.target.value
    })

    if(error){
      setError('')
    }
  }

  const dispatch = useDispatch()
  const onSubmit = async (e:any) => {
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
      <div className="d-flex flex-column align-self-start mt-5 w-100">
        <h1>Log in to ShopApp</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic inventore qui obcaecati laudantium accusamus.</p>
      </div>
      <form className="d-flex flex-column align-self-start bg-light p-5 rounded" style={{"width": 
      '100%'
      }} onSubmit={(e) => onSubmit(e)}>
        <div className="w-100">
          <input onChange={(e) => onChange(e)} className="w-100 border border-primary p-2" id="email" name="email" type="email" placeholder="Email" value={values.email} required></input>
        </div>
        <div className="w-100 mt-3">
          <input onChange={(e) => onChange(e)} className="w-100 border border-primary p-2" id="password" name="password" type="password" placeholder="Password" value={values.password} required></input>
          <div style={{
            color: "red", margin: "10px 0"
          }}>{error}</div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </Layout>
  )
  }