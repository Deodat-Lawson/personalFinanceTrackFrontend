"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/statistics.module.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { getPreviousMonthIncome, getTotalIncome } from "@/lib/incomeService";
import { getPreviousMonthSpendings, getTotalSpent } from "@/lib/spendingService";

export default function StatisticsPage() {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            // Fetch overall totals
            const [overallIncome, overallSpent] = await Promise.all([
                getTotalIncome(),
                getTotalSpent(),
            ]);
            setTotalIncome(overallIncome);
            setTotalSpent(overallSpent);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        }

        // Fetch monthly data
        const incomePromises = [];
        const spendingPromises = [];

        for (let i = 0; i < 12; i++) {
            incomePromises.push(getPreviousMonthIncome(i));
            spendingPromises.push(getPreviousMonthSpendings(i));
        }


        const incomesArray = await Promise.all(incomePromises);
        const spendingsArray = await Promise.all(spendingPromises);

        console.log(incomesArray);
        console.log(spendingsArray);

        // Map each month to a data object
        const formattedData = incomesArray.map((income, index) => {
            const currentSpending = spendingsArray[index] || 0;
            return {
                month: new Date(
                    new Date().setMonth(new Date().getMonth() - index)
                ).toLocaleString("default", { month: "short" }),
                income: income || 0,
                spending: currentSpending || 0,
            };
        });

        // Reverse so newest data is at the far right
        setMonthlyData(formattedData.reverse());
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Financial Statistics</h1>

            {/* Overview Cards */}
            <div className={styles.overviewContainer}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Total Income</h2>
                    <p className={styles.cardValue}>${totalIncome.toFixed(2)}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Total Spending</h2>
                    <p className={styles.cardValue}>${totalSpent.toFixed(2)}</p>
                </div>
            </div>

            {/* Bar Chart - Income & Spendings by Category per Month */}
            <div className={styles.chartContainer}>
                <h2 className={styles.chartTitle}>Income and Spending by Month</h2>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#4ade80" name="Income" />
                            <Bar dataKey="spending" fill="#ef4444" name="Spending" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}