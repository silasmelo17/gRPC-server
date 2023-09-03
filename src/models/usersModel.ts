
import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
    },
    password: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
}, {
    collection: 'users',
    timestamps: true
});

export const UsersModel = mongoose.model( 'UsersModel', UsersSchema);
export default UsersModel;
