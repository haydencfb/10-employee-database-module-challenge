import inquirer from 'inquirer';
import pool from './db/connection';

function app(): void {
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
        ]}).then(({ action }) => { 
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
                viewAllEmployees();
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

async function viewAllEmployees(): Promise<void> {
    const sql = "SELECT employee.id, employee.first_name AS 'first name', employee.last_name AS 'last name', role.title, department.name AS department, role.salary, manager.first_name || ' ' || manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
    const employees = await pool.query(sql);
    console.table(employees.rows);
    app();
}
