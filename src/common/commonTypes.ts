import { Request } from 'express'

namespace CommonTypes {
	export type Req<Params, Body> = Request<Params, {}, Body, {}>
	export type ReqWithParams<P> = Request<P, {}, {}, {}>
	export type ReqWithBody<B> = Request<{}, {}, B, {}>

	export type ErrorMessage = {
		message: string
		field: string
	}

	export type ErrorResponse = {
		errorsMessages: ErrorMessage[]
	}
}

export default CommonTypes
