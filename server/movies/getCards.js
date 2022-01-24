const getCards = (moviesRouter, db) => moviesRouter.get("/get", (_req, res) => {
    const sqlSelect = "SELECT * FROM movies";

    db.query(sqlSelect, (_err, result) => {

        for (const product of result) {
            const buf = new Buffer.from(product.image);
            product.image = buf.toString("base64");
        }
        res.send(result);
    });
});

exports.getCards = getCards;