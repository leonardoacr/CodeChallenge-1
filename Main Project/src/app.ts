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

// setting up EJS
// for deployment in Render.com:
app.set('views', ['./dist/views/']);
app.set('view engine', 'ejs'); // setting up EJS
app.use(express.static('./dist/public')); // define public and static folder (js and css files)

// for local development:
// app.set('view engine', 'ejs'); // setting up EJS
// app.use(express.static('public')); // define public and static folder (js and css files)

// routes
app.use(mainRoutes);
app.use(extraRoutes);

export default app;
