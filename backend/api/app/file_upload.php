<?php 

// header('Content-Type: application/json; charset=UTF-8');

//
$dataResponse = array();
$dataResponse['status'] = 0;
$dataResponse['message'] = 'uploaded!';
$errors = array();

include 'WideImage/WideImage.php';

// ========================================================
// NEW VAR
$fileUpload = $_FILES['file'];
$fileName = 'upload/';

// //PREVIEW 1 FOTOS
if (!empty($fileUpload["name"])) {
    

    if($fileUpload['type'] !== 'image/jpeg' && $fileUpload['type'] !== 'image/jpg' && $fileUpload['type'] !== 'image/png'){
        $dataResponse["message"] = "Formato errado...".$fileUpload['type'];  
    } else {
        $image = WideImage::load($fileUpload["tmp_name"]);
        $fotoAtualWidth = $image->getWidth();
        $fotoAtualHeight = $image->getHeight();
        if($fotoAtualWidth >= $fotoAtualHeight) {
            $image = $image->resize(null,800); // largura maior
        } else {
            $image = $image->resize(800,null); // altura maior
        }                        
        $image = $image->crop('center', 'center', 800, 800);
        $image = $image->resize(800,800); // altura maior

        $image->saveToFile($fileName.$fileUpload["name"]);
        $dataResponse["message"] = "Upload Realizado!".$fileUpload['type']; 
        $dataResponse['status'] = 1;
    }

} else {
    $dataResponse["message"] = "Campo File vazioz...";
}

    $dataResponse["debug"] = $_FILES['file'];



$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
