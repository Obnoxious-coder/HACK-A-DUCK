document.getElementById("form0").addEventListener('submit', loginf);
document.getElementById("form1").addEventListener('submit', registerf);
console.log("hi")
function loginf(e) {
    e.preventDefault();
    let email = document.getElementById("login-email").value;
    let pwd = document.getElementById("login-password").value;
    // var formData=new FormData(document.getElementById("form0"))
    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Accept": "application/json,*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
            email: email,
            pwd:pwd
        })
    }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
}
function registerf(e) {
     e.preventDefault();
    fetch("http://127.0.0.1:5000/register", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: new FormData(document.getElementById("form1"))
    }).then(res => res.json())
        .then(response => {
            document.getElementById("content").innerHTML = "Successfully Registered!"
            console.log('Success:', JSON.stringify(response))
        })
        .catch(error => console.error('Error:', error));
}