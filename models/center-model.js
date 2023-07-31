import {Schema, model} from 'mongoose';

const CenterSchema = new Schema({
    title: {type: String, unique: true, required: true},
    city: {type: String, required: true},
    website:  {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: String, required: false},
})

export const CenterModel = model('Center', CenterSchema, 'centers');
