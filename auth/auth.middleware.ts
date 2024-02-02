// import { unauthorized } from '@jdpnielsen/http-error';
import passport from './auth';

export function secureRoute(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		// console.log('test', err);
		if (err || !user) {
			// PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
			// return next(info);
			/* if (err || !user) {
				return res.status(401).json({
					message: 'Unauthorized'
				});
			} */
			// throw new res.err(info.message);

			// THIS IS THE HACK TO WORK ON LOCAL WITHOUT LOGIN
			user = {
					id: 1,
					email: "",
					name: "Mala",
					initialName: "",
					phone: "",
					jobTitle: "",
					officeLocation: "",
					preferredLanguage: "",
					roles: []
				}
		}
		req.user = user;
		return next();
	})(req, res, next);
}
