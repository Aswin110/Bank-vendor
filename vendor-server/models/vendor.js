const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
	vendor_name: {type:String, required:true},
	bank_account: {type:Number, required:true},
	Bank_name: {type:String, required:true, minLength:9, maxLength:18},
	address_line_1 : {type:String, required:true},
	address_line_2 : {type:String, required:true},
	city: {type:String, required:true},
	country: {type:String, required:true},
	zip_code: {type:Number, required:true, minLength: 6, maxLength: 6},
});

module.exports = mongoose.model('Vendor', vendorSchema);