"use client"
import SpendingList from "../components/SpendingList"
import IncomeList from "../components/IncomeList"
import {useEffect, useState} from "react";
import {getAllSpendings, getTotalSpent, Spending} from "@/lib/spendingService";
import {getAllIncomes, getTotalIncome, Income} from "@/lib/incomeService";
import styles from '../../styles/history.module.css';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function Home() {
    const [incomes, setIncomes] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [spendings, setSpending] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const [income, totalIncome, spending, totalSpent] = await Promise.all([
                getAllIncomes(),
                getTotalIncome(),
                getAllSpendings(),
                getTotalSpent(),
            ]);
            setIncomes(income);
            setTotalIncome(totalIncome);
            setSpending(spending);
            setTotalSpent(totalSpent);
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    }

    const balance = totalIncome - totalSpent;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Financial Overview</h1>
                <div className={styles.summaryCards}>
                    <div className={styles.summaryCard}>
                        <DollarSign className={styles.icon} />
                        <div className={styles.cardContent}>
                            <h2>Balance</h2>
                            <p className={balance >= 0 ? styles.positive : styles.negative}>
                                ${balance.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.summaryCard} ${styles.income}`}>
                        <TrendingUp className={styles.icon} />
                        <div className={styles.cardContent}>
                            <h2>Total Income</h2>
                            <p>${totalIncome.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className={`${styles.summaryCard} ${styles.spending}`}>
                        <TrendingDown className={styles.icon} />
                        <div className={styles.cardContent}>
                            <h2>Total Spent</h2>
                            <p>${totalSpent.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <TrendingUp className={styles.sectionIcon} />
                        Income
                    </h2>
                    <IncomeList incomes={incomes} />
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <TrendingDown className={styles.sectionIcon} />
                        Spending
                    </h2>
                    <SpendingList spendings={spendings} />
                </div>
            </div>
        </div>
    );
}