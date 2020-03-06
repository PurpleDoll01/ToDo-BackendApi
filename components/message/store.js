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

async function getMessages(filterUser) {
    let filter = {};
    if (filterUser !== null) {
        filter = {
            user: filterUser
        };
    }
    //Aquí se está filtrando para que traiga los user
    const messages = await Model.find(filter);
    return messages;
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
} 

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
}