import axios from "axios"
import {Spending} from "@/lib/spendingService";

const API_URL = 'http://localhost:8080/api/incomes'

export interface Income {
    id?: number
    description: string
    amount: number
    category?: string
    dateReceived?: string
    currency?: string
}

export async function getCurrentMonthIncomeDetails():Promise<Income[]>{
    const response = await axios.get<Income[]>(`${API_URL}/month/detail`)
    console.log(response)
    return response.data
}


export async function getCurrentMonthIncome(): Promise<number>{
    const response = await axios.get<number>(`${API_URL}/month`)
    return response.data
}

export async function getPreviousMonthIncome(n: number): Promise<number> {
    // Use month as a query parameter instead
    const response = await axios.get<number>(`${API_URL}/prevMonth`, {
        params: { n },
    });
    return response.data;
}
export async function getAllIncomes(): Promise<Income[]>{
    const response = await axios.get<Income[]>(API_URL)
    return response.data
}

export async function addIncome(spending: Income): Promise<Income> {
    const response = await axios.post<Income>(API_URL, spending)
    return response.data
}

export async function getTotalIncome(): Promise<number> {
    const response = await axios.get<number>(`${API_URL}/total`)
    return response.data
}