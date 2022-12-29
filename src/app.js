const showBtn = document.getElementById('btn--show');
const backdrop = document.getElementById('backdrop');
const modal = document.getElementById('modal');
const cancleBtn = document.getElementById('btn--cancle');
const list = document.getElementById('lists');
const filter = document.getElementById('filter');
const form = document.getElementById('modal-form');
const dateInput = document.getElementById('date');
const contentInput = document.getElementById('content');
const amountInput = document.getElementById('amount');
const submitBtn = document.getElementById('btn--submit');
const alertMessage = document.getElementById('alert');

// Swiper
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  autoplay: {
    delay: 3000,
  },
  loop: true,
  spaceBetween: 10,
});

// get items from localStorage
const localStorageItems = JSON.parse(localStorage.getItem('transactions'));

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageItems : [];

// add items to list
const onAdd = (event) => {
  event.preventDefault();

  if (
    dateInput.value.trim() === '' ||
    contentInput.value.trim() === '' ||
    amountInput.value.trim() === '' ||
    +amountInput.value === 0 ||
    amountInput.value.length > 7
  ) {
    alertMessage.classList.add('visible');

    setTimeout(() => {
      alertMessage.classList.remove('visible');
    }, 1000);

    return;
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 1000000),
      date: dateInput.value,
      content: contentInput.value,
      amount: +amountInput.value,
    };

    transactions.push(transaction);
    renderList(transaction);
    updateValues();
    updateLocalStorage();
    onCancle();
    init();

    dateInput.value = '';
    contentInput.value = '';
    amountInput.value = '';
  }
};

// update account values
const updateValues = () => {
  const balance = document.getElementById('balance');
  const money_plus = document.getElementById('sum--income');
  const money_minus = document.getElementById('sum--expense');

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense =
    amounts
      .filter((item) => item < 0) //
      .reduce((acc, item) => (acc += item), 0) * -1;

  balance.textContent = `${total.toLocaleString('ko-KR')} 원`;
  money_plus.textContent = `${income.toLocaleString('ko-KR')}`;
  money_minus.textContent = `${expense.toLocaleString('ko-KR')}`;
};

// remove items from list
const onRemove = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
};

// change select options
const onFilter = (event) => {
  event.preventDefault();

  if (event.target.value === '수입') {
    list.innerHTML = '';
    const incomeTransactions = transactions.filter((item) => item.amount > 0);

    incomeTransactions.forEach((transaction) => {
      renderList(transaction);
    });
  } else if (event.target.value === '지출') {
    list.innerHTML = '';
    const expenseTransactions = transactions.filter((item) => item.amount < 0);

    expenseTransactions.forEach((transaction) => {
      renderList(transaction);
    });
  } else {
    init();
  }
};

// filter by date
const sortDate = () => {
  return transactions.sort((a, b) => (a.date < b.date ? 1 : -1));
};

// set items localStorage
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// render list
const renderList = (transaction) => {
  const date = new Date(transaction.date);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.toLocaleString('en-US', { day: '2-digit' });

  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add('list', transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  <div class="item">
    <div class="date">
      <div id="date__year" class="date__year">${year}</div>
      <div id="date__month" class="date__month">${month}</div>
      <div id="date__day" class="date__day">${day}</div>
    </div>
  <span id="content" class="content">${transaction.content}</span>
  <span id="num" class="num">${sign} ${Math.abs(
    transaction.amount
  ).toLocaleString('ko-KR')}</span>
</div>
<div class="btn-container">
  <button id="btn--delete" class="remove-btn" onclick="onRemove(${
    transaction.id
  })" >삭제</button>
</div>
  `;

  list.appendChild(item);
};

// Modal
const onCancle = () => {
  modal.classList.remove('visible');
  toggleBackdrop();

  dateInput.value = '';
  contentInput.value = '';
  amountInput.value = '';
};

const onClickBackdrop = () => {
  onShowModal();
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const onShowModal = () => {
  modal.classList.toggle('visible');
  toggleBackdrop();
};

// initailize
const init = () => {
  filter.options[0].selected = true;
  sortDate();
  list.innerHTML = '';

  transactions.forEach(renderList);
  updateValues();
};

init();

// eventListners
showBtn.addEventListener('click', onShowModal);
backdrop.addEventListener('click', onClickBackdrop);
cancleBtn.addEventListener('click', onCancle);
form.addEventListener('submit', onAdd);
filter.addEventListener('change', onFilter);
