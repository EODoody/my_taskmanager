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

if ($action === 'get-projects') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");
        
        // Decode the payload of the JWT token
        $payload = getPayload($bearer_token);

        // Get the user ID and isAdmin flag from the payload
        $user_id = $payload->user->ID;
        $is_admin = $payload->user->IsAdmin;

        // Call the Get_Projects_Fromdb function to retrieve all projects for the user or all projects if the user is an admin
        if ($is_admin) {
            $projects = $database->Get_Projects_Fromdb(null, true);
        } else {
            $projects = $database->Get_Projects_Fromdb($user_id, false);
        }
        
        // Return the projects as JSON
        return_json($projects);
    }
}
else if ($action === 'get-project-details') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $project_id = (int) $uri[4];

        $project_details = $database->Get_Project_Tasks_Fromdb($project_id);
        

        return_json($project_details);
    }
}else if ($action === 'get-project-team-members') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $project_id = (int) $uri[4];

        $team_members = $database->Get_Project_Team_Members_Fromdb($project_id);
        
        return_json($team_members);
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