import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import './styles.css'
import { createScene } from './scene.js'

// Get canvas
const canvas = document.getElementById('webgl-canvas')

// Create scene, camera, renderer
const { scene, camera, renderer, controls } = createScene(canvas)

// Debug GUI
const gui = new GUI()
const debugSettings = {
    backgroundColor: '#000000',
    rotationSpeed: 0.01
}

gui.addColor(debugSettings, 'backgroundColor').name('Background').onChange((value) => {
    scene.background = new THREE.Color(value)
})

gui.add(debugSettings, 'rotationSpeed', 0, 0.1, 0.001).name('Rotation Speed')

// Create a simple cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

// Animation loop
function animate() {
    requestAnimationFrame(animate)

    // Rotate cube
    cube.rotation.x += debugSettings.rotationSpeed
    cube.rotation.y += debugSettings.rotationSpeed

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Start animation
animate()