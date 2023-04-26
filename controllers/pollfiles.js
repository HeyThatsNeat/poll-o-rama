import { Profile } from "../models/profile.js";
import { Poll } from "../models/poll.js"

function index(req, res) {
    Profile.find({owner: req.user.profile._id})
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

// function create(req, res) {
//     req.body.owner = req.user.profile._id
//     Poll.create(req.body)
//     .then(poll => {
//         res.redirect('/polls')
//     })
//     .catch(error => {
//         console.log(error)
//         res.redirect('/')
//     })
// }

export {
    index,
    // create,
}