export default class CustomError extends Error {
	statusCode: string;

	constructor(statusCode: string, message: string) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}
