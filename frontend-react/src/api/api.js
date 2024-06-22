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
