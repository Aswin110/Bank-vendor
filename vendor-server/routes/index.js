var express = require('express');
var router = express.Router();
const vendor_controller = require('../controllers/vendorController');

router.get("/", vendor_controller.index);

// GET request for creating a vendor. NOTE This must come before routes that display vendor (uses id).
router.get("/vendor/create", vendor_controller.vendor_create_get);

// POST request for creating vendor.
router.post("/vendor/create", vendor_controller.vendor_create_post);

// GET request to delete vendor.
router.get("/vendor/:id/delete", vendor_controller.vendor_delete_get);

// POST request to delete vendor.
router.post("/vendor/:id/delete", vendor_controller.vendor_delete_post);

// GET request to update vendor.
router.get("/vendor/:id/update", vendor_controller.vendor_update_get);

// POST request to update vendor.
router.post("/vendor/:id/update", vendor_controller.vendor_update_post);

// GET request for one vendor.
router.get("/vendor/:id", vendor_controller.vendor_detail);

// GET request for list of all vendor items.
router.get("/vendors", vendor_controller.vendor_list);


module.exports = router;
