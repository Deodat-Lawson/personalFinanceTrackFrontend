"use client"
import React, { useState } from 'react';
import { DollarSign, Send, TrendingUp, AlertCircle } from 'lucide-react';
import '../../styles/airecommend.module.css';

const BudgetAdvisor = () => {
    const [budget, setBudget] = useState('');
    const [expenses, setExpenses] = useState([
        { category: 'Rent', amount: '' },
        { category: 'Groceries', amount: '' },
        { category: 'Utilities', amount: '' },
        { category: 'Transportation', amount: '' },
        { category: 'Entertainment', amount: '' },
        // Additional categories
        { category: 'Insurance', amount: '' },
        { category: 'Health', amount: '' }
    ]);
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleExpenseChange = (index, value) => {
        const newExpenses = [...expenses];
        newExpenses[index].amount = value;
        setExpenses(newExpenses);
    };

    // const generateRecommendations = async () => {
    //     setLoading(true);
    //     setErrorMessage('');
    //     try {
    //         const totalExpenses = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
    //         const remainingBudget = Number(budget) - totalExpenses;
    //
    //         // *** Real AI call example (replace with your own API route or external service)
    //         const response = await fetch('/api/ai-recommendations', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ budget, expenses })
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to get AI recommendations.');
    //         }
    //         const data = await response.json();
    //
    //         // Example: we assume `data.message` is a text from GPT
    //         setRecommendations({
    //             overview: {
    //                 totalBudget: Number(budget),
    //                 totalExpenses: totalExpenses,
    //                 remaining: remainingBudget
    //             },
    //             suggestions: [
    //                 {
    //                     title: 'AI Tips',
    //                     description: data.message, // from GPT
    //                     impact: 'High',
    //                     saving: '~$150/month'
    //                 }
    //                 // You could parse data.message and create multiple suggestions if needed
    //             ]
    //         });
    //     } catch (error) {
    //         console.error('Error generating recommendations:', error);
    //         setErrorMessage('There was an error generating AI recommendations. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="budget-advisor-container">
            <header className="budget-header">
                <TrendingUp size={32} />
                <h1>AI Budget Optimizer</h1>
            </header>

            <div className="budget-input-section">
                <div className="total-budget-input">
                    <label>
                        <DollarSign className="input-icon" />
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Enter your total monthly budget"
                            className="budget-input"
                        />
                    </label>
                </div>

                <div className="expenses-input">
                    <h2>Monthly Expenses</h2>
                    {expenses.map((expense, index) => (
                        <div key={expense.category} className="expense-item">
                            <label>{expense.category}</label>
                            <input
                                type="number"
                                value={expense.amount}
                                onChange={(e) => handleExpenseChange(index, e.target.value)}
                                placeholder={`Enter ${expense.category.toLowerCase()} amount`}
                            />
                        </div>
                    ))}
                </div>

                <button
                    // onClick={generateRecommendations}
                    className="analyze-button"
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Get AI Recommendations'}
                    {!loading && <Send size={16} className="button-icon" />}
                </button>
            </div>

            {errorMessage && <div className="error-alert">{errorMessage}</div>}

            {recommendations && (
                <div className="recommendations-section">
                    <div className="budget-overview">
                        <h2>Budget Overview</h2>
                        <div className="overview-stats">
                            <div className="stat-item">
                                <span>Total Budget</span>
                                <span>${recommendations.overview.totalBudget}</span>
                            </div>
                            <div className="stat-item">
                                <span>Total Expenses</span>
                                <span>${recommendations.overview.totalExpenses}</span>
                            </div>
                            <div className="stat-item">
                                <span>Remaining</span>
                                <span
                                    className={
                                        recommendations.overview.remaining < 0 ? 'negative' : 'positive'
                                    }
                                >
                                    ${recommendations.overview.remaining}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="ai-recommendations">
                        <h2>AI Recommendations</h2>
                        {recommendations.suggestions.map((suggestion, index) => (
                            <div key={index} className="recommendation-card">
                                <div className="card-header">
                                    <AlertCircle size={20} />
                                    <h3>{suggestion.title}</h3>
                                </div>
                                <p>{suggestion.description}</p>
                                <div className="card-footer">
                                    <span className={`impact-tag ${suggestion.impact.toLowerCase()}`}>
                                        Impact: {suggestion.impact}
                                    </span>
                                    <span className="saving-amount">
                                        Potential Saving: {suggestion.saving}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetAdvisor;