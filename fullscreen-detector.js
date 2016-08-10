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
	var efsLeft;
	var efsTop;
	var S = Scratch.FlashApp.ASobj; // Scratch SWF object

	ext.isFullscreen = function() {
		return fullscreen;
	};

	/*
		Fullscreen button position
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
		updateExitFullscreenPosition();
		if (fullscreen) {
			if (e.clientX >= efsLeft && e.clientX <= (efsLeft + 24) &&
				e.clientY >= efsTop && e.clientY <= (efsTop + 19)) {
				fullscreen = false;
			}
		} else {
			if (e.clientX >= 17 && e.clientX <= 41 &&
				e.clientY >= 42 && e.clientY <= 61) {
				fullscreen = true;
			}
		}
	}

	function updateExitFullscreenPosition(e) {
		if (S.clientWidth/4+2 > (S.clientHeight-39)/3) {
			efsLeft = (S.clientWidth - ((S.clientHeight - 39) * 4/3)) / 2 + 23;
			efsTop = 17;
		} else {
			efsLeft = 20;
			efsTop = (S.clientHeight - ((S.clientWidth + 37) * 3/4)) / 2 + 9;
		}
	}

	updateExitFullscreenPosition();
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