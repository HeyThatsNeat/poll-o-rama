import { Profile } from "../models/profile.js";

function index(req, res) {
    Profile.find({})
    .populate('polls')
    .then(profiles => {
        console.log(profiles);
        res.render('pollfiles/index', {
            profiles: profiles,
            title: "Pollfile",
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

export {
    index
}