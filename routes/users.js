var express = require("express");
var router = express.Router();
var {
        currentSessions,
        isManager,
        getUserBySessID,
        setCookies,
} = require("../database/common");
var { addUser, deleteUser, getUserBy, getUsers, getManagers } = require("../models/users");

router.get("/", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (isManager(currentUser)) {
                res.json({ users: await getUsers() });
                return;
        }

        res.json({
                users: await getManagers(),
        });
});
router.delete("/delete", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (!isManager(currentUser)) {
                res.json({
                        success: false,
                        message: "You are unauthorized to delete users",
                });
                return;
        }
        let userToDelete = await getUserBy("name", req.body.name);
        deleteUser(userToDelete);
        res.json({ success: true, message: "User was deleted" });
});

router.post("/newUser", async function (req, res) {
        let currentUser = await getUserBySessID(req.sessionID);
        if (!isManager(currentUser)) {
                res.json({
                        success: false,
                        message: "You are unauthorized to add users",
                });
                return;
        }
        let body = req.body;
        if (await getUserBy("name", body.name)) {
                res.json({
                        success: false,
                        message: "A user with that name exists",
                });
                return;
        }
        let newUser = {
                name: body.name,
                phone: body.phone,
                userType: body.type == "Manager" ? "M" : "D",
                password: body.password,
                isAssigned: false,
        };
        await addUser(newUser);
        res.json({ success: true, message: "User was created", user: newUser });
});

router.get("/Type", async function (req, res) {
        currentUser = await getUserBySessID(req.sessionID);
        res.json({ isAuth: isManager(currentUser) });
});

router.post("/authenticate", async function (req, res) {
        let body = req.body;
        let user = await getUserBy("name", body.name);
        if (!user)
                res.json({
                        success: false,
                        message: "There is no user with that name",
                });


        else if (user.password == body.password) {
                setCookies(res, user);
                let jsonToSend = {
                        success: true,
                        user: user,
                        isAuth: isManager(user),
                };
                currentSessions[req.sessionID] = user.name;
                res.json(jsonToSend);
        } else {
                res.json({ success: false, message: "Wrong Password" });
        }
});
router.get("/logout", (req, res) => {
        delete currentSessions[req.sessionID];
        setCookies(res, { name: "", userType: "" });
        res.json({ success: true });
});

module.exports = router;
