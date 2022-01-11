const dateInputRef = document.querySelector("#date-input");
const showBtnRef = document.querySelector("#check-btn");
const resultRef = document.querySelector("#show-result");

const reverseStr = (str) => str.split("").reverse().join("");

const isPalindrome = (str) => str === reverseStr(str);

const convertDateToStr = (date) => {
  let dayStr = {};
  dayStr.day = date.day < 10 ? "0" + date.day : date.day.toString();
  dayStr.month = date.month < 10 ? "0" + date.month : date.month.toString();
  dayStr.year = date.year.toString();
  return dayStr;
};

const getAllDateFormats = (date) => {
  let dateStr = convertDateToStr(date);
  let dateFormats = [];
  dateFormats.push(dateStr.day + dateStr.month + dateStr.year); //DDMMYYYY
  dateFormats.push(dateStr.year + dateStr.month + dateStr.day); //yyyymmdd
  dateFormats.push(dateStr.month + dateStr.day + dateStr.year); //mmddyyyy
  dateFormats.push(dateStr.year + dateStr.day + dateStr.month); //yyyyddmm
  dateFormats.push(dateStr.day + dateStr.month + dateStr.year.slice(-2)); //ddmmyy
  dateFormats.push(dateStr.year.slice(-2) + dateStr.month + dateStr.day); //yymmdd
  dateFormats.push(dateStr.month + dateStr.day + dateStr.year.slice(-2)); //mmddyy
  return dateFormats;
};

const checkPalindromeForAllDateFormats = (date) => {
  let dateForms = getAllDateFormats(date);
  let isPal = false;
  for (let i = 0; i < dateForms.length; i++) {
    if (isPalindrome(dateForms[i])) {
      isPal = true;
      break;
    }
  }
  return isPal;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
};

const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return { day, month, year };
};

const getNextPalindromeDate = (date) => {
  let dayscounter = 0;
  let nextDate = getNextDate(date);

  while (true) {
    dayscounter += 1;
    if (checkPalindromeForAllDateFormats(nextDate)) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [dayscounter, nextDate];
};

const clickHandler = (e) => {
  let bdayStr = dateInputRef.value;

  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");

    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    let isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      resultRef.innerText = "Yay! your birthday is a palindrome!! 🥳🥳";
    } else {
      let [ctr, nextDate] = getNextPalindromeDate(date);

      resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
    }
  } else {
    resultRef.innerText = "Select date please :)";
  }
};

showBtnRef.addEventListener("click", clickHandler);
