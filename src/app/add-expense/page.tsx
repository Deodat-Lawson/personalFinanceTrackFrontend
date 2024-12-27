"use client"
import React, { useEffect, useState } from 'react'
import SpendingForm from '../components/SpendingForm'
import SpendingList from '../components/SpendingList'
import { getAllSpendings, getTotalSpent, Spending } from '../../lib/spendingService'


export default function Home() {
    const [spendings, setSpendings] = useState<Spending[]>([])
    const [totalSpent, setTotalSpent] = useState<number>(0)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const [data, total] = await Promise.all([
                getAllSpendings(),
                getTotalSpent(),
            ])
            setSpendings(data)
            setTotalSpent(total)
        } catch (error) {
            console.error('Error fetching initial data:', error)
        }
    }

    function handleSpendingAdded(newSpending: Spending) {
        setSpendings((prev) => [...prev, newSpending])
        setTotalSpent((prev) => prev + newSpending.amount)
    }

    return (
        <div className="container">
            <h1>Personal Financial Planner</h1>
            <SpendingForm onSpendingAdded={handleSpendingAdded} />
            {/*<h2>Total Spent: ${totalSpent.toFixed(2)}</h2>*/}
            {/*<SpendingList spendings={spendings} />*/}
        </div>
    )
}
