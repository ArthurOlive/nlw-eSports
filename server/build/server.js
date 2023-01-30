import express from "express";
import cors from "cors";
const app = express();
app.get("/", (req, res) => {
    res.json({ "resp": "hello world" });
});
app.use(cors());
app.listen("3000");
