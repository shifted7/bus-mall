'use strict'


// var numProductsTotal = 20;
var productsSection = document.getElementById('productImages');
var productsShown = [];
var productsHistory = [];
var numProductsShown = 3;
var roundsNoRepeats = 2;
var productAElement = document.getElementById('productA');
var productBElement = document.getElementById('productB');
var productCElement = document.getElementById('productC');

var productAIndex = null;
var productBIndex = null;
var productCIndex = null;

var reportList = document.getElementById('reportList');

var productChoiceCount = 0;
var choicesTotal = 25;


function Product(name, image){
    this.name = name;
    this.image = image;
    this.clicks = 0;
    this.views = 0;
    Product.allProducts.push(this);
}

function generateNewProductIndexes() {
    var sameProducts = false;
    var newProductAIndex = null;
    var newProductBIndex = null;
    var newProductCIndex = null;
    do {
        newProductAIndex = randomProductIndex();
        newProductBIndex = randomProductIndex();
        newProductCIndex = randomProductIndex();
        if (newProductAIndex === newProductBIndex) {
            sameProducts = true;
        } else if (newProductAIndex === newProductCIndex) {
            sameProducts = true;
        } else if (newProductBIndex === newProductCIndex) {
            sameProducts = true;
        } else {
            if(
                checkProductHistory(Product.allProducts[newProductAIndex].name) 
                || checkProductHistory(Product.allProducts[newProductBIndex].name) 
                || checkProductHistory(Product.allProducts[newProductCIndex].name)
            ){
                sameProducts = true;
            } else {
                sameProducts = false;
            }
        }
    } while (sameProducts)
    return [newProductAIndex, newProductBIndex, newProductCIndex];
}

function randomProductIndex() {
    // inclusive of 0, exclusive of array length
    var randomInt = Math.floor(Math.random()*Product.allProducts.length);
    return randomInt;
}

function checkProductMatch(product, roundData) {
    var result = false;
    for (var i = 0; i < roundData.length; i++) {
        if (product.name === roundData[i].name) {
            result = true;
            break;
        }
    }
    return result;
}

function checkProductHistory(name) {
    var result = false;
    var historyIndex = productsHistory.length - 1; // Counts backwards from end to get most recent items in the history array
    while (historyIndex >= productsHistory.length - 1 - roundsNoRepeats && historyIndex >= 0) {
        if (productsHistory[historyIndex].includes(name)){
            result = true;
            break;
        }
        historyIndex--;
    }
    return result;
}

function renderProducts() {
    var newProductIndexes = generateNewProductIndexes();
    productAIndex = newProductIndexes[0];
    productBIndex = newProductIndexes[1];
    productCIndex = newProductIndexes[2];

    productsHistory.push([Product.allProducts[productAIndex].name, Product.allProducts[productBIndex].name, Product.allProducts[productCIndex].name]);

    productAElement.src = Product.allProducts[productAIndex].image;
    productBElement.src = Product.allProducts[productBIndex].image;
    productCElement.src = Product.allProducts[productCIndex].image;
    
    Product.allProducts[productAIndex].views ++;
    Product.allProducts[productBIndex].views ++;
    Product.allProducts[productCIndex].views ++;

}

var handleClickOnProduct = function(event){
    var productClickedID = event.target.id;
    var validClick = false;
    switch(productClickedID) {
        case 'productA':
            validClick = true;
            productChoiceCount ++;
            Product.allProducts[productAIndex].clicks ++;
            break;
        case 'productB':
            validClick = true;
            productChoiceCount ++;
            Product.allProducts[productBIndex].clicks ++;
            break;
        case 'productC':
            validClick = true;
            productChoiceCount ++;
            Product.allProducts[productCIndex].clicks ++;
            break;
        default:
    }
    if (validClick) {
        if (productChoiceCount >= choicesTotal) {
            productsSection.removeEventListener('click', handleClickOnProduct)
            reportProductResults(reportList);
        } else {
            renderProducts();
        }
    }
}

function reportProductResults(parentElement) {
    var name = '';
    var clicks = 0;
    var views = 0;
    for (var i=0;i < Product.allProducts.length; i++){
        var productLI = document.createElement('li');
        name = Product.allProducts[i].name;
        clicks = Product.allProducts[i].clicks;
        views = Product.allProducts[i].views;
        productLI.textContent = `${name} was chosen ${clicks} times out of ${views} times it was shown.`
        parentElement.appendChild(productLI);
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


renderProducts();

// Event listener
productsSection.addEventListener('click', handleClickOnProduct)
