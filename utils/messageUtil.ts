import { escape } from 'sequelize/lib/sql-string';

export const replaceNewLine = (message: string) => {
	const search = '\n';
	const replacer = new RegExp(search, 'g');
	return message.replace(replacer, '<br>');
};

export const replaceTab = (message: string) => {
	const search = '\t';
	const replacer = new RegExp(search, 'g');
	return message.replace(replacer, '&nbsp;');
};

export const escapeChars = (input: string) => {
	const search = "'";
	const replacer = new RegExp(search, 'g');
	return escape(input).toString().trim().replace(replacer, '');
};
