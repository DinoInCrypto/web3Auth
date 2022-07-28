const connect = document.getElementById('connect');
const send = document.getElementById('send');

connect.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      if (ethereum.selectedAddress) {
        send.style.visibility = null;
        console.log(ethereum.selectedAddress);
      }
    } catch (err) {
      console.error(err);
    }
  }
});

send.addEventListener('click', async () => {
  const transactionParameters = {
    from: ethereum.selectedAddress,
    to: '0xD79f479f56Dac4E4102f4189Ae550adc391eb167',
    value: '0x29a2241af62c0000',
  };
  try {
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
  } catch (err) {
    console.error(err);
  }
});
