import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { findEmail, create } from '../models/users.js';
import commonHelper from '../helper/common.js';
import authHelper from '../helper/auth.js';

const UserController = {
    register: async (req, res, next) => {
        try {
            const { email, password, fullname } = req.body;
            
            if (!email || !password || !fullname) {
                return res.status(400).json({
                    success: false,
                    message: 'Email, password, dan fullname harus diisi'
                });
            }

            const { rowCount } = await findEmail(email);
            
            if (rowCount) {
                return res.status(403).json({
                    success: false,
                    message: 'Email sudah terdaftar'
                });
            }

            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt); 
            
            const data = {
                id: uuidv4(),
                email,
                passwordHash, 
                fullname,
                role: 'user'
            };
            
            const result = await create(data);
            
            return res.status(201).json({
                success: true,
                message: 'Registrasi berhasil',
                data: {
                    id: result.rows[0].id,
                    email: result.rows[0].email,
                    fullname: result.rows[0].fullname
                }
            });
            
        } catch (error) {
            console.error('Register error:', error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan saat registrasi',
                error: error.message
            });
        }
    },
    
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email dan password harus diisi'
                });
            }

            const { rows: [user] } = await findEmail(email);
            
            if (!user) {
                return res.status(403).json({
                    success: false,
                    message: 'Email tidak terdaftar'
                });
            }
            
            const isValidPassword = bcrypt.compareSync(password, user.password);
            console.log('Password validation:', isValidPassword);

            if (!isValidPassword) {
                return res.status(403).json({
                    success: false,
                    message: 'Password salah'
                });
            }
            
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role
            };
            
            const token = authHelper.generateToken(payload);
            
            delete user.password;
            
            return res.status(200).json({
                success: true,
                message: 'Login berhasil',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        fullname: user.fullname,
                        role: user.role
                    },
                    token: token
                }
            });
            
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan saat login',
                error: error.message
            });
        }
    },
};

export default UserController;