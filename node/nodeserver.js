var MediaServices = require('./WCGapi.js').MediaServices;
var service = new MediaServices("http://10.97.33.50:38080/HaikuServlet/rest/v2",
	"sip:16509992374@vims1.com",
	"EECpa$$w0rd", "audio,video");
	
service.turnConfig = "STUN 10.97.33.50:4242";

function serviceOnInvite(event)
{
	if (event.call)
	{
		console.log("Call invite");
		var call = event.call;
		call.answer();
		
		call.onbegin = function(event) {
			console.log("Call has started");
		};
		call.onaddstream = function(event) {
			console.log(event.call.localStreams[0]);
			if (event.call.localStreams) {
				console.log("[Call] Local stream added");
				/*var url = webkitURL.createObjectURL(event.call.localStreams[0]);
				localvideo.src = url;
				localStream = event.call.localStreams[0];*/
			}
			if (event.call.remoteStreams) {
				console.log("[Call] Remote stream added");
				var url = webkitURL.createObjectURL(event.call.remoteStreams[0]);
				remotevideo.style.opacity = 1;
				remotevideo.src = url;
				remoteStream = event.call.remoteStreams[0];
			}
		};
		call.onend = callOnEnd;
		call.onerror = callOnError;
		call.onremovestream = callOnRemoveStream;
		call.onstatechange = callOnStateChange;
	}
}