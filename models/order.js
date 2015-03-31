var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }
});

var Product = mongoose.model('Product', ProductSchema);

var OrderSchema = new Schema({
  delivery_address: { type: String, required: true },
  status: {type: String, enum: ['New', 'Confirmed', 'Cancelled', 'Finished', 'Delivering']},
  created_at: { type: Date },
  updated_at: { type: Date },
  products: [Product]
});


OrderSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

var Order = mongoose.model('Order', OrderSchema);

productFixture= [
    {title: 'Core i5 2320 CPU', description:'4th generation Intel CPU', price: 21265},
    {title: 'Radeon R9 280x', description:'AMD Southern Islands GPU', price: 31700},
    {title: 'Hitachi 500GB', description:'Best HDD ever', price: 11530},
];


orderFixture= [
    {delivery_address: '23 St. Jeremy ave.', status:'New', products:[productFixture[0], productFixture[1]]},
    {delivery_address: '24 Hola str.', status:'New', products:[productFixture[2]]}
];

Order.remove({}, function(err) {
   console.log('Orders collection removed')
});

Order.collection.insert(orderFixture, onInsert);

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info('Orders were successfully loaded.');
    }
}

module.export = Product
module.exports = Order
