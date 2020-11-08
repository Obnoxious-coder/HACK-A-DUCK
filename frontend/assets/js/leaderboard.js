// fetch("http://127.0.0.1:5000/leaderboard", {
//   method: "POST",
//   headers: {
//             "Accept": "application/json,*/*",
//             "Content-Type": "application/json"
//         },
//   body:{}
// })
//   .then(res => {
//     console.log(res)
//   })
//     // .then(res=>console.log(res))
//   .catch(error => console.error('Error:', error));
$.ajax({
    url:'http://127.0.0.1:5000/leaderboard',
  success: (data) => {
         let output=""
    data.forEach(function (data) {
      output += `
        <div class="card border-primary mb-3" style="max-width: 25rem;">
  <div class="card-header" >${data._id}</div>
  <div class="card-body text-primary">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <div class="stats" style="display: flex;flex-wrap: wrap;margin: 10px;">
      <div>
        <div class="title" style="margin-left: 10px;margin-right: 10px;">Awards</div>
        <i class="fa fa-trophy" style="margin-left: 10px;margin-right: 10px;"></i>
        <div class="value" style="margin-left: 10px;margin-right: 10px;">${data.totalScores}</div>
      </div>
      <div>
        <div class="title" style="margin-left: 10px;margin-right: 10px;">Matches</div>
        <i class="fa fa-gamepad" style="margin-left: 10px;margin-right: 10px;"></i>
        <div class="value" style="margin-left: 10px;margin-right: 10px;">27</div>
      </div>
      <div>
        <div class="title">Pals</div>
        <i class="fa fa-group"></i>
        <div class="value" style="margin-left: 10px;margin-right: 10px;">123</div>
      </div>
    </div>
  </div>
</div>
        `
    });
    document.getElementById('cardd').innerHTML=output
    }
})