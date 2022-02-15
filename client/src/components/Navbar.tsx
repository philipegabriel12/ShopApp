import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { onLogout } from "../api/auth";
import { unauthUser } from "../redux/slices/authSlice";

export function Navbar() {
    const authState = useSelector((state:any) => state.auth)

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

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <div>
                    <NavLink to='/'>
                        <span className='navbar-brand'>Home</span>
                    </NavLink>
                </div>
                {authState.isAuth ? (
                    <div>
                        <NavLink to='/dashboard' className={'text-decoration-none'}>
                            <span className='mx-3'>Dashboard</span>
                        </NavLink>
                        <NavLink to='#' className={'text-decoration-none'}>
                            <button className='mx-3 btn btn-primary' type="button" onClick={logout}>Logout</button>
                        </NavLink>
                    </div>
                ) : (
                    <div>
                        <NavLink to='/login' className={'text-decoration-none'}>
                            <span className="mx-3">Login</span>
                        </NavLink>

                        <NavLink to='/signup' className={'text-decoration-none'}>
                            <span className="mx-3">Signup</span>
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}