const vendor = require("../models/vendor");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
  });

// Display list of all vendors.
exports.vendor_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: vendor list");
});

// Display detail page for a specific vendor.
exports.vendor_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: vendor detail: ${req.params.id}`);
});

// Display vendor create form on GET.
exports.vendor_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: vendor create GET");
});

// Handle vendor create on POST.
exports.vendor_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: vendor create POST");
});

// Display vendor delete form on GET.
exports.vendor_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: vendor delete GET");
});

// Handle vendor delete on POST.
exports.vendor_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: vendor delete POST");
});

// Display vendor update form on GET.
exports.vendor_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: vendor update GET");
});

// Handle vendor update on POST.
exports.vendor_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: vendor update POST");
});