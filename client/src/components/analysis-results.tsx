import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Globe, ArrowLeft } from "lucide-react";
import CategorySummaryCard from "@/components/category-summary-card";
import PreviewPanels from "@/components/preview-panels";
import type { SeoAnalysisResult } from "@shared/schema";

interface AnalysisResultsProps {
  result: SeoAnalysisResult;
  onBack: () => void;
}

export default function AnalysisResults({ result, onBack }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  const getCategoryColor = (score: number): "red" | "orange" | "green" | "blue" => {
    if (score >= 8) return "green";
    if (score >= 6) return "blue";
    if (score >= 4) return "orange";
    return "red";
  };

  const handleExportReport = () => {
    const reportData = {
      url: result.url,
      score: result.categoryScores.total,
      analysisDate: new Date().toISOString(),
      categoryScores: result.categoryScores,
      tags: result.tags,
      recommendations: result.tags
        .filter(tag => tag.recommendation)
        .map(tag => ({ tag: tag.name, recommendation: tag.recommendation }))
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Group tags by category
  const technicalTags = result.tags.filter(tag => tag.category === "technical");
  const socialTags = result.tags.filter(tag => tag.category === "social");
  const contentTags = result.tags.filter(tag => tag.category === "content");
  const performanceTags = result.tags.filter(tag => tag.category === "performance");

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back Button Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">SeoDiagnose</span>
        </div>
      </div>

      {/* Header with Total Score */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Analysis Results</h2>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div className={`text-6xl font-bold ${getScoreColor(result.categoryScores.total)}`}>
            {result.categoryScores.total}
          </div>
          <div className="text-left">
            <div className="text-lg font-semibold text-gray-900">Total Score</div>
            <div className={`text-base ${getScoreColor(result.categoryScores.total)}`}>
              {getScoreLabel(result.categoryScores.total)}
            </div>
          </div>
        </div>
        <div className="mt-2 text-gray-600 text-sm break-all">
          {result.url}
        </div>
      </div>

      {/* Category Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <CategorySummaryCard
          category="content"
          title="Content SEO"
          score={result.categoryScores.content}
          tags={contentTags}
          color={getCategoryColor(result.categoryScores.content)}
        />
        <CategorySummaryCard
          category="technical"
          title="Technical SEO"
          score={result.categoryScores.technical}
          tags={technicalTags}
          color={getCategoryColor(result.categoryScores.technical)}
        />
        <CategorySummaryCard
          category="social"
          title="Social Media"
          score={result.categoryScores.social}
          tags={socialTags}
          color={getCategoryColor(result.categoryScores.social)}
        />
        <CategorySummaryCard
          category="performance"
          title="Performance"
          score={result.categoryScores.performance}
          tags={performanceTags}
          color={getCategoryColor(result.categoryScores.performance)}
        />
      </div>

      {/* Previews and Export Section */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <PreviewPanels result={result} />
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Analysis time:</span>
                  <span className="font-medium">{result.analysisTime}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Page size:</span>
                  <span className="font-medium">{result.pageSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response time:</span>
                  <span className="font-medium">{result.responseTime}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tags analyzed:</span>
                  <span className="font-medium">{result.totalChecks}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button
                  onClick={handleExportReport}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
