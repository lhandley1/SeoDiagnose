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
    <div className="w-full">
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
                          className="h-12 text-base bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl pr-12"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400 dark:text-gray-500" />
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
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-xl min-w-[140px] text-base"
            >
              {analyzeMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Loading State */}
      {analyzeMutation.isPending && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
            <span className="text-blue-800 dark:text-blue-300 font-medium">Analyzing website...</span>
          </div>
          <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
            Fetching HTML content and extracting SEO tags
          </div>
        </div>
      )}
    </div>
  );
}
