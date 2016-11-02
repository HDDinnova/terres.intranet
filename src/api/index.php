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

///////
// Get tourism films
///////
Flight::route('/tourfilm', function(){
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
    $id = $user['id'];

    /* GET FILMS DATA */
    $sql_tourism = "SELECT * FROM tourism WHERE user = :user LIMIT 1";
    $dades_tourism = $db->prepare($sql_tourism);
    $dades_tourism->bindParam(':user', $id);
    $dades_tourism->execute();
    if ($dades_tourism->rowCount() === 0) {
      $data['tourism'] = null;
    } else {
      $tourism = $dades_tourism->fetch(PDO::FETCH_ASSOC);
      $data['tourism'] = $tourism;
      $idcat = $tourism['id'];
      $sql_films = "SELECT * FROM tourismfilms WHERE id_cat_user = :idcat";
      $dades_films = $db->prepare($sql_films);
      $dades_films->bindParam(':idcat', $idcat);
      $dades_films->execute();
      if ($dades_films->rowCount() === 0) {
        $data['films'] = null;
      } else {
        $films = [];
        while ($r = $dades_films->fetch(PDO::FETCH_ASSOC)) {
          $films[] = $r;
        }
        $data['films'] = $films;
      }
    }

    Flight::json($data);

    $db = NULL;
});

///////
// Save tourism films
///////
Flight::route('/savetourfilm', function(){
    $db = Flight::db();
    $data = [];

    $dades = file_get_contents('php://input');
    $dades = mb_convert_encoding($dades, 'HTML-ENTITIES', "UTF-8");
    $dades = json_decode($dades,true);

    $nfilms = count($dades['title']);

    $sql = "INSERT INTO tourismfilms (id_cat_user, section, title) VALUES ";
    for ($i=0; $i < $nfilms; $i++) {
      $idcat = $dades['idcat'];
      if (isset($dades['section'][$i])) {
        if ($dades['section'][$i]) {
          $section = 2;
        } else {
          $section = 1;
        }
      } else {
        $section = 1;
      }
      $title = $dades['title'][$i];
      $sql = $sql."('$idcat','$section','$title')";
      if ($i < $nfilms-1) {
        $sql = $sql.', ';
      }
    }
    $save_tourism = $db->prepare($sql);
    if ($save_tourism->execute()) {
      $data['status'] = 200;
      $data['message'] = 'Film saved';
    }
    Flight::json($data);

    $db = NULL;
});

///////
// Get documentary films
///////
Flight::route('/docfilm', function(){
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
    $id = $user['id'];

    /* GET FILMS DATA */
    $sql_tourism = "SELECT * FROM documentary WHERE user = :user LIMIT 1";
    $dades_documentary = $db->prepare($sql_tourism);
    $dades_documentary->bindParam(':user', $id);
    $dades_documentary->execute();
    if ($dades_documentary->rowCount() === 0) {
      $data['documentary'] = null;
    } else {
      $documentary = $dades_documentary->fetch(PDO::FETCH_ASSOC);
      $data['documentary'] = $documentary;
      $idcat = $documentary['id'];
      $sql_films = "SELECT * FROM documentaryfilms WHERE id_cat_user = :idcat";
      $dades_films = $db->prepare($sql_films);
      $dades_films->bindParam(':idcat', $idcat);
      $dades_films->execute();
      if ($dades_films->rowCount() === 0) {
        $data['films'] = null;
      } else {
        $films = [];
        while ($r = $dades_films->fetch(PDO::FETCH_ASSOC)) {
          $films[] = $r;
        }
        $data['films'] = $films;
      }
    }

    Flight::json($data);

    $db = NULL;
});

