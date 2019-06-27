/**
 * Exception 断点 :在抛出捕获或未捕获的异常的代码行上暂停。
 * 当我们想在某一行抛出caught or uncaught异常时进入断点，可以使用exception breakpoint。
 */

const url = 'https://open-test.shiguangkey.com/api/m/activity/courseGift/check'
fetch(url).then(function(response) {
    return response.json(); // parses response to JSON
  }).then(function(myJson) {
      const {status,msg} = myJson
    if(status === -1) throw msg 
  })