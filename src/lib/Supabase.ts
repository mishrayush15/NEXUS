import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zmuhcwryfdmuadfrzcfq.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptdWhjd3J5ZmRtdWFkZnJ6Y2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NTk1OTgsImV4cCI6MjA2NTAzNTU5OH0.FOntHG3mvvsPBJCq023vFnYgecwGoRn27rDOwf9ZU_k";


export const supabaseClient = createClient(supabaseUrl, anonKey);

// Example to fetch data from a table
// const { data, error } = await supabaseClient
//   .from('table-name')
//   .select()

// Example to insert data into a table
// const { error } = await supabase
//   .from('table-name')
//   .insert({ id: 1, name: 'Mordor' })

// Example to update data in a table
// const { error } = await supabase
//   .from('table-name')
//   .update({ name: 'piano' })
//   .eq('id', 1)

// Example to delete data from a table
// const response = await supabase
//   .from('table-name')
//   .delete()
//   .eq('id', 1)

