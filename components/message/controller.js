const store = require('./store');

function addMessage(text) {
    return new Promise((resolve, reject) => {
        if (!text) {
            console.error('[messageController] No hay usuario o mensaje')
            return reject('Los datos son incorrectos');
        }
        const fullMessage = {
            text: text,
            notes: '',
            checked: false,
        };
    
        store.add(fullMessage);
        resolve(fullMessage);
    });
    
}

function getMessages(id) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function getMessage() {
    return new Promise((resolve, reject) => {
        resolve(store.listOne());
    });
}

function updateMessage(id, checked, notes) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject('Invalid data');
            return false;
        }
        const result = await store.updateText(id, checked, notes);
        resolve(result);
    });
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id inválido');
            return false;
        }
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
    getMessage
};