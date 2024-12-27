import express from 'express'
import { PORT } from './config.js'
import { userRouter } from './routes/user.routes.js'

const app = express()
app.use(express.json())
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log('Server listening in port', PORT)
})
 