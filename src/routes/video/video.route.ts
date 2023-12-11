import express, { Request, Response } from 'express'
import CommonTypes from '../../common/commonTypes'
import RoutesNames from '../../common/routesNames'
import { checkCreateVideoBody, checkUpdateVideoBody } from './video.service'
import VideoTypes from './video.type'

const videos: VideoTypes.Video[] = [
	{
		id: 1,
		title: 'string',
		author: 'string',
		canBeDownloaded: true,
		minAgeRestriction: null,
		createdAt: '2023-12-04T16:26:58.319Z',
		publicationDate: '2023-12-04T16:26:58.319Z',
		availableResolutions: ['P240'],
	},
]

export const videoRouter = express.Router()

export const AvailableResolutions: VideoTypes.AvailableResolution[] = [
	'P144',
	'P240',
	'P360',
	'P480',
	'P720',
	'P1080',
	'P1440',
	'P2160',
]

// Deleting of all data for testing
videoRouter.delete(RoutesNames.testingAllData, (req, res) => {
	videos.length = 0
	res.send(204)
})

// Retrieving all videos
videoRouter.get(RoutesNames.videos, (req: Request, res: Response) => {
	res.send(videos)
})

// Retrieving a video
videoRouter.get(
	RoutesNames.video(':id'),
	(req: CommonTypes.ReqWithParams<{ id: string }>, res: Response) => {
		const id = +req.params.id

		const video = videos.find((video) => video.id === id)

		if (!video) {
			res.sendStatus(404)
			return
		}

		res.status(200)
		res.send(video)
	},
)

// Creating a video
videoRouter.post(
	RoutesNames.videos,
	(req: CommonTypes.ReqWithBody<VideoTypes.CreateVideoDto>, res: Response) => {
		// Check errors
		const errorResponse = checkCreateVideoBody(req.body)

		if (errorResponse) {
			res.status(400).send(errorResponse)
			return
		}

		// Body is correct. Create a video.
		const { title, author, availableResolutions } = req.body

		const createdAt = new Date()
		const publicationDate = new Date()

		publicationDate.setDate(createdAt.getDate() + 1)

		const newVideo: VideoTypes.Video = {
			id: +new Date(),
			canBeDownloaded: false,
			minAgeRestriction: null,
			createdAt: createdAt.toISOString(),
			publicationDate: publicationDate.toISOString(),
			title,
			author,
			availableResolutions,
		}

		videos.push(newVideo)

		res.status(201).send(newVideo)
	},
)

// Updating a video
videoRouter.put(
	RoutesNames.video(':id'),
	(req: CommonTypes.Req<{ id: string }, VideoTypes.UpdateVideoDto>, res: Response) => {
		const id = +req.params.id

		const videoIdx = videos.findIndex((video) => video.id === id)

		if (videoIdx < 0) {
			res.sendStatus(404)
			return
		}

		// Check errors
		const errorResponse = checkUpdateVideoBody(req.body)

		if (errorResponse) {
			res.status(400).send(errorResponse)
			return
		}

		videos[videoIdx] = Object.assign(videos[videoIdx], { ...req.body })

		res.status(204)
		res.end()
	},
)

// Deleting a video
videoRouter.delete(
	RoutesNames.video(':id'),
	(req: CommonTypes.ReqWithParams<{ id: string }>, res: Response) => {
		const id = +req.params.id

		const videoIdx = videos.findIndex((video) => video.id === id)

		if (videoIdx < 0) {
			res.sendStatus(404)
			return
		}

		videos.splice(videoIdx, 1)

		res.status(204)
		res.end()
	},
)
