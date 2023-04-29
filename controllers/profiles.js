import { Profile } from "../models/profile.js";
import { Poll } from "../models/poll.js"

function index(req, res) {
    Profile.findById(req.user.profile)
    .populate('polls')
    .then(profile => {
        res.render(`profiles/index`, {
            profile: profile,
            title: "Pollfile",
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function show(req, res) {
    Profile.findById(req.params.profileId)
    .populate('polls')
    .then(profile => {
        res.render('profiles/show', {
            polls: profile.polls,
            title: "Pollfile",
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function edit (req, res) {
    Profile.findById(req.params.pollId)
    .populate("polls")
    .then(profile => {
        Poll.findById(req.params.pollId)
        .then(poll => {
            res.render(`profiles/edit`, {
                profile,
                poll,
                title: 'Edit Poll',
            })
        })
        .catch(error => {
            console.log(error)
            res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function update(req, res) {
    req.body.owner = req.user.profile._id
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Profile.findByIdAndUpdate(req.params.pollId, req.body, {new: true})
    .populate('polls')
    .then(profile => {
        Poll.findByIdAndUpdate(req.params.pollId, req.body, {new: true})
        .then(poll => {
            res.redirect(`/profiles/${req.user.profile._id}`)
        })
        .catch(error => {
            console.log(error)
            res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

export {
    index,
    show,
    deletePoll as delete,
    edit,
    update,
}