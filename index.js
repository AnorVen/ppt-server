import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import mongoose  from  'mongoose';
import { bd } from './database/index.js';
import center from './router/center.js';
import course from './router/course.js';
import city from './router/city.js';
import router from './router/index.js'
import { errorMiddleware } from './middlewares/error-middleware.js';
import seminar from './router/seminar.js';
import user from './router/user.js';
import fileUpload from 'express-fileupload';

dotenv.config()
const PORT = process.env.PORT || 5000;
const app = express()

app.set('views', 'views');
app.use(express.json());
app.use(cookieParser('secret key123331234'));
const corsConfig = {
	"origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 204,
	credentials: true,
};
app.use(cors(corsConfig));
app.use(fileUpload({
	limits: {
		fileSize: 5000000
	},
	abortOnLimit: false,
	safeFileNames: true,

}));
app.use(express.json({limit: '50mb'}));
app.options('*', cors(corsConfig))
app.use('/api', router);
app.use('/api/user', user)
app.use('/api/course', course)
app.use('/api/center', center)
app.use('/api/seminar', seminar)
app.use('/api/city', city)
app.use(express.static('public'));
app.use('/static', express.static('public'))
app.use(errorMiddleware);
app.get('/', (req, res, next) =>{
	console.log(req.headers.host);
})

async function run() {
	try {
		await mongoose.connect('mongodb://localhost:27017', {
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