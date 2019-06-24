import moment from 'moment'
/**
 * 如果要在调试时忽略该脚本，请使用Blackbox脚本。黑盒子时，“调用堆栈”窗格中的脚本会被遮挡，当您单步执行代码时，您永远不会进入脚本的功能。
 */
import {imgCompress} from '../utils/helper'


function onClick(){
    const cover = 'file/201905/11/20190511154219099126464.png';
    const path = imgCompress(cover)
    document.querySelector('img.cover').setAttribute('src',path)
}
const button = document.querySelector("button.showImg");
button.addEventListener("click", onClick);
