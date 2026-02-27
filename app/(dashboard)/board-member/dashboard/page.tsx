'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Scale, MessageSquare, AlertTriangle, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
// Demo: single fixed entity — no entity-selection UI needed
const useEntityContext = () => ({ selectedEntityId: 'org-001' });

const maturityTrend = [
    { month: 'Jan', score: 70 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 75 },
    { month: 'Apr', score: 74 },
    { month: 'May', score: 80 },
    { month: 'Jun', score: 85 },
];

const stpData = [
    { name: 'Manual', value: 30, color: '#f87171' },
    { name: 'Semi-Auto', value: 45, color: '#fbbf24' },
    { name: 'Full STP', value: 25, color: '#10b981' },
];

const entityComparison = [
    { name: 'Group PLC', score: 92, status: 'Optimized' },
    { name: 'ABC Bank', score: 81, status: 'Live' },
    { name: 'IT Sub', score: 74, status: 'In Progress' },
    { name: 'Global JV', score: 58, status: 'Not Started' },
];

// Entity-specific dashboard data
interface EntityDashboardData {
    governanceIndex: number;
    governanceChange: number;
    sectorBenchmark: number;
    openActions: number;
    overdueActions: number;
    closureRate: number;
    residualRisk: number;
    riskStatus: string;
    riskProfile: string;
    complianceHealth: number;
    complianceStatus: string;
    mandatoryFilings: number;
    maturityTrend: Array<{ month: string; score: number }>;
    stpData: Array<{ name: string; value: number; color: string }>;
    entityComparison: Array<{ name: string; score: number; status: string }>;
}

const entityDashboardData: Record<string, EntityDashboardData> = {
    // GlobalTech Holdings (Parent)
    'org-001': {
        governanceIndex: 81.4,
        governanceChange: 12,
        sectorBenchmark: 74.0,
        openActions: 24,
        overdueActions: 6,
        closureRate: 92,
        residualRisk: 14.2,
        riskStatus: 'Stable',
        riskProfile: 'Moderate',
        complianceHealth: 94,
        complianceStatus: 'On Track',
        mandatoryFilings: 12,
        maturityTrend: [
            { month: 'Jan', score: 70 },
            { month: 'Feb', score: 72 },
            { month: 'Mar', score: 75 },
            { month: 'Apr', score: 74 },
            { month: 'May', score: 80 },
            { month: 'Jun', score: 85 },
        ],
        stpData: [
            { name: 'Manual', value: 30, color: '#f87171' },
            { name: 'Semi-Auto', value: 45, color: '#fbbf24' },
            { name: 'Full STP', value: 25, color: '#10b981' },
        ],
        entityComparison: [
            { name: 'Board Effectiveness', score: 92, status: 'Optimized' },
            { name: 'Risk Management', score: 85, status: 'Live' },
            { name: 'Compliance', score: 94, status: 'Optimized' },
            { name: 'ESG Score', score: 78, status: 'In Progress' },
        ],
    },
    // TechBank Ltd (Subsidiary - Banking)
    'org-002': {
        governanceIndex: 72.3,
        governanceChange: 8,
        sectorBenchmark: 70.0,
        openActions: 18,
        overdueActions: 3,
        closureRate: 88,
        residualRisk: 22.8,
        riskStatus: 'Elevated',
        riskProfile: 'High',
        complianceHealth: 87,
        complianceStatus: 'Needs Attention',
        mandatoryFilings: 28,
        maturityTrend: [
            { month: 'Jan', score: 62 },
            { month: 'Feb', score: 65 },
            { month: 'Mar', score: 68 },
            { month: 'Apr', score: 70 },
            { month: 'May', score: 71 },
            { month: 'Jun', score: 72 },
        ],
        stpData: [
            { name: 'Manual', value: 40, color: '#f87171' },
            { name: 'Semi-Auto', value: 35, color: '#fbbf24' },
            { name: 'Full STP', value: 25, color: '#10b981' },
        ],
        entityComparison: [
            { name: 'Board Effectiveness', score: 78, status: 'Live' },
            { name: 'Risk Management', score: 72, status: 'In Progress' },
            { name: 'Compliance', score: 87, status: 'Live' },
            { name: 'ESG Score', score: 65, status: 'In Progress' },
        ],
    },
    // LogiSystems Inc (Subsidiary - Logistics)
    'org-003': {
        governanceIndex: 68.5,
        governanceChange: 15,
        sectorBenchmark: 65.0,
        openActions: 12,
        overdueActions: 2,
        closureRate: 95,
        residualRisk: 11.5,
        riskStatus: 'Low',
        riskProfile: 'Conservative',
        complianceHealth: 91,
        complianceStatus: 'On Track',
        mandatoryFilings: 8,
        maturityTrend: [
            { month: 'Jan', score: 55 },
            { month: 'Feb', score: 58 },
            { month: 'Mar', score: 60 },
            { month: 'Apr', score: 63 },
            { month: 'May', score: 66 },
            { month: 'Jun', score: 68 },
        ],
        stpData: [
            { name: 'Manual', value: 50, color: '#f87171' },
            { name: 'Semi-Auto', value: 30, color: '#fbbf24' },
            { name: 'Full STP', value: 20, color: '#10b981' },
        ],
        entityComparison: [
            { name: 'Board Effectiveness', score: 70, status: 'In Progress' },
            { name: 'Risk Management', score: 75, status: 'Live' },
            { name: 'Compliance', score: 91, status: 'Live' },
            { name: 'ESG Score', score: 58, status: 'Not Started' },
        ],
    },
};

// Aggregated data for "All Entities" view
const allEntitiesData: EntityDashboardData = {
    governanceIndex: 74.1,
    governanceChange: 10,
    sectorBenchmark: 70.0,
    openActions: 54,
    overdueActions: 11,
    closureRate: 91,
    residualRisk: 16.2,
    riskStatus: 'Moderate',
    riskProfile: 'Balanced',
    complianceHealth: 91,
    complianceStatus: 'On Track',
    mandatoryFilings: 48,
    maturityTrend: [
        { month: 'Jan', score: 62 },
        { month: 'Feb', score: 65 },
        { month: 'Mar', score: 68 },
        { month: 'Apr', score: 69 },
        { month: 'May', score: 72 },
        { month: 'Jun', score: 75 },
    ],
    stpData: [
        { name: 'Manual', value: 40, color: '#f87171' },
        { name: 'Semi-Auto', value: 37, color: '#fbbf24' },
        { name: 'Full STP', value: 23, color: '#10b981' },
    ],
    entityComparison: [
        { name: 'GlobalTech Holdings', score: 81, status: 'Optimized' },
        { name: 'TechBank Ltd', score: 72, status: 'Live' },
        { name: 'LogiSystems Inc', score: 68, status: 'In Progress' },
    ],
};

// Tab type definition
type TabType = 'Financials' | 'ESG' | 'Governance' | 'Risk' | 'Compliance';

// Chart data type
type ChartDataType = {
    donutData: Array<{ name: string; value: number; color: string }>;
    donutTitle: string;
    gaugeTitle: string;
    gaugeValue: number;
    gaugeMax: number;
    barTitle: string;
    barData: Array<{ quarter: string; actual: number; budget: number }>;
    barLegend: { actual: string; budget: string };
    barColors: { actual: string; budget: string };
};

