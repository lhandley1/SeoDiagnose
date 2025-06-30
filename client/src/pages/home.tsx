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

  const handleBackToHome = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">SeoDiagnose</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Comprehensive website SEO analysis</p>
              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {!analysisResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Enter a website
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Analyze any website's SEO performance with detailed insights and recommendations
              </p>
            </div>
            <UrlInput onAnalysisComplete={handleAnalysisComplete} />
          </div>
        ) : (
          <AnalysisResults result={analysisResult} onBack={handleBackToHome} />
        )}
      </main>

      {/* Footer */}
      {!analysisResult && (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Search className="text-white" size={16} />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">SeoDiagnose</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
