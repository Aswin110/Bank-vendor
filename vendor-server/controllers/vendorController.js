/* eslint-disable no-undef */
const Vendor = require('../models/vendor');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: home page');
});

exports.vendor_list = asyncHandler(async (req, res, next) => {
	const vendors = await Vendor.find({}).sort({date: 1}).exec();
	if (vendors === null ){
		const err = new Error('User not found');
		err.status = 400;
		next(err);
	}
	res.json(vendors);
});

exports.vendor_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: vendor detail: ${req.params.id}`);
});

exports.vendor_create_get = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: vendor create GET');
});

exports.vendor_create_post = asyncHandler(async (req, res, next) => {
	const newVendor = new Vendor(req.body);
	await newVendor.save();
	res.send('Saved to database'+ newVendor);
});

exports.vendor_delete_get = asyncHandler(async (req, res, next) => {
	const vendor = await Vendor.findById(req.params.id).exec();
	
	if (vendor === null) {
		const err = new Error('vendor not found');
		err.status = 404;
		return next(err);
	}
	res.json(vendor);
});

exports.vendor_delete_post = asyncHandler(async (req, res, next) => {
	await Vendor.findByIdAndDelete(req.params.id);
	res.send('deleted from database');
});

exports.vendor_update_get = asyncHandler(async (req, res, next) => {
	const vendor = await Vendor.findById(req.params.id).exec();
	
	if (vendor === null) {
		const err = new Error('vendor not found');
		err.status = 404;
		return next(err);
	}
	res.json(vendor);
});

exports.vendor_update_post = asyncHandler(async (req, res, next) => {
	const vendor = new Vendor({...req.body, _id:req.params.id});
	await Vendor.findByIdAndUpdate(req.params.id, vendor, {});
	res.send('saved to database'+ vendor);
});