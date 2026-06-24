import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/common/config/db.js';
dotenv.config()

const port = process.env.PORT || 3000 

const startServer = async () => {
    await connectDB()
    app.listen(port,()=>{
        console.log(`🚀 Server is running on port ${port}`)
    })
}
startServer().catch((err)=>{
console.error("Failed to start server", err)   
 process.exit(1)
})