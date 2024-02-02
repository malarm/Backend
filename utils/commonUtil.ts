export const isValid = (value: string | null | undefined) => value !== null && value !== undefined && value !== '';

export const formatDate = (d: Date) => {
	if (d !== undefined && d !== null && d instanceof Date) {
		return `${(`0${d.getDate()}`).slice(-2)}-${(`0${d.getMonth() + 1}`).slice(-2)}-${d.getFullYear()}`;
	}
	return '';
};

export const padLeadingZeros =(num: number, size: number)  => {
	let s = String(num);
	while (s.length < size) s = `0${s}`;
	return s;
}

/* export const toArrayBuffer = (buf: Buffer) => {
	const ab = new ArrayBuffer(buf.length);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; ++i) {
		view[i] = buf[i];
	}
	return ab;
}; */
