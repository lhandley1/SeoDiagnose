import { z } from "zod";

export const analyzeUrlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export type AnalyzeUrlRequest = z.infer<typeof analyzeUrlSchema>;

export interface SeoTag {
  name: string;
  description: string;
  content: string | null;
  status: "good" | "warning" | "missing";
  recommendation?: string;
  characterCount?: number;
  maxLength?: number;
  isPresent: boolean;
}

export interface SeoAnalysisResult {
  url: string;
  title?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  tags: SeoTag[];
  score: number;
  foundTags: number;
  warningTags: number;
  missingTags: number;
  totalChecks: number;
  analysisTime: number;
  pageSize: string;
  responseTime: number;
}
