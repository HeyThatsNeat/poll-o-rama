import { Poll } from "../models/poll.js"
import { Profile } from "../models/profile.js";

function index(req, res) {
    Poll.find({})
    // .populate('owner')
    .then(polls => {
        console.log("POLL",polls)
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
    Profile.findById(req.body.owner)
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
        req.body.profile = req.user.profile._id
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

function deletePoll(req, res) {
    Poll.findByIdAndDelete(req.params.pollId)
    .then(poll => {
        Profile.findById(poll.owner._id)
        .then(profile => {
            profile.polls.remove(poll)
            profile.save()
            res.redirect('/polls')
        })
        .catch(error => {
            console.log(error)
            res.redirect('/polls')
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/polls')
    })
}

function edit(req, res) {
    console.log("WORKINGGINGGG")
    Poll.findById(req.params.pollId)
    .then(poll => {
        res.render('polls/edit', {
            title: "Edit Poll",
            poll,
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/polls')
    })
}

function update(req, res) {
    Poll.findByIdAndUpdate(req.params.pollId, req.body, {new : true})
    .then(poll => {
        res.redirect('/polls')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/polls')
    })
}

export {
    index,
    create,
    newPoll as new,
    createAnswer,
    deletePoll as delete,
    edit,
    update,
}