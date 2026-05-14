let signupForm=document.getElementById("signupForm");
if (signupForm ){
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;

    let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$&!/])(?=.*\d).{8,}$/

    if(name =="" || email =="" || password ==""){
        alert("All Fields Required")
        return false;
    }
    if(!pattern.test(password)){
        alert("Password must contain 1 capital letter, 1 small letter, 1 special character, 1 Digit and minimum 8 length");
        return false;
    }

let user={name:name,email:email, password:password};

localStorage.setItem("user",JSON.stringify(user));
alert("Sign Up Successful !")
window.location.href="login.html";
});
}

let loginForm=document.getElementById("loginForm");

if(loginForm){
    loginForm.addEventListener("submit", function(event){
        event.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        //reding the data from local storage 
        let user = JSON.parse(localStorage.getItem("user"));

        if(email==user.email && password == user.password){
            alert("Login Successfull!");
            //redirect to home page
            localStorage.setItem("isLoggedIn","true")
            window.location.href="index.html";
        }else{
            alert("Invalid Email or Password!");
        }
    });
}

let heading=document.getElementById("welcomeMessage");

if(heading){
    let user=JSON.parse(localStorage.getItem("user"));
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if(user && isLoggedIn === "true"){
    heading.innerHTML = "Welcome " + user.name + "!";
}
}

// Protecting the tasks.html from opening without log in
let currentPage=window.location.pathname;

if(currentPage.includes("tasks.html")){
    let loginStatus = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (!loginStatus){
        alert("Please Log In First!");
        window.location.href = "login.html";
    }
}


//Logout button login
let LogoutButton = document.getElementById("logoutBtn");

if(LogoutButton){
    LogoutButton.addEventListener("click",function(){
        localStorage.removeItem("isLoggedIn");
        alert("Logged Out Successfully!");
        window.location.href = "index.html";
    });
}

//Dynamic NavBar Logic

let signuplink = document.getElementById("signupLink");
let loginlink = document.getElementById("loginLink");
let logoutBtn = document.getElementById("logoutBtn");

let loginStatus = localStorage.getItem("isLoggedIn");

if(loginStatus == "true"){
    if(signuplink){
        signuplink.style.display = "none";
    }

    if(loginlink){
        loginlink.style.display = "none";
    }
}else{
    if(logoutBtn){
        logoutBtn.style.display="none";
    }
}

//Dynamically adding Tasks in tasks.html
let addButton = document.getElementById("addTaskBtn");

if(addButton){
    addButton.addEventListener("click", function(){

        let task = document.getElementById("taskInput").value;

        if(task == ""){
            alert("Please enter the task first!");
            return;
        }

        // find "tasks" key in local storage if not found create empty array
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Add new task
        tasks.push(task);

        // Save updated tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks));

        alert("Task Added Successfully!");

        // Clear input field
        document.getElementById("taskInput").value = "";
    });
}

showTasks();
function showTasks(){

    let taskList = document.getElementById("taskList");

    if(!taskList){
        return;
    }

    taskList.innerHTML = "";

    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

    for(let i = 0; i < taskArray.length; i++){

        taskList.innerHTML += `
        <tr>
            <td>${taskArray[i]}</td>
            <td>
                <button onclick="deleteTask(${i})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    }
}
function deleteTask(index){

    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

    taskArray.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(taskArray));

    showTasks();
}


