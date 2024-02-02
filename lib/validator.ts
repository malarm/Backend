import addFormats from 'ajv-formats';
import Ajv, { ValidateFunction } from 'ajv';
import { badRequest } from '@jdpnielsen/http-error';
import { RouteGenericInterface } from './types/express';

export function setupAjv(): Ajv {
	const ajv = new Ajv({ coerceTypes: true, allErrors: true });

	ajv.addKeyword('kind');
	ajv.addKeyword('modifier');

	return addFormats(ajv, [
		'date-time',
		'time',
		'date',
		'email',
		'hostname',
		'ipv4',
		'ipv6',
		'uri',
		'uri-reference',
		'uuid',
		'uri-template',
		'json-pointer',
		'relative-json-pointer',
		'regex'
	]);
}

/**
 * Returns a middleware with compiled ajv validators
 *
 * Note that validator might mutate data, as Ajv type coercion is enabled.
 * @param  {Object} routeSchema An object with ajv schemas {body: Schema1, query: Schema2, prams: Schema3}
 */
export function validate(routeSchema: RouteGenericInterface) {
	const ajv = setupAjv();

	const validators: {
		query?: ValidateFunction<unknown>;
		params?: ValidateFunction<unknown>;
		body?: ValidateFunction<unknown>;
	} = {};

	// Compiling query schema beforehand
	if (Object.prototype.hasOwnProperty.call(routeSchema, 'query')) {
		validators.query = ajv.compile(routeSchema.query);
	}

	// Compiling params schema beforehand
	if (Object.prototype.hasOwnProperty.call(routeSchema, 'params')) {
		validators.params = ajv.compile(routeSchema.params);
	}

	// Compiling body schema beforehand
	if (Object.prototype.hasOwnProperty.call(routeSchema, 'body')) {
		validators.body = ajv.compile(routeSchema.body);
	}

	// The actual middleware that gets loaded by express
	// has already-compiled validators
	return (req, res, next) => {
		let validation = null;

		if (Object.prototype.hasOwnProperty.call(validators, 'params')) {
			validation = ajv.validate(routeSchema.params, req.params);
			if (!validation) {
				return next(badRequest(`Request url parameters validation failed: ${ajv.errorsText()}`));
			}
		}

		if (Object.prototype.hasOwnProperty.call(validators, 'query')) {
			validation = ajv.validate(routeSchema.query, req.query);
			if (!validation) {
				return next(badRequest(`Request query validation failed: ${ajv.errorsText()}`));
			}
		}

		if (Object.prototype.hasOwnProperty.call(validators, 'body')) {
			validation = ajv.validate(routeSchema.body, req.body);
			if (!validation) {
				return next(badRequest(`Request body validation failed: ${ajv.errorsText()}`));
			}
		}

		return next();
	};
}
