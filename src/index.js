const outputRaw = document.body.querySelector('output.raw');
const outputProcessed = document.body.querySelector('output.processed');
const fileInput = document.body.querySelector('input[type="file"]');

fileInput.multiple = true;

fileInput.addEventListener('change', (e) => {
	console.dir(e);
	let fl = e.target.files;

	for (var i = 0, f; f = fl[i]; i++) {
		if (fval.getType(f) === 'image') fread.tryout2(f);
		// if (fval.getType(f) === 'text') fread.text(f);
		// if (fval.getType(f) === 'image') fread.image(f);
	}

});

const worker = new Worker('worker.js');
worker.onmessage = onWorkerMessage;

function onWorkerMessage(e) {
	console.info('worker message:', e);
}


const fval = {
	getType(file) {
		let typeString = file.type;
		let result;
		if (/text*/.test(file.type)) {
			result = 'text';
		}
		if (/image*/.test(file.type)) {
			result = 'image';
		}
		return result;
	}
};


const fread = {
	text(file) {
		let reader = new FileReader();
		reader.onload = onReaderLoad;
		reader.readAsText(file, 'utf8');

		function onReaderLoad(e) {
			let contents = e.target.result;
			outputProcessed.appendChild(buildTextBlock(contents));
		}

		function buildTextBlock(src) {
			let span = document.createElement('span');
			span.innerText = src;
			return span;
		}
	},

	image(file) {
		let reader = new FileReader();
		reader.onload = onReaderLoad;
		reader.readAsDataURL(file);

		function onReaderLoad(e) {
			let contents = e.target.result;
			outputProcessed.appendChild(buildImg(contents, file));
		}

		function buildImg(src, data) {
			let imgEl = document.createElement('img');
			imgEl.src = src;
			imgEl.alt = imgEl.title = data.name;
			return imgEl;
		}


	},

	tryout(file) {
		let reader = new FileReader();
		reader.onload = onReaderLoad;
		
		let filePie = {};
		let metaLim = 1024 * 128;

		filePie.meta = slice(file, 0, metaLim);

		// returns a string of ASCII characters, representing values form 0-255.
		reader.readAsBinaryString(filePie.meta); // not supported in IE

		

		function onReaderLoad(e) {
			let contents = e.target.result;
			worker.postMessage({
				dataType: 'meta',
				binaryString: contents
			});
		}

		function slice(file, start, end, contentType) {
			let result;
			if (file.slice) {
				result = file.slice(start, end);
			} else if (file.webkitSlice) {
				result = file.webkitSlice(start, end);
			} else if (file.mozSlice) {
				result = file.mozSlice(start, end);
			} else {
				throw new Error('Slice method is not supported.');
			}
			return result;
		}

		





		function buildText(contents) {
			return document.createTextNode(contents);
		}

		function buildImg(src, data) {
			let imgEl = document.createElement('img');
			imgEl.src = src;
			imgEl.alt = imgEl.title = data.name;
			return imgEl;
		}


	},


	tryout2(file) {
		let reader = new FileReader();
		reader.onload = onReaderLoad;
		reader.readAsText(file, 'utf8');

		function onReaderLoad(e) {
			let contents = e.target.result;
			console.info("RDR: ", contents.substring(0, 15000));
		}
	},

};




