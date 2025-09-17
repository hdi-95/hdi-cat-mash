const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { data: scores, error } = await supabase
      .from('votes')
      .select('*')
      .order('score', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ scores });
  } catch (err) {
    console.error('Erreur API scores:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
