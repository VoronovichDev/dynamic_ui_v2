const images = document.querySelectorAll('.slider-row img')
const dots = document.querySelectorAll('.dots-wrapper div')
const dots_arr = Array.from(dots)
console.log(dots_arr[0])
const activeDot = document.querySelector('.dot-active')
const sliderRow = document.querySelector('.slider-row')

const row_gap = +(window.getComputedStyle(sliderRow).gap.replace('px', ''))

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
   sliderRow.style.left = 0
   offset = 0
}

window.addEventListener('resize', () => {
   removeActiveFromDots()
   setDefaultDot()
   setDefaultSlide()
})

document.querySelector('.arrow-next').addEventListener('click', () => {
   swapTo('right')
})
document.querySelector('.arrow-prev').addEventListener('click', () => {
   swapTo('left')
})


function swapTo(side) {
   const slide_width = returnCurrentSlideWidth()

   offset = side === 'right'
      ? offset + (slide_width + row_gap)
      : offset - (slide_width + row_gap)
   console.log(offset, 'offset')

   const width_swap = side === 'right' ? offset : -offset
   console.log(width_swap, 'width_swap')


   const active_dot = document.querySelector('.dot-active')
   if (width_swap > (slide_width * images.length) / 2 && -offset !== width_swap) {
      sliderRow.style.left = 0
      offset = -((slide_width * (images.length - 1)) / 2) - ((images.length - 3) * row_gap)
      removeActiveFromDots()
      dots_arr[0].classList.add('dot-active')
   } else if (width_swap > (slide_width * images.length) / 2 && offset !== width_swap) {
      sliderRow.style.left = 0
      offset = ((slide_width * (images.length - 1)) / 2) + ((images.length - 3) * row_gap)
      removeActiveFromDots()
      dots_arr[dots_arr.length - 1].classList.add('dot-active')
   }

   sliderRow.style.left = -offset + 'px'


   const active_dot_index = dots_arr.indexOf(active_dot)
   active_dot.classList.remove('dot-active')

   const nextDot_index = side === 'right'
      ? active_dot_index + 1
      : active_dot_index - 1

   const nextDot = dots_arr[nextDot_index]
   if (nextDot) nextDot.classList.add('dot-active')
}



