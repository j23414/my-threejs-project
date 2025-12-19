import './styles.css'
import DnaIcon from './DnaIcon/DnaIcon.js'
import readFastaFile from './utils/helpers.js'

window.fasta = await readFastaFile('/my-threejs-project/fastas/norovirus.fasta')
//console.log(window.fasta)

const dnaIcon = new DnaIcon(document.getElementById('webgl-canvas'), window.fasta[0])
