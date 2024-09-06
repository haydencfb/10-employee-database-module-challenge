import inquirer from 'inquirer';
import { pool } from "./db/connection.js";
function app() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
            'View all employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Exit'
        ]
    }).then(({ action }) => {
        switch (action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRoles();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Exit':
                process.exit();
        }
    });
}
async function viewAllEmployees() {
    const sql = "SELECT employee.id, employee.first_name AS \"first name\", employee.last_name AS \"last name\", role.title, department.name AS department, role.salary, manager.first_name || ' ' || manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;";
    const employees = await pool.query(sql);
    console.table(employees.rows);
    app();
}
async function addEmployee() {
    const roles = await pool.query("SELECT id as value, title as name FROM role");
    const employees = await pool.query("SELECT id as value, first_name || ' ' || last_name as name FROM employee");
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select employee role:',
            choices: roles.rows
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select employee manager:',
            choices: employees.rows
        }
    ]).then(async ({ first_name, last_name, role_id, manager_id }) => {
        await pool.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [first_name, last_name, role_id, manager_id]);
        console.log('Employee added successfully!');
        app();
    });
}
async function updateEmployeeRole() {
    const employees = await pool.query("SELECT id as value, first_name || ' ' || last_name as name FROM employee");
    const roles = await pool.query("SELECT id as value, title as name FROM role");
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select employee to update:',
            choices: employees.rows
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select new role:',
            choices: roles.rows
        }
    ]).then(async ({ employee_id, role_id }) => {
        await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [role_id, employee_id]);
        console.log('Employee role updated successfully!');
        app();
    });
}
async function viewAllRoles() {
    const sql = "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id";
    const roles = await pool.query(sql);
    console.table(roles.rows);
    app();
}
async function addRoles() {
    const departments = await pool.query("SELECT id as value, name as name FROM department");
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter role salary:'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select department:',
            choices: departments.rows
        }
    ]).then(async ({ title, salary, department_id }) => {
        await pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
        console.log('Role added successfully!');
        app();
    });
}
async function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter department name:'
    }).then(async ({ name }) => {
        await pool.query("INSERT INTO department (name) VALUES ($1)", [name]);
        console.log('Department added successfully!');
        app();
    });
}
async function viewAllDepartments() {
    const sql = "SELECT * FROM department";
    const departments = await pool.query(sql);
    console.table(departments.rows);
    app();
}
app();
