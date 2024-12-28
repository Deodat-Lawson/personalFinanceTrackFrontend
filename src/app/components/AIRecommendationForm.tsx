"use client"
import React, { useState, FormEvent } from 'react';
import { DollarSign, Send, TrendingUp, AlertCircle } from 'lucide-react';
import styles from '../../styles/airecommend.module.css';

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


    const [recommendations, setRecommendations] = useState(null);
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


    };

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
                {/* Total Budget Input */}
                <div className={styles['budget-input-container']}>
                    <label className={styles['input-label']}>
                        Monthly Total Budget Goal
                    </label>
                    <div className={styles['input-wrapper']}>
                        <DollarSign className={styles['input-icon']} />
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

                {/* Submit Button */}
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
                        <h2 className={styles['section-title']}>Budget Overview</h2>
                        <div className={styles['overview-grid']}>
                            <div className={styles['stat-card']}>
                                <p className={styles['stat-label']}>Total Budget</p>
                                <p className={styles['stat-value']}>
                                    ${recommendations.overview.totalBudget}
                                </p>
                            </div>
                            <div className={styles['stat-card']}>
                                <p className={styles['stat-label']}>Total Expenses</p>
                                <p className={styles['stat-value']}>
                                    ${recommendations.overview.totalExpenses}
                                </p>
                            </div>
                            <div className={styles['stat-card']}>
                                <p className={styles['stat-label']}>Remaining</p>
                                <p className={`${styles['stat-value']} ${
                                    recommendations.overview.remaining < 0
                                        ? styles['stat-value-negative']
                                        : styles['stat-value-positive']
                                }`}>
                                    ${recommendations.overview.remaining}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Separator Line */}
                    <hr className={styles['divider']} />


                    {/* AI Recommendations */}
                    <div>
                        <h2 className={styles['section-title']}>AI Recommendations</h2>
                        <div className={styles['recommendations-grid']}>
                            {recommendations.suggestions.map((suggestion: any, index: number) => (
                                <div key={index} className={styles['recommendation-card']}>
                                    <div className={styles['recommendation-header']}>
                                        <AlertCircle className="w-5 h-5 text-blue-600" />
                                        <h3 className={styles['recommendation-title']}>{suggestion.title}</h3>
                                    </div>
                                    <p className={styles['recommendation-description']}>{suggestion.description}</p>
                                    <div className={styles['recommendation-footer']}>
                                        <span className={
                                            suggestion.impact === 'High'
                                                ? styles['impact-badge-high']
                                                : styles['impact-badge-moderate']
                                        }>
                                            Impact: {suggestion.impact}
                                        </span>
                                        <span className={styles['saving-text']}>
                                            Potential Saving: {suggestion.saving}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetAdvisor;