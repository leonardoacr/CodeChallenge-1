import express from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import _ from 'lodash'; // we need this to break lines automatically when inserting the strings on EJS

// import custom functions
import extraRoutes from './routes/extraRoutes';
import mainRoutes from './routes/mainRoutes';

const app = express();

app.use(express.json());

app.locals.htmlDisplay = (html: string) =>
  _.escape(html).replace(/\n/g, '<br>');

//enable express to parse URL-encoded body i.e. info from HTML form
app.use(express.urlencoded({ extended: true }));

// require node:path to replace \ to / into dirname
// import path from 'path';

// Taking __dirname and turning to string so we can change /public directory
// const pathDIR = __dirname;
// const formatDIR = pathDIR.split(path.sep).join('/');
// const viewsPath = formatDIR.replace('dist', 'dist/views');
// const publicPath = formatDIR.replace('dist', 'dist/public');

// console.log("Views Path check: " + viewsPath)
// console.log('Public Path check: ' + publicPath);
// setting up EJS
// app.set('views', viewsPath);
app.set('views', ['./dist/views/']);
app.set('view engine', 'ejs'); // setting up EJS
app.use(express.static('public')); // define public and static folder (js and css files)

// routes
app.use(mainRoutes);
app.use(extraRoutes);

export default app;
