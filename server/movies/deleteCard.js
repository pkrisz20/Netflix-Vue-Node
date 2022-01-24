const deleteCard = (moviesRouter, db) => moviesRouter.delete("/delete/:id", (req, res) => {

    const ID = req.params.id;
    const sqlDelete = "DELETE FROM movies WHERE id = ?";

    db.query(sqlDelete, ID, (err, result) => {
        if (err) {
            console.log(err);
            res.send(false);
        } else {
            res.send(true);
        }
    });
});

exports.deleteCard = deleteCard;