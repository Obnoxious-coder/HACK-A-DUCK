$(function () {
  // console.log(window.location.href)
  var i = 0;
  var numberOfQuestions;
  var question;
  var options;
  var answer;
  // var questions = [
  //   `Who is known as the 'IRON MAN OF INDIA' ?`,
  //   `Grand Central Terminal, Park Avenue, New York is the world's`,
  //   `WHO stands for`,
  //   `Which of the following is the capital of Arunachal Pradesh?`,
  //   `The World Largest desert is ?`,
  // ];
  // var options = [
  //   [
  //     "Jamshedji Tata",
  //     "Mahatma Gandhi",
  //     "Sardar Vallabhbhai Patel",
  //     "LalBahadur Shastri",
  //   ],
  //   [
  //     "Largest airport terminal",
  //     "Largest shopping complex",
  //     "Largest train station",
  //     "Largest airport",
  //   ],
  //   [
  //     "World Hormonal Organisation",
  //     "World Humans Organisation",
  //     "World Health Organisaion",
  //     "World Healing Organisation",
  //   ],
  //   ["Aizawl", "Kohima", "Imphal", "Itanagar"],
  //   ["Antarctic", "Sahara", "Thar", "Kalahari"],
  // ];
  // var answers = [];
  var query = new URLSearchParams(window.location.href.split("?")[1]);
  var title = query.get("cat");
  $("#quizTitle").append(title);
  $("#startQuiz").on("click", () => {
    $.ajax({
      method: "POST",
      data: JSON.stringify({ category: title }),
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://127.0.0.1:5000/quiz",
      dataType: "json",
      success: (res) => {
        numberOfQuestions = res.count;
        $("#maxQuestions").text(numberOfQuestions);
        nextQuestion(i);
      },
    });
    $("#quizRules").hide();
    $("#quizBody").show();
    i = 1;
    $("#currentQuestion").text(i);
    $("#quizBottom").show();
    $("#quizTimer").show();
  });
  //   $("#prevQuestion").on("click", () => {
  //     if (i > 0) {
  //       i--;
  //       $("#currentQuestion").text(i);
  //       $("#question").text(questions[i - 1]);
  //       $("#option1").text(options[i - 1][0]);
  //       $("#option2").text(options[i - 1][1]);
  //       $("#option3").text(options[i - 1][2]);
  //       $("#option4").text(options[i - 1][3]);
  //     }
  //   });
  $("#nextQuestion").on("click", () => {
    if (i < numberOfQuestions) {
      //   ans = $("[data-value=1]")[0];
      //   console.log(ans.attr("data-option"));
      //   console.log($("[data-value=1]")[0].attributes[4]);
      i++;
      submitQuestion(i, `${answer}`);
      $(".option").removeAttr("data-value");
      $(".option").css("background-color", "black");
      $("#currentQuestion").text(i);
      i == numberOfQuestions ? $("#submitButton").show() : "";
      i == numberOfQuestions ? $("#nextQuestion").hide() : "";
    }
  });
  $(".option").on("click", function (e) {
    $(".option").removeAttr("data-value");
    $(".option").css("background-color", "black");
    $(this).attr("data-value", 1);
    $(this).css("background-color", "white");
    answer = "";
    answer = $(this).val();
    // console.log(answer);
  });
  $("#submitButton").on("click", () => {
    submitQuiz(i, `${answer}`);
  });
  $("#input input").on("input", function (e) {
    answer = "";
    var answer = $(this).val();
    // console.log(answer);
  });
});

function nextQuestion(id) {
  // console.log(session);
  // sessionStorage.setItem("answers", id);
  $.ajax({
    method: `GET`,
    url: `http://127.0.0.1:5000/quiz/${id}`,
    success: (res) => {
      console.log(res);
      question = res.text;
      $("#question").text(question);
      options = res.option ?? res.option;
      options ? addOptions(options) : addAnswerInput();
    },
    error: (e) => {
      console.log(e);
    },
  });
  // fetch(`http://127.0.0.1:5000/quiz/${id}`, {
  //   method: "GET",
  //   credentials: "same-origin",
  //   mode: "cors",
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.log(error));
}
function addOptions(options) {
  $("#options").show();
  $("#input").hide();
  $("#option1").text(options["1"]).attr("data-option", "0").val("1");
  $("#option2").text(options["2"]).attr("data-option", "1").val("2");
  $("#option3").text(options["3"]).attr("data-option", "2").val("3");
  $("#option4").text(options["4"]).attr("data-option", "3").val("4");
}
function addAnswerInput() {
  $("#input input").val("");
  $("#input").show();

  $("#options").hide();
}
function submitQuestion(id, ans) {
  $.ajax({
    method: "POST",
    data: JSON.stringify({ answer: ans }),
    headers: {
      "Content-Type": "application/json",
    },
    dataType: "json",
    url: `http://127.0.0.1:5000/quiz/${id - 1}`,
    success: (res) => {
      console.log(res);
      nextQuestion(id);
    },
  });
}
function submitQuiz(id, ans) {
  $.ajax({
    method: "POST",
    data: JSON.stringify({ answer: ans }),
    headers: {
      "Content-Type": "application/json",
    },
    dataType: "json",
    url: `http://127.0.0.1:5000/quiz/${id - 1}`,
    success: (res) => {
      // console.log(res);
      console.log(localStorage.getItem("email"));
      $.ajax({
        method: "POST",
        data: JSON.stringify({ email: localStorage.getItem("email") }),
        headers: {
          "Content-Type": "application/json",
        },
        dataType: "json",
        url: `http://127.0.0.1:5000/quiz/submit`,
        success: (res) => {
          console.log(res);
          alert(`You Scored ${res.score}`);
          window.location.replace("http://127.0.0.1:5501/frontend/home.html");
        },
      });
    },
  });
}
