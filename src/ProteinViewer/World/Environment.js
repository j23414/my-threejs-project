import * as THREE from 'three'
import ProteinViewer from "../ProteinViewer.js"

export default class Environment
{
  constructor(x=3.5, y=2, z=-1.25, color='#ffff88', ambientColor='#ffffff')
  {
    this.proteinViewer = new ProteinViewer()
    this.scene = this.proteinViewer.scene
    this.resources = this.proteinViewer.resources

    this.setSunLight(x, y, z, color)
    this.setAmbientLight(ambientColor)
    //this.setEnvironmentMap()
  }

  setSunLight(x=1, y=1, z=1, color)
  {
    this.sunLight = new THREE.DirectionalLight(color, 1)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(x, y, z)
    this.scene.add(this.sunLight)
  }

  setAmbientLight(color)
  {
    this.ambientLight = new THREE.AmbientLight(color, 1)
    this.scene.add(this.ambientLight)
  }

  // setEnvironmentMap(){
  //   this.environmentMap = {}
  //   this.environmentMap.intensity = 0.4
  //   this.environmentMap.texture = this.resources.items.environmentMapTexture
  //   this.environmentMap.texture.encoding = THREE.SRGBColorSpace
  //   this.scene.environment = this.environmentMap.texture

  //   this.setEnvironmentMap.updateMaterial = () =>
  //   {
  //     this.scene.traverse((child) => {
  //       if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
  //       {
  //         child.material.envMap = this.environmentMapTexture
  //         child.material.envMapIntensity = this.environmentMap.intensity
  //         child.material.needsUpdate = true
  //       }
  //     })
  //   }
  //   this.setEnvironmentMap.updateMaterial()
  // }
}