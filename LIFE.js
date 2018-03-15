/***
 * Format for console.log message:
 * [MODULE][MSG_TYPE] MESSAGE
 * ex.:
 * [MySQL][Error] Couldn't connect to host.
 * 
 * Modules can be functions, bot commands or literal modules from nodejs/npm.
 * 
 * MSG_TYPEs: (with the exact case letters)
 * Info
 * Warning
 * Critical
 * Error
 * DEBUG
 ***/
 
/***
 * Feature/TODO list for the developers
 * 1. Assign yourself by putting your name after "assigned to: ".
 * 2. After you are done with your assignment put a "(v)" after your name and the lead developer (Androiddd) will check your code.
 * 3. The LEAD DEVELOPER will delete the assignment if the code is good.
 * 3.1 In the case your code isn't good you will be asked to redo it/make changes before continueing another assignment
 * 3.2 DO NOT delete assignments yourself!
 * 4. After you are done with an assignment and checked it off, assign yourself to another assignment and continue your work.
 * 
 * If you have suggestion please put them on the list in the following format:
 * [Suggestion][YOURNAME] DESCRIPTION OF SUGGESTION
 * 
 * Ex.:
 * Unassigned assignment:
 * Some thing that you have to code - assigned to:
 * 
 *
 * Assigned assignment:
 * Some thing that you have to code - assigned to: Androiddd
 * 
 * Completed assignment:
 * Some thing that you have to code - assigned to: Androiddd (v)
 * 
 * Suggestion:
 * [Suggestion][Androiddd] Your mom gay
 * 
 * Extra info:
 * Some thing that you have to code - assigned to: 
 * └ Extra info is here
 * 
 * LIST:
 * Basic ping command - assigned to: Axiatinc (X)
 * Change the ready code - assigned to: Androiddd
 * Add a event handler for if the bot is being added to a server and log it to the console - assigned to: Axiatinc (X)
 * Create a way for a user to register, after that event is fired create the user in the database - assigned to: Axiatinc (X)
 * └ ALSO make an array with the default user data! Use this array to fill in the blank spots in the database table. (See the database table for all the fields)
 * Create the first part of the "The Game of LIFE" game. (The college or start working choice) - assigned to: 
 * └ If you know the board game you are allowed to make this feature otherwise please try to refrain from making this feature.
 * Create a way to retire to save your stats to the leaderboard - assigned to: 
 * └ Also create a leaderboard in the database.
 * Create a dynamic event handler that triggers randomly when someone sends a message in the server (just like pokécord (or whatever it's name is)) - assigned to: 
 * ├ With this event handler random (life) events will pop up every now and then for the user that just sended a message (if he/she is registered ofc)
 * └ Think about (life) events like: "You have an argument with your wife, what would you do?" (A: Something, B: Something, C: Something, etc. fill it up with whatever answers you can come up with but don't make like 52 answers)
 * 
 ***/

// Loading MySQL credentials
var mysqlData = require("./mysql.js")

// Loading bot credentials
var botCred = require("./botCred.js")

// Loading Modules
var Eris = require("eris") // Eris lib, for the Discord functionality, duh.
var mysql = require("mysql") // MySQL, in order to use a MySQL database to store data somewhere.
var async = require("async") // "Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript."

console.log('\x1b[1m') // Setting color pre-settings

// Setting a color scheme for console.log
var colorScheme = {
	error: "\x1b[31m%s", // Red
	critical: "\x1b[2m\x1b[33m%s\x1b[1m", // Orange
	connectionIS: "\x1b[36m%s", // Cyan
	info: "\x1b[34m%s", // Blue
	execSuccess: "\x1b[32m%s", // Green
	debug: "\x1b[35m%s", // Purple
	white: "\x1b[37m%s", // White, duh.
	red: "\x1b[31m%s", // error
	orange: "\x1b[2m\x1b[33m%s\x1b[1m", // critical
	cyan: "\x1b[36m%s", // connection is succesfull
	blue: "\x1b[34m%s", // info
	green: "\x1b[32m%s", // execution success
	purple: "\x1b[35m%s" // debug
}

