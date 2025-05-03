import { scene } from "./mario.js";

const soundBoom = new Audio()
soundBoom.src = "./src/audio/boom.wav"
const soundGameOver = new Audio()
soundGameOver.src = "./src/audio/partiePerdue.wav"



export class Character{
    constructor(x, y, width, height){
        this.x = x;
        this.y= y;
        this.width = width;
        this.height = height
        this.img = new Image();
        this.count = 0;
        this.walking = false;
        this.toTheRight = true;
        this.alive = true
    }

    motion(){
        if(scene.xPos > 0){
            this.x = this.x + scene.dx
        }
    }

    walk(name, frequency){
        let str = "";
        this.img = new Image();

        if(this.walking=== false || scene.xPos <= 0){
            if(this.toTheRight === true){
                str = "./src/images/" +name+"ArretDroite.png";
            } else {
                str = "./src/images/" +name+"ArretGauche.png";
            }
        } else {
            this.count++;
            if(this.count % frequency <= frequency/2) {
                if(this.toTheRight === true) {
                    str = "./src/images/" +name+"MarcheDroite.png"
                } else {
                    str = "./src/images/" +name+"MarcheGauche.png"
                }
            } else {
                if(this.toTheRight === true) {
                    str = "./src/images/" +name+"ArretDroite.png"
                } else {
                    str = "./src/images/" +name+"ArretGauche.png"
                }

            }
            if(this.count === 2*frequency){
                this.count === 0;
            }
        }
        this.img.src = str;
        return this.img;
    }
    contactRight(object){
        if (this.x + this.width < object.x || this.x + this.width > object.x + 5 || this.y + this.height <= object.y || this.y >= object.y + object.height){
            return false
        } else {
            return true
        }
    }
    contactLeft(object){
        if (this.x > object.x + object.width || this.x < object.x + object.width - 5 || this.y + this.height <= object.y || this.y >= object.y + object.height){
            return false
        } else {
            return true
        }
    }
    contactUp(object){
        if (this.x + this.width < object.x || this.x > object.x + object.width || this.y < object.y + object.height  || this.y > object.y + object.height + 5){
            return false
        } else {
            return true
        }
    }
    contactDown(object){
        if (this.x + this.width < object.x + 5 || this.x > object.x + object.width - 5 || this.y +this.height < object.y || this.y + this.height > object.y +5){

             return false
        } else {
            return true
        }
    }
    near(object){
        if((this.x > object.x -10 && this.x < object.x + object.width + 10) || (this.x + this.width > object.x -10 && this.x + this.width < object.x + object.width + 10)) {
            return true
        } else {
            
            return false
        }  
    }

    

    
}

export class Mario extends Character{
    constructor(x, y){
        super(x,y, 28, 50);
        this.imgMario = new Image();
        this.img.src = "./src/images/marioArretDroite.png";
        this.jumping = false;
        this.jumpCount = 0;
        this.deadCount = 0;
    }



    jump(){
        let str = "";
        this.img = new Image();
        this.jumpCount++;
        // Montée du saut
        if(this.jumpCount <=35) {
            if(this.y > scene.roofHeight){this.y=this.y - 4 ;}
            else{this.y === 36}
            if(this.toTheRight === true){str= "./src/images/marioSautDroite.png"}
            else{str="./src/images/marioSautGauche.png"}
        }
        // Retombée
        else if (this.y + this.height< scene.yFloor) {
            this.y = this.y +4;  
            if(this.toTheRight === true){str= "./src/images/marioSautDroite.png"}
            else{str="./src/images/marioSautGauche.png"}
        }
        // Saut terminé
        else {
            if(this.toTheRight === true){str= "./src/images/marioArretDroite.png"}
            else{str="./src/images/marioArretGauche.png"}
            this.jumping= false;
            this.jumpCount= 0
        }
        this.img.src = str;
        return this.img;
    }

    
    

    contact(object){
// contact horizontal
        if((this.toTheRight === true && this.contactRight(object)=== true) || (this.toTheRight === false && this.contactLeft(object) ===true)) {
            scene.dx = 0
            this.walking = false
        }
 // contact vertical
        if(this.contactUp(object) === true){
            scene.roofHeight = object.y + object.height
        } else if (this.contactUp(object)===false && this.jumping === false) {
            scene.roofHeight = 0
        }

 // contact object dessous
        if (this.contactDown(object) === true && this.jumping === true) {
            scene.yFloor = object.y;
        } else if (this.contactDown(object) === false) {   
            scene.yFloor = 293
        }
    
    }
    
    contactCoin(coin){
        if(this.contactRight(coin) === true || this.contactLeft(coin) === true || this.contactDown(coin) === true || this.contactUp(coin) ===true) {
return true
        } else {
            return false
        }
    }

    contactCharacter(character){
        if (this.contactRight(character) === true || this.contactLeft(character) === true){
            this.alive = false
            this.walking = false
        } else if (this.contactDown(character) === true) {
            character.alive = false
            character.walking = false 
        }
    }

    dies(){
        let str = "./src/images/boom.png"
        if(this.deadCount === 0){
            soundBoom.play();
        }
        if(this.deadCount === 100){
            soundGameOver.play();
        }
        this.deadCount++
        if(this.deadCount > 100){
            str = "./src/images/marioMeurt.png"
            this.y --;
        }
        this.img.src = str;
        return this.img
    }


 

}





export class Gumba extends Character{
    constructor(x, y){
        super(x,y, 27, 30);
        this.img.src = "./src/images/champArretDroite.png"
        this.dxGumba = 1;
        this.walking = true;
        this.toTheRight = false;
    }
    move(){
        if (this.alive === true){
            if(this.toTheRight === true){
                this.dxGumba = 0.5
            } else {
                this.dxGumba = -0.5
            }
            this.x = this.x + this.dxGumba
        } 
    }

    contact(entity){
        if(this.contactRight(entity)===true && this.toTheRight === true){
            this.toTheRight = false 
            this.dxGumba =-1
        } else if (this.contactLeft(entity) === true && this.toTheRight ===false){
            this.toTheRight = true
            this.dxGumba = 1
        }
    }

    die(){
        let str = ''
        if(this.toTheRight === true){
            str = "./src/images/champEcraseDroite.png"
        } else {
            str = "./src/images/champEcraseGauche.png"
        }
        this.img.src = str
        return this.img
    }
}

export class Koopa extends Character{
    constructor(x, y){
        super(x,y, 43, 50);
        this.img.src = "./src/images/tortueArretDroite.png"
        this.dxKoopa = 1;
        this.walking = true;
        this.toTheRight = false;
    }
    move(){
        if (this.alive === true){
            if(this.toTheRight === true){
                this.dxKoopa = 1
            } else {
                this.dxKoopa = -1
            }
            this.x = this.x + this.dxKoopa
        }
    }

    contact(entity){
        if(this.contactRight(entity)===true && this.toTheRight === true){
            this.toTheRight = false 
            this.dxKoopa =-1
        } else if (this.contactLeft(entity) === true && this.toTheRight ===false){
            this.toTheRight = true
            this.dxKoopa = 1
        }
    }

    die(){
       
        this.img.src = "./src/images/tortueFermee.png"
        return this.img
    }
}

