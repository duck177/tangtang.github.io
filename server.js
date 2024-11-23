const express = require('express');
const body-parser = require('body-parser');

const app = express();
const port = 3000;

// 解析JSON格式的请求体
app.use(body-parser.json());

// 模拟存储购物车数据的数组（实际应用中可连接数据库来存储）
let cartData = [];

// 接收购物车数据的路由
app.post('/addToCart', (req, res) => {
    const { productName } = req.body;
    cartData.push(productName);
    res.send('商品已成功加入购物车');
});

// 获取购物车数据的路由
app.get('/getCartData', (req, res) => {
    res.json(cartData);
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});