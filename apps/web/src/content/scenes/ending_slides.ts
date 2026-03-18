// @ts-nocheck
import { Scene, GameState } from "../../engine/types";


export const _ending_slides: Scene = {
  id: "ending_slides",
  title: "Ending Slides",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['chancellor'] != "Hitler" && state.flags['president'] != "Hitler" && state.flags['president'] != "Göring" && (! state.flags['total_defeat'] || state.flags['papen_win'])) || state.flags['rubicon_mini']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             const toolsWrapper = document.getElementById('tools_wrapper');
if (toolsWrapper) {
  toolsWrapper.style.display = 'none';
}
const elements = document.querySelectorAll('header, #content, footer');
elements.forEach(el => {
  (el as HTMLElement).style.maxWidth = '800px';
});
if (Q.president != "Hammerstein" && Q.president != "Hitler" && Q.president != "Göring" && Q.president != "Seldte" && Q.chancellor != "Hitler" && !Q.hammerstein_win && !(Q.president == "Hergt" && Q.chancellor == "Seldte")) {
  Q.weimar_win = 1;
} else {
  Q.weimar_win = 0;
}
if (Q.weimar_win && (Q.president == "Rosenfeld" || Q.president == "Thälmann" || Q.president == "Münzenberg" || Q.president == "Ossietzky" || Q.president == "Mann") && Q.in_left_front && !Q.civil_war_seen) {
  Q.left_win = 1;
  Q.weimar_win = 0;
  Q.kpd_points = 0;
  Q.kpd_points += Q.rfb_force;
  Q.kpd_points += (100 - Q.pro_republic) / 2;
  Q.kpd_points += Q.unemployed / 2;
  Q.kpd_points += Q.kpd_votes;
  Q.kpd_points += Q.soviet_relation;
  if (Q.president == "Thälmann") Q.kpd_points += 16;
  if (Q.president == "Münzenberg") Q.kpd_points += 10;
  if (Q.kpd_leader == "Conciliators") Q.kpd_points += 6;
  if (Q.sapd_formed) {
    Q.kpd_points += 2;
    Q.kpd_points += Q.sapd_votes;
  }
  if (Q.spd_votes < 26) Q.kpd_points += 5;
  if (Q.eu) Q.kpd_points -= 10;
  if (Q.spd_votes >= 36) Q.kpd_points -= 5;
  if (Q.spd_votes >= 40) Q.kpd_points -= 5;
  if (Q.kpd_points >= 50) {
    Q.kpd_win = 1;
  } else {
    Q.kpd_win = 0;
  }
} 
  },

  

  render: `
    A chapter in history closes.
  `,
  choices: [
    {
      id: "taming_lose",
      text: "taming_lose",
      nextSceneId: "taming_lose",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "dnef_win",
      text: "dnef_win",
      nextSceneId: "dnef_win",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "weimar_win",
      text: "weimar_win",
      nextSceneId: "weimar_win",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "weimar_mega_win",
      text: "weimar_mega_win",
      nextSceneId: "weimar_mega_win",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "civil_war_win",
      text: "civil_war_win",
      nextSceneId: "civil_war_win",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "civil_war_long",
      text: "civil_war_long",
      nextSceneId: "civil_war_long",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "monarchy_win",
      text: "monarchy_win",
      nextSceneId: "monarchy_win",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "papen_win",
      text: "papen_win",
      nextSceneId: "papen_win",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "left_win",
      text: "left_win",
      nextSceneId: "left_win",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _taming_lose: Scene = {
  id: "taming_lose",
  title: "The <span style=\"color: #7A3C00;\">Nazi</span> Beast Tamed?",
  subtitle: "Ending 0.5",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rubicon_mini'] && ! state.flags['civil_war_seen'] && (state.flags['chancellor'] == state.flags['nsdap_chancellor'] || state.flags['president'] == "Hitler" || state.flags['president'] == "Göring"));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    With the appointment of [+ chancellor +] and the passage of the Enabling Act, Germany is lost. Schleicher, increasingly sidelined by health issues, fades into irrelevance. Following[? if president == "Hindenburg":&nbsp;President Hindenburg's and?] his[? if president == "Hindenburg":&nbsp;own?] death, General Werner von Blomberg assumes the presidency, marking the end of the failed taming experiment.
    The bourgeois establishment that once collaborated with the <span style="color: #7A3C00;">Nazis</span> is purged en masse during the Night of the Long Knives and offer no serious resistance thereafter, aside from the failed Oster conspiracy in 1938 by former Schleicher loyalists.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _dnef_win: Scene = {
  id: "dnef_win",
  title: "The Perfect Dictatorship",
  subtitle: "Ending 1",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['hammerstein_win'] && ! state.flags['civil_war_seen']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    [? if president != "Hindenburg": During [+ president +]’s term as President, the?][? if president == "Hindenburg": Following the death of Hindenburg from old age and Schleicher due to health complications, General Hammerstein is elected in a landslide in a heavily rigged election. The?] hated <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> system is dismantled, and a new March Constitution is passed near-unanimously. The Reichstag is reduced to a rubber stamp for the regime. Germany formally adopts a presidential system, with both the Presidency and Chancellorship held by various <span style="color: #BFC8CC;">**DNEF**</span> members, who rise through bribes, patronage, and backroom deals. Corruption is endemic. Elections are stage-managed, dominated by fraud and manipulation.
    The <span style="color: #c00000;">**SPD**</span> is never formally banned and endures as a powerless "loyal opposition," unable to influence national policy. Though tolerated, they face constant harassment and suppression by the ruling regime.
    Despite the regime’s authoritarianism, social discontent remains subdued. A <i>Wirtschaftswunder</i>—an economic miracle—emerges as the Great Depression fades. In 1935, Germany secures equality in armaments at Geneva and begins agitating for the return of the Polish Corridor separating East Prussia from the Reich.
    In 1942, a "special military operation" is launched to seize Danzig. Poland refuses to cede territory, and with backing from <span style="color: #002654;">France</span> and a hesitant <span style="color: #C8102E;">Britain</span>, enters a state of war. A puppet regime is installed in occupied territories. A limited <span style="color: #002654;">French</span> offensive into the Saar fails, and the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> remain at war only on paper.
    Sensing German isolation, the <span style="color: #750e0e;">Soviet Union</span> invades eastern Poland, citing abuses against native Belarusians and Ukrainians under military occupation. A new German–<span style="color: #750e0e;">Soviet</span> war erupts. Defense Minister Hammerstein cultivates ties with the "Little Entente"—states facing their own <span style="color: #750e0e;">Soviet</span>-backed revolutionary threats. An unofficial Mitteleuropa bloc emerges, with Germany at its core, squeezed between a Western capitalist bloc and the Eastern state-<span style="color: #c00000;">socialist</span> order.
    In 1946, the war ends in stalemate. Poland is partitioned at the Vistula River. Romania and Bulgaria fall under <span style="color: #700000;">Communist</span> control. Western Europe grows closer to the <span style="color: #B31942;">United</span> <span style="color: #0A3161;">States</span>, and a tripolar global order takes shape.
    By the late 1960s, economic stagnation and renewed domestic unrest—driven by the Red Army Faction and neo-Nazi agitation—force Chancellor Kurt Georg Kiesinger to begin relaxing the dictatorship. The corporatist house of cards that had maintained the regime's stability for decades begins to crumble as independent unions discreetly form. However, Germany remains far from a free and democratic country, the Reichswehr maintains constant watch over politics, exercising real control behind the scenes.
    Today, the <span style="color: #BFC8CC;">**DNEF**</span> operates as a conventional big-tent political party. Though still marred by corruption, it remains the third major force in German politics, behind the <span style="color: #000000;">**CVP**</span> and <span style="color: #d24a00;">**VSPD**</span>. The Mitteleuropa bloc persists as a fragile intermediary between the West and the East—neither liberal nor <span style="color: #c00000;">socialist</span>, but something in between.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _weimar_win: Scene = {
  id: "weimar_win",
  title: "The <span style=\"color: #000000;\">We</span><span style=\"color: #DD0000;\">im</span><span style=\"color: #FFCC00;\">ar</span> Republic Limps Forward",
  subtitle: "Ending 2",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['weimar_win'] && ! state.flags['return_to_normalcy'] && state.flags['spd_votes'] < 50 && state.flags['spd_r'] < 50 && state.flags['pro_republic'] < 80 && state.flags['nsdap_votes'] >= 8 && ! state.flags['civil_war_seen']) || (state.flags['weimar_win'] && (state.flags['return_to_normalcy'] || state.flags['spd_votes'] >= 50 || state.flags['spd_r'] >= 50 || state.flags['pro_republic'] >= 80 || state.flags['nsdap_votes'] < 8) && ! state.flags['civil_war_seen'] && state.flags['rubicon']));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Following the scarring experience of the <span style="color: #7A3C00;">Nazi</span> movement’s rapid rise and implosion, the flaws of the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> system became impossible to ignore. But in the end, the <span style="color: #7A3C00;">fascists</span> and <span style="color: #700000;">communists</span> who once battled in the streets now stand together in soup lines. Though a number of neo-<span style="color: #7A3C00;">Nazi</span> movements would emerge after [+ nsdap_leader +]’s mask of sanity slipped, the ideology itself remains irrevocably discredited.
    No war as destructive as the Great War would come again. Slowly, Germany and the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> began to rebuild relations, choosing to forget and forgive. <span style="color: #7A3C00;">Fascism</span> never takes root as a dominant force, and the primary threat to European democracy becomes the resurgent <span style="color: #750e0e;">Soviet Union</span>. The Spanish Civil War ends in 1936 with a Republican victory. [? if austria_defeat: In 1939, Austria's <span style="color: #7A3C00;">Austrofascist</span> regime collapses under popular revolt.?][? if sdapo_win or force_peace: In 1938, Austria's ruling <span style="color: #A50034;">**SDAPÖ**</span> successfully holds a referendum confirming their <i>Anschluss</i> into Germany. ?][? if long_war_2: The war in Austria is eventually won by the <span style="color: #7A3C00;">Austrofascists</span>, who receive generous aid from a <span style="color: #7A3C00;">fascist</span> Italy.?]  Isolated and denied any success in his expansionist aims in Yugoslavia and Greece, Mussolini is deposed in a royalist coup led by King Victor Emmanuel III, and Italy returns to democratic governance[? if long_war_2:, leading to Austria’s government democratizing as a consequence of losing its benefactor?].
    Africa remains colonized until the 1970s and 80s. Independence, when it comes, is negotiated largely on the terms of the colonizers. Exploitation persists under a different guise. The Cold War unfolds along different lines, as a "state capitalist" <span style="color: #750e0e;">Soviet Union</span> remains intact, forming a bloc with the authoritarian <span style="color: #000099;">Kuomintang</span>-ruled Republic of China and post-independence India, which fought a bloody war to escape <span style="color: #C8102E;">British</span> rule in the 1950s. This tri-polar alliance has solidified into a global axis of its own.
    [? if not (pro_republic < 50 and spd_votes < 25 and z_ideology == "Right" and z_relation < 35 and dnvp_ideology == "Radical"): Today, Germany is governed by a stable two-and-a-half party system, rotating power between a non-<span style="color: #9B0000;">Marxist</span> <span style="color: #c00000;">**SPD**</span>, the centrist <span style="color: #000000;">**CVP**</span>, and the liberal <span style="color: #FFCC00;">**LDPD**</span>. However, a surging <span style="color: #D79E2A;">**NDPD**</span> has emerged on the far right, capitalizing on public discontent over a refugee crisis driven by wars in an impoverished and unstable Africa. ?]
  `,
  choices: [
    {
      id: "weimar_win_a",
      text: "weimar_win_a",
      nextSceneId: "weimar_win_a",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "go_back_2",
      text: "go_back_2",
      nextSceneId: "go_back_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _weimar_win_a: Scene = {
  id: "weimar_win_a",
  title: "weimar_win_a",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['pro_republic'] < 50 && state.flags['spd_votes'] < 25 && state.flags['z_ideology'] == "Right" && state.flags['z_relation'] < 35 && state.flags['dnvp_ideology'] == "Radical");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending A - The World's Most Unstable Republic
    The political deadlock that defined the gravest crisis of the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Republic has persisted over the years. The <span style="color: #3E88B3;">**DNVP**</span> has never been fully reconciled with a system it was fundamentally opposed to from the start. Meanwhile, the estrangement of the <span style="color: #000000;">Center Party</span> from the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Coalition has only deepened right-wing hostility toward the <span style="color: #c00000;">**SPD**</span>.
    The presidency has remained out of reach for the <span style="color: #c00000;">**SPD**</span>, with successors to Hindenburg's worldview continuing to preside over Germany and obstruct our return to executive power. In 1939, a recession—sparked by European instability and rising tensions with the <span style="color: #750e0e;">Soviet Union</span>—triggered another wave of extremism. The Reichswehr was forced to step in to prevent a "March on Berlin" by both <span style="color: #700000;">communists</span> and <span style="color: #7A3C00;">fascism</span>.
    Though real democracy was formally restored in the 1960s following massive public discontent, the <span style="color: #6A1E1E;">**DSU**</span> has remained a persistent force on the far-right. Recently rebranding itself as the <span style="color: #D79E2A;">**NDPD**</span>, it has capitalized on growing public anger over a refugee crisis driven by continued war and instability across Africa. 
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _weimar_mega_win: Scene = {
  id: "weimar_mega_win",
  title: "The <span style=\"color: #000000;\">We</span><span style=\"color: #DD0000;\">im</span><span style=\"color: #FFCC00;\">ar</span> Republic Marches On",
  subtitle: "Ending 3",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['weimar_win'] && (state.flags['return_to_normalcy'] || state.flags['spd_votes'] >= 50 || state.flags['spd_r'] >= 50 || state.flags['pro_republic'] >= 80 || state.flags['nsdap_votes'] < 8) && ! state.flags['civil_war_seen'] && ! state.flags['rubicon']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    At the turn of the decade, the Great Depression and widespread disillusionment with the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> system left few optimists in Germany. Yet, the Republic—forged by the will of the people all those years ago—has weathered a crisis of unprecedented proportions. <span style="color: #c00000;">Social Democracy</span> endures, as do its detractors.
    No war as destructive as the Great War would come again. Slowly, Germany and the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> began to rebuild relations, choosing to forget and forgive. <span style="color: #7A3C00;">Fascism</span> never takes root as a dominant force, and the primary threat to European democracy becomes the resurgent <span style="color: #750e0e;">Soviet Union</span>. The Spanish Civil War ends in 1936 with a Republican victory. [? if austria_defeat: In 1939, Austria's <span style="color: #7A3C00;">Austrofascist</span> regime collapses under popular revolt.?][? if sdapo_win or force_peace: In 1938, Austria's ruling <span style="color: #A50034;">**SDAPÖ**</span> successfully holds a referendum confirming their <i>Anschluss</i> into Germany. ?][? if long_war_2: The war in Austria is eventually won by the <span style="color: #7A3C00;">Austrofascists</span>, who receive generous aid from a <span style="color: #7A3C00;">fascist</span> Italy.?] Isolated and denied any success in his expansionist aims in Yugoslavia and Greece, Mussolini is deposed in a royalist coup led by King Victor Emmanuel III, and Italy returns to democratic governance[? if long_war_2:, leading to Austria’s government democratizing as a consequence of losing its benefactor?].
    Africa remains colonized until the 1970s and 80s. Independence, when it comes, is negotiated largely on the terms of the colonizers. Exploitation persists under a different guise. The Cold War unfolds along different lines, as a "state capitalist" <span style="color: #750e0e;">Soviet Union</span> remains intact, forming a bloc with the authoritarian <span style="color: #000099;">Kuomintang</span>-ruled Republic of China and post-independence India, which fought a bloody war to escape <span style="color: #C8102E;">British</span> rule in the 1950s. This tri-polar alliance has solidified into a global axis of its own.
  `,
  choices: [
    {
      id: "weimar_mega_win_a",
      text: "weimar_mega_win_a",
      nextSceneId: "weimar_mega_win_a",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "weimar_mega_win_b",
      text: "weimar_mega_win_b",
      nextSceneId: "weimar_mega_win_b",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _weimar_mega_win_a: Scene = {
  id: "weimar_mega_win_a",
  title: "weimar_mega_win_a",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_votes'] >= 50 || state.flags['spd_r'] >= 50);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending A - One and a Half Party system
    The <span style="color: #c00000;">**SPD**</span>'s rule over Germany has endured for decades, following its sublime management of the Great Depression and successful expansion of support beyond the urban working class. To this day, the <span style="color: #c00000;">**SPD**</span> retains its status as the "natural governing party," having only been out of office during brief stints in times of crisis. Only a united coalition of all parties from the <span style="color: #FF5349;">**SRPD**</span> to the <span style="color: #3E88B3;">**DNVP**</span> has ever managed to take power—only to quickly collapse, paving the way for yet more years of <span style="color: #c00000;">**SPD**</span> rule.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _weimar_mega_win_b: Scene = {
  id: "weimar_mega_win_b",
  title: "weimar_mega_win_b",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_votes'] < 50 && state.flags['spd_r'] < 50);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending B - Bloc Politics
    The <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Coalition has begun to fracture, as the <span style="color: #000000;">Center Party</span> exits the alliance and repositions itself as a center-right force. However, lingering animosity toward the parties further to the right prevents any formal unification. Instead, the newly formed <span style="color: #000000;">Christian People's Party</span> has opted to form a new electoral alliance—the "People's Bloc"—alongside the <span style="color: #3E88B3;">**DNVP**</span> and the newly established <span style="color: #98C22C;">**NLP**</span>—which is essentially a renamed continuation of its predecessor.
    We are only able to enter government as part of a "left bloc" with the <span style="color: #E0B0FF;">**RDP**</span>, <span style="color: #FF7F00;">**CSRP**</span>, and <span style="color: #BE3075;">**LSPD**</span>. This has continued to this day, but the inclusion of the purportedly neo-<span style="color: #7A3C00;">Nazi</span> <span style="color: #D79E2A;">**NDPD**</span> into the People's Bloc—capitalizing on public discontent over a refugee crisis sparked by wars in an impoverished and unstable Africa—is deeply concerning.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _civil_war_win: Scene = {
  id: "civil_war_win",
  title: "Bürgerkrieg",
  subtitle: "Ending 4",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['civil_war_seen'] && state.flags['republic_victory']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Following a brief civil war between <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> forces and the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>, we’ve been given a blank slate to rebuild Germany on a truly democratic and social foundation—free, for now, from the fear of reactionary reprisals. A minor coup attempt by General Bredow is foiled, and with it, the Reichswehr is finally brought under the banner of the <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ic</span>.
    But it is not all sunshine and rainbows. The civil war has devastated countless lives, and the costs of reconstruction and welfare have triggered the return of hyperinflationary nightmares. Hunger now exceeds levels seen during the Great Depression, and many are already growing disillusioned with their supposed saviors. Though the reactionary and far-right forces were defeated on the battlefield, it's only a matter of years before a new right-wing movement emerges and takes root among the weary and discontented populace.
    No war as destructive as the Great War would come again. Slowly, Germany and the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> began to rebuild relations, but the <span style="color: #002654;">French</span> reoccupation of the Rhineland has complicated efforts. <span style="color: #7A3C00;">Fascism</span> never takes root as a dominant force, and the primary threat to European democracy becomes the resurgent <span style="color: #750e0e;">Soviet Union</span>. The Spanish Civil War ends in 1936 with a Republican victory. [? if austria_defeat: In 1939, Austria's <span style="color: #7A3C00;">Austrofascist</span> regime collapses under popular revolt.?][? if sdapo_win or force_peace: In 1938, Austria's ruling <span style="color: #A50034;">**SDAPÖ**</span> successfully holds a referendum confirming their <i>Anschluss</i> into Germany. ?][? if long_war_2: The war in Austria is eventually won by the <span style="color: #7A3C00;">Austrofascists</span>, who receive generous aid from a <span style="color: #7A3C00;">fascist</span> Italy.?] Isolated and denied any success in his expansionist aims in Yugoslavia and Greece, Mussolini is deposed in a royalist coup led by King Victor Emmanuel III, and Italy returns to democratic governance[? if long_war_2:, leading to Austria’s government democratizing as a consequence of losing its benefactor?]..
    Africa remains colonized until the 1970s and 80s. Independence, when it comes, is negotiated largely on the terms of the colonizers. Exploitation persists under a different guise. The Cold War unfolds along different lines, as a "state capitalist" <span style="color: #750e0e;">Soviet Union</span> remains intact, forming a bloc with the authoritarian <span style="color: #000099;">Kuomintang</span>-ruled Republic of China and post-independence India, which fought a bloody war to escape <span style="color: #C8102E;">British</span> rule in the 1950s. This tri-polar alliance has solidified into a global axis of its own.
  `,
  choices: [
    {
      id: "civil_war_win_a",
      text: "civil_war_win_a",
      nextSceneId: "civil_war_win_a",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "civil_war_win_b",
      text: "civil_war_win_b",
      nextSceneId: "civil_war_win_b",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _civil_war_win_a: Scene = {
  id: "civil_war_win_a",
  title: "civil_war_win_a",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['pro_republic'] < 70 || state.flags['spd_votes'] < 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending A - A False Victory
    The fracturing of the <span style="color: #c00000;">**SPD**</span> into the <span style="color: #f0456a;">**SVD**</span> and the <span style="color: #9B0000;">**SED**</span> in the wake of post-war optimism deeply divided the German left. As in 1920, leftist disunity once again produced a scenario where a "New <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Coalition"—composed of the <span style="color: #f0456a;">**SVD**</span>, <span style="color: #FFCC00;">LVP</span>, and <span style="color: #FF7F00;">**CSRP**</span>—was unable to secure a majority. This led to repeated snap elections, ultimately fueling another resurgence of extremism.
    It was only through the formation of the <span style="color: #BFC8CC;">German National Unity Front</span>—a broad alliance of all bourgeois parties—and the election of Otto Gessler as president that Germany finally escaped its political deadlock. The resulting coalition of the <span style="color: #000000;">**ZCA**</span>, <span style="color: #FFCC00;">**LVP**</span>, and <span style="color: #38C538;">**DBP**</span> emerged as the new “natural governing bloc,” as persistent ideological rifts continued to paralyze the left. The <span style="color: #f0456a;">**SVD**</span>, increasingly marginalized, was at times compelled to tolerate these centrist cabinets in the name of stability—abandoning its <span style="color: #9B0000;">Marxist</span> roots in the process and ceding leadership of the left to the more radical <span style="color: #9B0000;">**SED**</span>.
    Only with the third wave of democratization in the 1990s did the long-divided German left begin to reunify. The gradual moderation and eventual merger of the <span style="color: #9B0000;">**SED**</span> and the <span style="color: #f0456a;">**SVD**</span> culminated in the formation of the <span style="color: #c00000;">**VSPD**</span>, which at last returned to government after decades in opposition.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _civil_war_win_b: Scene = {
  id: "civil_war_win_b",
  title: "civil_war_win_b",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['pro_republic'] >= 70 && state.flags['spd_votes'] >= 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending B - The Socialist Dream
    Despite the blank slate granted to the <span style="color: #c00000;">**SPD**</span> to reshape Germany in its image, the country has faced relentless challenges: the hyperinflationary crisis of the 1930s, the resurgence of the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> in the 1940s, and a series of counterproductive bans that only emboldened reactionary forces. Yet, step by step, Germany rebuilds.
    Even following the <span style="color: #c00000;">**SPD**</span>’s splintering into the <span style="color: #9B0000;">**SED**</span> and <span style="color: #f0456a;">**SVD**</span> due to foreign policy disputes in the 1940s, both parties cooperated to construct a comprehensive welfare state—one that could stand alongside the Nordic models in its scope and ambition.
    The bourgeois opposition—comprising the <span style="color: #000000;">**ZCA**</span>, <span style="color: #FFCC00;">**LVP**</span>, and <span style="color: #38C538;">**DBP**</span>—was relegated to a state of permanent irrelevance, unable to halt the wave of reforms: the rise of workplace councils, sweeping nationalizations, and the assertion of state control over the Reichsbank.
    However, the stagflation of the 1970s marked the beginning of the end for traditional leftist dominance. As the middle class expanded at the expense of the working class, the foundations of class politics began to erode—giving rise to a new multiparty system and ending the era of unchallenged <span style="color: #c00000;">socialist</span> rule.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _civil_war_long: Scene = {
  id: "civil_war_long",
  title: "Germany Divided",
  subtitle: "Ending 5",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['civil_war_seen'] && state.flags['long_war'] && ! (state.flags['president'] == "Hergt" && state.flags['chancellor'] == "Seldte"));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    As the frontlines settle, a <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> state—committed to the continuation of <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Germany—takes root in the West, while a newly formed Ruhr Red Army establishes <span style="color: #700000;">**Communist**</span> control over the Rhineland. The fragile alliance of <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> forces soon fractures, with the <span style="color: #3E88B3;">**Stahlhelm**</span> and the <span style="color: #7A3C00;">**SA**</span> turning against one another in violent internal conflict.
    Ernst Röhm eventually reduces [+ nsdap_leader +] to a puppet, seizing full control and unleashing unspeakable atrocities against the local <span style="color: #005EB8;">Jewish</span> and Polish populations in the territories under their control. A renewed offensive by <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> forces exploits the chaos on the Right, culminating in the defeat of the reactionary militias. However, a brutal campaign continues in the Ruhr, where every town exacts a death toll of thousands.
    By 1936, Germany remains fractured. Poland has seized the moment to occupy parts of East Prussia and Silesia, citing the protection of ethnic Poles. Meanwhile, the <span style="color: #002654;">French</span> dispatch a "peacekeeping" force into the Rhineland. In the end, it is not so much a victory for the Republic as it is a decisive collapse of the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>.
    No war as destructive as the Great War would come again. Slowly, Germany and the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> began to rebuild relations, but the <span style="color: #002654;">French</span> reoccupation of the Rhineland has complicated efforts. <span style="color: #7A3C00;">Fascism</span> never takes root as a dominant force, and the primary threat to European democracy becomes the resurgent <span style="color: #750e0e;">Soviet Union</span>. The Spanish Civil War ends in 1936 with a Republican victory. [? if austria_defeat: In 1939, Austria's <span style="color: #7A3C00;">Austrofascist</span> regime collapses under popular revolt.?][? if sdapo_win or force_peace: In 1938, Austria's ruling <span style="color: #A50034;">**SDAPÖ**</span> successfully holds a referendum confirming their <i>Anschluss</i> into Germany. ?][? if long_war_2: The war in Austria is eventually won by the <span style="color: #7A3C00;">Austrofascists</span>, who receive generous aid from a <span style="color: #7A3C00;">fascist</span> Italy.?] Isolated and denied any success in his expansionist aims in Yugoslavia and Greece, Mussolini is deposed in a royalist coup led by King Victor Emmanuel III, and Italy returns to democratic governance[? if long_war_2:, leading to Austria’s government democratizing as a consequence of losing its benefactor?].
    Africa remains colonized until the 1970s and 80s. Independence, when it comes, is negotiated largely on the terms of the colonizers. Exploitation persists under a different guise. The Cold War unfolds along different lines, as a "state capitalist" <span style="color: #750e0e;">Soviet Union</span> remains intact, forming a bloc with the authoritarian <span style="color: #000099;">Kuomintang</span>-ruled Republic of China and post-independence India, which fought a bloody war to escape <span style="color: #C8102E;">British</span> rule in the 1950s. This tri-polar alliance has solidified into a global axis of its own.
  `,
  choices: [
    {
      id: "civil_war_long_a",
      text: "civil_war_long_a",
      nextSceneId: "civil_war_long_a",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "civil_war_long_b",
      text: "civil_war_long_b",
      nextSceneId: "civil_war_long_b",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _civil_war_long_a: Scene = {
  id: "civil_war_long_a",
  title: "civil_war_long_a",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['west_aid']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending A - The Black Spot of Europe
    Despite the Republic’s paper victory, revanchist sentiment over the loss of Eastern and Western territories, coupled with mass radicalization from the staggering death toll, destruction, hyperinflation, widespread hunger, and the absence of meaningful foreign aid, has deeply discredited the political establishment. Under pressure from the Reichswehr, martial law remains in place for years, with the military increasingly intruding into civilian governance.
    By 1939, a global recession—triggered by escalating instability across Europe and threats from the <span style="color: #750e0e;">Soviet</span> Union—obliterates the reconstruction progress made by the ruling <span style="color: #c00000;">**SPD**</span>, plunging the country into yet another crisis. Following a March on Berlin, a "Third Positionist" regime seizes power, led by a new political party composed of former <span style="color: #7A3C00;">Nazis</span> and disillusioned <span style="color: #c00000;">socialists</span>.
    Germany pivots toward autarky and radical self-reliance, sealing its borders to foreigners. The regime earns the moniker "Black Spot of Europe," ruling from 1940 to 1996. During this period, it successfully coerces the withdrawal of foreign troops from the Rhineland and reclaims its lost eastern territories—including the Polish Corridor—in 1946, capitalizing on Poland's distraction with the <span style="color: #750e0e;">Soviet</span> threat and the shifting priorities of the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> as they fight war with Japan.
    Today, Germany remains largely isolated from the rest of the world, with the successor to the dictatorship of old being not much better, being ruled by oligarchs and the wealthy who are relicts of the past regime. Now, the task of <span style="color: #c00000;">Social Democracy</span> is to prepare for the next election. The incumbent government of Wolfgang Schäuble is unpopular, and we stand to gain. Perhaps the next government will have a <span style="color: #c00000;">socialist</span> plurality.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _civil_war_long_b: Scene = {
  id: "civil_war_long_b",
  title: "civil_war_long_b",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['west_aid']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending B - A <span style="color: #001489;">European</span> <span style="color: #FFDD00;">Future</span>
    In exchange for the return of the Rhineland and the lifting of its post-war reparations burden, Germany is compelled to enter a defensive pact with <span style="color: #002654;">France</span> and <span style="color: #C8102E;">Britain</span>. With assistance from the <span style="color: #10069f;">League</span> of <span style="color: #10069f;">Nations</span> and the <span style="color: #B31942;">United</span> <span style="color: #0A3161;">States</span>, the so-called "Morgenthau Plan", funded by the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span>, successfully facilitates German reconstruction and ushers in a <i>Wirtschaftswunder</i> under the leadership of Chancellor Konrad Adenauer.
    By the end of the decade, the economies of the <span style="color: #0A3161;">West</span> become increasingly interconnected. Further integration into a nascent "<span style="color: #001489;">European</span> <span style="color: #FFDD00;">Union</span>"—featuring free trade and the free movement of people—is negotiated by the internationalist <span style="color: #c00000;">**SPD**</span> and the <span style="color: #FFCC00;">**LVP**</span>. Renewed <span style="color: #750e0e;">Soviet</span> threats to Eastern European nations like Finland and Poland, alongside the democratization of Austria and Italy, have once again galvanized a united European response to <span style="color: #750e0e;">Bolshevik</span> aggression.
    Today, Germany remains a pillar of a federal <span style="color: #001489;">European</span> <span style="color: #FFDD00;">Union</span> stretching from Lisbon to Athens. Now, the task of <span style="color: #f0456a;">Social Democracy</span> is to prepare for the next election. The incumbent government of Klaus Schwab is unpopular, and we stand to gain. Perhaps the next government will have a <span style="color: #f0456a;">socialist</span> plurality.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _monarchy_win: Scene = {
  id: "monarchy_win",
  title: "Return of the Kaiserreich",
  subtitle: "Ending 6",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['president'] == "Hergt" && state.flags['chancellor'] == "Seldte");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    With the <span style="color: #7A3C00;">Nazi</span> movement in decline following the end of the economic depression and an internal leadership struggle, and with the election of the <span style="color: #3E88B3;">nationalist</span> Hergt alongside the appointment of the <span style="color: #3E88B3;">**Stahlhelm**</span>'s Seldte, it appears that <span style="color: #808080;">reaction</span> has triumphed over <span style="color: #7A3C00;">revolution</span>. Although various neo-<span style="color: #7A3C00;">Nazi</span> splinters emerged after [+ nsdap_leader +]’s final descent into delusion, the ideology itself remains irrevocably discredited.
    Following the peaceful return of the Saarland via referendum in 1935, the Reichswehr suppressed an attempted uprising by the <span style="color: #7A3C00;">**SA**</span> and purged the remaining <span style="color: #7A3C00;">Nazi</span> elements from government. In the heavily managed 1936 elections, under the watch of "electoral monitors", the <span style="color: #808080;">monarchist</span> parties secured a manufactured mandate. Soon after, a secret rearmament program was launched, and shortly after, the crowning of Wilhelm III—blessed by his father—restores Germany's constitutional monarchy.
    With ambitions focused on reclaiming lost territories in the East and Alsace-Lorraine in the West, Germany began courting allies for its revisionist aims. The restoration of Habsburg rule in Austria and the toppling of Mussolini in a royalist coup led by King Victor Emmanuel III drastically altered the balance of power in Europe. When Poland refused to return former imperial lands, the <span style="color: #C8102E;">British</span>, and more reluctantly the <span style="color: #002654;">French</span>, turned a blind eye to escalating German border skirmishes. The <span style="color: #700000;">Communist</span> victory in Spain, and the wave of revolutions it triggered across the continent, forced the imperial powers to prioritize containment of the <span style="color: #700000;">Soviet</span> threat above all else.
    Africa remains colonized until the 1980s and 90s. Independence, when it comes, is negotiated largely on the terms of the colonizers. Exploitation persists under a different guise. The Cold War unfolds along different lines, as a "state capitalist" <span style="color: #750e0e;">Soviet Union</span> remains intact, forming a bloc with the authoritarian <span style="color: #000099;">Kuomintang</span>-ruled Republic of China and post-independence India, which fought a bloody war to escape <span style="color: #C8102E;">British</span> rule in the 1950s. This tri-polar alliance evolved into a global axis of its own, encompassing numerous <span style="color: #700000;">Communist</span> regimes worldwide.
    Today, Germany is a dominant party state, ruled by the elites of the <span style="color: #3E88B3;">**DNVP**</span>, who have maintained control for nearly a century. Although dissatisfaction with the monarchy and the growing strength of the opposition have forced some minor reforms, each new election consistently delivers a majority for the incumbent coalition. However, cracks are beginning to show in the system. New, young, and popular <span style="color: #c00000;">**SPD**</span> leaders are making inroads despite state repression, with Sahra Wagenknecht being the first to achieve a significant victory, having been elected Minister-President of Thuringia. Perhaps the next government will have a mere <span style="color: #3E88B3;">nationalist</span> plurality.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _papen_win: Scene = {
  id: "papen_win",
  title: "The Imperfect Dictatorship",
  subtitle: "Ending 7",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['papen_win']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Despite being hated by nearly 90% of the population, Franz von Papen's surprising victory—secured through the backing of the elites and the Reichswehr—brought him to power in a deeply fractured Germany. However, consolidating that power proved difficult. Despite the eradication of organized <span style="color: #700000;">communist</span> and <span style="color: #c00000;">social democratic</span> resistance, the Ruhr remains ablaze with unrest. Meanwhile, ongoing conflict between Papen and Kurt von Schleicher, who still maintains significant influence within the military, further destabilizes his regime.
    Papen's nationalist foreign policy has won him few friends abroad, and his goal of unshackling Germany from the chains of Versailles remains distant. In an effort to restore order, Papen forms a "National Regeneration Government", rooted in conservative Christian values, militarism, and monarchism. Following the death of President Paul von Hindenburg, Wilhelm III is crowned as a figurehead monarch, while real power remains concentrated in the hands of the political elite and industrial magnates. Germany is transformed into a dictatorship, with the "New State" envisioned by Papen centralizing authority in the executive.
    After a period of economic recovery in the late 1930s, Papen turns his attention toward foreign policy, seeking to broker an entente with the <span style="color: #002654;">French</span> to combat <span style="color: #700000;">Bolshevism</span> in the East. When these efforts failed, he turned to cooperate with <span style="color: #7A3C00;">Austrofascist</span> Austria and Mussolini’s Italy, who remained among Germany’s few continental allies.
    However by the 1950s, however, the regime begins to decay. Corruption, unrest, and economic stagnation—coupled with Papen’s death—trigger a political thaw. The "Prussian Spring" ushers in a wave of democratic reforms, but the entrenched elites of the old system work to protect their interests. The military retains an active and unofficial role in politics, making it impossible for the reconstituted <span style="color: #c00000;">**SPD**</span> to assume power without risking a coup.
    Africa remains colonized until the 1980s and 90s. Independence, when it comes, is negotiated largely on the terms of the colonizers. Exploitation persists under a different guise. The Cold War unfolds along different lines, as a <span style="color: #750e0e;">Soviet Union</span> surviving intact but slightly liberalized, serving as the key pillar in a global alliance encompassing the <span style="color: #700000;">Communist</span> regimes worldwide. 
    Today, Germany is a multiparty democracy, following the ousting of the successor conservative party founded by figures of the former regime. Yet all is not well in the republic. Friedrich Merz, now President, has drawn criticism for invoking nostalgia for the old system, sparking fears of democratic backsliding and concentration of power in favor of the oligarchs. Now, the task of <span style="color: #f0456a;">Social Democracy</span> is to prepare for the next presidential election. Our Sahra Wagenknecht is considering running for another non-consecutive term; perhaps she is our only hope to topple Merz.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _left_win: Scene = {
  id: "left_win",
  title: "The Left Front Triumphs!",
  subtitle: "Ending 8",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['left_win']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The United Front Government, under President [? if president == "Rosenfeld": Kurt Rosenfeld?][? if president == "Thälmann": Ernst Thälmann?][? if president == "Münzenberg": Willi Münzenberg?][? if president == "Ossietzky": Carl von Ossietzky?][? if president == "Mann": Heinrich Mann?], withstood everything thrown its way—<span style="color: #C0A054;">capitalist</span> treachery, <span style="color: #3E88B3;">institutional</span> sabotage, and constant subversion by <span style="color: #808080;">reactionaries</span>. In 1937, after winning a second election and slightly increasing its majority, the government faced a coup attempt led by the <span style="color: #808080;">reactionary</span> elements of the Reichswehr and increasingly radicalized <span style="color: #3E88B3;">nationalists</span> and <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> forces. 
    The coup failed. The abortive putsch was crushed by the proletarian masses and shattered the political landscape of <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span>. The far left of the [? if not lvp_formed: <span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed: <span style="color: #FFCC00;">**LVP**</span>?] and [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?]—splinters from their parties who maintained ambiguity towards the coup—split off to form the <span style="color: #E0B0FF;">**RDP**</span> and <span style="color: #FF7F00;">**CSRP**</span>, both of which soon joined the United Front.
    With the bourgeois center increasingly marginalized, the botched coup gave the United Front the momentum needed to finally purge the Republic of <span style="color: #808080;">reactionary</span> forces and initiate a <span style="color: #9B0000;">socialist</span> economy. Eventually a constitutional convention was called to begin a <span style="color: #9B0000;">Socialist Republic</span>.
  `,
  choices: [
    {
      id: "left_win_a",
      text: "left_win_a",
      nextSceneId: "left_win_a",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "left_win_b",
      text: "left_win_b",
      nextSceneId: "left_win_b",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _left_win_a: Scene = {
  id: "left_win_a",
  title: "left_win_a",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['kpd_win']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending A - Spartakus Rises Again
    The convention is called, and with overwhelming support, it dismantles the old bourgeois institutions. At last, after all these years, the German <span style="color: #750e0e;">Soviet Republic</span> is formed—and this time, "All Power to the <span style="color: #750e0e;">Soviets</span>" is more than just a slogan. The <span style="color: #c00000;">**SPD**</span> takes the lead in constructing the <span style="color: #750e0e;">Soviet Republic</span>. Though the process is complex and at times byzantine, born of compromise among many factions, it is unmistakably <span style="color: #700000;">revolutionary</span>.
    No war as destructive as the Great War would come again. The Spanish Civil War ends in 1936 with a Republican victory. [? if austria_defeat: In 1939, Austria's <span style="color: #7A3C00;">Austrofascist</span> regime collapses under popular revolt.?][? if sdapo_win or force_peace: In 1938, Austria's ruling <span style="color: #A50034;">**SDAPÖ**</span> successfully holds a referendum confirming their <i>Anschluss</i> into Germany. ?][? if long_war_2: The war in Austria is eventually won by the <span style="color: #7A3C00;">Austrofascists</span>, who receive generous aid from a <span style="color: #7A3C00;">fascist</span> Italy.?] Isolated and denied any success in his expansionist aims in Yugoslavia and Greece, Mussolini is deposed in a royalist coup led by King Victor Emmanuel III, and Italy returns to democratic governance[? if long_war_2:, leading to Austria’s government democratizing as a consequence of losing its benefactor?]. 
    In a world largely hostile to <span style="color: #9B0000;">socialism</span>, we stand as a shining example: the economy is <span style="color: #c00000;">socialized</span>, and economic control is placed directly in the hands of the <span style="color: #c00000;">proletariat</span>. The <span style="color: #750e0e;">Soviet Union</span> remains distant, as does the <span style="color: #0A3161;">West</span>. We emerge as a beacon of socialism amid the growing tensions of a Cold War—between the <span style="color: #750e0e;">**Soviets**</span>, an authoritarian <span style="color: #000099;">Kuomintang</span>-led China, and an independent India on one side, and the capitalist <span style="color: #0A3161;">West</span> on the other.
    We maintain a strictly neutral stance, offering principled opposition to both blocs. In doing so, we inspire many nations to follow our political and geopolitical path. Our shining <span style="color: #9B0000;">socialist republic</span> manages to survive, until the end of an inconclusive Cold War in détente.
    As a key neutral player throughout the Cold War, we reap the benefits—becoming a center for dialogue and commerce. With the arrival of détente, more and more nations join us in non-alignment.
    All is not golden though. Our republic is prone to infighting, as the various proletarian groups represented in the economy often clash over resource allocation. Additionally, our council-centered system faces criticism for its inability to adapt to modern conditions, with growing signs of bureaucratic inefficiency. Nevertheless, as we enter the 2000s, the Deutsche Räterepublik remains a bastion of <span style="color: #c00000;">socialism</span> and <span style="color: #9B0000;">orthodoxy</span>.
    Our politics, culture, and economy are still deeply proletarian. Albeit <span style="color: #f0456a;">third way</span> and even <span style="color: #98C22C;">capitalist</span> parties remain on our right—and hardline <span style="color: #700000;">vanguardists</span> on our left—the <span style="color: #c00000;">**SPD**</span> and its successor parties maintain a firm hold on the Republic.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _left_win_b: Scene = {
  id: "left_win_b",
  title: "left_win_b",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['kpd_win']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Title: Subending B - The Vanguard Takes the Helm
    As the Constitutional Assembly convenes, it is gradually decided that the new <span style="color: #700000;">socialist</span> state will take inspiration from the Russian Revolution and the <span style="color: #750e0e;">Soviet Union</span>’s <span style="color: #700000;">vanguardist</span> model. The <span style="color: #c00000;">**SPD**</span>—whether convinced, divided, or simply powerless to stop the shift—accepts it. The two <span style="color: #9B0000;">**socialist**</span> parties rapidly merge into a single party that monopolizes power in the new state, while allowing some minor parties to remain as bloc parties. The <span style="color: #DC241F;">**Socialist Unity Party**</span> (<span style="color: #DC241F;">**SED**</span>) takes the helm.
    The regime immediately begins aligning with the <span style="color: #750e0e;">Soviet Union</span> and puts forth its first *Gosplans*. Soon, the State becomes a member of the Eastern Bloc. World War II breaks out as a massive conflict between the <span style="color: #0A3161;">capitalist</span> and <span style="color: #700000;">communist</span> worlds. It ends with a vast Eastern Bloc stretching from Lisbon to Arkhangelsk. A Cold War begins against the <span style="color: #B31942;">United</span> <span style="color: #0A3161;">States</span>, <span style="color: #C8102E;">Britain</span>, <span style="color: #000099;">Kuomintang</span>-led China, and the <span style="color: #002654;">French</span> government in exile.
    The <span style="color: #DC241F;">**SED**</span> assumes an important role in the <span style="color: #750e0e;">Soviet</span> Bloc as the leader of the second most industrialized country. Germany experiences decades of growth under the economic plans, calming most dissent within the country. To combat the remaining opposition, the Party establishes the Stasi, inspired by the <span style="color: #750e0e;">Soviet Union</span>’s NKVD.
    Alongside the <span style="color: #750e0e;">Soviet</span> Bloc, the <span style="color: #750e0e;">Soviet Republic</span> of Germany largely wins the Cold War. Key factors include the collapse of <span style="color: #001489;">European</span> Africa, the Chinese Civil War ending with an unaligned <span style="color: #960000;">socialist</span> China, and the <span style="color: #B31942;">United</span> <span style="color: #0A3161;">States</span> and <span style="color: #C8102E;">Britain</span> shifting towards isolationism.
    However, by the 1990s, economic problems worsen: inflation rises, corruption grows, and the <span style="color: #750e0e;">People’s Democracies</span> begin to decay. Dissent grows to levels even the harshest Stasi measures fail to contain.
    Amid these conditions, General Secretary Gorbachev of the <span style="color: #750e0e;">Soviet Union</span> initiates a controlled transition toward genuine <span style="color: #9B0000;">democratic socialism</span> inspired by the Chinese model. Today, Germany holds its first elections under this new system. The political spectrum is dazzling and complex, though heavily weakened and under state supervision. The quasi-capitalist <span style="color: #87CEFA;">**CNVP**</span> and <span style="color: #FFD700;">**LSV**</span> form a coalition against the <span style="color: #DC241F;">socialists</span> and are gaining momentum.
    New socialist parties emerge as the <span style="color: #DC241F;">**SED**</span> fractures between <span style="color: #700000;">hardliners</span> and <span style="color: #f0456a;">reformers</span>. Perhaps the next government will have a <span style="color: #c00000;">**SEPD**</span> majority.
  `,
  choices: [
    {
      id: "go_back",
      text: "go_back",
      nextSceneId: "go_back",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    }
  ]
};

export const _go_back: Scene = {
  id: "go_back",
  title: "Go back.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             const toolsWrapper = document.getElementById('tools_wrapper');
if (toolsWrapper) {
  toolsWrapper.style.display = 'block';
}
const elements = document.querySelectorAll('header, #content, footer');
elements.forEach(el => {
  (el as HTMLElement).style.maxWidth = '540px';
}); 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _go_back_2: Scene = {
  id: "go_back_2",
  title: "Go back.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! (state.flags['pro_republic'] < 50 && state.flags['spd_votes'] < 25 && state.flags['z_ideology'] == "Right" && state.flags['z_relation'] < 35 && state.flags['dnvp_ideology'] == "Radical"));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             const toolsWrapper = document.getElementById('tools_wrapper');
if (toolsWrapper) {
  toolsWrapper.style.display = 'block';
}
const elements = document.querySelectorAll('header, #content, footer');
elements.forEach(el => {
  (el as HTMLElement).style.maxWidth = '540px';
}); 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};
