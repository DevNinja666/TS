const keys = document.querySelectorAll<HTMLButtonElement>('#keyboard button');

document.addEventListener('keydown', (e: KeyboardEvent) => {
  keys.forEach(btn => {
    if (btn.dataset.key === e.key.toUpperCase()) {
      btn.classList.add('pressed');
    }
  });
});

document.addEventListener('keyup', (e: KeyboardEvent) => {
  keys.forEach(btn => {
    if (btn.dataset.key === e.key.toUpperCase()) {
      btn.classList.remove('pressed');
    }
  });
});
