const Eris = require('eris')
const token = 'NDkzNTMzMTMzODI5MDQ2Mjc0.XQOqJw.Jc1FMwpsNxghx80BwMRHDh5dY6k'
const bot = new Eris.CommandClient(token,{},{
  prefix:'!'// You can change this to whatever you want
})
const fs = require('fs')
const owner = '253600545972027394'

bot.on('ready',() => {
  console.log(`Ready! Logged on as ${bot.user.username}#${bot.user.discriminator}`) //Logs ready in the console
  bot.unregisterCommand('help') // Unregisters Eris' help command. It's not really needed if it's just for counting how many times a word has been said
})
let db
let eek = 0 //start with this, if a value is in the json file then it will be replaced when the bot is ready. Copy if you are counting multiple words
fs.readFile('./eek.json','utf8',(err,json) => {
  if(err) {
    console.error(err) // Throws error in console
    //return process.exit(1) // Stops the app if there's an error reading the json file
  }
  db = JSON.parse(json)
  eek = db['eek']
})

bot.registerCommand('eek',(msg) => {
  if(msg.member.id != owner) return // Don't do anything if you're not the bot owner (specified above). You can remove this if you want
  msg.channel.createMessage(`That word has been said ${eek} times!`)
})

bot.on('messageCreate',(msg) => {
  const content = msg.content.split(' ') // Converts into array so we can find if eek is used on its own
  if(!content.includes('eek')) return; // Does nothing if the word eek isn't found
  eek = eek + 1 // Adds 1 to the counter
  db.eek = eek // Applies it to the DB
  fs.writeFile('./eek.json',JSON.stringify(db), (err) => {
    if(err) return console.error(err) // Throws error in console
    console.log('Added a count to "eek", count: '+eek)
  })
})

bot.connect()
