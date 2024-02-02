import passport from 'passport';
import AzureAdOAuth2Strategy from 'passport-azure-ad-oauth2';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import authConfig from './authConfig';
import db from '../models/index';

passport.use(
	new passportJwt.Strategy(
		{
			secretOrKey: authConfig.tokenSecret,
			jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
		},
		async (token, done) => {
			return done(null, token.user);
		},
	),
);

interface TokenPayload {
	upn: string,
	name: string,
	unique_name: string
}

const azureAdOAuth2Strategy = new AzureAdOAuth2Strategy({
	clientID: authConfig.clientId,
	clientSecret: authConfig.clientSecret,
	callbackURL: authConfig.callbackUrl,
	resource: authConfig.resource,
	tenant: authConfig.tenant
},
async (accessToken, refresh_token, params, profile, done) => {
	try {
		const waadProfile = jwt.decode(params.id_token) as TokenPayload;

		let user = await db.user.findOne({ where: { email: waadProfile.upn } });
		if (!user) { // User does not exist, create new User
			user = await db.user.create({
				name: waadProfile.name,
				initialName: waadProfile.unique_name?.split('@')[0],
				email: waadProfile.upn,
				phone: '',
				jobTitle: '',
				officeLocation: '',
				preferredLanguage: '',
				active: true,
			});
		}

		return done(null, user);
	} catch (error) {
		return done(error);
	}
});

export default passport.use(azureAdOAuth2Strategy);
