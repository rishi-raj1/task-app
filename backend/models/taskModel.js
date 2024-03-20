import mongoose from "mongoose";


const taskSchema = mongoose.Schema({
    category: {
        type: String,
        enum: ['BACKLOG', 'TO-DO', 'PROGRESS', 'DONE'],
        required: true
    },
    priority: {
        type: String,
        enum: ['LOW', 'MODERATE', 'HIGH'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        default: null
    },
    checklistArr: [{
        checked: {
            type: Boolean,
            required: true,
            default: false
        },
        description: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


const Task = mongoose.model('Task', taskSchema);

export default Task;