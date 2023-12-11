import express from 'express'
import consts from './common/constants'
import { videoRouter } from './routes/video/video.route'

export const app = express()

app.use(express.json())
app.use(consts.apiPrefix, videoRouter)

app.listen(consts.port, () => {
	console.log(`App stared on ${consts.port}`)
})
