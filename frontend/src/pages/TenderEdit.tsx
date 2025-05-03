import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTenders } from '../data/mockData';
import RichTextEditor from '../components/RichTextEditor';
import { ToastContext } from '../components/Layout';
import { useContext } from 'react';

interface TenderFormData {
  title: string;
  description: string;
  publishDate: string;
  deadline: string;
  status: string;
  budget: number;
  category: string;
  documents: any[];
}

const TenderEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<TenderFormData>({
    title: '',
    description: '',
    publishDate: '',
    deadline: '',
    status: '',
    budget: 0,
    category: '',
    documents: []
  });

  useEffect(() => {
    if (id) {
      const tender = mockTenders.find(t => t.id === id);
      if (tender) {
        setFormData({
          title: tender.title,
          description: tender.description || '',
          publishDate: tender.publishDate,
          deadline: tender.deadline,
          status: tender.status,
          budget: tender.budget,
          category: tender.category,
          documents: tender.documents || []
        });
      }
    }
  }, [id]);

  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.publishDate || !formData.deadline) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Validate dates
    const publishDate = new Date(formData.publishDate);
    const deadline = new Date(formData.deadline);
    const now = new Date();
    
    if (publishDate < now) {
      addToast('Publish date cannot be in the past', 'error');
      return;
    }
    
    if (deadline <= publishDate) {
      addToast('Deadline must be after publish date', 'error');
      return;
    }
    
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    addToast('Tender updated successfully!', 'success');
    navigate(`/tenders/${id}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold heading-underline mb-2">Edit Tender</h1>
        <p className="text-neutral-600">Update the tender details below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                Tender Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="technology">Technology</option>
              </select>
            </div>

            <div>
              <label htmlFor="publishDate" className="block text-sm font-medium text-neutral-700 mb-1">
                Publish Date *
              </label>
              <input
                type="date"
                id="publishDate"
                value={formData.publishDate}
                onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-neutral-700 mb-1">
                Submission Deadline *
              </label>
              <input
                type="date"
                id="deadline"
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-1">
                Budget (USD)
              </label>
              <input
                type="number"
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="evaluation">In Evaluation</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
              Description *
            </label>
            <RichTextEditor 
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Enter tender description..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(`/tenders/${id}`)}
            className="px-4 py-2 border border-neutral-300 text-neutral-700 font-medium rounded-md hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700"
          >
            Update Tender
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenderEdit; 