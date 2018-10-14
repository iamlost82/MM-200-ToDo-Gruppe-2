const express = require('express');
const router = express.Router();
const jokes = [
    {
        body:"<p>Mother: Anton, do you think I'm a bad mother?</p><p>You: My name is INPNAME!!</p>"
    },
    {
        body:"<p>Barista: How do you take your coffee?</p><p>INPNAME: Very, very seriously.</p>"
    },
    {
        body:"<p>And the lord said unto INPNAME, 'Come forth and you will receive eternal life'.</p><p>INPNAME came fifth and won a toaster.</p>"
    },
    {
        body: "<p>Dr. INPNAME: I'm sorry but you suffer from a terminal illness and have only 10 to live.</p><p>Patient: What do you mean, 10? 10 what? Months? Weeks?!</p><p>Dr INPNAME: Nine.</p>"
    },
    {
        body:"<p>INPNAME: CAPS LOCK – Preventing Login Since 1980.</p>"
    },
    {
        body:"<p>INPNAME: Tonight I dreamt of a beautiful walk on a sandy beach.</p><p>Better half: At least that explains the footprints I found in the cat litter box this morning.</p>"
    },
    {
        body:"<p>My friend INPNAME shocked and hurt me.</p><p>He told me today that I make people very uncomfortable and have no respect for personal space.</p><p>I mean, what a thing to say to a friend? It totally ruined our bath!</p>"
    }    
];

router.get('/', (req,res,next) => {
    status = 200;
    response = jokes;
    res.status(status).json(response);
});

router.get('/random', (req,res,next) => {
    if(jokes.length > 0){
        let randomJoke = Math.floor(Math.random()*jokes.length);
        let joke = jokes[randomJoke];
        status = 200;
        response = joke;
    } else{
        status = 200;
        response = {body:'<p>Sorry, no jokes currently stored on server...</p>'}
    }
    res.status(status).json(response);
});

router.post('/new', (req,res,next) => {
    let newJoke = req.body
    jokes.push(newJoke);
    res.status(201).json({msg:"New joke created"});
})

module.exports = router;