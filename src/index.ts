import express, { Express } from 'express'
import router from './router'

const PORT = process.env.PORT || 3000

const app: Express = express()
app.use(router)

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})