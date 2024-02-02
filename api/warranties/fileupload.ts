import logger from 'config/logger';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

// CONFIGURATION OF S3
AWS.config.update({
	secretAccessKey: 'Wzcx1MpjZUaZgqhhBt/moALG4RUlfXvkGzzK1lKg',
	accessKeyId: 'AKIA3SDZ3D53EB6GEMFD',
	region: 'eu-north-1'
});

// CREATE OBJECT FOR S3
const S3 = new AWS.S3();

// CREATE MULTER FUNCTION FOR UPLOAD
export const upload = multer({
	// CREATE MULTER-S3 FUNCTION FOR STORAGE
	storage: multerS3({
		s3: S3,
		acl: 'public-read',
		// bucket - WE CAN PASS SUB FOLDER NAME ALSO LIKE 'bucket-name/sub-folder1'
		bucket: 'wineandbarrels',
		// META DATA FOR PUTTING FIELD NAME
		metadata(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		// SET / MODIFY ORIGINAL FILE NAME
		key(req, file, cb) {
			cb(null, `${new Date().toISOString()}-${file.originalname}`);
		}
	}),
	// SET DEFAULT FILE SIZE UPLOAD LIMIT
	limits: { fileSize: 1024 * 1024 * 130 }, // 50MB
	// FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
	fileFilter(req, file, cb) {
		const filetypes = /jpeg|jpg|png|jfif|heic|docx|pdf|doc|xls|xlsx|mp4|mpeg|mkv|avi/;
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		// const mimetype = filetypes.test(file.mimetype);
		if (extname) {
			return cb(null, true);
		}
		const error: Error = new Error();
		error.message = `Error: Allow images only of extensions ${filetypes} !`;
		return cb(error);
	}
}).array('files', 15);

/* export const deleteFile = (key) => {
	S3.deleteObject({
		Bucket: 'wineandbarrels',
		Key: key
	}, (err, data) => {
		logger.info(`error on delete s3 - ${err}`);
		logger.info(`data on delete s3 - ${JSON.stringify(data)}`);
	});
}; */

export const deleteFile = async (key) => {
	return new Promise((resolve, reject) => {
		S3.deleteObject({
			Bucket: 'wineandbarrels',
			Key: key
		}, (err, data) => {
			if (err) {
				logger.info(`error on delete s3 - ${err}`);
				return reject(err);
			}
			logger.info(`data on delete s3 - ${JSON.stringify(data)}`);
			return resolve(data);
		});
	});
};
