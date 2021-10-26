const router = require("express").Router();
const db = require("../db");

//get route to retrieve notes from db.json

router.get("/notes", (req, res) => {
  db.readNotes()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => res.status(500).json(err));
});

//route to create a new note
router.post("/notes", (req, res) => {
  db.writeNotes(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

//route that deletes note using the id that is passed as a param
router.delete("/notes/:id", (req, res) => {
  db.deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
