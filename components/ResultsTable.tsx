
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { TOSResult, TOSRow, TOSTotals } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultsTableProps {
  data: TOSResult;
}

const bloomKeys: (keyof TOSTotals['bloomsDistribution'])[] = [
  'remembering', 'understanding', 'applying', 'analyzing', 'evaluating', 'creating'
];

export const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
    const [copyStatus, setCopyStatus] = useState('Copy as JSON');

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy as JSON'), 2000);
        }, () => {
            setCopyStatus('Failed to copy');
            setTimeout(() => setCopyStatus('Failed to copy'), 2000);
        });
    };

    const handleExportExcel = () => {
        const header1 = ["Topic", "Intended Outcomes", "Total Items", "No. of Hours", "Bloom's Taxonomy Level of Learning", null, null, null, null, null, "Item Placement", "Percentage"];
        const header2 = [null, null, null, null, ...bloomKeys.map(k => k.toUpperCase()) , null, null];
        
        const rows = data.tableRows.map(item => [
            item.topic,
            item.intendedOutcomes,
            item.totalItems,
            item.numberOfHours,
            ...bloomKeys.map(k => item.bloomsDistribution[k]),
            item.itemPlacement,
            item.percentage.toFixed(1) + '%',
        ]);
        
        const totals = data.totals;
        const footer = [
            'TOTAL', 
            null, 
            totals.totalItems, 
            totals.numberOfHours, 
            ...bloomKeys.map(k => totals.bloomsDistribution[k]),
            null, 
            totals.percentage.toFixed(0) + '%'
        ];

        const aoa = [header1, header2, ...rows, footer];
        const worksheet = XLSX.utils.aoa_to_sheet(aoa);

        // Define merges for the header
        worksheet['!merges'] = [
          // Merging the main headers that span two rows
          { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // Topic
          { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // Intended Outcomes
          { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, // Total Items
          { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, // No. of Hours
          { s: { r: 0, c: 10 }, e: { r: 1, c: 10 } }, // Item Placement
          { s: { r: 0, c: 11 }, e: { r: 1, c: 11 } }, // Percentage
          // Merging the 'Bloom's Taxonomy' header
          { s: { r: 0, c: 4 }, e: { r: 0, c: 9 } },
        ];
        
        // Set column widths
         worksheet['!cols'] = [
            { wch: 25 }, // Topic
            { wch: 50 }, // Intended Outcomes
            { wch: 12 }, // Total Items
            { wch: 12 }, // No. of Hours
            { wch: 15 }, // Remembering
            { wch: 15 }, // Understanding
            { wch: 15 }, // Applying
            { wch: 15 }, // Analyzing
            { wch: 15 }, // Evaluating
            { wch: 15 }, // Creating
            { wch: 20 }, // Item Placement
            { wch: 12 }, // Percentage
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TOS-Analysis');
        XLSX.writeFile(workbook, 'TOS-Analysis-Report.xlsx');
    };

    if (!data || !data.tableRows || data.tableRows.length === 0) {
        return (
            <div className="mt-8 text-center text-slate-500">
                <p>No analysis results to display.</p>
            </div>
        );
    }

  return (
    <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-slate-800">Table of Specifications</h2>
        <div className="flex items-center gap-2">
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500 transition-colors"
            >
                <ClipboardIcon className="w-4 h-4" />
                {copyStatus}
            </button>
            <button
                onClick={handleExportExcel}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500 transition-colors"
            >
                <DownloadIcon className="w-4 h-4" />
                Export as Excel
            </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-300 border border-slate-300 text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th scope="col" rowSpan={2} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider border-r border-slate-300 align-middle">Topic</th>
              <th scope="col" rowSpan={2} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider border-r border-slate-300 align-middle">Intended Outcomes</th>
              <th scope="col" rowSpan={2} className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider border-r border-slate-300 align-middle">Total Items</th>
              <th scope="col" rowSpan={2} className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider border-r border-slate-300 align-middle">No. of Hours</th>
              <th scope="col" colSpan={6} className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider border-r border-slate-300">Bloom's Taxonomy Level of Learning</th>
              <th scope="col" rowSpan={2} className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider border-r border-slate-300 align-middle">Item Placement</th>
              <th scope="col" rowSpan={2} className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider align-middle">Percentage</th>
            </tr>
            <tr className="bg-slate-50">
              {bloomKeys.map(key => (
                 <th key={key} scope="col" className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider border-r border-slate-300 last:border-r-0">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.tableRows.map((item: TOSRow, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 py-3 font-medium text-slate-800 border-r border-slate-200 align-top">{item.topic}</td>
                <td className="px-3 py-3 text-slate-600 border-r border-slate-200 align-top max-w-md whitespace-normal">{item.intendedOutcomes}</td>
                <td className="px-3 py-3 text-center text-slate-600 border-r border-slate-200 align-top">{item.totalItems}</td>
                <td className="px-3 py-3 text-center text-slate-600 border-r border-slate-200 align-top">{item.numberOfHours}</td>
                {bloomKeys.map(key => (
                   <td key={key} className="px-3 py-3 text-center text-slate-600 border-r border-slate-200 align-top">{item.bloomsDistribution[key] > 0 ? item.bloomsDistribution[key] : '-'}</td>
                ))}
                <td className="px-3 py-3 text-center text-slate-600 border-r border-slate-200 align-top whitespace-nowrap">{item.itemPlacement}</td>
                <td className="px-3 py-3 text-center text-slate-600 align-top">{item.percentage.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
           <tfoot className="bg-slate-100 font-bold text-slate-800">
                <tr className="border-t-2 border-slate-300">
                    <td className="px-3 py-3 text-left uppercase border-r border-slate-300">Total</td>
                    <td className="border-r border-slate-300"></td>
                    <td className="px-3 py-3 text-center border-r border-slate-300">{data.totals.totalItems}</td>
                    <td className="px-3 py-3 text-center border-r border-slate-300">{data.totals.numberOfHours}</td>
                    {bloomKeys.map(key => (
                        <td key={key} className="px-3 py-3 text-center border-r border-slate-300">{data.totals.bloomsDistribution[key]}</td>
                    ))}
                    <td className="border-r border-slate-300"></td>
                    <td className="px-3 py-3 text-center">{Math.round(data.totals.percentage)}%</td>
                </tr>
           </tfoot>
        </table>
      </div>
    </div>
  );
};
