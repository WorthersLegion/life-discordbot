# Feature/TODO list for the developers
1. Assign yourself an assignment by moving the assignment to your name (by opening this file in an editor and cut & paste it under your name in this file).
2. After you are done with your assignment change "- [ ]" to "- [X]" but do not move it to finished yet and the lead developer (Androiddd) will check your code.
3. The LEAD DEVELOPER will move the assignment if the code is good.
4. In the case your code isn't good you will be asked to redo it/make changes before continueing another assignment. There will be a note left for you in this file under your name > Lead developer notes
5. DO NOT move assignments to finished yourself!
6. After you are done with an assignment and checked it off, assign yourself to another assignment and continue your work.

If you have suggestion please put them on under "Suggestions" in the following format:
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
- [ ] Create a way to retire to save your stats to the leaderboard  
└ Also create a leaderboard in the database.

## Suggestions

## Androiddd's Tasks
- [ ] Create the first part of the "The Game of LIFE" game. (The college or start working choice)  
└ If you know the board game you are allowed to make this feature otherwise please try to refrain from making this feature.

### Lead developer notes
Please note that I'm mostly working on the TODO list and checking other people's code.  
Or responding to people on Github.

## Axiatinc's Tasks
- [ ] Create a way for a user to register, after that event is fired create the user in the database  
└ ALSO make an array with the default user data! Use this array to fill in the blank spots in the database table. (See the database table for all the fields)
- [ ] Create a dynamic event handler that triggers randomly when someone sends a message in the server (just like pokécord (or whatever it's name is))  
├ With this event handler random (life) events will pop up every now and then for the user that just sended a message (if he/she is registered ofc)  
└ Think about (life) events like: "You have an argument with your wife, what would you do?" (A: Something, B: Something, C: Something, etc. fill it up with whatever answers you can come up with but don't make like 52 answers)

### Lead developer notes

#### Create a way for a user to register, after that event is fired create the user in the database
~~What I ment is insert the player info to the database and make an array with some default values that aren't set in the database.~~

~~So make a mysql_con.query and use sql INSERT INTO to insert the user info in the table.~~  
~~Check the table via the control panel to see what you need to add.~~

~~EDIT: Also the mysql.js and botCred.js files are for credentials and such NOT for functions or anything else.~~  
~~So make the query in here see ready code for an example on how to use an query~~

Please see the ready code mysql query (as example) to see how to properly handle a mysql query.

Compare the fields that your are using in your query and the database, most of them have default values (giving via table) and can be ignored when query-ing.

You forgot to check if the user is already registered before registering.

Also make the command `register` not `start` <-- You didn't change this yet

## Create a dynamic event handler that triggers randomly when someone sends a message in the server (just like pokécord (or whatever it's name is))

~~Please recheck your code. Your if statement is incorrect.~~  

Your bot.on line is incorrect it misses a ,  

Your `lifeEvents` variable is very good. Just one note: Don't fill it with anything else.  
How it is right now is a great **placeholder**.  
We will fill it up later on. (There will be a new assignment when it's time)

## Finished (and checked)
- [X] Change the ready code (by Androiddd)
- [X] Basic ping command (by Axiatinc)
- [X] Add a event handler for if the bot is being added to a server and log it to the console (by Axiatinc)