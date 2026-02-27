import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Some features may not work.');
}

// Create Supabase client with minimal configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? localStorage : undefined
  },
  global: {
    headers: {
      'x-client-info': 'acreage-sale-app'
    }
  }
});

// Export Database type for TypeScript
export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          price: number;
          size_acres: number;
          address: string;
          city: string;
          state: string;
          zip_code: string;
          county: string | null;
          apn: string | null;
          latitude: number | null;
          longitude: number | null;
          zoning: string | null;
          water: string | null;
          electricity: string | null;
          sewer: string | null;
          zoning: string | null;
          gps_coordinates: string | null;
          images: string[];
          status: string;
          created_at: string;
          updated_at: string;
          boundary_points: Array<{
            id: string;
            label: string;
            lat: number;
            lng: number;
          }> | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          price: number;
          size_acres: number;
          address: string;
          city: string;
          state: string;
          zip_code: string;
          county?: string | null;
          apn?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          zoning?: string | null;
          water?: string | null;
          electricity?: string | null;
          sewer?: string | null;
          zoning?: string | null;
          gps_coordinates?: string | null;
          images?: string[];
          status?: string;
          created_at?: string;
          updated_at?: string;
          boundary_points?: Array<{
            id: string;
            label: string;
            lat: number;
            lng: number;
          }> | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          size_acres?: number;
          address?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          county?: string | null;
          apn?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          zoning?: string | null;
          water?: string | null;
          electricity?: string | null;
          sewer?: string | null;
          zoning?: string | null;
          gps_coordinates?: string | null;
          images?: string[];
          status?: string;
          created_at?: string;
          updated_at?: string;
          boundary_points?: Array<{
            id: string;
            label: string;
            lat: number;
            lng: number;
          }> | null;
        };
      };
      offers: {
        Row: {
          id: string;
          property_id: string;
          owner_id: string;
          buyer_name: string;
          buyer_email: string;
          buyer_phone: string;
          offer_amount: number;
          timeline: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          owner_id: string;
          buyer_name: string;
          buyer_email: string;
          buyer_phone: string;
          offer_amount: number;
          timeline?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          owner_id?: string;
          buyer_name?: string;
          buyer_email?: string;
          buyer_phone?: string;
          offer_amount?: number;
          timeline?: string | null;
          status?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          disclaimer: string | null;
          is_admin: boolean;
          admin_role: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          disclaimer?: string | null;
          is_admin?: boolean;
          admin_role?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          disclaimer?: string | null;
          is_admin?: boolean;
          admin_role?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_activity_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          resource_type: string;
          resource_id: string | null;
          details: any;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          resource_type: string;
          resource_id?: string | null;
          details?: any;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action?: string;
          resource_type?: string;
          resource_id?: string | null;
          details?: any;
          ip_address?: string | null;
          created_at?: string;
        };
      };
    };
  };
};