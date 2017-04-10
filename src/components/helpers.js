/*
Used to display relative time i.e 
Input: time post was created
Output: relative time to now. created => 4 hours ago, 10 minutes ago, 2 months ago
*/
const timeDifference = (previous) => {
    current = Date.now();
    previous = previous * 1000;
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        var days = Math.round(elapsed/msPerDay)
        if (days < 2) {
          return days + ' day ago'; 
        } else {
          return days + ' days ago';
        }
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

export default timeDifference;