importScripts('./lib.js');

const _this = this;

_this.addEventListener('message', (e) => {
	handler(e.data);
	// parse and return exif
	// parse and return xmp
	// parse and return iptc
});

function handler(data) {
	console.info('>>::', data);
	let dataLen = data.length;
	let ab = new ArrayBuffer(dataLen);
	_this.buffer = ab;
	var i8v = new Int8Array(ab);

	for (var i = 0; i < dataLen; i++) {
		i8v[i] = data[i].charCodeAt(0);
	}
}

function getUint8(offset) {
	return new Uint8Array(_this.buffer, offset, 1)[0];
}

function getLongAt(offset, littleEndian) {
	let u32a = new Uint32Array(_this.buffer);

	return new DataView(_this.buffer).getUint32(offset, littleEndian);
}

function parseExif() {

}

function parseXmp() {

}

function parseIptc() {

}
