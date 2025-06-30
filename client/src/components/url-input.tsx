import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Search, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { analyzeUrlSchema, type AnalyzeUrlRequest, type SeoAnalysisResult } from "@shared/schema";

interface UrlInputProps {
  onAnalysisComplete: (result: SeoAnalysisResult) => void;
}

export default function UrlInput({ onAnalysisComplete }: UrlInputProps) {
  const { toast } = useToast();
  
  const form = useForm<AnalyzeUrlRequest>({
    resolver: zodResolver(analyzeUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  const analyzeMutation = useMutation({
    mutationFn: async (data: AnalyzeUrlRequest) => {
      const response = await apiRequest("POST", "/api/analyze", data);
      return response.json() as Promise<SeoAnalysisResult>;
    },
    onSuccess: (result) => {
      onAnalysisComplete(result);
      toast({
        title: "Analysis Complete",
        description: `SEO analysis completed with a score of ${result.score}%`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AnalyzeUrlRequest) => {
    analyzeMutation.mutate(data);
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Analyze Website SEO</h2>
          <p className="text-gray-600">Enter any website URL to analyze its SEO meta tags and get recommendations</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="https://example.com"
                            {...field}
                            className="pr-10"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button 
                type="submit" 
                disabled={analyzeMutation.isPending}
                className="px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 min-w-[140px]"
              >
                {analyzeMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* Loading State */}
        {analyzeMutation.isPending && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-blue-800 font-medium">Analyzing website...</span>
            </div>
            <div className="mt-2 text-sm text-blue-600">
              Fetching HTML content and extracting SEO tags
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
