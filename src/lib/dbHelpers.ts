import { supabase } from './supabase';

// Retry mechanism for database operations
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
}

export const dbHelpers = {
  properties: {
    // Get paginated properties with error handling
    async getPaginated(page: number = 0, pageSize: number = 100) {
      return retryOperation(async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

        try {
          const from = page * pageSize;
          const to = from + pageSize - 1;

          const { data, error } = await supabase
            .from('properties')
            .select('id, title, images, status, city, state, price, size_acres, created_at')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(100)
            .range(from, to)
            .abortSignal(controller.signal);

          if (error) throw error;

          return {
            data: data || [],
            error: null,
            hasMore: data && data.length === pageSize,
            total: 0
          };
        } catch (error: any) {
          console.error("❌ Properties query failed", error.message);
          throw error;
        } finally {
          clearTimeout(timeout);
        }
      }).catch(error => ({
        data: [],
        error,
        hasMore: false,
        total: 0
      }));
    },

    // Optimized method for properties page with retry
    async getPaginatedForPropertiesPage(page: number = 0, pageSize: number = 100) {
      return retryOperation(async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

        try {
          const from = page * pageSize;
          const to = from + pageSize - 1;

          const { data, error } = await supabase
            .from('properties')
            .select('id, title, price, size_acres, city, state, county, apn, images, status, created_at, latitude, longitude')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(100)
            .range(from, to)
            .abortSignal(controller.signal);

          if (error) throw error;

          return {
            data: data || [],
            error: null,
            hasMore: data && data.length === pageSize
          };
        } catch (error: any) {
          console.error("❌ Properties page query failed", error.message);
          throw error;
        } finally {
          clearTimeout(timeout);
        }
      }).catch(error => ({
        data: [],
        error,
        hasMore: false
      }));
    },
    // Fast bulk load for carousel
    async getAllFast() {
      return retryOperation(async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

        try {
          const { data, error } = await supabase
            .from('properties')
            .select('id, title, price, size_acres, city, state, county, apn, images')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(6)
            .abortSignal(controller.signal);

          if (error) throw error;

          return {
            data: data || [],
            error: null
          };
        } catch (error: any) {
          console.error("❌ Fast properties query failed", error.message);
          throw error;
        } finally {
          clearTimeout(timeout);
        }
      }).catch(error => ({
        data: [],
        error
      }));
    },

    // Get properties by user
    async getByUser(userId: string, page: number = 0, pageSize: number = 100) {
      return retryOperation(async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

        try {
          const from = page * pageSize;
          const to = from + pageSize - 1;

          // Use a more optimized query with minimal fields first
          const { data, error } = await supabase
            .from('properties')
            .select('id, title, images, price, size_acres, city, state, status, created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(pageSize)
            .range(from, to)
            .abortSignal(controller.signal);

          if (error) throw error;

          return {
            data: data || [],
            error: null,
            hasMore: data && data.length === pageSize,
            total: 0
          };
        } catch (error: any) {
          console.error("❌ User properties query failed", error.message);
          throw error;
        } finally {
          clearTimeout(timeout);
        }
      }, 2, 3000).catch(error => ({ // Reduce retries and increase delay
        data: [],
        error,
        hasMore: false,
        total: 0
      }));
    },


    // Update property
    async update(propertyId: string, updateData: any) {
      return retryOperation(async () => {
        const { data, error } = await supabase
          .from('properties')
          .update(updateData)
          .eq('id', propertyId)
          .select()
          .single();

        if (error) throw error;

        return {
          data,
          error: null
        };
      }, 3, 2000).catch(error => ({
        data: null,
        error
      }));
    },

    // Delete property
    async delete(propertyId: string, userId: string) {
      return retryOperation(async () => {
        const { error } = await supabase
          .from('properties')
          .delete()
          .eq('id', propertyId)
          .eq('user_id', userId);

        if (error) throw error;

        return {
          error: null
        };
      }, 3, 2000).catch(error => ({
        error
      }));
    }
  }
};