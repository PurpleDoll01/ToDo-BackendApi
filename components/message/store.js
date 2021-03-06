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
            _id: filterUser
        };
    }
    const messages = await Model.find(filter);
    return messages;
}

async function getMessage(id) {
    const detailsTask = await Model.findOne({
        _id: id
    });
    return detailsTask;
}

async function updateText(id, checked, notes) {
    const foundChecked = await Model.findOne({
        _id: id
    });

    if (checked) {
        foundChecked.checked = checked;
    }

    if (notes) {
        foundChecked.notes = notes;
    }
   
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
    listOne: getMessage,
    updateText: updateText,
    remove: removeMessage
}