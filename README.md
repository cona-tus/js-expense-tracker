# 🍯 가계부 앱, '꿀소비' 토이프로젝트

![honey-thumb](https://user-images.githubusercontent.com/90844424/210034736-a5799b0c-f554-40de-86cf-abd5cccac867.jpg)

<br/>

🔗 꿀소비 [[Live Demo](https://conatus-js-expense-tracker.netlify.app/)]

<br/>
<br/>

## 1. Project

### 1-1. Project Description

본 프로젝트는 가계부 애플리케이션입니다. 주요 기능은 수입과 지출을 입력하여 거래 내역을 합산하는 것입니다. 모바일 비율의 싱글 페이지로 디자인하여 간편한 사용자 경험을 구현하였습니다.

<br/>

<sub>\* 본 애플리케이션은 인터넷 강의를 참고하여 만들었으나, 필요하다고 판단되는 부분에서 원본 코드를 수정했습니다. 그리고 로컬 스토리지에 저장, 날짜별 정렬, 카테고리화, 모달창 기능을 추가하였습니다. 또한 새롭게 디자인했습니다.</sub>

<br/>

### 1-2. Project Duration & Participants

- 2022-12-23 ~ 2022-12-26
- 개인 프로젝트 (1인)

<br/>
<br/>

## 2. Skills

![HTML](https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![SCSS](https://img.shields.io/badge/Sass-bf4080?style=for-the-badge&logo=Sass&logoColor=ffffff) ![JAVASCRIPT](https://img.shields.io/badge/JavaScript-f6e158?style=for-the-badge&logo=JavaScript&logoColor=ffffff) ![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>

## 3. Main Features

1. [거래 내역 추가](#3-1-add-a-transaction)
2. [로컬 스토리지에 데이터 저장](#3-2-save-to-local-storage-and-update-ui)
3. [거래 내역 합산](#3-3-sum-up-transactions)
4. [거래 내역 삭제](#3-4-delete-transaction)
5. [거래 내역 정렬](#3-5-sort-transactions-by-date)
6. [거래 내역 카테고리화](#3-6-categorize-transactions)

<br/>

### 3-1. Add a Transaction

![honey-add](https://user-images.githubusercontent.com/90844424/210037931-340bad88-8393-46db-b887-b93b5465cfa1.gif)

사용자는 날짜, 내용, 금액을 입력하여 새로운 항목을 추가할 수 있습니다. 입력 시 공백 제거와 최대 글자 수 조건을 적용하여 간단한 유효성 검사를 수행합니다. 입력값이 유효하면, transaction에 입력 값을 할당하고 로컬 스토리지에 저장합니다. 양식을 제출한 후에는 입력 칸이 자동으로 초기화됩니다.

```js
// 거래 내역 추가
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
<br/>

### 3-2. Save to Local Storage and Update UI

![honey-localstorage](https://user-images.githubusercontent.com/90844424/210038137-4d336365-dc81-44d1-80a2-ed47f838aa76.gif)

사용자가 제출한 양식 데이터를 로컬 스토리지에 저장할 수 있도록 `updateLocalStorage()` 함수를 생성했습니다. 이 함수는 항목을 삭제할 때에도 호출되며, 화면에 표시된 데이터와 일치하도록 설계되었습니다.

```js
// 로컬 스토리지에 데이터 저장
const localStorageItems = JSON.parse(localStorage.getItem('transactions'));

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};
```

<br/>

새로운 아이템이 추가될 때는 `renderList()` 함수가 호출되어 폼에서 전달된 값을 HTML로 출력하고 DOM 목록에 업데이트합니다. 목록은 가독성을 높이기 위해 transaction의 날짜를 가져와서 각 div 태그 내에 배치하였습니다. 또한, 합산에 용이하도록 `Math.abs()` 메서드를 이용하여 값을 양수로 변환하고, 음수와 양수에 맞게 기호(`+`, `-`)가 추가되도록 처리하였습니다.

```js
// 목록 렌더링
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
<br/>

### 3-3. Sum Up Transactions

![honey-acc](https://user-images.githubusercontent.com/90844424/210036839-c1883559-9b8e-41d4-a562-c1a9f3060499.jpg)

`updateValues()` 함수를 통해 수입과 지출의 총합을 나타내도록 구현했습니다. 수입과 지출을 각각 `filter()`와 `reduce()` 메서드를 사용하여 소계를 계산하고, 누적하여 합산되되록 했습니다. 또한, `toLocaleString()` 메서드를 활용하여 액수의 천 단위마다 쉼표(,)를 표시하여 가독성을 높였습니다.

```js
// 가계부 업데이트
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
<br/>

### 3-4. Delete Transaction

![honey-remove](https://user-images.githubusercontent.com/90844424/210038520-272d80a4-7deb-4008-a4e0-3bae06c90afe.gif)

각 항목 위에 마우스를 올리면 삭제 버튼이 나타나며, 이를 통해 해당 아이템을 삭제할 수 있습니다. `filter()` 메서드를 사용하여 삭제하고자 하는 항목의 id 값과 전달된 id 값이 일치하지 않는 transaction 목록을 필터링합니다.

```js
// 거래 내역 삭제
const onRemove = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
};
```

<br/>
<br/>

### 3-5. Sort Transactions by Date

![honey-date](https://user-images.githubusercontent.com/90844424/210037077-564021f0-4567-4271-a4ce-ac612625b572.jpg)

등록한 순서가 아닌 최신 항목이 위에 표시되도록 날짜를 내림차순으로 정렬했습니다. 정렬 기능은 폼을 제출할 때마다 `init()` 함수에서 호출됩니다.

```js
// 날짜별 정렬
const sortDate = () => {
  return transactions.sort((a, b) => (a.date < b.date ? 1 : -1));
};

const init = () => {
  filter.options[0].selected = true;
  sortDate();
  list.innerHTML = '';

  transactions.forEach(renderList);
  updateValues();
};
```

<br/>
<br/>

### 3-6. Categorize Transactions

![honey-category](https://user-images.githubusercontent.com/90844424/210038678-7fb4efac-18c2-42b9-8d9f-e40ac848c195.gif)

'전체', '수입', '지출'이라는 카테고리를 생성하여 거래 목록을 원하는 대로 선택할 수 있도록 구성했습니다. 옵션을 변경할 때 옵션 값과 타겟 값이 일치하는지 확인한 다음, 금액(음수/양수)을 기준으로 필터링합니다. 이렇게 필터링 된 새로운 배열을 `renderList()` 함수에 전달하여 화면에 렌더링 합니다.

```js
// 옵션 변경
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

## 4. UI/UX

### 4-1. Modal

![honey-modal](https://user-images.githubusercontent.com/90844424/210038769-b32844ef-825e-467c-9623-60673b3ea055.gif)

우측 상단의 `+` 버튼을 클릭하면 모달창이 열리며, 배경이나 취소 버튼을 클릭하면 모달창이 닫힙니다. 이 기능은 DOM 요소에 `visible` 클래스를 추가하여 구현됩니다.

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
<br/>

### 4-2. Activate Delete Button

![honey-removebutton](https://user-images.githubusercontent.com/90844424/210037427-9ecc0aa6-7144-4c8b-87c7-186a03c53f73.jpg)

아이폰의 '밀어서 삭제하기' 기능을 단순화하여 구현하였습니다. 마우스를 항목 위로 올리면 삭제 버튼이 활성화됩니다. 이러한 동작은 부드럽게 트랜지션 됩니다.

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

[맨위로 이동하기](#-가계부-앱-꿀소비-토이프로젝트)
