const { createClient } = require('@supabase/supabase-js');

// Initialise Supabase avec les variables d'environnement
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { catId } = req.body;
    if (!catId) return res.status(400).json({ error: 'Missing catId' });

    // Vérifie si le catId existe déjà
    const { data: existing } = await supabase
      .from('votes')
      .select('score')
      .eq('cat_id', catId)
      .single();

    if (existing) {
      // Incrémente le score
      const { data, error } = await supabase
        .from('votes')
        .update({ score: existing.score + 1 })
        .eq('cat_id', catId);
      if (error) throw error;
    } else {
      // Crée une nouvelle entrée
      const { data, error } = await supabase.from('votes').insert({ cat_id: catId, score: 1 });
      if (error) throw error;
    }

    return res.status(200).json({ success: true, catId });
  } catch (err) {
    console.error('Erreur API vote:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
