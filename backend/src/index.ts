import express, { Request, Response } from "express"

import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import path from "path"
import userRoutes from './routes/users';
import authRoutes from './routes/auth'

const PORT = process.env.PORT || 5050

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("MongoDB conected succesfully for GatheringGlobe"))

const app = express()

app.use(express.json())


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

app.use("/api/auth", authRoutes )
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.get('/test', (req:Request, res: Response) => {
    return res.json({message: "Testing Hello "})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'index.html'));
  });


app.listen( PORT, () => {
    console.log(`Server running on port : ${PORT}`)
} )