const mongoose= require('mongoose');

const notificationSchema= new mongoose.Schema({
    senderID:{
        type: String,
        required: true,
    },
    senderUsername:{
        type: String,
    },
    receiverID:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    viewed:{
        type: Boolean,
        default: false,
    },
    action:{
        type: String,
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
