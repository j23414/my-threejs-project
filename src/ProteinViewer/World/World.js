import * as THREE from 'three'
import ProteinViewer from "../ProteinViewer.js"
import Environment from './Environment.js'
import HA from './HA.js'

export default class World
{
  constructor()
  {
    this.proteinViewer = new ProteinViewer()
    this.scene = this.proteinViewer.scene
    this.resources = this.proteinViewer.resources

    this.resources.on('ready', () =>
    {
      this.ha = new HA()
      this.environment = new Environment(5, 5, 5)
    })

    // const testMesh = new THREE.Mesh(
    //     new THREE.BoxGeometry(1, 1, 1),
    //     new THREE.MeshStandardMaterial()
    // )
    // this.scene.add(testMesh)
  }

  update(){
    // Update
  }
}