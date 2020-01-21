'use strict'


// var numProductsTotal = 20;
var productImages = document.getElementById('productImages');
var productA = document.getElementById('productA');
var productB = document.getElementById('productB');
var productC = document.getElementById('productC');

var productAIndex = null;
var productBIndex = null;
var productCIndex = null;

var productChoiceCount = 0;
var choicesTotal = 5;


function Product(name, image){
    this.name = name;
    this.image = image;
    this.clicks = 0;
    this.views = 0;
    Product.allProducts.push(this);
}


function randomProduct() {
    // inclusive of 0, exclusive of array length
    var randomInt = Math.floor(Math.random()*Product.allProducts.length);
    return randomInt;
}


function renderProducts() {
    var sameProducts = false;
    do {
        productAIndex = randomProduct();
        productBIndex = randomProduct();
        productCIndex = randomProduct();
        if (productAIndex === productBIndex) {
            sameProducts = true;
        } else if (productAIndex === productCIndex) {
            sameProducts = true;
        } else if (productBIndex === productCIndex) {
            sameProducts = true;
        } else {
            sameProducts = false;
        }

    } while(sameProducts)
    
    productA.src = Product.allProducts[productAIndex].image;
    productB.src = Product.allProducts[productBIndex].image;
    productC.src = Product.allProducts[productCIndex].image;
    
    Product.allProducts[productAIndex].views ++;
    Product.allProducts[productBIndex].views ++;
    Product.allProducts[productCIndex].views ++;
    console.log(`${Product.allProducts[productAIndex].name}, ${Product.allProducts[productBIndex].name}, and ${Product.allProducts[productCIndex].name} shown.`);
}


var handleClickOnProduct = function(event){
    var productClicked = event.target.id;
    var validClick = false;
    switch(productClicked) {
        case 'productA':
            validClick = true;
            productChoiceCount ++;
            Product.allProducts[productAIndex].clicks ++;
            console.log(`${Product.allProducts[productAIndex].name} selected, and has been chosen  ${Product.allProducts[productAIndex].clicks}/${Product.allProducts[productAIndex].views} times.`);
            break;
        case 'productB':
            validClick = true;
            productChoiceCount ++;
            Product.allProducts[productBIndex].clicks ++;
            console.log(`${Product.allProducts[productBIndex].name} selected, and has been chosen  ${Product.allProducts[productBIndex].clicks}/${Product.allProducts[productBIndex].views} times.`);
            break;
        case 'productC':
            validClick = true;
            productChoiceCount ++;
            Product.allProducts[productCIndex].clicks ++;
            console.log(`${Product.allProducts[productCIndex].name} selected, and has been chosen  ${Product.allProducts[productCIndex].clicks}/${Product.allProducts[productCIndex].views} times.`);
            break;
        default:
    }
    if (validClick) {
        renderProducts();
    }
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


// // Dynamically add products
// function genProducts(){
//     var newProduct = {};
//     for (i=0; i<numProductsTotal; i++) {
//         // Product(name, image)
//         newProduct = new Product(filenames[i], imagepaths[i]);
//     }
// }

renderProducts();

// Event listener
productImages.addEventListener('click', handleClickOnProduct)