import { Request } from 'express';

export interface RouteGenericInterface {
	body?: unknown;
	query?: unknown;
	params?: unknown;
	user?: unknown;
}

export interface TypedRequest<
	RouteGeneric extends RouteGenericInterface> extends Request<RouteGeneric['params'], any, RouteGeneric['body'], RouteGeneric['query']> {
	user: RouteGeneric['user'];
}
