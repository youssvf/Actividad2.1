const rutaUsers ='18.214.150.84:3000/usuarios';
const rutaProducts = '18.214.150.84:3000/coches';


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nombre").addEventListener("blur", validarNombre);
  document.getElementById('apellidos').addEventListener('blur',validarApellidos);
  document.getElementById('usuario').addEventListener('blur',validarUsuario);
  document.getElementById('contraseña').addEventListener('blur',validarContraseña);
  document.getElementById('contraseñarepe').addEventListener('blur',validarContraseñaRepetida);
  document.getElementById('email').addEventListener('blur',validarEmail);
  document.getElementById('formulario').addEventListener('submit',validarFormulario);
  document.getElementById('registrar').addEventListener('click',post);
});

function registrar(e) {}

function validarNombre(e){
  const input = document.getElementById('nombre');
  const span = document.getElementById('errornombre');

  if(input.value.length === 0){
      span.innerText='Campo obligatorio';
      return false;
  } else {
      span.innerText='';
      input.value = transformarNombre(input.value);
      return true;
  
  }
}

function transformarNombre(nombre){
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
}



function validarApellidos(e){
  const input = document.getElementById('apellidos');
  const span = document.getElementById('errorapellido');

  if(input.value.length<3){
      span.innerText='Longitud mínima de 3';
      return false;
  } else {
      span.innerText='';
      input.value = transformarApellidos(input.value);
      return true;
  }
}

function transformarApellidos(apellidos){
  return apellidos.split(' ').map((apellido)=> transformarNombre(apellido)).join(' ');
}


function validarUsuario(e){
  const input = document.getElementById('usuario');
  const span = document.getElementById('errorusuario');


  if(input.value.length===0){
      span.innerText='Campo obligatorio';
      return false;
  } else {
      span.innerText='';
      return true;
  }
}

function sugerirUsuario(e){
  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;

  const input = document.getElementById('usuario');

  input.placeholder = nombre.charAt(0).toLowerCase()+(apellidos.split(' '))[0].toLowerCase();
}

function validarContraseña(e){
  const input = document.getElementById('contraseña');
  const span = document.getElementById('errorcontraseña');

  const patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ;

  if(!patron.test(input.value)){
      span.innerText='Contraseña no segura';
      return false;
  } else {
      span.innerText='';
      return true;
  }
}


function validarContraseñaRepetida(e){
  const contraseña = document.getElementById('contraseña').value;
  const contraseñarepe = document.getElementById('contraseñarepe').value;
  const span = document.getElementById('errorcontraseñarepe');

  if(contraseña !== contraseñarepe){
      span.innerText='Las contraseñas no coinciden';
      return false;
  } else {
      span.innerText='';
      return true;
  }

}

function validarEmail(e) {
  const input = document.getElementById("email");
  const span = document.getElementById("erroremail");
  const patron =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (input.value === 0) {
    span.innerText = "Campo obligatorio";
    return false;
  } else if (!patron.test(input.value)) {
    span.innerText = "E-mail inválido";
    return false;
  } else {
    span.innerText = "";
    return true;
  }
}

function validarFormulario(e){
  const span = document.getElementById('errorForm');
  e.preventDefault();

  if(!validarNombre(e)){
      span.innerText='Revisar nombre';
      return false;
  } else if(!validarApellidos(e)){
      span.innerText='Revisar apellido';
      return false;
  } else if(!validarEmail(e)){
      span.innerText='Revisar E-mail';
      return false;
  }else if(!validarUsuario(e)){
      span.innerText='Revisar usuario';
      return false;
  } else if(!validarContraseña(e)){
      span.innerText='Revisar Contraseña';
      return false;
  } else if(!validarContraseñaRepetida(e)){
      span.innerText='Revisar contraseña';
      return false;
  }   else {
      span.innerText='';
      post();
      window.location.href="../inicio/coches.html";
  }
}


async function post() {
  const usuario = {
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    usuario: document.getElementById("usuario").value,
    password: document.getElementById("contraseña").value,
    email: document.getElementById("email").value,
    news: false
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(usuario),
  };

  try {
    let response = await fetch(rutaUsers, options);
    if(response.ok){
      try {
        let data = response.json();
        console.log(data);
      } catch (error) {
        console.error('error de parseo');
      }
    } else {
      console.log(response.status());
    }
  } catch (error) {
    console.error('Error de petición')
  }
}


