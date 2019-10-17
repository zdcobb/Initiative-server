const express = require('express');
let characters = require('./server/routes/index');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/characters/', characters);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});