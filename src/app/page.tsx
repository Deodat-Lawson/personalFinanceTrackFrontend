"use client"
import React, { useEffect, useState } from 'react'
import SpendingForm from './components/SpendingForm'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import styles from '../styles/home.module.css';
import {
    getAllIncomes,
    getCurrentMonthIncome,
    getPreviousMonthIncome,
    getTotalIncome,
    Income
} from "@/lib/incomeService";
import {getCurrentMonthSpendings, getPreviousMonthSpendings} from "@/lib/spendingService";


const Dashboard = () => {

    const [currentMonthSpending, setCurrentMonthSpending] = useState<number>(0)
    const [currentMonthIncome, setCurrentMonthIncome] = useState<number>(0)
    const [previousMonthSpending, setPreviousMonthSpending] = useState<number>(0)
    const [previousMonthIncome, setPreviousMonthIncome] = useState<number>(0)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const [currentMonthIncome, prevMonthIncome, currentMonthSpending, PrevMonthSpending] = await Promise.all([
                getCurrentMonthIncome(),
                getPreviousMonthIncome(),
                getCurrentMonthSpendings(),
                getPreviousMonthSpendings()
            ])
            setCurrentMonthIncome(currentMonthIncome)
            setPreviousMonthIncome(prevMonthIncome)
            setCurrentMonthSpending(currentMonthSpending)
            setPreviousMonthSpending(previousMonthSpending)
        } catch (error) {
            console.error('Error fetching initial data:', error)
        }
    }


    const spendingData = [
    { name: 'Housing', value: 0, color: '#3B82F6' },
    { name: 'Transportation', value: 400, color: '#10B981' },
    { name: 'Food', value: 600, color: '#F59E0B' },
    { name: 'Utilities', value: 300, color: '#6366F1' },
    { name: 'Entertainment', value: 200, color: '#EC4899' }
  ];

  const incomeData = [
    { name: 'Salary', value: 3000, color: '#34D399' },
    { name: 'Freelance', value: 800, color: '#60A5FA' },
    { name: 'Investments', value: 400, color: '#A78BFA' }
  ];

  const StatCard = ({ title, amount, icon: Icon, trend, trendAmount }) => (
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <h3 className={styles.statTitle}>{title}</h3>
          <div className={styles.iconWrapper}>
            <Icon className={styles.icon} />
          </div>
        </div>
        <div className={styles.statAmount}>
          <span className={styles.amount}>${amount.toLocaleString()}</span>
          {trend && (
              <span className={`${styles.trend} ${trend === 'up' ? styles.trendUp : styles.trendDown}`}>
            {trend === 'up' ? '+' : '-'}{trendAmount}%
          </span>
          )}
        </div>
      </div>
  );

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
                <span className={styles.legendValue}>${item.value}</span>
              </div>
          ))}
        </div>
      </div>
  );

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Financial Overview</h1>

        <div className={styles.statsGrid}>
            <StatCard
                title="Current Month Balance"
                amount={0}
                icon={DollarSign}
                // trend="up"
                // trendAmount={12}
            />
            <StatCard
                title="Current Month Spending"
                amount={currentMonthSpending}
                icon={Wallet}
                // trend="down"
                // trendAmount={8}
            />
            <StatCard
                title="Current Month Income"
                amount={currentMonthIncome}
                icon={TrendingDown}
            />
        </div>

        <div className={styles.statsGrid}>
            <StatCard
                title="Last Month Balance"
                amount={0}
                icon={DollarSign}
                // trend="up"
                // trendAmount={12}
            />
            <StatCard
                title="Last Month Spending"
                amount={previousMonthSpending}
                icon={Wallet}
                // trend="down"
                // trendAmount={8}
            />
            <StatCard
                title="Last Month Income"
                amount={previousMonthIncome}
                icon={TrendingDown}
            />

        </div>


        <div className={styles.chartsGrid}>
          <ChartCard title="Monthly Spending" data={spendingData} />
          <ChartCard title="Monthly Income" data={incomeData} />
        </div>

      </div>
  );
};

export default Dashboard;