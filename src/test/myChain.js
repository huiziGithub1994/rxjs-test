class People {
  constructor(name) {
    this.name = name;
    this.tasks = [() => console.log("我是" + name)];
    Promise.resolve().then(() => {
      console.log("00");
      // for (let task of this.task) {
      //   console.log(task);
      //   await task();
      // }
      // this.tasks.reduce(function(pro, cur) {
      //   return pro.then(() => cur());
      // }, Promise.resolve());
    });
  }
  eat(fruit) {
    this.tasks.push(() => console.log("吃" + fruit));
    return this;
  }

  delay(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("wait" + time + "秒");
        resolve();
      }, time * 1000);
    });
  }
  sleep(time) {
    this.tasks.push(() => this.delay(time));
    return this;
  }

  sleepFirst(time) {
    this.tasks.unshift(() => this.delay(time));
    return this;
  }
}
const dongran = new People("冬然");

dongran
  .sleep(3)
  .eat("香蕉")
  .sleepFirst(2);
