import axios from 'axios'

export async function onForgotPass(value:Object){
    return await axios.post(
        "http://localhost:5000/api/forgot-password",
        value
    )
}