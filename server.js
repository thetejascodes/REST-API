import  'dotenv/config';
import app from './src/app.js';
import connectDB from './src/common/config/db.js';

const port = Number(process.env.PORT) || 3000 ;

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