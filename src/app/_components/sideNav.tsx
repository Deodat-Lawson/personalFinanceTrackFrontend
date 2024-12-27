'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, User, Bell, Settings, Clock, Menu, ChevronLeft, PlusCircle, MinusCircle, BarChart3, PiggyBank, Wallet  } from 'lucide-react';
import styles from '../../styles/sideNav.module.css';

export default function SideNav() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        {
            icon: Home,
            label: 'Dashboard',
            href: '/'
        },
        {
            icon: PlusCircle,
            label: 'Add Income',
            href: '/add-income',
            className: 'text-green-400 hover:text-green-300'
        },
        {
            icon: MinusCircle,
            label: 'Add Expense',
            href: '/add-expense',
            className: 'text-red-400 hover:text-red-300'
        },
        {
            icon: BarChart3,
            label: 'Statistics',
            href: '/statistics'
        },
        {
            icon: PiggyBank,
            label: 'AI recommendations',
            href: '/ai'
        },
        {
            icon: Clock,
            label: 'All Time History',
            href: '/history'
        }
    ];


    return (
        <nav className={`${styles.sidenav} ${isCollapsed ? styles.collapsed : ''}`}>
            <button
                className={styles.toggleButton}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ?
                    <Menu className={styles.toggleIcon} /> :
                    <ChevronLeft className={styles.toggleIcon} />
                }
            </button>

            <div className={styles.brand}>
                <h1 className={styles.brandName}>
                    Timmy's Money
                </h1>
            </div>

            <ul className={styles.navLinks}>
                {navItems.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <Link href={item.href} className={styles.navLink}>
                            <item.icon className={styles.icon} />
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>

        </nav>
    );
}