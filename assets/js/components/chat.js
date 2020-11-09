function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  fetch(form.action, { method: 'POST', body: JSON.stringify({name: form.elements.name.value, message: form.elements.message.value}) });
  form.elements.message.value = '';
}

function handleMessage(stream) {
  const { name, message } = JSON.parse(stream.data);
  const container = document.querySelector('[data-component="chat-container"]');

  const wrapperDiv = document.createElement('div');
  const firstDiv = document.createElement('div');
  const secondDiv = document.createElement('div');

  wrapperDiv.classList.add('block', 'm-3');
  firstDiv.classList.add('message', 'is-info');
  secondDiv.classList.add('message-body');

  secondDiv.innerHTML = `<strong>${name}:</strong> ${message}`;
  firstDiv.appendChild(secondDiv);
  wrapperDiv.appendChild(firstDiv);

  container.appendChild(wrapperDiv);
}

function subscribeChat(chat) {
  const form = chat.querySelector('form');
  if (form) {
    const { url } = chat.dataset;
    const subscribeUrl = new URL(url);
    subscribeUrl.searchParams.append('topic', 'chat');

    const eventSource  = new EventSource(subscribeUrl);
    eventSource.onmessage = handleMessage;

    form.addEventListener('submit', handleFormSubmit);
  }
}

function init() {
  const chat = document.querySelector('[data-component="chat"]');
  if (chat) {
    subscribeChat(chat);
  }
}

export default init;