// Entity-specific chart data
const chartDataByEntity: Record<string, Record<TabType, ChartDataType>> = {
    // GlobalTech Holdings - Parent company, strong financials
    'org-001': {
        Financials: {
            donutTitle: 'Quarter Wise Revenue',
            donutData: [
                { name: 'Q1', value: 30, color: '#1e3a5f' },
                { name: 'Q2', value: 22, color: '#7c3aed' },
                { name: 'Q3', value: 18, color: '#f97316' },
                { name: 'Q4', value: 30, color: '#3b82f6' },
            ],
            gaugeTitle: 'Total Revenue',
            gaugeValue: 56,
            gaugeMax: 92,
            barTitle: 'Actual vs Budget',
            barData: [
                { quarter: 'Q1', actual: 15, budget: 20 },
                { quarter: 'Q2', actual: 18, budget: 25 },
                { quarter: 'Q3', actual: 35, budget: 45 },
                { quarter: 'Q4', actual: 55, budget: 70 },
            ],
            barLegend: { actual: 'Actual', budget: 'Budget' },
            barColors: { actual: '#7c3aed', budget: '#f9a8d4' },
        },
        ESG: {
            donutTitle: 'ESG Score Breakdown',
            donutData: [
                { name: 'Environmental', value: 35, color: '#10b981' },
                { name: 'Social', value: 40, color: '#3b82f6' },
                { name: 'Governance', value: 25, color: '#8b5cf6' },
            ],
            gaugeTitle: 'Overall ESG Rating',
            gaugeValue: 78,
            gaugeMax: 100,
            barTitle: 'ESG Progress by Quarter',
            barData: [
                { quarter: 'Q1', actual: 65, budget: 70 },
                { quarter: 'Q2', actual: 72, budget: 75 },
                { quarter: 'Q3', actual: 75, budget: 80 },
                { quarter: 'Q4', actual: 78, budget: 85 },
            ],
            barLegend: { actual: 'Score', budget: 'Target' },
            barColors: { actual: '#10b981', budget: '#a7f3d0' },
        },
        Governance: {
            donutTitle: 'Governance Metrics',
            donutData: [
                { name: 'Board Meetings', value: 45, color: '#1e3a5f' },
                { name: 'Compliance', value: 30, color: '#0ea5e9' },
                { name: 'Risk Oversight', value: 25, color: '#6366f1' },
            ],
            gaugeTitle: 'Governance Index',
            gaugeValue: 81,
            gaugeMax: 100,
            barTitle: 'Board Effectiveness',
            barData: [
                { quarter: 'Q1', actual: 85, budget: 90 },
                { quarter: 'Q2', actual: 88, budget: 90 },
                { quarter: 'Q3', actual: 82, budget: 90 },
                { quarter: 'Q4', actual: 91, budget: 95 },
            ],
            barLegend: { actual: 'Score', budget: 'Benchmark' },
            barColors: { actual: '#1e3a5f', budget: '#93c5fd' },
        },
        Risk: {
            donutTitle: 'Risk Distribution',
            donutData: [
                { name: 'Operational', value: 35, color: '#ef4444' },
                { name: 'Financial', value: 25, color: '#f97316' },
                { name: 'Strategic', value: 20, color: '#eab308' },
                { name: 'Compliance', value: 20, color: '#84cc16' },
            ],
            gaugeTitle: 'Risk Appetite Utilization',
            gaugeValue: 42,
            gaugeMax: 100,
            barTitle: 'Risk Incidents vs Mitigated',
            barData: [
                { quarter: 'Q1', actual: 12, budget: 15 },
                { quarter: 'Q2', actual: 8, budget: 12 },
                { quarter: 'Q3', actual: 5, budget: 10 },
                { quarter: 'Q4', actual: 3, budget: 8 },
            ],
            barLegend: { actual: 'Open', budget: 'Mitigated' },
            barColors: { actual: '#ef4444', budget: '#86efac' },
        },
        Compliance: {
            donutTitle: 'Compliance Status',
            donutData: [
                { name: 'Compliant', value: 75, color: '#10b981' },
                { name: 'In Progress', value: 15, color: '#f59e0b' },
                { name: 'Non-Compliant', value: 10, color: '#ef4444' },
            ],
            gaugeTitle: 'Compliance Score',
            gaugeValue: 94,
            gaugeMax: 100,
            barTitle: 'Regulatory Filings Status',
            barData: [
                { quarter: 'Q1', actual: 95, budget: 100 },
                { quarter: 'Q2', actual: 92, budget: 100 },
                { quarter: 'Q3', actual: 98, budget: 100 },
                { quarter: 'Q4', actual: 94, budget: 100 },
            ],
            barLegend: { actual: 'Completed', budget: 'Required' },
            barColors: { actual: '#10b981', budget: '#d1d5db' },
        },
    },
    // TechBank Ltd - Banking subsidiary, focus on risk and compliance
    'org-002': {
        Financials: {
            donutTitle: 'Quarter Wise Revenue',
            donutData: [
                { name: 'Q1', value: 28, color: '#1e3a5f' },
                { name: 'Q2', value: 25, color: '#7c3aed' },
                { name: 'Q3', value: 22, color: '#f97316' },
                { name: 'Q4', value: 25, color: '#3b82f6' },
            ],
            gaugeTitle: 'Total Revenue',
            gaugeValue: 42,
            gaugeMax: 80,
            barTitle: 'Actual vs Budget',
            barData: [
                { quarter: 'Q1', actual: 10, budget: 12 },
                { quarter: 'Q2', actual: 11, budget: 14 },
                { quarter: 'Q3', actual: 9, budget: 15 },
                { quarter: 'Q4', actual: 12, budget: 16 },
            ],
            barLegend: { actual: 'Actual', budget: 'Budget' },
            barColors: { actual: '#7c3aed', budget: '#f9a8d4' },
        },
        ESG: {
            donutTitle: 'ESG Score Breakdown',
            donutData: [
                { name: 'Environmental', value: 25, color: '#10b981' },
                { name: 'Social', value: 35, color: '#3b82f6' },
                { name: 'Governance', value: 40, color: '#8b5cf6' },
            ],
            gaugeTitle: 'Overall ESG Rating',
            gaugeValue: 68,
            gaugeMax: 100,
            barTitle: 'ESG Progress by Quarter',
            barData: [
                { quarter: 'Q1', actual: 55, budget: 65 },
                { quarter: 'Q2', actual: 60, budget: 68 },
                { quarter: 'Q3', actual: 65, budget: 70 },
                { quarter: 'Q4', actual: 68, budget: 75 },
            ],
            barLegend: { actual: 'Score', budget: 'Target' },
            barColors: { actual: '#10b981', budget: '#a7f3d0' },
        },
        Governance: {
            donutTitle: 'Governance Metrics',
            donutData: [
                { name: 'Board Meetings', value: 40, color: '#1e3a5f' },
                { name: 'Compliance', value: 35, color: '#0ea5e9' },
                { name: 'Risk Oversight', value: 25, color: '#6366f1' },
            ],
            gaugeTitle: 'Governance Index',
            gaugeValue: 72,
            gaugeMax: 100,
            barTitle: 'Board Effectiveness',
            barData: [
                { quarter: 'Q1', actual: 70, budget: 80 },
                { quarter: 'Q2', actual: 72, budget: 82 },
                { quarter: 'Q3', actual: 68, budget: 80 },
                { quarter: 'Q4', actual: 75, budget: 85 },
            ],
            barLegend: { actual: 'Score', budget: 'Benchmark' },
            barColors: { actual: '#1e3a5f', budget: '#93c5fd' },
        },
        Risk: {
            donutTitle: 'Risk Distribution',
            donutData: [
                { name: 'Credit Risk', value: 40, color: '#ef4444' },
                { name: 'Market Risk', value: 25, color: '#f97316' },
                { name: 'Operational', value: 20, color: '#eab308' },
                { name: 'Regulatory', value: 15, color: '#84cc16' },
            ],
            gaugeTitle: 'Risk Appetite Utilization',
            gaugeValue: 68,
            gaugeMax: 100,
            barTitle: 'Risk Incidents vs Mitigated',
            barData: [
                { quarter: 'Q1', actual: 18, budget: 20 },
                { quarter: 'Q2', actual: 15, budget: 18 },
                { quarter: 'Q3', actual: 12, budget: 15 },
                { quarter: 'Q4', actual: 8, budget: 12 },
            ],
            barLegend: { actual: 'Open', budget: 'Mitigated' },
            barColors: { actual: '#ef4444', budget: '#86efac' },
        },
        Compliance: {
            donutTitle: 'Compliance Status',
            donutData: [
                { name: 'Compliant', value: 70, color: '#10b981' },
                { name: 'In Progress', value: 20, color: '#f59e0b' },
                { name: 'Non-Compliant', value: 10, color: '#ef4444' },
            ],
            gaugeTitle: 'Compliance Score',
            gaugeValue: 87,
            gaugeMax: 100,
            barTitle: 'Regulatory Filings Status',
            barData: [
                { quarter: 'Q1', actual: 88, budget: 100 },
                { quarter: 'Q2', actual: 85, budget: 100 },
                { quarter: 'Q3', actual: 90, budget: 100 },
                { quarter: 'Q4', actual: 87, budget: 100 },
            ],
            barLegend: { actual: 'Completed', budget: 'Required' },
            barColors: { actual: '#10b981', budget: '#d1d5db' },
        },
    },
    // LogiSystems Inc - Logistics company, focus on operations
    'org-003': {
        Financials: {
            donutTitle: 'Quarter Wise Revenue',
            donutData: [
                { name: 'Q1', value: 20, color: '#1e3a5f' },
                { name: 'Q2', value: 25, color: '#7c3aed' },
                { name: 'Q3', value: 30, color: '#f97316' },
                { name: 'Q4', value: 25, color: '#3b82f6' },
            ],
            gaugeTitle: 'Total Revenue',
            gaugeValue: 28,
            gaugeMax: 50,
            barTitle: 'Actual vs Budget',
            barData: [
                { quarter: 'Q1', actual: 5, budget: 8 },
                { quarter: 'Q2', actual: 7, budget: 10 },
                { quarter: 'Q3', actual: 8, budget: 12 },
                { quarter: 'Q4', actual: 8, budget: 14 },
            ],
            barLegend: { actual: 'Actual', budget: 'Budget' },
            barColors: { actual: '#7c3aed', budget: '#f9a8d4' },
        },
        ESG: {
            donutTitle: 'ESG Score Breakdown',
            donutData: [
                { name: 'Environmental', value: 45, color: '#10b981' },
                { name: 'Social', value: 30, color: '#3b82f6' },
                { name: 'Governance', value: 25, color: '#8b5cf6' },
            ],
            gaugeTitle: 'Overall ESG Rating',
            gaugeValue: 72,
            gaugeMax: 100,
            barTitle: 'ESG Progress by Quarter',
            barData: [
                { quarter: 'Q1', actual: 60, budget: 65 },
                { quarter: 'Q2', actual: 65, budget: 70 },
                { quarter: 'Q3', actual: 70, budget: 72 },
                { quarter: 'Q4', actual: 72, budget: 78 },
            ],
            barLegend: { actual: 'Score', budget: 'Target' },
            barColors: { actual: '#10b981', budget: '#a7f3d0' },
        },
        Governance: {
            donutTitle: 'Governance Metrics',
            donutData: [
                { name: 'Board Meetings', value: 35, color: '#1e3a5f' },
                { name: 'Compliance', value: 25, color: '#0ea5e9' },
                { name: 'Risk Oversight', value: 40, color: '#6366f1' },
            ],
            gaugeTitle: 'Governance Index',
            gaugeValue: 68,
            gaugeMax: 100,
            barTitle: 'Board Effectiveness',
            barData: [
                { quarter: 'Q1', actual: 65, budget: 75 },
                { quarter: 'Q2', actual: 68, budget: 78 },
                { quarter: 'Q3', actual: 66, budget: 78 },
                { quarter: 'Q4', actual: 70, budget: 80 },
            ],
            barLegend: { actual: 'Score', budget: 'Benchmark' },
            barColors: { actual: '#1e3a5f', budget: '#93c5fd' },
        },
        Risk: {
            donutTitle: 'Risk Distribution',
            donutData: [
                { name: 'Supply Chain', value: 40, color: '#ef4444' },
                { name: 'Operational', value: 30, color: '#f97316' },
                { name: 'Financial', value: 15, color: '#eab308' },
                { name: 'Compliance', value: 15, color: '#84cc16' },
            ],
            gaugeTitle: 'Risk Appetite Utilization',
            gaugeValue: 35,
            gaugeMax: 100,
            barTitle: 'Risk Incidents vs Mitigated',
            barData: [
                { quarter: 'Q1', actual: 8, budget: 10 },
                { quarter: 'Q2', actual: 6, budget: 9 },
                { quarter: 'Q3', actual: 4, budget: 7 },
                { quarter: 'Q4', actual: 3, budget: 5 },
            ],
            barLegend: { actual: 'Open', budget: 'Mitigated' },
            barColors: { actual: '#ef4444', budget: '#86efac' },
        },
        Compliance: {
            donutTitle: 'Compliance Status',
            donutData: [
                { name: 'Compliant', value: 80, color: '#10b981' },
                { name: 'In Progress', value: 12, color: '#f59e0b' },
                { name: 'Non-Compliant', value: 8, color: '#ef4444' },
            ],
            gaugeTitle: 'Compliance Score',
            gaugeValue: 91,
            gaugeMax: 100,
            barTitle: 'Regulatory Filings Status',
            barData: [
                { quarter: 'Q1', actual: 90, budget: 100 },
                { quarter: 'Q2', actual: 88, budget: 100 },
                { quarter: 'Q3', actual: 92, budget: 100 },
                { quarter: 'Q4', actual: 91, budget: 100 },
            ],
            barLegend: { actual: 'Completed', budget: 'Required' },
            barColors: { actual: '#10b981', budget: '#d1d5db' },
        },
    },
};

