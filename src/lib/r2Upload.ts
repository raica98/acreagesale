export async function uploadMultipleImagesToR2(
  images: string[],
  propertyId: string,
  maxRetries: number = 2,
  timeoutMs: number = 30000
): Promise<string[]> {
  console.log('📤 Uploading images via edge function...');

  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-to-r2`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images,
          propertyId,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }

      const { urls } = await response.json();
      console.log('✅ Upload successful:', urls);
      return urls;
    } catch (error: any) {
      console.error(`❌ R2 upload attempt ${attempt}/${maxRetries} failed:`, error);

      if (attempt === maxRetries) {
        throw error;
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  throw new Error('Upload failed after all retries');
}
