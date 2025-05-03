import React, { useState } from 'react';
import { 
  BarChart2, Download, FileText, ExternalLink, 
  CheckCircle, Calendar, Search, Filter
} from 'lucide-react';
import { mockTenders } from '../data/mockData';
import { formatDate } from '../utils/dateUtils';

const Reports: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Only include completed tenders for reports
  const completedTenders = mockTenders.filter(tender => tender.status === 'completed');
  
  // Filter based on search and category
  const filteredReports = completedTenders.filter(tender => 
    (categoryFilter === 'all' || tender.category === categoryFilter) &&
    (tender.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     tender.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold heading-underline mb-2">Procurement Reports</h1>
        <p className="text-neutral-600">
          View and download final evaluation reports for completed tenders
        </p>
      </div>
      
      {/* Filter and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-shrink-0 flex items-center">
            <Filter className="h-5 w-5 text-neutral-500 mr-2" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full py-2 pl-3 pr-8 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="services">Services</option>
              <option value="goods">Goods</option>
              <option value="works">Works</option>
              <option value="consulting">Consulting</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold">Final Evaluation Reports</h2>
        </div>
        
        {filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <BarChart2 className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-1">
              No reports found
            </h3>
            <p className="text-neutral-500">
              {searchQuery || categoryFilter !== 'all' 
                ? "Try adjusting your search or filter settings" 
                : "There are no completed procurement processes yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {filteredReports.map(tender => (
              <div key={tender.id} className="p-6 hover:bg-neutral-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0 md:pr-6">
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-primary-50 rounded-lg border border-primary-100">
                        <BarChart2 className="h-6 w-6 text-primary-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-neutral-900">
                          {tender.title} - Final Evaluation Report
                        </h3>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 text-neutral-500 mr-1.5" />
                          <span className="text-sm text-neutral-500">
                            Completed on {formatDate('2025-03-15')}
                          </span>
                          <span className="mx-3 text-neutral-300">|</span>
                          <span className="bg-success-100 text-success-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </span>
                        </div>
                        <p className="text-neutral-600 mt-2">
                          Final evaluation report includes technical assessment, financial analysis, 
                          and vendor selection justification for the {tender.title.toLowerCase()} 
                          procurement process.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-2">
                    <button 
                      className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1.5" />
                      Download
                    </button>
                    <button 
                      className="inline-flex items-center px-3 py-1.5 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-md hover:bg-neutral-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-1.5" />
                      View
                    </button>
                  </div>
                </div>
                
                {/* Related Documents */}
                <div className="mt-6 bg-neutral-50 rounded-md p-4 border border-neutral-200">
                  <h4 className="text-sm font-medium text-neutral-700 mb-3">
                    Related Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-neutral-500 mr-2" />
                      <span className="text-sm text-neutral-700">Technical Evaluation Summary</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-neutral-500 mr-2" />
                      <span className="text-sm text-neutral-700">Financial Proposal Analysis</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-neutral-500 mr-2" />
                      <span className="text-sm text-neutral-700">Award Recommendation</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;