const { verifyJWT } = require('../JWT');

const filterFavourites = (moviesRouter, db) => moviesRouter.post("/filter/favs", verifyJWT, (req, res) => {

    let { selectedCategories, yearFrom, yearTo } = req.body;
    let basicSQL = `SELECT DISTINCT movies.id, movies.movieName, movies.movieDescription, movies.image, movies.releaseDate, movies.video FROM ((movies INNER JOIN cat_movies ON movies.id = cat_movies.movie_id) INNER JOIN categories ON cat_movies.cat_id = categories.category_id) INNER JOIN favourites ON movies.id = favourites.movie_id WHERE favourites.user_id = ? AND `;
    let query = "";

    selectedCategories.forEach((category, index) => {
        if (selectedCategories.length == 1) {
            query = basicSQL + `categories.category_name = '${category}'`;
        }
        else {
            if (index == 0) {
                query = basicSQL + `(categories.category_name = '${category}'`;
            }
            if (index == selectedCategories.length - 1) {
                query = query + ` OR categories.category_name = '${category}')`;
            }
            else {
                query = query + ` OR categories.category_name = '${category}'`;
            }
        }
    });
    
    //if the user sets no dates
    if (yearFrom == null && yearTo == null) {
        db.query(query, req.session.user.data[0].user_id, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong. Try later..." });
            }

            else if (result.length > 0) {
                return res.json({ status: true, result: result });
            }

            else if (result.length == 0) {
                return res.json({ status: null });
            }
        });
    }
    //if user sets dates
    else if (yearFrom != null && yearTo != null) {
        query = query + " AND (movies.releaseDate BETWEEN ? AND ?);"

        db.query(query, [req.session.user.data[0].user_id, yearFrom, yearTo], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong. Try later..." });
            }

            else if (result.length > 0) {
                return res.json({ status: true, result: result });
            }

            else if (result.length == 0) {
                return res.json({ status: null });
            }
        });
    }
    //if only yearfrom is set
    else if (yearFrom != null && yearTo == null) {
        query = query + " AND (movies.releaseDate >= ?);"

        db.query(query, [req.session.user.data[0].user_id, yearFrom], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong. Try later..." });
            }

            else if (result.length > 0) {
                return res.json({ status: true, result: result });
            }

            else if (result.length == 0) {
                return res.json({ status: null });
            }
        });
    }
    //if only yearto is set
    else if (yearFrom == null && yearTo != null) {
        query = query + " AND (movies.releaseDate <= ?);"

        db.query(query, [req.session.user.data[0].user_id, yearTo], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ status: false, message: "Something went wrong. Try later..." });
            }

            else if (result.length > 0) {
                return res.json({ status: true, result: result });
            }

            else if (result.length == 0) {
                return res.json({ status: null });
            }
        });
    }
    else {
        console.log('Something went wrong');
        return res.json({ status: false, message: "Something went wrong. Try later..." });
    }
});

exports.filterFavourites = filterFavourites;