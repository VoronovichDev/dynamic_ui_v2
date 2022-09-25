const images = document.querySelectorAll('.slider-row img')
const dots = document.querySelectorAll('.dots-wrapper div')
const dots_arr = Array.from(dots)
const activeDot = document.querySelector('.dot-active')
const sliderRow = document.querySelector('.slider-row')

const row_gap = +(window.getComputedStyle(sliderRow).gap.replace('px', ''))
console.log(row_gap)

let offset = 0;

function returnCurrentSlideWidth() {
   return +(window.getComputedStyle(document.querySelector('.slider-row img')).width.replace('px', ''))
}
function removeActiveFromDots() {
   dots_arr.forEach(dot => dot.classList.remove('dot-active'))
}
function setDefaultDot() {
   activeDot.classList.add('dot-active')
}
function setDefaultSlide() {
   sliderRow.style.left = (returnCurrentSlideWidth() + 2 * row_gap) / 2 + 'px'
   offset = 0
}

setDefaultDot()
setDefaultSlide()