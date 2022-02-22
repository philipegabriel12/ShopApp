const { getUserById, updateUserDb } = require('../db/user.db')

exports.updateUser = async (req, res) => {
    const { id } = req.user
    const errors = {email: ''}
    try {
        const user = await getUserById(id)
        const changes = req.body
        changes.id = id
        changes.email.toLowerCase()
        const emailValidation =
        changes.email && user.email.toLowerCase() == changes.email.toLowerCase()

        if(emailValidation && changes.id != user.user_id){
            errors["email"] = "E-mail is already taken"
        }

        if (errors.email.length > 0) {
            throw new Error(403, errors)
        }

        await updateUserDb(changes)

        return res.status(201).json({
            success: true,
            message: "The changes were made"
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}