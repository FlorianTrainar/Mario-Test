export class Scene{
    constructor(widthScene, heightScene){
        this.widthScene = widthScene;
        this.heightScene = heightScene;
        this.xPos = 1;  // position par rapport à l'origine du parcours
        this.yFloor = 293;

        this.background = new Image();
        this.background.src= "./src/images/fondEcran.png"
        this.width = 800;
        this.height = 350;
        this.xBackground1= -50;
        this.xBackground2= 750;
        this.dx = 0;
        this.roofHeight = 0;

        this.imgStartCastle = new Image();
        this.imgStartCastle.src = "./src/images/chateau1.png"
        this.imgStart = new Image();
        this.imgStart.src = "./src/images/depart.png"
        this.imgFlag = new Image();
        this.imgFlag.src = "./src/images/drapeau.png"
        this.imgEndCastle = new Image();
        this.imgEndCastle.src = "./src/images/chateauFin.png"

    }

    backgroundMotion(ctx){
        if (this.xBackground1 === -800){this.xBackground1 = +800}
        else if (this.xBackground2 === -800){this.xBackground2 = +800}
        else if (this.xBackground1 === +800){this.xBackground1 = -800}
        else if (this.xBackground2 === +800){this.xBackground2 = -800}

        ctx.drawImage(this.background, this.xBackground1, 0)
        ctx.drawImage(this.background, this.xBackground2, 0)

        if(this.xPos >= 0){ 
            this.xPos = this.xPos - this.dx;
            this.xBackground1 = this.xBackground1 + this.dx;
            this.xBackground2 = this.xBackground2 + this.dx;
        }
        if (this.xPos < 0){
            this.xPos = 0;
            this.xBackground1 = -50;
            this.xBackground2 = 750;
        }

// ---

        ctx.drawImage(this.imgStartCastle, 10 - this.xPos, 95)
        ctx.drawImage(this.imgStart, 220 - this.xPos, 234);

        // Image fin
        ctx.drawImage(this.imgFlag, 2100 - this.xPos, 115)
        ctx.drawImage(this.imgEndCastle, 2200 - this.xPos, 145)
    }
}