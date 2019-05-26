// const nam = (disom) => new Promise((resolve, reject) => {
//     if(disom) resolve("chuc mung");
//     else reject("lua day") 
// });

// nam(true)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// function nguday(cb) {
//     setTimeout(function(){
//         console.log("Ngu day");
//         cb()
//     }, 2000)
// }

// function danhrang(cb) {
//     setTimeout(function(){
//         console.log("danh rang");
//         cb()
//     }, 2500)
// }

// function ruamat() {
//     setTimeout(function(){
//         console.log("rua mat");
//     }, 1000)
// }

// nguday(function() {
//     danhrang(function(){
//         ruamat()
//     })
// })

function nguday() {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log("Ngu day");
            resolve({message: 'success'});
        }, 2000)
    })
}

function danhrang() {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log("danh rang");
            resolve({message: 'success'});
        }, 2500)
    })
}

function ruamat() {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log("rua mat");
            // reject("loi")
        }, 1000)
    })
}

// nguday()
//     .then(() => {
//         danhrang();
//     })
//     .then(() => {
//         ruamat();
//     })
//     .catch((err) => {
//         console.log(err);
//     });

async function asyncFunc() {
    try {
        await nguday();
        const data = await danhrang();
        console.log(data);
        await ruamat();
    } catch(error) {
        console.log(error)
    }
}

asyncFunc();