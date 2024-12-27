// "use client"
//
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
//
// const StatisticsPage = () => {
//     // Sample data - replace with your API call
//     const monthlyData = [
//         {
//             month: 'Jan',
//             income: 5000,
//             spending: {
//                 groceries: 400,
//                 utilities: 200,
//                 rent: 1200,
//                 entertainment: 300
//             }
//         },
//         {
//             month: 'Feb',
//             income: 5200,
//             spending: {
//                 groceries: 380,
//                 utilities: 220,
//                 rent: 1200,
//                 entertainment: 250
//             }
//         },
//         // Add more months...
//     ];
//
//     // Transform data for category comparison
//     const categoryData = monthlyData.map(month => ({
//         month: month.month,
//         ...month.spending
//     }));
//
//     // Calculate totals for overview
//     const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
//     const totalSpending = monthlyData.reduce((sum, month) =>
//         sum + Object.values(month.spending).reduce((a, b) => a + b, 0), 0);
//
//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-6">Financial Statistics</h1>
//
//             {/* Overview Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Total Income</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
//                     </CardContent>
//                 </Card>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Total Spending</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <p className="text-2xl font-bold">${totalSpending.toLocaleString()}</p>
//                     </CardContent>
//                 </Card>
//             </div>
//
//             <Tabs defaultValue="monthly" className="w-full">
//                 <TabsList className="mb-4">
//                     <TabsTrigger value="monthly">Monthly Overview</TabsTrigger>
//                     <TabsTrigger value="categories">Categories</TabsTrigger>
//                 </TabsList>
//
//                 <TabsContent value="monthly">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Income vs Total Spending by Month</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="h-96">
//                                 <ResponsiveContainer width="100%" height="100%">
//                                     <BarChart data={monthlyData}>
//                                         <CartesianGrid strokeDasharray="3 3" />
//                                         <XAxis dataKey="month" />
//                                         <YAxis />
//                                         <Tooltip />
//                                         <Legend />
//                                         <Bar dataKey="income" fill="#4ade80" name="Income" />
//                                         <Bar dataKey={(data) =>
//                                             Object.values(data.spending).reduce((a, b) => a + b, 0)
//                                         } fill="#f87171" name="Total Spending" />
//                                     </BarChart>
//                                 </ResponsiveContainer>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </TabsContent>
//
//                 <TabsContent value="categories">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Spending by Category</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="h-96">
//                                 <ResponsiveContainer width="100%" height="100%">
//                                     <BarChart data={categoryData}>
//                                         <CartesianGrid strokeDasharray="3 3" />
//                                         <XAxis dataKey="month" />
//                                         <YAxis />
//                                         <Tooltip />
//                                         <Legend />
//                                         <Bar dataKey="groceries" fill="#60a5fa" name="Groceries" />
//                                         <Bar dataKey="utilities" fill="#34d399" name="Utilities" />
//                                         <Bar dataKey="rent" fill="#a78bfa" name="Rent" />
//                                         <Bar dataKey="entertainment" fill="#fbbf24" name="Entertainment" />
//                                     </BarChart>
//                                 </ResponsiveContainer>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// };
//
// export default StatisticsPage;