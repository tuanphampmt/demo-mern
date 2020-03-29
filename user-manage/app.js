require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
//
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}
// Connect MongoDB
mongoose.connect(
    'mongodb+srv://tuanpham31798:' + process.env.MONGODB_ATLS_PW + '@tuanpham31798-zt6uf.mongodb.net/' + process.env.MONGODB_ATLS_DATABASE + '?retryWrites=true&w=majority', {
        keepAlive: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  Kết nối cơ sở dữ liệu thành công!'));
connection.on('error', (err) => {
    console.log("MongoDB lỗi kết nối. Hãy đảm bảo rằng mongodb đang chạy. " + err);
    process.exit();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
