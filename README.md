## vue使用

#### 下载并引入vue.js文件
```
<script src="./lib/vue.min.js"></script>
```
#### 新建vm对象	
```
<div id="app"></div>
<script>
    var vm = new Vue({
        el:"#app",
        data:{},
        methods:{}
    })
 </script>
```
#### 自定义全局过滤器

```
<td>{{item.time | dateFormat()}}</td>
Vue.filter("dateFormat",function(dateStr,pattern=""){}
```

#### 自定义私人过滤器

```
var vm2 = new Vue({
    el: "#app2",
    data: {},
    methods: {},
    // 私人过滤器
    filters: {
        dateFormat: function (dateStr, pattern = "") {
        }
    }
})
```

#### 自定义按键修饰符

```
@keyup.f2="add"
Vue.config.keyCodes.f2 = 113;
```

#### 自定义全局指令

```
// 自定义全局指令
Vue.directive('focus', {
    bind: function (el) { // 指令绑定到元素上时
     },
    inserted: function (el,binding) { // 元素插入到DOM时
        el.focus();
        console.log(binding);
    },
    update: function (el) { //VNode更新时
    },
    componentUpdated: function () { },
    unbind: function () { }
})
```

#### 自定义私有指令

```
var vm2 = new Vue({
    el: "#app2",
    data: {
        time: new Date(),
        styleobj: { 'color': 'red', 'font-style': 'italic', 'font-size': "20px" },
    },
    methods: {},
    // 私人过滤器
    filters: {
    },
    // 私有指令
    directives: {
        "fontsize":{
            bind: function(el,binding){
                el.style.fontSize = parseInt(binding.value)+"px";
            }
        },
        "color": function (el, binding) {
            console.log(binding);
            el.style.color = binding.value;
        }
    }
})
```

#### 生命周期函数

```
var vm2 = new Vue({
    el: "#app2",
    data: {},
    methods: {},
    beforeCreate(){},//data和methods中数据还未初始化
    created(){},//data和methods中数据已初始化
    beforeMount(){},//模板已在内存中编译好，还未挂载到页面上
    mounted(){},//模板已挂载到页面上
    beforeUpdate(){},//data数据已更新，页面数据还未更新
   updated(){},//data数据和页面数据都已更新
   beforeDestory(){},//进入销毁状态，数据还未销毁
   destoryed(){}//数据已销毁
})
```

#### 创建组件

```
<div id="app">
    <mycom1></mycom1>
    <mycom2></mycom2>
    <mycom3></mycom3>
    <mycom4></mycom4>
</div>
<template id="temp">
    <h3>这是创建的第四个组件</h3>
</template>


<script>
    var com1 = Vue.extend({
        template: "<h3>创建组件的第一个组件</h3>"
    })
    Vue.component("mycom1", com1);


    Vue.component("mycom2", Vue.extend({
        template:"<h3>创建组件的第二个组件</h3>"
    }));
    
    Vue.component("mycom3", {
        template:"<h3>创建组件的第三个组件</h3>"
    });
    
    Vue.component("mycom4",{
        template:"#temp"
    })
    
    //创建Vue实例,得到 ViewModel
    var vm = new Vue({
        el: '#app',
        data: {},
        methods: {}
    });

</script>
```



