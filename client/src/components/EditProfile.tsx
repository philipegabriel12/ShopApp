type ProfileProps = {
    setShowEditProfile: Function
}

export function EditProfile(props: ProfileProps){
    return (
        <div className="d-flex flex-column">
            <h1>Edit Profile Component</h1>
            <button onClick={(e) => {props.setShowEditProfile(false)}}>Close</button>
        </div>
    )
}