///////
// Save tourism films
///////
Flight::route('/savedocfilm', function(){
    $db = Flight::db();
    $data = [];

    $dades = file_get_contents('php://input');
    $dades = mb_convert_encoding($dades, 'HTML-ENTITIES', "UTF-8");
    $dades = json_decode($dades,true);

    $nfilms = count($dades['title']);

    $sql = "INSERT INTO documentaryfilms (id_cat_user, section, title) VALUES ";
    for ($i=0; $i < $nfilms; $i++) {
      $idcat = $dades['idcat'];
      if (isset($dades['section'][$i])) {
        if ($dades['section'][$i]) {
          $section = 2;
        } else {
          $section = 1;
        }
      } else {
        $section = 1;
      }
      $title = $dades['title'][$i];
      $sql = $sql."('$idcat','$section','$title')";
      if ($i < $nfilms-1) {
        $sql = $sql.', ';
      }
    }
    $save_documentary = $db->prepare($sql);
    if ($save_documentary->execute()) {
      $data['status'] = 200;
      $data['message'] = 'Film saved';
    }
    Flight::json($data);

    $db = NULL;
});

///////
// Get corporate films
///////
Flight::route('/corporate', function(){
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
    $id = $user['id'];

    /* GET FILMS DATA */
    $sql_corporate = "SELECT * FROM corporate WHERE user = :user LIMIT 1";
    $dades_corporate = $db->prepare($sql_corporate);
    $dades_corporate->bindParam(':user', $id);
    $dades_corporate->execute();
    if ($dades_corporate->rowCount() === 0) {
      $data['corporate'] = null;
    } else {
      $corporate = $dades_corporate->fetch(PDO::FETCH_ASSOC);
      $data['corporate'] = $corporate;
      $idcat = $corporate['id'];
      $sql_films = "SELECT * FROM corporatefilms WHERE id_cat_user = :idcat";
      $dades_films = $db->prepare($sql_films);
      $dades_films->bindParam(':idcat', $idcat);
      $dades_films->execute();
      if ($dades_films->rowCount() === 0) {
        $data['films'] = null;
      } else {
        $films = [];
        while ($r = $dades_films->fetch(PDO::FETCH_ASSOC)) {
          $films[] = $r;
        }
        $data['films'] = $films;
      }
    }

    Flight::json($data);

    $db = NULL;
});

///////
// Save tourism films
///////
Flight::route('/savecorpfilm', function(){
    $db = Flight::db();
    $data = [];

    $dades = file_get_contents('php://input');
    $dades = mb_convert_encoding($dades, 'HTML-ENTITIES', "UTF-8");
    $dades = json_decode($dades,true);

    $nfilms = count($dades['title']);

    $sql = "INSERT INTO corporatefilms (id_cat_user, section, title) VALUES ";
    for ($i=0; $i < $nfilms; $i++) {
      $idcat = $dades['idcat'];
      if (isset($dades['section'][$i])) {
        if ($dades['section'][$i]) {
          $section = 2;
        } else {
          $section = 1;
        }
      } else {
        $section = 1;
      }
      $title = $dades['title'][$i];
      $sql = $sql."('$idcat','$section','$title')";
      if ($i < $nfilms-1) {
        $sql = $sql.', ';
      }
    }
    $save_corporate = $db->prepare($sql);
    if ($save_corporate->execute()) {
      $data['status'] = 200;
      $data['message'] = 'Film saved';
    }
    Flight::json($data);

    $db = NULL;
});

///////
// Register films in section X
///////
Flight::route('/addfilm', function(){
    $db = Flight::db();
    $data = [];

    $dades = file_get_contents('php://input');
    $dades = mb_convert_encoding($dades, 'HTML-ENTITIES', "UTF-8");
    $dades = json_decode($dades,true);
    $mail = base64_decode($dades[0]['user']);
    /* GET GENERAL DATA */
    $sql_dades = "SELECT id FROM competitors WHERE email = :email LIMIT 1";
    $dades_user = $db->prepare($sql_dades);
    $dades_user->bindParam(':email', $mail);
    $dades_user->execute();
    $user = $dades_user->fetch(PDO::FETCH_ASSOC);
    $id = $user['id'];

    $nfilms = $dades[0]['nfilms'];
    $table = $dades[0]['category'];

    $sql = "INSERT INTO $table (user, nfilms, date) VALUES ('$id', $nfilms, NOW())";

    $addfilm = $db->prepare($sql);
    if ($addfilm->execute()) {
      $data['status'] = 200;
      $data['message'] = 'Film add';
    }
    Flight::json($data);

    $db = NULL;
});

