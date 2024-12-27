"use client";
import React from 'react';
import { Spending } from '../../lib/spendingService';

interface SpendingListProps {
    spendings: Spending[];
}

export default function SpendingList({ spendings }: SpendingListProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date Spent</th>
            </tr>
            </thead>
            <tbody>
            {spendings.map((spending) => (
                <tr key={spending.id}>
                    <td>{spending.id}</td>
                    <td>{spending.description}</td>
                    <td>{spending.amount.toFixed(2)}</td>
                    <td>{spending.category || 'N/A'}</td>
                    <td>{spending.dateSpent || 'N/A'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
