import * as THREE from 'three'
import DnaIcon from "./DnaIcon.js"

export default class Renderer
{
  constructor()
  {
    this.dnaIcon = new DnaIcon()
    this.canvas = this.dnaIcon.canvas
    this.sizes = this.dnaIcon.sizes
    this.scene = this.dnaIcon.scene
    this.camera = this.dnaIcon.camera

    this.setInstance()
  }

  setInstance()
  {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    this.instance.physicallyCorrectLights = true
    this.outputEncoding = THREE.sRGBEncoding
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setClearColor('#211d20')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize(){
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update(){
    this.instance.render(this.scene, this.camera.instance)
  }
}