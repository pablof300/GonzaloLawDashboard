const express = require('./config/express.js')

const app = express.init();
const port = process.env.PORT || 5000; // Move to configuration

app.listen(port, () => console.log(`Server now running on port ${port}!`));
