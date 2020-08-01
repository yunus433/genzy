window.onload = () => {
  const campaign_id = document.getElementById('campaign-id-json').value;
  const answers = JSON.parse(document.getElementById('answers-json').value);

  document.addEventListener('input', event => {
   if (event.target.type == 'checkbox') {
    if (!event.target.checked)
      answers[event.target.id] = answers[event.target.id].filter(answer => answer != event.target.value)
    else
      answers[event.target.id].push(event.target.value);
   } else {
     answers[event.target.id] = event.target.value;
   }
  });

  document.addEventListener('click', event => {
    if (event.target.className == 'save-button') {
      event.target.classList.add('clicked');
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/test?id=" + campaign_id);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.send(JSON.stringify({ answers }));

      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE)
          if (xhr.status == 200)
            return window.location = "/history";
          else
            return window.location = "/campaign";
      }
    }

    if (event.target.className == 'submit-button') {
      if (answers.filter(answer => !answer.length).length)
        return alert("Lütfen bütün soruları doldurun");

      event.target.classList.add('clicked');

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/test/submit?id=" + campaign_id);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.send(JSON.stringify({ answers }));

      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE)
          return window.location = "/history";
      }
    }
  })
}
