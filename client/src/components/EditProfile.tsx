import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchProtectedData, onLogout, onUpdateUser } from "../api/auth"
import { unauthUser } from "../redux/slices/authSlice"

type ProfileProps = {
    setShowEditProfile: Function,
}

export function EditProfile(props: ProfileProps){

    const dispatch = useDispatch()

    const logout = async () => {
        try {
            await onLogout()
    
            dispatch(unauthUser())
            localStorage.removeItem('isAuth')
    
        } catch (error) {
            console.log(error.response)
        }
    }

    async function protectedInfo() {
        try {
        const {data} = await fetchProtectedData()
        setValues({email: data.info.email,
            username: data.info.username,
            address: data.info.address,
            city: data.info.city,
            state: data.info.state,
            country: data.info.country,})

        } catch (error) {
            console.log(error.response)
        }
       }

    const [values, setValues] = useState({email: '',
        username: '',
        address: '',
        city: '',
        state: '',
        country: '',    
    })
    const [errors, setErrors] = useState('')
    
    const onChange = (e:any) => {
        setValues({
          ...values, [e.target.name]: e.target.value
        })
        if(errors){
            setErrors('')
          }
      }

    const onSubmit = async (e:any) => {
        e.preventDefault()
        try {
            await onUpdateUser(values)
            props.setShowEditProfile(false)
            logout()
        } catch (error) {
            setErrors("E-mail already exists")
        }
    }

    useEffect(() => {
    protectedInfo()
    }, [])

    return (
        <div className="d-flex flex-column mt-5 bg-dark w-75 rounded p-5 shadow">
            <h3 className="mb-5">Account settings</h3>
            <form className="d-flex flex-column gap-2" onSubmit={(e) => onSubmit(e)}>
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => onChange(e)} className="form-control text-light" type="email" id="email" name="email" value={values.email} style={{
                        background: "transparent"
                    }}></input>
                    <div className="text-danger">{errors}</div>
                </div>
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => onChange(e)} className="form-control text-light" type="username" id="username" name="username" value={values.username} style={{
                    background: "transparent"
                    }}></input>
                </div>
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="address">Address</label>
                    <input onChange={(e) => onChange(e)} className="form-control text-light" type="address" id="address" name="address" value={values.address} style={{
                    background: "transparent"
                    }}></input>
                </div>
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="city">City</label>
                    <input onChange={(e) => onChange(e)} className="form-control text-light" type="city" id="city" name="city" value={values.city} style={{
                    background: "transparent"
                    }}></input>
                </div>
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="state">State</label>
                    <input onChange={(e) => onChange(e)} className="form-control text-light" type="state" id="state" name="state" value={values.state} style={{
                    background: "transparent"
                    }}></input>
                </div>
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="country">Country</label>
                    <input onChange={(e) => onChange(e)} className="form-control text-light" type="country" id="country" name="country" value={values.country} style={{
                    background: "transparent"
                    }}></input>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button className="btn btn-danger" onClick={(e) => {props.setShowEditProfile(false)}}>Close</button>
            </form>
        </div>
    )
}