// Default chart data (used for All Entities view)
const defaultChartData: Record<TabType, ChartDataType> = {
    Financials: {
        donutTitle: 'Quarter Wise Revenue',
        donutData: [
            { name: 'Q1', value: 30, color: '#1e3a5f' },
            { name: 'Q2', value: 22, color: '#7c3aed' },
            { name: 'Q3', value: 18, color: '#f97316' },
            { name: 'Q4', value: 30, color: '#3b82f6' },
        ],
        gaugeTitle: 'Total Revenue',
        gaugeValue: 126,
        gaugeMax: 200,
        barTitle: 'Actual vs Budget',
        barData: [
            { quarter: 'Q1', actual: 30, budget: 40 },
            { quarter: 'Q2', actual: 36, budget: 49 },
            { quarter: 'Q3', actual: 52, budget: 72 },
            { quarter: 'Q4', actual: 75, budget: 100 },
        ],
        barLegend: { actual: 'Actual', budget: 'Budget' },
        barColors: { actual: '#7c3aed', budget: '#f9a8d4' },
    },
    ESG: {
        donutTitle: 'ESG Score Breakdown',
        donutData: [
            { name: 'Environmental', value: 35, color: '#10b981' },
            { name: 'Social', value: 35, color: '#3b82f6' },
            { name: 'Governance', value: 30, color: '#8b5cf6' },
        ],
        gaugeTitle: 'Overall ESG Rating',
        gaugeValue: 73,
        gaugeMax: 100,
        barTitle: 'ESG Progress by Quarter',
        barData: [
            { quarter: 'Q1', actual: 60, budget: 67 },
            { quarter: 'Q2', actual: 66, budget: 71 },
            { quarter: 'Q3', actual: 70, budget: 74 },
            { quarter: 'Q4', actual: 73, budget: 79 },
        ],
        barLegend: { actual: 'Score', budget: 'Target' },
        barColors: { actual: '#10b981', budget: '#a7f3d0' },
    },
    Governance: {
        donutTitle: 'Governance Metrics',
        donutData: [
            { name: 'Board Meetings', value: 40, color: '#1e3a5f' },
            { name: 'Compliance', value: 30, color: '#0ea5e9' },
            { name: 'Risk Oversight', value: 30, color: '#6366f1' },
        ],
        gaugeTitle: 'Governance Index',
        gaugeValue: 74,
        gaugeMax: 100,
        barTitle: 'Board Effectiveness',
        barData: [
            { quarter: 'Q1', actual: 73, budget: 82 },
            { quarter: 'Q2', actual: 76, budget: 83 },
            { quarter: 'Q3', actual: 72, budget: 83 },
            { quarter: 'Q4', actual: 79, budget: 87 },
        ],
        barLegend: { actual: 'Score', budget: 'Benchmark' },
        barColors: { actual: '#1e3a5f', budget: '#93c5fd' },
    },
    Risk: {
        donutTitle: 'Risk Distribution',
        donutData: [
            { name: 'Operational', value: 35, color: '#ef4444' },
            { name: 'Financial', value: 25, color: '#f97316' },
            { name: 'Strategic', value: 20, color: '#eab308' },
            { name: 'Compliance', value: 20, color: '#84cc16' },
        ],
        gaugeTitle: 'Risk Appetite Utilization',
        gaugeValue: 48,
        gaugeMax: 100,
        barTitle: 'Risk Incidents vs Mitigated',
        barData: [
            { quarter: 'Q1', actual: 38, budget: 45 },
            { quarter: 'Q2', actual: 29, budget: 39 },
            { quarter: 'Q3', actual: 21, budget: 32 },
            { quarter: 'Q4', actual: 14, budget: 25 },
        ],
        barLegend: { actual: 'Open', budget: 'Mitigated' },
        barColors: { actual: '#ef4444', budget: '#86efac' },
    },
    Compliance: {
        donutTitle: 'Compliance Status',
        donutData: [
            { name: 'Compliant', value: 75, color: '#10b981' },
            { name: 'In Progress', value: 16, color: '#f59e0b' },
            { name: 'Non-Compliant', value: 9, color: '#ef4444' },
        ],
        gaugeTitle: 'Compliance Score',
        gaugeValue: 91,
        gaugeMax: 100,
        barTitle: 'Regulatory Filings Status',
        barData: [
            { quarter: 'Q1', actual: 91, budget: 100 },
            { quarter: 'Q2', actual: 88, budget: 100 },
            { quarter: 'Q3', actual: 93, budget: 100 },
            { quarter: 'Q4', actual: 91, budget: 100 },
        ],
        barLegend: { actual: 'Completed', budget: 'Required' },
        barColors: { actual: '#10b981', budget: '#d1d5db' },
    },
};

// Meeting types for categorization
const meetingTypes = {
    'Board Meeting': 'board',
    'Remuneration Meeting': 'remuneration',
    'Finance Meeting': 'finance',
    'Audit Committee': 'audit',
    'Risk Committee': 'risk',
    'ESG Committee': 'esg'
};

// Which KPI tabs are relevant for each meeting category
const meetingCategoryTabs: Record<string, TabType[]> = {
    'board': ['Financials', 'Governance', 'Risk', 'Compliance'],
    'finance': ['Financials'],
    'audit': ['Compliance', 'Risk'],
    'risk': ['Risk', 'Compliance'],
    'esg': ['ESG', 'Governance'],
    'remuneration': ['Governance', 'Financials'],
};

// Category colors matching the legend (only 3 colors)
const categoryColors: Record<string, { bg: string; badge: string }> = {
    remuneration: { bg: 'bg-purple-400', badge: 'bg-purple-500' },
    finance: { bg: 'bg-blue-400', badge: 'bg-blue-500' },
    audit: { bg: 'bg-pink-400', badge: 'bg-pink-500' },
    board: { bg: 'bg-blue-400', badge: 'bg-blue-500' },       // Same as Finance
    risk: { bg: 'bg-pink-400', badge: 'bg-pink-500' },        // Same as Audit
    esg: { bg: 'bg-purple-400', badge: 'bg-purple-500' },     // Same as Remuneration
};

// Generate meetings based on month/year and optionally filter by entity
const getMeetingsForMonth = (date: Date, entityId?: string | null) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Sample meeting data with entityId - in real app this would come from API
    const allMeetings: Record<string, Array<{
        id: string;
        date: number;
        month: string;
        year: number;
        title: string;
        time: string;
        type: string;
        status: string;
        subtitle?: string;
        category: string;
        entityId: string;
    }>> = {
        // January 2025
        '0-2025': [
            { id: 'meeting-jan-1', date: 15, month: 'JAN', year: 2025, title: 'Board Meeting', time: '10:00AM - 11:00AM', type: 'Meeting', status: 'Completed', category: 'board', entityId: 'org-001' },
            { id: 'meeting-jan-2', date: 22, month: 'JAN', year: 2025, title: 'Finance Meeting', time: '2:00PM - 3:00PM', type: 'Meeting', status: 'Completed', category: 'finance', entityId: 'org-001' },
            { id: 'meeting-jan-3', date: 18, month: 'JAN', year: 2025, title: 'Board Meeting', time: '9:00AM - 10:00AM', type: 'Meeting', status: 'Completed', category: 'board', entityId: 'org-002' },
            { id: 'meeting-jan-4', date: 25, month: 'JAN', year: 2025, title: 'Risk Committee', time: '11:00AM - 12:00PM', type: 'Committee', status: 'Completed', category: 'risk', entityId: 'org-002' },
        ],
        // February 2025
        '1-2025': [
            { id: 'meeting-feb-1', date: 10, month: 'FEB', year: 2025, title: 'Audit Committee', time: '9:00AM - 10:30AM', type: 'Committee', status: 'Completed', category: 'audit', entityId: 'org-001' },
            { id: 'meeting-feb-2', date: 18, month: 'FEB', year: 2025, title: 'Risk Committee', time: '11:00AM - 12:00PM', type: 'Committee', status: 'Completed', category: 'risk', entityId: 'org-001' },
            { id: 'meeting-feb-3', date: 14, month: 'FEB', year: 2025, title: 'Board Meeting', time: '10:00AM - 11:30AM', type: 'Meeting', status: 'Completed', category: 'board', entityId: 'org-003' },
        ],
        // March 2025
        '2-2025': [
            { id: 'meeting-mar-1', date: 5, month: 'MAR', year: 2025, title: 'ESG Committee', time: '10:00AM - 11:00AM', type: 'Committee', status: 'Completed', category: 'esg', entityId: 'org-001' },
            { id: 'meeting-mar-2', date: 20, month: 'MAR', year: 2025, title: 'Board Meeting', time: '10:00AM - 12:00PM', type: 'Meeting', status: 'Completed', category: 'board', entityId: 'org-001' },
            { id: 'meeting-mar-3', date: 12, month: 'MAR', year: 2025, title: 'Finance Meeting', time: '2:00PM - 3:30PM', type: 'Meeting', status: 'Completed', category: 'finance', entityId: 'org-002' },
            { id: 'meeting-mar-4', date: 25, month: 'MAR', year: 2025, title: 'Operations Committee', time: '9:00AM - 10:00AM', type: 'Committee', status: 'Completed', category: 'board', entityId: 'org-003' },
        ],
        // April 2025
        '3-2025': [
            { id: 'meeting-apr-1', date: 27, month: 'APR', year: 2025, title: 'Board Meeting', time: '10:00AM - 11:00AM', type: 'Meeting', status: 'Scheduled', category: 'board', entityId: 'org-001' },
            { id: 'meeting-apr-2', date: 28, month: 'APR', year: 2025, title: 'Remuneration Meeting', time: '10:00AM - 11:00AM', type: 'Meeting', status: 'Scheduled', category: 'remuneration', entityId: 'org-001' },
            { id: 'meeting-apr-3', date: 29, month: 'APR', year: 2025, title: 'Finance Meeting', subtitle: 'Circular', time: '2:00PM - 3:00PM', type: 'Meeting', status: 'Scheduled', category: 'finance', entityId: 'org-001' },
            { id: 'meeting-apr-4', date: 15, month: 'APR', year: 2025, title: 'Board Meeting', time: '9:00AM - 11:00AM', type: 'Meeting', status: 'Scheduled', category: 'board', entityId: 'org-002' },
            { id: 'meeting-apr-5', date: 22, month: 'APR', year: 2025, title: 'Audit Committee', time: '2:00PM - 4:00PM', type: 'Committee', status: 'Scheduled', category: 'audit', entityId: 'org-002' },
            { id: 'meeting-apr-6', date: 18, month: 'APR', year: 2025, title: 'Operations Review', time: '10:00AM - 11:30AM', type: 'Meeting', status: 'Scheduled', category: 'board', entityId: 'org-003' },
        ],
        // May 2025
        '4-2025': [
            { id: 'meeting-may-1', date: 8, month: 'MAY', year: 2025, title: 'Audit Committee', time: '9:00AM - 10:30AM', type: 'Committee', status: 'Scheduled', category: 'audit', entityId: 'org-001' },
            { id: 'meeting-may-2', date: 15, month: 'MAY', year: 2025, title: 'Board Meeting', time: '10:00AM - 12:00PM', type: 'Meeting', status: 'Scheduled', category: 'board', entityId: 'org-001' },
            { id: 'meeting-may-3', date: 22, month: 'MAY', year: 2025, title: 'Risk Committee', time: '10:00AM - 12:00PM', type: 'Committee', status: 'Scheduled', category: 'risk', entityId: 'org-001' },
            { id: 'meeting-may-4', date: 29, month: 'MAY', year: 2025, title: 'Finance Meeting', time: '2:00PM - 3:30PM', type: 'Meeting', status: 'Scheduled', category: 'finance', entityId: 'org-002' },
            { id: 'meeting-may-5', date: 12, month: 'MAY', year: 2025, title: 'Board Meeting', time: '9:00AM - 11:00AM', type: 'Meeting', status: 'Scheduled', category: 'board', entityId: 'org-003' },
        ],
        // June 2025
        '5-2025': [
            { id: 'meeting-jun-1', date: 5, month: 'JUN', year: 2025, title: 'Finance Meeting', time: '10:00AM - 11:00AM', type: 'Meeting', status: 'Scheduled', category: 'finance', entityId: 'org-001' },
            { id: 'meeting-jun-2', date: 18, month: 'JUN', year: 2025, title: 'ESG Committee', time: '11:00AM - 12:30PM', type: 'Committee', status: 'Scheduled', category: 'esg', entityId: 'org-001' },
            { id: 'meeting-jun-3', date: 10, month: 'JUN', year: 2025, title: 'Board Meeting', time: '9:00AM - 10:30AM', type: 'Meeting', status: 'Scheduled', category: 'board', entityId: 'org-002' },
            { id: 'meeting-jun-4', date: 20, month: 'JUN', year: 2025, title: 'Risk Committee', time: '2:00PM - 3:30PM', type: 'Committee', status: 'Scheduled', category: 'risk', entityId: 'org-002' },
        ],
    };

    const key = `${month}-${year}`;
    const monthMeetings = allMeetings[key] || [];

    // Filter by entity if specified
    if (entityId) {
        const filteredMeetings = monthMeetings.filter(m => m.entityId === entityId);

        // If no meetings found for this entity, generate mock meetings
        if (filteredMeetings.length === 0) {
            const seed = entityId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            const meetingCategories = ['board', 'finance', 'audit', 'risk'];

            // Generate 2-3 mock meetings for this entity
            const numMeetings = 2 + (seed % 2);
            const mockMeetings = [];

            for (let i = 0; i < numMeetings; i++) {
                const category = meetingCategories[(seed + i) % meetingCategories.length];
                const titles: Record<string, string> = {
                    'board': 'Board Meeting',
                    'finance': 'Finance Meeting',
                    'audit': 'Audit Committee',
                    'risk': 'Risk Committee',
                };

                mockMeetings.push({
                    id: `mock-meeting-${entityId}-${month}-${i}`,
                    date: 10 + (i * 7) + (seed % 5),
                    month: monthNames[month],
                    year: year,
                    title: titles[category],
                    time: `${9 + i}:00AM - ${10 + i}:00AM`,
                    type: 'Meeting',
                    status: month < new Date().getMonth() && year <= new Date().getFullYear() ? 'Completed' : 'Scheduled',
                    category: category,
                    entityId: entityId,
                });
            }

            return mockMeetings;
        }

        return filteredMeetings;
    }

    return monthMeetings;
};

