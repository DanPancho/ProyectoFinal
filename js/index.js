const boton = document.querySelector(".nav_toggle");
const nav_ul = document.querySelector(".nav_u");

boton.addEventListener("click", () => {
    nav_ul.classList.toggle("active_nav");
});

var cont =1;
setInterval(() =>{
    var radio = document.getElementById('radio' + cont);
    radio.checked = true;
    cont++;
    if(cont > 3){cont=1;}
},4000)

const btn = document.getElementById('juego1');
btn.addEventListener('click', function() { 
    location.href='../Juego1/juego1.html';
})

document.getElementById('juego2').addEventListener('click',function(){
    location.href = '../Juego2/juego2.html';
});