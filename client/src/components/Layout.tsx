import {Navbar} from './Navbar'

export function Layout({children}: any) {
    return (
        <div style={
            {height: "100vh"}
        } className="d-flex flex-column">
            <Navbar />
            <div className='container p-5 d-flex flex-column align-items-center' style={{
                maxWidth: "650px"
            }}>{children}</div>
        </div>
    )
}