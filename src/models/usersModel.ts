
import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
    },
    password: {
        type: mongoose.SchemaTypes.String,
        select: false
    },
}, {
    collection: 'users',
    timestamps: true
});

export const UsersModel = mongoose.model( 'UsersModel', UsersSchema);
export default UsersModel;
