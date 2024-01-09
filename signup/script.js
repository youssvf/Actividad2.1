document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nombre").addEventListener("blur", validarnombre);
  document.getElementById('apellidos').addEventListener('blur',validarApellido);
  document.getElementById('usuario').addEventListener('blur',validarUsuario);
});

function registrar(e) {}

function validarnombre(e) {
  const inputname = document.getElementById("nombre");
  const spanerror = document.getElementById("erronombre");

  if (inputname.value.length == 0) {
    document.getElementById("errornombre").innerText = "Campo obligatorio";
    return false;
  } else {
    document.getElementById('errornombre').innerText='';
    return true;
  }
}

function validarApellido(e){
    const input = document.getElementById('apellidos').value;

    if(input.length == 0){
        document.getElementById('errorapellido').innerText='erorr';
    } else {
        document.getElementById('errorapellido').innerText='';
    }
}

function validarUsuario(e){
    const input = document.getElementById('usuario').value;
    alert(input);
}
