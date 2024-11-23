// 购物车相关函数
let cartItems = [];

// 创建XMLHttpRequest对象（现代浏览器也可使用fetch API，这里先以XHR为例）
const xhr = new XMLHttpRequest();

function addToCart(productName) {
    cartItems.push(productName);

    // 准备要发送到服务器的数据
    const data = { productName };

    // 配置XHR请求
    xhr.open('POST', 'http://localhost:3000/addToCart', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // 绑定请求完成的回调函数
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            updateCart();
        } else {
            console.error('加入购物车失败');
        }
    };

    // 发送数据到服务器
    xhr.send(JSON.stringify(data));
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    let totalPrice = 0;
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItemsList.appendChild(li);
        // 这里假设每种产品价格都是固定的，实际可根据产品数据来计算
        if (item === '玫瑰捧花') {
            totalPrice += 20;
        } else if (item === '百合插花') {
            totalPrice += 15;
        }
    });
    document.getElementById('total-price').textContent = `总价：$${totalPrice}`;
    document.getElementById('cart-section').style.display = 'block';
    document.getElementById('cart-section').classList.add('show');

    // 获取服务器端购物车数据更新本地显示（可按需添加，比如实时更新总价等情况）
    getCartDataFromServer();
}

function getCartDataFromServer() {
    // 配置XHR请求获取购物车数据
    xhr.open('GET', 'http://localhost:3000/getCartData', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const serverCartData = JSON.parse(xhr.responseText);
            cartItems = serverCartData;
            updateCart();
        } else {
            console.error('获取购物车数据失败');
        }
    };
    xhr.send();
}

function checkout() {
    // 这里可以添加实际的结算逻辑，比如发送订单信息到服务器等
    alert('感谢您的购买！订单已提交，我们会尽快处理。');
    cartItems = [];
    updateCart();
}