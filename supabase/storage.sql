-- Create storage bucket for stuffed animals images
INSERT INTO storage.buckets (id, name, public)
VALUES ('stuffed-animals', 'stuffed-animals', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Anyone can view stuffed animal images" ON storage.objects
  FOR SELECT USING (bucket_id = 'stuffed-animals');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'stuffed-animals' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'stuffed-animals' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'stuffed-animals' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );