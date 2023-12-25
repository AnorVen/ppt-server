import {Schema, model} from 'mongoose';

const SeminarSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    dates: [String],
    type: {type: String, required: true},
    type_of_work: {type: String, required: true},
    count: {type: String},
    organizer: {type: String, required: true},
    organizer_contacts: {type: String, required: false},
    organizer_center: {type: String, required: false},
    main_trainer: { type: String, required: true },
    city: {type: String, required: false},
})

export const SeminarModel = model('Seminar', SeminarSchema, 'seminar');
