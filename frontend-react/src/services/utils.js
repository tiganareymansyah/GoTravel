export const formatDateYYYYMMDD = (date) => {
    if(typeof date === "object") {
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`; // YYYY-MM-DD
    } else {
        return date;
    }
}

export const capitalizeWords = (inputString) => {
    if (!inputString) {
        return inputString;
    }

    var words = inputString.split(" ");
    
    var capitalizedWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return capitalizedWords.join(" ");
}

export const formatDateToCustomString = (propsDate) => {
    const date = new Date(propsDate);
    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const day = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}, ${dayOfMonth} ${month} ${year}`;
}