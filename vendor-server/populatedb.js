#! /usr/bin/env node

console.log(
	'This script populates some vendors to database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);
  
// Get arguments passed on command line
const userArgs = process.argv.slice(2);
  
const Vendor = require('./models/vendor');
  
const vendors = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
  
const mongoDB = userArgs[0];
  
main().catch((err) => console.log(err));
  
async function main() {
	console.log('Debug: About to connect');
	await mongoose.connect(mongoDB);
	console.log('Debug: Should be connected?');
	await createVendors();
	console.log('Debug: Closing mongoose');
	mongoose.connection.close();
}
  
// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function vendorCreate(index, vendor_name, bank_account, Bank_name, address_line_1, address_line_2, city, country, zip_code) {
	const vendor = new Vendor({ vendor_name: vendor_name , bank_account: bank_account, Bank_name:Bank_name, address_line_1:address_line_1, address_line_2:address_line_2, city:city, country:country, zip_code:zip_code});
	await vendor.save();
	vendors[index] = vendor;
	console.log(`Added vendor: ${vendor_name}`);
}
  
async function createVendors() {
	console.log('Adding vendors');
	await Promise.all([
		vendorCreate(0, 'ABC Suppliers',1234567890,'XYZ Bank','123 Main Street','Apt 4B','Cityville','Countryland',123456),
		vendorCreate(1, 'EFG Services',9876543210,'PQR Bank','456 Oak Avenue','Suite 200','Townburg','Countryland',654321),
		vendorCreate(2, 'LMN Supplies',2468101357,'RST Bank', '789 Pine Street', 'Floor 5', 'Villagetown', 'Countryland', 987654),
		vendorCreate(3, 'OPQ Solutions', 8642097531, 'UVW Bank', '101 Cedar Road', 'Unit 10', 'Metropolis', 'Countryland', 321987),
		vendorCreate(4, 'XYZ Enterprises', 1357924680, 'ABC Bank', '234 Maple Lane', 'Suite 15', 'Citytown', 'Countryland', 456789),
		vendorCreate(5, 'LMNOP Trading', 987654321, 'QRST Bank', '876 Birch Street', 'Room 12', 'Villageburg', 'Countryland', 159753),
		vendorCreate(6, 'UVW Solutions', 1239874560, 'XYZ Bank', '543 Elm Road', 'Suite 8', 'Citytown', 'Countryland', 357159),
		vendorCreate(7, 'RST Imports', 4563219870, 'LMN Bank', '789 Cedar Lane', 'Floor 3', 'Metropolis', 'Countryland', 654987),
		vendorCreate(8, 'GHI Exports', 7896541230, 'JKL Bank', '876 Pine Road', 'Unit 6', 'Villagetown', 'Countryland', 852369),
		vendorCreate(9, 'JKL Solutions', 1597534680, 'GHI Bank', '234 Oak Lane', 'Apt 7C', 'Cityville', 'Countryland', 456123),
		vendorCreate(10, 'MNO Enterprises', 3571592460, 'PQR Bank', '543 Birch Road', 'Room 20', 'Townburg', 'Countryland', 789456),
		vendorCreate(11, 'PQR Imports', 6543219870, 'MNO Bank', '789 Cedar Avenue', 'Suite 12', 'Metropolis', 'Countryland', 123789),
		vendorCreate(12, 'LMN Exports', 8529637410, 'GHI Bank', '101 Maple Road', 'Unit 5', 'Villageburg', 'Countryland', 369258,),
		vendorCreate(13, 'IJK Trading', 3692581470, 'NOP Bank', '876 Elm Avenue', 'Floor 8', 'Citytown', 'Countryland', 147852),
		vendorCreate(14, 'NOP Enterprises', 1472583690, 'IJK Bank', '234 Pine Lane', 'Apt 10B', 'Cityville', 'Countryland', 369147,),
		vendorCreate(15, 'EFG Exports', 2589631470, 'MNO Bank', '543 Cedar Road', 'Room 15', 'Metropolis', 'Countryland', 852369,),
		vendorCreate(16, 'RST Trading', 7418529630, 'NOP Bank', '789 Birch Avenue', 'Suite 18', 'Villageburg', 'Countryland', 963852,),
		vendorCreate(17, 'IJK Solutions', 9638527410, 'EFG Bank', '101 Oak Road', 'Unit 3', 'Citytown', 'Countryland', 147369),
		vendorCreate(18, 'GHI Trading', 3216549870, 'RST Bank', '876 Maple Lane', 'Apt 6C', 'Townburg','Countryland', 852147,),
		vendorCreate(19, 'QRS Solutions',6547893210, 'TUV Bank','789 Cedar Road', 'Suite 22','Metropolis','Countryland',987654),
	]);
}