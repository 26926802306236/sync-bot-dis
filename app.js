// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();

var warnings1 = 0;

// Global Settings
const prefix = '+'; // This is the prefix, you can change it to whatever you want.

// Functions
function hook(channel, title, message, color, avatar) { // This function uses quite a few options. The last 2 are optional.

    // Reassign default parameters - If any are blank.
    if (!channel) return console.log('Channel not specified.');
    if (!title) return console.log('Title not specified.');
    if (!message) return console.log('Message not specified.');
    if (!color) color = 'd9a744'; // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
    if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png' // This is also an optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.
    color = color.replace(/\s/g, '');
    avatar = avatar.replace(/\s/g, '');

    // This is the start of creating the webhook
    channel.fetchWebhooks() // This gets the webhooks in the channel
        .then(webhook => {

            // Fetches the webhook we will use for each hook
            let foundHook = webhook.find('name', 'Webhook'); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

            // This runs if the webhook is not found.
            if (!foundHook) {
                channel.createWebhook('Webhook', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
                    .then(webhook => {
                        // Finally send the webhook
                        webhook.send('', {
                            "username": title,
                            "avatarURL": avatar,
                            "embeds": [{
                                "color": parseInt(`0x${color}`),
                                "description":message
                            }]
                        })
                            .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                                console.log(error);
                                return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                            })
                    })
            } else { // That webhook was only for if it couldn't find the original webhook
                foundHook.send('', { // This means you can just copy and paste the webhook & catch part.
                    "username": title,
                    "avatarURL": avatar,
                    "embeds": [{
                        "color": parseInt(`0x${color}`),
                        "description":message
                    }]
                })
                    .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                        console.log(error);
                        return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                    })
                }

        })

}

// Listener Event: Runs whenever a message is received.
bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

    // Commands

    // Nuke
    if (msg === prefix + 'NUKE') {

      message.channel.send('There is a big red button \n ... \n *pushes big red button \n ... \n Nothing...') // Remeber that \n means new line. This is also using a custom HEX id, and an image.

    }

    // Ping
    if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('Ping!'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.

    }

    if (msg === 'BOOB') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'BOOBS') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'BUTT') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'BUTTS') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'NAKED PHOTO') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'NAKED PIC') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'NAKED') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'NUDE') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'PENIS') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }

    if (msg === 'SEND ME DIRTY PIC') {

      message.delete();

      message.channel.send('Please no innapropriate content here.');
    }


    // Help
    if (msg === prefix + 'HELP') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

      message.channel.send('+ping Pong! \n\n+weather (location) \n\n+hook (usage) (do +hook to find out how) \n\n+purge (amount of lines you want to remove) Only for mods. \n\n+Nuke The big red button \n\n\n Thats all we have for now, we are making more so we will add onto this.');

    }

    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Lets delete the command message, so it doesnt interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "Mod")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`Moderator\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }

    if (msg === prefix + '') {

      message.delete();

      message.channel.send('Error : No command specified.');

      console.log('Error')
    }

    if (msg === prefix + 'IM-BORED') {

      message.delete();

      message.channel.send('\n<\n<>\n<><\n<><>\n<><><\n<><><>\n<><><><\n<><><><>\n<><><><\n<><><>\n<><>\n<><\n<>\n<\n');

      console.log('Someone was dumb')
    }

    // Lets make a basic version of this, then make it look good.

    // This episode will be going over the hook command.
    if (msg.startsWith(prefix + 'HOOK')) { // We are using a .startsWith because the command will have arguments.

            // Delete the message that the user sends
            message.delete();

            if (msg === prefix + 'HOOK') { // This checks if the only thing they sent was 'Hook'
                return hook(message.channel, 'ERROR!', `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional**`,'FC8469','https://www.online-tech-tips.com/wp-content/uploads/2019/10/discord.jpg.optimal.jpg') // Remeber that \n means new line. This is also using a custom HEX id, and an image.
            }

            let hookArgs = message.content.slice(prefix.length + 4).split(","); // This slices the first 6 letters (prefix & the word hook) then splits them by 'commas'

            hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]); // This is where it actually calls the hook.
        }

    });

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log('Bot started.');

});

bot.login('Njg2MDM5MDk0Mjc4NjE5MTg0.XrYBeA.9pXky8TDFmRUoUeF2Yk9ruPZe5Q');
