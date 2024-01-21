
const router = require("express").Router()
const Sauce = require('../model/Sauce')

const multer = require('../routes/multer-config')

// get all the sauces 
router.get('/', (req, res) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        () => {
            res.status(404).send(new Error('Database error!'));
        }
    );
})

// getting one spcific sauce
router.get('/:id', (req, res, next) => {
    Sauce.findById(req.params.id).then(
        (sauce) => {
            if (!sauce) {
                return res.status(404).send(new Error('Sauce not found!'))
            }
            res.status(200).json(sauce)
        }).catch((error) => {
            res.status(404).json({
                responsError: error
            })
        })
})

// post/add one sauce
router.post('/', multer, (req, res) => { 
    const url = req.protocol + '://' + req.get('host')
    req.body.sauce = JSON.parse(req.body.sauce)
    console.log('url', req.file.filename)
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        likes: req.body.sauce.likes,
        dislikes: req.body.sauce.dislikes,
        usersLiked: req.body.sauce.usersLiked,
        usersDisliked: req.body.sauce.usersDisliked,
    })
    sauce.save().then(() => {
        res.status(200).json({
            message: 'sauce save successfully'
        })
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
})

module.exports = router


