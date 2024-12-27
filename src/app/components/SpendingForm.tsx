"use client";
import React, { FormEvent, useState } from 'react';
import { CreditCard, DollarSign, Calendar, Tag, Loader2 } from 'lucide-react';
import styles from '../../styles/spendingform.module.css';
import {addSpending, Spending} from "@/lib/spendingService";

interface SpendingFormProps {
    onSpendingAdded: (newSpending: Spending) => void;
}

const categories = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Other'
];

export default function SpendingForm({ onSpendingAdded }: SpendingFormProps) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [dateSpent, setDateSpent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currency, setCurrency] = useState('USD');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!description || !amount) return;

        setIsSubmitting(true);
        const newSpending: Spending = {
            description,
            amount: parseFloat(amount),
            category,
            dateSpent: dateSpent || undefined,
            currency,
        };

        try {
            const savedSpending = await addSpending(newSpending);
            onSpendingAdded(savedSpending);
            // Reset form
            setDescription('');
            setAmount('');
            setCategory('');
            setDateSpent('');
            setCurrency('USD');
        } catch (error) {
            console.error('Error adding spending:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add New Expense</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Description Field */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        <CreditCard className={styles.labelIcon} />
                        Description
                    </label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className={styles.input}
                        placeholder="What did you spend on?"
                    />
                </div>

                {/* Amount Field */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        <DollarSign className={styles.labelIcon} />
                        Amount
                    </label>
                    <div className={styles.amountWrapper}>
                        <span className={styles.currencySymbol}>$</span>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className={styles.amountInput}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Category Field */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        <Tag className={styles.labelIcon} />
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Date Field */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        <Calendar className={styles.labelIcon} />
                        Date
                    </label>
                    <input
                        type="date"
                        value={dateSpent}
                        onChange={(e) => setDateSpent(e.target.value)}
                        className={styles.input}
                    />
                </div>


                <div>
                    <label>Currency: </label>

                    {/* Option B: dropdown */}
                    <select value={currency} onChange={e => setCurrency(e.target.value)} className={styles.select}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        {/* Add more as needed */}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className={styles.spinner} />
                            Adding...
                        </>
                    ) : (
                        'Add Expense'
                    )}
                </button>
            </form>
        </div>
    );
}