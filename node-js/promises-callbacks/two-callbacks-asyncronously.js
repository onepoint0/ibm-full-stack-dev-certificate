const twoSeconds = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('twoSeconds resolved')
    },2000)
})

const sixSeconds = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('sixSeconds resolved')
    },6000)
})

twoSeconds.then(res => console.log('TWO SECONDS RESULT = ',res))

sixSeconds.then(res => console.log('SIX SECONDS RESULT = ', res))

