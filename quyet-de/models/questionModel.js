const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model; // model thì định nghĩa ra bảng như kiểu Table trong SQL

const QuestionSchema =  new Schema({ // Schema định nghĩa ra cấu trúc bảng 
    yes: { type: Number, default: 0 },
    no: {type: Number, default: 0},
    content: {type: String, required: true, unique: true }
}, {
    // _id: false
    timestamps: true // createdAt && updatedAt
})

const QuestionModel = model("question", QuestionSchema);

module.exports =QuestionModel;