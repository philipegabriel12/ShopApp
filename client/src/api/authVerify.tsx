import axios from 'axios'
axios.defaults.withCredentials = true

export async function homeIsAuth(){
    return await axios.get(
        "http://localhost:5000/api/home"
    )
}
