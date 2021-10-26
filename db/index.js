const util = require("util");
const fs = require("fs");

const uuidv1 = require("uuid/v1");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readAsync("db/db.json", "utf-8");
  }

  write(note) {
    return writeAsync("db/db.json", JSON.stringify(note));
  }

  readNotes() {
    return this.read().then((data) => {
      let notes;

      try {
        notes = [].concat(JSON.parse(data));
      } catch (err) {
        notes = [];
      }
      return notes;
    });
  }

  writeNotes(note){
	const { title, text } = note;

	const newNote = { title, text, id: uuidv1()};

	return this.readNotes()
	.then((notes)=> [...notes, newNote])
	.then((updatedNotes)=> this.write(updatedNotes))
	.then(()=> newNote);
  }

  deleteNote(id){
	return this.readNotes()
	.then((notes)=> notes.filter((note)=> note.id !== id))
	.then((updatedNotes)=> this.write(updatedNotes))
  }

}

module.exports = new Notes();
