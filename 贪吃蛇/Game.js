//这个js文件写 所有 关于 游戏逻辑的代码
( function ( window ) {
    var that = null//先声明一个全局变量
    //1.创建游戏控制器中对象的构造函数
    function Game ( map ) {
        //游戏控制器中 应该有蛇 食物 还有地图
        this.snake = new Snake ()//创建蛇
        this.food = new Food ()//创建食物
        this.map = map//获取地图

        that = this//利用that来赋值this的值
    }

    //2.给游戏设置一个开始游戏的方法
    Game.prototype.start = function () {
        //2.1 显示蛇
        this.snake.render ( this.map )//调用之前的方法,把蛇显示出来
        //2.2 显示食物
        this.food.render ( this.map )//调用之前的方法,把食物显示出来
        //2.3让蛇循环动起来
        SnakeAutoMove ()
        //2.3修改蛇头的方向
        bindKey ()
    }

    //4.创建一个定时器,让蛇匀速动起来
    /* 当this取不到的时候,默认为undefined,此时需要创建一个新的变量that来赋值,修改函数中this 的指向.*/
    function SnakeAutoMove () {
        var timeID =setInterval ( function () {
            //2.3让蛇移动; 调用这个方法
            this.snake.move (this.food,this.map)

            //2.5判断蛇头的位置有没有超出地图的边界
            var snakeHeadX = this.snake.body[0].x * this.snake.width;//蛇头的x坐标
            var snakeHeadY = this.snake.body[0].y * this.snake.height;//蛇头的y坐标
            if (snakeHeadX <0 || snakeHeadY < 0 || snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight) {//此时说明已经出了边界了
                alert("game over!")
                clearInterval(timeID);//清除定时器
                return;
            }

            //2.4重新显示蛇的位置
            this.snake.render (this.map )

        }.bind ( that ), 100 )//修改函数中this 的指向.
    }


    //5.创建一个函数获取按下的键决定移动方向
    function bindKey () {
        document.onkeydown = function ( e ) {
            e = e || window.event
            // console.log ( e.keyCode ); left 37 top 38 right 39 bottom 40
            switch ( e.keyCode ) {
                case 37:
                    if ( this.snake.direction !== "right" ) {//判断此时的方向是不是反方向,防止掉头穿透自己
                        this.snake.direction = "left"
                    }
                    break;
                case 38:
                    if ( this.snake.direction !== "bottom" ) {
                        this.snake.direction = "top"
                    }
                    break
                case 39:
                    if ( this.snake.direction !== "left" ) {
                        this.snake.direction = "right"
                    }
                    break
                case 40:
                    if ( this.snake.direction !== "top" ) {
                        this.snake.direction = "bottom"
                    }
                    break
            }
        }.bind(that);//修改函数中this 的指向.
    }

    //3.把这个Game构造函数给window
    window.Game = Game
} ( window ) )