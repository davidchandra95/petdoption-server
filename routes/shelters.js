const express = require('express');
const router = express.Router();
const {
  fetchAll,
  getByID,
  save,
  update,
  remove,
  getWithinRadius
} = require('../controllers/shelters');

router.route('/radius/:zipcode/:distance').get(getWithinRadius);

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
