import axios from "axios"

const API_URL = 'http://localhost:8080/api/spendings'

export interface Spending {
    id?: number
    description: string
    amount: number
    category?: string
    dateSpent?: string
    currency?: string
}

export async function getCurrentMonthSpendings(): Promise<number>{
    const response = await axios.get<number>(`${API_URL}/month`)
    return response.data
}

export async function getPreviousMonthSpendings(): Promise<number>{
    const response = await axios.get<number>(`${API_URL}/prevMonth`)
    return response.data
}


export async function getAllSpendings(): Promise<Spending[]>{
    const response = await axios.get<Spending[]>(API_URL)
    return response.data
}

export async function addSpending(spending: Spending): Promise<Spending> {
    const response = await axios.post<Spending>(API_URL, spending)
    return response.data
}

export async function getTotalSpent(): Promise<number> {
    const response = await axios.get<number>(`${API_URL}/total`)
    return response.data
}