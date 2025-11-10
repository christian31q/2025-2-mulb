<?php
include_once '../connectbd.php';
// Read raw POST data correctly
$input = file_get_contents('php://input');
$data = json_decode($input, true);
// Get data from JSON (if present)
$correo = $data['correo'] ?? '';
$contrasena = $data['contrasena'] ?? '';
$sql = "SELECT * FROM `usuarios` WHERE correo='$correo';";

$result = $connect->query($sql);
//echo $result;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hash = $row['contrasena'];
    if (password_verify($contrasena, $hash)) {
        echo json_encode(
            array(
                "status" => "success",
                "mensaje" => "Inicio de sesión exitoso"
            )
    );
    } else {
        echo json_encode(
            array(
                "status" => "error",
                "mensaje" => "Correo o contraseña incorrectos"
            )
        );
    }
} else {
    echo json_encode(
        array(
            "status" => "error",
            "mensaje" => "Correo o contraseña incorrectos"
        )
    );
}
$connect->close();
?>
