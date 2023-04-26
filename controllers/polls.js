import { name } from "ejs";
import { Poll } from "../models/poll.js"

function index(req, res) {
    Poll.find({})
    .populate('owner')
    .then(polls => {
        res.render('polls/index', {
            polls,
            title: "polls",
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function newPoll(req, res) {
    res.render('polls/new', {
        title: "Create Poll",
    })
}

function create(req, res) {
    console.log("REQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",req.user)
    req.body.owner = req.user.profile._id
    Poll.create(req.body)
    .then(poll => {
        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR",req.body)
        res.redirect('/polls')
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

export {
    index,
    create,
    newPoll as new,
}