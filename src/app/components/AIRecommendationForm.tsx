"use client";
import React, {useState, FormEvent, JSX} from 'react';
import { DollarSign, Send, TrendingUp, AlertCircle } from 'lucide-react';
import styles from '../../styles/airecommend.module.css';
import { optimizeSpending } from '@/lib/aiService';

function formatToParagraphs(text: string): JSX.Element[] {
    return text
        .split('\n\n')
        .map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1em' }}>
                {paragraph}
            </p>
        ));
}

const BudgetAdvisor = () => {
    const [budget, setBudget] = useState('');
    const [expenses, setExpenses] = useState([
        { category: 'Rent', amount: '' },
        { category: 'Groceries', amount: '' },
        { category: 'Utilities', amount: '' },
        { category: 'Transportation', amount: '' },
        { category: 'Entertainment', amount: '' },
        { category: 'Insurance', amount: '' },
        { category: 'Health', amount: '' }
    ]);

    const [recommendations, setRecommendations] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleExpenseChange = (index: number, value: string) => {
        const newExpenses = [...expenses];
        newExpenses[index].amount = value;
        setExpenses(newExpenses);
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        runOptimization();
    };

    const payload = {
        budget: budget,
        expenses: expenses,
    };

    async function runOptimization() {
        try {
            const result = await optimizeSpending(payload);
            console.log('AI Response:', result);
            setRecommendations(result);
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles['header-icon-container']}>
                    <TrendingUp className={styles['header-icon']} />
                </div>
                <h1 className={styles['header-title']}>AI Budget Optimizer</h1>
            </header>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className={styles.form}>
                <div className={styles['budget-input-container']}>
                    <label className={styles['input-label']}>
                        Monthly Total Budget Goal
                    </label>
                    <div className={styles['input-wrapper']}>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Enter your budget goal"
                            className={styles['input-field']}
                        />
                    </div>
                </div>

                {/* Expenses Grid */}
                <div className={styles['expenses-container']}>
                    <h2 className={styles['section-title']}>Current Monthly Expenses</h2>
                    <div className={styles['expenses-grid']}>
                        {expenses.map((expense, index) => (
                            <div key={expense.category} className={styles['expense-item']}>
                                <label className={styles['input-label']}>
                                    {expense.category}
                                </label>
                                <input
                                    type="number"
                                    value={expense.amount}
                                    onChange={(e) => handleExpenseChange(index, e.target.value)}
                                    placeholder={`Enter ${expense.category.toLowerCase()} amount`}
                                    className={styles['expense-input']}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={styles['submit-button']}
                >
                    {loading ? 'Analyzing...' : 'Get AI Recommendations'}
                    {!loading && <Send className="w-4 h-4" />}
                </button>
            </form>

            {/* Error Message */}
            {errorMessage && (
                <div className={styles['error-message']}>
                    {errorMessage}
                </div>
            )}

            {/* Recommendations Section */}
            {recommendations && (
                <div className={styles.recommendations}>
                    {/* Budget Overview */}
                    <div className={styles['budget-overview']}>
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <h2 className={styles['section-title']}>Detailed Suggestions</h2>
                        <div className={styles['overview-grid']}>
                            <div className={styles['stat-card']}>
                                <div className={styles['recommendation-description']}>
                                    {formatToParagraphs(
                                        recommendations
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Separator Line */}
                    <hr className={styles['divider']} />
                </div>
            )}
        </div>
    );
};

export default BudgetAdvisor;