function bufferToBase64(buffer: ArrayBuffer) {
	return btoa(
		new Uint8Array(buffer).reduce(
			(data, byte) => data + String.fromCharCode(byte),
			''
		)
	);
}

export default bufferToBase64;
