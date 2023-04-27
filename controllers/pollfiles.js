import { Profile } from "../models/profile.js";
import { Poll } from "../models/poll.js"

function index(req, res) {
    Profile.findById(req.user.profile)
    .populate('polls')
    .then(profiles => {
        console.log("USER",req.user);
        res.render(`pollfiles/index`, {
            profiles: profiles,
            title: "Pollfile",
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function show(req, res) {
    Profile.findById(req.params.pollfileId)
    .populate('polls')
    .then(profile => {
        console.log("MY POLLS",profile),
        res.render('pollfiles/show', {
            polls: profile.polls,
            title: "Pollfile"
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
}

function deletePoll(req, res) {
    req.body.owner = req.user.profile._id
    console.log("REQ.USER.PROFILEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",req.params.pollfileId)
    Profile.findById(req.params.pollfileId)
    .populate("polls")
    .then(profile =>{
        console.log("REQ.PARAMS.PROFILE.POLLSzzzzzzzzzzzzzzzzzz",req.params)
        Poll.findById(profile.polls)
        .then(poll => {
                console.log("POOOOOOOOOOOOOOOOOOOLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL ----finds the first poll and deletes it. I want to find the one i clicked on and the delete it.........",poll.id)
                profile.polls.remove(poll.id)
                profile.save()
                .then(() => {
                    res.redirect(`/pollfiles/${req.user.profile._id}`)
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

function edit (req, res) {
    console.log("EDITTTTT REQ.PARAMS.POLLID",req.params.pollId)
    Profile.findById(req.params.pollId)
    .populate("polls")
    .then(profile => {
        Poll.findById(req.params.pollId)
        .then(poll => {
            res.render(`pollfiles/edit`, {
                profile,
                poll,
                title: 'Edit Poll'
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/pollfiles/${req.user.profile._id}`)
        })
    })
}

export {
    index,
    show,
    deletePoll as delete,
    edit,
}