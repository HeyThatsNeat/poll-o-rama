import { Profile } from "../models/profile.js"

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

export {
    index,
    show,
}