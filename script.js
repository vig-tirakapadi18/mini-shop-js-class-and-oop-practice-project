class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // price;
  // description;

  constructor(title, url, price, desc) {
    this.title = title;
    this.imageUrl = url;
    this.price = price;
    this.description = desc;
  }
}

class ElementAttribute {
  constructor(attrName, attrVal) {
    this.name = attrName;
    this.val = attrVal;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.val);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  constructor(renderHookId) {
    super(renderHookId);
  }

  set cartItems(val) {
    this.items = val;
    this.totalOutput.innerHTML = `<h2>Total: Rs ${this.totalAmount.toFixed(2)}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, curEl) => prevValue + curEl.price, 0);
    return sum;
  }

  addItem(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }
  // orderItemHandler = () => { }
  orderItemHandler() {
    console.log('Ordering...');
    console.log(this.items)
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: Rs ${0}</h2>
      <button>Order Now!</button>
    `;
    this.totalOutput = cartEl.querySelector('h2');
    const orderBtn = cartEl.querySelector('button');
    // orderBtn.addEventListener('click', () => { this.orderItemHandler() })
    orderBtn.addEventListener('click', this.orderItemHandler.bind(this))
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item')
    prodEl.innerHTML = `
      <div>
        <img
          src="${this.product.imageUrl}"
          alt="${this.product.title}" />
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>Rs ${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      `;
    const addToCartBtn = prodEl.querySelector('button');
    addToCartBtn.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductsList extends Component {
  products = [
    new Product('Meditations', 'https://media.istockphoto.com/id/496681938/photo/monument-for-marcus-aurelius.jpg?b=1&s=170667a&w=0&k=20&c=s8vSpdRrLTwDBz0iH-41jednAJuc0NZMH-E48mV8Kwg=', 149, 'Book by Marcus Aurelius'),
    new Product('The Everyday Hero Menifesto', 'https://cdn.shopify.com/s/files/1/1192/7528/files/61IXoy5p-_S_480x480.jpg?v=1626433803', 349, 'Book by Robin Sharma')
  ]

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    const prodList = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);

    for (const prod of this.products) {
      const productItem = new ProductItem(prod, 'prod-list');
      productItem.render();
    }
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart('app');
    this.cart.render();

    const productList = new ProductsList('app');
    productList.render();
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addItem(product);
  }
}

App.init();

// Classes Assignment
class Course {
  #price;

  get price() {
    return 'Rs' + this.#price;
  }

  set price(val) {
    if (val < 0) {
      throw 'Invalid value!'
    }
    this.#price = val;
  }

  constructor(title, length, price) {
    this.title = title;
    this.duration = length;
    this.price = price;
  }

  calculateLengthPrice() {
    return this.duration / this.#price;
  }

  summaryObj() {
    const summary = {
      title: this.title,
      duration: this.duration,
      price: this.price
    };
    console.log(summary);
  }
}

const course1 = new Course('React', 25, 199);
const course2 = new Course('JavaScript', 48, 599);
console.log(course1);
console.log(course2);

console.log(course1.calculateLengthPrice());
console.log(course1.summaryObj());
console.log(course2.calculateLengthPrice());
console.log(course2.summaryObj());

class PracticalCourse extends Course {
  constructor(title, length, price, exercises) {
    super(title, length, price);
    this.numOfExercises = exercises;
  }
}

const course3 = new PracticalCourse('React', 56, 355, 24);
console.log(course3);

class TheoreticalCourse extends Course {
  publish() {
    console.log('Publishing...');
  }
}

const course4 = new TheoreticalCourse('NodeJs', 36, 499);
course4.publish();
course4.summaryObj();