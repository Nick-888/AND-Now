const express = require('express');
const router = express.Router();
const { WebClient } = require('@slack/web-api');

const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
    console.error(err);
});

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

router.get('/', function(req,res){
    (async () => {
        if (!process.env.SLACK_TOKEN) {
            console.error(`No Slack Token provided`);
            return;
        }

        const result = await web.channels.history({
            token: process.env.SLACK_TOKEN,
            channel: `C6JGGFGEM`,
            count: 10,
        });
        
        // Filter messages and get rid of those without any text
        const messages = result.messages
            .filter(message => message.text.length > 0);

        let count = 0;
        // Add each message to Redis db
        messages.forEach(message => {
            console.log(JSON.stringify(message));
            client.set(message.client_message_id || count++, JSON.stringify(message), redis.print);
        });
        res.send(messages);
    })();
});

router.get('/test',function(req,res){
    const result = client.get(`f87b102b-6b7a-432c-ba2a-8892ab101852`, (err, data) => {
        if (err) console.error(err);
        else {
            res.send(data);
        }
    });
});

router.get('/hello3',function(req,res){
    res.send("c")
});

router.get('/hello4',function(req,res){
    res.send("d")
});

module.exports = router;