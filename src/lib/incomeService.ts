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


export async function getCurrentMonthIncome(): Promise<number>{
    const response = await axios.get<number>(`${API_URL}/month`)
    return response.data
}

export async function getPreviousMonthIncome(): Promise<number>{
    const response = await axios.get<number>(`${API_URL}/prevMonth`)
    return response.data
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