// Get Elements
const todo_form = document.getElementById('todo_form');
const msg = document.querySelector('.msg');
const list_group = document.querySelector('.list-group');
const card_footer = document.querySelector('.card-footer');


// Form Submit
todo_form.onsubmit = (e) => {
    e.preventDefault();

    // get form data
    const formVal = new FormData(e.target);
    const {client_name, project_name, date, time} = Object.fromEntries(formVal.entries());
    const formData = Object.fromEntries(formVal.entries());


    if ( !client_name || !project_name || !date || !time) {
        msg.innerHTML = setAlert('All Fields Are Required!');
        
    }else {
        // Present Time
        const start_time = Date.now();
        const last_time = new Date(date + ' ' + time);
        const end_time = last_time.getTime();

        // Random id
        const rand_id = Math.floor(Math.random() * 1000) + start_time;

        // Passing Data Value
        const singleFormData = {client_name, project_name, start_time, end_time, rand_id};

        // Passing Data to ls
        createLSData('todoapp', singleFormData);
        // Reset Form
        e.target.reset();
        showData();

    }
}

// Data Show from ls
const showData = () => {
    const AllData = getLSData('todoapp');
    
    let get_data = '';

    if (!AllData || AllData.length == 0) {
        get_data = [];
    }
    
if (AllData) {
    AllData.reverse().map(item => {
        get_data += `
                <li class="list-group-item shadow">
                 Client : ${item.client_name} | ${item.project_name} | Remain time :
                  <strong>
                  ${timeKeeper(item.end_time)}
                   </strong>
                    <button deleteList="${item.rand_id}" class="close">×</button>
                    <span style="${ progressBar(item.start_time, item.end_time) }" class="status"></span>
                  </li>
        `;
    });
    
}

    list_group.innerHTML = get_data;
    // Data Count
    card_footer.innerHTML = `<p>Total item number : <span>${AllData? AllData.length: 'No Data Found'}</span></p>`;
    
}
setInterval(() => {
    showData()
}, 1000);


// Delete DAta
list_group.onclick = (e) => {
    if (e.target.hasAttribute('deleteList')) {
        const id = e.target.getAttribute('deleteList');

        const allData = getLSData('todoapp');
        const index = allData.findIndex(data => data.rand_id == id);

        allData.splice(index, 1);
        updateLSData('todoapp', allData);
        showData();
    }
    console.log(e.target.getAttribute('deleteList'));
}

showData();