const db = require('mongoose');
const Model = require('./model');

const list = [];

db.Promise = global.Promise;
db.connect('mongodb+srv://PurpleDoll:1234567890@to-do-ows7q.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'todo_db'
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

async function updateText(id, checked, notes) {
    const foundChecked = await Model.findOne({
        _id: id
    });

    foundChecked.checked = checked;
    foundChecked.notes = notes;
    const newChecked = await foundChecked.save();
    return newChecked;
} 

function removeMessage(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage
}