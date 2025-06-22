import p5 from 'p5'

export default class P5 extends p5{
  constructor ({
    width = window.innerWidth,
    height = window.innerHeight,
    mode = 'P2D'
  } = {}) {
    super(( p ) => {
      p.setup = () => { 
        p.createCanvas(width, height, p[mode])
        p.canvas.style.position = "absolute"
        p.canvas.style.top = "0px"
        p.canvas.style.left = "0px"
        p.canvas.style.zIndex = 12
      }
      p.draw = () => { }
    }, 'hydra-ui')
    
    this.canvasWidth = width
    this.canvasHeight = height
    this.renderMode = mode
  }

  show() {
    if (this.canvas) {
      this.canvas.style.visibility = "visible"
    }
  }

  hide() {
    if (this.canvas) {
      this.canvas.style.visibility = "hidden"
    }
  }

  // p5 clear function not covering canvas
  clear() {
    if (this.drawingContext) {
      this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
}