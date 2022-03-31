exports.css = `<style>
.primary-loader {
  position:fixed;
  display:none;
  align-items: center;
  justify-content: center;
  width:100%;
  height:100%;
}

.primary-loader-text {
  font-family: Consolas, 'Courier New', monospace;
  font-size: 2em;
  margin-top: 4em;
  visibility: hidden;
}

.primary-loader-letter {
  display: inline-block;
  padding-left: 0.5em;
  padding-right: 0.5em;
  color: #fff;
  transform: translateX(0) scale(0.25);
  transition: transform 500ms ease-out;
}

.primary-loader-letter.done {
  color: #666;
  transform: translateX(0) scale(1);
}
          
.primary-loader-spinner {
  visibility: hidden;
  position:absolute;
  animation: rotator 1.4s linear infinite;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.primary-loader-path {
  stroke: #ffffff;
  stroke-dasharray: 180;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dashoffset:180; 
    transform:rotate(0deg);
  }
  50% {
    stroke-dashoffset: 45;
    transform:rotate(180deg);
  }
  100% {
    stroke-dashoffset: 180;
    transform:rotate(360deg);
  }
}
</style>`

exports.dom = `<div class="primary-loader"><svg class="primary-loader-spinner" width="3em" height="3em" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="primary-loader-path" fill="none" stroke-width="5" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg><div class="primary-loader-text">·LOADING·</div></div>`

exports.script = `<script type="text/javascript">
const PrimaryLoader = (()=>{
  function findCurrentSpan(collection, id) {
    let result
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].className.indexOf('letter-' + id) !== -1) result = collection[i]
    }
    return result
  }

  function removeClass(element, target) {
    const str = element.className,
      index = str.indexOf(target)
    if (index > -1) {
      element.className = str.replace(target, '')
    }
  }

  function addClass(element, target) {
    element.className += target
  }

  function PrimaryLoader(params) {
    const container = document.getElementsByClassName('primary-loader')[0]
    const textElement = document.getElementsByClassName('primary-loader-text')[0]
    const spinnerElement = document.getElementsByClassName('primary-loader-spinner')[0]

    if(!container) return
    
    console.info('[Primary Loader] start', params)

    this.showText = params.showText
    this.delay = params.delay
    this.textElement = textElement
    this.done = false
    this.cycleTotal = 20
    this.cycleCurrent = 0
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;:"<>?,./~'.split('')
    this.charsCount = this.chars.length
    const text = this.textElement.innerText
    const letters = text.split('')
    let html = ''
    letters.forEach((letter, index) => {
      html += \`<span class="primary-loader-letter letter-\${index} done" target-data="\${letter}">·</span>\`
    })
    this.textElement.innerHTML = html
    this.spans = document.getElementsByClassName('primary-loader-letter')
    this.letterTotal = letters.length
    this.letterCurrent = 0
    
    if(this.delay !== 0){
      container.style.display = 'flex'
      spinnerElement.style.visibility = 'hidden'
      textElement.style.visibility = 'hidden'

      this.initTimeoutId = setTimeout(()=>{
        spinnerElement.style.visibility = 'visible'
        if(this.showText){
          this.reset()
          textElement.style.visibility = 'visible'
        } 
      }, this.delay)
    } else {
      container.style.display = 'flex'
      spinnerElement.style.visibility = 'visible'
      textElement.style.visibility = 'visible'

      this.reset()
    }
  }

  PrimaryLoader.prototype.reset = function () {
    this.done = false
    this.cycleCurrent = 0
    this.letterCurrent = 0
    for (let i = 0; i < this.spans.length; i++) {
      const span = this.spans[i]
      removeClass(span, 'done')
      span.innerHTML = '·'
    }
    this.loop()
  }

  PrimaryLoader.prototype.loop = function () {
    for (let i = 0; i < this.spans.length; i++) {
      const span = this.spans[i]
      if (i >= this.letterCurrent) {
        if (span.innerText !== ' ') {
          span.innerHTML = this.getChar()
          span.style.opacity = 0.9 * Math.random() + 0.1
        }
      }
    }

    if (this.cycleCurrent < this.cycleTotal) {
      this.cycleCurrent++
    } else if (this.letterCurrent < this.letterTotal) {
      const span = findCurrentSpan(this.spans, this.letterCurrent)
      const targetLetter = span.getAttribute('target-data')
      span.innerHTML = targetLetter
      span.style.opacity = 1
      this.cycleCurrent = 0
      this.letterCurrent++

      addClass(span, 'done')
    } else {
      this.done = true
    }

    if (!this.done) {
      this.requestId = requestAnimationFrame(() => {
        this.loop()
      })
    } else {
      this.timeoutId = setTimeout(() => {
        this.reset()
      }, 800)
    }
  }

  PrimaryLoader.prototype.getChar = function () {
    return this.chars[Math.floor(Math.random() * this.charsCount)]
  }

  PrimaryLoader.prototype.stop = function(){
    console.info('[Primary Loader] stop')

    cancelAnimationFrame(this.requestId)
    clearTimeout(this.timeoutId)
    clearTimeout(this.initTimeoutId)
    if(this.textElement){
      this.textElement.remove()
      this.textElement = null
    }
    this.spans = null  
  }

  return PrimaryLoader
})()

let loader = new PrimaryLoader()

window.addEventListener('load', function () {
  if(loader){ 
    loader.stop && loader.stop()
    loader = null
    try{
      document.getElementsByClassName('primary-loader')[0].remove()
    }catch(e){
      console.info(e)
    }
  }
})
</script>`
