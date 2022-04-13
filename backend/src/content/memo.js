let messages = [];

function saveMessage(m){
    messages.push(m);
    return `message added`;
}

function deleteMessages(){
    messages = [];
    return "messages deleted";
}

function getMessages(){
    return messages;
}

module.exports = {saveMessage,deleteMessages,getMessages};