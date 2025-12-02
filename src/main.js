import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import './styles.css'
import { createScene } from './scene.js'
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js'

/**
 * Loaders
 */
const pdbLoader = new PDBLoader()

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

//gui.add(debugSettings, 'rotationSpeed', 0, 0.1, 0.001).name('Rotation Speed')

/**
 * Models
 */
const haGroup = new THREE.Group()
pdbLoader.load(
    '/my-threejs-project/models/6WCR.pdb',
    (pdb) => {
        console.log('success')
        //console.log(pdb)
        const geometryAtoms = pdb.geometryAtoms;
        const geometryBonds = pdb.geometryBonds;

        // Atoms as points
        // TODO: Use spheres instead
        const atomMaterial = new THREE.PointsMaterial({
            size: 1,
            vertexColors: true, // uses color attribute in geometryAtoms if present
        });
        const atoms = new THREE.Points(geometryAtoms, atomMaterial);
        haGroup.add(atoms);

        // Bonds as lines
        const bondMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const bonds = new THREE.LineSegments(geometryBonds, bondMaterial);
        haGroup.add(bonds);

        // Try to center molecule
        const box = new THREE.Box3().setFromObject(haGroup);
        const center = new THREE.Vector3();
        box.getCenter(center);
        haGroup.position.sub(center);

        // Add to scene
        scene.add(haGroup)
    }
);

// Come back and debug later
gui.add(haGroup.rotation, 'x').min(0).max(Math.PI * 2).name("rotate x")
gui.add(haGroup.rotation, 'y').min(0).max(Math.PI * 2).name("rotate y")
gui.add(haGroup.rotation, 'z').min(0).max(Math.PI * 2).name("rotate z")

gui.add(haGroup.position, 'x').min(-50).max(50).step(1).name("position x")
gui.add(haGroup.position, 'y').min(-50).max(50).step(1).name("position y")
gui.add(haGroup.position, 'z').min(-50).max(50).step(1).name("position z")

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

// Animation loop
function animate() {
    //requestAnimationFrame(animate)

    // Rotate cube
    // cube.rotation.x += debugSettings.rotationSpeed
    // cube.rotation.y += debugSettings.rotationSpeed
    // haGroup.rotation.x += debugSettings.rotationSpeed
    // haGroup.rotation.y += debugSettings.rotationSpeed

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
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