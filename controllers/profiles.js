import { Profile } from "../models/profile.js";
import { Poll } from "../models/poll.js"

function index(req, res) {
    Profile.findById(req.user.profile)
    .populate('polls')
    .then(profiles => {
        console.log("USER",req.user);
        res.render(`profiles/index`, {
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
    Profile.findById(req.params.profileId)
    .populate('polls')
    .then(profile => {
        console.log("MY POLLS",profile),
        res.render('profiles/show', {
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
    Profile.findById(req.params.profileId)
    .populate("polls")
    .then(profile =>{
        console.log("REQ.PARAMS.PROFILE.POLLSzzzzzzzzzzzzzzzzzz",req.params)
        Poll.findById(profile.polls)
        .then(poll => {
                console.log("POOOOOOOOOOOOOOOOOOOLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL ----finds the first poll and deletes it. I want to find the one i clicked on and the delete it.........",poll.id)
                profile.polls.remove(poll.id)
                profile.save()
                .then(() => {
                    res.redirect(`/profiles/${req.user.profile._id}`)
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
            res.render(`profiles/edit`, {
                profile,
                poll,
                title: 'Edit Poll'
            })
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/profiles/${req.user.profile._id}`)
        })
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