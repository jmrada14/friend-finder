let express = require('express');
let bodyParser = require('body-parser');


let app = express();

let PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/app/public'));

require("./app/routing/apiRoutes")(app)
require("./app/routing/htmlRoutes")(app)


app.listen(PORT, () => console.log("Server running on "+ PORT ))

