const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employees = [];

//PER TUTOR'S ADVICE, FIRST RESPONDENT SHOULD BE THE MANAGER.  THEN MANAGER SHOULD CONTINUE BUILDING TEAM
function startQuestions() {
    console.log("Please start the process by completing details on the manager.")
    inquirer.prompt ([
        {
            type: "input",
            name: "firstname",
            message: "What is this manager's first name?"
        },
        {
            type: "input",
            name: "lastname",
            message: "Last name?"
        },
        {
            type: "input",
            name: "id",
            message: "ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "Email address?"
        },
        {
            type: "input",
            name: "office",
            message: "What is this manager's office number?"
        }
        
    ]).then(function(response1) {
        const manager = new Manager(response1.firstname,
                                    response1.lastname,
                                    response1.id,
                                    response1.email,
                                    response1.office);
        employees.push(manager);    

        console.log("___________________________________________");
        inquirer.prompt ([    
           {
            type: "list",
            name: "role",
            message: "Would you like to add another employee?",
            choices: [
                "No",
                "Engineer",
                "Intern"
            ]
           }
        ]).then(function(response2) {
            switch(response2.role) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break; 
                default: 
                    buildTeam();    
            } 
        })     
      
    }) 
}  

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "What is this employee's first name?"
        },
        {
            type: "input",
            name: "lastname",
            message: "Last name?"
        },
        {
            type: "input",
            name: "id",
            message: "ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "Email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is this engineer's Github username?"
        }
    ]).then(function(response3) {
        const engineer = new Engineer(response3.firstname,
                                      response3.lastname,
                                      response3.id,
                                      response3.email,
                                      response3.github);
        employees.push(engineer);    
        
        console.log("___________________________________________");
        inquirer.prompt ([    
           {
            type: "list",
            name: "role",
            message: "Would you like to add another employee?",
            choices: [
                "No",
                "Engineer",
                "Intern"
            ]
           }
        ]).then(function(response4) {
            switch(response4.role) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break; 
                default: 
                    buildTeam();    
            } 
        })     
      
    }) 
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "What is this employee's first name?"
        },
        {
            type: "input",
            name: "lastname",
            message: "Last name?"
        },
        {
            type: "input",
            name: "id",
            message: "ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "Email address?"
        },
        {
            type: "input",
            name: "school",
            message: "What is this intern's school?"
        }
    ]).then(function(response5) {
        const intern = new Intern(response5.firstname,
                                  response5.lastname,
                                  response5.id,
                                  response5.email,
                                  response5.school);
        employees.push(intern);    

        console.log("___________________________________________");
        inquirer.prompt ([    
           {
            type: "list",
            name: "role",
            message: "Would you like to add another employee?",
            choices: [
                "No",
                "Engineer",
                "Intern"
            ]
           }
        ]).then(function(response6) {
            switch(response6.role) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break; 
                default: 
                    buildTeam();    
            } 
        })     
      
    }) 
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath,render(employees),"utf-8")
}

startQuestions();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```