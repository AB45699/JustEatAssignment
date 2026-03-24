exports.handlePathNotFound = (req, res, next) => {
    res.status(404).send({message: "Path not found"});
};

exports.handleHTTPErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({message: err.message})
    };
}