///////
// Get the payment information
///////
Flight::route('/payment', function(){
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
    $id = $user['id'];
    $data['userinfo'] = $user;

    /* GET TOURISM FILMS */
    $sqltour = "SELECT * FROM tourism WHERE user = $id";
    $dadestour = $db->prepare($sqltour);
    $dadestour->execute();
    if($dadestour->rowCount() > 0) {
      while ($t = $dadestour->fetch(PDO::FETCH_ASSOC)) {
        $data['tourism'] = $t;
      }
      $id = $data['tourism']['id'];
      $sqltourfilms = "SELECT title,section FROM tourismfilms WHERE id_cat_user = $id";
      $dadestourfilms = $db->prepare($sqltourfilms);
      $dadestourfilms->execute();
      while ($tf = $dadestourfilms->fetch(PDO::FETCH_ASSOC)) {
        $data['tourism']['films'][] = $tf;
      }
    } else {
      $data['tourism'] = null;
    }

    /* GET DOCUMENTARY FILMS */
    $sqldoc = "SELECT * FROM documentary WHERE user = $id";
    $dadesdoc = $db->prepare($sqldoc);
    $dadesdoc->execute();
    if($dadesdoc->rowCount() > 0) {
      while ($d = $dadesdoc->fetch(PDO::FETCH_ASSOC)) {
        $data['documentary'] = $d;
      }
      $id = $data['documentary']['id'];
      $sqldocfilms = "SELECT title,section FROM documentaryfilms WHERE id_cat_user = $id";
      $dadesdocfilms = $db->prepare($sqldocfilms);
      $dadesdocfilms->execute();
      while ($df = $dadesdocfilms->fetch(PDO::FETCH_ASSOC)) {
        $data['documentary']['films'][] = $df;
      }
    } else {
      $data['documentary'] = null;
    }

    /* GET CORPORATE FILMS */
    $sqlcorp = "SELECT * FROM corporate WHERE user = $id";
    $dadescorp = $db->prepare($sqlcorp);
    $dadescorp->execute();
    if($dadescorp->rowCount() > 0) {
      while ($c = $dadescorp->fetch(PDO::FETCH_ASSOC)) {
        $data['corporate'] = $c;
      }
      $id = $data['corporate']['id'];
      $sqlcorpfilms = "SELECT title,section FROM corporatefilms WHERE id_cat_user = $id";
      $dadescorpfilms = $db->prepare($sqlcorpfilms);
      $dadescorpfilms->execute();
      while ($cf = $dadescorpfilms->fetch(PDO::FETCH_ASSOC)) {
        $data['corporate']['films'][] = $cf;
      }
    } else {
      $data['corporate'] = null;
    }

    Flight::json($data);

    $db = NULL;
});

///////
// Save the payment proof
///////
Flight::route('/paymentproof/@id', function($id){
    $db = Flight::db();
    $data = [];

    $dades = file_get_contents('php://input');
    $user = base64_decode($id);
    $sql_dades = "SELECT * FROM competitors WHERE email = :email LIMIT 1";
    $dades_user = $db->prepare($sql_dades);
    $dades_user->bindParam(':email', $user);
    $dades_user->execute();
    $user = $dades_user->fetch(PDO::FETCH_ASSOC);
    $id = $user['id'];

    $pdfname = $_FILES['file']['name'];
    $pdftmp = $_FILES['file']['tmp_name'];
    $url = "payproof/".$pdfname;

    move_uploaded_file($pdftmp,$url);
    $sql_insert = "UPDATE competitors SET paymentproofname=:name, paymentproof=:proof WHERE id = :iduser";
    $payinsert =  $db->prepare($sql_insert);
    $payinsert->bindParam(':name', $pdfname);
    $payinsert->bindParam(':proof', $url);
    $payinsert->bindParam(':iduser', $id);

    if ($payinsert->execute()) {
      $data['status'] = 200;
      $data['message'] = 'Payment proof upload';
    }
    Flight::json($data);

    $db = NULL;
});

Flight::start();
