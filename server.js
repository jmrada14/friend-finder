let express = require('express');
let bodyParser = require('body-parser');


let app = express();

// PORT is either the port provided by Heroku via process.env.PORT or 3000.
let PORT = process.env.PORT || 3000;

// middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + "/app/public"))

app.listen(PORT, () => console.log("Server running on "+ PORT ))

//IMPORT ROUTES HERE

// require('/app/routing/apiRoutes')(app);
// require('/app/routing/htmlRoutes')(app);