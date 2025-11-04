import 'dotenv/config'
import pool from './src/config/db.js'

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()')
        console.log('✅ Database connected successfully!')
        console.log('Current time:', result.rows[0].now)
        process.exit(0)
    } catch (error) {
        console.error('❌ Database connection failed!')
        console.error('Error:', error.message)
        process.exit(1)
    }
}

testConnection()