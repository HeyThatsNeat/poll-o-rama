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
    Poll.findByIdAndDelete(req.params.pollfileId)
    .then( poll => {
        res.redirect(`/pollfiles/${user?.profile._id}`)
    })
    .catch(error => {
        console.log(error)
        res.redirect(`/pollfiles/${user?.profile._id}`)
    })
}

export {
    index,
    show,
    deletePoll as delete,
}