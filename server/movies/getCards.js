const getCards = (moviesRouter, db) => moviesRouter.get("/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movies";

    db.query(sqlSelect, (err, result) => {

        if (err) {
            console.log(err);
            return res.json({ status: false, message: "Something went wrong" });
        }

        else if (result) {
            return res.json({ status: true, result: result });
        }
    });
});

exports.getCards = getCards;