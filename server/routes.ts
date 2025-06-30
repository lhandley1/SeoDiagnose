import type { Express } from "express";
import { createServer, type Server } from "http";
import { analyzeUrlSchema, type SeoAnalysisResult, type SeoTag } from "@shared/schema";
import * as cheerio from "cheerio";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze", async (req, res) => {
    try {
      const startTime = Date.now();
      
      // Validate request body
      const { url } = analyzeUrlSchema.parse(req.body);
      
      // Fetch the website HTML
      const fetchStart = Date.now();
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });
      
      if (!response.ok) {
        return res.status(400).json({ 
          message: `Failed to fetch website: ${response.status} ${response.statusText}` 
        });
      }
      
      const html = await response.text();
      const responseTime = Date.now() - fetchStart;
      const pageSize = formatBytes(html.length);
      
      // Parse HTML with Cheerio
      const $ = cheerio.load(html);
      
      // Extract meta tags
      const title = $('title').text() || null;
      const metaDescription = $('meta[name="description"]').attr('content') || null;
      const ogTitle = $('meta[property="og:title"]').attr('content') || null;
      const ogDescription = $('meta[property="og:description"]').attr('content') || null;
      const ogImage = $('meta[property="og:image"]').attr('content') || null;
      const ogSiteName = $('meta[property="og:site_name"]').attr('content') || null;
      const twitterCard = $('meta[name="twitter:card"]').attr('content') || null;
      const twitterTitle = $('meta[name="twitter:title"]').attr('content') || null;
      const twitterDescription = $('meta[name="twitter:description"]').attr('content') || null;
      const twitterImage = $('meta[name="twitter:image"]').attr('content') || null;
      
      // Analyze SEO tags
      const tags: SeoTag[] = [
        analyzeTitleTag(title),
        analyzeMetaDescription(metaDescription),
        analyzeOgTitle(ogTitle),
        analyzeOgDescription(ogDescription),
        analyzeOgImage(ogImage),
        analyzeOgSiteName(ogSiteName),
        analyzeTwitterCard(twitterCard),
        analyzeTwitterTitle(twitterTitle),
        analyzeTwitterDescription(twitterDescription),
        analyzeTwitterImage(twitterImage),
      ];
      
      // Calculate statistics
      const foundTags = tags.filter(tag => tag.status === "good").length;
      const warningTags = tags.filter(tag => tag.status === "warning").length;
      const missingTags = tags.filter(tag => tag.status === "missing").length;
      const totalChecks = tags.length;
      
      // Calculate SEO score (weighted)
      const score = Math.round(
        ((foundTags * 1.0) + (warningTags * 0.5) + (missingTags * 0.0)) / totalChecks * 100
      );
      
      const analysisTime = Date.now() - startTime;
      
      const result: SeoAnalysisResult = {
        url,
        title,
        metaDescription,
        ogTitle,
        ogDescription,
        ogImage,
        ogSiteName,
        twitterCard,
        twitterTitle,
        twitterDescription,
        twitterImage,
        tags,
        score,
        foundTags,
        warningTags,
        missingTags,
        totalChecks,
        analysisTime,
        pageSize,
        responseTime,
      };
      
      res.json(result);
    } catch (error) {
      console.error("Analysis error:", error);
      
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to analyze website. Please check the URL and try again." });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function analyzeTitleTag(title: string | null): SeoTag {
  const isPresent = Boolean(title);
  const length = title?.length || 0;
  
  let status: "good" | "warning" | "missing" = "missing";
  let recommendation: string | undefined;
  
  if (isPresent) {
    if (length >= 30 && length <= 60) {
      status = "good";
    } else if (length > 0) {
      status = "warning";
      if (length < 30) {
        recommendation = "Title is too short. Aim for 30-60 characters for optimal SEO.";
      } else {
        recommendation = "Title is too long. Keep it under 60 characters to avoid truncation in search results.";
      }
    }
  } else {
    recommendation = "Add a title tag to improve SEO. This is one of the most important ranking factors.";
  }
  
  return {
    name: "Title Tag",
    description: "Primary page title for search results",
    content: title,
    status,
    recommendation,
    characterCount: length,
    maxLength: 60,
    isPresent,
  };
}

