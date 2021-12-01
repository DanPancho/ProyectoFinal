'use strict'
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getFirestore,collection, doc,setDoc} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

const auth = getAuth;
const db = getFirestore();
const Juegosdb = collection(db, 'Juegos');

export class Game extends Phaser.Scene {
    constructor(){
        super({key: 'game'})
    }

    preload(){
        this.load.image('plataforma','./img/plataforma.png');
        this.load.image('bloque1','./img/Bloque1.png');
        this.load.image('bloque2','./img/Bloque2.png');
        this.load.image('bola','./img/bola.png');
        this.load.image('GameOver','../Juego1/img/GameOver.png');
        this.load.image('Win','./img/youWin.png');
        
    }

    create(){

        this.physics.world.setBoundsCollision(true, true, true, false);
        this.plataforma = this.physics.add.image(screen.width / 2,screen.height - 300,'plataforma').setImmovable();
        this.plataforma.body.allowGravity = false;
        this.plataforma.setDisplaySize(300,180);

        this.bola = this.physics.add.image(screen.width / 2,70,'bola');
        this.bola.body.allowGravity = true;
        this.bola.setDisplaySize(70,70);
        this.bola.body.collideWorldBounds = true;
        this.plataforma.body.collideWorldBounds = true;

        this.GameOver = this.add.image(screen.width / 2, 230,'GameOver');
        this.GameOver.visible = false;
        this.GameOver.setDisplaySize(500,500); 


        this.Win = this.add.image(screen.width / 2, 230,'Win');
        this.Win.visible = false;
        this.Win.setDisplaySize(500,500);    

        let velocidad = 100 * Phaser.Math.Between(1.3,2);
        if( Phaser.Math.Between(0,10) > 5){
            velocidad = 0-velocidad;
        }
        this.bola.setVelocity(velocidad,10);
        this.bola.setBounce(1.02);



        // Bloques = 10
        this.bloque1 = this.physics.add.image(screen.width - 100, Math.floor(Math.random() * ((screen.height / 2) - 50) + 50),'bloque1').setImmovable();
        this.bloque1.body.allowGravity = false;
        this.bloque1.setDisplaySize(100,100);

        this.bloque2 = this.physics.add.image(screen.width - 250, Math.floor(Math.random() * ((screen.height / 2) - 50) + 50),'bloque2').setImmovable();
        this.bloque2.body.allowGravity = false;
        this.bloque2.setDisplaySize(100,100);

        this.bloque3 = this.physics.add.image(screen.width - 400, Math.floor(Math.random() * ((screen.height / 2) - 50) + 50),'bloque1').setImmovable();
        this.bloque3.body.allowGravity = false;
        this.bloque3.setDisplaySize(100,100);
        
        this.bloque4 = this.physics.add.image(screen.width - 550, Math.floor(Math.random() * ((screen.height / 2)  - 50) + 50),'bloque2').setImmovable();
        this.bloque4.body.allowGravity = false;
        this.bloque4.setDisplaySize(100,100);

        this.bloque5 = this.physics.add.image(screen.width - 700, Math.floor(Math.random() * ((screen.height / 2)  - 50) + 50),'bloque1').setImmovable();
        this.bloque5.body.allowGravity = false;
        this.bloque5.setDisplaySize(100,100);
        
        this.bloque6 = this.physics.add.image(250, Math.floor(Math.random() * ((screen.height / 2)  - 50) + 50),'bloque2').setImmovable();
        this.bloque6.body.allowGravity = false;
        this.bloque6.setDisplaySize(100,100);

        this.bloque7 = this.physics.add.image(400 , Math.floor(Math.random() * ((screen.height / 2)  - 50) + 50),'bloque1').setImmovable();
        this.bloque7.body.allowGravity = false;
        this.bloque7.setDisplaySize(100,100);

        this.bloque8 = this.physics.add.image(screen.width/2 - 200, Math.floor(Math.random() * ((screen.height / 2)  - 50) + 50),'bloque2').setImmovable();
        this.bloque8.body.allowGravity = false;
        this.bloque8.setDisplaySize(100,100);

        this.bloque9 = this.physics.add.image(screen.width/2 - 50, Math.floor(Math.random() * ((screen.height / 2)  - 50) + 50),'bloque1').setImmovable();
        this.bloque9.body.allowGravity = false;
        this.bloque9.setDisplaySize(100,100);
        
        this.bloque10 = this.physics.add.image(100, Math.floor(Math.random() * ((screen.height / 2)  - 50) + 50),'bloque2').setImmovable();
        this.bloque10.body.allowGravity = false;
        this.bloque10.setDisplaySize(100,100);
        this.cont = 0;
     

        

        this.cursor = this.input.keyboard.createCursorKeys();
    }
    update(){
        //this.physics.collide(this.plataforma,this.bola,rebote,null,this);
        this.physics.collide(this.plataforma,this.bola,rebote,null,this);
        this.physics.collide(this.bola,this.bloque1,eliminar1,null,this);
        this.physics.collide(this.bola,this.bloque2,eliminar2,null,this);
        this.physics.collide(this.bola,this.bloque3,eliminar3,null,this);
        this.physics.collide(this.bola,this.bloque4,eliminar4,null,this);
        this.physics.collide(this.bola,this.bloque5,eliminar5,null,this);
        this.physics.collide(this.bola,this.bloque6,eliminar6,null,this);
        this.physics.collide(this.bola,this.bloque7,eliminar7,null,this);
        this.physics.collide(this.bola,this.bloque8,eliminar8,null,this);
        this.physics.collide(this.bola,this.bloque9,eliminar9,null,this);
        this.physics.collide(this.bola,this.bloque10,eliminar10,null,this);
        if(this.cursor.left.isDown){
            this.plataforma.setVelocityX(-450);
        }
        else if(this.cursor.right.isDown){
            this.plataforma.setVelocityX(450);
        }
        else {
            this.plataforma.setVelocityX(0);
        }

        function rebote(){
            let velocidad = 100 * Phaser.Math.Between(2,4);
            if( Phaser.Math.Between(0,10) > 5){
                velocidad = 0 - velocidad;
            }
            this.bola.setVelocityX(velocidad);
        }
        function eliminar1(){
            this.bloque1.destroy();
            this.cont+=1;
        }
        function eliminar2(){
            this.bloque2.destroy();
            this.cont+=1;
        }
        function eliminar3(){
            this.bloque3.destroy();
            this.cont+=1;
        }
        function eliminar4(){
            this.bloque4.destroy();
            this.cont+=1;
        }
        function eliminar5(){
            this.bloque5.destroy();
            this.cont+=1;
        }
        function eliminar6(){
            this.bloque6.destroy();
            this.cont+=1;
        }
        function eliminar7(){
            this.bloque7.destroy();
            this.cont+=1;
        }
        function eliminar8(){
            this.bloque8.destroy();
            this.cont+=1;
        }
        function eliminar9(){
            this.bloque9.destroy();
            this.cont+=1;
        }
        function eliminar10(){
            this.bloque10.destroy();
            this.cont+=1;
        }

        // Game Over
        if(this.bola.y > screen.height){
            this.GameOver.visible = true;
            this.scene.pause();
            GameOver();
        }
        if(this.cont == 10){
            this.Win.visible = true;
            this.scene.pause();
            GameOver();
        }

        function GameOver(){
            document.querySelector('.GameOver').style.display = 'block';
            document.getElementById('again').addEventListener('click',function(){
                window.location = './juego2.html';
            })
        }
    }
}