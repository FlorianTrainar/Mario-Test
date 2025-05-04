import { scene } from "./mario.js"
import { mario } from "./mario.js"

const soundJump = new Audio()
soundJump.src = "./src/audio/saut.wav"

export class Keyboard{
    constructor(){
        window.addEventListener("keydown", e => {
            if(mario.alive === true){
                if (e.key === "ArrowRight"){
                    mario.walking =true;
                    mario.toTheRight =true;
                    scene.dx= -2
                }
                else if (e.key === "ArrowLeft"){
                    mario.walking =true;
                    mario.toTheRight =false;
                    scene.dx= 2
                }
                if (e.key === " "){
                    mario.jumping= true
                    soundJump.play()
                }
                
            }
        
        
        })
        window.addEventListener("keyup", e => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft"){
                mario.walking = false;
                scene.dx=0
            }
           
        })
    }
}


