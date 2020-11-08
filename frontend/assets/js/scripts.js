const params = new URLSearchParams(window.location.search)
let name = params.get('name')
document.getElementById("name0").innerHTML = "Hi " + name + "!";
document.getElementById("name1").innerHTML = "Hi " + name + "!";
let email = params.get('email')
console.log(email)
// fetch("http://127.0.0.1:5000/quiz", {method: "GET"})
//   .then(res => {
//     if(res.status===500)
//       document.getElementById("score").innerHTML ="You have not taken any quiz"+`<h4 style="color:white">Score=0</h4>`;
//     else
//       document.getElementById("score").innerHTML ="Your Score is"+`res.json().score`;
//   })
//   .catch(error => console.error('Error:', error));

// $.ajax({
//     url:'http://127.0.0.1:5000/category',
//   success: (data) => {
//          let output=""
//     data.forEach(function (data) {
//       output += `
//        <div class="card d-flex flex-column p-4 col-12 m-2" style="background-color: #e76f51;">
//                     <header class="card-header">
//                         <h2>${data}</h2>
//                     </header>
//                     <p id="p">Tags:</p>
//                     <div class="tags">
//                         <a href="#">pol</a>
//                         <a href="#">gk</a>
//                         <a href="#">iq</a>
//                     </div>
//                 </div>
//         `
//     });
//     document.getElementById('cardd').innerHTML=output
//     }
// })
$.ajax({
  type:'POST',
  url:'http://127.0.0.1:5000/scores',
  data:{
    'email':email,
  },
  headers:{
    "Content-Type": 'application/json',
  },
  success:(res)=>{
    console.log(res)
  }
})
// fetch("http://127.0.0.1:5000/scores",{method:"POST", headers: {
//   "Accept": "application/json,*/*",
//   "Content-Type": "application/json"
// },body: JSON.stringify({
//   email: email,
// })})

var chart = new Chartist.Pie('.ct-chart', {
  series: [10, 20, 50, 20, 5, 50, 15],
  labels: [1, 2, 3, 4, 5, 6, 7]
}, {
  donut: true,
  showLabel: true,
  
});

chart.on('draw', function(data) {
  if(data.type === 'slice') {
    var pathLength = data.element._node.getTotalLength();
    data.element.attr({
      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
    });
    var animationDefinition = {
      'stroke-dashoffset': {
        id: 'anim' + data.index,
        dur: 1000,
        from: -pathLength + 'px',
        to:  '0px',
        easing: Chartist.Svg.Easing.easeOutQuint,
        fill: 'freeze'
      }
    };

    if(data.index !== 0) {
      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
    }
    data.element.attr({
      'stroke-dashoffset': -pathLength + 'px'
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


