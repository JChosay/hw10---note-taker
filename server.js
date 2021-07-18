const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes.js");
const apiRoutes = require("./routes/apiRoutes.js")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true})); //! allows us to receive arrays and strings
app.use(express.json()); //! accepts json

app.use(express.static("public")); 

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
    console.log("Listening on PORT: "+PORT);
});