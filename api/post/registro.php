<?php
include_once '../connectbd.php';
$data = json_decode(file_get_contents('php://input'), true);
// Aquí puedes procesar los datos recibidos en $data
$nombre = $data['nombre'] ?? '';
$edad = $data['edad'] ?? '';
$direccion = $data['direccion'] ?? '';
$correo = $data['email'] ?? '';
$telefono = $data['telefono'] ?? '';

if (empty($nombre) || empty($edad) || empty($direccion) || empty($correo) || empty($telefono)) {
    echo json_encode(
        array(
            "status" => "error",
            "message" => "Faltan datos obligatorios"
        )
    );
    exit;
}

$sql = "INSERT INTO `usuarios` (`nombre`, `edad`, `direccion`, `correo`, `telefono`) VALUES ('$nombre', '$edad', '$direccion', '$correo', '$telefono');";

if($connect->query($sql) === TRUE) {
    echo json_encode(
    array(
        "status" => "success",
        "message" => "Registro completado"
    )
); 
} else {
    echo json_encode(
    array(
        "status" => "error",
        "message" => "Error al registrar"
    )
);
}

$connect->close();
?>