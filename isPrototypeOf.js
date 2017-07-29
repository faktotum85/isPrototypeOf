var isPrototypeOf = function (ancestor, descendant) {
  var nextChainLink = descendant;
  do {
    nextChainLink = Object.getPrototypeOf(nextChainLink);
    if (nextChainLink === ancestor) {
      return true;
    }
  } while (nextChainLink !== null);
  return false;
};

// Test set-up
var canine;
var dog;
var myDog;
var empty;

canine = {
  bark: function () {
    console.log('bark');
  }
};

dog = Object.create(canine);
dog.fetch = function () {
  console.log('fetch');
};

myDog = Object.create(dog);
empty = Object.create(null);

tests({
  'It should return true if the first argument is a prototype of the second': function () {
    eq(isPrototypeOf(dog, myDog), true);
  },
  'It should return false if the first argument is not a prototype of the second': function () {
    eq(isPrototypeOf(dog, empty), false);
  },
  'It should recognize prototypes further up the chain': function () {
    eq(isPrototypeOf(canine, myDog), true);
  },
  'It should recognize Object.prototype as a prototype of all objects': function () {
    eq(isPrototypeOf(Object.prototype, myDog), true);
  }
});
