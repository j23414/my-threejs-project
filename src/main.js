import './styles.css'
import ProteinViewer from './ProteinViewer/ProteinViewer.js'

const proteinViewer = new ProteinViewer(document.getElementById('webgl-canvas'))

// // import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js'

// /**
//  * Loaders
//  */
// const pdbLoader = new PDBLoader()

// // /**
// //  * Models
// //  */
// // const haGroup = new THREE.Group()
// // pdbLoader.load(
// //     '/my-threejs-project/models/6WCR.pdb',
// //     (pdb) => {
// //         console.log('success')
// //         //console.log(pdb)
// //         const geometryAtoms = pdb.geometryAtoms;
// //         const geometryBonds = pdb.geometryBonds;

// //         // Atoms as points
// //         // TODO: Use spheres instead
// //         const atomMaterial = new THREE.PointsMaterial({
// //             size: 1,
// //             vertexColors: true, // uses color attribute in geometryAtoms if present
// //         });
// //         const atoms = new THREE.Points(geometryAtoms, atomMaterial);
// //         haGroup.add(atoms);

// //         // Bonds as lines
// //         const bondMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
// //         const bonds = new THREE.LineSegments(geometryBonds, bondMaterial);
// //         haGroup.add(bonds);

// //         // Try to center molecule
// //         const box = new THREE.Box3().setFromObject(haGroup);
// //         const center = new THREE.Vector3();
// //         box.getCenter(center);
// //         haGroup.position.sub(center);

// //         // Add to scene
// //        // scene.add(haGroup)
// //     }
// // );
