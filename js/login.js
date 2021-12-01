//Registro nuevo usuario
import { FacebookAuthProvider,signInWithPopup,GoogleAuthProvider,getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getFirestore,collection,getDocs } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";


//Variable para la comunicacion con firebase
// Autenticacion
const auth = getAuth();
const fs = getFirestore();



// CREACION DE USUARIO
const form = document.getElementById('form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
    
    createUserWithEmailAndPassword(auth, mail,password)
    .then(userCredential => {
        console.log(userCredential);
    })
    .catch((e) => { 
        console.log(e.message + " Resgistro");
    })
})




const btn_ini = document.getElementById('btn_ini');
const reg = document.getElementById('registro');
const ini_s = document.getElementById('init');
btn_ini.addEventListener('click' ,function(e){
    e.preventDefault();
    reg.classList.toggle('descativar_reg');
    ini_s.classList.toggle('activar_ini');
});



// INICIO DE SESION
const form2 = document.getElementById('form_signin');
    form2.addEventListener('submit', function(e){
        e.preventDefault();
        const mail = document.getElementById('mail_signin').value;
        const password = document.getElementById('password_signin').value;
        signInWithEmailAndPassword(auth, mail,password)
        .then(userCredential => {
            console.log("se logro iniciar sesion");
        })
        .catch((e) => { 
            console.log(e.message + "INICIO");
        })
    });
    
    const btn  = document.getElementById('log_out');

    btn.addEventListener('click', function(){
        signOut(auth).then(function (){
            console.log("Se salio de la cuenta");
        })
        
    });



    // VER ESTADO DE LA CUENTA

    // ESTO ES UN EVENTO
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if(user.displayName == null){
                alert("Bienvenido Gamer");
            }
            else{
               alert("Bienvenido " + user.displayName);
            }   
        } else {console.log("No esta logeado");}

    })

const btn_reg = document.getElementById('btn_reg');

btn_reg.addEventListener('click' ,function(){
    window.location.reload();
});

// INICIO O REGISTRO DE CUENTA CON GOOGLE
// Traemos la autetificacion de google

const provider = new GoogleAuthProvider();

document.querySelector('.google').addEventListener('click',function(e){
    e.preventDefault();
    signInWithPopup(auth,provider)
    .then(function (resultado){
        console.log(resultado);
    })
    .catch((e) =>{
        console.log(e);
    })
});


// INICIO O REGISTRO DE CUENTA CON Facebook
// Traemos la autetificacion de facebook

const fb = new FacebookAuthProvider();

document.querySelector('.fb').addEventListener('click',function(e){
    e.preventDefault();
    signInWithPopup(auth,fb)
    .then((result) =>{
        console.log(result);
    })
    .catch((e)=>{
        console.log(e);
    })
});



