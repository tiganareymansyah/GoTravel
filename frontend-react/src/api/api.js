import axios from "axios";

let ApiUrl = "http://localhost/aplikasi-ta-kuliah/backend-php/api";

export async function apiRegisterAccount({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/user/register",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiLoginUserAccount({ body }) {
    try {
        const response = await fetch(`${ApiUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body,
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
}

export async function apiLoginAdminAccount({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/admin/login",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiGetAdminAccount() {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + "/admin/get-akun-admin",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiAddRegisterPegawaiBaru({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/admin/register",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiEditRegisterPegawaiBaru({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/admin/edit",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiDeleteRegisterPegawaiBaru(urlParams) {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + `/admin/delete?id=${urlParams}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiValidationOtp({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/user/otp",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiGetTouristTransportation() {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + "/transportation/get-option",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiAddTransportasi({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/transportation/insert",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiEditTransportasi({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/transportation/edit",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiDeleteTransportasi(urlParams) {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + `/transportation/delete?id=${urlParams}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiGetTouristDestination() {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + "/destination/get-option",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiAddDestinasi({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/destination/insert",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiEditDestinasi({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/destination/edit",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiDeleteDestinasi(urlParams) {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + `/destination/delete?id=${urlParams}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiGetPaymentMethod() {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + "/paymeth/get-option",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiAddMetodePembayaran({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/paymeth/insert",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiEditMetodePembayaran({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/paymeth/edit",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiDeleteMetodePembayaran(urlParams) {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + `/paymeth/delete?id=${urlParams}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiGetKodePembayaran() {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/paymeth/get-kode-payment",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiRequestDataBooking({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/request/add-data-booking",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiGetDataBookingByEmail(urlParams) {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + `/request/get-data-booking-by-email?email=${urlParams}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiGetAllDataBooking() {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + "/request/get-all-data-booking",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiEditPay({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/request/edit-pay",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiDeleteDataBooking({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/request/delete",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiSendMessage({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/contact/add-message",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiSendAnswer({ body }) {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/contact/add-answer",
            data: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiContactGetData() {
    try {
        const response = await axios({
            method: "POST",
            url: ApiUrl + "/contact/get-data",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function apiDeleteContact(urlParams) {
    try {
        const response = await axios({
            method: "GET",
            url: ApiUrl + `/contact/delete?id=${urlParams}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
