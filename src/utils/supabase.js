import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${window.location.origin}/confirm-email.html`
    }
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Test results helpers
export const saveTestResult = async (userId, testType, score, data) => {
  const { data: result, error } = await supabase
    .from('test_results')
    .insert([
      {
        user_id: userId,
        test_type: testType,
        score: score,
        data: data,
        created_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) throw error;
  return result;
};

export const getTestResults = async (userId, testType = null) => {
  let query = supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (testType) {
    query = query.eq('test_type', testType);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

// User profile helpers
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert([
      {
        user_id: userId,
        ...profileData,
        updated_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) throw error;
  return data;
};
