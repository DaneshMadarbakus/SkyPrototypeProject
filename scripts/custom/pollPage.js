window.addEventListener('DOMContentLoaded', () => {
  const eventHeader = document.getElementsByClassName('event-header')[0];
  const pollList = document.getElementsByClassName('poll-list')[0];
  const url = window.location.href;
  const eventId = url.substring(url.indexOf('&i=') +3);
  const eventType = url.substring(url.indexOf('?t=') +3, url.indexOf('&i='));
  const addNewOptionBtn = document.getElementsByClassName('add-option')[0];
  const optionsList = document.getElementsByClassName('options-list')[0];
  const submitBtn = document.getElementsByClassName('submit-btn')[0];

  function renderPolls (eventType, eventId) {
    fetch(`https://skylabsweek.firebaseio.com/${eventType}/events.json`)
    .then(res => res.json())
    .then(
      response => {
        const event = response.find(x => x.id === eventId);
        console.log('Danesh', response);
        console.log('Danesh', event);
        eventHeader.innerHTML = event.name;
        event.polls.forEach(poll => {
          const htmlLiNode = document.createElement('li');
          htmlLiNode.classList.add("poll-li")
          htmlLiNode.classList.add(`poll-is-${poll.status}`)

          const totalResponses = poll.responses.reduce((a, b) => a + b, 0);

          const optionsHTML = poll.options.map((option, i) => {
            const htmlOptionNode = document.createElement('li');
            const percentage = poll.responses ? ` ${((poll.responses[i] / totalResponses) * 100).toFixed(2)}%` : '';
            htmlOptionNode.innerHTML = `
            <li><span class="option-span">${option}</span><span class="li-result"><span class="perbar" style="width: ${percentage}"></span> <span>${percentage}</span></span></li>
            `
            return htmlOptionNode.innerHTML;
          }).join('');

          htmlLiNode.innerHTML = `
          <h2>${poll.question}</h2>
          <ul class="options">
            ${optionsHTML}
          </ul>
          <div class="buttons-state">
            <p class="poll-new-p">Start poll</p>
            <button class="start-button">Start</button>
            <p class="poll-active-p">Poll live <svg id="Capa_1" enable-background="new 0 0 443.294 443.294" height="512" viewBox="0 0 443.294 443.294" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg></p>
            <button class="stop-button">Stop</button>
            <p class="complete">Poll complete</p>
          </div>
           `;
          pollList.appendChild(htmlLiNode);
        });

      },
      error => {
        console.log(error);
      }
    );
  };

  function addNewOption () {
    const option = document.createElement('li')
    // const numberOfOptions = optionsList.childElementCount;
    option.innerHTML = `
    <input type="text" placeholder="option" />
    `
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-option');
    removeButton.type = 'button';
    removeButton.innerHTML = 'remove option';

    removeButton.addEventListener('click', () => {
      removeButton.parentNode.remove();
    });
    option.appendChild(removeButton);
    optionsList.appendChild(option);
  }

  addNewOptionBtn.addEventListener('click', addNewOption);
  renderPolls(eventType, eventId);
  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // fetch(`https://skylabsweek.firebaseio.com/sports/events/2/.json`, {
    //   method: 'PUT',
    //   body: {"id": "AAA2", "name": "New Event", "polls": [{}], "status": "new"}
    // })
    // .then(
    //   response => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
  });
});