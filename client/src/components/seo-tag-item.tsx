import { Check, AlertTriangle, X, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { SeoTag } from "@shared/schema";

interface SeoTagItemProps {
  tag: SeoTag;
}

export default function SeoTagItem({ tag }: SeoTagItemProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <Check className="text-white" size={12} />;
      case "warning":
        return <AlertTriangle className="text-white" size={12} />;
      case "missing":
        return <X className="text-white" size={12} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-600";
      case "warning":
        return "bg-yellow-600";
      case "missing":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Good</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Warning</Badge>;
      case "missing":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Missing</Badge>;
      default:
        return null;
    }
  };

  const getProgressPercentage = () => {
    if (!tag.characterCount || !tag.maxLength) return 0;
    return Math.min((tag.characterCount / tag.maxLength) * 100, 100);
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage <= 100 && percentage >= 50) return "bg-green-600";
    if (percentage > 100) return "bg-red-600";
    return "bg-yellow-600";
  };

  return (
    <div className={`border rounded-lg p-4 ${tag.status === "missing" ? "border-red-200 bg-red-50" : "border-gray-200"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getStatusColor(tag.status)}`}>
            {getStatusIcon(tag.status)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{tag.name}</h4>
            <p className="text-sm text-gray-500">{tag.description}</p>
          </div>
        </div>
        {getStatusBadge(tag.status)}
      </div>

      {tag.content && (
        <div className="bg-gray-50 rounded p-3 mb-3">
          <code className="text-sm text-gray-800 break-all">
            {tag.content}
          </code>
        </div>
      )}

      {tag.characterCount !== undefined && tag.maxLength && (
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">
            Character count: <span className={`font-medium ${tag.status === "good" ? "text-green-600" : tag.status === "warning" ? "text-yellow-600" : "text-red-600"}`}>
              {tag.characterCount}
            </span>/{tag.maxLength}
          </span>
          <div className="w-32">
            <Progress 
              value={getProgressPercentage()} 
              className="h-2"
            />
          </div>
        </div>
      )}

      {tag.recommendation && (
        <div className={`text-sm rounded p-2 border flex items-start space-x-2 ${
          tag.status === "missing" 
            ? "text-red-700 bg-red-100 border-red-200" 
            : "text-yellow-700 bg-yellow-100 border-yellow-200"
        }`}>
          <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Recommendation:</strong> {tag.recommendation}
          </div>
        </div>
      )}
    </div>
  );
}
