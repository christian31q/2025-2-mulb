window.onload = function() {
    const form = document.querySelector('#formulario');
    console.log(getCookie('token'));
    form.onsubmit = function(event) {
        event.preventDefault(); // Evita el envío del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        ajaxSubmit('api/post/login.php', data);
        } 
};

function ajaxSubmit(url, data) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                respuestaServerData(xhr.responseText);
            } else {
                console.error('Error al enviar los datos');
            }
        }
    };
    const jsonData = JSON.stringify(data);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(jsonData);
}

function respuestaServerData(respuesta) {
    const respuestaDiv = document.getElementById('respuesta');
    let respuestaObj = JSON.parse(respuesta);
    respuestaDiv.innerText = respuestaObj.mensaje;
    if (respuestaObj.status === 'success') {
        setCookie('token', true, 1); // Guarda la cookie por 1 día
    }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}