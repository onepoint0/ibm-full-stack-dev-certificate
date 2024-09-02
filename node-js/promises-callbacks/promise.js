let result = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('promise resolved')
    },2000)
})

console.log(`before call promise`);

result.then((res) => {
    console.log(`From callback ${res}`);
})

console.log(`after call promise`);