window.onload = function() {
    const form = document.querySelector('#formulario');
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
    /*if (respuestaObj.status === 'success') {
        sessionStorage.setItem('token', "true");
    }*/
}

