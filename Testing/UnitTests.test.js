const { userModel } = require('../models/user');
const mongoose = require('mongoose');

beforeAll((done) => {
 mongoose.connect('mongodb+srv://lokeshsamudrala7288:<password>@final-project.ivu3ctb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 });
 done();
});

beforeEach((done) => {
 const newUser = new userModel({
    email: 'lokesh@gmail.com',
    password: 'abc@123',
 });
 newUser.save((err) => {
    if (err) return console.log(err);
    console.log('New User Created');
    done();
 });
});

afterEach((done) => {
 userModel.deleteMany({}, (err) => {
    if (err) return console.log(err);
    console.log('Deleted all users');
    done();
 });
});

afterAll((done) => {
 mongoose.connection.close();
 done();
});

describe('User Test Suite', () => {
 it('finds user by email', async (done) => {
    const user = await userModel.findOne({ email: 'lokesh@gmail.com' });
    expect(user).not.toBeNull();
    done();
 });
});