function mySetInterval(callback, interval) {
    function run() {
      callback();
      setTimeout(run, interval);
    }
    setTimeout(run, interval);
  }
  
  let i=1;
  mySetInterval(function () {
    console.log("Task- "+i+++" Executing..!");
  }, 1000);