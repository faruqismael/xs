// importing packages
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectDB = require("./db");
const Urls = require("./models/Urls");

const PORT = process.env.PORT || 4567;

const fs = require("fs");

// connnects db
connectDB();

// middlewares
app.use(express.urlencoded({ extended: false }));

// using engine
app.set("view engine", "ejs");

const f = fs.readFileSync("./views/bootstrap.min.css", {
  encoding: "utf-8",
});

app.get("/api/style", (req, res) => {
  res.json({ style: f });
});

// ('/') router
app.get("/", async (req, res) => {
  const urls = await Urls.find();
  console.log(urls);
  res.render("index", { urls });
});

// ('/shorten') router
app.post("/shortit", async (req, res) => {
  const { fullUrl } = req.body;

  await Urls.create({ fullUrl });

  res.redirect("/");
});

app.get("/:shortenurl", async (req, res) => {
  const { shortenurl } = req.params;

  const url = await Urls.findOne({ shortenUrl: shortenurl });
  try {
    if (shortenurl == null) return res.status(400).send("url not found");

    url.clicks++;
    url.save();
    res.redirect(url.fullUrl);
  } catch (error) {
    url != null && res.redirect(url.fullUrl);
  }
});

// listen
app.listen(PORT, () => {
  console.log("server started ...");
});
