const db = require('mongoose');
const Model = require('./model');

const list = [];

//mongodb+srv://PurpleDoll:Thestral01@messagecluster-vslg9.mongodb.net/test
db.Promise = global.Promise;
db.connect('mongodb+srv://PurpleDoll:Thestral01@messagecluster-vslg9.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'db_message'
});
db.connection.on('connected', () => {
    console.log('Mongoose is connecteeed');
}) 

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages() {
    const messages = await Model.find();
    return messages;
}

module.exports = {
    add: addMessage,
    list: getMessages
}