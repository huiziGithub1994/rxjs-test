/**
 * 1、如果要在调试时忽略该脚本，请使用Blackbox脚本。黑盒子时，“调用堆栈”窗格中的脚本会被遮挡，
 *    当您单步执行代码时，您永远不会进入脚本的功能。
 * 
 * 2、我们还可以给 DOM 元素设置断点。因为我们有时候需要监听和查看某个元素的变化、赋值情况，
 *    但是并是不太关心哪一段代码对它做的修改，只想看看它的变化情况，那么可以给它来个监听事件
 *    DOM Breakpoints的类型：
 *      a、subtree modifications:子节点属性修改
 *      b、attribute modifications:自身属性修改
 *      c、node removal: 自身节点被删除
 */
import { imgCompress ,isOpenInPc} from "../utils/helper";

function onClick() {
  if(isOpenInPc()){
    document.querySelector('p.coverTip').textContent = "提示：请在移动端打开图片"
  }
  const cover = "file/201905/11/20190511154219099126464.png";
  const path = imgCompress(cover);
  const img = document.querySelector("img.cover");
  img.setAttribute("srs", path);
}

const button = document.querySelector("button.showImg");
button.addEventListener("click", onClick);
