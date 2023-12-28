/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */


function wait1(t) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(t)
    },t);
  });
}

function wait2(t) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(t)
    },t);
  });
}

function wait3(t) {
return new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(t)
 },t);
});
}

function promiseAll(t1,t2,t3) {
const promise1 = wait1(t1);
const promise2 = wait2(t2);
const promise3 = wait3(t3);
return Promise.all([promise1, promise2, promise3])
.then((result)=>{
  return Math.max(...result)*1000;
});
}

function calculateTime(t1,t2,t3){ 
return promiseAll(t1,t2,t3)
.then((result)=>{
  console.log(result)
  return result;
});
}
module.exports = calculateTime;