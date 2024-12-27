"use client";
import React from 'react';
import { Income } from '../../lib/incomeService';

interface IncomeListProps {
    incomes: Income[];
}

export default function IncomeList({ incomes }: IncomeListProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date Received</th>
            </tr>
            </thead>
            <tbody>
            {incomes.map((incomes) => (
                <tr key={incomes.id}>
                    <td>{incomes.id}</td>
                    <td>{incomes.description}</td>
                    <td>{incomes.amount.toFixed(2)}</td>
                    <td>{incomes.category || 'N/A'}</td>
                    <td>{incomes.dateReceived || 'N/A'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
