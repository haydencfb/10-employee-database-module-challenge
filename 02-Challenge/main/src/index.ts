import inquirer from 'inquirer';
import pool from './db/connection';

function app(): void {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
            'Add employee', 
            'Add role', 
            'Add department',
            'View employees', 
            'View roles', 
            'View departments', 
            'Update employee role', 
            'Exit'
        ]}).then(({ action }) => { 
        switch (action) {
            case 'Add employee':
                addEmployee();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'View employees':
                viewEmployees();
                break;
            case 'View roles':
                viewRoles();
                break;
            case 'View departments':
                viewDepartments();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                process.exit();
        }
    });
}