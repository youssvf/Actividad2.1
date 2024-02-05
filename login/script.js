const ruta ='http://18.214.150.84:3000/usuarios';

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('iniciar').addEventListener('click',login);
})

async function login(e){
    e.preventDefault();

    const username = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;
    const span = document.getElementById("errorlogin");

    let response = await fetch(ruta+`?email=${username}&&password=${contraseña}`);
    if(response.ok){
        let usuario = await response.json();
        if(usuario.length > 0){
            console.log(usuario);
            if(contraseña ===  usuario[0]["password"]){
                guardarSesion(usuario);
                span.innerText='';
                window.location.href="../inicio/coches.html";
                return true;
                } else {
                span.innerText='Datos incorrectos.'
                return false;
            }
        } else {
            span.innerText='Datos incorrectos';
        }
    } else {
        console.error('código de error: ', response.status);
    }
}

function guardarSesion(usuario){
    sessionStorage.setItem('sesionIniciada', JSON.stringify(usuario));
}
