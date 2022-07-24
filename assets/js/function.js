// Alert Function
const setAlert = (msg, type = "danger") => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`;
}




/**
 * get all LS data 
 * @param {*} key 
 */
 const getLSData  = (key) => {

    if( localStorage.getItem(key) ){
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }

}


// Set Value LS
const createLSData = (key, value) => {

    // init value
    let data = [];

    // check key exist or not
    if (localStorage.getItem(key)) {
        data = JSON.parse(localStorage.getItem(key));
    }

    // push data
    data.push(value);

    localStorage.setItem(key, JSON.stringify(data));
}

// Update LS DAta
const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}


//time keeper
const timeKeeper = (end_time) => {
    const duration = Math.floor(Math.abs(end_time - Date.now()));


    const total_sec = Math.floor(duration / 1000);
    const total_min = Math.floor(total_sec / 60);
    const total_hour = Math.floor(total_min / 60);
    const total_day = Math.floor(total_hour / 24);

    const hour = total_hour - (total_day * 24);
    const min = total_min - (total_day * 24 * 60) - (hour * 60);
    const sec = total_sec - (total_day * 24 * 60 * 60) - (hour * 60 * 60) -( min * 60 );

    // return remain time
    if (end_time < Date.now()) {
        return `[ <strong style="color: red">Time over</strong> ]`;
    }else {
        return `[ ${total_day} days ${hour} hours ${min} mins ${sec} Sec ]`;
    }
   
}

//progress bar
const progressBar = (start_time, end_time) => {
    const duration = end_time - start_time;
    const currentTime = end_time - Date.now();

    const progressWith = Math.floor((100 * currentTime) / duration);
    
    let width = '';

    if (progressWith >= 1 && progressWith <=33) {
        width = `Width:${progressWith}%; background-color:red;`
    }else if (progressWith >= 34 && progressWith <= 66) {
        width = `Width:${progressWith}%; background-color:orange;`
    }else if (progressWith >= 67 && progressWith <= 100) {
        width = `Width:${progressWith}%; background-color:green;`
    }else {
        width = `Width: 100%; background-color:red;`
    }

    return width;
}