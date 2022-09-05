import { Colors } from "./Constant";
export default function canvasinit() {
    const c = document.querySelector('#map')
    const ctx = c.getContext('2d')
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ctx.fillStyle = Colors.OceanBlue;
    ctx.fillRect(0, 0, c.width, c.height);
}

