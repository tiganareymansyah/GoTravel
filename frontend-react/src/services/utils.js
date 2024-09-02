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

export function formatUangByKodeMataUang(price, currency) {
    const numericPrice = Number(price);
  
    if (isNaN(numericPrice)) {
        return "Invalid Price";
    }
  
    if (currency) {
        const formattedPrice = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency,
            currencyDisplay: "narrowSymbol",
        }).format(numericPrice);
  
        const spaceSeparatedFormattedPrice = formattedPrice.replace(/\s+/g, " ");
  
        return spaceSeparatedFormattedPrice;
    }
  
    return "";
}

export function hitungJarakHari(date1, date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const timeDifference = Math.abs(endDate - startDate);

    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

    return dayDifference;
}
