document.addEventListener('DOMContentLoaded', function () {
  const MenuCheckbox = document.getElementById('lines');
  const NavUl = document.querySelector('.menu-section');
  const PageClose = document.querySelector('.page');

  MenuCheckbox.addEventListener('change', function () {
    if (MenuCheckbox.checked) {
      NavUl.classList.add('open');
      PageClose.classList.add('close');
    } else {
      NavUl.classList.remove('open');
      PageClose.classList.remove('close');
    }
  });
});
