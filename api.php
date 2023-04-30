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
      'IsAdmin' => 0,
      'IsPartOfProject' => 0
    ];

    if ($user_id = $database->register($user)) {
        $user['id'] = $user_id;
        if ($code = $database->generateConfirmCode($user_id)) {
            
            /* send email with confirmation code
                $to = $user['email'];
                $subject = 'Confirmation Code';
                $message = 'Your confirmation code is: ' . $code;
                $headers = 'From: your_email@example.com' . "\r\n" .
                    'Reply-To: david.eduard.olteanu@gmail.com' . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();

                mail($to, $subject, $message, $headers); Postfix?*/

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

    if (isset($_POST['username']) && isset($_POST['newPassword']) && isset($_POST['confirmNewPassword'])) {
        $username = $_POST['username'];
        $new_password = $_POST['newPassword'];
        $confirm_password = $_POST['confirmNewPassword'];

        if ($new_password === $confirm_password) {
            $user = $database->getUserByUsernameOrEmail($username);
            if ($user) {
                $user['password'] = md5($new_password);
                if ($database->updateUser($user)) {
                    // send password ($new_password value) to user by email
                    return_json(['status' => 'success']);
                } else {
                    return_json(['status' => 'error', 'message' => 'Failed to update user password.']);
                }
            } else {
                return_json(['status' => 'error', 'message' => 'User not found.']);
            }
        } else {
            return_json(['status' => 'error', 'message' => 'Passwords do not match.']);
        }
    } else {
        return_json(['status' => 'error', 'message' => 'Invalid request parameters.']);
    }
}elseif ($action === 'user') {
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
}elseif ($action === 'get-tasks') {
    if($is_jwt_valid){
        header("Access-Control-Allow-Origin: http://localhost:3000");
        // Decode the payload of the JWT token
        $payload = getPayload($bearer_token);

        // Get the user ID from the payload
        $user_id = $payload->user->ID;
        
        // Call the Get_Tasks_Fromdb function to retrieve all tasks for the user
        $tasks = $database->Get_Tasks_Fromdb($user_id);
        
        // Return the tasks as JSON
        return_json($tasks);
    }
}elseif ($action === 'edit-task') {
    if ($is_jwt_valid) {
    header("Access-Control-Allow-Origin: http://localhost:3000");

    $payload = getPayload($bearer_token);
      $rest_json = file_get_contents('php://input');
      $_POST = json_decode($rest_json, true);
     
      $task_id = $uri[4];
      $user_id = $payload->user->ID;

      $task = $database->getTask($task_id, $user_id);
      if ($task && $task['user_id'] == getPayload($bearer_token)->user->ID) {

        //need to understand this more

        $task['title'] = $_POST['title'];
        $task['description'] = $_POST['description'];

        if ($database->updateTask($task)) {
          return_json(['status' => 1]);
        }
      }
    }
  }elseif ($action === 'status-update') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $payload = getPayload($bearer_token);
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $task_id = $uri[4];
        $user_id = $payload->user->ID;

        $task = $database->getTask($task_id, $user_id);
        if ($task && $task['user_id'] == $payload->user->ID) {

            $task['status'] = $_POST['status'];

            if ($database->updateTask($task)) {
                return_json(['status' => 1]);
            }
        }
    }
}elseif ($action === 'delete-completed-tasks') {
    if($is_jwt_valid){
        header("Access-Control-Allow-Origin: http://localhost:3000");
    
        $payload = getPayload($bearer_token);
        $user_id = $payload->user->ID;
    
        
        if($database->deleteCompletedTasks($user_id)){
    
        $response = array(
            "success" => true,
            "message" => "Completed tasks successfully deleted."
        );
    
        echo json_encode($response);
        }
    }
    
}


return_json(['status' => 0]);

function return_json($arr)
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($arr);
    exit();
}
