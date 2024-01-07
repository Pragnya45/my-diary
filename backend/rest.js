const express = require("express");
const bodyParser = require("body-parser");
const DiaryEntryModel = require("./entry-schema");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://pragnya110:pragnya110@cluster0.uo6nkeg.mongodb.net/diarydb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("Error in connecting to MOngoDb");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with,Content-Type,Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  next();
});

app.use(bodyParser.json());
app.post("/add-entry", (req, res) => {
  const diaryEntry = new DiaryEntryModel({
    date: req.body.date,
    entry: req.body.entry,
  });
  diaryEntry
    .save()

    .then(() => {
      res.status(200).json({
        message: "Post Submitted",
      });
    });
});

app.get("/diary-entries", (req, res, next) => {
  DiaryEntryModel.find()
    .then((data) => {
      res.json({ diaryEntries: data });
    })
    .catch(() => {
      console.log("Error fetching entries");
    });
  // res.json({ diaryEntries: diaryEntries });
});

app.delete("/remove-entry/:id", (req, res) => {
  DiaryEntryModel.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Post Deleted",
    });
  });
});
app.put("/update-entry/:id", (req, res) => {
  const updatedEntry = new DiaryEntryModel({
    _id: req.body.id,
    date: req.body.date,
    entry: req.body.entry,
  });
  DiaryEntryModel.updateOne({ _id: req.body.id }, updatedEntry).then(() => {
    res.status(200).json({
      message: "Update completed",
    });
  });
});

app.use((req, res, next) => {
  res.send("hell from express");
});

module.exports = app;
