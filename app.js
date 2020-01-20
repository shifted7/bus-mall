'use strict'


var numProductsTotal = 20;

function Product(name, image){
    this.name = name;
    this.image = image;
    
    Product.allProducts.push(this);
}

Product.allProducts = [];

// Create all products
new Product('Star Wars Luggage Bag', '/img/bag.jpg');
new Product('Banana Slicer', '/img/banana.jpg');
new Product('Open-toe Rainboots', '/img/boots.jpg');
new Product('Bathroom Stand', '/img/bathroom.jpg');
new Product('Breakfast Maker', '/img/breakfast.jpg');
new Product('Meatball Bubblegum', '/img/bubblegum.jpg');
new Product('Curved Chair', '/img/chair.jpg');
new Product('Cthulhu Toy', '/img/cthulhu.jpg');
new Product('Dog Duck Mask', '/img/dog-duck.jpg');
new Product('Dragon Meat', '/img/dragon.jpg');
new Product('Utensil Pen', '/img/pen.jpg');
new Product('Pet Sweeper', '/img/pet-sweep.jpg');
new Product('Pizza Scissors', '/img/scissors.jpg');
new Product('Shark Sleeping Bag', '/img/shark.jpg');
new Product('Baby Sweeper', '/img/sweep.png');
new Product('Tauntaun Sleeping Bag', '/img/tauntaun.jpg');
new Product('Unicorn Meat', '/img/unicorn.jpg');
new Product('Tentacle USB Drive', '/img/usb.gif');
new Product('Twisted Watering Can', '/img/water-can.jpg');
new Product('Twisted Wine Glass', '/img/wine-glass.jpg');

console.log(Product.allProducts);

// // Dynamically add products
// function genProducts(){
//     var newProduct = {};
//     for (i=0; i<numProductsTotal; i++) {
//         // Product(name, image)
//         newProduct = new Product(filenames[i], imagepaths[i]);
//     }
// }