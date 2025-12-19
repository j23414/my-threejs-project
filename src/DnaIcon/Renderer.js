import * as THREE from 'three'
import ProteinViewer from "./ProteinViewer.js"

export default class Renderer
{
  constructor()
  {
    this.proteinViewer = new ProteinViewer()
    this.canvas = this.proteinViewer.canvas
    this.sizes = this.proteinViewer.sizes
    this.scene = this.proteinViewer.scene
    this.camera = this.proteinViewer.camera

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