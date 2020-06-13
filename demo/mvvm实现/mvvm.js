function Vue(options = {}) {
    this.$options = options;//将所有属性都挂载在$options上
    let data = this._data = this.$options.data;
    observe(data);
    // this 代理了 this._data
    for (let key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        })
    }
    new Compile(options.el, this);
}

function Compile(el, vm) {
    // el表示替换掉范围
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    replace(fragment);
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(function (node) {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if (node.nodeType === 3 && reg.test(text)) {
                console.log(RegExp.$1);
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(function (k) {
                    val = val[k];
                })
                new Watcher(vm, RegExp.$1, function (newVal) {
                    node.textContent = text.replace(reg, newVal)
                })
                // 替换逻辑
                node.textContent = text.replace(reg, val)
            }
            if (node.nodeType === 1) {
                // 元素节点
                let nodeAttrs = node.attributes;//获取当前dom节点的属性
                Array.from(nodeAttrs).forEach(function (attr) {
                    let name = attr.name;
                    let exp = attr.value;
                    if (name.indexOf('v-model') === 0) {
                        node.value = vm[exp];
                    }
                    new Watcher(vm,exp,function (newVal) {
                        node.value = newVal;
                    });
                    node.addEventListener('input',function (e) {
                        let newVal = e.target.value;
                        vm[exp] = newVal;
                    })
                })
            }
            if (node.childNodes) {
                replace(node);
            }
        })
    }
    vm.$el.appendChild(fragment);
}

// 观察对象给对象增加ObjectDefineProperty
function Observe(data) {     //主要逻辑
    let dep = new Dep();
    for (let key in data) {   //把data属性通过Object.defineProperty()的方式 定义属性
        let val = data[key];
        observe(val);
        Object.defineProperty(data, key, {
            enumerabl: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return val;
            },
            set(newVal) {     //更改值的时候
                if (newVal === val) return;
                val = newVal;
                observe(newVal);
                dep.notify(); //让所有的watcher的update执行
            }
        })
    }
}

function observe(data) {
    if (!data || typeof (data) !== 'object') return;
    return new Observe(data)
}

function Dep() {
    this.subs = [];
}
Dep.prototype.addSub = function (sub) {   //订阅
    this.subs.push(sub);
}
Dep.prototype.notify = function () {
    this.subs.forEach(sub => sub.update());
}

// watcher
function Watcher(vm, exp, fn) {   //Watcher是一个类 通过这个类创建的实例都拥有update方法
    this.vm = vm;
    this.exp = exp;
    this.fn = fn;
    Dep.target = this;
    let val = vm;
    let arr = exp.split('.');
    arr.forEach(function (k) {
        val = val[k];
    })
    Dep.target = null;
}
Watcher.prototype.update = function () {
    let val = this.vm;
    let arr = this.exp.split('.');
    arr.forEach(function (k) {
        val = val[k];
    })
    this.fn(val);
}