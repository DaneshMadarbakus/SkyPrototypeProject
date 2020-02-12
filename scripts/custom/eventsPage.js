window.addEventListener('DOMContentLoaded', () => {
  console.log('DANESH')
  const eventList = document.getElementsByClassName('event-list')[0];
  const newsButton = document.getElementsByClassName('news-switch')[0];
  const sportsButton = document.getElementsByClassName('sports-switch')[0];
  console.log(newsButton)
  function renderEvents (type) {
    eventList.innerHTML = '';
    fetch(`https://skylabsweek.firebaseio.com/${type}.json`)
    .then(res => res.json())
    .then(
      response => {
        console.log('Danesh', response, type);

        response.events.forEach(event => {
          const htmlNode = document.createElement('li');
          const string = `event-li`;
          htmlNode.classList.add(string);
          htmlNode.innerHTML =`<a href="./pages/event.html?t=${type}&i=${event.id}"></a>
          <h2>${event.name}</h2>
          <div class="image-holder"><img src="./images/sky.png"></div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...</p>`
          eventList.appendChild(htmlNode);
        });
      },
      error => {
        console.log(error);
      }
    );
  };
  newsButton.addEventListener('click', () => renderEvents('news'));
  sportsButton.addEventListener('click', () => renderEvents('sports'));

});