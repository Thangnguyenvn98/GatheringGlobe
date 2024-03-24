import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"


const app = express()
const PORT = process.env.PORT || 5050;
app.use(express.json())
app.use(cors())

app.get('/', (req:Request, res: Response) => {
    return res.json({message: "Testing"})
})

app.listen( PORT, () => {
    console.log(`Server running on port : ${PORT}`)
} )