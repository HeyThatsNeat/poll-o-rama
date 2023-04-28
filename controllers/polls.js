import { Poll } from "../models/poll.js"
import { Profile } from "../models/profile.js";

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
    req.body.owner = req.user.profile._id
    Profile.findById(req.user.profile)
    .populate("polls")
    .then(profile =>{
        Poll.create(req.body)
        .then(poll => {
            profile.polls.push(poll)
            profile.save()
            .then(() => {
                res.redirect('/polls')
            })
            .catch(error => {
                console.log(error)
                res.redirect('/')
            })
        })
        .catch(error => {
            console.log(error)
            res.redirect('/')
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function createAnswer(req, res) {
    Poll.findById(req.params.pollId)
    .then(poll => {
        poll.responses.push(req.body)
        poll.answeredBy.push(req.user.profile)
        poll.save()
        .then(() => {
            res.redirect('/polls')
        })
        .catch(error => {
            console.log(error)
            res.redirect('/')
        })
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
    createAnswer,
}