const twoSeconds = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('2 seconds has passed');
    },2000)
})

const sixSeconds = new Promise ((resolve,reject) => {
    setTimeout(() => {
        resolve('6 seconds has passed')
    },6000)
})

sixSeconds.then(res1 => {
    console.log('six seconds returned, calling 2 seconds - RESULT = ',res1)
    twoSeconds.then(res2 => {
        console.log('2 seconds returned - RESULT = ',res2)
    })
})
