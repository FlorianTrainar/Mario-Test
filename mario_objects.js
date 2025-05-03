import { scene } from "./mario.js";

export class Object{
    constructor(x,y, width, height){
        this.x = x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.imgObject = new Image()
    }
    motion(){
        if(scene.xPos > 0){
            this.x = this.x + scene.dx
        }
    }
}

export class Bloc extends Object{
    constructor(x,y){
        super(x,y, 30,30);
        this.imgObject.src = "./src/images/bloc.png"
    }
}

export class Pipe extends Object{
    constructor(x,y){
        super(x,y, 43,65);
        this.imgObject.src = "./src/images/tuyauRouge.png"
    }
}

export class Coin extends Object{
    constructor(x,y){
        super(x,y,30,30)
        this.imgObject.src= "./src/images/piece1.png"
        this.coinCount = 0;
        this.frequency = 40;
    }
    variation(){
        let str = ""
        this.coinCount++;
        if(this.coinCount % this.frequency <= this.frequency/2){
            str="./src/images/piece1.png"
        } else {
            str="./src/images/piece2.png"
        }
        if(this.coinCount === 2*this.frequency){
            this.coinCount = 0
        }
        this.imgObject.src = str;
        return this.imgObject;
    }
}