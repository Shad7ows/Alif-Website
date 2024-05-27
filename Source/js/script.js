document.addEventListener('DOMContentLoaded', function () {
  const hamburgerCheckbox = document.getElementById('hamburger');
  const navUl = document.querySelector('header ul');

  hamburgerCheckbox.addEventListener('change', function () {
    if (hamburgerCheckbox.checked) {
      navUl.classList.add('open');
    } else {
      navUl.classList.remove('open');
    }
  });
});
