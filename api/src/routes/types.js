const { Router } = require("express");
const getTypes = require("./utils/getTypes.js");

const router = Router();

router.get('/', async (req, res) => {
  try {

    const listTypes = await getTypes();
    res.status(200).send(listTypes);

  } catch (error) {
    res.status(404).send({ error: error.message });
  }
})

module.exports = router;