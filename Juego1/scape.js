'use strict';
// Esto va a ser lo que importo
// ES una escena
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getFirestore,collection, doc,setDoc} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();
const Juegosdb = collection(db,'Juegos');

var aux;
//export es parte de la progrmacion en modulos
export class Game extends Phaser.Scene { 

    constructor() { 
        super({key: 'game'})// Se signa un nombre unico a cada escena
    }


    // Aqui es el ciclo de vida
    preload(){
        // precargar de imagenes sonidos o otros archivos
        this.load.image('background', './img/Fondo.png');
        this.load.image('platform', './img/Plataforma.png');
        this.load.spritesheet('character', './img/character.png',{
            frameWidth: 55,
            frameHeight: 75
        });
        this.load.spritesheet('enemi','./img/enemigo.png',{
            frameWidth: 360,
            frameHeight: 207
        });
        this.load.spritesheet('enemis','./img/enemigos.png',{
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('pajaro','./img/pajaro.png',{
            frameWidth: 182,
            frameHeight: 169
        })

        this.load.image('GameOver','./img/GameOver.png');
    }

    create(){
        // Aqui se crea la escena
        //coordenadas
       this.fondo =  this.add.image(screen.width/2,(screen.height - 175)/2,'background');
       this.fondo.setDisplaySize(screen.width,screen.height);


       this.enemigoP = this.physics.add.sprite(screen.width - (screen.width - 270),screen.height - 406,'enemi').setImmovable();
       this.enemigoP.setDisplaySize(500,300);
       this.enemigoP.body.allowGravity = false;
        

       this.personaje = this.physics.add.sprite(screen.width /2 - 100,screen.height - 500,'character');
       this.personaje.setDisplaySize(90,150);
       this.personaje.body.allowGravity = true;
       this.personaje.body.collideWorldBounds = true;


       this.platform1 =  this.physics.add.image(screen.width / 2, screen.height - 210,'platform').setImmovable();
       this.platform1.setDisplaySize(screen.width,90);
       this.platform1.body.collideWorldBounds = true;

       this.enemigo1 = this.physics.add.sprite(screen.width - 10,screen.height - 325,'enemis').setImmovable();
       this.enemigo1.setDisplaySize(140,140);
       this.enemigo1.body.allowGravity = false;


       this.enemigo2 = this.physics.add.sprite(screen.width + 800,screen.height - 325,'enemis').setImmovable();
       this.enemigo2.setDisplaySize(140,140);
       this.enemigo2.body.allowGravity = false;


       this.pajaro = this.physics.add.sprite(screen.width - 10, screen.height - 650,'pajaro').setImmovable();
       this.pajaro.setDisplaySize(150,150);
       this.pajaro.body.allowGravity = false;
         // Respawn enemigos
       this.GameOver = this.add.image(screen.width / 2, 230,'GameOver');
       this.GameOver.visible = false;
        this.GameOver.setDisplaySize(500,500);         
        function generar(enemi,x,y){
        
            if(x == 400){
                enemi.x = screen.width + x;
                enemi.y = screen.height - y;
            }
            else{
                enemi.x = screen.width - x;
                enemi.y = screen.height - y;
            }

            var zombie = Math.floor(Math.random() * (5 - 1) + 1);

            if(zombie == 1){
                enemi.play('zoombie_run');
            }
            else if(zombie == 2){
                enemi.play('zoombie_run2');
            }
            else if(zombie == 3){
                enemi.play('zoombie_run3');
            }
            else{
                enemi.play('zoombie_run4');
            }
            // Mas uno al puntaje
            aux = parseInt(document.querySelector('.score').textContent,10);
            aux+=1;
            document.querySelector('.score').innerHTML = aux;
            
        }

        function generar_pajaro(pajaro){
            pajaro.x = screen.width - 10;
            pajaro.y = screen.height - 650;
        }
       

        this.anims.create ({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character',{
                start: 3,
                end: 5
            }),
            repeat: -1,
            frameRate: 6
        });
        
        
        
        this.anims.create({
            key: 'salto',
            frames: this.anims.generateFrameNumbers('character', {
                start: 6,
                end: 7
            }),
            repeat: 1,
            frameRate: 5 
        })
 
        this.anims.create({
            key: 'enemi_run',
            frames: this.anims.generateFrameNumbers('enemi',{
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 5
        });
        this.anims.create({
            key: 'zoombie_run',
            frames: this.anims.generateFrameNumbers('enemis',{
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 5
        });

        this.anims.create({
            key: 'zoombie_run2',
            frames: this.anims.generateFrameNumbers('enemis',{
                start: 4,
                end: 7
            }),
            repeat: -1,
            frameRate: 5
        });

        this.anims.create({
            key: 'zoombie_run3',
            frames: this.anims.generateFrameNumbers('enemis',{
                start: 8,
                end: 11
            }),
            repeat: -1,
            frameRate: 5
        });

        this.anims.create({
            key: 'zoombie_run4',
            frames: this.anims.generateFrameNumbers('enemis',{
                start: 12,
                end: 15
            }),
            repeat: -1,
            frameRate: 5
        });

        this.anims.create({
            key: 'pajaro_fly',
            frames: this.anims.generateFrameNumbers('pajaro',{
                start: 3,
                end: 8
            }),
            repeat: -1,
            frameRate: 6
        });

        this.personaje.play('right');
        this.enemigoP.play('enemi_run');
        this.enemigo1.play('zoombie_run');
        this.enemigo2.play('zoombie_run');
        this.pajaro.play('pajaro_fly');
 
        this.ejecutando = true;
        this.saltando = false;

        const intervalo = function(enemi1){
            setInterval(function(){ generar(enemi1,10,325)},10000);
        }

        const intervalo2 = function(enmigo2){
            setInterval(function(){generar(enmigo2,400,325)},16000);
        }
        
        const interval3 = function(pajaro){
            setInterval(function(){generar_pajaro(pajaro);},20000)
        }

        intervalo2(this.enemigo2);
        intervalo(this.enemigo1);
        interval3(this.pajaro);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.personaje,this.pajaro);

 
       
    }
    // Aqui va el ciclo de vida de mi escena
    update(){ 
       
        
        
        this.physics.collide(this.personaje, this.platform1,noSalto,null,this);
      this.physics.collide(this.personaje,this.enemigo1,Salto,null,this);
      this.physics.collide(this.personaje,this.enemigo2,Salto,null,this);
       this.physics.collide(this.personaje,this.enemigoP,Over,null,this);
        this.enemigo1.setVelocityX(-300);
        this.enemigo2.setVelocityX(-300);
        this.pajaro.setVelocityX(-220);


        if((this.cursor.space.isDown && !this.saltando)){
            
            this.personaje.setVelocityY(-490);
            this.personaje.play('salto');
            this.saltando = true;
            this.ejecutando = false;
            
        }

        

        function noSalto(){
            if(!this.ejecutando){
                this.personaje.play('right');
                this.ejecutando = true;
                this.saltando = false;
                this.personaje.setVelocityX(10);
            }
        }
        
        function Salto(){
            this.saltando = false;
        }
       
        function Over(){
            this.GameOver.visible = true;
            //document.querySelector('.score').classList.toggle('Puntaje_Juego_off');
            document.querySelector('.GameOver').classList.toggle('GameOver_on');
            document.querySelector('.Puntaje_Juego').style.display = 'none';
            onAuthStateChanged(auth,(user) => {
                if(user){
                    const nuevoPuntaje = {
                        ScapePuntaje: aux,
                        id: user.uid,
                        nombre: user.displayName,
                        skin: 'default'
                    }
                    insertar(nuevoPuntaje);
                }
                else{
                    document.querySelector('.socore_final').innerHTML = "Debe iniciar sesion para poder guardar su puntuacion";
                }
            })

            document.getElementById('again').addEventListener('click',function(){
                window.location ='./juego1.html';
            });
            this.scene.pause();
        }

        async function insertar(nuevoPuntaje){
            await setDoc(doc(Juegosdb),nuevoPuntaje);
            document.querySelector('.socore_final').innerHTML = aux;
        }
        
    }
}