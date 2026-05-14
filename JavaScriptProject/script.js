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
            window.location.href="index.html";
        }else{
            alert("Invalid Email or Password!");
        }
    });
}

let heading=document.getElementById("welcomeMessage");

if(heading){
    let user=JSON.parse(localStorage.getItem("user"));

    if(user){
        heading.innerHTML="Welcome" + user.name + "!";
    }
}