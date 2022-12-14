const { authJwt } = require("../middleware");
const controller = require("../controllers/user.comntrollers");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all", controller.allAccess);
    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],controller.moderatorBoard
    );
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard
    );

    app.post('/api/books/:id', [authJwt.verifyToken], controller.booking)

    app.get('/api/users/:id', controller.getUser)

    app.get('/api/users', controller.findAllUsers)
};
