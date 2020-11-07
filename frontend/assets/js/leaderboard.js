fetch("http://127.0.0.1:5000/leaderboard")
    .then(res => {
      console.log(res)
    res.json()
  })
    .then(res=>console.log(res))
  .catch(error => console.error('Error:', error));