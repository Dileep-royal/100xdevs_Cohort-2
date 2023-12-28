const clockTime =()=>{
    const globalTime = new Date();
    const options = { 
        weekday:'short',
        day:'numeric',
        month: 'short',
        year: 'numeric',

        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        
        timeZone:'Asia/kolkata',
        timeZoneName: 'short',
    };
    const localTime=globalTime.toLocaleTimeString("en-IN",options);
    
    console.log(localTime.toUpperCase())
}

function mySetInterval(callback,duration){
    function run(){
        callback();
        setTimeout(run,duration);
    }
    setTimeout(run,duration);
}

mySetInterval(clockTime,1000);

// clockTime() 