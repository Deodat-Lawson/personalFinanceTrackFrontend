"use client"
import React, { useEffect, useState } from 'react'
import SpendingList from '../components/SpendingList'
import { getAllIncomes, getTotalIncome, Income } from '../../lib/incomeService'
import IncomeForm from "../components/IncomeForm";


export default function Home() {
    const [incomes, setIncomes] = useState<Income[]>([])
    const [totalIncome, setTotalIncome] = useState<number>(0)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const [data, total] = await Promise.all([
                getAllIncomes(),
                getTotalIncome(),
            ])
            setIncomes(data)
            setTotalIncome(total)
        } catch (error) {
            console.error('Error fetching initial data:', error)
        }
    }

    function handleIncomeAdded(newIncome: Income) {
        setIncomes((prev) => [...prev, newIncome])
        setTotalIncome((prev) => prev + newIncome.amount)
    }

    return (
        <div className="container">
            <h1>Personal Financial Planner</h1>
            <IncomeForm onIncomeAdded={handleIncomeAdded} />
        </div>
    )
}