function analyzeMetaDescription(description: string | null): SeoTag {
  const isPresent = Boolean(description);
  const length = description?.length || 0;
  
  let status: "good" | "warning" | "missing" = "missing";
  let recommendation: string | undefined;
  
  if (isPresent) {
    if (length >= 120 && length <= 160) {
      status = "good";
    } else if (length > 0) {
      status = "warning";
      if (length < 120) {
        recommendation = "Meta description is too short. Aim for 120-160 characters for better search result display.";
      } else {
        recommendation = "Meta description is too long. Keep it under 160 characters to avoid truncation.";
      }
    }
  } else {
    recommendation = "Add a meta description to improve click-through rates from search results.";
  }
  
  return {
    name: "Meta Description",
    description: "Search result snippet description",
    content: description,
    status,
    recommendation,
    characterCount: length,
    maxLength: 160,
    isPresent,
  };
}

function analyzeOgTitle(ogTitle: string | null): SeoTag {
  const isPresent = Boolean(ogTitle);
  
  return {
    name: "Open Graph Title",
    description: "Title for social media sharing",
    content: ogTitle,
    status: isPresent ? "good" : "missing",
    recommendation: isPresent ? undefined : "Add Open Graph title for better social media sharing appearance.",
    isPresent,
  };
}

function analyzeOgDescription(ogDescription: string | null): SeoTag {
  const isPresent = Boolean(ogDescription);
  
  return {
    name: "Open Graph Description",
    description: "Description for social media sharing",
    content: ogDescription,
    status: isPresent ? "good" : "missing",
    recommendation: isPresent ? undefined : "Add Open Graph description for better social media sharing.",
    isPresent,
  };
}

function analyzeOgImage(ogImage: string | null): SeoTag {
  const isPresent = Boolean(ogImage);
  
  return {
    name: "Open Graph Image",
    description: "Image for social media sharing",
    content: ogImage,
    status: isPresent ? "good" : "missing",
    recommendation: isPresent ? undefined : "Add Open Graph image (recommended size: 1200x630px) for social sharing.",
    isPresent,
  };
}

function analyzeOgSiteName(ogSiteName: string | null): SeoTag {
  const isPresent = Boolean(ogSiteName);
  
  return {
    name: "Open Graph Site Name",
    description: "Website name for social media",
    content: ogSiteName,
    status: isPresent ? "good" : "warning",
    recommendation: isPresent ? undefined : "Consider adding Open Graph site name for brand consistency.",
    isPresent,
  };
}

function analyzeTwitterCard(twitterCard: string | null): SeoTag {
  const isPresent = Boolean(twitterCard);
  
  return {
    name: "Twitter Card Type",
    description: "Specifies Twitter card display type",
    content: twitterCard,
    status: isPresent ? "good" : "missing",
    recommendation: isPresent ? undefined : "Add Twitter Card meta tag (e.g., summary_large_image) for optimal Twitter sharing.",
    isPresent,
  };
}

function analyzeTwitterTitle(twitterTitle: string | null): SeoTag {
  const isPresent = Boolean(twitterTitle);
  
  return {
    name: "Twitter Title",
    description: "Title for Twitter cards",
    content: twitterTitle,
    status: isPresent ? "good" : "warning",
    recommendation: isPresent ? undefined : "Consider adding Twitter-specific title for optimized Twitter sharing.",
    isPresent,
  };
}

function analyzeTwitterDescription(twitterDescription: string | null): SeoTag {
  const isPresent = Boolean(twitterDescription);
  
  return {
    name: "Twitter Description",
    description: "Description for Twitter cards",
    content: twitterDescription,
    status: isPresent ? "good" : "warning",
    recommendation: isPresent ? undefined : "Consider adding Twitter-specific description for better engagement.",
    isPresent,
  };
}

function analyzeTwitterImage(twitterImage: string | null): SeoTag {
  const isPresent = Boolean(twitterImage);
  
  return {
    name: "Twitter Image",
    description: "Image for Twitter cards",
    content: twitterImage,
    status: isPresent ? "good" : "warning",
    recommendation: isPresent ? undefined : "Consider adding Twitter-specific image for better visual appeal.",
    isPresent,
  };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
