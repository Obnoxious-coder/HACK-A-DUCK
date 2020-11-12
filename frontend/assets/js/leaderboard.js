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
  url: "http://127.0.0.1:5000/leaderboard",
  success: (data) => {
    let output = "";
    data.forEach(function (data) {
      console.log(data);
      output += `
        <div class="card border-primary mb-3" style="max-width: 25rem;">
  <div class="card-header" >${data._id["name"]}</div>
  <div class="card-body text-primary">
    <h5 class="card-title">${data._id["email"]}</h5>
    <p class="card-text">User bio to build on the card title and make up the bulk of the card's content.</p>
    <div class="stats" style="display: flex;flex-wrap: wrap;margin: 10px;">
      <div>
        <div class="title" style="margin-left: 10px;margin-right: 10px;">Awards</div>
        <i class="fa fa-trophy" style="margin-left: 10px;margin-right: 10px;"></i>
        <div class="value" style="margin-left: 10px;margin-right: 10px;font-weight:bolder">${data.totalScores}</div>
      </div>
      <div>
        <div class="title" style="margin-left: 10px;margin-right: 10px;">Quizzes</div>
        <i class="fa fa-gamepad" style="margin-left: 10px;margin-right: 10px;"></i>
        <div class="value" style="margin-left: 10px;margin-right: 10px;font-weight:bolder">27</div>
      </div>
      <div>
        <div class="title">Coffee</div>
        <i class="fas fa-mug-hot"></i>
        <div class="value" style="margin-left: 10px;margin-right: 10px;"><i class="fas fa-infinity"></i></div>
      </div>
    </div>
  </div>
</div>
        `;
    });
    document.getElementById("cardd").innerHTML = output;
  },
});
