const router = require("express").Router();

const Todos = require("./todos-model");

// api/todos
router.get("/", (req, res) => {
  Todos.find()
    .then(todos => {
      console.log(todos);
      res.status(200).json(todos);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todos.findBy({ id });
    if (!todo.length) {
      res
        .status(404)
        .json({ message: `There is no todo with id: ${id} to delete` });
    }
    res.status(200).json(todo[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Todos.del(id);
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({
      message: `Removed ${removed} todo from the database`
    });
  }
});

module.exports = router;
