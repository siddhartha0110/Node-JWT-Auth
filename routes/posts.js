const router = require("express").Router();
const verify = require("./privateRoute");

router.get("/", verify, (req, res) => {
  res.json({
    posts: { title: "MY first post", description: "Restricted Post" }
  });
});
module.exports = router;
