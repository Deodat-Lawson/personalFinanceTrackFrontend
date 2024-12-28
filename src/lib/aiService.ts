import axios from "axios"
import {Spending} from "@/lib/spendingService";

const API_URL = 'http://localhost:8080/api/optimize';
interface Expense {
    category: string;
    amount: string;
}

interface OptimizationPayload {
    budget: string;
    expenses: Expense[];
}

/**
 * Send a POST request to optimize spending based on the given payload.
 */
export async function optimizeSpending(payload: OptimizationPayload): Promise<String> {
    console.log('in optimized spending')
    const response = await axios.post<String>(API_URL, payload);
    return response.data;
}