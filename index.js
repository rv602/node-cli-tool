#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Wanna be a Millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    This is a quiz on how much u know about RV.
    If you get any question wrong u will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
        process.exit(1);
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        console.log(
            chalk.bgBlue(
                `Programming isn't about what you know; it's about making the command line look cool\n`
            )
        );
        process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `RV's birthday is on\n`,
        choices: [
            'May 23rd, 2002',
            'Nov 24th, 2002',
            'October 20th, 2002',
            'Dec 17, 2002',
        ],
    });

    return handleAnswer(answers.question_1 === 'October 20th, 2002');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: `What is RV's favourite color\n`,
        choices: [
            'red',
            'turquoise',
            'green',
            'maroon'
        ],
    });
    return handleAnswer(answers.question_2 === 'turquoise');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `What is the first school in Maharashtra RV attended?\n`,
        choices: [
            'Billabong',
            'Singhania',
            'DAV',
            'HFS'],
    });
    return handleAnswer(answers.question_3 === 'Billabong');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Which is the first programming language RV learnt?\n',
        choices: [
            'Python',
            'Java',
            'C++',
            'Carbon', // Correct
        ],
    });
    return handleAnswer(answers.question_4 === 'Java');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message:
            'JS is a high-level single-threaded, garbage-collected,\n' +
            'interpreted(or just-in-time compiled), prototype-based,\n' +
            'multi-paradigm, dynamic language with a ____ event loop\n',
        choices: [
            'multi-threaded',
            'non-blocking',
            'synchronous',
            'promise-based'
        ],
    });

    return handleAnswer(answers.question_5 === 'non-blocking');
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();