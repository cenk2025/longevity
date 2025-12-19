import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqyzvyiqnsxhqzbihrxo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxeXp2eWlxbnN4aHF6YmlocnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTI2MDIsImV4cCI6MjA4MTcyODYwMn0.CBNeoo04APxQC0ZiJ7U3XX35nv2vGw7HkZNCVD0jLdU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
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
