// ---Contexe graphique

const cvs = document.getElementById("drawn_zone")
cvs.width = 500;
cvs.height= 350;
const ctx = cvs.getContext("2d");

import {Scene} from "./mario_scene.js";
import {Keyboard} from "./mario_keyboard.js"
import { Koopa, RedKoopa, Mario, Gumba } from "./mario_character.js";
import { Bloc, Pipe, PipeGreen, Coin} from "./mario_objects.js"
import { rightButton, leftButton, jumpButton, releaseButton } from "./mario_controller.js";


const soundCoin = new Audio()
soundCoin.src = "./src/audio/piece.wav"
const soundGameBeated = new Audio()
soundGameBeated.src = "./src/audio/partieGagnee.wav"
const soundEnnemyDies = new Audio()
soundEnnemyDies.src = "./src/audio/ecrasePersonnage.wav"

// Objets fixes


const pipeGreen1 = new PipeGreen(400, 230)
const pipeGreen2 = new PipeGreen(700, 230)
const pipe1 = new Pipe(1000, 230)
const pipe2 = new Pipe(1400, 230)
const pipe3 = new Pipe(1850, 230)

const bloc1 = new Bloc(500, 170)
const bloc2 = new Bloc(600, 170)
const bloc3 = new Bloc(1500, 170)
const bloc4 = new Bloc(1600, 170)
const bloc5 = new Bloc(1700, 170)


const objectArray = [pipeGreen1, pipeGreen2, pipe1, pipe2, pipe3, bloc1, bloc2, bloc3, bloc4, bloc5]

const coin1 = new Coin(505, 90)
const coin2 = new Coin(605, 90)
const coin3 = new Coin(805, 200)
const coin4 = new Coin(905,200)
const coin5 = new Coin(1205, 200)
const coin6 = new Coin(1205, 150)
const coin7 = new Coin(1205,100)
const coin8 = new Coin(1505, 90)
const coin9 = new Coin(1605, 90)
const coin10 = new Coin(1705,90)

const coinArray = [coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8, coin9, coin10]

// Ennemis

// const gumba1 = new Gumba(550, 263)
const gumba2 = new Gumba(800,263)
const gumba3 = new Gumba(1250,263)
const gumba4 = new Gumba(1300,263)
const gumba5 = new Gumba(1350,263)
const gumbaArray  = [gumba2, gumba3, gumba4, gumba5]

const koopa1 = new Koopa(550, 243)
const koopa2 = new Koopa(900,243)
const koopaArray = [koopa1, koopa2]

const redKoopa1 = new RedKoopa(1600,243)
const redKoopa2 = new RedKoopa(1650,243)
const redKoopa3 = new RedKoopa(1700,243)
const redKoopaArray = [redKoopa1, redKoopa2, redKoopa3]





// 

export const scene =new Scene(cvs.width, cvs.height);
const keyboard = new Keyboard();

export const mario = new Mario(160,245);

let coinsCounter = 0;
let timeRemaining = 100;
let timeCounter = 0;
let gameOver = false;
let soundPlay = true;


