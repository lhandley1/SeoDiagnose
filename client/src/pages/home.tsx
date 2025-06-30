import { useState } from "react";
import { Search, Globe } from "lucide-react";
import UrlInput from "@/components/url-input";
import AnalysisResults from "@/components/analysis-results";
import type { SeoAnalysisResult } from "@shared/schema";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null);

  const handleAnalysisComplete = (result: SeoAnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SEO Tag Analyzer</h1>
                <p className="text-sm text-gray-500">Comprehensive website SEO analysis</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">API</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Help</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UrlInput onAnalysisComplete={handleAnalysisComplete} />
        
        {analysisResult && (
          <AnalysisResults result={analysisResult} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="text-white" size={16} />
              </div>
              <span className="font-semibold text-gray-900">SEO Tag Analyzer</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
