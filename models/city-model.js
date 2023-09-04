import { Schema, model } from 'mongoose';

const CitySchema = new Schema({
	name: { type: String, required: true },
});

export const CityModel = model('city', CitySchema, 'city');
