function dropdown() {
  $("#categoryDropdown").empty();
  $("#categoryDropdown").append(
    `<option value="0">---Please Select a Category---</option>`
  );
  $.ajax({
    url: "http://127.0.0.1:5000/category",
    success: (res) => {
      // console.log(res[0]["_id"]);
      res.forEach((cat) => {
        $("#categoryDropdown").append(`<option value=${cat}>${cat}</option>`);
      });
    },
  });
}
dropdown();
$("#addCategoryButton").on("click", () => {
  $("#addCategoryInput input").val("");
  $("#addCategoryInput").show();
  $("#addCategoryInput").addClass("d-flex");
  $("#categoryDropdownError").empty();
});
$("#removeCategoryInput").on("click", () => {
  $("#addCategoryInput").hide();
  $("#addCategoryInput").removeClass("d-flex");
});
$("#addNewCategoryButton").on("click", () => {
  var catName = $("#newCategory").val();
  if (catName) {
    $("#addNewCategoryButton").hide();
    $("#addCategoryLoader").show();
    $.ajax({
      method: "POST",
      data: JSON.stringify({ category: catName }),
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://127.0.0.1:5000/category",
      dataType: "json",
      success: () => {
        $("#addCategoryLoader").hide();
        $("#addCategoryInput").hide();
        $("#addCategoryInput").removeClass("d-flex");
        $("#addNewCategoryButton").show();
        $("#categoryDropdownError")
          .removeClass("text-danger")
          .addClass("text-success")
          .text("Category Added Successfully!");
        dropdown();
      },
    });
  } else {
    console.log("HELLO");
    // $("#addCategoryInputError").show();
    $("#addCategoryInputError").text("Please Enter Category to be added!");
  }
});
$("#newCategory").on("input", () => {
  $("#addCategoryInputError").empty();
});
$("#categoryDropdown").on("input", () => {
  $("#categoryDropdownError").empty();
});
$("#typeDropdown").on("input", function (e) {
  console.log($(this).find("option:selected").val());
  var type = $(this).find("option:selected").val();
  if (type == 1) {
    $("#mcqOptions").show();
  } else {
    $("#mcqOptions").hide();
    $(".option").val("");
  }
});
$("#questionText").on("input", () => {
  $("#questionTextError").empty();
});
$("#typeDropdown").on("change", () => {
  $("#typeDropdownError").empty();
});
$("#correctAnswer").on("input", () => {
  $("#correctAnswerError").empty();
});
$("#difficultyLevel").on("input", () => {
  $("#difficultyLevelError").empty();
});
$(".option").on("input", () => {
  $("#mcqOptionsError").empty();
});
$("#sumbitQuestion").on("click", () => {
  var category = $("#categoryDropdown").find("option:selected").val();
  var text = $("#questionText").val();
  var type = $("#typeDropdown").find("option:selected").val();
  var correctAnswer = $("#correctAnswer input").val();
  var difficulty = $("#difficultyLevel input").val();
  var err = 0;
  $(".option")
    .toArray()
    .forEach((option) => {
      if ($(option).val() == "") {
        err = 1;
      }
    });

  if (category == 0) {
    $("#categoryDropdownError")
      .addClass("text-danger")
      .text("Please Select/Add Category!");
  } else if (!text) {
    $("#questionTextError").text("Please Add Question.");
  } else if (!type) {
    $("#typeDropdownError").text("Please Select Type of Question!");
  } else if (type == 1 && err) {
    $("#mcqOptionsError").text("Please Enter all the Options!");
  } else if (!correctAnswer) {
    $("#correctAnswerError").text("Please Enter the Correct Answer!");
  } else if (
    correctAnswer != 1 &&
    correctAnswer != 2 &&
    correctAnswer != 3 &&
    correctAnswer != 4 &&
    type == 1
  ) {
    $("#correctAnswerError").text(
      "Please Enter the Valid Correct Answer (1-4 depending on the option)!"
    );
  } else if (!difficulty) {
    $("#difficultyLevelError").text("Please enter the difficulty Level!");
  } else if (difficulty < 1 || difficulty > 5) {
    $("#difficultyLevelError").text(
      "Please enter the valid difficulty Level (1-5)!"
    );
  } else {
    var arr = [];
    $(".option")
      .toArray()
      .forEach((option) => {
        // console.log($(option).val());
        arr.push($(option).val());
      });
    if (type == 2) {
      var data = {
        text: text,
        category: category,
        difficulty: +difficulty,
        type: +type,
        answer: `${correctAnswer}`,
      };
    } else {
      var data = {
        text: text,
        category: category,
        difficulty: +difficulty,
        type: +type,
        options: {
          1: arr[0],
          2: arr[1],
          3: arr[2],
          4: arr[3],
        },
        answer: `${correctAnswer}`,
      };
    }
    console.log(data);
    sumbitQuestion(data);
    // console.log(category, text, type, correctAnswer, difficulty);
  }
});
function sumbitQuestion(data) {
  $.ajax({
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    dataType: "json",
    data: JSON.stringify(data),
    url: "http://127.0.0.1:5000/admin",
    success: (res) => {
      console.log(res);
    },
  });
}
