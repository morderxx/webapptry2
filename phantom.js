const nextButton = document.getElementById('nextButton');
const wallets = document.querySelectorAll('.wallets img');
const result = document.getElementById('result');
let selectedWallet = '';

const isPhantomInstalled = window.phantom?.solana?.isPhantom;

const getPublicKey = async () => {
  if (isPhantomInstalled) {
    if (window.phantom.isConnected()) {
      try {
        const publicKey = await window.phantom.publicKey();
        return publicKey;
      } catch (error) {
        if (error.message === 'Request denied by user') {
          alert('Вы отказались предоставить доступ к ключу.');
        } else {
          console.error('Ошибка получения публичного ключа:', error);
          alert('Ошибка при подключении к Phantom. Попробуйте перезагрузить страницу.');
        }
        return null;
      }
    } else {
      alert('Phantom не подключен к сайту. Пожалуйста, подключите Phantom.');
      return null;
    }
  } else {
    alert('Phantom Wallet не установлен!');
    return null;
  }
};

wallets.forEach(wallet => {
  wallet.addEventListener('click', () => {
    wallets.forEach(w => w.classList.remove('selected'));
    wallet.classList.add('selected');
    selectedWallet = wallet.alt;
  });
});

nextButton.addEventListener('click', async () => {
  if (selectedWallet === '') {
    alert('Пожалуйста, выберите кошелек!');
    return;
  }

  if (selectedWallet === 'Phantom') {
    const publicKey = await getPublicKey();
    if (publicKey) {
      result.textContent = `Ваш публичный ключ: ${publicKey}`;
    }
  } else {
    result.textContent = `Вы выбрали кошелек: ${selectedWallet}`;
  }
});