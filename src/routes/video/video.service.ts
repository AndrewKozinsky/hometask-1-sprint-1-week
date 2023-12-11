import CommonTypes from '../../common/commonTypes'
import { isString } from '../../utils/string'
import { AvailableResolutions } from './video.route'

export function checkCreateVideoBody(reqBody: unknown) {
	const errorResponse: CommonTypes.ErrorResponse = {
		errorsMessages: [],
	}

	if ({}.toString.call(reqBody) !== '[object Object]') {
		errorResponse.errorsMessages = [
			{
				field: 'title',
				message: 'A string value is required',
			},
			{
				field: 'author',
				message: 'A string value is required',
			},
		]

		return errorResponse
	}

	const { title, author, availableResolutions } = reqBody as Record<string, unknown>

	if (!isString(title, 40)) {
		errorResponse.errorsMessages.push({ message: 'Invalid title!', field: 'title' })
	}

	if (!isString(author, 20)) {
		errorResponse.errorsMessages.push({ message: 'Invalid author!', field: 'author' })
	}

	if (availableResolutions && Array.isArray(availableResolutions)) {
		availableResolutions.forEach((r) => {
			!AvailableResolutions.includes(r) &&
				errorResponse.errorsMessages.push({
					message: 'Invalid availableResolutions!',
					field: 'availableResolutions',
				})
		})
	}

	return errorResponse.errorsMessages.length ? errorResponse : null
}

export function checkUpdateVideoBody(reqBody: unknown) {
	const errorResponse: CommonTypes.ErrorResponse = {
		errorsMessages: [],
	}

	if ({}.toString.call(reqBody) !== '[object Object]') {
		errorResponse.errorsMessages = [
			{
				field: 'title',
				message: 'A string value is required',
			},
			{
				field: 'author',
				message: 'A string value is required',
			},
		]

		return errorResponse
	}

	const {
		title,
		author,
		availableResolutions,
		canBeDownloaded,
		minAgeRestriction,
		publicationDate,
	} = reqBody as Record<string, unknown>

	if (!isString(title, 40)) {
		errorResponse.errorsMessages.push({ message: 'Invalid title!', field: 'title' })
	}

	if (!isString(author, 20)) {
		errorResponse.errorsMessages.push({ message: 'Invalid author!', field: 'author' })
	}

	if (availableResolutions && Array.isArray(availableResolutions)) {
		availableResolutions.forEach((r) => {
			!AvailableResolutions.includes(r) &&
				errorResponse.errorsMessages.push({
					message: 'Invalid availableResolutions!',
					field: 'availableResolutions',
				})
		})
	}

	if (canBeDownloaded !== undefined && typeof canBeDownloaded !== 'boolean') {
		errorResponse.errorsMessages.push({
			message: 'Must be a boolean',
			field: 'canBeDownloaded',
		})
	}

	if (
		minAgeRestriction !== undefined &&
		{}.toString.call(minAgeRestriction) !== '[object Null]' &&
		{}.toString.call(minAgeRestriction) !== '[object Number]'
	) {
		errorResponse.errorsMessages.push({
			message: 'Must be a null or number',
			field: 'minAgeRestriction',
		})
	}

	if (typeof minAgeRestriction === 'number' && minAgeRestriction < 1 && minAgeRestriction > 18) {
		errorResponse.errorsMessages.push({
			message: 'Must be number from 1 till 18',
			field: 'minAgeRestriction',
		})
	}

	if (publicationDate !== undefined && {}.toString.call(publicationDate) !== '[object String]') {
		errorResponse.errorsMessages.push({
			message: 'Must be a date',
			field: 'publicationDate',
		})
	}

	return errorResponse.errorsMessages.length ? errorResponse : null
}
