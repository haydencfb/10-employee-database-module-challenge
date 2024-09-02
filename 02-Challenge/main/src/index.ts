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

