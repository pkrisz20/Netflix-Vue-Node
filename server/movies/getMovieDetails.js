const getMovieDetails = (moviesRouter, db) => moviesRouter.get("/getmoviedetails/:movieId", (req, res) => {
    
    const movieID = req.params.movieId;
    const sqlSelect = "SELECT * FROM movies WHERE id = ?";

    db.query(sqlSelect, movieID, (err, result) => {
        if (err) {
            console.log(err);
        }

        else if (result.length > 0) {
            for (const i of result) {
                const buf = new Buffer.from(i.image);
                i.image = buf.toString("base64");
            }
            res.send(result);
        }
    });
});

exports.getMovieDetails = getMovieDetails;