// 本当にサイトを去っていいかの確認(Gmailとかで出るやつね)

function confirmPageUnload () {
	window.addEventListener('beforeunload', event => {
		event.returnValue = true
	})
}
