const startBtn = document.querySelector('#start')
const timeList = document.querySelector('#time-list')
const screens = document.querySelectorAll('.screen')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
const colors = [
  '#607BFF',
  '#FF6DF2',
  '#FFDEAA',
  '#B9FFAF',
  '#A5F4FF',
  '#FF5664',
  '#CF23FF',
  '#FFEE3D',
  '#4F5DFF',
  '#FF426B',
  '#FFA238',
  '#FFE647',
  '#3A4BFF',
  '#CEBFFF',
  '#38FF2D',
]

startBtn.addEventListener('click', (event) => {
  event.preventDefault()

  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  const color = getRandomColor()

  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle(color)
  }
})

function startGame() {
  setInterval(decreseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle(colorCircle) {
  const circle = document.createElement('div')
  const sizeCircle = getRandomNumber(10, 60)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - sizeCircle)
  const y = getRandomNumber(0, height - sizeCircle)

  circle.classList.add('circle')
  circle.style.width = `${sizeCircle}px`
  circle.style.height = `${sizeCircle}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = colorCircle

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
