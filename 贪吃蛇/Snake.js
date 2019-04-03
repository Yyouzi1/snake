( function ( window ) {

    //随机生成颜色
    function getRandomColor (  ) {
        var arr = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e']
        var str = "#"
        for(var i = 0;i<6;i++){
            var num = Math.floor(Math.random()*16)
            str += arr[num];
        }
        return str
    }

    //1.这是写蛇的代码
    var list = []

    function Snake ( width, height, direction, bgColor, x, y ) {
        this.width = width || 20
        this.height = height || 20
        this.direction = direction || "right"
        this.body = [
            { x : 3, y : 1, bgColor : "green" },
            { x : 2, y : 1, bgColor : "yellow" },
            { x : 1, y : 1, bgColor : "pink" }
            ]
    }

    Snake.prototype.render = function ( map ) {
        //渲染新蛇之前,先清除老蛇div的位置
        reMove(map);
        //2.遍历蛇的身体,然后一节一节的显示出来
        for ( var i = 0 ; i < this.body.length; i ++ ) {
            //创建蛇的每个部位
            var div1 = document.createElement ('div')
            div1.style.position = "absolute"
            div1.style.left = this.body[ i ].x * this.width + "px"
            div1.style.top = this.body[ i ].y * this.height + "px"
            div1.style.width = this.width + 'px';
            div1.style.height = this.height + 'px';
            div1.style.backgroundColor = this.body[i].bgColor;
            //把这个div添加到地图map中。
            map.appendChild(div1);
            //生成蛇部位之后,将div存到数组中
            list.push(div1)
        }
    }
    //4.让蛇移动
    Snake.prototype.move = function ( food,map) {
        //除了蛇头之外的部位都移动
        //每一个蛇身体修改的坐标规则都一样,都是移动后的坐标等于他的上一节移动之前的坐标
        for(var i = this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        //单独移动蛇头
        switch (this.direction){
            case 'right':
                this.body[0].x++;
                break;
            case 'left':
                this.body[0].x--;
                break;
            case 'top':
                this.body[0].y--;
                break;
            case 'bottom':
                this.body[0].y++;
                break;
        }

        //获取蛇头的坐标
        var snakeHeadX = this.body[0].x * this.width;//蛇头的x坐标
        var snakeHeadY = this.body[0].y * this.height;//蛇头的y坐标
        //获取食物的坐标
        var FoodX = food.x;
        var FoodY = food.y;
        //获取蛇尾
        var snakeLastUnit = this.body[this.body.length-1]
        //判断是否吃到食物
        if (snakeHeadX == FoodX && snakeHeadY == FoodY){
            //长身体
            this.body.push({
                x:snakeLastUnit.x,
                y:snakeLastUnit.y,
                bgColor:getRandomColor()
            })
            //产生一个新的食物,调用食物对象的render方法,修改这个食物对象的xy坐标.
            food.render(map);
        }
    }

    //5.删除老蛇div
    function reMove ( map ) {
        //遍历数组,把存进数组list的老蛇从地图上清除
        for(var i = 0;i<list.length;i++){
            map.removeChild(list[i])
        }
        list.length=0;//清除数组
    }
    //3.把这个Snake构造函数给window
    window.Snake = Snake

} ( window ) )