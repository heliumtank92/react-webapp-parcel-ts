window.addEventListener('resize', () => {
  setVHVariable()
})

setVHVariable()

function setVHVariable() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
