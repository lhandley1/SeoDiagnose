import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import SeoTagItem from "@/components/seo-tag-item";
import type { SeoTag } from "@shared/schema";

interface CategorySummaryCardProps {
  category: "technical" | "social" | "content" | "performance";
  title: string;
  score: number;
  tags: SeoTag[];
  color: "red" | "orange" | "green" | "blue";
}

const colorClasses = {
  red: {
    bg: "bg-red-100 hover:bg-red-200",
    border: "border-red-200 hover:border-red-300",
    text: "text-red-700",
    score: "text-red-800",
  },
  orange: {
    bg: "bg-orange-100 hover:bg-orange-200", 
    border: "border-orange-200 hover:border-orange-300",
    text: "text-orange-700",
    score: "text-orange-800",
  },
  green: {
    bg: "bg-green-100 hover:bg-green-200",
    border: "border-green-200 hover:border-green-300", 
    text: "text-green-700",
    score: "text-green-800",
  },
  blue: {
    bg: "bg-blue-100 hover:bg-blue-200",
    border: "border-blue-200 hover:border-blue-300",
    text: "text-blue-700", 
    score: "text-blue-800",
  },
};

export default function CategorySummaryCard({ 
  category, 
  title, 
  score, 
  tags, 
  color 
}: CategorySummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = colorClasses[color];

  return (
    <Card className={`transition-all duration-200 ${colors.bg} ${colors.border} border-2`}>
      <CardContent className="p-4">
        <Button
          variant="ghost"
          className="w-full h-auto p-0 hover:bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <div className={`text-3xl font-bold ${colors.score} mb-1`}>
                {score}/10
              </div>
              <div className={`text-sm font-medium ${colors.text}`}>
                {title}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`text-xs ${colors.text} opacity-75`}>
                {tags.filter(tag => tag.status === "good").length}/{tags.length} good
              </div>
              {isExpanded ? (
                <ChevronUp className={`h-4 w-4 ${colors.text}`} />
              ) : (
                <ChevronDown className={`h-4 w-4 ${colors.text}`} />
              )}
            </div>
          </div>
        </Button>
        
        {isExpanded && (
          <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            {tags.map((tag, index) => (
              <SeoTagItem key={index} tag={tag} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}