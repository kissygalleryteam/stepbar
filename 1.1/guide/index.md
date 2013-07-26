## 综述

stepbar是步骤条组件，支持多种颜色，无图片实现。

作者：明河

## 快速使用

### HTML

    <ol id="steps-demo-1">
        <li>1. 加入购物车</li>
        <li>2. 确认订单信息</li>
        <li>3. 付款到支付宝</li>
        <li>4. 确认收货</li>
        <li>5. 评价</li>
    </ol>

### 初始化组件

    S.use('gallery/stepbar/1.1/index', function (S, Stepbar) {
        var step1 = new Stepbar('#steps-demo-1');
        step1.render();
        //激活第二个步骤
        step1.set('act',2);
    })


