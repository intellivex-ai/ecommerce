import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';

export const useUserStore = create((set) => ({
    user: null,
    profile: null,
    session: null,
    loading: true,

    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),
    setSession: (session) => set({ session }),
    setLoading: (loading) => set({ loading }),

    clearUser: () => set({ user: null, profile: null, session: null }),

    initialize: async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            set({ session, user: session?.user || null });

            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                set({ profile });
            }
        } catch (error) {
            console.error('Error initializing user session', error);
        } finally {
            set({ loading: false });
        }

        // Set up auth listener
        supabase.auth.onAuthStateChange(async (event, session) => {
            set({ session, user: session?.user || null });
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                set({ profile });
            } else {
                set({ profile: null });
            }
        });
    }
}));
