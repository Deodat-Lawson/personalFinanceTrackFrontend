"use client"
import React, { useEffect, useState } from 'react'
import { getAllIncomes, getTotalIncome, Income } from '../../lib/incomeService'
import BudgetAdvisor from "../components/AIRecommendationForm";


export default function Home() {

    return (
        <div className="container">
            <BudgetAdvisor />
        </div>
    )
}
