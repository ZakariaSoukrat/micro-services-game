"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
async function isAuthenticated(req, res) {
    console.log(req.session);
    console.log(req.session.email);
    if (req.session && req.session.email) {
        res.status(200).send('User is authenticated');
    }
    else {
        res.status(401).send('User is not authenticated');
    }
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=player.controller.js.map