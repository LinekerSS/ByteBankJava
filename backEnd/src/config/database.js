const mongoose = require('mongoose');
mongoose.set("strictQuery", true)

const url = 'mongodb://127.0.0.1:27017/todo'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;