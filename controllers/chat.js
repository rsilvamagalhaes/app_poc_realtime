module.exports = function (app) {
    var ChatController = {
        index: function (req, res) {
            var params = {email: req.params.email,
                         usuario: req.session.usuario};
            res.render('chat/index', params);
        }

    };
    return ChatController;
};