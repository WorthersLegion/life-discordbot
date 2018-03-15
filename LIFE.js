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

// Defining users to be a object
var users = {}

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
		mysql_con.query("SELECT * FROM `users`", function(err, rows, fields) {
			async.forEachOf(rows, (value, key, callback) => {
				users[value.user_id] = {}
				users[value.user_id]['user_id'] = value.user_id
				users[value.user_id]['money'] = value.money
				users[value.user_id]['job'] = value.job
				users[value.user_id]['in_relation'] = value.in_relation
				callback()
			}, function(err) {
				if (err) {
					console.error(colorScheme.error, `[Core][Error] Error while loading user data from MySQL to Memory.`)
					process.exit(2)
				}
				bot.editStatus("online", {
					name: `Type "${botPrefix}help" to get started!`
				})
				console.log(colorScheme.connectionIS, `[Core][Info] Token log in as '${bot.user.username}#${bot.user.discriminator}'.`)
				console.log(colorScheme.execSuccess, `[Core][Info] Bot loaded and running on ${bot.guilds.size} guilds with ${bot.users.size-1} users.`)
			})
		})
	})
})

// ALL OTHER CODE HERE!

bot.registerCommand('ping', (msg) => {
  bot.createMessage(msg.channel.id, 'pong').
  then(newMsg => {
    bot.editMessage(newMsg.channel.id, newMsg.id, `\`\`\`javascript/npong | Time taken: ${newMsg.timestanp - msg.timestamp} ms\`\`\``);
  })
});

bot.on('guildCreate', (guild) => {
  console.log(colorScheme.blue, `[CORE][INFO]${bot.username} was added to a server!`)
});

bot.registerCommand('start', (msg) => {
  bot.createMessage(msg.channel.id, `Welcome to The Game of Life! I've made you an account, so use ${botPrefix}help to get started!`)
  mysql_con.registerUser(); //* Not sure if i exactly did this right, please tell me if i did, With the mysql_con.registerUser(); part *//
})


bot.connect()