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

// Vars, arrays and objects about the game
var lifeEvents = ["You had an argument with your wife.", "You had a baby boy.", "You had a baby girl.", "You had twins! One baby boy and one baby girl", "You had twins! Two girls!", "You had twins! Two boys!", "You got married!"]
var startMessages = ["You have been born. Good luck with life.", "Your consciousness has been put in a car. You are a car now, are you happy?", "Ever wanted to play a game in text? Now you can. Welcome in LIFE.", "Come on Karen, this is the 15th baby you've had.", "Don't you dare start crying now, save your tears for later in life."] // Will add more SOON

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

// Bot on's
bot.on('guildCreate', (guild) => {
	console.log(colorScheme.info, `[Core][Info] ${bot.username} was added to the server ${guild.name}!`).catch((err) => {
		console.log(colorScheme.error, `[Core][Error] ${err}`)
	})
});

bot.on('messageCreate', (msg) => {
	if (randomInt(0, 50) === 1) {
		msg.channel.createMessage(lifeEvents[randomInt(0, lifeEvents.length)]).catch((err) => {
			console.log(colorScheme.error, `[Core][Error] ${err}`)
		})
	}
})

// Registered commands
bot.registerCommand('ping', (msg) => {
	msg.channel.createMessage('pong').catch((err) => {
		console.log(`[Core][Error] ${err}`)
	})
	then(newMsg => {
		bot.editMessage(newMsg.channel.id, newMsg.id, `\`\`\`javascript/npong | Time taken: ${newMsg.timestanp - msg.timestamp} ms\`\`\``).catch((err) => {
			console.log(colorScheme.error, `[Core][Error] ${err}`)
		})
	})
});

bot.registerCommand('start', (msg) => {
	if (randomInt(0, 50) === 1) {
		msg.channel.createMessage(startMessages[randomint(0, startMessages.length)]).catch((err) => {
			console.log(colorScheme.error, `[Core][Error] ${err}`)
		})
	}
	mysql_con.query('INSERT INTO users (user_id) VALUES (msg.author.id)').catch((err) => {
		console.log(colorScheme.error, `[Core][Error] ${err}`)
	})
})



bot.connect() // BIT.CONNEEEEEEEEEEEEEEEEEEEEEEEEECCCTTTTTTTTT("steal_money")!!!!!!!!
