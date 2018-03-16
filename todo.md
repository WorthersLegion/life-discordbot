# Summary of bot

This bot will be about the board game: The Game of L.I.F.E. (TM).

## Legenda

- Turn(s) will be a command called `taketurn`.
  - There will be 2 commands 1 for when in college and 1 for after college/work.
- Events will be listed later (dw).

## Registration & First choice

When a user registers him/herself the user will be added to the database with the default values.

After this the user can choose to go to college or immediately start working.

If a user chooses to go to college take away $50.000, set the college switch to 1 in the database, and let a random college event happen.

## College

The user will have to stay in college for at least 2 turns and a maximum of 11 turns. (With a cooldown of 30 seconds)

After this, let the bot choose randomly if the user graduated or not and pick a random job (with degree jobs included if the user graduated) and a random salary.

(Make sure that the bot has a funny response to their job and salary for example:

- Having a degree but not having a degree job.
- Having a degree and a degree job but having a pretty low salary for that job.

etc. you get the point
)

## Immediately start working

If the user chooses this as their first move then give them an random job (**excluding** the degree jobs) and a random salary.

(Just like with the college one, have some funny response to it)

## After getting a job

After you get a job the player can take a turn (with a cooldown of 60 seconds) to force a random event to happen.

Random events will happen randomly after a message has been sent. (Regardless of the cooldown)

The events will happen to the user that sent a message.

(Please check if the user is actually registered before sending out a random lifeEvent, this is to prevent API spamming to Discord unnecessarily

So first check if user is registered, if true then generate a random number between something and something (have to think of a right ratio) and compare it to 1, if 1 then pick random life event and send it.
)

## Retirement/Leaderboard

*Only the official bot will have a **global** leaderboard.*

When a user chooses to retire, the user has to pay off their debt and the end result will be sent to the leaderboard.

The following information should be sent to the leaderboard:

- User ID (do not print this)
- Username#Discrim
- Total amount of money (this will be used to sort the leaderboard)
- Job
- Salary
- Amount of LIFE tiles and how much they are worth in total

**NOTE: a user can ONLY get on the leaderboard by retiring!**

(See *"Unfortunate" circumstances* for more information)

## Other stuff

### Salary

Salary will be givin between every 2-9 turns.

To figure out when the salary will be given we'll generate a random number and compare it to a random number from the salarySpace array (will be implemented soon)

If the number is higher or equal to the random number from the salarySpace, then give salary.

(This method is being re-thought because it looks a little too easy to make money)

### Loans

A user can always ask for a loan (even when in debt).

The loan will always be $20.000, and again, has to be paid back when retired.

### Stock

Users can buy stock (unlimited stocks) whenever they want for a price of $50.000.

Users can bet their stocks once every 12 hours for a 3/10 chance to win $20.000 per stock, a 3/10 chance of nothing happening, and a 4/10 chance of losing a stock.

Also there will be random stock events (only for stock owners) with big profits, stock losses or big money losses.

*Developer note:*

To make this happen grab a random number between 1 and 10.

- If the number is between 1 and 4 the user loses his stock.
- If the number is between 5 and 7 nothing will happen.
- If the number is between 8 and 10 the user will win $20.000.

### Situation specific events

The idea of this is to have situation specific events happening, for example:

- The user is very poor and will get more events about being poor.
  - A hobo wants to fight because he/she thinks you stole something the other day from him/her.
  - A loanshark from a mafia is contacting you to lend you some money (idea for cross-player events?).
  - Because you're poor certain events will have a higher negative outcome (like having a job interview for office work where you're required to wear a suite but you are too poor for that) but other certain events will have a higher **positive** outcome (like getting free/cheap food from organizations).

However, this can also work the other way around.

- The user is very rich and will get more events about being rich.
  - If the user has stock, play more stock events.
  - If user has multiple lots (like a house), play more house events.
  - The user gets events about exclusive clubs.
  - Will be more of a target for a hitman (cross-player idea maybe?)

### "Unfortunate" circumstances

Stated in *Retirement/Leaderboard* the only way you can get on the leaderboard is to retire. But what if a life event happends and you die?

That way you don't get on the leaderboard and have to start again.

This way there is a sort of challenge to the game.

Examples of "Unfortunate" circumstances:

- Because you are poor and didn't pay back the loanshark, he orderd his friends to kill you.
- You have been taken out by a hitman because someone was jealous of your wealth.
- You died while working (make this one more specific to the job).
- You died while in a shootout in the mall.
- You died by intoxication.

### Friend system

