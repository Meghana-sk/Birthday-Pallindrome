var dateInputRef = document.querySelector("#date-input");
var showBtnRef = document.querySelector("#check-btn");
var resultRef = document.querySelector("#show-result");

function reverseStr(str) {
  // var listOfChars = str.split('');
  // var reverseListOfChars = listOfChars.reverse();
  // var reversedStr = reverseListOfChars.join('');
  // return reversedStr;
  let revStr = str.split("").reverse().join("");
  return revStr;
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(date) {
  // var dateStr = { day: '', month: '', year: '' };

  // if (date.day < 10) {
  //   dateStr.day = '0' + date.day;
  // }
  // else {
  //   dateStr.day = date.day.toString();
  // }

  // if (date.month < 10) {
  //   dateStr.month = '0' + date.month;
  // }
  // else {
  //   dateStr.month = date.month.toString();
  // }

  // dateStr.year = date.year.toString();
  let dayStr = {};
  dayStr.day = date.day < 10 ? "0" + date.day : date.day.toString();
  dayStr.month = date.month < 10 ? "0" + date.month : date.month.toString();
  dayStr.year = date.year.toString();
  return dayStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);
  var dateFormats = [];

  dateFormats.push(dateStr.day + dateStr.month + dateStr.year); //DDMMYYYY
  dateFormats.push(dateStr.year + dateStr.month + dateStr.day); //yyyymmdd
  dateFormats.push(dateStr.month + dateStr.day + dateStr.year); //mmddyyyy
  dateFormats.push(dateStr.year + dateStr.day + dateStr.month); //yyyyddmm
  dateFormats.push(dateStr.day + dateStr.month + dateStr.year.slice(-2)); //ddmmyy
  dateFormats.push(dateStr.year.slice(-2) + dateStr.month + dateStr.day); //yymmdd
  dateFormats.push(dateStr.month + dateStr.day + dateStr.year.slice(-2)); //mmddyy

  // return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  return dateFormats;
}

function checkPalindromeForAllDateFormats(date) {
  let dateForms = getAllDateFormats(date);
  let isPal = false;
  for (let i = 0; i < dateForms.length; i++) {
    if (isPalindrome(dateForms[i])) {
      isPal = true;
      break; //break var
    }
  }
  return isPal;
}

function isLeapYear(year) {
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
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
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
}

function clickHandler(e) {
  var bdayStr = dateInputRef.value;

  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      resultRef.innerText = "Yay! your birthday is a palindrome!! 🥳🥳";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);

      resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
    }
  } else {
    resultRef.innerText = "Select date please :)";
  }
}

showBtnRef.addEventListener("click", clickHandler);
