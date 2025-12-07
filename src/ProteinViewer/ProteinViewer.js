import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Timer from './Utils/Timer.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'

let instance = null
export default class ProteinViewer
{
  constructor(canvas)
  {
    if(instance)
    {
      return instance
    }
    instance = this
    console.log("Create ProteinViewer")
    this.canvas = canvas

    // Allow access from Console, for debugging
    window.proteinViewer = this

    this.sizes = new Sizes()
    this.timer = new Timer()
    this.scene = new THREE.Scene()
    this.camera = new Camera(0, 0, 25)
    this.renderer = new Renderer()

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
    this.camera.resize()
    this.renderer.resize()
  }
  update()
  {
    this.camera.update()
    this.renderer.update()
  }
}