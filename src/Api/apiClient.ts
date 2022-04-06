import { ApiResponse } from "src/models/api_response";
import { BASE_URL, isVendorApp } from "src/models/constant";

const VerifyEndPoint = isVendorApp ? 'auth/staff/verification-code' : 'auth/admin/verification-code';
const AuthEndPoint = isVendorApp ? 'auth/staff/login' : 'auth/admin/login';

export function postAuthentication(phone: string): Promise<ApiResponse> {
    return fetch(BASE_URL + VerifyEndPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNo: phone })
    }).then(res => res.json()).then(res => {
        console.log(res);
        return res as ApiResponse;
    })
}

export function postLogin(phone: string, code: string): Promise<ApiResponse> {
    return fetch(BASE_URL + AuthEndPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNo: phone, code: code })
    }).then(res => res.json()).then(res => {
        return res as ApiResponse;
    })
}