// Agenda items by meeting type
const meetingAgendas: Record<string, Array<{ id: number; title: string; time: string; duration: string; speaker: string }>> = {
    'board': [
        { id: 1, title: 'Call to Order', time: '10:00 - 10:05', duration: '5 min', speaker: 'Board Chair' },
        { id: 2, title: 'Approval of Previous Meeting Minutes', time: '10:05 - 10:15', duration: '10 min', speaker: 'Company Secretary' },
        { id: 3, title: 'CEO Report', time: '10:15 - 10:35', duration: '20 min', speaker: 'CEO' },
        { id: 4, title: 'Financial Performance Review', time: '10:35 - 11:00', duration: '25 min', speaker: 'CFO' },
        { id: 5, title: 'Strategic Initiatives Update', time: '11:00 - 11:30', duration: '30 min', speaker: 'CEO' },
        { id: 6, title: 'Risk Management Report', time: '11:30 - 11:50', duration: '20 min', speaker: 'CRO' },
        { id: 7, title: 'Q&A & Adjournment', time: '11:50 - 12:00', duration: '10 min', speaker: 'Board Chair' },
    ],
    'audit': [
        { id: 1, title: 'Opening & Quorum Confirmation', time: '9:00 - 9:05', duration: '5 min', speaker: 'Audit Chair' },
        { id: 2, title: 'Internal Audit Report', time: '9:05 - 9:35', duration: '30 min', speaker: 'Head of Internal Audit' },
        { id: 3, title: 'External Audit Findings', time: '9:35 - 10:05', duration: '30 min', speaker: 'External Auditor' },
        { id: 4, title: 'Management Response', time: '10:05 - 10:20', duration: '15 min', speaker: 'CFO' },
        { id: 5, title: 'Closing Remarks', time: '10:20 - 10:30', duration: '10 min', speaker: 'Audit Chair' },
    ],
    'finance': [
        { id: 1, title: 'Opening', time: '2:00 - 2:05', duration: '5 min', speaker: 'Finance Chair' },
        { id: 2, title: 'Q3 Financial Results', time: '2:05 - 2:30', duration: '25 min', speaker: 'CFO' },
        { id: 3, title: 'Budget Review', time: '2:30 - 2:50', duration: '20 min', speaker: 'Finance Director' },
        { id: 4, title: 'Investment Update', time: '2:50 - 3:00', duration: '10 min', speaker: 'Treasury Head' },
    ],
    'risk': [
        { id: 1, title: 'Opening', time: '11:00 - 11:05', duration: '5 min', speaker: 'Risk Chair' },
        { id: 2, title: 'Risk Dashboard Review', time: '11:05 - 11:30', duration: '25 min', speaker: 'CRO' },
        { id: 3, title: 'Emerging Risks', time: '11:30 - 11:50', duration: '20 min', speaker: 'Risk Manager' },
        { id: 4, title: 'Closing', time: '11:50 - 12:00', duration: '10 min', speaker: 'Risk Chair' },
    ],
    'remuneration': [
        { id: 1, title: 'Opening', time: '10:00 - 10:05', duration: '5 min', speaker: 'Remuneration Chair' },
        { id: 2, title: 'Executive Compensation Review', time: '10:05 - 10:30', duration: '25 min', speaker: 'HR Director' },
        { id: 3, title: 'Bonus Approval', time: '10:30 - 10:50', duration: '20 min', speaker: 'Remuneration Chair' },
        { id: 4, title: 'Closing', time: '10:50 - 11:00', duration: '10 min', speaker: 'Remuneration Chair' },
    ],
    'esg': [
        { id: 1, title: 'Opening', time: '10:00 - 10:05', duration: '5 min', speaker: 'ESG Chair' },
        { id: 2, title: 'Sustainability Report', time: '10:05 - 10:30', duration: '25 min', speaker: 'Sustainability Officer' },
        { id: 3, title: 'Carbon Footprint Update', time: '10:30 - 10:50', duration: '20 min', speaker: 'Environment Manager' },
        { id: 4, title: 'Closing', time: '10:50 - 11:00', duration: '10 min', speaker: 'ESG Chair' },
    ],
};

// Meeting locations
const meetingLocations: Record<string, string> = {
    'board': 'Main Boardroom, Floor 12',
    'audit': 'Audit Suite, Floor 8',
    'finance': 'Finance Conference Room',
    'risk': 'Risk Management Suite',
    'remuneration': 'HR Conference Room',
    'esg': 'Green Conference Room',
};

// Meeting attendees by entity and category
const meetingAttendeesByEntity: Record<string, Record<string, { invited: number; pending: number; confirmed: number }>> = {
    // GlobalTech Holdings - larger organization
    'org-001': {
        'board': { invited: 16, pending: 2, confirmed: 14 },
        'audit': { invited: 8, pending: 1, confirmed: 7 },
        'finance': { invited: 10, pending: 0, confirmed: 10 },
        'risk': { invited: 6, pending: 1, confirmed: 5 },
        'remuneration': { invited: 5, pending: 0, confirmed: 5 },
        'esg': { invited: 7, pending: 2, confirmed: 5 },
    },
    // TechBank Ltd - banking subsidiary
    'org-002': {
        'board': { invited: 12, pending: 1, confirmed: 11 },
        'audit': { invited: 10, pending: 2, confirmed: 8 },
        'finance': { invited: 8, pending: 1, confirmed: 7 },
        'risk': { invited: 9, pending: 1, confirmed: 8 },
        'remuneration': { invited: 4, pending: 0, confirmed: 4 },
        'esg': { invited: 5, pending: 1, confirmed: 4 },
    },
    // LogiSystems Inc - smaller logistics company
    'org-003': {
        'board': { invited: 8, pending: 1, confirmed: 7 },
        'audit': { invited: 5, pending: 0, confirmed: 5 },
        'finance': { invited: 6, pending: 1, confirmed: 5 },
        'risk': { invited: 4, pending: 0, confirmed: 4 },
        'remuneration': { invited: 3, pending: 0, confirmed: 3 },
        'esg': { invited: 4, pending: 1, confirmed: 3 },
    },
};

// Default attendees (used when no entity is selected or as fallback)
const defaultMeetingAttendees: Record<string, { invited: number; pending: number; confirmed: number }> = {
    'board': { invited: 16, pending: 2, confirmed: 14 },
    'audit': { invited: 8, pending: 1, confirmed: 7 },
    'finance': { invited: 10, pending: 0, confirmed: 10 },
    'risk': { invited: 6, pending: 1, confirmed: 5 },
    'remuneration': { invited: 5, pending: 0, confirmed: 5 },
    'esg': { invited: 7, pending: 2, confirmed: 5 },
};

// Available users for task assignment
const availableUsers = [
    { id: 'user-1', name: 'Mike Salguero', initials: 'MS', color: 'bg-amber-500' },
    { id: 'user-2', name: 'Sarah Chen', initials: 'SC', color: 'bg-blue-500' },
    { id: 'user-3', name: 'John Smith', initials: 'JS', color: 'bg-purple-500' },
    { id: 'user-4', name: 'Emily Davis', initials: 'ED', color: 'bg-pink-500' },
    { id: 'user-5', name: 'Robert Wilson', initials: 'RW', color: 'bg-green-500' },
    { id: 'user-6', name: 'Lisa Anderson', initials: 'LA', color: 'bg-red-500' },
];

// Task type definition
interface Task {
    id: number;
    title: string;
    assignee: string;
    status: 'In progress' | 'Pending' | 'Not started' | 'Completed';
    statusColor: string;
    assignedUsers: string[]; // User IDs
    dueDate?: string;
}

