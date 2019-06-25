// 获取验证码
fetch("http://47.107.255.128:8089/zxx/visitor/picture/createValidateCode")
  .then(function(response) {
    return response.json(); // parses response to JSON
  })
  .then(function(myJson) {
    const {url} = myJson
    document.querySelector("img.code").setAttribute("src",url);
  });
