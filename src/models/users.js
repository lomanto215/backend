import Pool from '../config/db.js'

const findEmail = (email) => {
    return Pool.query('SELECT * FROM users WHERE email = $1', [email])
}

const create = (data) => {
    const { id, email, passwordHash, fullname, role } = data
    
    return Pool.query(
        'INSERT INTO users(id, email, password, fullname, role) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [id, email, passwordHash, fullname, role]
    )
}

export { findEmail, create }