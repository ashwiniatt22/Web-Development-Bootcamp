//jshint esversion:6
//https://mongodb.github.io/node-mongodb-native/3.2/quick-start/quick-start/

import express, { response } from "express";
import bodyParser from "body-parser"
import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import expressSession from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose'


const app = express();
app.set('view engine', 'ejs');
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username })
        if (!user) return done(null, false)
        if (user.password !== password) return done(null, false);
        return done(null, user);
    } catch (err) {
        return done(err, false)
    }
})
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (err) {
        done(err, false)
    }

});


mongoose.connect('mongodb://localhost:27017/userDB')

app.get("/", (req, res) => {
    res.render("home.ejs")
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: String,
    arr: [{ secret: String }]

})
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("user already exist, do login");

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    newUser.save();
    res.redirect("/")
})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/submit' })
);

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/logout", (req, res, next) => {

    req.logout((err) => {
        if (err) return next(err)
        res.redirect("/")
    });
});

app.get("/submit", (req, res) => {
    res.render("submit.ejs")

})

app.post("/submit", async (req, res) => {
    const newSecret = req.body.secret
    try {
        const foundUser = await User.findOne({ _id: req.user._id });

        if (foundUser) {
            foundUser.arr.push({ secret: newSecret })
            foundUser.save();
            res.render("secrets.ejs", { myarr: foundUser.arr })
            console.log(foundUser.arr + "::this one")
        } else {
            res.send("Failed")
        }
    } catch (err) {
        console.log(err)
        res.redirect("/login")
    }
})

app.get("/secret", (req, res) => {
    res.render("/secrets.ejs")
})


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})