import inquirer from "inquirer";
let enemies = ["Skeleton", "Zombie", "Assassin", "Warrior"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 30;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; //percentage
let running = true;
let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max - min) + min;
};
console.log("\n\tWelcome to the Dungeon!");
GAME: while (running) {
    console.log("\t..........................................");
    let enemyHealth = getRandomNumber(1, maxEnemyHealth);
    let enemy = enemies[getRandomNumber(0, enemies.length - 1)];
    console.log(`\t# ${enemy} has appeared #\n`);
    while (enemyHealth > 0) {
        console.log(`\tYour HP: ${health}`);
        console.log(`\t${enemy} HP: ${enemyHealth}`);
        let control = await inquirer.prompt([
            {
                message: "\n\tWhat would you like to do?",
                type: "list",
                choices: ["\tAttack", "\tDrink Health Potion", "\tRun"],
                name: "command"
            }
        ]);
        switch (control.command) {
            case "\tAttack":
                let strikeDamage = getRandomNumber(1, attackDamage);
                let damageTaken = getRandomNumber(1, enemyAttackDamage);
                health -= damageTaken;
                enemyHealth -= strikeDamage;
                console.log(`\tYou strike the ${enemy} with ${strikeDamage} damage.`);
                console.log(`\t You received ${damageTaken} damage from the enemy.`);
                if (health < 1) {
                    console.log(`\tYou've taken too much damage. You are too weak to go on.\n`);
                    break;
                }
                break;
            case "\tDrink Health Potion":
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    console.log(`\tYou drank health potion, healing yourself for ${healthPotionHealAmount}\n\t You now have ${health} HP\n\tYou now have ${numHealthPotions} left.`);
                }
                else {
                    console.log(`\tYou have no health potions left, defeat enemies for a chance to get one.`);
                }
                break;
            case "\tRun":
                console.log(`\tYou ran away from the ${enemy}.`);
                continue GAME;
                break;
        }
    }
    if (health < 1) {
        console.log(`\tyou limp out of the dungeon, weak from battle. `);
        break;
    }
    console.log("\t..........................................");
    console.log(`\t# ${enemy} has been defeated #`);
    console.log(`\t# You have ${health} HP left #`);
    if (getRandomNumber(1, 100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`\t# The ${enemy} dropped a health potion #`);
        console.log(`\t# You now have ${numHealthPotions} health potion(s). #`);
    }
    let stateControl = await inquirer.prompt([
        {
            type: "list",
            message: "\tWhat would you like to do ?",
            choices: ["\tContinue Fighting", "\tExit Dungeon"],
            name: "command"
        }
    ]);
    if (stateControl.command == "\tContinue Fighting") {
        console.log(`\tYour adventurecontinue!`);
    }
    else {
        console.log(`\tYou exit the dungeon, Successful from your adventure.`);
        break;
    }
}
console.log(`\t######################`);
console.log(`\tTHANK YOU FOR PLAYING`);
console.log(`\t######################`);
