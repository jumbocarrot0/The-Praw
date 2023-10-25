import { createClient } from "@supabase/supabase-js"

export async function getCampaign(id) {
    console.log(id)

    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    let { data } = await supabase
        .from('Campaigns')
        .select(`
        name,
        CampaignGames!CampaignGames_campaignID_fkey (gameNumber, ageIDupper, ageIDlower, masterID),
        CampaignPlayers!CampaignPlayers_campaignID_fkey( color, name, coalitionName, CampaignRankings(rank, CampaignGames(gameNumber)), CampaignCoalitions (alienID, alienData:Aliens(alienData->original->name, alienData->original->thumbnail)) )
        `)
        .eq('id', id)
        .limit(1)
        .single()

    data.CampaignPlayers.forEach((player, i) => {
        data.CampaignPlayers[i].CampaignRankings = Object.fromEntries(data.CampaignPlayers[i].CampaignRankings.map((rank) => [rank.CampaignGames.gameNumber - 1, rank.rank]))
    })


    return data
}