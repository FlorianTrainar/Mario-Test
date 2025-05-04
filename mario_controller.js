import { scene } from "./mario.js"
import { mario } from "./mario.js"

export const rightButton = () => {
    if(mario.alive === true){
       
            mario.walking =true;
            mario.toTheRight =true;
            scene.dx= -2
    }
}

export const releaseButton = () => {
    mario.walking = false;
    scene.dx=0
}

let rightPad = document.getElementById('right-button')
   rightPad.addEventListener('mouseover', rightButton)
   rightPad.addEventListener('mouseout', releaseButton)