*Still thinking about this idea give me some more time*

# Feature/TODO list for the developers

1. Assign yourself an assignment by moving the assignment to your name (by opening this file in an editor and cut & paste it under your name in this file).
2. After you are done with your assignment change "- [ ]" to "- [X]" but do not move it to finished yet and the lead developer (Androiddd) will check your code.
3. The LEAD DEVELOPER will move the assignment if the code is good.
4. In the case your code isn't good you will be asked to redo it/make changes before continuing another assignment. There will be a note left for you in this file under your name > Lead developer notes
5. DO NOT move assignments to finished yourself!
6. After you are done with an assignment and checked it off, assign yourself to another assignment and continue your work.

If you have suggestions please put them under "Suggestions" in the following format:
[YOURNAME] DESCRIPTION OF SUGGESTION

Ex.:

Unassigned/Assigned assignment:

- [ ] *Some thing that you have to code*

Completed assignment:

- [X] *Some thing that you have to code*

Finished assignment:

- [X] *Some thing that you have to code* (by Androiddd)

Suggestion:

- [ ] *[Androiddd] Your mom gay*

Extra info:

- [ ] *Some thing that you have to code*

└ Extra info is here

# LIST

## Unassigned

**Before picking any new assignments make sure you are done with your previous assignments!**

For instance, when you've finished all your assigned tasks (but still have to be checked out by the Lead Developer) you may grab a new task **however** please note that if the Lead Deverloper asks you to redo a task, first redo that task before continuing other tasks or before assigning yourself other ones!

- [ ] Create a stock system

└ A system where people can buy stock so they can receive stock events and bet on their stock.

- [ ] Version command

- [ ] Credits command

## Suggestions

- [ ] A lottery where people buy tickets and can win  

## Androiddd's Tasks

- [ ] Making a way to efficiently store all events

- [ ] Create the first part of the "The Game of LIFE" game. (The college or start working choice)

└ If you know the board game you are allowed to make this feature otherwise please try to refrain from making this feature.

### Lead developer notes

Please note that I'm mostly working on the TODO list and checking other people's code.
Or responding to people on Github.

## Axiatinc's Tasks

- [X] Create a way for a user to register, after that event is fired create the user in the database

- [ ] Create a dynamic event handler that triggers randomly when someone sends a message in the server (just like pokécord (or whatever it's name is))

├ With this event handler, random (life) events will pop up every now and then for the user that just sent a message (if he/she is registered ofc)

└ Think about (life) events like: "You have an argument with your wife, what would you do?" (A: Something, B: Something, C: Something, etc. fill it up with whatever answers you can come up with but don't make like 52 answers)

- [ ] Create a way to retire to save your stats to the leaderboard

└ Also create a leaderboard in the database.

### Lead developer notes

#### Create a way for a user to register, after that event is fired create the user in the database

~~What I ment is insert the player info to the database and make an array with some default values that aren't set in the database.~~

~~So make a mysql_con.query and use sql INSERT INTO to insert the user info in the table.~~

~~Check the table via the control panel to see what you need to add.~~

~~EDIT: Also the mysql.js and botCred.js files are for credentials and such NOT for functions or anything else.~~

~~So make the query in here see ready code for an example on how to use an query~~

~~Please see the ready code mysql query (as example) to see how to properly handle a mysql query.~~

~~Compare the fields that your are using in your query and the database, most of them have default values (giving via table) and can be ignored when query-ing.~~

~~You forgot to check if the user is already registered before registering.~~

~~Make your message more game-like. For example:~~

- ~~Use `person` instead of `account`~~
- ~~Think of a funny little message that point towards their account being created successfully.~~
- ~~You could also make an array with multiple messages and randomly pick one. (I'll explain soon why this would be very cool)~~

You are creating a message saying the register is succesfull but you don't know this for sure since the database code is running after that.

## Create a dynamic event handler that triggers randomly when someone sends a message in the server (just like pokécord (or whatever it's name is))

~~Please recheck your code. Your if statement is incorrect.~~

~~Your bot.on line is incorrect it misses a ,~~

~~Your `lifeEvents` variable is very good. Just one note: Don't fill it with anything else.~~
~~How it is right now is a great **placeholder**.~~
~~We will fill it up later on. (There will be a new assignment when it's time)~~

You didn't check if the user is actually registered.

## Finished (and checked)

- [X] Change the ready code (by Androiddd)
- [X] Basic ping command (by Axiatinc)
- [X] Add an event handler for if the bot is being added to a server and log it to the console (by Axiatinc)
