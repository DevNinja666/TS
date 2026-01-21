type AnyFunction = (this: any, ...args: any[]) => any;

interface Function {
  myBind<
    TThis,
    TArgs extends any[],
    TBoundArgs extends any[],
    TReturn
  >(
    this: (this: TThis, ...args: [...TBoundArgs, ...TArgs]) => TReturn,
    thisArg: TThis,
    ...boundArgs: TBoundArgs
  ): (...args: TArgs) => TReturn;
}

Function.prototype.myBind = function <
  TThis,
  TArgs extends any[],
  TBoundArgs extends any[],
  TReturn
>(
  this: (this: TThis, ...args: [...TBoundArgs, ...TArgs]) => TReturn,
  thisArg: TThis,
  ...boundArgs: TBoundArgs
) {
  const originalFn = this;

  function boundFn(this: any, ...args: TArgs): TReturn {
    const isNew = this instanceof boundFn;

    return originalFn.apply(
      isNew ? this : thisArg,
      [...boundArgs, ...args]
    );
  }
  function sum(this: { x: number }, a: number, b: number): number {
  return this.x + a + b;
}

const bound = sum.myBind({ x: 10 }, 5);

const result = bound(3);
console.log(result); 


  if (originalFn.prototype) {
    boundFn.prototype = Object.create(originalFn.prototype);
  }

  return boundFn;
};
class Person {
  constructor(public name: string, public age: number) {}
}

const BoundPerson = Person.myBind(null, "Alex");

const p = new BoundPerson(30);

p.name; 
p.age; 

