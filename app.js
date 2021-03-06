'use strict'

// Initializes variables for html elements, history data, and parameters for number of total choices and rounds without repeating a product
var productsSection = document.getElementById('productImages');
var productsHistory = [];
var roundsNoRepeats = 2;

var productAElement = document.getElementById('productA');
var productBElement = document.getElementById('productB');
var productCElement = document.getElementById('productC');

var productAIndex = null;
var productBIndex = null;
var productCIndex = null;

var context = document.getElementById('myCanvas').getContext('2d');
var reportList = document.getElementById('reportList');

var productChoiceCount = 0;
var choicesTotal = 25;

// Constructor function for new products
function Product(name, image){
    this.name = name;
    this.image = image;
    this.clicks = 0;
    this.views = 0;
    Product.allProducts.push(this);
}

// Randomly selects three non-matching products that have not appeared in the history index within a certain number of rounds
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

// Write to localStorage
function updateStoredProductData(){
    var allProductsString = JSON.stringify(Product.allProducts);
    localStorage.setItem('productData',allProductsString);
}

// Read from localStorage
function getStoredProductData(){
    var dataString = localStorage.getItem('productData');
    if (dataString) {
        var data = JSON.parse(dataString);
        for (var objectIndex = 0; objectIndex < data.length; objectIndex++) {
            Product.allProducts[objectIndex].clicks += data[objectIndex].clicks;
            Product.allProducts[objectIndex].views += data[objectIndex].views;
        }
    }
    renderProducts();
}

// Show images for new products, add new products to history, and register that the new products have been viewed
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
    
    // Check the location of the click within the form
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
        // Check if maximum number of choices has been reached, and report results if so
        if (productChoiceCount >= choicesTotal) {
            productsSection.removeEventListener('click', handleClickOnProduct)
            createChart();
            reportProductResults(reportList);
        } else {
            renderProducts();
        }
        updateStoredProductData();
    }
}

function createChart(){
    var productNameLabels = getProductNames();
    var productClickData = getProductClicks();
    var productViewData = getProductViews();
    var chart = new Chart(context, {
        type: 'bar',
        data: {
            labels: productNameLabels,
            datasets: [{
                label: '# of Clicks',
                data: productClickData,
                backgroundColor: 'red'
            }, {
                label: '# of Views',
                data: productViewData,
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1
            }]
        }
    })
}

function getProductNames(){
    var names = [];
    for (var i = 0; i < Product.allProducts.length; i++){
        names.push(Product.allProducts[i].name);
    }
    return names;
}    

function getProductClicks(){
    var clicks = [];
    for (var i = 0; i < Product.allProducts.length; i++){
        clicks.push(Product.allProducts[i].clicks);
    }
    return clicks;
}

function getProductViews(){
    var views = [];
    for (var i = 0; i < Product.allProducts.length; i++){
        views.push(Product.allProducts[i].views);
    }
    return views;
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
// Initialize all products
new Product('Star Wars Luggage Bag', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Open-toe Rainboots', 'img/boots.jpg');
new Product('Bathroom Stand', 'img/bathroom.jpg');
new Product('Breakfast Maker', 'img/breakfast.jpg');
new Product('Meatball Bubblegum', 'img/bubblegum.jpg');
new Product('Curved Chair', 'img/chair.jpg');
new Product('Cthulhu Toy', 'img/cthulhu.jpg');
new Product('Dog Duck Mask', 'img/dog-duck.jpg');
new Product('Dragon Meat', 'img/dragon.jpg');
new Product('Utensil Pen', 'img/pen.jpg');
new Product('Pet Sweeper', 'img/pet-sweep.jpg');
new Product('Pizza Scissors', 'img/scissors.jpg');
new Product('Shark Sleeping Bag', 'img/shark.jpg');
new Product('Baby Sweeper', 'img/sweep.png');
new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new Product('Unicorn Meat', 'img/unicorn.jpg');
new Product('Tentacle USB Drive', 'img/usb.gif');
new Product('Twisted Watering Can', 'img/water-can.jpg');
new Product('Twisted Wine Glass', 'img/wine-glass.jpg');

getStoredProductData();

// Event listener
productsSection.addEventListener('click', handleClickOnProduct)
