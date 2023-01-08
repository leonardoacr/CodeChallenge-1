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
app.set('view engine', 'ejs');

// define public and static folder (js and css files)
app.use(express.static('public'));

// routes
app.use(mainRoutes);
app.use(extraRoutes);

export default app;
