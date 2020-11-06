const params = new URLSearchParams(window.location.search)
let name = params.get('name')
console.log(name)
document.getElementById("name0").innerHTML = "Hi " + name + "!";
document.getElementById("name1").innerHTML = "Hi " + name+"!";
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

$("#menuButton").on("click", () => {
  $("#mySidenav").removeClass("d-none");
  $("#mySidenav").addClass("d-flex");
  $("body").css("overflow", "hidden");
  $("#menuButton").hide();
});
$("#close").on("click", () => {
  $("#mySidenav").removeClass("d-flex");
  $("#mySidenav").addClass("d-none");
  $("body").css("overflow", "auto");
  $("#menuButton").show();
});

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


// // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
// chart.on('created', function() {
//   if(window.__anim21278907124) {
//     clearTimeout(window.__anim21278907124);
//     window.__anim21278907124 = null;
//   }
//   window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
// });

// var data = {
//   series: [5, 3, 4]
// };

// var sum = function(a, b) { return a + b };

// new Chartist.Pie('.ct-chart', data, {
//   labelInterpolationFnc: function(value) {
//     return Math.round(value / data.series.reduce(sum) * 100) + '%';
//   }
// });