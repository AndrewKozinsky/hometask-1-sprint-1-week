import { Request } from 'express'

namespace VideoTypes {
	export type Video = {
		id: number
		title: string
		author: string
		canBeDownloaded?: boolean
		minAgeRestriction?: null | number
		createdAt?: string
		publicationDate?: string
		availableResolutions?: AvailableResolution[]
	}

	export type AvailableResolution =
		| 'P144'
		| 'P240'
		| 'P360'
		| 'P480'
		| 'P720'
		| 'P1080'
		| 'P1440'
		| 'P2160'

	export type CreateVideoDto = Pick<Video, 'title' | 'author' | 'availableResolutions'>

	export type UpdateVideoDto = Pick<
		Video,
		| 'title'
		| 'author'
		| 'availableResolutions'
		| 'canBeDownloaded'
		| 'minAgeRestriction'
		| 'publicationDate'
	>
}

export default VideoTypes
