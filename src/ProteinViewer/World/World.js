import * as THREE from 'three'
import ProteinViewer from "../ProteinViewer.js"
import Environment from './Environment.js'

export default class World
{
  constructor()
  {
    this.proteinViewer = new ProteinViewer()
    this.scene = this.proteinViewer.scene
    this.resources = this.proteinViewer.resources

    const testMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial()
    )
    this.scene.add(testMesh)

    this.environment = new Environment(5, 5, 5)
  }

  update(){
  }
}