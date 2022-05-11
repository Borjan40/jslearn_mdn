
// Прототипное наследование---https://learn.javascript.ru/prototype-inheritance----//
console.group('Прототипное наследование');
{
  let animal = {
    eats: true,
    walk() {
      return "Animal walk";
    }
  }
  let rabbit = {
    __proto__: animal
  }
  rabbit.walk = function () {
    return "Rabbit! Bounce-bounce!";
  }
  console.log(rabbit)
  console.log(rabbit.walk())
}

{
  // // методы animal
  let animal = {
    walk() {
      if (!this.isSleeping) {
        console.log(`I walk`);
      }
    },
    sleep() {
      this.isSleeping = true;
      console.log(this)
    }

  };

  let rabbit = {
    name: "White Rabbit",
    __proto__: animal
  };

  // модифицирует rabbit.isSleeping

  // rabbit.sleep()
  console.log(rabbit)
  animal.sleep()
  console.log(Object.keys(animal))

  console.log(rabbit.isSleeping); // true
  console.log(animal); // undefined (нет такого свойства в прототипе)
}

{
  let animal = {
    eats: true,
    eas: true
  };

  let rabbit = {
    jumps: true,
    jumpg: true,
    __proto__: animal
  };

  for (let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop);
    console.log(isOwn)
    if (isOwn) {
      console.log(`Our: ${prop}`); // Our: jumps
    } else {
      console.log(`Inherited: ${prop}`); // Inherited: eats
    }
  }
  console.groupEnd();
}

// F.prototype---https://learn.javascript.ru/function-prototype----//
console.group('F.prototype');
{
  let animal = {
    eats: true
  };

  function Rabbit(nam) {
    this.name = nam;
  }

  Rabbit.prototype = animal;
  let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
  Rabbit.prototype.jumps = true

  //-------в консоли будет одно и тоже------//
  console.log(Rabbit.prototype)
  console.log(rabbit.__proto__)
  console.log(animal)
  //-------в консоли будет одно и тоже------//

  console.log(rabbit)
  console.log(rabbit.constructor()); // true

}

{
  function Rabbit(name) {
    this.name = name;
    console.log(name);
  }

  let rabbit = new Rabbit("White Rabbit");
  let rabbit2 = new rabbit.constructor("Black Rabbit");
  console.log(Rabbit === rabbit.constructor)
}
console.groupEnd();

// Встроенные прототипы---https://learn.javascript.ru/native-prototypes----//
console.group('Встроенные прототипы Array.prototype Object.prototype Number.prototype и т.д.');
{
  let arr = [1, 2, 3];
  // наследует ли от Array.prototype?
  console.log(arr.__proto__ === Array.prototype); // true
  // затем наследует ли от Object.prototype?
  console.log(arr.__proto__.__proto__ === Object.prototype); // true
  // и null на вершине иерархии
  console.log(arr.__proto__.__proto__.__proto__); // null
  console.dir([arr])

  let obj = {
    0: "Hello",
    1: "world!",
    length: 2,
  };

  obj.jo = Array.prototype.join;
  console.log(obj)
  console.log(obj.jo(',')); // Hello,world!
}
console.groupEnd();

// Свойства - геттеры и сеттеры---https://learn.javascript.ru/property-accessors----//
console.group('геттеры и сеттеры');
{
  let user = {
    name: "John",
    surname: "Smith",

    get fullName() {
      return `${this.name} ${this.surname}`;
    },
    set fullName(value) {
      // console.log(value.split(" "))
      [this.name, this.surname] = ['Alice', 'Cooper'];
    }
  };
  user.fullName = "Alice Cooper";
  // user.a = `${user.name} ${user.surname}`
  console.log(user); // John Smith

  const str = 'The quick brown fox jumps over the lazy dog.';
  const strCopy = str.split(' ');
  console.log(strCopy);
}
console.groupEnd()

// ----Декораторы и переадресация вызова, call/apply--https://learn.javascript.ru/call-apply-decorators-//
console.group('Декораторы call/apply');
{
  function slow(x) {
    // здесь могут быть ресурсоёмкие вычисления
    console.log(`Called with ${x}`);
    return x;
  }

  function cachingDecorator(func) {
    let cache = new Map();
    console.log(cache)
    return function (x) {
      if (cache.has(x)) {    // если кеш содержит такой x,
        return cache.get(x); // читаем из него результат
      }

      let result = func(x); // иначе, вызываем функцию

      cache.set(x, result); // и кешируем (запоминаем) результат
      return result;
    };
  }

  slow = cachingDecorator(slow);

  console.log(slow(1)); // slow(1) кешируем
  console.log("Again: " + slow(1)); // возвращаем из кеша

  console.log(slow(2)); // slow(2) кешируем
  console.log("Again: " + slow(2)); // возвращаем из кеша
}
console.groupEnd();