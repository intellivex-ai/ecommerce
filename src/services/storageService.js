import { supabase } from './supabaseClient';

export const storageService = {
    // Upload Product Image
    async uploadProductImage(file, fileName) {
        const { error } = await supabase.storage
            .from('product-images')
            .upload(`products/${fileName}`, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(`products/${fileName}`);

        return publicUrl;
    },

    // Upload User Avatar
    async uploadAvatar(file, userId) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${crypto.randomUUID()}.${fileExt}`;

        const { error } = await supabase.storage
            .from('avatars')
            .upload(`users/${userId}/${fileName}`, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(`users/${userId}/${fileName}`);

        // Update profile with new avatar URL
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', userId);

        if (updateError) throw updateError;

        return publicUrl;
    }
};
