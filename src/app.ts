
import express, { Application,  Request, Response, } from 'express'
import cors from 'cors'
import { studentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
const app : Application = express()


// parser

app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/users', UserRoutes)

const getAController =  (req : Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', getAController)

app.use(globalErrorHandler)
// not found 
app.use(notFound)

export default app;