document.getElementById("form0").addEventListener("submit", loginf);
document.getElementById("form1").addEventListener("submit", registerf);
console.log("hi");
function loginf(e) {
  e.preventDefault();
  let email = document.getElementById("login-email").value;
  let pwd = document.getElementById("login-password").value;
  // var formData=new FormData(document.getElementById("form0"))

  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: {
      Accept: "application/json,*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: pwd,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.message == "success") {
        //   console.log ( res.url+"/"+res.name)
        // window.location.href = res.url;
        window.location.replace(
          "http://127.0.0.1:5501/frontend/home.html" +
            "?name=" +
            res.name +
            "&email=" +
            res.email
        );
        // console.log(res.message)
      } else {
        if (res.status === 401)
          document.getElementById("content1").innerHTML =
            "Invalid login Credentials";
        else document.getElementById("content1").innerHTML = "Server Failed!";
      }
    })
    .catch((error) => console.error("Error:", error));
}
function registerf(e) {
  e.preventDefault();
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let pwd = document.getElementById("signup-password").value;
  console.log(name);
  console.log(email);
  console.log(pwd);
  fetch("http://127.0.0.1:5000/register", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: pwd,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      // console.log(response.message == "User already exits")
      console.log(response.statusCode);
      if (response.message == "User already exits")
        document.getElementById("content").innerHTML = "User already exists!";
      else if (response.message == "success")
        document.getElementById("content").innerHTML =
          "Successfully Registered!";
      else document.getElementById("content").innerHTML = "Signup Failed!";
      console.log("Success:", JSON.stringify(response));
    })
    .catch((error) => console.error("Error:", error));
}
