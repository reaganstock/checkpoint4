import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Table, ArrowLeft, AlertCircle, FileSpreadsheet, Link as LinkIcon, Plus, List } from 'lucide-react';
import { parse } from 'papaparse';
import clsx from 'clsx';
import { LeadMappingModal } from '../leads/LeadMappingModal';
import { useLeadStore } from '../../../stores/leadStore';
import type { PlatformType } from '../sequence/types';

interface LeadsStepProps {
  data: {
    platforms: PlatformType[];
    leads?: Record<string, string>[];
    leadMappings?: Record<string, { column: string; type: 'username' | 'profile_url' }>;
    excludedColumns?: string[];
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LeadsStep({ data, updateData, onNext, onBack }: LeadsStepProps) {
  const [uploadMethod, setUploadMethod] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [sheetsUrl, setSheetsUrl] = useState('');
  const [error, setError] = useState('');
  const [columns, setColumns] = useState<string[]>([]);
  const [leads, setLeads] = useState<Record<string, string>[]>([]);
  const [showMappingModal, setShowMappingModal] = useState(false);

  const { lists, addList } = useLeadStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError('');

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      await processCSV(file);
    } else {
      setError('Please upload a CSV file');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processCSV(file);
    }
  };

  const processCSV = (file: File) => {
    return new Promise((resolve) => {
      parse(file, {
        header: true,
        complete: (results) => {
          const headers = Object.keys(results.data[0]);
          setColumns(headers);
          setLeads(results.data as Record<string, string>[]);
          setShowMappingModal(true);
          resolve(results.data);
        },
        error: () => {
          setError('Error processing CSV file');
          resolve([]);
        }
      });
    });
  };

  const handleGoogleSheets = async () => {
    if (!sheetsUrl) {
      setError('Please enter a Google Sheets URL');
      return;
    }

    try {
      const response = await fetch(sheetsUrl);
      const csvData = await response.text();
      
      parse(csvData, {
        header: true,
        complete: (results) => {
          const headers = Object.keys(results.data[0]);
          setColumns(headers);
          setLeads(results.data as Record<string, string>[]);
          setShowMappingModal(true);
        },
        error: () => {
          setError('Error processing Google Sheets data');
        }
      });
    } catch (err) {
      setError('Error accessing Google Sheets. Make sure the URL is public and valid.');
    }
  };

  const handleMappingSave = (
    mappings: Record<string, { column: string; type: 'username' | 'profile_url' }>,
    excludedColumns: string[]
  ) => {
    updateData({ 
      leads,
      leadMappings: mappings,
      leadColumns: columns.filter(col => !excludedColumns.includes(col)),
      excludedColumns
    });
    setShowMappingModal(false);
    
    // Save to lead store if not using existing list
    if (uploadMethod !== 'existing') {
      addList(
        `Imported List ${new Date().toLocaleDateString()}`,
        columns,
        leads,
        mappings
      );
    }
    
    onNext();
  };

  const handleExistingListSelect = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    if (list) {
      updateData({
        leads: list.leads,
        leadMappings: list.platformMappings,
        leadColumns: list.columns,
        existingListId: listId
      });
      onNext();
    }
  };

  const createEmptyList = () => {
    updateData({ leads: [], leadMappings: {}, leadColumns: [] });
    onNext();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Import Leads</h3>
        <p className="text-sm text-slate-400">Choose how you want to add leads to your campaign</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUploadMethod('csv')}
          className={clsx(
            "p-6 rounded-lg border transition-all text-left",
            uploadMethod === 'csv'
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-slate-700/50 hover:border-indigo-500/50'
          )}
        >
          <FileSpreadsheet className="w-6 h-6 text-indigo-400 mb-3" />
          <h4 className="text-white font-medium mb-1">Upload CSV</h4>
          <p className="text-sm text-slate-400">Import leads from a CSV file</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUploadMethod('sheets')}
          className={clsx(
            "p-6 rounded-lg border transition-all text-left",
            uploadMethod === 'sheets'
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-slate-700/50 hover:border-indigo-500/50'
          )}
        >
          <Table className="w-6 h-6 text-indigo-400 mb-3" />
          <h4 className="text-white font-medium mb-1">Google Sheets</h4>
          <p className="text-sm text-slate-400">Import directly from Google Sheets</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUploadMethod('empty')}
          className={clsx(
            "p-6 rounded-lg border transition-all text-left",
            uploadMethod === 'empty'
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-slate-700/50 hover:border-indigo-500/50'
          )}
        >
          <Plus className="w-6 h-6 text-indigo-400 mb-3" />
          <h4 className="text-white font-medium mb-1">Empty List</h4>
          <p className="text-sm text-slate-400">Start with an empty lead list</p>
        </motion.button>
      </div>

      {uploadMethod === 'csv' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".csv"
            className="hidden"
          />
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.querySelector('input[type="file"]')?.click()}
            className={clsx(
              'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-700/50 hover:border-indigo-500/50'
            )}
          >
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-400 mb-2">
              Drag and drop your CSV file here, or click to browse
            </p>
            <p className="text-xs text-slate-500">Supported format: .csv</p>
          </div>
        </motion.div>
      )}

      {uploadMethod === 'sheets' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 space-y-4"
        >
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="url"
              value={sheetsUrl}
              onChange={(e) => setSheetsUrl(e.target.value)}
              placeholder="Enter public Google Sheets URL..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>
          <button
            onClick={handleGoogleSheets}
            className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
          >
            Import from Google Sheets
          </button>
        </motion.div>
      )}

      {uploadMethod !== 'empty' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50">
              <h4 className="text-white font-medium flex items-center">
                <List className="w-5 h-5 mr-2 text-indigo-400" />
                Existing Lead Lists
              </h4>
            </div>
            <div className="divide-y divide-slate-700/50">
              {lists.map((list) => (
                <motion.button
                  key={list.id}
                  whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                  onClick={() => handleExistingListSelect(list.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-indigo-500/10 transition-colors"
                >
                  <div>
                    <h5 className="text-white font-medium">{list.name}</h5>
                    <p className="text-sm text-slate-400">
                      {list.leads.length} leads • Last updated {new Date(list.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-slate-400 transform rotate-180" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-sm text-red-400">{error}</p>
        </motion.div>
      )}

      {leads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <p className="text-sm text-green-400">
            Successfully imported {leads.length} leads
          </p>
        </motion.div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        {uploadMethod === 'empty' ? (
          <button
            onClick={createEmptyList}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
          >
            Create Empty List
          </button>
        ) : null}
      </div>

      {showMappingModal && (
        <LeadMappingModal
          platforms={data.platforms}
          columns={columns}
          onSave={handleMappingSave}
          onClose={() => setShowMappingModal(false)}
        />
      )}
    </div>
  );
}