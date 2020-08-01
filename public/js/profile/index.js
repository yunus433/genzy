window.onload = () => {
  const user = JSON.parse(document.getElementById('user-object').value);

  const paymentNumberWrapper = document.querySelector('.payment-number-wrapper');

  document.addEventListener('click', event => {
    if (event.target.className == 'get-credit-button' || event.target.parentNode.className == 'get-credit-button') {
      if (user.payment_number)
        return window.location = "/profile/payment";

      paymentNumberWrapper.style.display = 'flex';
    }

    if (event.target.className == 'close-payment-button')
      paymentNumberWrapper.style.display = 'none';
  });
}
