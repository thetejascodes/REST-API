import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/auth.routes.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth",authRoutes)

export default app