const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load profile Model
const Profile = require('../../models/Profile')
const User = require('../../models/User')

//validate
const validateProfileInput = require('../../validation/profile');
const validateEducationInput = require('../../validation/education');





router.get('/test', (req, res) => res.json({
    msg: "Profiles works"
}))


//Get api/profile
//Get current user profile
//Private access

router.get('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {

    const errors = {};
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar', 'email'])


        if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile)
    } catch (e) {
        res.status(404).json(e);
    }

});



//Get api/profile/all
//Get all profile 
//Public access
router.get('/all', async (req, res) => {
    try {
        const errors = {}
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        if (!profiles) {
            errors.noprofile = 'There are no profile';
            return res.status(404).json(errors)
        }
        res.json(profiles)
    } catch (error) {
        res.status(404).json({
            profile: 'There are no profile'
        })
    }
})


//Get api/profile/handel/:handel
//Get profile by handel
//Public access

router.get('/handle/:handle', async (req, res) => {
    const errors = {}
    try {
        const profile = await Profile.findOne({
            handle: req.params.handle
        }).populate('user', ['name', 'avatar'])

        if (!profile) {
            errors.noprofile = 'There is no profile for this user'
            res.status(404).json(errors);
        }
        res.json(profile);

    } catch (error) {
        res.status(404).json(err)
    }
})



//Get api/profile/user/:user_id
//Get profile by user ID
//Public access

router.get('/user/:user_id', async (req, res) => {
    const errors = {}
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar'])

        if (!profile) {
            errors.noprofile = 'There is no profile for this user'
            res.status(404).json(errors);
        }
        res.json(profile);

    } catch (errors) {
        res.status(404).json({
            noprofile: 'There is no profile for this user'
        })
    }
})


//Post api/profile
//Get create or edit user profile
//Private access

router.post('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const {
        errors,
        isValid
    } = validateProfileInput(req.body)

    //Check Validation
    if (!isValid) {
        //Return any errors with 400 status
        return res.status(400).json(errors)
    }

    //Get Fields
    const profileFields = {};
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //Skills -Spilt into array
    if (typeof req.body.skills !== undefined) profileFields.skills = req.body.skills.split(',');

    //Social
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).catch((err) => res.status(404).json(`Error occur in finding the profile ${err}`));
        // console.log(profile)


        if (profile) {
            //Update
            const Updateprofile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                    $set: profileFields
                }, {
                    new: true
                })
                .catch((err) => res.status(400).json(`Problem in finding ${err}`));
            res.json(Updateprofile);
        } else {
            //Check if handel exists
            const profile = await Profile.findOne({
                handle: profileFields.handle
            }).catch((errors) => {
                errors.handle = 'That handel already exists';
                res.status(400).json(errors)
            })
            if (profile) {
                errors.handle = 'That handel already exists';
                res.status(400).json(errors)
            }

            //save Profile
            const profileSave = await new Profile(profileFields).save().catch((err) => `error in saving the data ${err}`);
            res.json(profileSave);
        }
    } catch (error) {
        return res.status(404).json(`Error is here ${error}`)
    }
});



//Post api/profile/experience
//Add experience
//Private access

router.post('/experience', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).catch((err) => res.status(400).json(`Error in finding the user`));

        if (req.body.title && req.body.company) {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            profile.experience.unshift(newExp);

            const profileExp = await profile.save().catch((err) => res.status(400).json(`Error in saving the peofile with experience`));
            res.json(profileExp);
        }
        else {
            res.status(400).json({ errors: 'Fields are blank' });
        }

    } catch (error) {
        res.status(400).json(error)
    }

})



//Post api/profile/education
//Add education detail
//Private access

router.post('/education', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const {
        errors,
        isValid
    } = validateEducationInput(req.body)

    //Check Validation
    if (!isValid) {
        //Return any errors with 400 status
        return res.status(400).json(errors)
    }

    try {

        const profile = await Profile.findOne({ user: req.user.id }).catch((err) => res.status(400).json(`Error in finding the user`));

        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        profile.education.unshift(newEdu);

        const profileEdu = await profile.save().catch((err) => res.status(400).json(`Error in saving the profile with education ${err}`));
        res.json(profileEdu);
    } catch (error) {
        res.status(400).json(error)
    }

})





//Delete api/profile/experience/:exp_id
//Delete experience from profile
//Private access

router.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).catch((err) => res.status(400).json(`Error in finding the user`));

        const deletingItem = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(deletingItem, 1);

        const afterDelete = await profile.save()
        res.json(afterDelete)


    } catch (error) {
        res.status(400).json(error)
    }

})



//Delete api/profile/education/:edu_id
//Delete education from profile
//Private access

router.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).catch((err) => res.status(400).json(`Error in finding the user`));

        const deletingItem = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(deletingItem, 1);

        const afterDelete = await profile.save().catch((err) => res.status(400).json(`error Occur`))
        res.json(afterDelete)


    } catch (error) {
        res.status(400).json(error)
    }

})


//Delete api/profile
//Delete user and profile
//Private access
router.delete('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {

        const profile = await Profile.findOneAndRemove({ user: req.user.id }).catch((err) => res.status(400).json(`Error in finding the user`));

        const user = await User.findOneAndRemove({ _id: req.user.id }).catch(err => res.status(400).json(`Error`))
        res.json({ success: 'true' })


    } catch (error) {
        res.status(400).json(error)
    }

})


module.exports = router;