window.onload = function() {
    const form = document.querySelector('#formulario');
    form.onsubmit = function(event) {
        event.preventDefault(); // Evita el envío del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data);
        ajaxSubmit('data/texto.txt', data);
    };
};

function ajaxSubmit(url, data) {
    const xhr = new XMLHttpRequest(); // Crear una nueva instancia de XMLHttpRequest
    xhr.onreadystatechange = function() {
        
        if (xhr.readyState === 4) { // Verificar si la solicitud se ha completado
           /* if (xhr.status === 200) {*/ // Verificar si la respuesta es exitosa
                console.log('Datos:', xhr.responseText);
           /* } else {
                console.error('Error al enviar los datos');
            }*/
        }
    };
    xhr.open('POST', url, true); // Configurar la solicitud POST
    /*xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');*/
    xhr.send(/*JSON.stringify(data)*/); // Enviar los datos en formato JSON
}
