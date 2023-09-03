
import mongoose from 'mongoose';

export const TasksSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
    },
    done: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    reporter: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
    }
}, {
    collection: 'tasks',
    timestamps: true
});

export const TasksModel = mongoose.model('TasksModel', TasksSchema);
export default TasksModel;
