import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SeoTagItem from "@/components/seo-tag-item";
import PreviewPanels from "@/components/preview-panels";
import type { SeoAnalysisResult } from "@shared/schema";

interface AnalysisResultsProps {
  result: SeoAnalysisResult;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  const handleExportReport = () => {
    const reportData = {
      url: result.url,
      score: result.score,
      analysisDate: new Date().toISOString(),
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

  const highPriorityRecommendations = result.tags.filter(tag => 
    tag.status === "missing" && ["Title Tag", "Meta Description", "Twitter Card Type"].includes(tag.name)
  );

  const mediumPriorityRecommendations = result.tags.filter(tag => 
    tag.status === "warning"
  );

  const lowPriorityRecommendations = result.tags.filter(tag => 
    tag.status === "missing" && !["Title Tag", "Meta Description", "Twitter Card Type"].includes(tag.name)
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column: SEO Analysis */}
      <div className="lg:col-span-2 space-y-6">
        {/* SEO Score Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>SEO Analysis Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreColor(result.score)}`}>
                  <span className="font-bold text-lg">{result.score}</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">SEO Score</div>
                  <div className={getScoreColor(result.score).split(' ')[0]}>{getScoreLabel(result.score)}</div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{result.foundTags}</div>
                <div className="text-sm text-gray-600 mt-1">Tags Found</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{result.warningTags}</div>
                <div className="text-sm text-gray-600 mt-1">Warnings</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{result.missingTags}</div>
                <div className="text-sm text-gray-600 mt-1">Missing</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{result.totalChecks}</div>
                <div className="text-sm text-gray-600 mt-1">Total Checks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Tags Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Meta Tags Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.tags.map((tag, index) => (
                <SeoTagItem key={index} tag={tag} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {highPriorityRecommendations.map((tag, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">High Priority</h4>
                    <p className="text-gray-700 mb-2">{tag.recommendation}</p>
                    <div className="text-sm text-gray-600">
                      <strong>Impact:</strong> Critical for SEO performance
                    </div>
                  </div>
                </div>
              ))}

              {mediumPriorityRecommendations.map((tag, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Medium Priority</h4>
                    <p className="text-gray-700 mb-2">{tag.recommendation}</p>
                    <div className="text-sm text-gray-600">
                      <strong>Impact:</strong> Improved search result appearance
                    </div>
                  </div>
                </div>
              ))}

              {lowPriorityRecommendations.map((tag, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">i</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Low Priority</h4>
                    <p className="text-gray-700 mb-2">{tag.recommendation}</p>
                    <div className="text-sm text-gray-600">
                      <strong>Impact:</strong> Enhanced social media presence
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Previews */}
      <div className="space-y-6">
        <PreviewPanels result={result} />

        {/* Analysis Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Details</CardTitle>
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
                <span className="text-gray-600">Last analyzed:</span>
                <span className="font-medium">Just now</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button
                onClick={handleExportReport}
                variant="outline"
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
