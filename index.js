import express from 'express'
import 'dotenv/config'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import ProductRouter from './src/routes/productRouter.js'
import UserRouter from './src/routes/userRouter.js'

const app = express()
const port = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))


app.use('/products', ProductRouter)
app.use('/user', UserRouter)

async function setupSwagger() {
    try {
        const swaggerUi = await import('swagger-ui-express')
        const { default: specs } = await import('./src/config/swagger.js')

        app.use('/api-docs', swaggerUi.default.serve, swaggerUi.default.setup(specs, {
            explorer: true,
            customCss: '.swagger-ui .topbar { display: none }',
            customSiteTitle: "Latihan Backend API Documentation"
        }))

        console.log('Swagger documentation available at: http://localhost:' + port + '/api-docs')
    } catch (error) {
        console.log('Swagger setup failed:', error.message)
    }
}

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Latihan Backend API',
        documentation: '/api-docs'
    })
})

setupSwagger()

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`)
})