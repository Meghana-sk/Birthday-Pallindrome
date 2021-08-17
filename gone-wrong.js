const dateInput = document.querySelector('#date-input');
const checkBtn = document.querySelector('#check-btn');
const displayResult = document.querySelector("#show-result");

//1
function reverseStr(str) {
  let revStr = str.split('').reverse().join('');
  return revStr;
}


//2
function isStrPallindrome(str) {
  return (str === reverseStr(str));
}


//3
function dateObjStr(date) {
  console.log('*/*',date)
  let dayStr = {}
  dayStr.day = (date.day < 10) ? ('0' + date.day) : date.day.toString();
  dayStr.month = (date.month < 10) ? ('0' + date.month) : date.month.toString();
  dayStr.year = date.year.toString();
  console.log("--",dayStr.year)
  return dayStr;
  //  var dateStr = { day: '', month: '', year: '' };

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
  //  console.log("--",dateStr.year,date)
  // return dateStr;
  
}

// var date = {
//   day: 28,
//   month: 2,
//   year: 1996
// }

function getDateFormats(date) {
  let dateStr = dateObjStr(date);
  let dateFormats = [];
  dateFormats.push(dateStr.day + dateStr.month + dateStr.year);//DDMMYYYY
  dateFormats.push(dateStr.year + dateStr.month + dateStr.day);//yyyymmdd
  dateFormats.push(dateStr.month + dateStr.day + dateStr.year);//mmddyyyy
  dateFormats.push(dateStr.year + dateStr.day + dateStr.month);//yyyyddmm
  dateFormats.push(dateStr.day + dateStr.month + dateStr.year.slice(-2));//ddmmyy
  dateFormats.push(dateStr.year.slice(-2) + dateStr.month + dateStr.day);//yymmdd
  dateFormats.push(dateStr.month + dateStr.day + dateStr.year.slice(-2));//mmddyy

  console.log("==",dateFormats)
  return dateFormats;
  // var dateStr = dateObjStr(date);

  // var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  // var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  // var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  // var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  // var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  // var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  // return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkAllDateFormatsPallindrome(date) {
  let dateForms = getDateFormats(date);
  let isPal= false;
  for (let i = 0; i < dateForms.length; i++) {
    if (isStrPallindrome(dateForms[i])) {
      isPal = true;
      break; //break var
    }
  }
  return isPal;
}

function getNextDate(date) {
  // let nextDate = {
  //   day: date.day + 1, //compares after increment
  //   month: date.month,
  //   year: date.year
  // }
  var day = date.day + 1; //compares after increment
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month += 1;
      }
    } else {
      if (day > 28) {
        day = 1;
        month += 1;
      }

    }
  } 

  
  else {
    if (day > daysInMonth[month - 1]) {
     day = 1;
     month += 1;
    }
  }

  if (month > 12) {
    month = 1;
    year += 1;
  }

  return [day,month,year];

}

function checkLeapYear(year) {
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}

function checkNextPallindromeDate(date) {
  let dayscounter = 0;
  let nextDate = getNextDate(date);

  while(true) {
    dayscounter += 1;
    if(checkAllDateFormatsPallindrome(nextDate)) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  // while(1){
  //   dayscounter++;
  //   var isPalindrome = checkAllDateFormatsPallindrome(nextDate);
  //   if(isPalindrome){
  //     break;
  //   }
  //   nextDate = getNextDate(nextDate);
  // }
return [dayscounter, nextDate];
}

checkBtn.addEventListener("click",clickHandler);

function clickHandler() {
  let bday = dateInput.value;
 

  if(bday) {
    let bdayList = bday.split('-');
    let date = {
      day: bdayList[2],
      month: bdayList[1],
      year: bdayList[0]
    }
    let isPallindrome = checkAllDateFormatsPallindrome(date);

    if(isPallindrome) {
      displayResult.innerText = "yay";
    }else {
       let [days, nextDate] = checkNextPallindromeDate(date);
      displayResult.innerText = `nay. next date ${nextDate} days ${days}`
    }
  }
}
