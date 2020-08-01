const createQuestion = (wrapper, question) => {
  const new_question = document.createElement('div');
  new_question.classList.add('each-added-question');

  const trash = document.createElement('i');
  trash.classList.add('fas');
  trash.classList.add('fa-trash');
  trash.classList.add('question-delete-button');
  trash.id = question._id;
  new_question.appendChild(trash);

  const text = document.createElement('span');
  text.classList.add('question-info');
  text.innerHTML = question.text;
  new_question.appendChild(text);

  if (question.type == 'short_text') {
    const type = document.createElement('span');
    type.classList.add('question-info');
    type.innerHTML = "Tip: Kısa Yazılı";
    new_question.appendChild(type);
  } else if (question.type == 'long_text') {
    const type = document.createElement('span');
    type.classList.add('question-info');
    type.innerHTML = "Tip: Uzun Yazılı";
    new_question.appendChild(type);
  } else if (question.type == 'radio') {
    const type = document.createElement('span');
    type.classList.add('question-info');
    type.innerHTML = "Tip: Tek Seçmeli";
    new_question.appendChild(type);

    question.choices.forEach(choice => {
      const eachChoice = document.createElement('span');
      eachChoice.classList.add('question-info');
      eachChoice.innerHTML = '-' + choice;
      new_question.appendChild(eachChoice);
    });
  } else if (question.type == 'checked') {
    const type = document.createElement('span');
    type.classList.add('question-info');
    type.innerHTML = "Tip: Çok Seçmeli";
    new_question.appendChild(type);

    question.choices.forEach(choice => {
      const eachChoice = document.createElement('span');
      eachChoice.classList.add('question-info');
      eachChoice.innerHTML = '-' + choice;
      new_question.appendChild(eachChoice);
    });
  } 

  wrapper.appendChild(new_question);
}

window.onload = () => {
  const campaign = JSON.parse(document.getElementById('campaign-json').value);
  let questions = campaign.questions;
  
  document.addEventListener('click', event => {
    if (event.target.className == 'new-campaign-button' || event.target.parentNode.className == 'new-campaign-button') {
      document.querySelector('.all-content-inner-wrapper').style.display = 'none';
      document.querySelector('.new-form-wrapper').style.display = 'flex';
    }

    if (event.target.className == 'back-button') {
      document.querySelector('.all-content-inner-wrapper').style.display = 'flex';
      document.querySelector('.new-form-wrapper').style.display = 'none';
    }

    const campaignQuestionsInput = document.getElementById('campaign-questions-input');
    const questionTextInput = document.getElementById('question-text-input');
    const typeInputs = document.querySelectorAll('.question-type-input');
    const questionChoicesInput = document.getElementById('question-choices-input');

    if (event.target.className == 'add-question-button') {
      if (!questionTextInput.value.length) return;

      let type = null;
      typeInputs.forEach(input => {
        if (input.checked) {
          type = input.value;
          input.checked = false;
        }
      });

      if (!type) return;

      if ((type == 'radio' || type == 'checked') && !questionChoicesInput.value.length) return;

      const new_question = {
        _id: Math.random().toString(36).substr(2, 9),
        text: questionTextInput.value,
        type,
        choices: (type == 'radio' || type == 'checked') ? questionChoicesInput.value.split(',').map(e => e.trim()) : null
      };

      questions.push(new_question)

      campaignQuestionsInput.value = JSON.stringify(questions);

      createQuestion(document.querySelector('.questions-wrapper'), new_question);
      questionTextInput.value = "";
      questionChoicesInput.value = "";
    }

    if (event.target.classList.contains('question-delete-button')) {
      event.target.parentNode.remove();
      questions = questions.filter(question => question._id != event.target.id);
    }
  });
}
