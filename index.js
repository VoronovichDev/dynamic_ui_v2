const images = document.querySelectorAll('.slider-row img')
const dots = document.querySelectorAll('.dots-wrapper div')
const dots_arr = Array.from(dots)
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
window.addEventListener('load', () => {
   removeActiveFromDots()
   setDefaultDot()
   setDefaultSlide()
})

// click next btn
document.querySelector('.arrow-next').addEventListener('click', () => {
   swapTo('right')
})

// click prev btn
document.querySelector('.arrow-prev').addEventListener('click', () => {
   swapTo('left')
})


// ========Slide-switching logic========
function swapTo(side) {
   const slide_width = returnCurrentSlideWidth()


   // offset calculation depending on the pressed button
   offset = side === 'right'
      ? offset + (slide_width + row_gap)
      : offset - (slide_width + row_gap)

   const width_swap = side === 'right' ? offset : -offset

   const active_dot = document.querySelector('.dot-active')

   //return to the first slide if scrolled to the end
   if (width_swap > (slide_width * images.length) / 2 && -offset !== width_swap) {
      sliderRow.style.left = 0
      offset = -((slide_width * (images.length - 1)) / 2) - ((images.length - 3) * row_gap)
      removeActiveFromDots()
      dots_arr[0].classList.add('dot-active')
      //return to the last slide if scrolled to the first slide
   } else if (width_swap > (slide_width * images.length) / 2 && offset !== width_swap) {
      sliderRow.style.left = 0
      offset = ((slide_width * (images.length - 1)) / 2) + ((images.length - 3) * row_gap)
      removeActiveFromDots()
      dots_arr[dots_arr.length - 1].classList.add('dot-active')
   }

   sliderRow.style.left = -offset + 'px'

   // ========Dot-coloring logic========
   const active_dot_index = dots_arr.indexOf(active_dot)
   active_dot.classList.remove('dot-active')

   const nextDot_index = side === 'right'
      ? active_dot_index + 1
      : active_dot_index - 1

   const nextDot = dots_arr[nextDot_index]
   if (nextDot) nextDot.classList.add('dot-active')
}


// ========Dot-clicking logic========
document.querySelector('.dots-wrapper').addEventListener('click', (e) => {

   if (!e.target.classList.contains('dot')) return

   const idexOfClickedDot = dots_arr.indexOf(e.target)
   const active_dot = document.querySelector('.dot-active')

   const countOfSlides = slidesListed(dots_arr.indexOf(active_dot), idexOfClickedDot)

   const direction = idexOfClickedDot > dots_arr.indexOf(active_dot) ? 'right' : 'left'

   removeActiveFromDots()
   e.target.classList.add('dot-active')

   const width = (returnCurrentSlideWidth() + row_gap) * countOfSlides
   navigateByDot(width, direction)
})

function slidesListed(defaultIndex, clickedIndex) {
   if (defaultIndex === clickedIndex) return 0
   return clickedIndex > defaultIndex ? clickedIndex - defaultIndex : defaultIndex - clickedIndex
}

function navigateByDot(width, direction) {
   offset = direction === 'right'
      ? offset + width
      : offset - width

   sliderRow.style.left = -offset + 'px'
}