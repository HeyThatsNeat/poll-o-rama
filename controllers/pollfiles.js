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
    Profile.findById(req.user.profile)
    .populate("polls")
    .then(profile =>{
        Poll.findById(profile.polls)
        .then(poll => {
                profile.polls.remove(poll)
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

export {
    index,
    show,
    deletePoll as delete,
}