function print(text){
    console.log(text);
}

print("Hello World!");

function factorial(n){
    if(n == 1) return 1;
    return n * factorial(n - 1);
}

function f(a){
    return sum_of_squares(a + 1, a * 2);
}

function login(user){
    /*用户登录*/
}

function square(x){
    return x * x;
}
/*高阶加法函数，将传入的函数f分别应用到x和y上求值，之后再求和*/
function add(x, y, f){
    return f(x) + f(y);
}

function sum_of_squares(x, y){
    return add(x, y, square);
}

function cube(x){
    return x * x * x;
}

function sum_of_cubes(x, y){
    return add(x, y, cube);
}

/*第一种基础情况，复合型
实体就是能被五感（触觉、味觉、听觉、嗅觉、视觉）感受到的事物
法则（规则、规律）就是在变化中不变的东西（道可道，非常道）
规律是描述性的约束，而法则是可以参考执行的步骤
第一个参数 arguments 被当成数据（实体）传入
第二个参数 procedure 被当成方法（法则）传入*/
function apply(arguments, procedure){
    return procedure(arguments);
}

company = "公司";
function start(company_name){
    print("成立"+company_name);
}

/*第二种基础情况，结合型*/
function combine(x, y, combinator){
    return combinator(x,y);
}

/*conditional expression*/
predicate ? consequent_expression : alternative_expression;

if(predicate){
    consequent_expression;
}else{
    alternative_expression;
}