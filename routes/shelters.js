const express = require('express');
const router = express.Router();
const {
  fetchAll,
  getByID,
  save,
  update,
  remove
} = require('../controllers/shelters');

router
  .route('/')
  .get(fetchAll)
  .post(save);

router
  .route('/:id')
  .get(getByID)
  .put(update)
  .delete(remove);

module.exports = router;
