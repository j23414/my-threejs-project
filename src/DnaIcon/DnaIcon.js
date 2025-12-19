import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Timer from './Utils/Timer.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'

// 1. Encode 4 nucleotides per byte
function encodeSequence(sequence, fill_length=0) {
    const encoded = new Uint8Array(Math.ceil(sequence.length / 4));

    for (let i = 0; i < sequence.length + fill_length; i++) {
        const byteIndex = Math.floor(i / 4);
        const bitOffset = (i % 4) * 2;

        let value = 0;
        if(i < sequence.length)
        {
            switch (sequence[i]) {
                case 'a': value = 0; break; // 00
                case 'c': value = 1; break; // 01
                case 'g': value = 2; break; // 10
                case 't': value = 3; break; // 11
            }
        }

        encoded[byteIndex] |= (value << bitOffset);
    }

    return encoded;
}


function encodeSequence2(sequence, fill_length=0) {
    const encoded = new Float32Array(sequence.length + fill_length);

    for (let i = 0; i < sequence.length + fill_length; i++) {

        let value = 0.0;
        if(i < sequence.length)
        {
            switch (sequence[i]) {
                case 'a': value = 0.25; break;
                case 'c': value = 0.50; break;
                case 'g': value = 0.75; break;
                case 't': value = 1.0; break;
            }
            //value=i
        }

        encoded[i] = value;
    }

    return encoded;
}

let instance = null
export default class DnaIcon {
    constructor(canvas, dnaSeq) {
        if (instance) {
            return instance
        }
        instance = this
        this.canvas = canvas

        // Allow access from Console, for debugging
        window.DnaIcon = this

        this.sizes = new Sizes()
        this.timer = new Timer()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera(0, 0, 1)
        this.renderer = new Renderer()

        // Create Texture
        const sequence = window.fasta[0].seq
        const width = Math.ceil(Math.sqrt(sequence.length))
        console.log(`width: ${width}`)
        const height = Math.ceil(sequence.length / width)
        console.log(`height: ${height}`)

        const encoded = encodeSequence2(sequence, 2)

        this.geometry = new THREE.PlaneGeometry(1, 1, width - 1, height - 1)
        console.log(`Vertices: ${this.geometry.attributes.position.count}`)
        console.log(`Noro Length: ${sequence.length}`)
        console.log(`Encoded Length: ${encoded.length}`)

        this.geometry.setAttribute('aDNA', new THREE.BufferAttribute(encoded, 1));

        // Create shader material
        const material = new THREE.ShaderMaterial({
            wireframe: true,
            vertexShader: `
                attribute float aDNA;
                // varying vec2 vUv;
                varying float vDNA;

                void main() {
                    // vUv = uv;
                    vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);
                    //modelPosition.z +=aDNA/7000.0;
                    vec4 viewPosition = viewMatrix * modelPosition;
                    vec4 projectionPosition = projectionMatrix * viewPosition;
                    gl_PointSize = 0.01;
                    gl_Position = projectionPosition;
                    vDNA=aDNA;
                }
            `,
            fragmentShader: `
                precision highp float;

                // varying vec2 vUv;
                varying float vDNA;
                //uniform vec3 uLightDir;

                vec3 getBaseColor(float base) {
                    // if (base > 0.1 && base < 0.3 ) return vec3(1.0, 0.0, 0.0);     // A = Red
                    // if (base > 0.3 && base < 0.6) return vec3(0.0, 1.0, 0.0);      // C = Green
                    // if (base > 0.6 && base < 0.85) return vec3(0.0, 0.0, 1.0);     // G = Blue
                    // if (base > 0.85) return vec3(1.0, 1.0, 0.0);                   // T = Yellow
                    if (base == 0.25 ) return vec3(1.0, 0.0, 0.0);     // A = Red
                    if (base == 0.50 ) return vec3(0.0, 1.0, 0.0);      // C = Green
                    if (base == 0.75 ) return vec3(0.0, 0.0, 1.0);     // G = Blue
                    if (base == 1.00 ) return vec3(1.0, 1.0, 0.0);                   // T = Yellow
                    return vec3(0.5, 0.5, 0.5);                      // Unknown
                }

                void main() {
                    // Gradient
                    float colorR = 1.0 - step(0.26, vDNA); // A 0.25
                    float colorG = step(0.50, vDNA) - step(0.75, vDNA); // G T 0.50
                    float colorB = step(0.75, vDNA); // C T

                    colorR = vDNA;
                    colorG = 0.0;
                    colorB = 1.0;

                    //gl_FragColor = vec4(colorR, colorG, colorB, 1.0);
                    gl_FragColor = vec4(getBaseColor(vDNA), 1.0);

                    // vec3 uLightDir=vec3(1, 0, 1);

                    // vec2 p = gl_PointCoord * 2.0 - 1.0;
                    // float r2 = dot(p, p);
                    // if (r2 > 1.0) discard;
                    // float z = sqrt(1.0 - r2);
                    // vec3 normal = normalize(vec3(p.x, p.y, z));
                    // float diffuse = max(dot(normal, normalize(uLightDir)), 0.0);
                    // float ambient = 0.25;
                    // float edge = 1.0 - smoothstep(1.0 - fwidth(r2), 1.0, r2);
                    // vec3 color = getBaseColor(vDNA) * (ambient + diffuse);
                    // gl_FragColor = vec4(getBaseColor(vDNA), edge);

                }
            `
        });

        this.genomeMesh = new THREE.Mesh(this.geometry, material);
        this.scene.add(this.genomeMesh);

        this.sizes.on('resize', () => {
            this.resize()
        })
        this.timer.on('tick', () => {
            this.update()
        })
    }
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }
    update() {
        this.camera.update()
        //this.world.update()
        this.renderer.update()
    }
}