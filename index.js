import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import mongoose  from  'mongoose';
import { bd } from './database/index.js';
import center from './router/center.js';
import course from './router/course.js';
import router from './router/index.js'
import { errorMiddleware } from './middlewares/error-middleware.js';
import seminar from './router/seminar.js';
import user from './router/user.js';

dotenv.config()
const PORT = process.env.PORT || 5000;
const app = express()

app.set('views', 'views');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use('/api/user', user)
app.use('/api/course', course)
app.use('/api/center', center)
app.use('/api/seminar', seminar)
app.use(express.static('public'));
app.use(errorMiddleware);
app.get('/', (req, res, next) =>{
	console.log(req.headers.host);
})

async function run() {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		app.listen(PORT, ()=>{
			console.log(`SERVER STARTED ON ${PORT}`)
		})
	} catch (e) {
		console.log(e);
	}
}
run().catch(console.dir);