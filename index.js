const inquirer = require('inquirer');
const util = require("util");
const fs = require('fs');
const engineerList = [];
const internList = [];
const engCardList= [];
const intCardList = [];

const writeFileAsync = util.promisify(fs.writeFile);

// MANAGER INQUIRER PROMPT WITH ENG SIZE AND CLASS SIZE
async function main(){

    const managerInfo = await inquirer.prompt([
        { type: "input",  message: "Welcome to Team Builder! As Manager, What is your name?",  name: "userName" },
        { type: "input",  message: "What is your email?",name: "userEmail" },
        { type: "input",  message: "What is your office number?",  name: "officeNum"   },

        { type: "input",  message: "How many engineers are on your team?", name: "sizeEngineer" },
        { type: "input",  message: "How many interns are on your team?",  name: "sizeIntern" },
    ]);

    const {userName, userEmail, officeNum, sizeEngineer, sizeIntern} = managerInfo;
    const manager = new Manager (userName, userEmail, officeNum);

// ENGINEER INQUIRER PROMPT
    console.log('ENGINEER INPUT');

    for (i=0; i<sizeEngineer; i++) {
        console.log(`New Engineer${i+1}: `)
        const engInfo = await inquirer.prompt([
            { type: "input", message: "What is their name?", name: "userName" },
            { type: "input", message: "What is their email?", name: "userEmail" },
            { type: "input", message: "What is their github?", name: "userGithub" },        
        ]);
        console.log(`Thank you for inputing Engineer: ${engInfo.userName} !`)
    
        const newEng = new Engineer(engInfo.userName, engInfo.userEmail, engInfo.userGithub);
        engineerList.push(newEng);
        }

// INTERN INQUIRER PROMT
        console.log('INTERN INPUT');

    for (i=0; i<sizeIntern; i++) {
        console.log(`New Intern ${i+1}: `)
        const intInfo = await inquirer.prompt([
            { type: "input", message: "What is their name?", name: "userName" },
            { type: "input", message: "What is their email?", name: "userEmail" },
            { type: "input", message: "What school did they go to?", name: "userSchool" },        
        ]);
        console.log(`Thank you for inputing Intern: ${intInfo.userName} !`)
    
        const newInt = new Intern(intInfo.userName, intInfo.userEmail, intInfo.userSchool);
        internList.push(newInt);
        }

        console.log(manager);
        console.log(engineerList);
        console.log(internList);

//Creating Eng card HTML for each Engineer
        engineerList.forEach(function(engineer){
            const engInfo = `
           
            <div class="card border-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">
                    <h2>${engineer.name}</h2>
                    <h3>Engineer</h3>
                </div>
                <div class="card-body text-primary">
                <h5 class="card-title">ID: ${engineer.id}</h5>
                <h5 class="card-title">Email: ${engineer.email}</h5>
                <h5 class="card-title">Github: ${engineer.github}</h5>
                </div>
            </div>`;

        engCardList.push(engInfo);
        })
        console.log(engCardList)
//Creating each Int card HTML for each Intern
        internList.forEach(function(intern){
            const intInfo = `
           
            <div class="card border-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">
                    <h2>${intern.name}</h2>
                    <h3>Intern</h3>
                </div>
                <div class="card-body text-primary">
                <h5 class="card-title">ID: ${intern.id}</h5>
                <h5 class="card-title">Email: ${intern.email}</h5>
                <h5 class="card-title">School: ${intern.school}</h5>
                </div>
            </div>`;

        intCardList.push(intInfo);
        })
        console.log(engCardList)
//Creating Manager Card HTML
        const cardInfo = `
            
            <div class="card border-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">
                    <h2>${manager.name}</h2>
                    <h3>${manager.role}</h3>
                </div>
                <div class="card-body text-primary">
                <h5 class="card-title">ID: ${manager.id}</h5>
                <h5 class="card-title">Email: ${manager.email}</h5>
                <h5 class="card-title">Info: ${manager.officeNumber}</h5>
                </div>
            </div>`;
//Creating HTML Page 
        const markUp = (`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            <title>Employee Roster</title>
            <style>
                .card {
                    width: 200px;
                    height: auto;
                    margin: 5%
                }
                #header{
                    text-align: center;
                    padding: 5%;
                    color: antiquewhite;
                    background-color: rgb(49, 114, 235);
                }
                .container {
                    width: 90%;
                }
            </style>
        </head>
        <body>
            <h1 id="header">Employee Roster</h1>
            </hr>
                <div class="container">
                    <div class="row">
                    ${cardInfo}${engCardList}${intCardList}
                    </div>
                </div>
        </body>
        </html>
    `);
    //Writing new HTML File with inputed info
        const writeResult = writeFileAsync('index.html', markUp);
    }
    main();

// Classes for employee types (parent, manager, engineer, intern)
let ID = 1;

    class Employee {
        constructor (name, email, role){
            this.id = ID++; 
            this.name = name;
            this.email = email;
            this.role = role;
        }
    }

    class Manager extends Employee {
        constructor( name, email, officeNumber ){
            super( name, email, 'Manager' );
            this.officeNumber = officeNumber;
        }
    }
    class Engineer extends Employee {
        constructor( name, email, github ){
            super( name, email, 'Engineer' );
            this.github = github;
        }
    }

    class Intern extends Employee {
        constructor( name, email, school ){
            super( name, email, 'Intern' );
            this.school = school;
        }
    }