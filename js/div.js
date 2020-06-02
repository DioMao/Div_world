/**
 * 世界上有div就足够了
 * 让全世界充满div
 * @author DioMao
 */

const __element_map = ['a', 'button', 'input'];
// 方法集合
const __element_func = {
    // 模拟a标签(功能待完善)
    a: function (__this_div) {
        __this_div.addEventListener("click", function (e) {
            let __this_href = __this_div.getAttribute("href") || "#";
            let __this_target = __this_div.getAttribute("target") || "_self";
            switch (__this_target) {
                case "_blank":
                    window.open(__this_href);
                    break;
                case "_top":
                default:
                    window.location.href = __this_href;
                    break;
            }
            console.log(__this_href + ' ' + __this_target);
            // alert("测试：我是第" + (index+1) + "个div");
        })
    },
    // button(待完善)
    button: function (__this_div) {
        // console.log('button' + index)
        // let __this_div = _div[index];
        __this_div.addEventListener("mousedown", function (e) {
            __this_div.style.borderStyle = "inset";
        })
        __this_div.addEventListener("mouseup", function (e) {
            __this_div.style.borderStyle = "outset";
        })
        __this_div.addEventListener("mouseleave", function (e) {
            __this_div.style.borderStyle = "outset";
        })
    },
    // input(待完善)
    input: function (__this_div) {
        __input_type = __this_div.getAttribute("type");
        switch (__input_type) {

            case "text":
            default:
                // 替换class名
                __removeClass(__this_div, "input");
                __this_div.className += "input-text";
                // div内容设置为可编辑
                __this_div.setAttribute("contenteditable", "true");
                let __input_maxlength = __this_div.getAttribute("maxlenth");
                if(__input_maxlength != null){
                    __input_maxlength = parseInt(__input_maxlength);
                    __this_div.addEventListener("keydown",function(e){
                        let ev = e || window.event;
                        console.log("run")
                        if(ev.target.innerText.length > __input_maxlength && ev.keyCode !== 8 && ev.keyCode !== 116){
                            ev.preventDefault();
                        }
                    });
                    __this_div.addEventListener("input",function(e){
                        console.log('run')
                        let ev = e || window.event;
                        if(ev.target.innerText.length > __input_maxlength){
                            setTimeout(function(){
                                ev.target.innerText = ev.target.innerText.substring(0, 20);
                                keepLastIndex(ev.target);
                            },0)
                        }
                        if(ev.target.innerText.length > __input_maxlength && ev.keyCode !== 8 && ev.keyCode !== 116) {
                            ev.preventDefault();
                          }
                    })
                }
                break;
        }
    }
}

window.onload = function () {
    __div__world();
}

var _div = document.getElementsByTagName("div");

/**
 * 将div对应绑定事件
 * class名只有最靠前的有效class一个生效
 * 例如使用class = "a input"时只绑定a标签事件
 */
function __div__world() {
    for (let index = 0; index < _div.length; index++) {
        // 获取div的class名，整理到数组中
        let __class = _div[index].getAttribute("class");
        let __class_list = __class.split(' ');
        for (let class_name of __class_list) {
            if (__element_map.indexOf(class_name) != -1) {
                let __this_div = _div[index];
                __element_func[class_name](__this_div);
                break;
            }
        }
    }
}

/**
 * 扩展-移除指定class名
 * @param {object} obj 对象
 * @param {string} classname 要移除的class名
 */
function __removeClass(obj, classname) {
    if (obj.className != "") {
        let arrClassName = obj.className.split(' ');
        let _index = arrClassName.indexOf(classname);
        if (_index != -1) {
            arrClassName.splice(_index, 1);
            obj.className = arrClassName.join(" ");
        }
    }
}