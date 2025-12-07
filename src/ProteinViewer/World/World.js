import * as THREE from 'three'
import ProteinViewer from "../ProteinViewer.js";

export default class World
{
  constructor()
  {
    this.proteinViewer = new ProteinViewer()
    this.scene = this.proteinViewer.scene

    const testMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ wireframe: true })
    )
    this.scene.add(testMesh)
  }

  update(){
  }
}