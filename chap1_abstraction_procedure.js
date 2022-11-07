/*Exercise 1.3
Declare a function that takes three numbers as arguments 
and returns the sum of the squares of the two larger numbers.*/
function square(x){return x * x;}
function abs(b){return b >= 0 ? b : - b;}
function sum_of_bigest_two_squares(x,y,z){
    /*first compare x and y, the greater one must be one of the two larger numbers
    then compare the rest two and pick the larger one*/
    return x > y 
            ? square(x) + (y > z 
                            ? square(y)
                            : square(z))
            : square(y) + (x > z
                            ? square(x)
                            : square(z));
}

/*Exercise 1.4
Observe that our model of evaluation allows for applications 
whose function expressions are compound expressions. 
Use this observation to describe the behavior of the following function:
*/
function plus(a, b) { return a + b; }
function minus(a, b) { return a - b; }
function a_plus_abs_b(a, b) {
    return (b >= 0 ? plus : minus)(a, b);
}

/*Exercise 1.5
Ben Bitdiddle has invented a test to determine 
whether the interpreter he is faced with is using 
applicative-order evaluation or normal-order evaluation. 
He declares the following two functions :
*/
function p() { return p(); }
function test(x, y) { return x === 0 ? 0 : y;}
/*Then he evaluates the statement
test(0, p());*/
/*> test(0,p())
Uncaught RangeError: Maximum call stack size exceeded
    at p (REPL16:34:168)
    at p (REPL16:34:175)
    at p (REPL16:34:175)
    at p (REPL16:34:175)
    at p (REPL16:34:175)
    at p (REPL16:34:175)
    at p (REPL16:34:175)
    at p (REPL16:34:175)
    at p (REPL16:34:175)
    at p (REPL16:34:175)*/
/*the output above shows that the nodejs REPL uses applicative-order evaluation
before apply arguments to procedures, so nodejs REPL first evaluate all the parameters,
and then apply them to procedures
This alternative “fully expand and then reduce” evaluation method is 
known as normal- order evaluation, 
in contrast to the “evaluate the arguments and then apply” 
method that the interpreter actually uses, which is called applicative-order evaluation.*/

function sqrt_iter(guess, x){
    return is_good_enough(guess, x)
            ? guess
            : sqrt_iter(improve(guess, x), x);
}

function improve(guess, x){
    return average(guess, x / guess);
}

function average(x, y){
    return (x + y) / 2;
}

function is_good_enough(guess, x){
    return abs(square(guess) - x) < 0.001;
}

function sqrt(x){
    return sqrt_iter(1, x);
}

/*
Exercise 1.6
Alyssa P. Hacker doesn’t like the syntax of conditional expressions, 
involving the characters ? and :. “Why can’t I just declare an ordinary conditional function 
whose application works just like conditional expressions?” she asks. 
Alyssa’s friend Eva Lu Ator claims this can indeed be done, and she declares a
conditional function as follows:
*/
function conditional(predicate, then_clause, else_clause) {
    return predicate ? then_clause : else_clause;
}

function sqrt_iter_con(guess, x) {
    return conditional(is_good_enough(guess, x),
                        guess, 
                        sqrt_iter_con(improve(guess, x),
                                            x));
}

function sqrt_con(x){
    return sqrt_iter_con(1, x);
}
/*What happens when Alyssa attempts to use this to compute square roots? Explain.
> sqrt_con(4)
Uncaught RangeError: Maximum call stack size exceeded
    at is_good_enough (REPL79:73:252)
    at sqrt_iter_con (REPL79:94:264)
    at sqrt_iter_con (REPL79:96:253)
    at sqrt_iter_con (REPL79:96:253)
    at sqrt_iter_con (REPL79:96:253)
    at sqrt_iter_con (REPL79:96:253)
    at sqrt_iter_con (REPL79:96:253)
    at sqrt_iter_con (REPL79:96:253)
    at sqrt_iter_con (REPL79:96:253)
    at sqrt_iter_con (REPL79:96:253)
The REPL interpreter shows that our program recurses too much
Why would this happen?
This is because the conditional-expression is a primitive
predicate ? consequent-expression : alternative-expression
if predicate is true, consequent-expression will be evaluated
while alternative-expression won't.
but conditional-function is just a function
The REPL interpreter will evaluate all the arguments before applying them to function
so the conditional-function:
conditional(predicate, consequent-expression, alternative-expression)
both consequent and alternative expression will be evaluated before 
applying to conditional-function
here are two examples showing the distinction of conditional-expression and conditional-function
*/
function print(text){
    console.log(text);
}
function testCondExp(flag){
    return flag === 0 ? print("bad") : print("good");
}
function testCondFunc(flag){
    return conditional(flag, print("bad"), print("good"));
}
/*testCond is written to show the difference 
between conditional-expression and conditional-function
there two dispatch of it: testCondExp and testCondFunc
testCondExp accept a flag, if flag is 0 print "bad" else print "good"
testCondFunc uses conditional-function to complete the same task
but the result is that both "bad" and "good" are printed
it emphasizes the applicative-order(evaluate the arguments and then apply)
that the interpreter actually uses*/


/*Exercise 1.7
The is_good_enough test used in computing square roots will not be very effective 
for finding the square roots of very small numbers. Also, in real computers, 
arithmetic operations are almost always performed with limited precision. 
This makes our test inadequate for very large numbers. 
Explain these statements, with examples showing 
how the test fails for small and large numbers. 
An alternative strategy for implementing is_good_enough is to watch 
how guess changes from one iteration to the next and to stop 
when the change is a very small fraction of the guess. 
Design a square-root function that uses this kind of end test. 
Does this work better for small and large numbers?
*/
function is_good_enough_fraction(guess, x){
    return abs(square(guess) - x) / x < 0.001;
}

function is_good_enough_abstract(guess, x, func){
    return abs(func(guess) - x) / x < 0.001;
}

function sqrt_iter_frac(guess, x){
    return is_good_enough_fraction(guess, x)
            ? guess
            : sqrt_iter_frac(improve(guess, x), x);
}

function sqrt_frac(x){
    return sqrt_iter_frac(1,x);
}

/*Exercise 1.8
Newton’s method for cube roots is based on the fact that 
if y is an approximation to the cube root of x , 
then a better approximation is given by the value
(x/y**2 +2y) / 3
Use this formula to implement a cube-root function analogous 
to the square-root function. 
(In sec- tion 1.3.4 we will see how to implement 
Newton’s method in general as an abstraction of 
these square- root and cube-root functions.)
*/
/*Block structure that uses to enclose functions which will not be used second time*/
function cbrt(x){
    function cbrt_iter(guess){
        return is_good_enough_abstract(guess, x, x=>x*x*x)
                ? guess
                : cbrt_iter(improve_cbrt(guess, x), x);
    }
    function improve_cbrt(guess){
        return (x/(guess**2) + 2 * guess) / 3
    }
    return cbrt_iter(1);
}