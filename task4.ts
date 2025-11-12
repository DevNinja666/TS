const area = document.getElementById('menuArea') as HTMLDivElement;
const menu = document.getElementById('customMenu') as HTMLUListElement;


area.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault();
  menu.style.display = 'block';
  menu.style.left = e.pageX + 'px';
  menu.style.top = e.pageY + 'px';
});


document.addEventListener('click', () => {
  menu.style.display = 'none';
});
