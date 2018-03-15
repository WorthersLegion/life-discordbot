# Feature/TODO list for the developers
1. Assign yourself an assignment by moving the assignment to your name (by opening this file in an editor and cut & paste it under your name in this file).
2. After you are done with your assignment change "- [ ]" to "- [X]" but do not move it to finished yet and the lead developer (Androiddd) will check your code.
2.1 The LEAD DEVELOPER will move the assignment if the code is good.
2.2 In the case your code isn't good you will be asked to redo it/make changes before continueing another assignment. There will be a note left for you in this file under your name > Lead developer notes
2.3 DO NOT move assignments to finished yourself!
3. After you are done with an assignment and checked it off, assign yourself to another assignment and continue your work.

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
- [ ] Create the first part of the "The Game of LIFE" game. (The college or start working choice)  
└ If you know the board game you are allowed to make this feature otherwise please try to refrain from making this feature.
- [ ] Create a way to retire to save your stats to the leaderboard  
└ Also create a leaderboard in the database.
- [ ] Create a dynamic event handler that triggers randomly when someone sends a message in the server (just like pokécord (or whatever it's name is))  
├ With this event handler random (life) events will pop up every now and then for the user that just sended a message (if he/she is registered ofc)  
└ Think about (life) events like: "You have an argument with your wife, what would you do?" (A: Something, B: Something, C: Something, etc. fill it up with whatever answers you can come up with but don't make like 52 answers)

## Suggestions

## Androiddd's Tasks


### Lead developer notes
none

## Axiatinc's Tasks
- [ ] Basic ping command
- [ ] Add a event handler for if the bot is being added to a server and log it to the console
- [ ] Create a way for a user to register, after that event is fired create the user in the database  
└ ALSO make an array with the default user data! Use this array to fill in the blank spots in the database table. (See the database table for all the fields)

### Lead developer notes

#### Basic ping command
Please use msg.channel.createMessage(msg).

#### Add a event handler for if the bot is being added to a server and log it to the console
Let it also log which guild it's added to.

#### Create a way for a user to register, after that event is fired create the user in the database
What I ment is insert the player info to the database and make an array with some default values that aren't set in the database.

So make a mysql_con.query and use sql INSERT INTO to insert the user info in the table.
Check the table via the control panel to see what you need to add.

EDIT: Also the mysql.js and botCred.js files are for credentials and such NOT for functions or anything else.
So make the query in here see ready code for an example on how to use an query

## Finished (and checked)
- [X] Change the ready code (by Androiddd)