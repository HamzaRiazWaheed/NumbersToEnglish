import express, { json } from 'express';
import convertNumberToEnglish from './src/numToEng.mjs';

const app = express();
const port = 1234;

app.use(json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true")
    next();
});

app.get('/convert', async (req, res) => {  
  res.json(JSON.stringify({english: convertNumberToEnglish(req.query.num.toString())}));
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))
