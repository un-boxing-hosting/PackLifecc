const express = require('express');
const os = require(`os`);
const boxname = os.hostname();
const port = 8101;
//const dirname = "dearassassin/server";
//const port = 8099;
var dirname = "sites/PackLifecc/server";
//const dirname = "server";
if (boxname == "un-boxing-mans-pc") {
    console.log(`Running on ${boxname}`)
    dirname = "PackLifecc/server"
}

const logger = require('morgan');
const favicon = require('serve-favicon');
const app = express();
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.set(`trust proxy`, true);

//app.use(favicon(`${dirname}/pix/favicon.ico`))
app.use(express.static(dirname + "/"))


app.listen(port, () => {
    console.log(`PackLifecc Listening on port ${port}`)

})
app.set("port", port);
module.exports = {
    app
}