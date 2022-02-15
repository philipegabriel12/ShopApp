import {Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoutes = () => {
    const authState = useSelector((state:any) => state.auth)
    return <>{authState.isAuth ? <Outlet /> : <Navigate to='/login'/>}</>
}

const RestrictedRoutes = () => {
    const authState = useSelector((state:any) => state.auth)
    return <>{!authState.isAuth ? <Outlet /> : <Navigate to='/dashboard'/>}</>
}

export {PrivateRoutes, RestrictedRoutes} 