// Dessin de l'écran
function draw(){
    timeCounter++;
    // contact de Mario
    // - Ennemis
    for (let i=0; i< gumbaArray.length; i++){
        if(mario.near(gumbaArray[i]) === true && gumbaArray[i].alive === true ){
            mario.contactCharacter(gumbaArray[i])
            if(gumbaArray[i].alive === false){
                soundEnnemyDies.play()
            }
        }
    }
    for (let i=0; i< koopaArray.length; i++){
        if(mario.near(koopaArray[i]) === true && koopaArray[i].alive === true ){
            mario.contactCharacter(koopaArray[i])
            if(koopaArray[i].alive === false){
                soundEnnemyDies.play()
            }
            
        }
    }
    for (let i=0; i< redKoopaArray.length; i++){
        if(mario.near(redKoopaArray[i]) === true && redKoopaArray[i].alive === true ){
            mario.contactCharacter(redKoopaArray[i])
            if(redKoopaArray[i].alive === false){
                soundEnnemyDies.play()
            }
            
        }
    }


    // - Objets
    for(let i = 0; i<objectArray.length; i++) {
        if(mario.near(objectArray[i]))
            {
            mario.contact(objectArray[i])
        } else if (mario.y + mario.height <  scene.yFloor && mario.jumping === false)
            {
                mario.y = mario.y +1;   
            }
            
        
    }

    // - Pièces
    for(let i = 0; i<coinArray.length; i++) {
        if(mario.near(coinArray[i]) === true){
        if(mario.contactCoin(coinArray[i]) === true){
            coinArray.splice(i,1);
            soundCoin.play();
            coinsCounter++
        }
        }
    }

    // contact ennemis entre eux
    for(let i = 0; i<gumbaArray.length; i++){
        for(let j=0; j<gumbaArray.length; j++){
            if(gumbaArray[i].alive === true && gumbaArray[j].alive === true){

                if(i !== j &&  gumbaArray[i].near(gumbaArray[j]) === true){
                    gumbaArray[i].contact(gumbaArray[j])
                    gumbaArray[j].contact(gumbaArray[i])
                }
            }
        }
    }
    for(let i = 0; i<koopaArray.length; i++){
        for(let j=0; j<koopaArray.length; j++){
            if(koopaArray[i].alive === true && koopaArray[j].alive === true){

                if(i !== j &&  koopaArray[i].near(koopaArray[j]) === true){
                    koopaArray[i].contact(koopaArray[j])
                    koopaArray[j].contact(koopaArray[i])
                }
            }
        }
    }
    for(let i = 0; i<gumbaArray.length; i++){
        for(let j=0; j<koopaArray.length; j++){
            if(gumbaArray[i].alive === true){

                if(gumbaArray[i].near(koopaArray[j]) === true){
                    gumbaArray[i].contact(koopaArray[j])
                    koopaArray[j].contact(gumbaArray[i])
                }
            }
        }
    }
   




    // contact des Gumbas avec tuyaux
    for(let i = 0; i<gumbaArray.length; i++){
        for(let j=0; j<objectArray.length; j++){
            if(gumbaArray[i].near(objectArray[j]) === true){
                gumbaArray[i].contact(objectArray[j])
            }
        }
    }
    //  contact tortues avec objets
    for(let i = 0; i<koopaArray.length; i++){
        for(let j=0; j<objectArray.length; j++){
            if(koopaArray[i].near(objectArray[j]) === true){
                koopaArray[i].contact(objectArray[j])
            }
        }
    }
    for(let i = 0; i<redKoopaArray.length; i++){
        for(let j=0; j<objectArray.length; j++){
            if(redKoopaArray[i].near(objectArray[j]) === true){
                redKoopaArray[i].contact(objectArray[j])
            }
        }
    }

    // Deplacement des objets fixes

    scene.backgroundMotion(ctx);
    for(let i = 0; i<objectArray.length; i++){
        objectArray[i].motion();
    }
    
    for(let i = 0; i<coinArray.length; i++){
        coinArray[i].motion();
        coinArray[i].variation();
    }

    for(let i = 0; i<gumbaArray.length; i++){
        gumbaArray[i].motion();
        gumbaArray[i].move();
    }

    for(let i = 0; i<koopaArray.length; i++){
        koopaArray[i].motion();
        koopaArray[i].move();
    }

    for(let i = 0; i<redKoopaArray.length; i++){
        redKoopaArray[i].motion();
        redKoopaArray[i].move();
    }

   
    // Image des objets
    for(let i = 0; i<objectArray.length; i++){
        ctx.drawImage(objectArray[i].imgObject, objectArray[i].x, objectArray[i].y)
    }
    // Image des pièces
    for(let i = 0; i<coinArray.length; i++){
        ctx.drawImage(coinArray[i].imgObject, coinArray[i].x, coinArray[i].y)
    }
    // Image des Gumbas
    for(let i = 0; i<gumbaArray.length; i++){
    if(gumbaArray[i].alive === true){
        ctx.drawImage(gumbaArray[i].walk("champ", 40), gumbaArray[i].x, gumbaArray[i].y)
    } else {
        ctx.drawImage(gumbaArray[i].die(), gumbaArray[i].x, gumbaArray[i].y + 20)
    }
        
    }
     // Image des Koopas
     for(let i = 0; i<koopaArray.length; i++){
        if(koopaArray[i].alive === true) {
            ctx.drawImage(koopaArray[i].walk("tortue", 40), koopaArray[i].x, koopaArray[i].y)
        } else {
            ctx.drawImage(koopaArray[i].die(), koopaArray[i].x, koopaArray[i].y + 30)
        }
    }

    for(let i = 0; i<redKoopaArray.length; i++){
        if(redKoopaArray[i].alive === true) {
            ctx.drawImage(redKoopaArray[i].walk("tortueRouge", 40), redKoopaArray[i].x, redKoopaArray[i].y)
        } else {
            ctx.drawImage(redKoopaArray[i].die(), redKoopaArray[i].x, redKoopaArray[i].y + 30)
        }
    }


    // Image de Mario
    if(mario.alive === true){
        if(mario.jumping === true){
            ctx.drawImage(mario.jump(), mario.x, mario.y);
        }  else{
            ctx.drawImage(mario.walk("mario", 30), mario.x, mario.y);
        }
    } else {
        ctx.drawImage(mario.dies(), mario.x, mario.y)
    }


   
  

    // Game Over
   if(timeRemaining > 0 && mario.alive === true && coinsCounter === 10 && scene.xPos > 2000){
    gameOver = true;
    ctx.font = "60px Arial"
    ctx.fillText("Gagné !!", 120, 180)
    if(soundPlay === true){
        soundGameBeated.play()
        soundPlay = false
    }
   } else if (timeRemaining <=0 || mario.alive === false){
    gameOver === true
    ctx.font = "60px Arial"
    ctx.fillText("Perdu !!", 120, 180)
   }

    // Affichage pièces encaissées
    ctx.font = "20px Arial"
    ctx.fillText(coinsCounter + "/10", 420, 25)
    // Temps restant
    if(timeRemaining > 0){
        timeRemaining = 100 - Math.round(timeCounter/100)
    }
    ctx.fillText(timeRemaining, 5, 25)

    ctx.lineWidth = 3;
    ctx.strokeRect(0,0, cvs.width, cvs.height);
    requestAnimationFrame(draw);
}
draw();
