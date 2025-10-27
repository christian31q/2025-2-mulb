<?php
// Read raw POST data correctly
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Get data from JSON (if present)
$nombre = $data['nombre'] ?? '';
$imagen = $data['imagen'] ?? '';

// If 'imagen' is base64 data, you can decode and save it:
if (!empty($imagen)) {
    // Decode base64 image
    $decodedImage = base64_decode($imagen);

    // Create image directory if it doesn't exist
    $targetDir = "../../imagenes/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    // Generate a filename (you can change this logic)
    $fileName = $targetDir . uniqid('img_') . ".png";

    // Save image to disk
    if (file_put_contents($fileName, $decodedImage)) {
        echo "Imagen guardada correctamente en: " . $fileName;
    } else {
        echo "Error al guardar la imagen.";
    }
} else {
    echo "No se recibió ninguna imagen.";
}
?>
