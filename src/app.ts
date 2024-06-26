
import express, { Application,  Request, Response, } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/routes'
const app : Application = express()


// parser

app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)


const Test =  (req : Request, res: Response) => {
  
  res.send('Hello World!')
}

app.get('/', Test)

app.use(globalErrorHandler)
// not found 
app.use(notFound)

export default app;