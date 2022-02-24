import { useEffect, useState } from "react"
import { fetchProtectedData, onUpdateUser } from "../api/auth"

type ProfileProps = {
    setShowEditProfile: Function,
}

export function EditProfile(props: ProfileProps){
    const isEqual = () => {
        const obj1 = initValues
        const obj2 = values
        const key1 = Object.keys(initValues)
        const key2 = Object.keys(values)

        if (key1.length !== key2.length) {
            return false;
        }

        for (let i of key1) {
            if (obj1[i as keyof typeof obj1] !== obj2[i as keyof typeof obj2]){
                return false;
            }
        }
        return true;
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
        setInitValues({email: data.info.email,
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
    const [error, setError] = useState('')
    const [initError, setInitError] = useState('')
    const [initValues, setInitValues] = useState({email: '',
        username: '',
        address: '',
        city: '',
        state: '',
        country: '',    
    })
        
    const onChange = (e:any) => {
        setValues({
          ...values, [e.target.name]: e.target.value
        })
        setInitValues({
            ...initValues
        }
        )
        if(error){
            setError('')
          }
        if(initError){
            setInitError('')
        }
      }

    const onSubmit = async (e:any) => {
        e.preventDefault()
            try {
                if(isEqual()){
                    setInitError("No changes have been made.")
                } else {
                    await onUpdateUser(values)
                    window.location.reload()
                }
            } catch (error) {
                console.log(error.message)
                setError("E-mail already exists")
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
                    <div className="text-danger">{error}</div>
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
                <div className="text-danger">{initError}</div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button className="btn btn-danger" onClick={(e) => {props.setShowEditProfile(false)}}>Close</button>
            </form>
        </div>
    )
}