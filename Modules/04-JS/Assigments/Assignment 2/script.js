function calculateAge(date) {
    const parts = date.split("/");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    const d = new Date(year,month,day);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth()) + 1;
    const currentDay = currentDate.getDate();

    //Calculate age
    let userAge = currentYear - year;

    if (currentMonth <= month && currentDay < day) {
        userAge--;
    }

    return userAge;
}

console.log(calculateAge("28/3/2000"));