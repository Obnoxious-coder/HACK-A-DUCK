const name = localStorage.getItem("name");
document.getElementById("name0").innerHTML = "Hi " + name + "!";
document.getElementById("name1").innerHTML = "Hi " + name + "!";
const email = localStorage.getItem("email");
console.log(email);
console.log(name);
// fetch("http://127.0.0.1:5000/quiz", {method: "GET"})
//   .then(res => {
//     if(res.status===500)
//       document.getElementById("score").innerHTML ="You have not taken any quiz"+`<h4 style="color:white">Score=0</h4>`;
//     else
//       document.getElementById("score").innerHTML ="Your Score is"+`res.json().score`;
//   })
//   .catch(error => console.error('Error:', error));

document.getElementById("logout").addEventListener("click", function () {
  localStorage.clear();
  window.location.replace("http://127.0.0.1:5501/frontend/index.html");
});

$.ajax({
  url: "http://127.0.0.1:5000/category",
  success: (data) => {
    var i = 0;
    var color = "";
    let output = "";

    // #e9c46a;#277da1;#f4a261; #90be6d;#f3722c

    data.forEach(function (data) {
      if (i % 5 == 0) {
        color = " #e9c46a";
      } else if (i % 5 == 1) {
        color = "#277da1";
      } else if (i % 5 == 2) {
        color = "#f4a261";
      } else if (i % 5 == 3) {
        color = "#90be6d";
      } else if (i % 5 == 4) {
        color = "#f3722c";
      }

      output += `
       <div class="card d-flex flex-column p-4 col-12 m-2 category" style="background-color: ${color}">
                    <header class="card-header">
                        <h2>${data}</h2>
                    </header>
                    <p id="p">Tags:</p>
                    <div class="tags">
                        <a href="#">pol</a>
                        <a href="#">gk</a>
                        <a href="#">iq</a>
                    </div>
                </div>
        `;
      i++;
    });
    document.getElementById("cardd").innerHTML = output;
  },
});

fetch("http://127.0.0.1:5000/scores", {
  method: "POST",
  headers: {
    Accept: "application/json,*/*",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: email,
  }),
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    if (res.score.length === 0) {
      document.getElementById("result").innerHTML =
        "You have not played any quiz YET";
      document.getElementById("score").innerHTML = "Highest Score: 0";
    } else {
      var l = res.score.length;
      document.getElementById("result").innerHTML =
        "You have played " + l + " quizzes";
      var total = 0;
      for (let i = 0; i < l; i++) total += res.score[i].score;
      console.log(total);
      document.getElementById("score").innerHTML = "Highest Score: " + total;
      // console.log(res.score.length);
      $("#RecentScore").text(`Recent Score : ${res.score[total - 1].score}`);
    }
  })
  .catch((err) => console.log(err));

var chart = new Chartist.Pie(
  ".ct-chart",
  {
    series: [10, 20, 50, 20, 5, 50, 15],
    labels: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    donut: true,
    showLabel: true,
  }
);

chart.on("draw", function (data) {
  if (data.type === "slice") {
    var pathLength = data.element._node.getTotalLength();
    data.element.attr({
      "stroke-dasharray": pathLength + "px " + pathLength + "px",
    });
    var animationDefinition = {
      "stroke-dashoffset": {
        id: "anim" + data.index,
        dur: 1000,
        from: -pathLength + "px",
        to: "0px",
        easing: Chartist.Svg.Easing.easeOutQuint,
        fill: "freeze",
      },
    };

    if (data.index !== 0) {
      animationDefinition["stroke-dashoffset"].begin =
        "anim" + (data.index - 1) + ".end";
    }
    data.element.attr({
      "stroke-dashoffset": -pathLength + "px",
    });

    data.element.animate(animationDefinition, false);
  }
});
// fetch("/data")
//   .then(res => res.json())
//   .then(data => {
// //   var chart = new Chartist.Pie('.ct-chart', {
// //   series: [data.data],
// //   labels: [1, 2, 3, 4, 5, 6, 7]
// // }, {
// //   donut: true,
// //   showLabel: true,

// // });

// })
$(document).on("click", ".category", function (e) {
  console.log($(this).find("h2").text());
  var cat = $(this).find("h2").text();
  window.location.href = `pages/quiz.html?cat=${cat}`;
});