// Entity-specific tasks
const tasksByEntity: Record<string, Task[]> = {
    // GlobalTech Holdings - Corporate tasks
    'org-001': [
        { id: 1, title: 'Finalize board pack', assignee: 'CoSec', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-1', 'user-2'] },
        { id: 2, title: 'Confirm external speaker availability', assignee: 'CEO Office', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-3'] },
        { id: 3, title: 'Prepare Risk Management', assignee: 'Risk', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-4', 'user-5'] },
        { id: 4, title: 'Circulate draft minutes', assignee: 'CoSec', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-1'] },
    ],
    // TechBank Ltd - Banking-focused tasks
    'org-002': [
        { id: 1, title: 'Regulatory compliance review', assignee: 'Compliance', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-2', 'user-4'] },
        { id: 2, title: 'Credit risk assessment update', assignee: 'Risk', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-5'] },
        { id: 3, title: 'Prepare audit findings response', assignee: 'Internal Audit', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-3', 'user-6'] },
    ],
    // LogiSystems Inc - Operations-focused tasks
    'org-003': [
        { id: 1, title: 'Supply chain review', assignee: 'Operations', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-1'] },
        { id: 2, title: 'Fleet safety compliance report', assignee: 'Safety', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-4'] },
        { id: 3, title: 'Update vendor contracts', assignee: 'Legal', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-2', 'user-3'] },
        { id: 4, title: 'Quarterly logistics KPIs', assignee: 'Operations', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-5', 'user-6'] },
    ],
};

// Default tasks (used for All Entities view)
const defaultTasks: Task[] = [
    { id: 1, title: 'Finalize board pack', assignee: 'CoSec', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-1', 'user-2'] },
    { id: 2, title: 'Confirm external speaker availability', assignee: 'CEO Office', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-3'] },
    { id: 3, title: 'Prepare Risk Management', assignee: 'Risk', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-4', 'user-5'] },
    { id: 4, title: 'Circulate draft minutes', assignee: 'CoSec', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-1'] },
];

// Meeting-category-specific tasks
const tasksByMeetingCategory: Record<string, Task[]> = {
    'board': [
        { id: 1, title: 'Finalize board pack', assignee: 'CoSec', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-1', 'user-2'] },
        { id: 2, title: 'Confirm external speaker availability', assignee: 'CEO Office', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-3'] },
        { id: 3, title: 'Prepare CEO strategic update', assignee: 'CEO Office', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-4'] },
        { id: 4, title: 'Circulate draft minutes', assignee: 'CoSec', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-1'] },
    ],
    'finance': [
        { id: 1, title: 'Prepare Q financials report', assignee: 'Finance', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-2', 'user-3'] },
        { id: 2, title: 'Budget variance analysis', assignee: 'Finance Director', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-3'] },
        { id: 3, title: 'Treasury investment review', assignee: 'Treasury', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-5'] },
        { id: 4, title: 'Board finance pack distribution', assignee: 'CoSec', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-1'] },
    ],
    'audit': [
        { id: 1, title: 'Review internal audit findings', assignee: 'Internal Audit', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-3', 'user-6'] },
        { id: 2, title: 'Prepare management response', assignee: 'CFO', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-2'] },
        { id: 3, title: 'External auditor pre-meeting briefing', assignee: 'Finance', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-5'] },
        { id: 4, title: 'Update audit action register', assignee: 'CoSec', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-1'] },
    ],
    'risk': [
        { id: 1, title: 'Update risk dashboard', assignee: 'Risk', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-4', 'user-5'] },
        { id: 2, title: 'Emerging risk briefing document', assignee: 'Risk Manager', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-4'] },
        { id: 3, title: 'Risk appetite utilisation review', assignee: 'CRO', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-5'] },
        { id: 4, title: 'Circulate risk committee minutes', assignee: 'CoSec', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-1'] },
    ],
    'esg': [
        { id: 1, title: 'Prepare sustainability progress report', assignee: 'ESG', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-2', 'user-6'] },
        { id: 2, title: 'Carbon footprint data collection', assignee: 'Environment Manager', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-6'] },
        { id: 3, title: 'ESG score benchmarking analysis', assignee: 'Sustainability Officer', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-2'] },
        { id: 4, title: 'Distribute ESG committee pack', assignee: 'CoSec', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-1'] },
    ],
    'remuneration': [
        { id: 1, title: 'Prepare executive pay benchmarking', assignee: 'HR Director', status: 'In progress', statusColor: 'bg-blue-100 text-blue-600', assignedUsers: ['user-3', 'user-4'] },
        { id: 2, title: 'Bonus pool calculation', assignee: 'Finance', status: 'Pending', statusColor: 'bg-amber-100 text-amber-600', assignedUsers: ['user-2'] },
        { id: 3, title: 'Remuneration policy review', assignee: 'Legal', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-5'] },
        { id: 4, title: 'Circulate remuneration minutes', assignee: 'CoSec', status: 'Not started', statusColor: 'bg-slate-100 text-slate-500', assignedUsers: ['user-1'] },
    ],
};

// Generate mock tasks for entities not in the predefined list
const generateMockTasks = (entityId: string): Task[] => {
    // Use entity ID to seed "randomness" for consistent data per entity
    const seed = entityId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Task templates that can be randomly selected
    const taskTemplates = [
        { title: 'Review board materials', assignee: 'CoSec' },
        { title: 'Update compliance documentation', assignee: 'Compliance' },
        { title: 'Prepare quarterly report', assignee: 'Finance' },
        { title: 'Risk assessment review', assignee: 'Risk' },
        { title: 'Schedule stakeholder meeting', assignee: 'Operations' },
        { title: 'Update policy documents', assignee: 'Legal' },
        { title: 'Review audit findings', assignee: 'Internal Audit' },
        { title: 'Finalize governance report', assignee: 'CoSec' },
        { title: 'ESG metrics update', assignee: 'Sustainability' },
        { title: 'Board presentation prep', assignee: 'CEO Office' },
    ];

    const statuses: Task['status'][] = ['Completed', 'In progress', 'Pending', 'Not started'];
    const statusColors: Record<Task['status'], string> = {
        'Completed': 'bg-green-100 text-green-600',
        'In progress': 'bg-blue-100 text-blue-600',
        'Pending': 'bg-amber-100 text-amber-600',
        'Not started': 'bg-slate-100 text-slate-500',
    };

    // Generate 3-5 tasks based on seed
    const numTasks = 3 + (seed % 3);
    const tasks: Task[] = [];

    for (let i = 0; i < numTasks; i++) {
        const templateIndex = (seed + i * 7) % taskTemplates.length;
        const template = taskTemplates[templateIndex];
        const statusIndex = (seed + i * 3) % statuses.length;
        const status = statuses[statusIndex];

        // Assign 1-2 users
        const numUsers = 1 + ((seed + i) % 2);
        const assignedUsers: string[] = [];
        for (let j = 0; j < numUsers; j++) {
            const userId = `user-${((seed + i + j) % 6) + 1}`;
            if (!assignedUsers.includes(userId)) {
                assignedUsers.push(userId);
            }
        }

        tasks.push({
            id: i + 1,
            title: template.title,
            assignee: template.assignee,
            status: status,
            statusColor: statusColors[status],
            assignedUsers: assignedUsers,
        });
    }

    return tasks;
};

// Helper function to get tasks for an entity (predefined or generated)
const getTasksForEntity = (entityId: string): Task[] => {
    return tasksByEntity[entityId] || generateMockTasks(entityId);
};

export default function DashboardPage() {
    const router = useRouter();
    const { selectedEntityId } = useEntityContext();
    const [activeTab, setActiveTab] = useState<TabType>('Financials');
    const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025
    const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>('meeting-apr-1');

    // Auto-switch active tab AND tasks when selected meeting changes
    React.useEffect(() => {
        const meetings = getMeetingsForMonth(currentDate, selectedEntityId);
        const meeting = meetings.find(m => m.id === selectedMeetingId);
        if (meeting) {
            // Switch tabs
            const availTabs = meetingCategoryTabs[meeting.category] || (['Financials'] as TabType[]);
            if (!availTabs.includes(activeTab)) {
                setActiveTab(availTabs[0]);
            }
            // Switch tasks
            const categoryTasks = tasksByMeetingCategory[meeting.category] || defaultTasks;
            setMeetingTasks(categoryTasks);
            setSelectedTaskIds([]);
        }
    }, [selectedMeetingId]);

    // Entity type for local storage data
    interface LocalStorageOrg {
        id: string;
        name: string;
        industry?: string;
        country?: string;
        active?: boolean;
        parentId?: string | null;
        type?: string;
    }

    interface LocalStorageTenant {
        id: string;
        name: string;
        organizations?: LocalStorageOrg[];
    }

    // Entity display data
    interface EntityDisplay {
        id: string;
        name: string;
        shortName: string;
        color: string;
    }

    // Color palette for entities
    const colorPalette = [
        'from-blue-500 to-blue-600',
        'from-purple-500 to-purple-600',
        'from-emerald-500 to-emerald-600',
        'from-amber-500 to-amber-600',
        'from-rose-500 to-rose-600',
        'from-indigo-500 to-indigo-600',
        'from-teal-500 to-teal-600',
        'from-orange-500 to-orange-600',
    ];

    // State for entities loaded from local storage
    const [dynamicEntities, setDynamicEntities] = useState<EntityDisplay[]>([]);

    // Generate random mock data for entities not in the predefined list
    const generateMockEntityData = (entityId: string): EntityDashboardData => {
        // Use entity ID to seed "randomness" for consistent data per entity
        const seed = entityId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const random = (min: number, max: number) => min + (seed % (max - min + 1));

        return {
            governanceIndex: 60 + random(0, 30),
            governanceChange: 5 + random(0, 15),
            sectorBenchmark: 65 + random(0, 10),
            openActions: 10 + random(0, 20),
            overdueActions: random(1, 8),
            closureRate: 80 + random(0, 15),
            residualRisk: 10 + random(0, 15),
            riskStatus: ['Low', 'Moderate', 'Stable'][seed % 3],
            riskProfile: ['Conservative', 'Balanced', 'Moderate'][seed % 3],
            complianceHealth: 80 + random(0, 18),
            complianceStatus: ['On Track', 'Needs Attention', 'On Track'][seed % 3],
            mandatoryFilings: 8 + random(0, 25),
            maturityTrend: [
                { month: 'Jan', score: 55 + random(0, 15) },
                { month: 'Feb', score: 58 + random(0, 15) },
                { month: 'Mar', score: 62 + random(0, 15) },
                { month: 'Apr', score: 65 + random(0, 15) },
                { month: 'May', score: 70 + random(0, 15) },
                { month: 'Jun', score: 75 + random(0, 15) },
            ],
            stpData: [
                { name: 'Manual', value: 25 + random(0, 25), color: '#f87171' },
                { name: 'Semi-Auto', value: 30 + random(0, 20), color: '#fbbf24' },
                { name: 'Full STP', value: 20 + random(0, 15), color: '#10b981' },
            ],
            entityComparison: [
                { name: 'Board Effectiveness', score: 70 + random(0, 20), status: ['Live', 'Optimized', 'In Progress'][seed % 3] },
                { name: 'Risk Management', score: 65 + random(0, 20), status: ['In Progress', 'Live', 'Optimized'][seed % 3] },
                { name: 'Compliance', score: 80 + random(0, 15), status: ['Optimized', 'Live', 'In Progress'][seed % 3] },
                { name: 'ESG Score', score: 55 + random(0, 25), status: ['In Progress', 'Not Started', 'Live'][seed % 3] },
            ],
        };
    };

    // Get entity-specific data based on selected entity
    const currentEntityData = useMemo(() => {
        if (!selectedEntityId) {
            return allEntitiesData;
        }
        // First try predefined data, then generate mock data for any other entity
        return entityDashboardData[selectedEntityId] || generateMockEntityData(selectedEntityId);
    }, [selectedEntityId]);

    // Get entity-specific chart data
    const chartDataByTab = useMemo(() => {
        if (!selectedEntityId) {
            return defaultChartData;
        }
        // First try predefined data, then use default as fallback
        return chartDataByEntity[selectedEntityId] || defaultChartData;
    }, [selectedEntityId]);

    // Task state - initialized with default, updates when entity changes
    const [meetingTasks, setMeetingTasks] = useState<Task[]>(defaultTasks);
    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [newTaskAssignee, setNewTaskAssignee] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState<Task['status']>('Not started');
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);

    // Update tasks when entity changes
    React.useEffect(() => {
        // Use predefined entity tasks if available, otherwise use default tasks for any selected entity
        const entityTasks = selectedEntityId
            ? (tasksByEntity[selectedEntityId] || defaultTasks.map((task, idx) => ({
                ...task,
                id: idx + 1,
            })))
            : defaultTasks;
        setMeetingTasks(entityTasks);
        setSelectedTaskIds([]); // Clear selections when switching entities
    }, [selectedEntityId]);

    // Filter out completed tasks for display
    const visibleTasks = meetingTasks.filter(task => task.status !== 'Completed');

    // Toggle task selection for completion
    const toggleTaskSelection = (taskId: number) => {
        setSelectedTaskIds(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    // Mark selected tasks as completed
    const handleMarkComplete = () => {
        setMeetingTasks(prev =>
            prev.map(task =>
                selectedTaskIds.includes(task.id)
                    ? { ...task, status: 'Completed', statusColor: 'bg-green-100 text-green-600' }
                    : task
            )
        );
        setSelectedTaskIds([]); // Clear selections after completing
    };

    // Get formatted month string
    const currentMonthStr = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Get meetings for current month (filtered by entity if selected)
    const meetings = getMeetingsForMonth(currentDate, selectedEntityId);

    // Auto-select first meeting when entity changes
    React.useEffect(() => {
        const entityMeetings = getMeetingsForMonth(currentDate, selectedEntityId);
        if (entityMeetings.length > 0) {
            setSelectedMeetingId(entityMeetings[0].id);
        } else {
            setSelectedMeetingId(null);
        }
    }, [selectedEntityId, currentDate]);

    // Load entities from local storage
    useEffect(() => {
        const loadEntitiesFromLocalStorage = () => {
            try {
                const tenantsData = localStorage.getItem('prokoti-tenants');
                if (tenantsData) {
                    const tenants: LocalStorageTenant[] = JSON.parse(tenantsData);
                    const allOrgs: EntityDisplay[] = [];

                    tenants.forEach((tenant) => {
                        if (tenant.organizations && Array.isArray(tenant.organizations)) {
                            tenant.organizations.forEach((org, index) => {
                                const shortName = org.name.length > 12
                                    ? org.name.substring(0, 12) + '...'
                                    : org.name;
                                allOrgs.push({
                                    id: `ls-${tenant.id}-${org.id}`,
                                    name: org.name,
                                    shortName: shortName,
                                    color: colorPalette[allOrgs.length % colorPalette.length],
                                });
                            });
                        }
                    });

                    if (allOrgs.length > 0) {
                        setDynamicEntities(allOrgs);
                    }
                }
            } catch (error) {
                console.error('Error loading entities from local storage:', error);
            }
        };

        loadEntitiesFromLocalStorage();
    }, []);

    // Month navigation handlers
    const goToPreviousMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        setSelectedMeetingId(null);
    };

    const goToNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        setSelectedMeetingId(null);
    };

    // Handle meeting click - select meeting (don't navigate away)
    const handleMeetingClick = (meetingId: string) => {
        setSelectedMeetingId(meetingId);
    };

    // Get selected meeting details
    const selectedMeeting = meetings.find(m => m.id === selectedMeetingId);
    const selectedCategory = selectedMeeting?.category || 'board';
    const currentAgenda = meetingAgendas[selectedCategory] || meetingAgendas['board'];
    const currentAttendees = (selectedMeeting?.entityId && meetingAttendeesByEntity[selectedMeeting.entityId]?.[selectedCategory])
        || defaultMeetingAttendees[selectedCategory]
        || defaultMeetingAttendees['board'];
    const currentLocation = meetingLocations[selectedCategory] || meetingLocations['board'];

    // Toggle user selection for task assignment
    const toggleUserSelection = (userId: string) => {
        setSelectedUserIds(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    // Get status color based on status
    const getStatusColor = (status: Task['status']) => {
        switch (status) {
            case 'In progress': return 'bg-blue-100 text-blue-600';
            case 'Pending': return 'bg-amber-100 text-amber-600';
            case 'Completed': return 'bg-green-100 text-green-600';
            default: return 'bg-slate-100 text-slate-500';
        }
    };

    // Handle add task
    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: meetingTasks.length + 1,
            title: newTaskTitle,
            assignee: newTaskAssignee || 'Unassigned',
            status: newTaskStatus,
            statusColor: getStatusColor(newTaskStatus),
            assignedUsers: selectedUserIds,
            dueDate: newTaskDueDate,
        };

        setMeetingTasks(prev => [...prev, newTask]);

        // Reset form
        setNewTaskTitle('');
        setNewTaskDueDate('');
        setNewTaskAssignee('');
        setNewTaskStatus('Not started');
        setSelectedUserIds([]);
        setIsAddTaskDialogOpen(false);
    };

    // Get user by ID
    const getUserById = (userId: string) => availableUsers.find(u => u.id === userId);

    // Custom gauge component for Total Revenue
    const GaugeChart = ({ value, max }: { value: number; max: number }) => {
        const percentage = (value / max) * 100;
        const rotation = (percentage / 100) * 180 - 90;

        return (
            <div className="relative w-full h-44 flex flex-col items-center justify-center">
                <svg viewBox="0 0 200 120" className="w-full h-32">
                    {/* Background arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="16"
                        strokeLinecap="round"
                    />
                    {/* Gradient arc */}
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                    />
                    {/* Needle */}
                    <g transform={`rotate(${rotation}, 100, 100)`}>
                        <circle cx="100" cy="100" r="8" fill="#1e293b" />
                        <line x1="100" y1="100" x2="100" y2="35" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                    </g>
                    {/* Min/Max labels */}
                    <text x="20" y="118" fontSize="10" fill="#94a3b8" textAnchor="start">0.00M</text>
                    <text x="180" y="118" fontSize="10" fill="#94a3b8" textAnchor="end">{max}M</text>
                </svg>
                {/* Value displayed below */}
                <div className="text-center -mt-2">
                    <span className="text-2xl font-bold text-slate-900">{value}M</span>
                </div>
            </div>
        );
    };

    // Entity information for comparison - use local storage data if available, otherwise fallback
    const fallbackEntities: EntityDisplay[] = [
        { id: 'org-001', name: 'GlobalTech Holdings', shortName: 'GlobalTech', color: 'from-blue-500 to-blue-600' },
        { id: 'org-002', name: 'TechBank Ltd', shortName: 'TechBank', color: 'from-purple-500 to-purple-600' },
        { id: 'org-003', name: 'LogiSystems Inc', shortName: 'LogiSystems', color: 'from-emerald-500 to-emerald-600' },
    ];

    const entities = dynamicEntities.length > 0 ? dynamicEntities : fallbackEntities;

    // Helper function to get entity data (with fallback to generated mock data)
    const getEntityData = (entityId: string): EntityDashboardData => {
        return entityDashboardData[entityId] || generateMockEntityData(entityId);
    };

    // Get all meetings for comparison view
    const getAllMeetings = () => {
        const allMeetings = getMeetingsForMonth(currentDate, null);
        return allMeetings.sort((a, b) => a.date - b.date);
    };

    // Comparison Dashboard Component
    const ComparisonDashboard = () => {
        const allMeetings = getAllMeetings();
        const [selectedComparisonMeetingId, setSelectedComparisonMeetingId] = React.useState<string | null>(
            allMeetings.length > 0 ? allMeetings[0].id : null
        );
        return (
            <div className="min-h-screen  bg-slate-50 p-6 font-medium">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Entity Comparison Overview</h1>
                    <p className="text-slate-500 mt-1">Compare key metrics across all organizations</p>
                </div>


                {/* Meetings Section - 3 Column Layout */}
                <div className="grid grid-cols-12 gap-6 mb-6">
                    {/* Left Column - Calendar & Meetings List */}
                    <div className="col-span-4">
                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d1b4e] rounded-3xl p-6 text-white shadow-xl h-[470px] flex flex-col">
                            {/* Month Navigation */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">{currentMonthStr}</h2>
                            </div>

                            {/* Entity Legend */}
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
                                {entities.slice(0, 5).map((entity, index) => {
                                    const dotColors = ['bg-blue-400', 'bg-purple-400', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400'];
                                    return (
                                        <div key={entity.id} className="flex items-center gap-1.5">
                                            <div className={`w-2.5 h-2.5 rounded-full ${dotColors[index % dotColors.length]}`} />
                                            <span className="text-slate-300">{entity.shortName}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Meetings List */}
                            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {allMeetings.map((meeting) => {
                                    const entity = entities.find(e => e.id === meeting.entityId);
                                    const entityColor = meeting.entityId === 'org-001' ? 'bg-blue-400' :
                                        meeting.entityId === 'org-002' ? 'bg-purple-400' : 'bg-emerald-400';
                                    const isSelected = selectedComparisonMeetingId === meeting.id;

                                    return (
                                        <div
                                            key={meeting.id}
                                            onClick={() => setSelectedComparisonMeetingId(meeting.id)}
                                            className={`flex items-start gap-4 p-3 rounded-2xl transition-all cursor-pointer ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                        >
                                            <div className="flex flex-col items-center bg-white/10 rounded-xl h-14 w-14">
                                                <span className={`text-[10px] font-bold w-full py-0.5 rounded-t-xl text-center uppercase ${entityColor}`}>{meeting.month}</span>
                                                <span className="text-xl font-bold h-full w-full text-center flex items-center justify-center">{meeting.date}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm">{meeting.title}</h3>
                                                <p className="text-xs text-slate-400">{entity?.shortName} • {meeting.time}</p>
                                                <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold text-white rounded-full ${meeting.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                                    {meeting.status}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Meeting Details & Agenda */}
                    <div className="col-span-4">
                        {(() => {
                            const selectedMtg = allMeetings.find(m => m.id === selectedComparisonMeetingId) || allMeetings[0];
                            const entity = entities.find(e => e.id === selectedMtg?.entityId);
                            const agenda = selectedMtg ? meetingAgendas[selectedMtg.category] || meetingAgendas['board'] : [];

                            return (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-[470px] flex flex-col">
                                    {selectedMtg ? (
                                        <>
                                            {/* Meeting Header */}
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-xl font-bold text-slate-900">{selectedMtg.title}</h3>
                                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${selectedMtg.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {selectedMtg.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-500">{selectedMtg.time}</p>
                                                <p className="text-sm text-slate-500">{entity?.name} • {meetingLocations[selectedMtg.category]}</p>
                                            </div>

                                            {/* Agenda */}
                                            <div className="flex-1 overflow-y-auto">
                                                <h4 className="font-bold text-slate-900 mb-3">Meeting Agenda</h4>
                                                <div className="space-y-3">
                                                    {agenda.map((item, idx) => (
                                                        <Link href={`/board-member/packs/546554asdokd6dfhidf4`} key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
                                                            <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                                {idx + 1}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-medium text-slate-900 text-sm">{item.title}</p>
                                                                <p className="text-xs text-slate-500">{item.time} • {item.speaker}</p>
                                                            </div>
                                                            <span className="text-xs text-slate-400">{item.duration}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            Select a meeting to view details
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>

                    {/* Right Column - Attendance & Entity Tasks */}
                    <div className="col-span-4 space-y-4">
                        {/* Meeting Attendance */}
                        {(() => {
                            const selectedMtg = allMeetings.find(m => m.id === selectedComparisonMeetingId) || allMeetings[0];
                            const attendees = selectedMtg?.entityId ?
                                meetingAttendeesByEntity[selectedMtg.entityId]?.[selectedMtg.category] || defaultMeetingAttendees[selectedMtg.category]
                                : defaultMeetingAttendees['board'];

                            return (
                                <div className="bg-slate-800 rounded-2xl p-5 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Meeting Attendance</h3>
                                        <span className="text-xs text-slate-400">{attendees.confirmed}/{attendees.invited} confirmed</span>
                                    </div>
                                    <div className="flex items-center gap-6 mb-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold">{attendees.invited}</p>
                                            <p className="text-xs text-slate-400">Invited</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-amber-400">{attendees.pending}</p>
                                            <p className="text-xs text-slate-400">Pending</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-emerald-400">{attendees.confirmed}</p>
                                            <p className="text-xs text-slate-400">Confirmed</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-sm font-semibold transition-colors">
                                        Confirm my participation
                                    </button>
                                </div>
                            );
                        })()}

                        {/* Entity Tasks Summary */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1 flex flex-col" style={{ maxHeight: '280px' }}>
                            <h3 className="font-bold text-slate-900 mb-4">Tasks by Entity</h3>
                            <div className="space-y-3 overflow-y-auto flex-1 pr-1" style={{ scrollbarWidth: 'thin' }}>
                                {entities.map((entity) => {
                                    const tasks = getTasksForEntity(entity.id);
                                    const completed = tasks.filter(t => t.status === 'Completed').length;

                                    return (
                                        <div key={entity.id} className="p-3 bg-slate-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${entity.color}`} />
                                                    <span className="text-sm font-medium text-slate-700">{entity.shortName}</span>
                                                </div>
                                                <span className="text-xs text-slate-500">{completed}/{tasks.length}</span>
                                            </div>
                                            {/* Task list */}
                                            <div className="space-y-1.5 mt-2">
                                                {tasks.map((task, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-xs">
                                                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${task.status === 'Completed' ? 'bg-emerald-500' :
                                                            task.status === 'In progress' ? 'bg-blue-500' :
                                                                task.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-300'
                                                            }`} />
                                                        <span className={`flex-1 truncate ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                                            {task.title}
                                                        </span>
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${task.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                                                            task.status === 'In progress' ? 'bg-blue-100 text-blue-600' :
                                                                task.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                                                            }`}>
                                                            {task.status === 'In progress' ? 'Active' : task.status === 'Not started' ? 'New' : task.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Entity Comparison Cards */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {entities.map((entity) => {
                        const data = getEntityData(entity.id);
                        const tasks = getTasksForEntity(entity.id);
                        const entityMeetings = getMeetingsForMonth(currentDate, entity.id);

                        return (
                            <div
                                key={entity.id}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => {
                                    // This would need access to setSelectedEntityId from context
                                    // For now, we'll just show the cards
                                }}
                            >
                                {/* Entity Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${entity.color} flex items-center justify-center text-white font-bold text-sm`}>
                                        {entity.shortName.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{entity.name}</h3>
                                        <p className="text-xs text-slate-500">{entityMeetings.length} meetings this month</p>
                                    </div>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Governance */}
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <p className="text-xs text-slate-500 mb-1">Governance</p>
                                        <p className={`text-xl font-bold ${data.governanceIndex >= 80 ? 'text-emerald-600' : data.governanceIndex >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                                            {data.governanceIndex}
                                        </p>
                                    </div>
                                    {/* Compliance */}
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <p className="text-xs text-slate-500 mb-1">Compliance</p>
                                        <p className={`text-xl font-bold ${data.complianceHealth >= 90 ? 'text-emerald-600' : data.complianceHealth >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                                            {data.complianceHealth}%
                                        </p>
                                    </div>
                                    {/* Open Actions */}
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <p className="text-xs text-slate-500 mb-1">Open Actions</p>
                                        <p className="text-xl font-bold text-slate-700">{data.openActions}</p>
                                    </div>
                                    {/* Residual Risk */}
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <p className="text-xs text-slate-500 mb-1">Residual Risk</p>
                                        <p className={`text-xl font-bold ${data.residualRisk <= 15 ? 'text-emerald-600' : data.residualRisk <= 20 ? 'text-amber-600' : 'text-red-600'}`}>
                                            {data.residualRisk}
                                        </p>
                                    </div>
                                </div>

                                {/* Tasks Progress */}
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500">Tasks</span>
                                        <span className="text-xs font-medium text-slate-700">
                                            {tasks.filter(t => t.status === 'Completed').length}/{tasks.length} completed
                                        </span>
                                    </div>
                                    <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${entity.color} rounded-full transition-all`}
                                            style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Comparison Charts */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Governance Comparison */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">Governance Index Comparison</h3>
                        <div className="space-y-3">
                            {entities.map((entity) => {
                                const data = getEntityData(entity.id);
                                return (
                                    <div key={entity.id}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-slate-600">{entity.shortName}</span>
                                            <span className="text-sm font-bold text-slate-900">{data.governanceIndex}</span>
                                        </div>
                                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${entity.color} rounded-full transition-all`}
                                                style={{ width: `${data.governanceIndex}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Compliance Comparison */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">Compliance Health Comparison</h3>
                        <div className="space-y-3">
                            {entities.map((entity) => {
                                const data = getEntityData(entity.id);
                                return (
                                    <div key={entity.id}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-slate-600">{entity.shortName}</span>
                                            <span className="text-sm font-bold text-slate-900">{data.complianceHealth}%</span>
                                        </div>
                                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${entity.color} rounded-full transition-all`}
                                                style={{ width: `${data.complianceHealth}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Summary Stats Row */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                        <p className="text-xs text-slate-500 mb-1">Total Entities</p>
                        <p className="text-2xl font-bold text-slate-900">{entities.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                        <p className="text-xs text-slate-500 mb-1">Total Meetings</p>
                        <p className="text-2xl font-bold text-slate-900">{allMeetings.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                        <p className="text-xs text-slate-500 mb-1">Avg Governance</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {Math.round(entities.reduce((acc, e) => acc + getEntityData(e.id).governanceIndex, 0) / entities.length)}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                        <p className="text-xs text-slate-500 mb-1">Avg Compliance</p>
                        <p className="text-2xl font-bold text-emerald-600">
                            {Math.round(entities.reduce((acc, e) => acc + getEntityData(e.id).complianceHealth, 0) / entities.length)}%
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    // Render comparison dashboard if "All Entities" is selected
    if (!selectedEntityId) {
        return <ComparisonDashboard />;
    }

    return (
        <div className="min-h-screen max-w-screen-2xl mx-auto p-6 font-medium">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-12 gap-6">

                {/* Left Column - Calendar & Meetings */}
                <div className="col-span-4">
                    <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d1b4e] rounded-3xl p-6 text-white shadow-xl h-[630px] flex flex-col">
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-6">
                            <button onClick={goToPreviousMonth} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h2 className="text-lg font-bold">{currentMonthStr}</h2>
                            <button onClick={goToNextMonth} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-4 mb-6 text-xs">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-purple-400" />
                                <span className="text-slate-300">Remuneration</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-blue-400" />
                                <span className="text-slate-300">Finance</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-pink-400" />
                                <span className="text-slate-300">Audit</span>
                            </div>
                        </div>

                        {/* Meetings List */}
                        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {meetings.length > 0 ? meetings.map((meeting) => (
                                <div
                                    key={meeting.id}
                                    onClick={() => handleMeetingClick(meeting.id)}
                                    className={`flex items-start gap-4 p-3 rounded-2xl transition-all cursor-pointer ${selectedMeetingId === meeting.id ? 'bg-white/10' : 'hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex flex-col items-center bg-white/10 rounded-xl h-16 aspect-square">
                                        <span className={`text-[10px] font-bold w-full py-0.5 rounded-t-xl text-center uppercase ${categoryColors[meeting.category]?.bg || 'bg-orange-400'}`}>{meeting.month}</span>
                                        <span className="text-2xl font-bold h-full w-full text-center">{meeting.date}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm">{meeting.title}</h3>
                                        {meeting.subtitle ? (
                                            <p className="text-xs text-slate-400">{meeting.subtitle}</p>
                                        ) : (
                                            <p className="text-xs text-slate-400">{meeting.type} - {meeting.time}</p>
                                        )}
                                        <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold text-white rounded-full ${categoryColors[meeting.category]?.badge || 'bg-orange-500'}`}>
                                            {meeting.status}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-slate-400">
                                    <p className="text-sm">No meetings scheduled</p>
                                    <p className="text-xs mt-1">for this month</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - 2x2 Grid Layout */}
                <div className="col-span-8">
                    <div className="grid grid-cols-2 gap-4 h-[450px]">
                        {/* Top Left - Meeting Main Details */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            {selectedMeeting ? (
                                <div className="">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-slate-900">{selectedMeeting.title}</h3>
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${selectedMeeting.status === 'Completed'
                                                ? 'bg-slate-100 text-slate-600'
                                                : 'bg-green-100 text-green-700'
                                                }`}>
                                                {selectedMeeting.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-1">{selectedMeeting.time}</p>
                                        <p className="text-sm text-slate-500">{currentLocation}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6 text-slate-400">
                                    <p className="text-sm">Select a meeting from the calendar</p>
                                </div>
                            )}
                        </div>

                        {/* Top Right - Attendance */}
                        <div className="bg-slate-900 p-5 rounded-3xl text-white shadow-2xl shadow-slate-900/30 group">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-extrabold text-[10px] uppercase tracking-widest text-blue-400">Meeting Attendance</h3>
                                <span className="text-[10px] text-slate-400 font-bold">{currentAttendees.confirmed}/{currentAttendees.invited} confirmed</span>
                            </div>

                            {/* Stats and Member Avatars - Side by Side */}
                            <div className="flex items-center justify-between mb-3">
                                {/* Stats */}
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <span className="block text-lg font-bold text-white">{currentAttendees.invited}</span>
                                        <span className="text-[9px] text-slate-400 uppercase">invited</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-lg font-bold text-amber-400">{currentAttendees.pending}</span>
                                        <span className="text-[9px] text-slate-400 uppercase">pending</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-lg font-bold text-green-400">{currentAttendees.confirmed}</span>
                                        <span className="text-[9px] text-slate-400 uppercase">confirmed</span>
                                    </div>
                                </div>

                                {/* Member Avatars - Right Aligned */}
                                <div className="flex -space-x-1.5">
                                    {[
                                        { initials: 'JD', name: 'John Doe', color: 'bg-blue-500', confirmed: true },
                                        { initials: 'SC', name: 'Sarah Chen', color: 'bg-purple-500', confirmed: true },
                                        { initials: 'MK', name: 'Mike Kumar', color: 'bg-amber-500', confirmed: true },
                                        { initials: 'AL', name: 'Amy Liu', color: 'bg-pink-500', confirmed: true },
                                        { initials: 'RW', name: 'Robert Wilson', color: 'bg-green-500', confirmed: false },
                                    ].map((member, idx) => (
                                        <div key={idx} className="relative" title={member.name}>
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${member.color} border-2 border-slate-900 cursor-pointer hover:ring-2 hover:ring-white/30 hover:z-10 transition-all`}>
                                                <span className="text-white text-[10px] font-bold uppercase">{member.initials}</span>
                                            </div>
                                            <div className="bg-slate-900 absolute -bottom-0.5 -right-0.5 p-[1px] rounded-full">
                                                <div className={`w-2 h-2 rounded-full ${member.confirmed ? 'bg-green-500' : 'bg-amber-400'}`} />
                                            </div>
                                        </div>
                                    ))}
                                    {currentAttendees.invited > 5 && (
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 text-slate-300 text-[10px] font-bold">
                                            +{currentAttendees.invited - 5}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="w-full py-2 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                                Confirm my participation
                            </button>
                        </div>

                        {/* Bottom Left - Meeting Agendas */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden">
                            <h3 className="text-lg font-bold text-slate-900 mb-3">
                                {selectedMeeting ? `${selectedMeeting.title} Agenda` : 'Meeting Agenda'}
                            </h3>
                            <div className="space-y-3 overflow-y-auto max-h-[500px] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {currentAgenda.map((item) => (
                                    <Link href={`/board-member/packs/546554asdokd6dfhidf4`} key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                                            {item.id}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">{item.title}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {item.time}
                                                </span>
                                                <span className="text-xs text-slate-400">•</span>
                                                <span className="text-xs text-blue-600 font-medium">{item.speaker}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">{item.duration}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Right - Meeting Tasks */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-[450px]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900">My Tasks</h3>
                                {selectedTaskIds.length > 0 && (
                                    <button
                                        onClick={handleMarkComplete}
                                        className="rounded-xl bg-blue-600 text-white font-bold text-sm px-3 py-1.5 hover:bg-blue-700 transition-colors"
                                    >
                                        Mark as Completed ({selectedTaskIds.length})
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3 h-[230px] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {visibleTasks.length > 0 ? visibleTasks.map((task) => (
                                    <div key={task.id} className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedTaskIds.includes(task.id)}
                                            onChange={() => toggleTaskSelection(task.id)}
                                            className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-slate-700">{task.title}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex -space-x-1">
                                                        {task.assignedUsers.map((userId) => {
                                                            const user = getUserById(userId);
                                                            return user ? (
                                                                <div
                                                                    key={userId}
                                                                    className={`w-6 h-6 ${user.color} rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold`}
                                                                    title={user.name}
                                                                >
                                                                    {user.initials}
                                                                </div>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-slate-400">{task.assignee}</span>
                                                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${task.statusColor}`}>
                                                    {task.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <svg className="w-12 h-12 text-green-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-slate-500 font-medium">All tasks completed!</p>
                                        <p className="text-xs text-slate-400 mt-1">Add new tasks below</p>
                                    </div>
                                )}
                            </div>

                            {/* Add Task Button */}
                            <button
                                onClick={() => setIsAddTaskDialogOpen(true)}
                                className="w-full mt-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Task
                            </button>

                            {/* Generate with AI */}
                            <button className="w-full mt-3 py-2.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Generate tasks with CoSec AI
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <p className="text-[10px] text-slate-400 text-center mt-1">
                                CoSec AI can suggest standard tasks for Board meetings.
                            </p>
                        </div>

                        {/* Add Task Dialog */}
                        {isAddTaskDialogOpen && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-slate-900">Add New Task</h3>
                                        <button
                                            onClick={() => setIsAddTaskDialogOpen(false)}
                                            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Task Title */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Task Title</label>
                                            <input
                                                type="text"
                                                value={newTaskTitle}
                                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                                placeholder="Enter task title..."
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>

                                        {/* Due Date */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Due Date</label>
                                            <input
                                                type="date"
                                                value={newTaskDueDate}
                                                onChange={(e) => setNewTaskDueDate(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-600"
                                            />
                                        </div>

                                        {/* Department/Assignee */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
                                            <input
                                                type="text"
                                                value={newTaskAssignee}
                                                onChange={(e) => setNewTaskAssignee(e.target.value)}
                                                placeholder="e.g. CoSec, Risk, CEO Office..."
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
                                            <select
                                                value={newTaskStatus}
                                                onChange={(e) => setNewTaskStatus(e.target.value as Task['status'])}
                                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                            >
                                                <option value="Not started">Not started</option>
                                                <option value="In progress">In progress</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>

                                        {/* Assign Users */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-2">Assign Users</label>
                                            <div className="flex flex-wrap gap-2">
                                                {availableUsers.map((user) => (
                                                    <button
                                                        key={user.id}
                                                        type="button"
                                                        onClick={() => toggleUserSelection(user.id)}
                                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedUserIds.includes(user.id)
                                                            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                            }`}
                                                    >
                                                        <div className={`w-5 h-5 ${user.color} rounded-full flex items-center justify-center text-[8px] text-white font-bold`}>
                                                            {user.initials}
                                                        </div>
                                                        {user.name}
                                                        {selectedUserIds.includes(user.id) && (
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                            {selectedUserIds.length > 0 && (
                                                <p className="text-xs text-slate-400 mt-2">
                                                    {selectedUserIds.length} user(s) selected
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => setIsAddTaskDialogOpen(false)}
                                            className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddTask}
                                            disabled={!newTaskTitle.trim()}
                                            className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Add Task
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add Task Dialog */}
                    {isAddTaskDialogOpen && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-slate-900">Add New Task</h3>
                                    <button
                                        onClick={() => setIsAddTaskDialogOpen(false)}
                                        className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Task Title */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Task Title</label>
                                        <input
                                            type="text"
                                            value={newTaskTitle}
                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                            placeholder="Enter task title..."
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Department/Assignee */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
                                        <input
                                            type="text"
                                            value={newTaskAssignee}
                                            onChange={(e) => setNewTaskAssignee(e.target.value)}
                                            placeholder="e.g. CoSec, Risk, CEO Office..."
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
                                        <select
                                            value={newTaskStatus}
                                            onChange={(e) => setNewTaskStatus(e.target.value as Task['status'])}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                        >
                                            <option value="Not started">Not started</option>
                                            <option value="In progress">In progress</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>

                                    {/* Assign Users */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-2">Assign Users</label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableUsers.map((user) => (
                                                <button
                                                    key={user.id}
                                                    type="button"
                                                    onClick={() => toggleUserSelection(user.id)}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedUserIds.includes(user.id)
                                                        ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                >
                                                    <div className={`w-5 h-5 ${user.color} rounded-full flex items-center justify-center text-[8px] text-white font-bold`}>
                                                        {user.initials}
                                                    </div>
                                                    {user.name}
                                                    {selectedUserIds.includes(user.id) && (
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        {selectedUserIds.length > 0 && (
                                            <p className="text-xs text-slate-400 mt-2">
                                                {selectedUserIds.length} user(s) selected
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={() => setIsAddTaskDialogOpen(false)}
                                        className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddTask}
                                        disabled={!newTaskTitle.trim()}
                                        className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Section - Financial Charts */}
                <div className="col-span-12">
                    {/* Tabs — filtered by selected meeting's category */}
                    {(() => {
                        const availableTabs: TabType[] = selectedMeeting
                            ? (meetingCategoryTabs[selectedMeeting.category] || ['Financials', 'ESG', 'Governance', 'Risk', 'Compliance'] as TabType[])
                            : ['Financials', 'ESG', 'Governance', 'Risk', 'Compliance'] as TabType[];
                        return (
                            <div className="flex items-center gap-2 mb-4">
                                {/* {selectedMeeting && (
                                    <span className="text-xs text-slate-400 font-medium mr-1 shrink-0">
                                        {selectedMeeting.title}:
                                    </span>
                                )} */}
                                {availableTabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${activeTab === tab
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-white text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        );
                    })()}

                    {/* Charts Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Donut Chart */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h4 className="text-sm font-semibold text-slate-900 mb-4 text-center">{chartDataByTab[activeTab].donutTitle}</h4>
                            <div className="flex items-center gap-4">
                                {/* Chart */}
                                <div className="h-40 w-40 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartDataByTab[activeTab].donutData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={70}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {chartDataByTab[activeTab].donutData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Legend on side */}
                                <div className="flex flex-col gap-2 text-xs">
                                    {chartDataByTab[activeTab].donutData.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="text-slate-600 font-medium">
                                                {item.value}% {item.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Gauge Chart */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h4 className="text-sm font-semibold text-slate-900 mb-4 text-center">{chartDataByTab[activeTab].gaugeTitle}</h4>
                            <GaugeChart value={chartDataByTab[activeTab].gaugeValue} max={chartDataByTab[activeTab].gaugeMax} />
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-semibold text-slate-900">{chartDataByTab[activeTab].barTitle}</h4>
                                <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: chartDataByTab[activeTab].barColors.actual }} />
                                        <span className="text-slate-500">{chartDataByTab[activeTab].barLegend.actual}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: chartDataByTab[activeTab].barColors.budget }} />
                                        <span className="text-slate-500">{chartDataByTab[activeTab].barLegend.budget}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartDataByTab[activeTab].barData} barGap={4}>
                                        <XAxis
                                            dataKey="quarter"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#64748b' }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '12px',
                                                border: 'none',
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                fontSize: '12px'
                                            }}
                                        />
                                        <Bar dataKey="actual" fill={chartDataByTab[activeTab].barColors.actual} radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="budget" fill={chartDataByTab[activeTab].barColors.budget} radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};
