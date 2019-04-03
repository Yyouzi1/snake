(function  ( window ) {
    //这是写食物的代码
    var list = []
    //1.小方块有宽高,有背景色,有坐标,是一个对象
    function Food ( width,height,bgColor,x,y ) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || 'green';
        this.x = x || 0;
        this.y = y || 0;
    }

    //2.要把事物显示在地图上,把食物对象显示在地图上可以封装成一个函数
    Food.prototype.render = function (map) {
        //渲染新食物之前,要清除老食物
        remove(map);
        //2.1 随机一个xy坐标.
        this.x = Math.floor ( Math.random () * map.offsetWidth / this.width ) * this.width;
        this.y = Math.floor ( Math.random () * map.offsetHeight / this.height ) * this.height;
        //2.2新建一个div
        var div1 = document.createElement ( 'div' );
        div1.style.position = 'absolute';
        div1.style.left = this.x + 'px';
        div1.style.top = this.y + "px";
        div1.style.width = this.width + 'px';
        div1.style.height = this.height + 'px';
        div1.style.backgroundColor = this.bgColor;
        //2.3把这个div添加到地图上
        map.appendChild ( div1 );
        //2.4将这个食物存起来
        list.push(div1)
    }
    //删除老食物div的方法
    function remove ( map ) {
        //遍历数组,删除数组中的div
        for(var i = 0;i<list.length;i++){
            map.removeChild(list[i])
        }
        //数组长度要清空为0
        list.length = 0;
    }
    

    //3.把Food方法暴露给window对象
    window.Food = Food;
}(window));