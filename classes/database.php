<?php
class Database
{
    private $server_name = 'localhost';
    private $database_username = 'root';
    private $database_password = '';
    private $database_name = 'test';
    private $connection = null;

    public function register($user)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO usertest (`username`, `email`, `mobile`, `password`, `status`, `created_date`, `IsAdmin`, `IsPartOfProject`) VALUES (?,?,?,?,?,?,?,?)'
        );
        $sql->bind_param(
            'ssssisii',
            $user['username'],
            $user['email'],
            $user['mobile'],
            $user['password'],
            $user['status'],
            $user['created_date'],
            $user['IsAdmin'],
            $user['IsPartOfProject']
        );
        if ($sql->execute()) {
            $id = $this->connection->insert_id;
            $sql->close();
            $this->connection->close();
            return $id;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function generateConfirmCode($user_id)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `accountconfirm`(`user_id`, `code`) VALUES(?,?) ON DUPLICATE KEY UPDATE    
            code=?'
        );
        $code = rand(11111, 99999);

        $sql->bind_param('iss', $user_id, $code, $code);
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return $code;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function confirmCode($user_id, $code)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `accountconfirm` WHERE user_id=? AND code=?'
        );
        $sql->bind_param('is', $user_id, $code);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function activeUser($user_id)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `usertest` SET `status` = 1 WHERE id=?'
        );
        $sql->bind_param('i', $user_id);
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function loginUser($username, $password)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `usertest` WHERE username=? AND password=?'
        );
        $sql->bind_param('ss', $username, $password);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $user;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function getUserByUsernameOrEmail($username)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT * FROM `usertest` WHERE username=? OR email=?'
        );
        $sql->bind_param('ss', $username, $username);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $user;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function updateUser($user)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `usertest` SET `username` = ?,`email`=?,`mobile`=?,`password`=?, `IsAdmin`=?, `IsPartOfProject`=? WHERE id=?'
        );
        $sql->bind_param(
            'ssssiii',
            $user['username'],
            $user['email'],
            $user['mobile'],
            $user['password'],
            $user['IsAdmin'],
            $user['IsPartOfProject'],
            $user['ID']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }
    public function addTask($task)
    {

        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');


        $title = $task['title'];
        $description = $task['description'];
        $user_id = $task['user_id'];
        $status = 0;
        $created_date = date('Y-m-d H:i:s');

        $stmt = $this->connection->prepare("INSERT INTO tasks (title, description, user_id, status, created_date) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssiss", $title, $description, $user_id, $status, $created_date);
        $stmt->execute();
        $stmt->close();

        return true;
    }

    public function Get_Tasks_Fromdb($user_id)
    {
        $tasks = array();

        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');

        $stmt = $this->connection->prepare("SELECT * FROM tasks WHERE user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result !== false) {
            while ($row = $result->fetch_assoc()) {
                $task = array(
                    "id" => $row["id"],
                    "title" => $row["title"],
                    "description" => $row["description"],
                    "status" => $row["status"]
                );
                array_push($tasks, $task);
            }
        }

        return $tasks;
    }

    public function updateTask($task)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $stmt = $this->connection->prepare("UPDATE tasks SET title = ?, description = ?, status = ?, created_date = ? WHERE id = ? AND user_id = ?");
        $stmt->bind_param("ssisii", $task['title'], $task['description'], $task['status'], $task['created_date'], $task['id'], $task['user_id']);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function getTask($task_id, $user_id)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $query = "SELECT * FROM tasks WHERE id = ? AND user_id = ?";
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param('ii', $task_id, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    function deleteCompletedTasks($user_id)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $query = "DELETE FROM tasks WHERE user_id = ? AND status = ?";
        $stmt = $this->connection->prepare($query);
        $status = 1;
        $stmt->bind_param("ii", $user_id, $status);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    public function Get_Projects_Fromdb($user_id, $get_all = false)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');

        // Prepare the SQL statement
        $stmt = $this->connection->prepare(
            $get_all ?
                "SELECT * FROM projects" :
                "SELECT p.*
            FROM project_users AS pu
            INNER JOIN projects AS p ON p.ID = pu.project_id
            WHERE pu.user_id = ?"
        );

        if (!$get_all) {
            $stmt->bind_param("i", $user_id);
        }

        // Execute the query
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        $projects = array();
        while ($row = $result->fetch_assoc()) {
            $projects[] = $row;
        }

        return $projects;
    }

    public function Get_Project_Tasks_Fromdb($project_id)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        // Prepare the SQL statement
        $stmt = $this->connection->prepare("SELECT * FROM projecttasks WHERE project_id = ?");
        $stmt->bind_param("i", $project_id);

        // Execute the query
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        $projectTasks = array();
        while ($row = $result->fetch_assoc()) {
            $projectTasks[] = $row;
        }

        return $projectTasks;
    }
    public function Get_Project_Team_Members_Fromdb($project_id)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');

        // Prepare the SQL statement with an INNER JOIN on the users table
        $stmt = $this->connection->prepare(
            "SELECT u.*
        FROM project_users AS pu
        INNER JOIN usertest AS u ON u.id = pu.user_id
        WHERE pu.project_id = ?"
        );
        $stmt->bind_param("i", $project_id);

        // Execute the query
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        $team_members = array();
        while ($row = $result->fetch_assoc()) {
            $team_members[] = $row;
        }

        return $team_members;
    }
    public function Create_Project($name, $description, $start_date, $end_date)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');

        // Prepare the SQL statement
        $stmt = $this->connection->prepare(
            "INSERT INTO projects (name, description, start_date, end_date)
        VALUES (?, ?, ?, ?)"
        );
        $stmt->bind_param("ssss", $name, $description, $start_date, $end_date);

        // Execute the query
        $stmt->execute();

        // Get the ID of the newly created project
        $project_id = $stmt->insert_id;

        return $project_id;
    }
    public function CreateProject_Task($project_id, $name, $description, $due_date)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');

        $stmt = $this->connection->prepare("INSERT INTO projecttasks (project_id, name, description, due_date) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isss", $project_id, $name, $description, $due_date);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    function GetAllUsers()
    {
        // Connect to the database
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');

        // Define the SQL query to retrieve all users
        $query = "SELECT * FROM usertest ";

        // Execute the query and fetch the results
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();

        $ProjectUsers = array();
        if ($result !== false) {
            while ($row = $result->fetch_assoc()) {
                $user = array(
                    "ID" => $row["ID"],
                    "username" => $row["username"],
                    "email" => $row["email"],
                    "IsAdmin" => $row["IsAdmin"],
                    "IsPartOfProject" => $row["IsPartOfProject"]
                );
                array_push($ProjectUsers, $user);
            }
        }

        return $ProjectUsers;
    }

    public function Add_User_To_Project($project_id, $user_id)
    {
        // Connect to the database
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');

        // Define the SQL query to add the user to the project
        $query = "UPDATE usertest SET IsPartOfProject = 1 WHERE ID = ?";

        // Prepare the query and bind the parameters
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param('i', $user_id);


        $query2 = "INSERT INTO project_users (project_id, user_id) VALUES (?, ?)";
        $stmt2 = $this->connection->prepare($query2);
        $stmt2->bind_param('ii', $project_id, $user_id);

        if ($stmt->execute() && $stmt2->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function Delete_Project_Task($task_id)
    {
        // Connect to the database
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');

        // Define the SQL query to delete the task
        $query = "DELETE FROM projecttasks WHERE ID = ?";

        // Prepare the query and bind the parameters
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param('i', $task_id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    function Assign_User_To_Task($user_id, $task_id)
    {

        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8'); 

        // Prepare the SQL statement to update the task with the assigned user ID
        $query = "UPDATE projecttasks SET user_id = ? WHERE id = ?";

        $stmt = $this->connection->prepare($query);

        $stmt->bind_param("ii", $user_id, $task_id);

        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }
    function Complete_Project_Task($task_id)
{
    $this->connection = new mysqli(
        $this->server_name,
        $this->database_username,
        $this->database_password,
        $this->database_name
    );
    $this->connection->set_charset('utf8'); 

    // Prepare the SQL query to update the task
    $stmt = $this->connection->prepare("UPDATE projecttasks SET is_completed = 1 WHERE id = ?");

    // Bind the task ID parameter
    $stmt->bind_param('i', $task_id);
    // Execute the query
    if ($stmt->execute()) {
        $stmt->close();
        return true;
    }

    // If execution fails or no rows are affected, return false
    return false;
}
}

