'use strict';

const Say = require('../../utils/Say');
const pluginSettings = require('./settings.json');

/**
 * Commands:
 *
 * !insult {username} - Insults the specified user
 */
module.exports = [{
	name: '!insult {username}',
	help: 'Throws a random insult at the specified user.',
    types: ['message'],
    regex: /^(!|\/)insult\s\@(\w|\d)+$/,
    action: function( chat, stanza ) {
        let insultIndex = Math.round( Math.random() * (pluginSettings.insults.length - 1) );
        let insult = pluginSettings.insults[ insultIndex ];
        let username = stanza.message.substr( stanza.message.indexOf( '@' ) + 1 );
        let insultMessage = 'Hey @' + username + '! ' + insult;

        if ( pluginSettings.useSayCommand ) {
            // Say the insult over Say.speak
            let voice = pluginSettings.insultVoice;
            Say.say( insultMessage, voice );
        } else {
            // Reply via chat
            chat.sendMessage( insultMessage );
        }
    }
}]
