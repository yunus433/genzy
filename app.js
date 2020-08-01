const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const app = express();
const server = http.createServer(app);

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/genzy";

const indexRouteController = require('./routes/indexRoute');
const adminRouteController = require('./routes/adminRoute');
const authRouteController = require('./routes/authRoute');
const campaignsRouteController = require('./routes/campaignsRoute');
const profileRouteController = require('./routes/profileRoute');
const testRouteController = require('./routes/testRoute');
const historyRouteController = require('./routes/historyRoute');
const agreementRouteController = require('./routes/agreementRoute');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

mongoose.connect(mongoUri, { useNewUrlParser: true, auto_reconnect: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(express.static(path.join(__dirname, "public")));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(session);

app.use('/', indexRouteController);
app.use('/admin', adminRouteController);
app.use('/auth', authRouteController);
app.use('/campaigns', campaignsRouteController);
app.use('/profile', profileRouteController);
app.use('/test', testRouteController);
app.use('/history', historyRouteController);
app.use('/agreement', agreementRouteController);

server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
