import './style.css'
import canvasinit from './src/canvasinit.js'
import MapGenerator from './src/MapGenerator.js'

document.querySelector('#app').innerHTML = `
  <canvas id="map"></canvas>
`


canvasinit();

MapGenerator();