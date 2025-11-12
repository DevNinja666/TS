const btn = document.getElementById('btn1') as HTMLButtonElement;

btn.addEventListener('mouseenter', () => {
  btn.classList.add('hovered');
});

btn.addEventListener('mouseleave', () => {
  btn.classList.remove('hovered');
});
