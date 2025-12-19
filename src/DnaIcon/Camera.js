import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import DnaIcon from "./DnaIcon.js"

export default class Camera
{
  constructor(x=6, y=4, z=8)
  {
    this.dnaIcon = new DnaIcon()
    this.sizes = this.dnaIcon.sizes
    this.scene = this.dnaIcon.scene
    this.canvas = this.dnaIcon.canvas

    this.setInstance(x, y, z)
    this.setOrbitControls()
  }

  setInstance(x=1, y=1, z=0){
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
    //const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.instance.position.set(x, y, z)
    //camera.position.set(0, 0, 25)
    this.scene.add(this.instance)
  }

  setOrbitControls(){

    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize(){
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(){
    this.controls.update()
  }
}