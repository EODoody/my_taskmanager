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
} else if ($action === 'get-project-details') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $project_id = (int) $uri[4];

        $project_details = $database->Get_Project_Tasks_Fromdb($project_id);


        return_json($project_details);
    }
} else if ($action === 'get-project-team-members') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $project_id = (int) $uri[4];

        $team_members = $database->Get_Project_Team_Members_Fromdb($project_id);

        return_json($team_members);
    }
} else if ($action === 'create-project') {
    if ($is_jwt_valid) {
        // Get the request body data
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        // Create a new project object
        $project = [
            'name' => $_POST['name'],
            'description' => $_POST['description'],
            'start_date' => $_POST['start_date'],
            'end_date' => $_POST['end_date']
        ];

        // Call the create_project function to add the project to the database
        $project_id = $database->Create_Project($project["name"], $project["description"], $project["start_date"], $project["end_date"]);

        // Check if the project was successfully added to the database
        if ($project_id) {
            // Return the new project ID as JSON
            return_json(['project_id' => $project_id]);
        }
    }
} else if ($action === 'ProjectAdd-tasks') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        // Get the request body data
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $project_id = (int) $uri[4];

        // Create a new task object
        $task = [
            'project_id' => $project_id,
            'name' => $_POST['name'],
            'description' => $_POST['description'],
            'due_date' => $_POST['due_date']
        ];

        // Call the create_task function to add the task to the database
        $task_id = $database->CreateProject_Task($task["project_id"], $task["name"], $task["description"], $task["due_date"]);

        // Check if the task was successfully added to the database
        if ($task_id) {
            // Return the new task ID as JSON
            return_json(['task_id' => $task_id]);
        }
    }
} else if ($action === 'get-users') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $users = $database->GetAllUsers();

        return_json($users);
    }
} else if ($action === 'add-user-to-project') {
    if ($is_jwt_valid) {
        // Get the request body data
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        // Get the selected project and user IDs from the request body
        $selectedProjectId = $_POST['project_id'];
        $selectedUserId = $_POST['user_id'];

        // Call the add_user_to_project function to add the user to the project
        $result = $database->Add_User_To_Project($selectedProjectId, $selectedUserId);

        // Check if the user was successfully added to the project
        if ($result) {
            // Return success as JSON
            return_json(['status' => 1]);
        }
    }
} else if ($action === 'delete-task') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $task_id = (int) $uri[4];

        // Call the delete_task function to delete the task from the database
        $result = $database->Delete_Project_Task($task_id);

        // Check if the task was successfully deleted from the database
        if ($result) {
            // Return success as JSON
            return_json(['status' => 1]);
        }
    }
} else if ($action === 'assign-user-to-task') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        (int)$task_id = (int) $uri[4];

        // Get the request body data
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        // Get the selected user ID from the request body
        (int)$selectedUserId = (int)$_POST['assigned_user_id'];

        // Check if the user was successfully assigned to the task
        if ($database->Assign_User_To_Task($selectedUserId, $task_id)) {
            // Return success as JSON
            return_json(['status' => 1]);
        }
    }
} else if ($action === 'complete-task') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $task_id = (int) $uri[4];


        // Check if the task status was successfully updated in the database
        if ($database->Complete_Project_Task($task_id)) {
            // Return success as JSON
            return_json(['status' => 1]);
        }
    }
} else if ($action === 'delete-project') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        $project_id = (int)$uri[4];

        // Check if the project was successfully deleted from the database
        if ($database->Delete_Project($project_id)) {
            // Return success as JSON
            return_json(['status' => 1]);
        }
    }
}else if ($action === 'APget_data') {
    if ($is_jwt_valid) {
        header("Access-Control-Allow-Origin: http://localhost:3000");

        // Perform the necessary data retrieval logic here
        if($data = $database->Retrieve_Project_Data()) {

        // Return the data as JSON
        return_json($data);
        }
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
