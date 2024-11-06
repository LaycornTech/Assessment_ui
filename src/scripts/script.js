window.onload = function () {
  axios
    .get("http://localhost:3000/api/assessments/1/questions")
    .then((response) => {
      const assessments = response.data;
      console.log("Assessments data:", assessments);
      // get the target element by its ID
      const currentQuestionElement = document.getElementById("questionNumber");
      const totalQuestionsElement = document.getElementById("questionTotal");
      // questionText
      const questionTextElement = document.getElementById("questionText");
      // next button
      const nextButton = document.getElementById("nextButton");

      // get the current question
      let currentQuestionIndex = 0;
      function getCurrentQuestion(index) {
        if (questionIsExhausted()) {
          return null;
        }
        const currentQuestion = assessments[index];
        return currentQuestion;
      }

      // function to check if it is the last question
      function questionIsExhausted() {
        return currentQuestionIndex >= assessments.length;
      }

      // function question index
      function updateCurrentQuestionIndex() {
        currentQuestionIndex++;
      }
      // function to display the question
      function displayQuestion(question) {
        totalQuestionsElement.innerText = assessments.length;
        console.log("Current question index:", currentQuestionIndex);
        currentQuestionElement.innerText = currentQuestionIndex + 1;
        const options = question.options;
        console.log("Options:", options);

        questionTextElement.innerText = question.text;
        // iterate over question options
        options.forEach((optionText, index) => {
          const optionElement = document.getElementById(
            "option-" + (index + 1)
          );
          optionElement.innerText = optionText;
        });

        // update the current question index
        updateCurrentQuestionIndex();
        nextButton.innerHTML = questionIsExhausted() ? "Submit" : "Next";
      }

      // Call the displayQuestion function with the first question
      const question = getCurrentQuestion(currentQuestionIndex);
      displayQuestion(question);

      // Add event listener to the "Next" button
      nextButton.addEventListener("click", () => {
        const currentQuestion = getCurrentQuestion(currentQuestionIndex);
        if (currentQuestion)
          displayQuestion(currentQuestion);
      });
    })
    .catch((error) => {
      console.log("Error fetching assessments:", error);
    });
};
