document.addEventListener('click', () => {
	const win = window.open('', '', 'width=100, height=100')
	win.moveTo(10, 10)
	win.resizeTo(200, 200)
})
