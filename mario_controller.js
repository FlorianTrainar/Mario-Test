import { scene } from "./mario.js"
import { mario } from "./mario.js"

const soundJump = new Audio()
soundJump.src = "./src/audio/saut.wav"

export const rightButton = () => {
    if(mario.alive === true){
       
            mario.walking =true;
            mario.toTheRight =true;
            scene.dx= -2
    }
}

export const leftButton = () => {
    if(mario.alive === true){
       
            mario.walking =true;
            mario.toTheRight =false;
            scene.dx= +2
    }
}

export const releaseButton = () => {
    mario.walking = false;
    scene.dx=0
}

export const jumpButton = () => {
    mario.jumping= true
    soundJump.play()
}

let rightPad = document.getElementById('right-button')
rightPad.addEventListener('touchstart', rightButton)
rightPad.addEventListener('touchend', releaseButton)

let leftPad = document.getElementById('left-button')
leftPad.addEventListener('touchstart', leftButton)
leftPad.addEventListener('touchend', releaseButton)

let aPad = document.getElementById('jump-button')
aPad.addEventListener('touchstart', jumpButton)