/***
 * debugMsg - Send message to console (only to be used for debug messages!)
 * @param {String} dMsg - Message to be logged to console
 * @param {Array,Object} dirVar - array or object that needs to be fully printed
 ***/
function debugMsg(dMsg, dirVar) {
	if (debug) {
		console.log(colorScheme.debug, dMsg)
		if (dirVar != null) {
			console.dir(dirVar)
		}
	}
}

// Defining debug just in case
var debug = false

// Check if script is run with the debug switch, if so enable debug mode.
if (process.argv[2] == "debug") {
	debug = true
	debugMsg("[Core][DEBUG] Debug enabled!")
}

// Setting prefix of bot
var botPrefix = "LIFE!"
// Version of bot (Androiddd will change this every once in a while so don't about worry it)
var version = "v0.0.1 (Closed Alpha)"

// Defining bot aka Eris Command Client
var bot = new Eris.CommandClient(botCred.token, {
	maxShards: 'auto'
}, {
	defaultHelpCommand: true,
	description: "Play a real time game of: The Game of LIFE (TM)",
	owner: "Androiddd#4682",
	prefix: botPrefix
})

/***
 * randomInt - Generate a random number between the 2 givin numbers
 * @param {Number} low - Lowest number it can return
 * @param {Number} high - Highest number it can return
 * @return {Number} - Returns a random number between the 2 givin numbers
 ***/
function randomInt (low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low)
}

/***
 * isEmpty - Checks if sting is empty (mostly used out of lazyness)
 * @param {String} str - String to be checked
 * @return {Boolean} - Returns true on empty, false on not empty
 ***/
function isEmpty(str) {
	return (!str || 0 === str.length);
}

// Functions here!

// Ready code TODO: Start over cuz I stole it from myself. (Let Androiddd worry about it)
bot.on("ready", () => {
	mysql_con = mysql.createPool({
		connectionLimit : mysqlData.connectionLimit,
		host            : mysqlData.host,
		port            : mysqlData.port,
		user            : mysqlData.username,
		password        : mysqlData.password,
		database        : mysqlData.database
	})
	mysql_con.getConnection(function(err, connection) {
		if (err) {
			console.error(colorScheme.error, `[MySQL][Error] Couldn't connect to the MySQL server (${mysqlData.host}:${mysqlData.port}) with username (${mysqlData.username}) on database (${mysqlData.database}).\nError: ${err}`)
			process.exit(1)
		} else {
			console.log(colorScheme.connectionIS, `[MySQL][Info] Connected to MySQL server (${mysqlData.host}:${mysqlData.port}) with username (${mysqlData.username}) on database (${mysqlData.database}).`)
		}
		bot.editStatus("online", {
			name: `Type "${botPrefix}help" to get started!`
		})
		console.log(colorScheme.connectionIS, `[Core][Info] Token log in as '${bot.user.username}#${bot.user.discriminator}'.`)
		console.log(colorScheme.execSuccess, `[Core][Info] Bot loaded and running on ${bot.guilds.size} guilds with ${bot.users.size-1} users.`)
	})
})

// ALL OTHER CODE HERE!

// LD NOTE: Please use msg.channel.createMessage(msg).
bot.registerCommand('ping', (msg) => {
  bot.createMessage(msg.channel.id, 'pong').
  then(newMsg => {
    bot.editMessage(newMsg.channel.id, newMsg.id, `\`\`\`javascript/npong | Time taken: ${newMsg.timestanp - msg.timestamp} ms\`\`\``);
  })
});

// LD NOTE: Let it also log which guild it's added to.
bot.on('guildCreate', (guild) => {
  console.log(colorScheme.blue, `[CORE][INFO]${bot.username} was added to a server!`)
});

// LD NOTE: What I ment is insert the player info to the database and make an array with some default values that aren't set in the database.
// So make a mysql_con.query and use sql INSERT INTO to insert the user info in the table.
// Check the table via the control panel to see what you need to add.
bot.registerCommand('start', (msg) => {
  bot.createMessage(msg.channel.id, `Welcome to The Game of Life! I've made you an account, so use ${botPrefix}help to get started!`)
  mysql_con.registerUser(); //* Not sure if i exactly did this right, please tell me if i did, With the mysql_con.registerUser(); part *//
})


bot.connect()