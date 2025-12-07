import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Timer from './Utils/Timer.js'

export default class ProteinViewer
{
  constructor(canvas)
  {
    console.log("Create ProteinViewer")
    this.canvas = canvas

    // Allow access from Console, for debugging
    window.proteinViewer = this

    this.sizes = new Sizes()
    this.timer = new Timer()

    this.sizes.on('resize', () =>
    {
      this.resize()
    })
    this.timer.on('tick', () =>
    {
      this.update()
    })
  }
  resize()
  {
    // Resize event
  }
  update()
  {
    // Update event, particularly for animations
  }
}