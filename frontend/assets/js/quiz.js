$(function () {
  // console.log(window.location.href)
  var i = 0;
  var questions = [
    `Who is known as the 'IRON MAN OF INDIA' ?`,
    `Grand Central Terminal, Park Avenue, New York is the world's`,
    `WHO stands for`,
    `Which of the following is the capital of Arunachal Pradesh?`,
    `The World Largest desert is ?`,
  ];
  var options = [
    [
      "Jamshedji Tata",
      "Mahatma Gandhi",
      "Sardar Vallabhbhai Patel",
      "LalBahadur Shastri",
    ],
    [
      "Largest airport terminal",
      "Largest shopping complex",
      "Largest train station",
      "Largest airport",
    ],
    [
      "World Hormonal Organisation",
      "World Humans Organisation",
      "World Health Organisaion",
      "World Healing Organisation",
    ],
    ["Aizawl", "Kohima", "Imphal", "Itanagar"],
    ["Antarctic", "Sahara", "Thar", "Kalahari"],
  ];
  var answers = [];
  var query = new URLSearchParams(window.location.href.split("?")[1]);
  var title = query.get("cat");
  $("#quizTitle").append(title);
  $("#startQuiz").on("click", () => {
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
    if (i < 5) {
      //   ans = $("[data-value=1]")[0];
      //   console.log(ans.attr("data-option"));
      //   console.log($("[data-value=1]")[0].attributes[4]);
      i++;
      $(".option").removeAttr("data-value");
      $(".option").css("background-color", "black");
      $("#currentQuestion").text(i);
      $("#question").text(questions[i - 1]);
      $("#option1")
        .text(options[i - 1][0])
        .attr("data-option", "0");
      $("#option2")
        .text(options[i - 1][1])
        .attr("data-option", "1");
      $("#option3")
        .text(options[i - 1][2])
        .attr("data-option", "2");
      $("#option4")
        .text(options[i - 1][3])
        .attr("data-option", "3");
    }
  });
  $(".option").on("click", function (e) {
    $(".option").removeAttr("data-value");
    $(".option").css("background-color", "black");
    $(this).attr("data-value", 1);
    $(this).css("background-color", "white");
  });
});
