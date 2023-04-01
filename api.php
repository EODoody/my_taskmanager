<?php
include './classes/database.php';
include './classes/jwt.php';

//global $uri, $action, $bearer_token, $is_jwt_valid;
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$action = $uri[3];

$bearer_token = get_bearer_token();
$is_jwt_valid = isset($bearer_token) ? is_jwt_valid($bearer_token) : false;

$database = new Database();

if ($action === 'register') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $user = [
      'username' => $_POST['username'],
      'email' => $_POST['email'],
      'mobile' => $_POST['mobile'],
      'password' => md5($_POST['password']),
      'status' => 0,
      'created_date' => date('Y-m-d H:i:s'),
    ];

    if ($user_id = $database->register($user)) {
        $user['id'] = $user_id;
        if ($code = $database->generateConfirmCode($user_id)) {
            //send generated code by email to user
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $user];
            $jwt = generate_jwt($headers, $payload);
            return_json(['status' => $jwt]);
        }
    }
} elseif ($action === 'confirm') {
    if ($is_jwt_valid) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        $user_id = getPayload($bearer_token)->user->id;

        if ($database->confirmCode($user_id, $_POST['code'])) {
            if ($database->activeUser($user_id)) {
                return_json(['status' => 1]);
            }
        }
    }
} elseif ($action === 'login') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);

    if (
        $user = $database->loginUser(
            $_POST['username'],
            md5($_POST['password'])
        )
    ) {
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['user' => $user];
        $jwt = generate_jwt($headers, $payload);
        return_json(['status' => $jwt]);
    }
} elseif ($action === 'reset') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);

    if ($user = $database->getUserByUsernameOrEmail($_POST['username'])) {
        $generated_password = uniqid(round(11111, 99999));
        $user['password'] = md5($generated_password);
        if ($database->updateUser($user)) {
            //send password ($generated_password value) to user by email
            return_json(['status' => 1]);
        }
    }
} elseif ($action === 'user') {
    if ($is_jwt_valid) {
        $username = getPayload($bearer_token)->user->username;
        if ($user = $database->getUserByUsernameOrEmail($username)) {
            return_json(['status' => $user]);
        }
    }
} elseif ($action === 'add-task') {
    if ($is_jwt_valid) {
      $rest_json = file_get_contents('php://input');
      $_POST = json_decode($rest_json, true);
      $task = [
        'user_id' => getPayload($bearer_token)->user->ID,
        'title' => $_POST['title'],
        'description' => $_POST['description'],
        'created_date' => date('Y-m-d H:i:s'),
        'completed' => false,
        'completed_date' => null
      ];
      if ($database->addTask($task)) {
        return_json(['status' => 1]);
      }
    }
} elseif ($action === 'get-tasks'){
    if ($is_jwt_valid) {
        // Decode the payload of the JWT token
        $payload = getPayload($bearer_token);

        // Get the user ID from the payload
        $user_id = $payload->user->ID;
        $tasks = $database->Get_Tasks_Fromdb($user_id);

        
        // Return the tasks as JSON
        return_json(['status' => $tasks]);
    }
}
     
return_json(['status' => 0]);

function return_json($arr)
{
    header("Access-Control-Allow-Origin: * ");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($arr);
    exit();
}
