"use client"
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import styles from '../styles/home.module.css';
import {
    getCurrentMonthIncome, getCurrentMonthIncomeDetails,
    getPreviousMonthIncome
} from "@/lib/incomeService";
import {
    getCurrentMonthSpendingDetails,
    getCurrentMonthSpendings,
    getPreviousMonthSpendings
} from "@/lib/spendingService";

const Dashboard = () => {
    // State
    const [currentMonthSpending, setCurrentMonthSpending] = useState<number>(0);
    const [currentMonthIncome, setCurrentMonthIncome] = useState<number>(0);
    const [previousMonthSpending, setPreviousMonthSpending] = useState<number>(0);
    const [previousMonthIncome, setPreviousMonthIncome] = useState<number>(0);


    const [currentMonthIncomeData, setCurrentMonthIncomeData] = useState([]);
    const [currentMonthSpendingData, setCurrentMonthSpendingData] = useState([]);

    // On mount, fetch data
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const [
                fetchedCurrentMonthIncome,
                fetchedPreviousMonthIncome,
                fetchedCurrentMonthSpending,
                fetchedPreviousMonthSpending,
            ] = await Promise.all([
                getCurrentMonthIncome(),
                getPreviousMonthIncome(1),
                getCurrentMonthSpendings(),
                getPreviousMonthSpendings(1),

            ]);
            setCurrentMonthIncome(fetchedCurrentMonthIncome);
            setPreviousMonthIncome(fetchedPreviousMonthIncome);
            setCurrentMonthSpending(fetchedCurrentMonthSpending);
            setPreviousMonthSpending(fetchedPreviousMonthSpending);

            const [
                fetchedCurrentMonthIncomeDetails,
                fetchedCurrentMonthSpendingDetails
            ] = await Promise.all([
                getCurrentMonthIncomeDetails(),
                getCurrentMonthSpendingDetails(),
            ]);

            const incomeByCategory = groupByCategoryIncome(fetchedCurrentMonthIncomeDetails);
            setCurrentMonthIncomeData(incomeByCategory);

            const spendingByCategory = groupByCategorySpending(fetchedCurrentMonthSpendingDetails);
            setCurrentMonthSpendingData(spendingByCategory);

        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    }

    function groupByCategoryIncome(items) {
        // items is array of { category: string, amount: number }
        // We want an array of { name: string, value: number, color: string }

        // 1. Group by category
        const map = items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = 0;
            }
            acc[item.category] += item.amount;
            return acc;
        }, {});

        // 2. Convert to array of objects with color
        const results = Object.entries(map).map(([category, totalAmount]) => ({
            name: category,
            value: totalAmount,
            color: pickColorForCategoryIncome(category),
        }));

        return results;
    }

    // Pick colors by category (just an example)
    function pickColorForCategoryIncome(category) {
        switch (category.toLowerCase()) {
            case 'salary':
                return '#34D399'; // Green
            case 'freelance':
                return '#60A5FA'; // Light Blue
            case 'investments':
                return '#A78BFA'; // Purple
            case 'rental income':
                return '#F87171'; // Red
            case 'business income':
                return '#FBBF24'; // Amber
            case 'pension':
                return '#10B981'; // Teal
            case 'social security':
                return '#2563EB'; // Blue
            case 'other income':
                return '#F59E0B'; // Yellow
            default:
                return '#F59E0B'; // Fallback color
        }
    }



    function groupByCategorySpending(items) {
        // items is array of { category: string, amount: number }
        // We want an array of { name: string, value: number, color: string }

        // 1. Group by category
        const map = items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = 0;
            }
            acc[item.category] += item.amount;
            return acc;
        }, {});

        // 2. Convert to array of objects with color
        const results = Object.entries(map).map(([category, totalAmount]) => ({
            name: category,
            value: totalAmount,
            color: pickColorForCategorySpending(category),
        }));

        return results;
    }

    // Pick colors by category (just an example)
    function pickColorForCategorySpending(category) {
        switch (category.toLowerCase()) {
            case 'housing':
                return '#F87171'; // Red
            case 'transportation':
                return '#60A5FA'; // Blue
            case 'food':
                return '#34D399'; // Green
            case 'utilities':
                return '#FBBF24'; // Amber
            case 'entertainment':
                return '#A78BFA'; // Purple
            case 'shopping':
                return '#F472B6'; // Pink
            case 'healthcare':
                return '#10B981'; // Teal
            case 'education':
                return '#7C3AED'; // Indigo
            case 'other':
                return '#F59E0B'; // Yellow
            default:
                // Fallback color
                return '#9CA3AF'; // Gray
        }
    }

    // Calculate balances
    const currentMonthBalance = currentMonthIncome - currentMonthSpending;
    const lastMonthBalance = previousMonthIncome - previousMonthSpending;


    // -- StatCard Component --
    const StatCard = ({ title, amount, icon: Icon, isBalance = false }) => {
        // If this card is for balance, decide negative or positive coloring.
        // Otherwise, use default text color.
        let amountClass = styles.defaultTextColor;
        if (isBalance) {
            amountClass = amount < 0 ? styles.negative : styles.positive;
        }

        return (
            <div className={styles.statCard}>
                <div className={styles.statHeader}>
                    <h3 className={styles.statTitle}>{title}</h3>
                    <div className={styles.iconWrapper}>
                        <Icon className={styles.icon} />
                    </div>
                </div>
                <div className={styles.statAmount}>
                    <span className={`${styles.amount} ${amountClass}`}>
                        ${amount.toLocaleString()}
                    </span>
                </div>
            </div>
        );
    };

    // -- ChartCard Component --
    const ChartCard = ({ title, data }) => (
        <div className={styles.chartCard}>
            <h2 className={styles.chartTitle}>{title}</h2>
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.legendGrid}>
                {data.map((item, index) => (
                    <div key={index} className={styles.legendItem}>
                        <div
                            className={styles.legendDot}
                            style={{ backgroundColor: item.color }}
                        />
                        <span className={styles.legendLabel}>{item.name}</span>
                        <span className={styles.legendValue}>${item.value.toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Financial Overview</h1>

            {/* Current Month Stats */}
            <div className={styles.statsGrid}>
                <StatCard
                    title="Current Month Balance"
                    amount={currentMonthBalance}
                    icon={DollarSign}
                    isBalance // Mark this as a balance card
                />
                <StatCard
                    title="Current Month Spending"
                    amount={currentMonthSpending}
                    icon={TrendingDown}
                />
                <StatCard
                    title="Current Month Income"
                    amount={currentMonthIncome}
                    icon={TrendingUp}
                />
            </div>

            {/* Last Month Stats */}
            <div className={styles.statsGrid}>
                <StatCard
                    title="Last Month Balance"
                    amount={lastMonthBalance}
                    icon={DollarSign}
                    isBalance // Mark this as a balance card
                />
                <StatCard
                    title="Last Month Spending"
                    amount={previousMonthSpending}
                    icon={TrendingDown}
                />
                <StatCard
                    title="Last Month Income"
                    amount={previousMonthIncome}
                    icon={TrendingUp}
                />
            </div>

            {/* Pie Charts (Spending & Income) */}
            <div className={styles.chartsGrid}>
                <ChartCard title="Current Monthly Spending" data={currentMonthSpendingData} />
                <ChartCard title="Current Monthly Income" data={currentMonthIncomeData} />
            </div>
        </div>
    );
};

export default Dashboard;