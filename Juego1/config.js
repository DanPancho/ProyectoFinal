'use strict';

import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getFirestore,query ,collection,limit, orderBy,getDocs} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";


//Variable para la comunicacion con firebase
// Autenticacion
const auth = getAuth();
const db = getFirestore();
const Juegosdb = collection(db,'Juegos');
// La programacion va a ser en modulos
// Importo codigo de un archivo aperte
// Dentro de scape exporto Game
import { Game } from './scape.js';

document.getElementById('play').addEventListener('click',function(){
    crearJuego();
    document.querySelector('.startGame').classList.toggle('startGame_off');
})

document.getElementById('btn2').addEventListener('click',function(){
    crearJuego();
    document.querySelector('.Puntajes').style.display = 'none';
});

document.getElementById('pun').addEventListener('click',function(){
    document.querySelector('.startGame').classList.toggle('startGame_off');
    document.querySelector('.Puntajes').classList.toggle('Puntajes_On');
    onAuthStateChanged(auth,(user)=>{
        if(user){
            const q = query(Juegosdb,orderBy('ScapePuntaje','desc'),limit(20));
            leer(q);
        }
        else{
            document.querySelector('.scores').innerHTML = 'Por Favor Inicie Sesion Para Ver los Puntajes'
        }
    })
    
});

async function leer(q){
    const query = await getDocs(q);
    query.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        document.querySelector('.scores').innerHTML += `<li>${doc.data().nombre} : ${doc.data().ScapePuntaje}</li>`;
    });
}

const crearJuego = ()=>{
    const config = {
        type: Phaser.AUTO, // Que el navegador decisa si usa canvas o web gl
        width: screen.width ,
        height: screen.height - 175,
        scene: [Game], // se podria decir que son las pantallas y que tengan logica diferente
        physics:{ // Configuracion de fisicas
            default: 'arcade',
            arcade: { 
                gravity: {y: 600},
                debug: false
            }
        }
    }
    
    var game = new Phaser.Game(config); // Aqui se instacia el juego
}