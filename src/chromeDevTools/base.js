/**
 * Exception 断点 :在抛出捕获或未捕获的异常的代码行上暂停。
 */

// 点击按钮
function onClick() {
  // 检查输入框中的值是否为空
  if (inputsAreEmpty()) {
    label.textContent = "错误: 输入框中的值为空.";
    return;
  }
  // throw "error";
  // 计算相加的结果，并更新DOM
  updateLabel();
}

// 检查输入框中的值是否为空
function inputsAreEmpty() {
  if (getNumber1() === "" || getNumber2() === "") {
    return true;
  } else {
    return false;
  }
}

// 计算相加的结果，并更新DOM
function updateLabel() {
  var addend1 = getNumber1();
  var addend2 = getNumber2();
  var sum = addend1 + addend2;
  label.textContent = addend1 + " + " + addend2 + " = " + sum;
}

// 获取第一个输入框中的值
function getNumber1() {
  return inputs[0].value;
}
// 获取第二个输入框中的值
function getNumber2() {
  return inputs[1].value;
}

var inputs = document.querySelectorAll("input");
var label = document.querySelector("p.addResult");
var button = document.querySelector("button.add");
button.addEventListener("click", onClick);
