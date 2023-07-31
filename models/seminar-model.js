import {Schema, model} from 'mongoose';

const SeminarSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    dates: [String],
    type: {type: String, required: true},
    count: {type: String, required: true},
    organizer: {type: String, required: true},
    organizer_contacts: {type: String, required: true},
    organizer_center: {type: String, required: true},
})

export const SeminarModel = model('Seminar', SeminarSchema, 'seminar');
