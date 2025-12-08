import * as THREE from 'three'
import ProteinViewer from "../ProteinViewer.js"

export default class HA {
  constructor() {
    this.proteinViewer = new ProteinViewer()
    this.scene = this.proteinViewer.scene
    this.resources = this.proteinViewer.resources
    this.timer = this.proteinViewer.timer

    this.resource = this.resources.items.H1N1_6WCR_Model

    this.setModel()
  }

  setModel() {
    this.model = this.normalizeSize(this.resource.scene)
    this.scene.add(this.model)
  }

  normalizeSize(model, desiredSize = 30) {
    const box = new THREE.Box3().setFromObject(model)
    // const center = new THREE.Vector3()
    // box.getCenter(center)

    // // Move model so it's centered at the origin
    // model.position.sub(center)

    //// Optional: normalize size to something reasonable
    const size = box.getSize(new THREE.Vector3()).length()
    const scale = desiredSize / size // tweak for your scene scale
    model.scale.setScalar(scale)
    return model
  }

  update()
  {
    this.model.rotation.y += 0.0005 * this.timer.delta
  }
}