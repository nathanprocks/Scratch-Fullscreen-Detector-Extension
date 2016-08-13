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

	function checkFullscreen(e) {
		updateFullscreenButtonPosition();
		if (fullscreen) {
			var magicPixel = (S.clientWidth/4+2 > (S.clientHeight-39)/3) ? 1 : 0; // Not so magic :/
			if (e.clientX >= efsLeft && e.clientX <= (efsLeft + 25 + magicPixel) &&
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

	function updateFullscreenButtonPosition(e) {
		if (S.clientWidth/4+2 > (S.clientHeight-39)/3) {
			efsLeft = (S.clientWidth - ((S.clientHeight - 39) * 4/3)) / 2 + 23;
			efsLeft += (S.clientWidth + 1) % 2; // This works. Don't touch or it might break :P
			efsTop = 18;
		} else {
			efsLeft = 20;
			efsTop = (S.clientHeight - ((S.clientWidth + 37) * 3/4)) / 2 + 9;
		}
	}

	updateFullscreenButtonPosition();
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