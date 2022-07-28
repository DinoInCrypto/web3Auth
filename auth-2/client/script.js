const btn = document.getElementById('login');
const div = document.getElementById('text');

btn.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      if (ethereum.selectedAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const genRanHex = (size) =>
          [...Array(size)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');
        const nonce = genRanHex(32);
        const message = `Welcome to OpenSea!\n\nClick to sign in and accept the OpenSea Terms of Service: https://opensea.io/tos\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nWallet address:\n${ethereum.selectedAddress}\n\nNonce:\n${nonce}`;
        const address = await signer.getAddress();
        const sign = await signer.signMessage(message);

        await axios({
          method: 'POST',
          url: '/login',
          data: {
            address,
            sign,
            message,
          },
        })
          .then((res) => {
            console.log(res);
            div.innerText = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }
});
