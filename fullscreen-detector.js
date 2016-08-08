/*
	Scratch Fullscreen Detector
	Created by: Nathan Piercy (nathanprocks)
*/

(function(ext) {
	// Cleanup function when the extension is unloaded
	ext._shutdown = function() {};

	// Status reporting code
	// Use this to report missing hardware, plugin or unsupported browser
	ext._getStatus = function() {
		return {status: 2, msg: 'Ready'};
	};

	ext.isFullscreen = function() {
		return false;
	};

	document.body.addEventListener('mousedown', function(e){
		console.log({
			'X': e.clientX,
			'Y': e.clientY
		}, e);
	});

	// Block and block menu descriptions
	var descriptor = {
		blocks: [
			['b', 'is fullscreen?', 'isFullscreen']
		]
	};

	// Register the extension
	ScratchExtensions.register('Fullscreen Detector', descriptor, ext);
})({});