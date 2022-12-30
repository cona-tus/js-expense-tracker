# 🍯 가계부 앱, '꿀소비' 토이프로젝트

![honey-thumb](https://user-images.githubusercontent.com/90844424/210034736-a5799b0c-f554-40de-86cf-abd5cccac867.jpg)

<br/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/abf9be66-f2c7-4dab-a70c-1411602c81ac/deploy-status)](https://app.netlify.com/sites/conatus-js-expense-tracker/deploys) | [Live Demo](https://conatus-js-expense-tracker.netlify.app/)

<br/>

# 0. 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [사용 기술](#2-사용-기술)
3. [주요 기능](#3-주요-기능)  
   3.1. [거래 내역 추가](#31-거래-내역-추가)  
   3.2. [로컬 스토리지 저장](#32-로컬-스토리지-저장)  
   3.3. [UI 업데이트](#33-ui-업데이트)  
   3.4. [거래 내역 합산](#34-거래-내역-합산)  
   3.5. [거래 내역 삭제](#35-거래-내역-삭제)  
   3.6. [거래 목록 날짜 정렬](#36-거래-목록-날짜-정렬)  
   3.7. [거래 내역 카테고리화](#37-거래-내역-카테고리화)
4. [UI/UX](#4-uiux)  
   4.1. [모달창 여닫기](#41-모달창-여닫기)  
   4.2. [마우스 오버 시 삭제 버튼 활성화](#42-마우스-오버-시-삭제-버튼-활성화)

<br/>

# 1. 프로젝트 소개

## 1.1. 프로젝트 설명

본 프로젝트는 **가계부 애플리케이션** 입니다. 모바일 전용으로 기획하여 아이폰(iPhone 14, 13Pro, 13, 12Pro) 비율에 맞춰 작업했습니다. <u>주요 기능은 수입과 지출을 입력하여 거래 내역을 합산하는 것</u>입니다. 이러한 간단한 기능에 부합하는 사용자 경험을 구현하고자 싱글페이지에 심플하고 직관적으로 디자인했습니다.

<br/>

## 1.2. 제작 기간 & 참여 인원

- 2022-12-23 ~ 2022-12-26
- 개인 프로젝트 (1인)

<br/>
<br/>

# 2. 사용 기술

![HTML](https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![SCSS](https://img.shields.io/badge/Sass-bf4080?style=for-the-badge&logo=Sass&logoColor=ffffff) ![JAVASCRIPT](https://img.shields.io/badge/JavaScript-f6e158?style=for-the-badge&logo=JavaScript&logoColor=ffffff) ![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>

# 3. 주요 기능

## 3.1. 거래 내역 추가

![honey-add](https://user-images.githubusercontent.com/90844424/210036304-d957ab1a-1bdb-472b-aae9-89864b08c301.gif)

사용자가 날짜와 내용, 금액을 입력하여 항목을 추가할 수 있습니다. 입력 시 공백 제거와 최대 글자수 조건을 부여하여 간단한 유효성 검사를 수행합니다. 입력값이 유효하다면 transaction에 입력값을 할당하고 로컬스토리지에 저장합니다. 양식 제출 후에는 입력칸이 초기화됩니다.

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

## 3.2. 로컬 스토리지 저장

![honey-localstorage](https://user-images.githubusercontent.com/90844424/210036613-0b4905cc-ef95-4e06-b3ef-a59b58507ec3.gif)

updateLocalStorage() 함수를 만들어서 사용자가 제출한 양식 데이터를 로컬스토리지에 저장 가능하게 했습니다. 이 함수는 항목을 삭제할 때도 호출되며, 화면상의 데이터와 호환됩니다.

```js
// Save data in localStorage
const localStorageItems = JSON.parse(localStorage.getItem('transactions'));

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};
```

<br/>

## 3.3. UI 업데이트

![honey-ui](https://user-images.githubusercontent.com/90844424/210028782-8fe36f45-d43c-484b-940a-9d6928ddfa6c.gif)

새로운 아이템을 추가할 때 renderList() 함수가 호출되어 폼에 전달된 값을 HTML로 출력하고, DOM 목록에 반영합니다. 목록의 가독성이 좋도록 스타일링하기 위해서 transaction의 날짜를 받아와 각각 div 태그 안에 배치하였습니다. 또한 합산에 용이하도록 Math.abs() 메서드를 이용하여 값을 양수로 전환 후, 음수와 양수에 맞게 기호(+, -)를 붙여주었습니다.

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
  })" >삭제</button>
</div>
  `;

  list.appendChild(item);
};
```

<br/>

## 3.4. 거래 내역 합산

![honey-acc](https://user-images.githubusercontent.com/90844424/210036839-c1883559-9b8e-41d4-a562-c1a9f3060499.jpg)

updateValues() 함수를 통해 수입과 지출의 합계를 나타내도록 했습니다. 수입과 지출은 각각 Array.filter()와 Array.reduce() 메서드를 사용해 소계를 계속해서 덧붙여 합산되도록 했습니다. 또한 Array.toLocaleString() 메서드로 액수의 천 단위마다 콤마(,)를 표시했습니다.

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

  balance.textContent = `${total.toLocaleString('ko-KR')} 원`;
  money_plus.textContent = `${income.toLocaleString('ko-KR')}`;
  money_minus.textContent = `${expense.toLocaleString('ko-KR')}`;
};
```

<br/>

## 3.5. 거래 내역 삭제

![honey-remove](https://user-images.githubusercontent.com/90844424/210036905-5c0a47ee-dd2a-4935-a9c7-3dcad9a112ca.gif)

항목에 마우스 오버 시 삭제 버튼이 나타나 해당 아이템을 삭제할 수 있습니다. Array.filter() 메서드를 사용하여 삭제하고자 하는 항목의 id 값과 전달된 id값이 같지 않은 transaction 목록을 필터링합니다.

```js
// Remove items from list
const onRemove = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
};
```

<br/>

## 3.6. 거래 목록 날짜 정렬

![honey-date](https://user-images.githubusercontent.com/90844424/210037077-564021f0-4567-4271-a4ce-ac612625b572.jpg)

거래 내역을 등록한 순서가 아니라, 가장 최신 항목이 위에 보이도록 날짜를 내림차순으로 정렬했습니다. 폼을 제출할 때마다 init() 함수에서 호출됩니다.

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

## 3.7. 거래 내역 카테고리화

![honey-category](https://user-images.githubusercontent.com/90844424/210037228-99149b77-24fb-40cd-8d14-d5158f99a216.gif)

'전체', '수입', '지출'이라는 카테고리를 만들어 거래 목록을 선별할 수 있도록 만들었습니다. 옵션을 변경할 때 옵션 값과 타겟의 값이 같은지 확인한 뒤, 금액(음수/양수)으로 필터링합니다. 이렇게 만들어진 새로운 배열을 renderList() 함수에 전달하여 화면에 렌더링합니다.

```js
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
```

<br/>
<br/>

# 4. UI/UX

## 4.1. 모달창 여닫기

![honey-modal](https://user-images.githubusercontent.com/90844424/210037353-f54f5e31-f5bd-4f69-a0b0-40d4b92698dc.gif)

우측 상단의 + 버튼을 눌러 모달창을 열 수 있으며, 배경이나 취소 버튼을 클릭하면 모달창이 닫힙니다. DOM요소에 visible 클래스를 추가하여 작동합니다.

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

## 4.2. 마우스 오버 시 삭제 버튼 활성화

![honey-removebutton](https://user-images.githubusercontent.com/90844424/210037427-9ecc0aa6-7144-4c8b-87c7-186a03c53f73.jpg)

아이폰의 밀어서 삭제하는 기능을 단순화하여 마우스 오버 시 삭제 버튼을 클릭할 수 있도록 했습니다. 마우스가 들어오고 나갈 때 부드럽게 트랜지션됩니다.

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
