import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import path from "path"

const app = express()
const PORT = process.env.PORT || 5050;

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.get('/test', (req:Request, res: Response) => {
    return res.json({message: "Testing Hello World Ahihihiihhi"})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  });


app.listen( PORT, () => {
    console.log(`Server running on port : ${PORT}`)
} )