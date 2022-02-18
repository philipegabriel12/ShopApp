const pool = require('./db');

const getUserById = async (id) => {
    const { rows: user } = await pool.query(
        "SELECT * FROM users WHERE user_id = $1", [id]
    )
    return user[0]
}

const getUserByEmail = async (email) => {
    const { rows: user } = await pool.query(
        "SELECT * FROM users WHERE email = $1", [
            email
        ]
    )
}

const updateUserDb = async ({
    email, username, address, city, state, country, id
}) => {
    const lowercase_email = email.toLowerCase()
    const { rows: user } = await pool.query(
        "UPDATE users SET email = $1, username = $2, address = $3, city = $4, state = $5, country = $6 WHERE user_id = $7 RETURNING email, username, user_id", [
            lowercase_email, username, address, city, state, country, id
        ]
    )
    return user[0]
}

module.exports = {
    getUserById,
    updateUserDb,
    getUserByEmail,
}
