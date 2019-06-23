class Person {
  constructor(name) {
    this.name = name;
    this.queue = [];
    this.walk();
  }

  walk() {
    const queue = _ => console.log(this.name, Date.now());
    this.queue.push(queue);
    Promise.resolve().then(this.run.bind(this));
  }

  async run() {
    console.log(this.queue);
    for (let queue of this.queue) {
      await queue();
    }
  }

  sleep(time) {
    const queue = _ => new Promise(resolve => setTimeout(resolve, time * 1000));
    this.queue.push(queue);
    return this;
  }

  eat(name) {
    const queue = _ => console.log(name, Date.now());
    this.queue.push(queue);
    return this;
  }

  sleepFirst(time) {
    const queue = _ => new Promise(resolve => setTimeout(resolve, time * 1000));
    this.queue.unshift(queue);
    return this;
  }
}

function People(name) {
  console.log("start", Date.now());
  return new Person(name);
}

People("冬然")
  .sleep(6)
  .eat("水果");
