class Customer {
    constructor(id, fullname, email, phone, address, balance) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.balance = balance;
    }
}

var customers = [];

const customer_db = "customer_db"
function init(){
    if(localStorage.getItem(customer_db) == null){
        customers = [
            new Customer(1, "minh", "minh@gmail.com", "0123", "28 NTP", "0"),
            new Customer(2, "phung", "minh@gmail.com", "0123", "28 NTP", "0"),
            new Customer(3, "thuy", "minh@gmail.com", "0123", "28 NTP", "0"),
            new Customer(4, "nhan", "minh@gmail.com", "0123", "28 NTP", "0"),
            new Customer(5, "cuong", "minh@gmail.com", "0123", "28 NTP", "0"),
        ]
        localStorage.setItem(customer_db, JSON.stringify(customers))
    }
    else{
        customers = JSON.parse(localStorage.getItem(customer_db));
    }
}

function renderCustomer() {
    let htmls = customers.map(function(customer){
        return  `
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.fullname}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.address}</td>
                        <td>${customer.balance}</td>
                        <td>
                            <button class="btn btn-outline-info">
                                <i class="fa-solid fa-pen-to-square" onclick="editCustomer(${customer.id})"></i>
                            </button>
                            <button class="btn btn-outline-success">
                                <i class="fa-regular fa-square-plus"></i>
                            </button>
                            <button class="btn btn-outline-warning">
                                <i class="fa-regular fa-square-minus"></i>
                            </button>
                            <button class="btn btn-outline-primary">
                                <i class="fa-solid fa-repeat"></i>
                            </button>
                            <button class="btn btn-outline-danger">
                                <i class="fa-solid fa-trash-can" onclick="deleteCustomer(${customer.id})"></i>
                            </button>
                        </td>
                    </tr>
                `
    })
    document.querySelector(`.table>tbody`).innerHTML = htmls.join("")
}

function createCustomer(){
    let id = getMaxId() + 1;
    let fullname = document.querySelector("#fullname").value; 
    let email = document.querySelector("#email").value; 
    let phone = document.querySelector("#phone").value; 
    let address = document.querySelector("#address").value; 
    let balance = "0";
    
    if (checkEmpty(fullname) || checkEmpty(email) || checkEmpty(phone) || checkEmpty(address)){
        alert("Please enter full infomation");
        return;
    }

    customers.push(new Customer(id, fullname, email, phone, address, balance));
    localStorage.setItem(customer_db, JSON.stringify(customers));
    renderCustomer();
    // resetCreateForm();
}

function editCustomer(customerID) {
    let customer = customers.find(function (customer) {
        return customer.id == customerID
    })

    document.querySelector("#customerID").value = customer.id;
    document.querySelector("#fullname").value = customer.fullname; 
    document.querySelector("#email").value = customer.email; 
    document.querySelector("#phone").value = customer.phone; 
    document.querySelector("#address").value = customer.address; 

    document.querySelector('.btn-create').classList.toggle('d-none');
    document.querySelector('.btn-update').classList.toggle('d-none');
}

function updateCustomer() {

    let customerID = document.querySelector('#customerID').value;

    let customer = customers.find(function (customer) {
        return customer.id == customerID
    })

    customer.fullname = document.querySelector('#fullname').value;
    customer.email = document.querySelector("#email").value 
    customer.phone = document.querySelector("#phone").value 
    customer.address = document.querySelector("#address").value 

    localStorage.setItem(customer_db, JSON.stringify(customers));
    renderCustomer();
}

function deleteCustomer(customerID) {
        let confirmed = window.confirm("Are you sure to remove customer(s)?");
        if (confirmed) {
            customers =customers.filter(function(customer){
                return customer.id != customerID;
            })

            localStorage.setItem(customer_db, JSON.stringify(customers));
            renderCustomer();
        }
}

function getMaxId(){
    let max = 0;
    for (let i = 0; i < customers.length; i++){
        if (customers[i].id > max ) {
            max = customers[i].id
        }
    }
    return max;
}

function checkEmpty(value) {
    return value == null || value.trim() == '';
}

function resetCreateForm(){
    document.querySelector("#customerID").value = "";
    document.querySelector("#fullname").value = ""; 
    document.querySelector("#email").value = ""; 
    document.querySelector("#phone").value = ""; 
    document.querySelector("#address").value = ""; 
    
    renderCustomer();

    document.querySelector('.btn-create').classList.toggle('d-none');
    document.querySelector('.btn-update').classList.toggle('d-none');
}

// function resetCreateForm(){
//     document.querySelector("#fullname").value = ""; 
//     document.querySelector("#email").value = ""; 
//     document.querySelector("#phone").value = ""; 
//     document.querySelector("#address").value = ""; 
    
// }


init();
renderCustomer();