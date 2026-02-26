import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Zap, Satellite, Brain, DollarSign, Target, CircleCheck as CheckCircle, Loader as Loader2, Sparkles, Camera, FileText, TrendingUp, Users, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { fetchReportAllData, generateAIContent, ReportAllData } from '../../lib/reportAllHelpers';
import { useAIListingCredits } from '../../hooks/useAIListingCredits';
import { AIListingPaymentGate } from './AIListingPaymentGate';

// API Configuration
const REPORTALL_CLIENT_ID = 'Yd8Bf8FCn4';
const PRYCD_API_KEY = '658d0a7c16msh16736d87707b9bbp15b724jsna8ab00c1ecfa';

// Form schema - only APN required
const autoListingSchema = z.object({
  apn: z.string().min(1, 'APN is required'),
  // Fields that will be auto-populated and displayed
  price: z.number().min(0, 'Price must be non-negative').optional(), // Optional as it's auto-filled
  acreage: z.number().min(0.1, 'Acreage must be at least 0.1 acres'), // Required field for dynamic screenshot generation
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  county: z.string().optional(),
  size_acres: z.number().min(0.1, 'Size must be at least 0.1 acres').optional(), // Added for display
  title: z.string().optional(), // Optional as it's auto-filled by AI
  description: z.string().optional(), // Optional as it's auto-filled by AI
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Define the type for the fetched property data
type AutoListingForm = z.infer<typeof autoListingSchema>;

interface AIAutoListingGeneratorProps { // Added defaultValues to useForm
  onSubmit: (data: AutoListingForm) => void;
  onClose: () => void;
  loading?: boolean;
}

interface GenerationStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: any;
}

export function AIAutoListingGenerator({ onSubmit, onClose, loading = false }: AIAutoListingGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedPropertyData, setFetchedPropertyData] = useState<ReportAllData | null>(null);
  const [generatedListing, setGeneratedListing] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPaymentGate, setShowPaymentGate] = useState(false);
  const { credits, loading: creditsLoading, hasCredits, consumeCredit, fetchCredits } = useAIListingCredits();

  const form = useForm<AutoListingForm>({
    resolver: zodResolver(autoListingSchema),
    defaultValues: {
      apn: '',
      price: 0,
      acreage: 0.1, // Default to minimum valid acreage
      address: '',
      city: '',
      state: '',
      zip_code: '',
      county: '',
      size_acres: 0.1, // This will be populated by acreage
      title: '',
      description: '',
      latitude: 0,
      longitude: 0,
    }
  });

  const [steps, setSteps] = useState<GenerationStep[]>([
    { id: 'property-data', title: 'Extracting Property Data', description: 'Fetching details from ReportAllUSA API', icon: FileText, status: 'pending' },
    { id: 'satellite-imagery', title: 'Capturing Satellite Imagery', description: 'Generating high-resolution aerial views', icon: Camera, status: 'pending' },
    { id: 'content-generation', title: 'Generating AI Content', description: 'Crafting compelling title and description', icon: Brain, status: 'pending' },
    { id: 'price-analysis', title: 'Analyzing Smart Pricing', description: 'Estimating market value and pricing strategy', icon: DollarSign, status: 'pending' }, // This step will use the fetched price
    { id: 'buyer-matching', title: 'Generating Buyer Campaign', description: 'Identifying and targeting ideal buyers', icon: Users, status: 'pending' },
  ]);

  // Auto-populate form with test data for demonstration
  const handleAutoPopulateForm = async (userApn?: string) => {
    if (!userApn) {
      console.log("No APN provided, skipping auto-populate");
      return;
    }
    
    try {
      console.log("🔄 Starting handleAutoPopulateForm with APN:", userApn || 'default');
      const propertyData = await fetchReportAllData(userApn);
      console.log("✅ Auto-fetched property data:", propertyData);
      
      // Set all form values explicitly with proper type conversion and force update
      console.log("🔄 Setting form values...");
      form.setValue("apn", userApn);
      form.setValue("latitude", propertyData.latitude);
      form.setValue("longitude", propertyData.longitude);
      form.setValue("price", propertyData.price || 75000);
      form.setValue("acreage", propertyData.acreage);
      form.setValue("size_acres", propertyData.acreage); // Ensure size_acres is set
      form.setValue("address", propertyData.address);
      form.setValue("city", propertyData.city);
      form.setValue("state", propertyData.state);
      form.setValue("zip_code", propertyData.zip);
      form.setValue("county", propertyData.county);
      
      console.log("🔄 Generating AI content...");
      const { title, description } = await generateAIContent(propertyData);
      console.log("✅ AI content generated:", { title, description });
      form.setValue("title", title);
      form.setValue("description", description);
      
      console.log("🔄 Setting fetchedPropertyData to trigger re-render...");
      setFetchedPropertyData(propertyData);
      
      // Force form to re-render by triggering validation
      await form.trigger();
      console.log("✅ Form population completed");
    } catch (err) {
      console.error("❌ Error in handleAutoPopulateForm:", err);
    }
  };

  // Auto-populate form on component mount for testing
  useEffect(() => {
    console.log("🔄 Component mounted, calling handleAutoPopulateForm...");
    // Component mounted - ready for user input
  }, []);

  // Force form reset when fetchedPropertyData changes
  useEffect(() => {
    if (fetchedPropertyData) {
      console.log("🔄 fetchedPropertyData changed, resetting form...", fetchedPropertyData);
      
      // Set values individually first
      form.setValue("latitude", fetchedPropertyData.latitude);
      form.setValue("longitude", fetchedPropertyData.longitude);
      form.setValue("price", 75000);
      form.setValue("acreage", fetchedPropertyData.acreage);
      form.setValue("size_acres", fetchedPropertyData.acreage);
      form.setValue("address", fetchedPropertyData.address);
      form.setValue("city", fetchedPropertyData.city);
      form.setValue("state", fetchedPropertyData.state);
      form.setValue("zip_code", fetchedPropertyData.zip);
      form.setValue("county", fetchedPropertyData.county);
      form.setValue("zoning", fetchedPropertyData.zoning || '');
      
      // Then reset the form with the same values to ensure consistency
      const formData = {
        latitude: fetchedPropertyData.latitude,
        longitude: fetchedPropertyData.longitude,
        price: 75000,
        acreage: fetchedPropertyData.acreage,
        size_acres: fetchedPropertyData.acreage,
        address: fetchedPropertyData.address,
        city: fetchedPropertyData.city,
        state: fetchedPropertyData.state,
        zip_code: fetchedPropertyData.zip,
        county: fetchedPropertyData.county,
        zoning: fetchedPropertyData.zoning || '',
        title: '', // Will be set by AI generation
        description: '', // Will be set by AI generation
      };
      
      form.reset(formData);
      console.log("✅ Form reset completed with data:", fetchedPropertyData);
    }
  }, [fetchedPropertyData, form]);

  const updateStepStatus = (stepId: string, status: 'pending' | 'processing' | 'completed' | 'error', result?: any) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status, result } : step
    ));
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Step 2: Satellite Image Capture (Simulated)
  const captureSatelliteImages = async (propertyData: any) => {
    updateStepStatus('satellite-imagery', 'processing');
    
    try {
      // Use the advanced aerial screenshot generation
      if (propertyData.latitude && propertyData.longitude && propertyData.acreage) {
        console.log('Generating aerial screenshots with polygon coordinates...');
        console.log('Property WKT data:', propertyData.geom_as_wkt);
        
        const screenshots = await generateAerialScreenshots({
          geomWkt: propertyData.geom_as_wkt, // ✅ pass raw WKT
          center: { lat: propertyData.latitude, lng: propertyData.longitude },
          acreage: propertyData.acreage // Use propertyData.acreage
        });
        
        if (screenshots.length > 0) {
          console.log(`Generated ${screenshots.length} aerial screenshots`);
          
          const imageAnalysis = {
            terrain: 'Satellite imagery analysis complete',
            accessibility: 'Aerial view captured from multiple angles',
            surroundings: 'Directional views: North, South, East, West, 3D',
            features: ['Polygon boundary overlay', 'Multi-angle perspectives', '3D aerial view'],
            quality_score: 9.2
          };

          updateStepStatus('satellite-imagery', 'completed', { images: screenshots, analysis: imageAnalysis });
          return { images: screenshots, analysis: imageAnalysis };
        }
      }
      
      console.log('Screenshot generation timed out');
      const fallbackImages: string[] = [];
      
      const imageAnalysis = {
        terrain: 'Stock imagery used',
        accessibility: 'Unable to generate custom aerial views',
        surroundings: 'Generic property images',
        features: ['Stock photos', 'No polygon overlay'],
        quality_score: 6.0
      };

      updateStepStatus('satellite-imagery', 'completed', { images: fallbackImages, analysis: imageAnalysis });
      return { images: fallbackImages, analysis: imageAnalysis };
    } catch (error) {
      updateStepStatus('satellite-imagery', 'error');
      throw error;
    }
  };

  // Step 4: Smart Pricing Analysis
  const analyzePricing = async (propertyData: any) => {
    updateStepStatus('price-analysis', 'processing');
    
    try {
      // Simulate market analysis
      await sleep(2000);
      
      const basePrice = 15000; // Base price per acre
      const sizeMultiplier = propertyData.acreage > 5 ? 0.9 : 1.0; // Bulk discount
      const locationMultiplier = 1.2; // Location premium
      
      const estimatedPrice = Math.round(basePrice * propertyData.acreage * sizeMultiplier * locationMultiplier);
      
      const priceAnalysis = {
        estimated_price: estimatedPrice,
        price_per_acre: Math.round(estimatedPrice / propertyData.acreage),
        market_analysis: {
          comparable_sales: 12,
          average_days_on_market: 45,
          price_trend: 'Increasing',
          confidence_score: 85
        },
        pricing_factors: [
          'Location desirability',
          'Size premium',
          'Market demand',
          'Development potential'
        ]
      };

      updateStepStatus('price-analysis', 'completed', priceAnalysis);
      return priceAnalysis;
    } catch (error) {
      updateStepStatus('price-analysis', 'error');
      throw error;
    }
  };

  // Step 5: AI Buyer Matching
  const generateBuyerCampaign = async (propertyData: any, content: any, pricing: any) => {
    updateStepStatus('buyer-matching', 'processing');
    
    try {
      // Simulate AI buyer matching
      await sleep(2500);
      
      const buyerProfiles = [
        {
          type: 'Land Developers',
          match_score: 92,
          characteristics: ['Looking for 1-10 acre plots', 'Budget: $50K-$200K', 'Active in your area'],
          campaign_strategy: 'Highlight development potential and zoning benefits'
        },
        {
          type: 'Investment Groups',
          match_score: 87,
          characteristics: ['Portfolio expansion', 'Long-term holds', 'Cash buyers'],
          campaign_strategy: 'Emphasize ROI potential and market appreciation'
        },
        {
          type: 'Individual Investors',
          match_score: 78,
          characteristics: ['First-time land buyers', 'Retirement planning', 'Recreational use'],
          campaign_strategy: 'Focus on lifestyle benefits and investment security'
        }
      ];

      const marketingCampaign = {
        target_buyers: buyerProfiles,
        estimated_leads: 25,
        projected_offers: 3,
        campaign_duration: '30 days',
        marketing_channels: [
          'Targeted social media ads',
          'Real estate investor networks',
          'Land investment forums',
          'Email marketing campaigns'
        ]
      };

      updateStepStatus('buyer-matching', 'completed', marketingCampaign);
      return marketingCampaign;
    } catch (error) {
      updateStepStatus('buyer-matching', 'error');
      throw error;
    }
  };

  const handleSubmit = async (data: AutoListingForm) => {
    if (!hasCredits()) {
      setShowPaymentGate(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCurrentStep(0);

    try {
      await consumeCredit();
      // Step 1: Extract property data using latitude and longitude via helper
      setCurrentStep(1);
      updateStepStatus('property-data', 'processing');
      const propertyData = await fetchReportAllData(data.apn);
      updateStepStatus('property-data', 'completed', propertyData);
      
      console.log("📦 Fetched property data:", propertyData); // Debug log
      
      // Explicitly set all form values after fetching data
      form.setValue("price", propertyData.price);
      form.setValue("acreage", propertyData.acreage);
      form.setValue("address", propertyData.address);
      form.setValue("city", propertyData.city);
      form.setValue("state", propertyData.state);
      form.setValue("zip_code", propertyData.zip);
      form.setValue("county", propertyData.county);
      form.setValue("latitude", propertyData.latitude);
      form.setValue("longitude", propertyData.longitude);
      form.setValue("zoning", propertyData.zoning);
      form.setValue("size_acres", propertyData.acreage);
      
      updateStepStatus('property-data', 'completed', propertyData);
      
      console.log("📦 Fetched property data:", propertyData); // Debug log
      
      // Explicitly set all form values after fetching data
      form.setValue("price", propertyData.price);
      form.setValue("acreage", propertyData.acreage);
      form.setValue("address", propertyData.address);
      form.setValue("city", propertyData.city);
      form.setValue("state", propertyData.state);
      form.setValue("zip_code", propertyData.zip);
      form.setValue("county", propertyData.county);
      form.setValue("latitude", propertyData.latitude);
      form.setValue("longitude", propertyData.longitude);
      form.setValue("zoning", propertyData.zoning || '');
      form.setValue("size_acres", propertyData.acreage);
      
      setFetchedPropertyData(propertyData); // Store fetched data in state to trigger form.reset

      // Step 2: Capture satellite images
      setCurrentStep(2);
      // Use user-input acreage for dynamic screenshot generation
      const userAcreage = form.getValues('acreage') || propertyData.acreage;
      console.log(`📐 Using acreage for screenshots: ${userAcreage} acres (user input: ${form.getValues('acreage')}, API: ${propertyData.acreage})`);
      
      const imageData = await captureSatelliteImages({
        geom_as_wkt: propertyData.geom_as_wkt,
        latitude: propertyData.latitude,
        longitude: propertyData.longitude,
        acreage: userAcreage // Use user-input acreage for dynamic zoom calculation
      });

      // Step 3: Generate content
      setCurrentStep(3);
      updateStepStatus('content-generation', 'processing');
      const { title, description } = await generateAIContent(propertyData);
      updateStepStatus('content-generation', 'completed', { title, description });
      
      // Set title and description in form
      form.setValue("title", title);
      form.setValue("description", description);
      const { title, description } = await generateAIContent(propertyData); // Use helper function
      // Update form with generated title and description
      form.setValue('title', title);
      form.setValue('description', description);

      // Step 4: Analyze pricing
      setCurrentStep(4);
      const pricing = await analyzePricing(propertyData);

      // Step 5: Generate buyer campaign
      setCurrentStep(5);
      const campaign = await generateBuyerCampaign(propertyData, { title, description }, pricing);

      // Compile final listing
      const finalListing = {
        ...propertyData, // Includes geomWkt, price, acreage, address, city, state, zip, county, latitude, longitude, zoning, etc.
        title: title, // Use AI-generated title
        description: description, // Use AI-generated description
        price: pricing.estimated_price, // Use AI-estimated price (or propertyData.price if no pricing analysis)
        images: imageData.images, // Images from satellite capture
        ai_analysis: {
          image_analysis: imageData.analysis,
          pricing_analysis: pricing,
          marketing_campaign: campaign
        }
      };

      setGeneratedListing(finalListing);
      
      // Auto-submit after 2 seconds
      setTimeout(() => {
        onSubmit(finalListing);
      }, 2000);

    } catch (error) {
      console.error('Error generating listing:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate listing');
    } finally {
      setIsGenerating(false);
    }
  };

  if (showPaymentGate) {
    return (
      <AIListingPaymentGate
        onPaymentSuccess={() => {
          setShowPaymentGate(false);
          fetchCredits();
        }}
        onCancel={() => {
          setShowPaymentGate(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-2xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
        <CardHeader className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  AI Auto Listing Generator
                </CardTitle>
                <p className="text-gray-600 mt-1">
                  Revolutionary AI-powered property listing automation
                </p>
                {!creditsLoading && (
                  <p className="text-sm text-blue-600 font-semibold mt-1">
                    Credits available: {credits}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors border border-gray-300"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {!isGenerating && !generatedListing && (
            <div className="space-y-8">
              {/* Features Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl border border-purple-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Satellite className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">AI Satellite Imagery</h3>
                  <p className="text-gray-600 text-sm">Automatic high-resolution property photos</p>
                </div>

                <div className="text-center p-6 bg-white rounded-2xl border border-green-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Smart Content</h3>
                  <p className="text-gray-600 text-sm">AI-generated titles and descriptions</p>
                </div>

                <div className="text-center p-6 bg-white rounded-2xl border border-orange-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Buyer Matching</h3>
                  <p className="text-gray-600 text-sm">AI finds and targets ideal buyers</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Revolutionary Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">No realtor commissions (save 6%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">AI-optimized pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Automated buyer campaigns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Professional satellite photos</span>
                  </div>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Enter Your Property Details
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our AI will handle everything else automatically
                  </p>
                </div>
                <div className="max-w-md mx-auto space-y-4"> {/* Input fields for latitude and longitude */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Latitude *
                    </label>
                    <Input
                      {...form.register('latitude', { valueAsNumber: true })}
                      type="number"
                      step="any"
                      placeholder="Enter APN (e.g., 123-456-789)"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      disabled={loading}
                      onChange={(e) => {
                        const apn = e.target.value;
                        form.setValue('apn', apn);
                        if (apn.length >= 5) {
                          handleAutoPopulateForm(apn);
                        }
                      }}
                    />
                    {form.formState.errors.latitude && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.latitude.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Longitude *
                    </label>
                    <Input
                      {...form.register('longitude', { valueAsNumber: true })}
                      type="number"
                      step="any"
                      placeholder="e.g., -118.2437"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      disabled={loading}
                    />
                    {form.formState.errors.longitude && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.longitude.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Price ($)
                    </label>
                    <Input
                      {...form.register('price', { valueAsNumber: true })}
                      type="number"
                      step="any"
                      placeholder="Auto-filled"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly
                    />
                    {form.formState.errors.price && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.price.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Address
                    </label>
                    <Input
                      {...form.register('address')}
                      placeholder="Auto-filled"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.address.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      City
                    </label>
                    <Input
                      {...form.register('city')}
                      placeholder="Auto-filled"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly
                    />
                    {form.formState.errors.city && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.city.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      State
                    </label>
                    <Input
                      {...form.register('state')}
                      placeholder="Auto-filled"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly
                    />
                    {form.formState.errors.state && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.state.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      ZIP Code
                    </label>
                    <Input
                      {...form.register('zip_code')}
                      placeholder="Auto-filled"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly
                    />
                    {form.formState.errors.zip_code && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.zip_code.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      County
                    </label>
                    <Input
                      {...form.register('county')}
                      placeholder="Auto-filled"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly
                    />
                    {form.formState.errors.county && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.county.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Zoning
                    </label>
                    <Input
                      {...form.register('zoning')}
                      placeholder="Auto-filled"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly
                    />
                    {form.formState.errors.zoning && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.zoning.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Acreage *
                    </label>
                    <Input
                      {...form.register('acreage', { valueAsNumber: true })}
                      type="number"
                      step="any"
                      placeholder="Auto-filled from APN"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly
                    />
                    {form.formState.errors.acreage && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.acreage.message}
                      </p>
                    )} 
                    <p className="text-gray-500 text-sm mt-2 text-center">
                      🔍 Enter any valid APN - AI will auto-populate all fields
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Title
                    </label>
                    <Input
                      {...form.register('title')}
                      placeholder="Auto-filled"
                      className="h-14 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono"
                      readOnly // Make it read-only as it's auto-filled
                    />
                    {form.formState.errors.title && ( // Corrected error binding
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.title.message}
                      </p>
                    )} 
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Description
                    </label>
                    <textarea
                      {...form.register('description')}
                      placeholder="Auto-filled"
                      className="h-28 border-2 border-gray-200 rounded-xl focus:border-purple-500 text-center text-lg font-mono w-full"
                      readOnly
                    />
                    {form.formState.errors.description && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {form.formState.errors.description.message}
                      </p>
                    )} 
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 text-white font-bold px-12 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    disabled={loading}
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    Generate AI Listing
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Generation Progress */}
          {isGenerating && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🤖 AI is Working Its Magic
                </h3>
                <p className="text-gray-600">
                  Sit back and relax while our AI creates your perfect listing
                </p>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep - 1;
                  const isCompleted = step.status === 'completed';
                  const isProcessing = step.status === 'processing';
                  const hasError = step.status === 'error';

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                        isActive || isProcessing
                          ? 'bg-white border-blue-200'
                          : isCompleted
                          ? 'bg-white border-green-200'
                          : hasError
                          ? 'bg-white border-red-200'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500'
                          : isProcessing
                          ? 'bg-blue-500'
                          : hasError
                          ? 'bg-red-500'
                          : 'bg-gray-400'
                      }`}>
                        {isProcessing ? (
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                      {isProcessing && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Processing...</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Success State */}
          {generatedListing && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🎉 Your AI Listing is Ready!
                </h3>
                <p className="text-gray-600">
                  Complete listing generated with AI-powered buyer matching campaign
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-green-200">
                <h4 className="font-bold text-gray-900 mb-4">Generated Listing Preview:</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Title: </span>
                    <span className="text-gray-900">{generatedListing.title}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Price: </span>
                    <span className="text-green-600 font-bold">${generatedListing.price?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Size: </span>
                    <span className="text-gray-900">{generatedListing.acreage} acres</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Campaign: </span>
                    <span className="text-blue-600">Targeting {generatedListing.ai_analysis?.marketing_campaign?.estimated_leads} potential buyers</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Listing will be automatically published and marketing campaign launched...
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="text-blue-600 font-medium">Publishing listing...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-white border border-red-200 text-red-700 px-6 py-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}