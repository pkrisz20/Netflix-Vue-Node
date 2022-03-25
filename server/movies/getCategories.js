const getCategories = (moviesRouter, db) => moviesRouter.get("/getcategories", (_req, res) => {
    const sqlSelect = "SELECT category_name FROM categories";

    db.query(sqlSelect, (_err, result) => {

        if (result.length > 0) {
            res.send(result);
        }

        else if (result === 0) {
            res.json({ message: "No categories in the database!" });
        }
    });
});

exports.getCategories = getCategories;