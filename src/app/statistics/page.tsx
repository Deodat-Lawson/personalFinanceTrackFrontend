"use client";

import React from "react";
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

export default function StatisticsPage() {
    // Sample data - replace with your API call
    const monthlyData = [
        {
            month: "Jan",
            income: 5000,
            spending: {
                groceries: 400,
                utilities: 200,
                rent: 1200,
                entertainment: 300,
            },
        },
        {
            month: "Feb",
            income: 5200,
            spending: {
                groceries: 380,
                utilities: 220,
                rent: 1200,
                entertainment: 250,
            },
        },
        // Add more months as needed...
    ];

    // Transform data so we can display both income and each spending category in a single bar chart
    const chartData = monthlyData.map((item) => ({
        month: item.month,
        income: item.income,
        groceries: item.spending.groceries,
        utilities: item.spending.utilities,
        rent: item.spending.rent,
        entertainment: item.spending.entertainment,
    }));

    // Calculate totals for overview
    const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
    const totalSpending = monthlyData.reduce(
        (sum, month) =>
            sum + Object.values(month.spending).reduce((a, b) => a + b, 0),
        0
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Financial Statistics</h1>

            {/* Overview Cards */}
            <div className={styles.overviewContainer}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Total Income</h2>
                    <p className={styles.cardValue}>${totalIncome.toLocaleString()}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Total Spending</h2>
                    <p className={styles.cardValue}>${totalSpending.toLocaleString()}</p>
                </div>
            </div>

            {/* Bar Chart - Income & Spendings by Category per Month */}
            <div className={styles.chartContainer}>
                <h2 className={styles.chartTitle}>Income and Spending by Month</h2>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#4ade80" name="Income" />
                            <Bar dataKey="groceries" fill="#60a5fa" name="Groceries" />
                            <Bar dataKey="utilities" fill="#34d399" name="Utilities" />
                            <Bar dataKey="rent" fill="#a78bfa" name="Rent" />
                            <Bar dataKey="entertainment" fill="#fbbf24" name="Entertainment" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}