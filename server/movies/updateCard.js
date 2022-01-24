const updateCard = (moviesRouter, db) => moviesRouter.put("/update/:id", (req, res) => {

    const ID = req.params.id;
    const review = req.body.setText;
    const sqlUpdate = "UPDATE movies SET movieReview = ? WHERE id = ?";

    db.query(sqlUpdate, [review, ID], (err, result) => {
        if (err) console.log(err);
    });
});

exports.updateCard = updateCard;