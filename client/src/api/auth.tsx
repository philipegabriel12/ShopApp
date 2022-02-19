import axios from 'axios'
axios.defaults.withCredentials = true

export async function onSignup(signupData:object) {
    return await axios.post(
        "http://localhost:5000/api/signup",
        signupData
        )
}

export async function onLogin(loginData:object){
    return await axios.post(
        "http://localhost:5000/api/login",
        loginData
        )
}

export async function onUpdateUser(updateData:object){
    return await axios.put(
        "http://localhost:5000/api/update-user",
        updateData
    )
}

export async function onLogout(){
    return await axios.get(
        "http://localhost:5000/api/logout"
    )
}

export async function fetchProtectedData(){
    return await axios.get(
        "http://localhost:5000/api/dashboard"
    )
}