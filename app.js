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
  // var listOfPalindromes = getAllDateFormats(date);

  // var flag = false;

  // for(var i=0; i < listOfPalindromes.length; i++){
  //   if(isPalindrome(listOfPalindromes[i])){
  //     flag = true;
  //     break;
  //   }
  // }

  // return flag;
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

// check for leap year
function isLeapYear(year) {
  // if (year % 400 === 0) {
  //   return true;
  // }
  // if (year % 100 === 0) {
  //   return false;
  // }
  // if (year % 4 === 0) {
  //   return true;
  // }
  // return false;
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

// gets next date
function getNextDate(date) {
  var day = date.day + 1; // increment the day  => 32
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

  // check for february
  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) {
      // 2020 => true
      if (day > 29) {
        // false
        day = 1;
        month++; // increment the month
      }
    } else {
      if (day > 28) {
        day = 1;
        month++; // increment the month
      }
    }
  }
  // check for other months
  else {
    //  check if the day exceeds the max days in month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++; // increment the month
    }
  }

  // increment the year if month is greater than 12
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

// get next palindrome date
function getNextPalindromeDate(date) {
  // var ctr = 0;
  // var nextDate = getNextDate(date);

  // while (1) {
  //   ctr++;
  //   var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
  //   if (isPalindrome) {
  //     break;
  //   }
  //   nextDate = getNextDate(nextDate);
  // }
  // return [ctr, nextDate];
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
  var bdayStr = dateInputRef.value; // 2020-10-11

  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-"); // ['2020', '10', '11']

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
  }
}

showBtnRef.addEventListener("click", clickHandler);
