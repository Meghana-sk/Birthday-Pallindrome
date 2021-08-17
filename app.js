const dateInput = document.querySelector('#date-input');
const checkBtn = document.querySelector('#check-btn');
const displayResult = document.querySelector("#show-result");


/**
 * convet date to string
 * check palllindrome
 * 
 */

checkBtn.addEventListener("click", checkBdayPallindrome)

function checkBdayPallindrome() {
  if (dateInput.value) {
    const dateStr = dateInput.value.split('-');

    /** date in all formats */

    const date = {
      day: dateStr[2],
      month: dateStr[1],
      year: dateStr[0]
    }

    dateformats = getAllDateFormats(date);

    for (let i = 0; i < dateformats.length; i++) {
      // console.log(dateformats[i])
      if (pallindromeFinder(dateformats[i])) {

        displayResult.innerText = "Hurray";
        break;

      } else {
        var [palDays, Date] = getNextPallindromeDate(dateformats[i]);
        displayResult.innerText = `Not pallindrome by ${palDays}, next date is ${Date.day}-${Date.month}-${Date.year}`;

      }
    }
  }

  // if (displayResult.innerText !== "Hurray") {
  //   var [palDays, nextDate] = nextPallindromeDate(date);
  //   displayResult.innerText = `Not pallindrome by ${palDays}, next date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`;
  // }
}
// }

function pallindromeFinder(date) {
  let yesPal = false;
  if (date === reverseStr(date)) {
    yesPal = true;
  }
  return yesPal;
}

function reverseStr(str) {
  return str.split('').reverse().join('');
}

function nextPallindromeDate(date) {
  var nextDate = date;
  nextDate.day = Number(nextDate.day);
  nextDate.month = Number(nextDate.month);
  nextDate.year = Number(nextDate.year);
 

  let noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (nextDate.year % 400 === 0) {
    if (nextDate.month === 2 && nextDate.day === 29) {
      nextDate.day = 1;
      nextDate.month += 1;
    } else {
      if (nextDate.month === 2 && nextDate.day === 28) {
        nextDate.day = 1;
        nextDate.month++;
      }
    }
  }
  else {
    if ((nextDate.day + 1) > noOfDaysInMonth[nextDate.month - 1]) {
      nextDate.month++;
    } else if (nextDate.day === noOfDaysInMonth[nextDate.month - 1]) {
      nextDate.day = 1;
      nextDate.month = 1;
      nextDate.year++;
    }
  }

// while(1) {
//   if (pallindromeFinder(nextDate)) {
//     count = count;
//     break;
//   } else {
//     count++;
//     nextDate = nextPallindromeDate(nextDate);
//   }
//   console.log(">>>>>", nextDate);
// }

//   return [count, nextDate];
return nextDate;
}

function getNextPallindromeDate(date) {
  var nextDate = nextPallindromeDate(date);
   let count = 0;
  while(1) {
  if (pallindromeFinder(nextDate)) {
    break;
  } else {
    count++;
    nextDate = nextPallindromeDate(nextDate);
  }
  
}
console.log(">>>>>", nextDate);
  return [count, nextDate];
  
}

function prevPallindromeDate(date) {

  var prevDate;

  return prevDate;
}

function getAllDateFormats(date) {
  const dateformats = [];
  dateformats.push(date.day + date.month + date.year);//DDMMYYYY
  dateformats.push(date.year + date.month + date.day);//yyyymmdd
  dateformats.push(date.month + date.day + date.year);//mmddyyyy
  dateformats.push(date.year + date.day + date.month);//yyyyddmm
  dateformats.push(date.day + date.month + date.year.slice(-2));//ddmmyy
  dateformats.push(date.year.slice(-2) + date.month + date.day);//yymmdd
  dateformats.push(date.month + date.day + date.year.slice(-2));//mmddyy

  return dateformats;
}