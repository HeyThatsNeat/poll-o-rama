import { name } from "ejs";
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

// function create(req, res) {
//     console.log("REQ.USER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",req.user)
//     req.body.owner = req.user.profile._id
//     Poll.create(req.body)
//     .then(poll => {
//         user.profile.polls.push(req.body)
//         console.log("REQ.USER.PROFILE.POLLS!!!!!!!!!!",req.user.profile)
//         res.redirect('/polls')
//     })
//     .catch(error => {
//         console.log(error)
//         res.redirect('/')
//     })
// }

// function create(req, res) {
//     req.body.owner = req.user.profile._id
//     Profile.findById(req.user.profile)
//     .then(profile =>{
//         Poll.create(req.body)
//             .then(poll => {
//                 profile.polls.push(poll)
//                 profile.save()
//                 console.log("PROFILE POLLS",profile.polls)
//                 res.redirect('/polls')
//             })
//             .catch(error => {
//                 console.log(error)
//                 res.redirect('/')
//             })
//     })
//     .catch(error => {
//         console.log(error)
//         res.redirect('/')
//     })
// }

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
                    console.log("PROFILE POLLS", profile.polls)
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
    console.log("UPDATE REQ.PARAMS.POLLIDDDDDDDD",req.params.pollId)
    console.log("REQ.BODYYYYYYY",req.body)
    Poll.findById(req.params.pollId)
    .then(poll => {
        console.log("POLLLLLLLLLLLLLLLL",poll)
        poll.responses.push(req.body)
        console.log("REQ.USER.PROFILEEEEEEEEEE",req.user.profile)
        poll.answeredBy.push(req.user.profile)
        poll.save()
        .then(() => {
            console.log("POLLLLL.RESPONSESSSSSSS",poll.responses)
            console.log("POLLLLLLLLLLLL AFTER SAVEEEE",poll)
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