const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/gameofba_library", {useNewUrlParser: true});

module.exports = mongoose;
