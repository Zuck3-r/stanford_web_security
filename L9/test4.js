// バックボタンを使えなくするよ
function blockBackButton () {
	window.addEventListener('popstate', () => {
		window.history.forward()
	})
}

// 履歴を埋めちゃうよ〜

function fillHistory () {
	for (var i = 1; i < 20; i++) {
		window.history.pushState({}, '', window.location.pathname + '?q=' + i)
	}
	window.history.pushState({}, '', window.location.pathname)
}
