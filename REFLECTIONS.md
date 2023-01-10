# Reflections

## Pure Functions

Pure functions: functions which, given the same input, will always evaluate to the same value. Predictable input === predictable output.

Many of the functions in my [`app.js`](https://github.com/letakeane/ideagrave/blob/main/src/app.js) file are pure functions, notably:  
- [`getIdeas`](https://github.com/letakeane/ideagrave/blob/679445cae64ef0b186a83cfbe9246cb37be7d8f3/src/app.js#L4)
- [`setIdeas`](https://github.com/letakeane/ideagrave/blob/679445cae64ef0b186a83cfbe9246cb37be7d8f3/src/app.js#L8)
- [`addIdea`](https://github.com/letakeane/ideagrave/blob/679445cae64ef0b186a83cfbe9246cb37be7d8f3/src/app.js#L16)

The `createIdea` function is not pure because of the `Date.now()` side effect it relies on. The `app` function itself could be said to be pure.

There is a pure function in the [`index.js`](https://github.com/letakeane/ideagrave/blob/main/src/index.js) file, which is where I've done my DOM interactions.
- [`makeGraves`](https://github.com/letakeane/ideagrave/blob/679445cae64ef0b186a83cfbe9246cb37be7d8f3/src/index.js#L32)

## Higher Order Functions

Higher order functions: functions that take in a function (declaration/definition) as an argument and returns a function (declaration/definition) as a result

My app does not contain any HOFs. There are instances when a function is called with an invoked function, but that is not a HOF.

## Closures

Closures: creation of a persistent scope. In terms of JS, commonly, a function is created which defines local variables. That wrapping function then contains inner function definitions which reference and access those local variables. The local variables are protected, and the inner functions still have access to them even after the outer, wrapping function has been declared.

I found [this stack overflow post](https://stackoverflow.com/questions/36636/what-is-a-closure) helpful in understanding this concept!

The [`app.js` file](https://github.com/letakeane/ideagrave/blob/main/src/app.js) is a good example of this.

You can see that the ideas array is declared inside the `app` function. `getIdeas`, `setIdeas`, and `addIdea` all reference the local `ideas` variable.

The [`return` statement](https://github.com/letakeane/ideagrave/blob/679445cae64ef0b186a83cfbe9246cb37be7d8f3/src/app.js#L20) of the `app` function does not return the ideas variable.

But, as you can see in the [`index.js` file](https://github.com/letakeane/ideagrave/blob/main/src/index.js), we can use the getter, setter, and add functions from `app` to [access and update that local `ideas` variable](https://github.com/letakeane/ideagrave/blob/679445cae64ef0b186a83cfbe9246cb37be7d8f3/src/index.js#L5).

## Curried Functions

Curried functions: currying (named after mathematician Haskel Curry) is a function that returns a function. It is a closure (all curried functions are closures; not all closures are curried). The point is often to create similar functions that nonetheless have unique values - here's an example:

```js
const betterThan = worseThing => {
  return (thing) => thing + ' is better than ' + worseThing;
}

const betterThanCilantro = betterThan('cilantro');
console.log(betterThanCilantro('vinegar')) // ==> 'vinegar is better than cilantro'
console.log(betterThanCilantro('everything')) // ==> 'everything is better than cilantro'

const betterThanFootball = betterThan('football');
console.log(betterThanFootball('rhythmic gymnastics')) // ==> 'rhythmic gymnastics is better than football'
```

There are no curried functions in my application.

## Composition

Composition: Building on top of HOFs and currying, composition is a method of combining small pieces of functionality into more complex functionality. This remains a concept that I am still uncertain about - I don't have a strong working model of it in my head yet.

At one point in the history of this app, I had a pipeline (it was not useful and was more just an exercise to see if it could be done). I couldn't get it working, but with Will's help, it resulted in [this setup](https://github.com/letakeane/ideagrave/blob/ad32e48937a1dc2dcbd4bdce8be181ea26e60609/src/index.js#L10-L25).

The pipeline was invoked in the [`handleSubmit` function](https://github.com/letakeane/ideagrave/blob/ad32e48937a1dc2dcbd4bdce8be181ea26e60609/src/index.js#L51-L57), and it took in [three functions](https://github.com/letakeane/ideagrave/blob/ad32e48937a1dc2dcbd4bdce8be181ea26e60609/src/index.js#L31-L44) to create an idea object.

Ultimately, it didn't feel useful or more legible, so in the [next iteration](https://github.com/letakeane/ideagrave/blob/main/src/index.js) of the app, I removed it.

## Data Model & DOM separation

Similar to any other OOP project where we would define classes in their own files, and relegate DOM manipulation to a separate file, I defined my data model in its own file (and within its own function even).


The [`app.js` file](https://github.com/letakeane/ideagrave/blob/main/src/app.js) is where I've defined my ideas array, as well as the functions that access and manipulate that array. It also contains the function that creates a new idea.

Then, the [`index.js` file](https://github.com/letakeane/ideagrave/blob/main/src/index.js) is where that data model is painted to the DOM, and it's also where user-generated values are retrieved from the DOM.