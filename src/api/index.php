<?php
require 'flight/Flight.php';
require 'flight/helpers.php';

$dbuser = 'zk1woweu_admin';
$dbpass = '6S8,fs)u.9Ra';

Flight::set('secret_key', '##_T3rr35DOT1nf0@%%#');

///////
// Connection to database
///////
Flight::register('db', 'PDO', array('mysql:host=localhost;dbname=zk1woweu_terres',$dbuser,$dbpass),
  function($db){
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
);

Flight::route('/', function(){
    echo 'terres intranet';
});

///////
// Get user data
///////
Flight::route('/main', function(){
    $db = Flight::db();
    $data = [];

    $dades = file_get_contents('php://input');
    $mail = base64_decode($dades);

    /* GET GENERAL DATA */
    $sql_dades = "SELECT * FROM competitors WHERE email = :email LIMIT 1";
    $dades_user = $db->prepare($sql_dades);
    $dades_user->bindParam(':email', $mail);
    $dades_user->execute();
    $user = $dades_user->fetch(PDO::FETCH_ASSOC);
    $data['user'] = $user;

    /* GET FILMS DATA */
    $sql_tourism = "SELECT * FROM tourism WHERE user = :user LIMIT 1";
    $dades_tourism = $db->prepare($sql_tourism);
    $dades_tourism->bindParam(':user', $user['id']);
    $dades_tourism->execute();
    if ($dades_tourism->rowCount() === 0) {
      $data['tourism'] = null;
    } else {
      $tourism = $dades_tourism->fetch(PDO::FETCH_ASSOC);
      $data['tourism'] = $tourism;
    }
    $sql_documentary = "SELECT * FROM documentary WHERE user = :user LIMIT 1";
    $dades_documentary = $db->prepare($sql_documentary);
    $dades_documentary->bindParam(':user', $user['id']);
    $dades_documentary->execute();
    if ($dades_documentary->rowCount() === 0) {
      $data['documentary'] = null;
    } else {
      $documentary = $dades_documentary->fetch(PDO::FETCH_ASSOC);
      $data['documentary'] = $documentary;
    }
    $sql_corporate = "SELECT * FROM corporate WHERE user = :user LIMIT 1";
    $dades_corporate = $db->prepare($sql_corporate);
    $dades_corporate->bindParam(':user', $user['id']);
    $dades_corporate->execute();
    if ($dades_corporate->rowCount() === 0) {
      $data['corporate'] = null;
    } else {
      $corporate = $dades_corporate->fetch(PDO::FETCH_ASSOC);
      $data['corporate'] = $corporate;
    }

    Flight::json($data);

    $db = NULL;
});


Flight::start();
