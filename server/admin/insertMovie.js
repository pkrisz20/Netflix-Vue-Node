const insertMovie = (adminRouter, db) => adminRouter.post("/insert", (req, res) => {
    const { movieName, movieReview, file } = req.body;
    let buffer = null;
    let pictureType = "";
    let pictureSize = 0;

    if(!file) {
        return res.send([false, "No file was choosen"]);
    }

    try {
        const parts = file.split(";base64,");
        pictureType = parts[0].slice(5);
        buffer = Buffer.from(parts[1], "base64");
        pictureSize = Math.round(Buffer.byteLength(buffer) / 1024);

        if(pictureType !== "image/png" && pictureType !== "image/jpeg" && pictureType !== "image/jpg") {
            return res.send([false, "File is not in correct format"]);
        }

        if(pictureSize > 4096) {
            return res.send([false, "File can not be bigger than 4MB"]);
        }
    }
    catch(err) {
        res.send(err.message);
    }

    const sqlInsert = "INSERT INTO movies (movieName, movieReview, image) VALUES (?, ?, ?);";
    db.query(sqlInsert, [movieName, movieReview, buffer], (err, result) => {
        if(err) {
            return res.send([false, err.message]);
        }
        if(result) {
            return res.send([true, "Successfully inserted"]);
        }
    });
});

exports.insertMovie = insertMovie;
