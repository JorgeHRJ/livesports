function getCurrentDate() {
  const today = new Date();
  const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return date + ' ' + time;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  fetch(form.action, { method: 'POST', body: JSON.stringify({date: getCurrentDate(), message: form.elements.message.value}) });
  form.elements.message.value = '';
}

function initUpdate() {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function handleMessage(stream) {
  const { date, message } = JSON.parse(stream.data);
  const container = document.querySelector('[data-component="feed-container"]');

  const wrapperDiv = document.createElement('div');
  const firstDiv = document.createElement('div');
  const secondDiv = document.createElement('div');

  wrapperDiv.classList.add('block', 'm-3');
  firstDiv.classList.add('message', 'is-dark');
  secondDiv.classList.add('message-body');

  secondDiv.innerHTML = `<strong>${date}:</strong> ${message}`;
  firstDiv.appendChild(secondDiv);
  wrapperDiv.appendChild(firstDiv);

  container.appendChild(wrapperDiv);
}

function subscribeFeed(feedComponent) {
  const { url } = feedComponent.dataset;
  const subscribeUrl = new URL(url);
  subscribeUrl.searchParams.append('topic', 'feed');

  const eventSource  = new EventSource(subscribeUrl);
  eventSource.onmessage = handleMessage;
}

function init() {
  const feedComponent = document.querySelector('[data-component="feed"]');
  if (feedComponent) {
    const feedContainer = document.querySelector('[data-component="feed-container"]');
    if (feedContainer) {
      subscribeFeed(feedComponent);
    }

    const feedUpdate = document.querySelector('[data-component="feed-update"]');
    if (feedUpdate) {
      initUpdate();
    }
  }
}

export default init;
