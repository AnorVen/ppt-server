import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: false, required: false},
    password: {type: String, required: true},
    name:  {type: String, required: true},
    second_name:  {type: String, required: false},
    surname:  {type: String, required: false},
    city:  {type: String, required: false},
    description: {type: String, required: false},
    photo: {type: String, required: false},
    certificate: {type: String, required: false},
    master: {type: Boolean, required: false},
    superUser: {type: Boolean, required: true},
})

export const UserModel = model('User', UserSchema, 'users');
