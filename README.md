# ๐ฏ ๊ฐ๊ณ๋ถ ์ฑ, '๊ฟ์๋น' ํ ์ดํ๋ก์ ํธ

![honey-thumb](https://user-images.githubusercontent.com/90844424/210034736-a5799b0c-f554-40de-86cf-abd5cccac867.jpg)

<br/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/abf9be66-f2c7-4dab-a70c-1411602c81ac/deploy-status)](https://app.netlify.com/sites/conatus-js-expense-tracker/deploys) | [Live Demo](https://conatus-js-expense-tracker.netlify.app/)

<br/>
<br/>

# 1. ํ๋ก์ ํธ ์๊ฐ

## 1.1. ํ๋ก์ ํธ ์ค๋ช

๋ณธ ํ๋ก์ ํธ๋ **๊ฐ๊ณ๋ถ ์ ํ๋ฆฌ์ผ์ด์** ์๋๋ค. ๋ชจ๋ฐ์ผ ์ ์ฉ์ผ๋ก ๊ธฐํํ์ฌ ์์ดํฐ(iPhone 14, 13Pro, 13, 12Pro) ๋น์จ์ ๋ง์ถฐ ์์ํ์ต๋๋ค. <u>์ฃผ์ ๊ธฐ๋ฅ์ ์์๊ณผ ์ง์ถ์ ์๋ ฅํ์ฌ ๊ฑฐ๋ ๋ด์ญ์ ํฉ์ฐํ๋ ๊ฒ</u>์๋๋ค. ์ด๋ฌํ ๊ฐ๋จํ ๊ธฐ๋ฅ์ ๋ถํฉํ๋ ์ฌ์ฉ์ ๊ฒฝํ์ ๊ตฌํํ๊ณ ์ ์ฑ๊ธํ์ด์ง์ ์ฌํํ๊ณ  ์ง๊ด์ ์ผ๋ก ๋์์ธํ์ต๋๋ค.

<br/>

## 1.2. ์ ์ ๊ธฐ๊ฐ & ์ฐธ์ฌ ์ธ์

- 2022-12-23 ~ 2022-12-26
- ๊ฐ์ธ ํ๋ก์ ํธ (1์ธ)

<br/>
<br/>

# 2. ์ฌ์ฉ ๊ธฐ์ 

![HTML](https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![SCSS](https://img.shields.io/badge/Sass-bf4080?style=for-the-badge&logo=Sass&logoColor=ffffff) ![JAVASCRIPT](https://img.shields.io/badge/JavaScript-f6e158?style=for-the-badge&logo=JavaScript&logoColor=ffffff) ![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>

# 3. ์ฃผ์ ๊ธฐ๋ฅ

## 3.1. ๊ฑฐ๋ ๋ด์ญ ์ถ๊ฐ

![honey-add](https://user-images.githubusercontent.com/90844424/210037931-340bad88-8393-46db-b887-b93b5465cfa1.gif)

์ฌ์ฉ์๊ฐ ๋ ์ง์ ๋ด์ฉ, ๊ธ์ก์ ์๋ ฅํ์ฌ ํญ๋ชฉ์ ์ถ๊ฐํ  ์ ์์ต๋๋ค. ์๋ ฅ ์ ๊ณต๋ฐฑ ์ ๊ฑฐ์ ์ต๋ ๊ธ์์ ์กฐ๊ฑด์ ๋ถ์ฌํ์ฌ ๊ฐ๋จํ ์ ํจ์ฑ ๊ฒ์ฌ๋ฅผ ์ํํฉ๋๋ค. ์๋ ฅ๊ฐ์ด ์ ํจํ๋ค๋ฉด transaction์ ์๋ ฅ๊ฐ์ ํ ๋นํ๊ณ  ๋ก์ปฌ์คํ ๋ฆฌ์ง์ ์ ์ฅํฉ๋๋ค. ์์ ์ ์ถ ํ์๋ ์๋ ฅ์นธ์ด ์ด๊ธฐํ๋ฉ๋๋ค.

```js
// Add transaction to list
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
```

<br/>

## 3.2. ๋ก์ปฌ ์คํ ๋ฆฌ์ง ์ ์ฅ ๋ฐ UI ์๋ฐ์ดํธ

![honey-localstorage](https://user-images.githubusercontent.com/90844424/210038137-4d336365-dc81-44d1-80a2-ed47f838aa76.gif)

updateLocalStorage() ํจ์๋ฅผ ๋ง๋ค์ด์ ์ฌ์ฉ์๊ฐ ์ ์ถํ ์์ ๋ฐ์ดํฐ๋ฅผ ๋ก์ปฌ์คํ ๋ฆฌ์ง์ ์ ์ฅ ๊ฐ๋ฅํ๊ฒ ํ์ต๋๋ค. ์ด ํจ์๋ ํญ๋ชฉ์ ์ญ์ ํ  ๋๋ ํธ์ถ๋๋ฉฐ, ํ๋ฉด์์ ๋ฐ์ดํฐ์ ํธํ๋ฉ๋๋ค.

```js
// Save data in localStorage
const localStorageItems = JSON.parse(localStorage.getItem('transactions'));

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};
```

<br/>

์๋ก์ด ์์ดํ์ ์ถ๊ฐํ  ๋ renderList() ํจ์๊ฐ ํธ์ถ๋์ด ํผ์ ์ ๋ฌ๋ ๊ฐ์ HTML๋ก ์ถ๋ ฅํ๊ณ , DOM ๋ชฉ๋ก์ ๋ฐ์ํฉ๋๋ค. ๋ชฉ๋ก์ ๊ฐ๋์ฑ์ด ์ข๋๋ก ์คํ์ผ๋งํ๊ธฐ ์ํด์ transaction์ ๋ ์ง๋ฅผ ๋ฐ์์ ๊ฐ๊ฐ div ํ๊ทธ ์์ ๋ฐฐ์นํ์์ต๋๋ค. ๋ํ ํฉ์ฐ์ ์ฉ์ดํ๋๋ก Math.abs() ๋ฉ์๋๋ฅผ ์ด์ฉํ์ฌ ๊ฐ์ ์์๋ก ์ ํ ํ, ์์์ ์์์ ๋ง๊ฒ ๊ธฐํธ(`+`, `-`)๋ฅผ ๋ถ์ฌ์ฃผ์์ต๋๋ค.

```js
// Render list
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
  })" >์ญ์ </button>
</div>
  `;

  list.appendChild(item);
};
```

<br/>

## 3.3. ๊ฑฐ๋ ๋ด์ญ ํฉ์ฐ

![honey-acc](https://user-images.githubusercontent.com/90844424/210036839-c1883559-9b8e-41d4-a562-c1a9f3060499.jpg)

updateValues() ํจ์๋ฅผ ํตํด ์์๊ณผ ์ง์ถ์ ํฉ๊ณ๋ฅผ ๋ํ๋ด๋๋ก ํ์ต๋๋ค. ์์๊ณผ ์ง์ถ์ ๊ฐ๊ฐ Array.filter()์ Array.reduce() ๋ฉ์๋๋ฅผ ์ฌ์ฉํด ์๊ณ๋ฅผ ๊ณ์ํด์ ๋ง๋ถ์ฌ ํฉ์ฐ๋๋๋ก ํ์ต๋๋ค. ๋ํ Array.toLocaleString() ๋ฉ์๋๋ก ์ก์์ ์ฒ ๋จ์๋ง๋ค ์ฝค๋ง(,)๋ฅผ ํ์ํ์ต๋๋ค.

```js
// Update account values
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

  balance.textContent = `${total.toLocaleString('ko-KR')} ์`;
  money_plus.textContent = `${income.toLocaleString('ko-KR')}`;
  money_minus.textContent = `${expense.toLocaleString('ko-KR')}`;
};
```

<br/>

## 3.4. ๊ฑฐ๋ ๋ด์ญ ์ญ์ 

![honey-remove](https://user-images.githubusercontent.com/90844424/210038520-272d80a4-7deb-4008-a4e0-3bae06c90afe.gif)

ํญ๋ชฉ์ ๋ง์ฐ์ค ์ค๋ฒ ์ ์ญ์  ๋ฒํผ์ด ๋ํ๋ ํด๋น ์์ดํ์ ์ญ์ ํ  ์ ์์ต๋๋ค. Array.filter() ๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ์ญ์ ํ๊ณ ์ ํ๋ ํญ๋ชฉ์ id ๊ฐ๊ณผ ์ ๋ฌ๋ id๊ฐ์ด ๊ฐ์ง ์์ transaction ๋ชฉ๋ก์ ํํฐ๋งํฉ๋๋ค.

```js
// Remove items from list
const onRemove = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
};
```

<br/>

## 3.5. ๊ฑฐ๋ ๋ชฉ๋ก ๋ ์ง ์ ๋ ฌ

![honey-date](https://user-images.githubusercontent.com/90844424/210037077-564021f0-4567-4271-a4ce-ac612625b572.jpg)

๊ฑฐ๋ ๋ด์ญ์ ๋ฑ๋กํ ์์๊ฐ ์๋๋ผ, ๊ฐ์ฅ ์ต์  ํญ๋ชฉ์ด ์์ ๋ณด์ด๋๋ก ๋ ์ง๋ฅผ ๋ด๋ฆผ์ฐจ์์ผ๋ก ์ ๋ ฌํ์ต๋๋ค. ํผ์ ์ ์ถํ  ๋๋ง๋ค init() ํจ์์์ ํธ์ถ๋ฉ๋๋ค.

```js
// Sort by date
const sortDate = () => {
  return transactions.sort((a, b) => (a.date < b.date ? 1 : -1));
};

// Initialize
const init = () => {
  filter.options[0].selected = true;
  sortDate();
  list.innerHTML = '';

  transactions.forEach(renderList);
  updateValues();
};
```

<br/>

## 3.6. ๊ฑฐ๋ ๋ด์ญ ์นดํ๊ณ ๋ฆฌํ

![honey-category](https://user-images.githubusercontent.com/90844424/210038678-7fb4efac-18c2-42b9-8d9f-e40ac848c195.gif)

'์ ์ฒด', '์์', '์ง์ถ'์ด๋ผ๋ ์นดํ๊ณ ๋ฆฌ๋ฅผ ๋ง๋ค์ด ๊ฑฐ๋ ๋ชฉ๋ก์ ์ ๋ณํ  ์ ์๋๋ก ๋ง๋ค์์ต๋๋ค. ์ต์์ ๋ณ๊ฒฝํ  ๋ ์ต์ ๊ฐ๊ณผ ํ๊ฒ์ ๊ฐ์ด ๊ฐ์์ง ํ์ธํ ๋ค, ๊ธ์ก(์์/์์)์ผ๋ก ํํฐ๋งํฉ๋๋ค. ์ด๋ ๊ฒ ๋ง๋ค์ด์ง ์๋ก์ด ๋ฐฐ์ด์ renderList() ํจ์์ ์ ๋ฌํ์ฌ ํ๋ฉด์ ๋ ๋๋งํฉ๋๋ค.

```js
// change select options
const onFilter = (event) => {
  event.preventDefault();

  if (event.target.value === '์์') {
    list.innerHTML = '';
    const incomeTransactions = transactions.filter((item) => item.amount > 0);

    incomeTransactions.forEach((transaction) => {
      renderList(transaction);
    });
  } else if (event.target.value === '์ง์ถ') {
    list.innerHTML = '';
    const expenseTransactions = transactions.filter((item) => item.amount < 0);

    expenseTransactions.forEach((transaction) => {
      renderList(transaction);
    });
  } else {
    init();
  }
};
```

<br/>
<br/>

# 4. UI/UX

## 4.1. ๋ชจ๋ฌ์ฐฝ ์ฌ๋ซ๊ธฐ

![honey-modal](https://user-images.githubusercontent.com/90844424/210038769-b32844ef-825e-467c-9623-60673b3ea055.gif)

์ฐ์ธก ์๋จ์ `+` ๋ฒํผ์ ๋๋ฌ ๋ชจ๋ฌ์ฐฝ์ ์ด ์ ์์ผ๋ฉฐ, ๋ฐฐ๊ฒฝ์ด๋ ์ทจ์ ๋ฒํผ์ ํด๋ฆญํ๋ฉด ๋ชจ๋ฌ์ฐฝ์ด ๋ซํ๋๋ค. DOM์์์ visible ํด๋์ค๋ฅผ ์ถ๊ฐํ์ฌ ์๋ํฉ๋๋ค.

```js
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
```

<br/>

## 4.2. ๋ง์ฐ์ค ์ค๋ฒ ์ ์ญ์  ๋ฒํผ ํ์ฑํ

![honey-removebutton](https://user-images.githubusercontent.com/90844424/210037427-9ecc0aa6-7144-4c8b-87c7-186a03c53f73.jpg)

์์ดํฐ์ ๋ฐ์ด์ ์ญ์ ํ๋ ๊ธฐ๋ฅ์ ๋จ์ํํ์ฌ ๋ง์ฐ์ค ์ค๋ฒ ์ ์ญ์  ๋ฒํผ์ ํด๋ฆญํ  ์ ์๋๋ก ํ์ต๋๋ค. ๋ง์ฐ์ค๊ฐ ๋ค์ด์ค๊ณ  ๋๊ฐ ๋ ๋ถ๋๋ฝ๊ฒ ํธ๋์ง์๋ฉ๋๋ค.

```scss
.list {
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover .item {
    transform: translate(-30%, 0);
    transition: all 0.3s ease-in-out;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 14px;
    background-color: $color--white;
    transition: all 0.3s ease-in-out;
    z-index: 10;
  }

  .btn-container {
    height: 100%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    z-index: -1;

    .remove-btn {
      width: 65px;
      height: 100%;
      border-radius: 14px;
      background-color: $color--gray;
    }
  }
}
```

<br/>
<br/>

<sub><sup>๋ณธ ์ ํ๋ฆฌ์ผ์ด์์ ์ธํฐ๋ท ๊ฐ์๋ฅผ ์ฐธ๊ณ ํ์ฌ ๋ง๋ค์์ผ๋, ํ์ํ๋ค ์๊ฐ๋๋ ๋ถ๋ถ์์ ์๋ณธ ์ฝ๋๋ฅผ ์์ ํ๊ณ , ๊ธฐ๋ฅ์ ๋ณด์ํ์ต๋๋ค.</sup></sub>
