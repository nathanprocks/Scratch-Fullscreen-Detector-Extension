/*
	Scratch Fullscreen Detector
	Created by: Nathan Piercy (nathanprocks)
*/

(function(ext) {
	// Cleanup function when the extension is unloaded
	ext._shutdown = function() {
		document.body.removeEventListener('mousedown', checkFullscreen);
	};

	// Status reporting code
	// Use this to report missing hardware, plugin or unsupported browser
	ext._getStatus = function() {
		return {status: 2, msg: 'Ready'};
	};

	var fullscreen = false;

	ext.isFullscreen = function() {
		return fullscreen;
	};

	/*
		Fullsceen button
		X1: 17
		Y1: 42
		X2: 41
		Y2: 61
	*/
	function checkFullscreen(e) {
		// console.log({
		// 	'X': e.clientX,
		// 	'Y': e.clientY
		// }, e);

		if (e.clientX >= 17 && e.clientX <= 41 &&
			e.clientY >= 42 && e.clientY <= 61) {
			fullscreen = true;
		}
	}

	document.body.addEventListener('mousedown', checkFullscreen);

	// Block and block menu descriptions
	var descriptor = {
		blocks: [
			['b', 'is fullscreen?', 'isFullscreen']
		]
	};

	// Register the extension
	ScratchExtensions.register('Fullscreen Detector', descriptor, ext);
})({});