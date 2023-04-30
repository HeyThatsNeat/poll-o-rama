import { Profile } from "../models/profile.js"

function index(req, res) {
    Profile.find({})
    .populate('polls')
    .then(profiles => {
        res.render(`profiles/index`, {
            profiles: profiles,
            title: "Profile Roulette",
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
            profile,
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