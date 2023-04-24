import { Poll } from "../models/poll.js"

function index(req, res) {
    Poll.find({})
    .populate('owner')
    .then(polls => {
        console.log(polls);
        res.render('polls/index', {
            polls,
            title: "polls"
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function newPoll(req, res) {
    res.render('polls/new', {
        title: "Create Poll"
    })
}

function create(req, res) {
    req.body.owner = req.user.profile._id
    Poll.create(req.body)
    .then(poll => {
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