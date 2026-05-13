let signupForm=document.getElementById("signupForm");
if (signupForm ){
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;

let user={name:name,email:email, password:password};

localStorage.setItem("user",JSON.stringify(user));
alert("Signup ")
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