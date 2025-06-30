import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SeoAnalysisResult } from "@shared/schema";

interface PreviewPanelsProps {
  result: SeoAnalysisResult;
}

export default function PreviewPanels({ result }: PreviewPanelsProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getDisplayUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.hostname} › ${urlObj.pathname === "/" ? "" : urlObj.pathname.split("/").filter(Boolean).join(" › ")}`;
    } catch {
      return url;
    }
  };

  // Check if social media tags are present
  const hasFacebookTags = result.ogTitle || result.ogDescription || result.ogImage || result.ogSiteName;
  const hasTwitterTags = result.twitterCard || result.twitterTitle || result.twitterDescription || result.twitterImage;

  const totalPreviews = 1 + (hasFacebookTags ? 1 : 0) + (hasTwitterTags ? 1 : 0);
  
  return (
    <div className={`grid grid-cols-1 ${totalPreviews === 2 ? 'lg:grid-cols-2' : totalPreviews === 3 ? 'lg:grid-cols-3' : ''} gap-4`}>
      {/* Google Search Preview - Always shown */}
      <Card className="h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google Search
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
            <div className="mb-2">
              <div className="text-xs text-green-700 dark:text-green-400 mb-1">
                {getDisplayUrl(result.url)}
              </div>
              <h4 className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-normal leading-tight">
                {result.title || "No title found"}
              </h4>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {result.metaDescription ? truncateText(result.metaDescription, 120) : "No meta description found"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Facebook Preview - Only shown if Facebook tags exist */}
      {hasFacebookTags && (
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {result.ogImage && (
                <img 
                  src={result.ogImage} 
                  alt="Open Graph preview" 
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="p-3 bg-gray-50 dark:bg-gray-800">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                  {result.ogSiteName || new URL(result.url).hostname.toUpperCase()}
                </div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 leading-tight">
                  {result.ogTitle || result.title || "No title found"}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {truncateText(result.ogDescription || result.metaDescription || "No description found", 100)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Twitter Preview - Only shown if Twitter tags exist */}
      {hasTwitterTags && (
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base">
              <svg className="w-4 h-4 mr-2 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {(result.twitterImage || result.ogImage) && (
                <img 
                  src={result.twitterImage || result.ogImage} 
                  alt="Twitter card preview" 
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="p-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 leading-tight">
                  {result.twitterTitle || result.ogTitle || result.title || "No title found"}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                  {truncateText(result.twitterDescription || result.ogDescription || result.metaDescription || "No description found", 100)}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new URL(result.url).hostname}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
