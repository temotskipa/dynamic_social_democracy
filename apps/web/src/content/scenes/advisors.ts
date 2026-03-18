// @ts-nocheck
import { Scene, GameState } from "../../engine/types";


export const _aufhauser: Scene = {
  id: "aufhauser",
  title: "Siegfried Aufhäuser",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['aufhauser_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Siegfried Aufhäuser
    Aufhäuser is a leader of the AfA-Bund, the federation of <span style="color: #c00000;">socialist</span> white-collar trade unions.
  `,
  choices: [
    {
      id: "white_collar",
      text: "white_collar",
      nextSceneId: "white_collar",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "union_unity",
      text: "union_unity",
      nextSceneId: "union_unity",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "crisis",
      text: "crisis",
      nextSceneId: "crisis",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "moderate_economic_plan",
      text: "moderate_economic_plan",
      nextSceneId: "moderate_economic_plan",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _white_collar: Scene = {
  id: "white_collar",
  title: "Organizing white-collar workers",
  subtitle: "Improve our standing among the new middle class.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['new_middle_spd'] += 6*(1-state.flags['dissent']); 
  },

  

  render: `
    We have increased our organizing among white-collar workers.
  `,
  choices: [
    
  ]
};

export const _union_unity: Scene = {
  id: "union_unity",
  title: "Union-party coordination",
  subtitle: "Reduce dissent among the unions.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['labor_dissent'] -= 10; 
  },

  

  render: `
    We have reduced tensions with the Labor faction.
  `,
  choices: [
    
  ]
};

export const _crisis: Scene = {
  id: "crisis",
  title: "Addressing the economic crisis",
  subtitle: "Aufhäuser can help support a left-wing economic program.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _moderate_economic_plan: Scene = {
  id: "moderate_economic_plan",
  title: "Support the reformist economic plan",
  subtitle: "Aufhäuser can also support a moderate economic plan.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _baade: Scene = {
  id: "baade",
  title: "Fritz Baade",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['baade_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Fritz Baade
    Baade is one of the few agricultural experts in the <span style="color: #c00000;">**SPD**</span>, and an unorthodox economist. [? if land_reform > 0: He currently has considerable support among party factions due to the <span style="color: #c00000;">SPD</span> successfully enacting land reform. ?]
  `,
  choices: [
    {
      id: "agriculture",
      text: "agriculture",
      nextSceneId: "agriculture",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "rural_campaign",
      text: "rural_campaign",
      nextSceneId: "rural_campaign",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "depression",
      text: "depression",
      nextSceneId: "depression",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _agriculture: Scene = {
  id: "agriculture",
  title: "Agricultural Policy",
  subtitle: "Baade is the Minister of Agriculture.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['agricultural_policy_timer'] -= 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _rural_campaign: Scene = {
  id: "rural_campaign",
  title: "Rural Campaign",
  subtitle: "Try to campaign among the rural populace.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['rural_spd'] += 5*(1-state.flags['dissent']); state.flags['peoples_party_support'] += 1; 
  },

  

  render: `
    We have increased our campaigning among farmers and the rural populace.
  `,
  choices: [
    
  ]
};

export const _depression: Scene = {
  id: "depression",
  title: "Addressing the economic crisis",
  subtitle: "Formulate a plan to rescue us from the economic crisis.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['wtb_support'] += 2; state.flags['center_dissent'] += 10; state.flags['labor_strength'] += 5; state.flags['wtb_points'] += 15; 
  },

  

  render: `
    [? if not wtb_concept: Woytinsky, Tarnow, and Baade, has been working together to draft a plan for getting us out of the depression. Baade canvasses in favor of this plan throughout the party. ?][? if wtb_concept: The WTB-plan, named for its primary supporters Woytinsky, Tarnow, and Baade, has been adopted as the unions' plan for getting us out of the depression. Baade canvasses in favor of this plan throughout the party. ?]
  `,
  choices: [
    
  ]
};

export const _braun: Scene = {
  id: "braun",
  title: "Otto Braun",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['braun_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Otto Braun
    Braun [? if prussia_leader = "Braun": is ?][? if prussia_leader != "Braun" : was ?] the Minister-President of Prussia, the largest state in Germany. He is a reformist leader who seeks to work with the bourgeois parties.
  `,
  choices: [
    {
      id: "coalition",
      text: "coalition",
      nextSceneId: "coalition",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "coalition_president",
      text: "coalition_president",
      nextSceneId: "coalition_president",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "prussian_bulwark",
      text: "prussian_bulwark",
      nextSceneId: "prussian_bulwark",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "snap_election",
      text: "snap_election",
      nextSceneId: "snap_election",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _coalition: Scene = {
  id: "coalition",
  title: "Negotiating with the Coalition",
  subtitle: "Braun can improve our relationships with our centrist and center-right coalition partners in Prussia as well as in the Reichstag.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['president'] != "Braun");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['spd_in_government'] == 1 && state.flags['coalition_dissent'] > 0) { state.flags['coalition_dissent'] -= 1; }; state.flags['z_relation'] += 4; state.flags['ddp_relation'] += 4; state.flags['dvp_relation'] += 2; state.flags['lvp_relation'] += 4;if (state.flags['in_grand_coalition']) { state.flags['dvp_relation'] += 2; };if (state.flags['in_grand_coalition_prussia']) { state.flags['dvp_relation'] += 2; };if (state.flags['in_grand_coalition_prussia']) { state.flags['dvp_left'] += 1; };if (state.flags['prussia_leader'] == "Braun") { state.flags['z_relation'] += 2; };if (state.flags['prussia_leader'] == "Braun") { state.flags['ddp_relation'] += 2; };if (state.flags['prussia_leader'] == "Braun") { state.flags['lvp_relation'] += 2; }; state.flags['lvp_left'] += 0.5; state.flags['ddp_left'] += 0.25; 
  },

  

  render: `
    We have improved our relations with the [? if in_grand_coalition : [? if z_party_name != "CVP": <span style="color: #000000;">Center</span> (<span style="color: #000000;">**Zentrum**</span>)?][? if z_party_name == "CVP": <span style="color: #000000;">**Christian People's**</span> (<span style="color: #000000;">**CVP**</span>)?] Party[? if not lvp_formed:, <span style="color: #D3C24D;">**[+ ddp_name +]**</span>, and <span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed:&nbsp;and <span style="color: #FFCC00;">**LVP**</span>?], ?][? if not in_grand_coalition and not in_grand_coalition_prussia: [? if z_party_name != "CVP": <span style="color: #000000;">Center</span> (<span style="color: #000000;">**Zentrum**</span>)?][? if z_party_name == "CVP": <span style="color: #000000;">**Christian People's**</span> (<span style="color: #000000;">**CVP**</span>)?] Party[? if not lvp_formed:&nbsp;and <span style="color: #D3C24D;">**[+ ddp_name +]**</span>,?][? if lvp_formed:&nbsp;and <span style="color: #FFCC00;">**LVP**</span>,?]?][? if not in_grand_coalition and in_grand_coalition_prussia: [? if z_party_name != "CVP": <span style="color: #000000;">Center</span> (<span style="color: #000000;">**Zentrum**</span>)?][? if z_party_name == "CVP": <span style="color: #000000;">**Christian People's**</span> (<span style="color: #000000;">**CVP**</span>)?] Party[? if not lvp_formed:, <span style="color: #D3C24D;">**[+ ddp_name +]**</span>, and <span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed:&nbsp;and <span style="color: #FFCC00;">**LVP**</span>?] ?] and reduced tensions with the coalition. [? if spd_prussia and not prussia_leader = "Braun": Braun's resignation from the head of the Prussian government has hindered this ability. ?]
  `,
  choices: [
    
  ]
};

export const _coalition_president: Scene = {
  id: "coalition_president",
  title: "Negotiating with the Coalition",
  subtitle: "Braun can improve our relationships with our centrist and center-right coalition partners in the Reichstag as President.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['president'] == "Braun");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['spd_in_government'] == 1 && state.flags['coalition_dissent'] > 0) { state.flags['coalition_dissent'] -= 1; }; state.flags['z_relation'] += 6; state.flags['ddp_relation'] += 6; state.flags['dvp_relation'] += 4; state.flags['lvp_relation'] += 6;if (state.flags['in_grand_coalition']) { state.flags['dvp_relation'] += 2; };if (state.flags['in_grand_coalition_prussia']) { state.flags['dvp_relation'] += 2; };if (state.flags['in_grand_coalition_prussia']) { state.flags['dvp_left'] += 1; };if (state.flags['prussia_leader'] == "Braun") { state.flags['z_relation'] += 2; };if (state.flags['prussia_leader'] == "Braun") { state.flags['ddp_relation'] += 2; };if (state.flags['prussia_leader'] == "Braun") { state.flags['lvp_relation'] += 2; }; state.flags['lvp_left'] += 0.5; state.flags['ddp_left'] += 0.25; 
  },

  

  render: `
    We have improved our relations with the [? if in_grand_coalition : [? if z_party_name != "CVP": <span style="color: #000000;">Center</span> (<span style="color: #000000;">**Zentrum**</span>)?][? if z_party_name == "CVP": <span style="color: #000000;">**Christian People's**</span> (<span style="color: #000000;">**CVP**</span>)?] Party[? if not lvp_formed:, <span style="color: #D3C24D;">**[+ ddp_name +]**</span>, and <span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed:&nbsp;and <span style="color: #FFCC00;">**LVP**</span>?], ?][? if not in_grand_coalition and not in_grand_coalition_prussia: [? if z_party_name != "CVP": <span style="color: #000000;">Center</span> (<span style="color: #000000;">**Zentrum**</span>)?][? if z_party_name == "CVP": <span style="color: #000000;">**Christian People's**</span> (<span style="color: #000000;">**CVP**</span>)?] Party[? if not lvp_formed:&nbsp;and <span style="color: #D3C24D;">**[+ ddp_name +]**</span>,?][? if lvp_formed:&nbsp;and <span style="color: #FFCC00;">**LVP**</span>,?]?][? if not in_grand_coalition and in_grand_coalition_prussia: [? if z_party_name != "CVP": <span style="color: #000000;">Center</span> (<span style="color: #000000;">**Zentrum**</span>)?][? if z_party_name == "CVP": <span style="color: #000000;">**Christian People's**</span> (<span style="color: #000000;">**CVP**</span>)?] Party[? if not lvp_formed:, <span style="color: #D3C24D;">**[+ ddp_name +]**</span>, and <span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed:&nbsp;and <span style="color: #FFCC00;">**LVP**</span>?] ?] and reduced tensions with the coalition. [? if spd_prussia and not prussia_leader = "Braun": Braun's resignation from the head of the Prussian government has hindered this ability. ?]
  `,
  choices: [
    
  ]
};

export const _prussian_bulwark: Scene = {
  id: "prussian_bulwark",
  title: "The Prussian Bulwark",
  subtitle: "As the Minister-President of Prussia, Braun has power over the Prussian bureaucracy and security services.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['prussian_affairs_timer'] -= 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _snap_election: Scene = {
  id: "snap_election",
  title: "Snap Election",
  subtitle: "Call a snap election.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; 
  },

  

  render: `
    We have called for new elections, set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _breitscheid: Scene = {
  id: "breitscheid",
  title: "Rudolf Breitscheid",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['breitscheid_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Rudolf Breitscheid
    Breitscheid is a long-time <span style="color: #c00000;">**SPD**</span> leader, who was at one time part of the anti-war <span style="color: #D47B9B;">**USPD**</span>. He came from a working-class family, but has a doctorate degree and started his political career as a liberal.
  `,
  choices: [
    {
      id: "breitscheid_international",
      text: "breitscheid_international",
      nextSceneId: "breitscheid_international",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "breitscheid_foreign",
      text: "breitscheid_foreign",
      nextSceneId: "breitscheid_foreign",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "party_discipline",
      text: "party_discipline",
      nextSceneId: "party_discipline",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "snap_election",
      text: "snap_election",
      nextSceneId: "snap_election",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _breitscheid_international: Scene = {
  id: "breitscheid_international",
  title: "International Party Relations",
  subtitle: "Breitscheid is one of our contacts with international <span style=\"color: #c00000;\">socialist</span> parties.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['international_relations_timer'] -= 12; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _breitscheid_foreign: Scene = {
  id: "breitscheid_foreign",
  title: "Foreign Policy",
  subtitle: "As Foreign Minister, Breitscheid can set our foreign policy.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['foreign_policy_timer'] -= 8; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _party_discipline: Scene = {
  id: "party_discipline",
  title: "Party Discipline",
  subtitle: "Reduce dissent across the party.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_dissent'] -= 5; state.flags['labor_dissent'] -= 10; state.flags['center_dissent'] -= 10; state.flags['reformist_dissent'] -= 10; state.flags['neorevisionist_dissent'] -= 5; 
  },

  

  render: `
    We have enforced party discipline to reduce dissent across all factions.
  `,
  choices: [
    
  ]
};

export const _snap_election_2: Scene = {
  id: "snap_election",
  title: "Snap Election",
  subtitle: "Call a snap election.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time'] + 3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; 
  },

  

  render: `
    We have called for new elections, set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _cabinet: Scene = {
  id: "cabinet",
  title: "Cabinet",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['in_spd_majority'] || (state.flags['in_emergency_government'] && state.flags['chancellor_party'] == "SPD") || (state.flags['in_left_front'] && state.flags['chancellor_party'] == "SPD"));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['last_cabinet_action'] = 1; 
  },

  

  render: `
    = Cabinet
    With an SPD chancellor and SPD cabinet members, we can direct the affairs of the national government.
  `,
  choices: [
    {
      id: "cabinet",
      text: "cabinet",
      nextSceneId: "cabinet",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "back",
      text: "Return to main",
      nextSceneId: "back",
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

export const _back: Scene = {
  id: "back",
  title: "back",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['last_cabinet_action'] = 0; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _economic_policy_pinned: Scene = {
  id: "economic_policy_pinned",
  title: "Economic Policy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && (state.flags['economic_minister_party'] == "SPD" || state.flags['finance_minister_party'] == "SPD") && state.flags['economic_policy_timer'] <= 0 && state.flags['economic_plan'] > 0 && state.flags['black_thursday_seen']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_activities'] += 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _hilferding: Scene = {
  id: "hilferding",
  title: "Rudolf Hilferding",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['hilferding_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    #face-image: img/portraits/HilferdingRudolf.jpg
    = Rudolf Hilferding
    Hilferding is an economist and a disciple of Karl Kautsky. Originating from Vienna, Austria, he trained as a medical doctor, but later became involved in Marxist economics as a discipline. He has been the lead ideologist of our party since the Heidelberg Program of 1925.
  `,
  choices: [
    {
      id: "against_right_and_left",
      text: "against_right_and_left",
      nextSceneId: "against_right_and_left",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "toleration",
      text: "toleration",
      nextSceneId: "toleration",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "finance_ministry_",
      text: "finance_ministry_",
      nextSceneId: "finance_ministry_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "economic_democracy_",
      text: "economic_democracy_",
      nextSceneId: "economic_democracy_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _against_right_and_left: Scene = {
  id: "against_right_and_left",
  title: "Against Right and Left",
  subtitle: "As a Centrist, Hilferding seeks to steer a course between the party's factions.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 5; state.flags['advisor_action_time'] = state.flags['time']; state.flags['center_strength'] += 10; state.flags['left_strength'] -= 5; state.flags['labor_strength'] -= 5; state.flags['neorevisionist_strength'] -= 5; state.flags['center_dissent'] -= 10; 
  },

  

  render: `
    We have reduced the strength of the dissident factions in the party.
  `,
  choices: [
    
  ]
};

export const _toleration: Scene = {
  id: "toleration",
  title: "Defending Toleration",
  subtitle: "Hilferding supports cooperation with the bourgeois parties.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_dissent'] -= 10; state.flags['neorevisionist_dissent'] -= 8; state.flags['center_dissent'] -= 5; 
  },

  

  render: `
    We have reduced dissent among the anti-toleration factions.
  `,
  choices: [
    
  ]
};

export const _finance_ministry_: Scene = {
  id: "finance_ministry_",
  title: "Fiscal Policy",
  subtitle: "As Finance Minister, Hilferding can enact tax policies.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['fiscal_policy_timer'] -= 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _economic_democracy_: Scene = {
  id: "economic_democracy_",
  title: "Economic Democracy",
  subtitle: "Enact policies to build a more democratic economy.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['economic_democracy_timer'] -= 10; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _hirschfeld: Scene = {
  id: "hirschfeld",
  title: "Magnus Hirschfeld",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['hirschfeld_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Magnus Hirschfeld
    Magnus Hirschfeld is the founder of the Institut für Sexualwissenschaft and an advocate for the rights of sexual minorities. [? if homosexual_rights: He currently has considerable support among party factions due to the <span style="color: #c00000;">**SPD**</span>'s achievement in <span style="color: red;">ho</span><span style="color: orange;">m</span><span style="color: yellow;">o</span><span style="color: green;">se</span><span style="color: blue;">xu</span><span style="color: purple;">al</span> rights. ?]
  `,
  choices: [
    {
      id: "homosexual_rights_",
      text: "homosexual_rights_",
      nextSceneId: "homosexual_rights_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "womens_rights_",
      text: "womens_rights_",
      nextSceneId: "womens_rights_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "science_funding",
      text: "science_funding",
      nextSceneId: "science_funding",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _homosexual_rights_: Scene = {
  id: "homosexual_rights_",
  title: "<span style=\"color: red;\">Ho</span><span style=\"color: orange;\">m</span><span style=\"color: yellow;\">o</span><span style=\"color: green;\">se</span><span style=\"color: blue;\">xu</span><span style=\"color: purple;\">al</span> rights",
  subtitle: "Enact policy that supports <span style=\"color: red;\">ho</span><span style=\"color: orange;\">m</span><span style=\"color: yellow;\">o</span><span style=\"color: green;\">se</span><span style=\"color: blue;\">xu</span><span style=\"color: purple;\">al</span> rights.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['homosexual_rights_timer'] -= 11; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _womens_rights_: Scene = {
  id: "womens_rights_",
  title: "Women's rights",
  subtitle: "Enact policy with regards to women's rights.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['womens_rights_timer'] -= 10; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _science_funding: Scene = {
  id: "science_funding",
  title: "Science funding",
  subtitle: "Increase funding for scientific research.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _juchacz: Scene = {
  id: "juchacz",
  title: "Marie Juchacz",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['juchacz_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Marie Juchacz
    Juchacz is the founder of the Worker's Welfare, our mutual aid organization; her experiences as a single mother in poverty led her to <span style="color: #c00000;">socialism</span>. She is the most senior woman among the <span style="color: #c00000;">**SPD**</span> leadership, who is often treated as the "go-to" when the predominantly male leadership sought out womens' voices.
  `,
  choices: [
    {
      id: "emergency_fundraising",
      text: "emergency_fundraising",
      nextSceneId: "emergency_fundraising",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "welfare",
      text: "welfare",
      nextSceneId: "welfare",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "organizing_women",
      text: "organizing_women",
      nextSceneId: "organizing_women",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _emergency_fundraising: Scene = {
  id: "emergency_fundraising",
  title: "Emergency Fundraising",
  subtitle: "An emergency infusion of resources.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['difficulty'] < 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['emergency_used'] += 1; state.flags['resources'] += 2;if (state.flags['emergency_used'] > 1) { state.flags['workers_spd'] -= 2; };if (state.flags['emergency_used'] > 1) { state.flags['labor_dissent'] += 5; };if (state.flags['emergency_used'] > 1) { state.flags['unemployed_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['workers_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['unemployed_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['labor_dissent'] += 5; };if (state.flags['emergency_used'] > 2) { state.flags['labor_dissent'] += 5; } 
  },

  

  render: `
    [? if emergency_used <= 1: Juchacz has leveraged her position to pull in donations and arrange quick loans. ?][? if emergency_used > 1 and emergency_used < 3: Discontent is brewing among the <span style="color: #c00000;">**SPD**</span>'s rank and file due to our persistent attempts at begging for money. ?][? if emergency_used > 2: We’re really scraping the barrel now—committed members are pressured into selling their valuables, while many others leave in frustration. ?]
    We have gained +2 resources.
  `,
  choices: [
    
  ]
};

export const _welfare: Scene = {
  id: "welfare",
  title: "Support Workers' Welfare, our mutual aid organization.",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['workers_aid'] += 1; state.flags['unemployed_spd'] += 5*(1 - state.flags['dissent']); state.flags['workers_spd'] += 3*(1-state.flags['dissent']);if (state.flags['black_thursday_seen']) { state.flags['workers_spd'] += 2*(1-state.flags['dissent']); }; state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    We have increased funding to Workers' Welfare. [? if black_thursday_seen > 0 : In an age of economic crisis, this will be helpful for improving our standing among the unemployed. ?]
  `,
  choices: [
    
  ]
};

export const _organizing_women: Scene = {
  id: "organizing_women",
  title: "Organizing women",
  subtitle: "Juchacz's strategies are aimed at more \"traditional\" women.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['womens_rights'] += 1; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['rural_spd'] += 3*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    Juchacz's strategies for organizing women are aimed at working-class housewives, and acknowledge women's traditional household roles. We argue that our economic welfare programs will improve the livelihoods of women and their families.
    [? if spd_r < 50 : Unfortunately, women still disproportionately support the bourgeois parties. ?]
  `,
  choices: [
    
  ]
};

export const _leber: Scene = {
  id: "leber",
  title: "Julius Leber",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['leber_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Julius Leber
    Leber is a former army officer who turned against the military leaders of the Kapp Putsch in 1920, helping us put down the army's attempted coup. He is in favor of expanded democracy and building a broad popular base for the <span style="color: #c00000;">**SPD**</span>.
  `,
  choices: [
    {
      id: "democratic_rally",
      text: "democratic_rally",
      nextSceneId: "democratic_rally",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "military_affairs",
      text: "military_affairs",
      nextSceneId: "military_affairs",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_peoples_party",
      text: "support_peoples_party",
      nextSceneId: "support_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "build_peoples_party",
      text: "build_peoples_party",
      nextSceneId: "build_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaigning_peoples_party",
      text: "campaigning_peoples_party",
      nextSceneId: "campaigning_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _democratic_rally: Scene = {
  id: "democratic_rally",
  title: "Rally for democracy",
  subtitle: "Rally our party and the German people to defend democracy and freedom.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['pro_republic'] += 5; state.flags['democratization'] += 1; state.flags['neorevisionist_strength'] += 5; state.flags['reformist_strength'] += 3;if (state.flags['democratization'] >= 4) { state.flags['workers_spd'] += 4*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 4) { state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); } 
  },

  

  render: `
    Leber helps us to rally the people in defense of democracy.
  `,
  choices: [
    
  ]
};

export const _military_affairs: Scene = {
  id: "military_affairs",
  title: "Military affairs",
  subtitle: "We can set our military policy.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _support_peoples_party: Scene = {
  id: "support_peoples_party",
  title: "Build support for a People's Party",
  subtitle: "Can we expand our party beyond the industrial working class?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['peoples_party_support'] += 1; 
  },

  

  render: `
    We are building up support for the idea of a People's Party.
  `,
  choices: [
    
  ]
};

export const _build_peoples_party: Scene = {
  id: "build_peoples_party",
  title: "Building a People's Party",
  subtitle: "Can we expand our party beyond the industrial working class?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _campaigning_peoples_party: Scene = {
  id: "campaigning_peoples_party",
  title: "Campaigning as a People's Party",
  subtitle: "Campaigning with some of our previously nontraditional demographics.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _leipart: Scene = {
  id: "leipart",
  title: "Theodor Leipart",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['leipart_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Theodor Leipart
    Leipart is a leader of the ADGB, the largest federation of <span style="color: #c00000;">socialist</span> trade unions.
    # leipart was one of the people who argued for union independence
    #- @union_unity
  `,
  choices: [
    {
      id: "organizing",
      text: "organizing",
      nextSceneId: "organizing",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "depression",
      text: "depression",
      nextSceneId: "depression",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "schleicher",
      text: "schleicher",
      nextSceneId: "schleicher",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _organizing: Scene = {
  id: "organizing",
  title: "Organizing workers",
  subtitle: "Improve our standing among the workers.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['workers_spd'] += 4*(1-state.flags['dissent']);if (state.flags['wtb_adopted'] == 1) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); }; state.flags['labor_strength'] += 2; 
  },

  

  render: `
    We have increased our organizing among the workers.
  `,
  choices: [
    
  ]
};

export const _depression_2: Scene = {
  id: "depression",
  title: "Addressing the economic crisis",
  subtitle: "Formulate a plan to get us out of this mess.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['wtb_support'] += 2; state.flags['center_dissent'] += 10; state.flags['labor_strength'] += 5; state.flags['wtb_points'] += 15; 
  },

  

  render: `
    [? if not wtb_concept: Woytinsky, Tarnow, and Baade, has been working together to draft a plan for getting us out of the depression. Leipart canvasses in favor of this policy throughout the party and the unions. ?][? if wtb_concept: The WTB-plan, named for its primary supporters Woytinsky, Tarnow, and Baade, has been adopted as the unions' plan for getting us out of the depression. Leipart canvasses in favor of this policy throughout the party and the unions. ?]
  `,
  choices: [
    
  ]
};

export const _schleicher: Scene = {
  id: "schleicher",
  title: "Negotiating with the Red General",
  subtitle: "Leipart will attempt to convince the <span style=\"color: #c00000;\">**SPD**</span> to support Schleicher.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['red_general_unlock'] && state.flags['rubicon']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (! state.flags['schleicher_spd_adopted']) { state.flags['red_general_timer'] -= 4; };if (state.flags['schleicher_spd_adopted']) { state.flags['red_general_timer'] -= 6; }; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _union_unity_2: Scene = {
  id: "union_unity",
  title: "Union-party coordination",
  subtitle: "Reduce dissent among the unions.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['labor_dissent'] -= 5; state.flags['labor_strength'] += 5; 
  },

  

  render: `
    We have reduced tensions with the Labor faction, and increased its strength in the party.
  `,
  choices: [
    
  ]
};

export const _levi: Scene = {
  id: "levi",
  title: "Paul Levi",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['levi_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Paul Levi
    Levi is a former leader of the <span style="color: #700000;">**KPD**</span> who left over their devotion to violence and revolutionary adventurism.
  `,
  choices: [
    {
      id: "building_the_left",
      text: "building_the_left",
      nextSceneId: "building_the_left",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "kpd_cooperation",
      text: "kpd_cooperation",
      nextSceneId: "kpd_cooperation",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _building_the_left: Scene = {
  id: "building_the_left",
  title: "Building the Left",
  subtitle: "Push the <span style=\"color: #c00000;\">**SPD**</span> to the left.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_strength'] += 10; state.flags['left_dissent'] -= 8; state.flags['reformist_dissent'] += 3; 
  },

  

  render: `
    We have increased the strength of the left faction with the <span style="color: #c00000;">**SPD**</span>. This raised concern among the moderate reformists in the party.
  `,
  choices: [
    
  ]
};

export const _kpd_cooperation: Scene = {
  id: "kpd_cooperation",
  title: "Cooperation with the <span style=\"color: #700000;\">**KPD**</span>",
  subtitle: "Any cooperation between the parties requires compromise from the <span style=\"color: #700000;\">**KPD**</span> as well as the <span style=\"color: #c00000;\">**SPD**</span>.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_strength'] += 5; state.flags['kpd_relation'] += 6*(1-state.flags['dissent']); state.flags['reformist_dissent'] += 3;if (state.flags['kpd_cooperation_seen'] <= 1) { state.flags['communist_coalition'] += 1; }; state.flags['kpd_cooperation_seen'] += 1; 
  },

  

  render: `
    Levi attempts to reach out to his former colleagues to dissuade the <span style="color: #700000;">**KPD**</span> from their current extreme <span style="color: #8B0000;">Stalinist</span> path. Some concessions are extracted.
  `,
  choices: [
    
  ]
};

export const _mierendorff: Scene = {
  id: "mierendorff",
  title: "Carlo Mierendorff",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['mierendorff_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    #face-image: img/portraits/MierendorffCarlo.jpg
    = Carlo Mierendorff
    Carlo Mierendorff is the founder of the neo-revisionist ideological tendency, and supports both democratic reforms and extra-parliamentary action to combat the <span style="color: #7A3C00;">Nazis</span> and <span style="color: #808080;">authoritarian</span> parties. He is from a middle-class, academic background, and is one of our youngest leaders.
  `,
  choices: [
    {
      id: "iron_front_buildup",
      text: "iron_front_buildup",
      nextSceneId: "iron_front_buildup",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "form_iron_front",
      text: "form_iron_front",
      nextSceneId: "form_iron_front",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nazi_urgency",
      text: "nazi_urgency",
      nextSceneId: "nazi_urgency",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _iron_front_buildup: Scene = {
  id: "iron_front_buildup",
  title: "Build up the <span style=\"color: #c00000;\">Iron</span> <span style=\"color: #1A1A1A;\">Front</span>",
  subtitle: "Increase our propaganda measures to recruit more members into the Reichsbanner. ",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['rb_strength'] += 200*(state.flags['workers_spd_normalized'] / 100); 
  },

  

  render: `
    We have recruited more members into the Reichsbanner.
  `,
  choices: [
    
  ]
};

export const _form_iron_front: Scene = {
  id: "form_iron_front",
  title: "Forming the <span style=\"color: #c00000;\">Iron</span> <span style=\"color: #1A1A1A;\">Front</span>",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['rb_strength'] += 50; state.flags['nazi_urgency'] += 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _nazi_urgency: Scene = {
  id: "nazi_urgency",
  title: "Warning about the <span style=\"color: #7A3C00;\">Nazis</span>",
  subtitle: "By warning the party about the <span style=\"color: #7A3C00;\">Nazis</span>, we can spur our members to action.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['nazi_urgency'] += 1;if (! state.flags['rb_explode']) { state.flags['rb_militancy'] += 0.01; }; state.flags['nsdap_workers'] -= 4*(1-state.flags['dissent']); 
  },

  

  render: `
    We have begun a propaganda campaign to warn our members away from the <span style="color: #7A3C00;">Nazis</span>.
  `,
  choices: [
    
  ]
};

export const _muller: Scene = {
  id: "muller",
  title: "Hermann Müller",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['muller_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Hermann Müller
    Müller is a former [? if chancellor = "Müller": and current ?] Chancellor, and is a long-time <span style="color: #c00000;">**Social Democratic**</span> leader.
  `,
  choices: [
    {
      id: "coalition",
      text: "coalition",
      nextSceneId: "coalition",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "toleration",
      text: "toleration",
      nextSceneId: "toleration",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "snap_election",
      text: "snap_election",
      nextSceneId: "snap_election",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _coalition_2: Scene = {
  id: "coalition",
  title: "Negotiating with the Coalition",
  subtitle: "Müller can improve our relationships with our coalition partners.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['spd_in_government'] == 1 && state.flags['coalition_dissent'] > 0) { state.flags['coalition_dissent'] -= 1; }; state.flags['z_relation'] += 4; state.flags['ddp_relation'] += 4; state.flags['dvp_relation'] += 2;if (state.flags['in_grand_coalition']) { state.flags['dvp_relation'] += 2; }; state.flags['lvp_relation'] += 4;if (state.flags['in_grand_coalition']) { state.flags['dvp_left'] += 0.5; }; state.flags['lvp_left'] += 0.5; state.flags['ddp_left'] += 0.25; 
  },

  

  render: `
    We have improved our relations with the [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?][? if not lvp_formed:, <span style="color: #D3C24D;">**[+ ddp_name +]**</span>[? if dvp_exist:, and <span style="color: #C0A054;">**DVP**</span>?]?][? if lvp_formed:&nbsp;and <span style="color: #FFCC00;">**LVP**</span>?], and reduced tensions with the coalition.
  `,
  choices: [
    
  ]
};

export const _toleration_2: Scene = {
  id: "toleration",
  title: "Defending Toleration",
  subtitle: "Müller supports the toleration arrangement with the bourgeois parties.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_dissent'] -= 8; state.flags['neorevisionist_dissent'] -= 8; state.flags['center_dissent'] -= 5; 
  },

  

  render: `
    We have reduced dissent among the anti-toleration factions. 
  `,
  choices: [
    
  ]
};

export const _snap_election_3: Scene = {
  id: "snap_election",
  title: "Snap Election",
  subtitle: "Call a snap election.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; 
  },

  

  render: `
    We have called for new elections, set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _pfulf: Scene = {
  id: "pfulf",
  title: "Antonie Pfülf",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['pfulf_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Antonie Pfülf
    Pfülf is a former teacher from <span style="color: #00CCFF;">Bavaria</span> who came from a conservative Catholic family. She is an activist for women's rights and for broadening the support of the <span style="color: #c00000;">**SPD**</span>. 
  `,
  choices: [
    {
      id: "support_peoples_party",
      text: "support_peoples_party",
      nextSceneId: "support_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "build_peoples_party",
      text: "build_peoples_party",
      nextSceneId: "build_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaigning_peoples_party",
      text: "campaigning_peoples_party",
      nextSceneId: "campaigning_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "womens_rights_",
      text: "womens_rights_",
      nextSceneId: "womens_rights_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _support_peoples_party_2: Scene = {
  id: "support_peoples_party",
  title: "Build support for a People's Party",
  subtitle: "Can we expand our party beyond the industrial working class?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['peoples_party_support'] += 1; state.flags['reformist_strength'] += 5; 
  },

  

  render: `
    We are building up support for the idea of a People's Party.
  `,
  choices: [
    
  ]
};

export const _build_peoples_party_2: Scene = {
  id: "build_peoples_party",
  title: "Building a People's Party",
  subtitle: "Can we expand our party beyond the industrial working class?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _campaigning_peoples_party_2: Scene = {
  id: "campaigning_peoples_party",
  title: "Campaigning as a People's Party",
  subtitle: "Campaigning with some of our previously nontraditional demographics.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _womens_rights__2: Scene = {
  id: "womens_rights_",
  title: "Women's rights",
  subtitle: "Enact policy with regards to women's rights.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['womens_rights_timer'] -= 10; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _radbruch: Scene = {
  id: "radbruch",
  title: "Gustav Radbruch",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['radbruch_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Gustav Radbruch
    Gustav Radbruch is a renowned legal scholar and long-time <span style="color: #c00000;">**SPD**</span> justice minister. [? if judicial_reform >= 2: He currently has considerable support among party factions due to the <span style="color: #c00000;">SPD</span>'s success in judicial reforms. ?]
  `,
  choices: [
    {
      id: "judiciary_major",
      text: "judiciary_major",
      nextSceneId: "judiciary_major",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "judiciary_minor",
      text: "judiciary_minor",
      nextSceneId: "judiciary_minor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "constitutional_reform_",
      text: "constitutional_reform_",
      nextSceneId: "constitutional_reform_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _judiciary_major: Scene = {
  id: "judiciary_major",
  title: "Enact major judicial reforms.",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _judiciary_minor: Scene = {
  id: "judiciary_minor",
  title: "Enact minor judicial reforms.",
  subtitle: "Gradually remove corrupt and biased jurists.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _constitutional_reform_: Scene = {
  id: "constitutional_reform_",
  title: "Constitutional Reform",
  subtitle: "Pursue reforms of the inadequate <span style=\"color: #000000;\">We</span><span style=\"color: #DD0000;\">im</span><span style=\"color: #FFCC00;\">ar</span> Constitution.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['last_advisor_action'] = 1; state.flags['constitutional_reform_timer'] -= 12; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _rosenfeld: Scene = {
  id: "rosenfeld",
  title: "Kurt Rosenfeld",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rosenfeld_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Kurt Rosenfeld
    Rosenfeld works as a lawyer in Berlin who defends left-wing individuals and causes. He favors cooperation with the <span style="color: #700000;">**KPD**</span> and a path of class struggle for the <span style="color: #c00000;">**SPD**</span>.
  `,
  choices: [
    {
      id: "building_the_left",
      text: "building_the_left",
      nextSceneId: "building_the_left",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "kpd_cooperation",
      text: "kpd_cooperation",
      nextSceneId: "kpd_cooperation",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "prussian_bulwark",
      text: "prussian_bulwark",
      nextSceneId: "prussian_bulwark",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "against_toleration",
      text: "against_toleration",
      nextSceneId: "against_toleration",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "snap_election",
      text: "snap_election",
      nextSceneId: "snap_election",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _building_the_left_2: Scene = {
  id: "building_the_left",
  title: "Building the Left",
  subtitle: "Push the <span style=\"color: #c00000;\">**SPD**</span> to the left.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_strength'] += 6; state.flags['left_dissent'] -= 8; state.flags['reformist_dissent'] += 2; 
  },

  

  render: `
    We have increased the strength of the left faction with the <span style="color: #c00000;">**SPD**</span>.
  `,
  choices: [
    
  ]
};

export const _kpd_cooperation_2: Scene = {
  id: "kpd_cooperation",
  title: "Cooperation with the <span style=\"color: #700000;\">**KPD**</span>",
  subtitle: "Push the party to be more friendly towards the <span style=\"color: #700000;\">**KPD**</span>.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_strength'] += 5; state.flags['kpd_relation'] += 4*(1-state.flags['dissent']); state.flags['reformist_dissent'] += 2;if (state.flags['kpd_cooperation_seen'] <= 1) { state.flags['communist_coalition'] += 1; }; state.flags['kpd_cooperation_seen'] += 1; 
  },

  

  render: `
    Through his work, Rosenfeld has defended individual <span style="color: #700000;">**KPD**</span> members; this should make some connections possible.
  `,
  choices: [
    
  ]
};

export const _prussian_bulwark_2: Scene = {
  id: "prussian_bulwark",
  title: "The Prussian Bulwark",
  subtitle: "As the Minister-President of Prussia, Rosenfeld has power over the Prussian bureaucracy and security services.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['prussian_affairs_timer'] -= 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _against_toleration: Scene = {
  id: "against_toleration",
  title: "Against toleration",
  subtitle: "Break our current toleration arrangement, and bring down the government via a no-confidence vote.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['constructive_vonc']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time'] + 3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time'] + 3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; state.flags['spd_toleration'] = 0; state.flags['spd_toleration_right'] = 0; state.flags['left_strength'] += 8; state.flags['pro_republic'] -= 4; state.flags['new_middle_spd'] -= 3; state.flags['rural_spd'] -= 3; state.flags['old_middle_spd'] -= 3; state.flags['catholics_spd'] -= 3; state.flags['reformist_dissent'] += 8; state.flags['left_dissent'] -= 5; state.flags['dvp_relation'] -= 4; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['ddp_right'] += 1; state.flags['dvp_right'] += 2; state.flags['spd_break_toleration'] += 1; 
  },

  

  render: `
    We have grown tired of the burdens of toleration, and have called a vote of no confidence in the current minority government.
    New elections have been set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _new_prussia_election: Scene = {
  id: "new_prussia_election",
  title: "new_prussia_election",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['kpd_relation'] += 5; state.flags['dvp_right'] += 3; state.flags['ddp_right'] += 2; state.flags['lvp_right'] += 2; state.flags['pro_republic'] -= 3; state.flags['new_middle_spd'] -= 2; state.flags['rural_spd'] -= 2; state.flags['old_middle_spd'] -= 2; state.flags['catholics_spd'] -= 2; state.flags['new_middle_nsdap'] += 2; state.flags['old_middle_nsdap'] += 2; state.flags['rural_nsdap'] += 2; state.flags['catholics_nsdap'] += 2; state.flags['in_right_coalition_prussia'] = 0; state.flags['in_social_catholic_coalition_prussia'] = 0; state.flags['in_weimar_coalition_prussia'] = 0; state.flags['in_grand_coalition_prussia'] = 0; state.flags['in_minority_grand_coalition_prussia'] = 0; state.flags['in_popular_front_prussia'] = 0; state.flags['in_left_front_prussia'] = 0; state.flags['in_spd_majority_prussia'] = 0; state.flags['in_center_right_coalition_prussia'] = 0; state.flags['in_far_right_coalition_prussia'] = 0; state.flags['in_minority_weimar_coalition_prussia'] = 0; state.flags['spd_prussia'] = 0; state.flags['right_prussia'] = 0; state.flags['ddp_in_popular_front_prussia'] = 0; state.flags['kpd_goals_seen_prussia'] = 0; state.flags['spd_toleration_prussia'] = 0; state.flags['prussia_coalition_trigger'] = 0; 
  },

  

  render: `
    The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] has called a retaliatory vote in Prussia, forcing the dissolution of the Landtag for new elections.
    New Prussian elections have been set for [+ next_election_month_prussia : month +] [+ next_election_year_prussia +].
    A double dissolution has shaken the people's faith in democracy, with the <span style="color: #7A3C00;">Nazis</span> exploiting the instability to claim that democracy is unworkable, and that Germany needs a strong leader.
  `,
  choices: [
    
  ]
};

export const _center_right_coalition_prussia: Scene = {
  id: "center_right_coalition_prussia",
  title: "center_right_coalition_prussia",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['in_center_right_coalition_prussia'] = 1; state.flags['in_right_coalition_prussia'] = 0; state.flags['in_weimar_coalition_prussia'] = 0; state.flags['in_grand_coalition_prussia'] = 0; state.flags['in_minority_grand_coalition_prussia'] = 0; state.flags['in_popular_front_prussia'] = 0; state.flags['in_left_front_prussia'] = 0; state.flags['in_spd_majority_prussia'] = 0; state.flags['in_far_right_coalition_prussia'] = 0; state.flags['in_minority_weimar_coalition_prussia'] = 0; state.flags['spd_prussia'] = 0; state.flags['right_prussia'] = 0; state.flags['ddp_in_popular_front_prussia'] = 0; state.flags['kpd_goals_seen_prussia'] = 0; state.flags['spd_toleration_prussia'] = 0; state.flags['prussia_coalition_trigger'] = 0; state.flags['prussia_leader'] = "Stegerwald";if (state.flags['z_leader'] == "Stegerwald") { state.flags['prussia_leader'] = "Brüning"; }; state.flags['new_middle_spd'] -= 3; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['dvp_right'] += 3; state.flags['ddp_right'] += 2; state.flags['pro_republic'] -= 3; state.flags['prussian_police_loyalty'] -= 0.06; state.flags['prussian_police_strength'] -= 8; 
  },

  

  render: `
    The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] has called a retaliatory no confidence vote in Prussia, replacing our government with a center-right coalition composed of all parties to our right, except for the <span style="color: #003755;">**DNF**</span> and <span style="color: #7A3C00;">**NSDAP**</span>. While this is a setback, it is not the worst possible outcome, as new elections could have led to significant gains for extremist parties.
    [? if z_leader != "Stegerwald": Adam Stegerwald?][? if z_leader == "Stegerwald": Heinrich Brüning?] of the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] is selected to be the Minister-President of Prussia.
  `,
  choices: [
    
  ]
};

export const _snap_election_4: Scene = {
  id: "snap_election",
  title: "Snap Election",
  subtitle: "Call a snap election.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; 
  },

  

  render: `
    We have called for new elections, set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _schumacher: Scene = {
  id: "schumacher",
  title: "Kurt Schumacher",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['schumacher_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Kurt Schumacher
    A Great War veteran and a neorevisionist leader, Kurt Schumacher argues for a strong resistance against the <span style="color: #7A3C00;">Nazis</span>.
  `,
  choices: [
    {
      id: "emergency_fundraising",
      text: "emergency_fundraising",
      nextSceneId: "emergency_fundraising",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "build_reichsbanner",
      text: "build_reichsbanner",
      nextSceneId: "build_reichsbanner",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "moderate_economic_plan",
      text: "moderate_economic_plan",
      nextSceneId: "moderate_economic_plan",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _emergency_fundraising_2: Scene = {
  id: "emergency_fundraising",
  title: "Emergency Fundraising",
  subtitle: "An emergency infusion of resources.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['emergency_used'] += 1; state.flags['resources'] += 2;if (state.flags['emergency_used'] > 1) { state.flags['workers_spd'] -= 2; };if (state.flags['emergency_used'] > 1) { state.flags['labor_dissent'] += 5; };if (state.flags['emergency_used'] > 1) { state.flags['unemployed_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['workers_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['unemployed_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['labor_dissent'] += 5; };if (state.flags['emergency_used'] > 2) { state.flags['labor_dissent'] += 5; } 
  },

  

  render: `
    [? if emergency_used <= 1: Schumacher has leveraged his position to pull in donations and arrange quick loans. ?][? if emergency_used > 1 and emergency_used < 3: Discontent is brewing among the <span style="color: #c00000;">**SPD**</span>'s rank and file due to our persistent attempts at begging for money. ?][? if emergency_used > 2: We’re really scraping the barrel now—committed members are pressured into selling their valuables, while many others leave in frustration. ?]
    We have gained +2 resources.
  `,
  choices: [
    
  ]
};

export const _build_reichsbanner: Scene = {
  id: "build_reichsbanner",
  title: "Reichsbanner",
  subtitle: "Schumacher supports providing more resources to the Reichsbanner.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['reichsbanner_timer'] -= 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _moderate_economic_plan_2: Scene = {
  id: "moderate_economic_plan",
  title: "Support the reformist economic plan",
  subtitle: "Call for a limited program of job creation without deficit spending.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _sender: Scene = {
  id: "sender",
  title: "Toni Sender",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sender_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Toni Sender
    Toni Sender is an organizer and writer who came from a bourgeois family, but was radicalized into <span style="color: #c00000;">socialism</span> after her experiences in the workforce. She was a member of the anti-war <span style="color: #D47B9B;">**USPD**</span>, but did not support armed revolution.
  `,
  choices: [
    {
      id: "left_unity",
      text: "left_unity",
      nextSceneId: "left_unity",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "organizing_women",
      text: "organizing_women",
      nextSceneId: "organizing_women",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "against_toleration",
      text: "against_toleration",
      nextSceneId: "against_toleration",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "crisis",
      text: "crisis",
      nextSceneId: "crisis",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _left_unity: Scene = {
  id: "left_unity",
  title: "Left-Center Unity",
  subtitle: "Encourage cooperation between the left and center wings of the party.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_dissent'] -= 10; state.flags['labor_dissent'] -= 5; state.flags['center_dissent'] -= 10; state.flags['reformist_dissent'] -= 10; state.flags['neorevisionist_dissent'] -= 5; 
  },

  

  render: `
    We have reduced dissent among the party's factions.
  `,
  choices: [
    
  ]
};

export const _organizing_women_2: Scene = {
  id: "organizing_women",
  title: "Organizing women",
  subtitle: "Sender's strategies are aimed at young working women.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['womens_rights'] += 1; state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    Sender's message is popular among young women working in the service sector, and we have recruited many white-collar employees.
    [? if spd_r < 50 : Unfortunately, women still disproportionately support the bourgeois parties. ?]
  `,
  choices: [
    
  ]
};

export const _against_toleration_2: Scene = {
  id: "against_toleration",
  title: "Against toleration",
  subtitle: "Break our current toleration arrangement, and bring down the government via a no-confidence vote.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['constructive_vonc']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time'] + 3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time'] + 3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; state.flags['spd_toleration'] = 0; state.flags['spd_toleration_right'] = 0; state.flags['left_strength'] += 8; state.flags['pro_republic'] -= 4; state.flags['new_middle_spd'] -= 3; state.flags['rural_spd'] -= 3; state.flags['old_middle_spd'] -= 3; state.flags['catholics_spd'] -= 3; state.flags['reformist_dissent'] += 8; state.flags['left_dissent'] -= 5; state.flags['dvp_relation'] -= 4; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['ddp_right'] += 1; state.flags['dvp_right'] += 2; state.flags['spd_break_toleration'] += 1; 
  },

  

  render: `
    We have grown tired of the burdens of toleration, and have called a vote of no confidence in the current minority government.
    New elections have been set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _new_prussia_election_2: Scene = {
  id: "new_prussia_election",
  title: "new_prussia_election",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['kpd_relation'] += 5; state.flags['dvp_right'] += 3; state.flags['ddp_right'] += 2; state.flags['lvp_right'] += 2; state.flags['pro_republic'] -= 3; state.flags['new_middle_spd'] -= 2; state.flags['rural_spd'] -= 2; state.flags['old_middle_spd'] -= 2; state.flags['catholics_spd'] -= 2; state.flags['new_middle_nsdap'] += 2; state.flags['old_middle_nsdap'] += 2; state.flags['rural_nsdap'] += 2; state.flags['catholics_nsdap'] += 2; state.flags['in_right_coalition_prussia'] = 0; state.flags['in_social_catholic_coalition_prussia'] = 0; state.flags['in_weimar_coalition_prussia'] = 0; state.flags['in_grand_coalition_prussia'] = 0; state.flags['in_minority_grand_coalition_prussia'] = 0; state.flags['in_popular_front_prussia'] = 0; state.flags['in_left_front_prussia'] = 0; state.flags['in_spd_majority_prussia'] = 0; state.flags['in_center_right_coalition_prussia'] = 0; state.flags['in_far_right_coalition_prussia'] = 0; state.flags['in_minority_weimar_coalition_prussia'] = 0; state.flags['spd_prussia'] = 0; state.flags['right_prussia'] = 0; state.flags['ddp_in_popular_front_prussia'] = 0; state.flags['kpd_goals_seen_prussia'] = 0; state.flags['spd_toleration_prussia'] = 0; state.flags['prussia_coalition_trigger'] = 0; 
  },

  

  render: `
    The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] has called a retaliatory vote in Prussia, forcing the dissolution of the Landtag for new elections.
    New Prussian elections have been set for [+ next_election_month_prussia : month +] [+ next_election_year_prussia +].
    A double dissolution has shaken the people's faith in democracy, with the <span style="color: #7A3C00;">Nazis</span> exploiting the instability to claim that democracy is unworkable, and that Germany needs a strong leader.
  `,
  choices: [
    
  ]
};

export const _center_right_coalition_prussia_2: Scene = {
  id: "center_right_coalition_prussia",
  title: "center_right_coalition_prussia",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['in_center_right_coalition_prussia'] = 1; state.flags['in_right_coalition_prussia'] = 0; state.flags['in_weimar_coalition_prussia'] = 0; state.flags['in_grand_coalition_prussia'] = 0; state.flags['in_minority_grand_coalition_prussia'] = 0; state.flags['in_popular_front_prussia'] = 0; state.flags['in_left_front_prussia'] = 0; state.flags['in_spd_majority_prussia'] = 0; state.flags['in_far_right_coalition_prussia'] = 0; state.flags['in_minority_weimar_coalition_prussia'] = 0; state.flags['spd_prussia'] = 0; state.flags['right_prussia'] = 0; state.flags['ddp_in_popular_front_prussia'] = 0; state.flags['kpd_goals_seen_prussia'] = 0; state.flags['spd_toleration_prussia'] = 0; state.flags['prussia_coalition_trigger'] = 0; state.flags['prussia_leader'] = "Stegerwald";if (state.flags['z_leader'] == "Stegerwald") { state.flags['prussia_leader'] = "Brüning"; }; state.flags['new_middle_spd'] -= 3; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['dvp_right'] += 3; state.flags['ddp_right'] += 2; state.flags['pro_republic'] -= 3; state.flags['prussian_police_loyalty'] -= 0.06; state.flags['prussian_police_strength'] -= 8; 
  },

  

  render: `
    The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] has called a retaliatory no confidence vote in Prussia, replacing our government with a center-right coalition composed of all parties to our right, except for the <span style="color: #003755;">**DNF**</span> and <span style="color: #7A3C00;">**NSDAP**</span>. While this is a setback, it is not the worst possible outcome, as new elections could have led to significant gains for extremist parties.
    [? if z_leader != "Stegerwald": Adam Stegerwald?][? if z_leader == "Stegerwald": Heinrich Brüning?] of the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] is selected to be the Minister-President of Prussia.
  `,
  choices: [
    
  ]
};

export const _crisis_2: Scene = {
  id: "crisis",
  title: "Addressing the economic crisis",
  subtitle: "Sender can help support a left-wing economic program.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _severing: Scene = {
  id: "severing",
  title: "Carl Severing",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['severing_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Carl Severing
    Severing has been Interior Minister for both the German Republic and for the state of Prussia, and his priority is using the security services to target the enemies of the republic.
  `,
  choices: [
    {
      id: "prussian_bulwark",
      text: "prussian_bulwark",
      nextSceneId: "prussian_bulwark",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "police_affairs",
      text: "police_affairs",
      nextSceneId: "police_affairs",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _prussian_bulwark_3: Scene = {
  id: "prussian_bulwark",
  title: "Prussian Bulwark",
  subtitle: "Severing has influence over Prussian politics.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['prussian_affairs_timer'] -= 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _police_affairs: Scene = {
  id: "police_affairs",
  title: "Police affairs ",
  subtitle: "We can set our police policy. ",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['police_timer'] -= 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _seydewitz: Scene = {
  id: "seydewitz",
  title: "Max Seydewitz",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['seydewitz_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Max Seydewitz
    Max Seydewitz is a former leader of the youth wing, current supporter of the left wing of the <span style="color: #c00000;">**SPD**</span>, and advocates for class struggle.
  `,
  choices: [
    {
      id: "class_struggle",
      text: "class_struggle",
      nextSceneId: "class_struggle",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "socialist_youth",
      text: "socialist_youth",
      nextSceneId: "socialist_youth",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "against_toleration",
      text: "against_toleration",
      nextSceneId: "against_toleration",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _class_struggle: Scene = {
  id: "class_struggle",
  title: "Rally for class struggle",
  subtitle: "The core of <span style=\"color: #c00000;\">socialism</span> should be the struggle of the proletariat against the bourgeoisie.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']);if (state.flags['nationalization_progress'] > 0) { state.flags['workers_spd'] += 4*(1-state.flags['dissent']); };if (state.flags['nationalization_progress'] > 0) { state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); }; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 5; state.flags['old_middle_spd'] -= 3; state.flags['new_middle_spd'] -= 2; state.flags['dvp_relation'] -= 3; state.flags['dvp_right'] += 1; state.flags['lvp_relation'] -= 3; state.flags['lvp_right'] += 1; 
  },

  

  render: `
    Our message of class struggle appeals to the left wing of the working class, while potentially alienating the middle class. [? if nationalization_progress > 0 : Our achievements in nationalization have assisted our messaging. ?]
  `,
  choices: [
    
  ]
};

export const _socialist_youth: Scene = {
  id: "socialist_youth",
  title: "Support the <span style=\"color: #c00000;\">Socialist</span> Youth",
  subtitle: "We must end our reputation as a party for old men by increasing funding to the youth organizations. -1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['rb_explode']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['resources'] -= 1; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 3; state.flags['rb_strength'] += 50; state.flags['rb_militancy'] += 0.025; state.flags['workers_spd'] += 2*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 1; state.flags['radicalization'] += 1; 
  },

  

  render: `
    Seydewitz supports building up the <span style="color: #c00000;">Socialist</span> Youth, which attracts support to the Left and increases the militancy of the Reichsbanner.
  `,
  choices: [
    
  ]
};

export const _against_toleration_3: Scene = {
  id: "against_toleration",
  title: "Against toleration",
  subtitle: "Break our current toleration arrangement, and bring down the government via a no-confidence vote.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['constructive_vonc']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6;if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time'] + 3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time'] + 3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; state.flags['spd_toleration'] = 0; state.flags['spd_toleration_right'] = 0; state.flags['left_strength'] += 8; state.flags['pro_republic'] -= 4; state.flags['new_middle_spd'] -= 3; state.flags['rural_spd'] -= 3; state.flags['old_middle_spd'] -= 3; state.flags['catholics_spd'] -= 3; state.flags['reformist_dissent'] += 8; state.flags['left_dissent'] -= 5; state.flags['dvp_relation'] -= 4; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['spd_break_toleration'] += 1; 
  },

  

  render: `
    We have grown tired of the burdens of toleration, and have called a vote of no confidence in the current minority government.
    New elections have been set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _new_prussia_election_3: Scene = {
  id: "new_prussia_election",
  title: "new_prussia_election",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['kpd_relation'] += 5; state.flags['dvp_right'] += 3; state.flags['ddp_right'] += 2; state.flags['lvp_right'] += 2; state.flags['pro_republic'] -= 3; state.flags['new_middle_spd'] -= 2; state.flags['rural_spd'] -= 2; state.flags['old_middle_spd'] -= 2; state.flags['catholics_spd'] -= 2; state.flags['new_middle_nsdap'] += 2; state.flags['old_middle_nsdap'] += 2; state.flags['rural_nsdap'] += 2; state.flags['catholics_nsdap'] += 2; state.flags['in_right_coalition_prussia'] = 0; state.flags['in_social_catholic_coalition_prussia'] = 0; state.flags['in_weimar_coalition_prussia'] = 0; state.flags['in_grand_coalition_prussia'] = 0; state.flags['in_minority_grand_coalition_prussia'] = 0; state.flags['in_popular_front_prussia'] = 0; state.flags['in_left_front_prussia'] = 0; state.flags['in_spd_majority_prussia'] = 0; state.flags['in_center_right_coalition_prussia'] = 0; state.flags['in_far_right_coalition_prussia'] = 0; state.flags['in_minority_weimar_coalition_prussia'] = 0; state.flags['spd_prussia'] = 0; state.flags['right_prussia'] = 0; state.flags['ddp_in_popular_front_prussia'] = 0; state.flags['kpd_goals_seen_prussia'] = 0; state.flags['spd_toleration_prussia'] = 0; state.flags['prussia_coalition_trigger'] = 0; 
  },

  

  render: `
    The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] has called a retaliatory vote in Prussia, forcing the dissolution of the Landtag for new elections.
    New Prussian elections have been set for [+ next_election_month_prussia : month +] [+ next_election_year_prussia +].
    A double dissolution has shaken the people's faith in democracy, with the <span style="color: #7A3C00;">Nazis</span> exploiting the instability to claim that democracy is unworkable, and that Germany needs a strong leader.
  `,
  choices: [
    
  ]
};

export const _center_right_coalition_prussia_3: Scene = {
  id: "center_right_coalition_prussia",
  title: "center_right_coalition_prussia",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['in_center_right_coalition_prussia'] = 1; state.flags['in_right_coalition_prussia'] = 0; state.flags['in_weimar_coalition_prussia'] = 0; state.flags['in_grand_coalition_prussia'] = 0; state.flags['in_minority_grand_coalition_prussia'] = 0; state.flags['in_popular_front_prussia'] = 0; state.flags['in_left_front_prussia'] = 0; state.flags['in_spd_majority_prussia'] = 0; state.flags['in_far_right_coalition_prussia'] = 0; state.flags['in_minority_weimar_coalition_prussia'] = 0; state.flags['spd_prussia'] = 0; state.flags['right_prussia'] = 0; state.flags['ddp_in_popular_front_prussia'] = 0; state.flags['kpd_goals_seen_prussia'] = 0; state.flags['spd_toleration_prussia'] = 0; state.flags['prussia_coalition_trigger'] = 0; state.flags['prussia_leader'] = "Stegerwald";if (state.flags['z_leader'] == "Stegerwald") { state.flags['prussia_leader'] = "Brüning"; }; state.flags['new_middle_spd'] -= 3; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['dvp_right'] += 3; state.flags['ddp_right'] += 2; state.flags['pro_republic'] -= 3; state.flags['prussian_police_loyalty'] -= 0.06; state.flags['prussian_police_strength'] -= 8; 
  },

  

  render: `
    The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] has called a retaliatory no confidence vote in Prussia, replacing our government with a center-right coalition composed of all parties to our right, except for the <span style="color: #003755;">**DNF**</span> and <span style="color: #7A3C00;">**NSDAP**</span>. While this is a setback, it is not the worst possible outcome, as new elections could have led to significant gains for extremist parties.
    [? if z_leader != "Stegerwald": Adam Stegerwald?][? if z_leader == "Stegerwald": Heinrich Brüning?] of the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] is selected to be the Minister-President of Prussia.
  `,
  choices: [
    
  ]
};

export const _shuffle_leadership_pinned: Scene = {
  id: "shuffle_leadership_pinned",
  title: "Shuffle Leadership",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['started'] && state.flags['shuffle_leadership_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_activities'] += 1; state.flags['shuffle_leadership_timer'] = 10; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _siemsen: Scene = {
  id: "siemsen",
  title: "Anna Siemsen",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['siemsen_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Anna Siemsen
    Anna Siemsen is an educational reform advocate and pacifist, who was one of the few German women to receive a PhD in the pre-war period. She was a former member of the <span style="color: #D47B9B;">**USPD**</span>.
  `,
  choices: [
    {
      id: "campaign_pacifism",
      text: "campaign_pacifism",
      nextSceneId: "campaign_pacifism",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "structure_",
      text: "structure_",
      nextSceneId: "structure_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "curriculum_",
      text: "curriculum_",
      nextSceneId: "curriculum_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _campaign_pacifism: Scene = {
  id: "campaign_pacifism",
  title: "Rally for pacifism.",
  subtitle: "Campaign for internationalism and against militarism.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _curriculum_: Scene = {
  id: "curriculum_",
  title: "Change the educational curriculum.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _structure_: Scene = {
  id: "structure_",
  title: "Change the structure and funding of education.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _stampfer: Scene = {
  id: "stampfer",
  title: "Friedrich Stampfer",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['stampfer_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Friedrich Stampfer
    Friedrich Stampfer is the long-time editor-in-chief of Vorwärts, our party newspaper, and also a Reichstag member. He was historically part of the Majority <span style="color: #c00000;">**SPD**</span> that supported our participation in the Great War, but also supports cooperation with the <span style="color: #700000;">**KPD**</span> to save the Republic. 
    [? if kpd_truce: Since such a SPD-KPD cooperation can be considered achieved through a truce with the RFB, Stampfer is emboldened to direct Vorwärts fully towards placating internal dissent by supporting a Center position. ?]
  `,
  choices: [
    {
      id: "media_",
      text: "media_",
      nextSceneId: "media_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "faction_support_",
      text: "faction_support_",
      nextSceneId: "faction_support_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "kpd_cooperation",
      text: "kpd_cooperation",
      nextSceneId: "kpd_cooperation",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _media_: Scene = {
  id: "media_",
  title: "Media",
  subtitle: "Manage our party's newspapers and media.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['media_timer'] -= 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _faction_support_: Scene = {
  id: "faction_support_",
  title: "Editorial Line",
  subtitle: "We can change the editorial line of Vorwärts to support a particular faction.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    Which faction should we support?
  `,
  choices: [
    {
      id: "support_left",
      text: "Left",
      nextSceneId: "support_left",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_center",
      text: "Center",
      nextSceneId: "support_center",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_labor",
      text: "Labor",
      nextSceneId: "support_labor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_reform",
      text: "Reformists",
      nextSceneId: "support_reform",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_neorev",
      text: "Neorevisionists",
      nextSceneId: "support_neorev",
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

export const _support_left: Scene = {
  id: "support_left",
  title: "support_left",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['left_dissent'] -= 8; state.flags['left_strength'] += 8; state.flags['editorial_line'] = "Left"; 
  },

  

  render: `
    Vorwärts prints editorials in support of Left positions.
  `,
  choices: [
    
  ]
};

export const _support_center: Scene = {
  id: "support_center",
  title: "support_center",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['center_dissent'] -= 8; state.flags['center_strength'] += 8; state.flags['editorial_line'] = "Center"; 
  },

  

  render: `
    Vorwärts prints editorials in support of centrist positions.
  `,
  choices: [
    
  ]
};

export const _support_labor: Scene = {
  id: "support_labor",
  title: "support_labor",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['labor_dissent'] -= 8; state.flags['labor_strength'] += 8; state.flags['editorial_line'] = "Labor"; 
  },

  

  render: `
    Vorwärts prints editorials in support of the policies of the trade unions.
  `,
  choices: [
    
  ]
};

export const _support_reform: Scene = {
  id: "support_reform",
  title: "support_reform",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reformist_dissent'] -= 8; state.flags['reformist_strength'] += 8; state.flags['editorial_line'] = "Reformists"; 
  },

  

  render: `
    Vorwärts prints editorials in support of the reformist policies.
  `,
  choices: [
    
  ]
};

export const _support_neorev: Scene = {
  id: "support_neorev",
  title: "support_neorev",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['neorevisionism']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['neorevisionist_dissent'] -= 8; state.flags['neorevisionist_strength'] += 8; state.flags['editorial_line'] = "Neorevisionists"; state.flags['nazi_urgency'] += 1; 
  },

  

  render: `
    Vorwärts prints editorials in support of neorevisionist ideas.
  `,
  choices: [
    
  ]
};

export const _kpd_cooperation_3: Scene = {
  id: "kpd_cooperation",
  title: "Cooperation with the <span style=\"color: #700000;\">**KPD**</span>",
  subtitle: "Could we build closer ties with the <span style=\"color: #700000;\">**KPD**</span>?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_strength'] += 2; state.flags['kpd_relation'] += 4*(1-state.flags['dissent']); state.flags['reformist_dissent'] += 2; 
  },

  

  render: `
    Stampfer works towards closer ties with the <span style="color: #700000;">**KPD**</span> through our media.
  `,
  choices: [
    
  ]
};

export const _wels: Scene = {
  id: "wels",
  title: "Otto Wels",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wels_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Otto Wels
    Wels is the long-time chairman of the <span style="color: #c00000;">**SPD**</span>. He is a gifted organizer and a member of the centrist faction.
  `,
  choices: [
    {
      id: "clear_agenda",
      text: "clear_agenda",
      nextSceneId: "clear_agenda",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "party_discipline",
      text: "party_discipline",
      nextSceneId: "party_discipline",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "emergency_fundraising",
      text: "emergency_fundraising",
      nextSceneId: "emergency_fundraising",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "money_printer",
      text: "money_printer",
      nextSceneId: "money_printer",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "stimulation",
      text: "stimulation",
      nextSceneId: "stimulation",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "snap_election",
      text: "snap_election",
      nextSceneId: "snap_election",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _clear_agenda: Scene = {
  id: "clear_agenda",
  title: "Clear the agenda",
  subtitle: "Removes all cards from the hand.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.advisor_action_timer = 6;
if (Q.difficulty >= 0) {
    if (window.dendryUI?.dendryEngine?.state?.currentHands) {
        window.dendryUI.dendryEngine.state.currentHands['main'] = [];
    }
} else {
    if (window.dendryUI?.dendryEngine?.state?.currentHands) {
        window.dendryUI.dendryEngine.state.currentHands['main.main_easy'] = [];
    }
} 
  },

  

  render: `
    All items from our agenda have been cleared.
  `,
  choices: [
    
  ]
};

export const _party_discipline_2: Scene = {
  id: "party_discipline",
  title: "Party Discipline",
  subtitle: "Reduce dissent across the party.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['left_dissent'] -= 5; state.flags['labor_dissent'] -= 10; state.flags['center_dissent'] -= 10; state.flags['reformist_dissent'] -= 10; state.flags['neorevisionist_dissent'] -= 5; 
  },

  

  render: `
    We have enforced party discipline to reduce dissent across all factions.
  `,
  choices: [
    
  ]
};

export const _emergency_fundraising_3: Scene = {
  id: "emergency_fundraising",
  title: "Emergency Fundraising",
  subtitle: "An emergency infusion of resources.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['difficulty'] < 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['emergency_used'] += 1; state.flags['resources'] += 2;if (state.flags['emergency_used'] > 1) { state.flags['workers_spd'] -= 2; };if (state.flags['emergency_used'] > 1) { state.flags['labor_dissent'] += 5; };if (state.flags['emergency_used'] > 1) { state.flags['unemployed_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['workers_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['unemployed_spd'] -= 2; };if (state.flags['emergency_used'] > 2) { state.flags['labor_dissent'] += 5; };if (state.flags['emergency_used'] > 2) { state.flags['labor_dissent'] += 5; } 
  },

  

  render: `
    [? if emergency_used <= 1: Wels has leveraged his position as party chairman to pull in donations and arrange quick loans. ?][? if emergency_used > 1 and emergency_used < 3: Discontent is brewing among the <span style="color: #c00000;">**SPD**</span>'s rank and file due to our persistent attempts at begging for money. ?][? if emergency_used > 2: We’re really scraping the barrel now—committed members are pressured into selling their valuables, while many others leave in frustration. ?]
    We have gained +2 resources.
  `,
  choices: [
    
  ]
};

export const _money_printer: Scene = {
  id: "money_printer",
  title: "Print a SPDillion dollars.",
  subtitle: "This may have inflationary effects.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['achievement_moly'] && ((state.flags['difficulty'] == -1 && ! state.flags['dynamic_mode']) || state.flags['difficulty'] == 0));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['resources'] += 10; state.flags['inflation'] += 1; state.flags['data_miner_detected'] = 1; state.flags['ip_grabber'] = 1; 
  },

  

  render: `
    We have gained +10 resources.
  `,
  choices: [
    
  ]
};

export const _stimulation: Scene = {
  id: "stimulation",
  title: "Toggle Stimulation.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['achievement_moly']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (Q.stimulation) {
    Q.stimulation = 0; 
} else {
    Q.stimulation = 1;
} 
  },

  

  render: `
    Ok.
  `,
  choices: [
    
  ]
};

export const _snap_election_5: Scene = {
  id: "snap_election",
  title: "Snap Election",
  subtitle: "Call a snap election.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['time_to_election'] = 3; 
  },

  

  render: `
    We have called for new elections, set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _wirth: Scene = {
  id: "wirth",
  title: "Joseph Wirth",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wirth_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Joseph Wirth
    Wirth is a former chancellor and figure of the <span style="color: #000000;">Center</span>'s left wing who has been devotedly <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span>, to the extent of angering his former party members. He is a strong supporter of maintaining democracy and building a broad popular base for the <span style="color: #c00000;">**SPD**</span>.
  `,
  choices: [
    {
      id: "democratic_rally",
      text: "democratic_rally",
      nextSceneId: "democratic_rally",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "catholics_rally",
      text: "catholics_rally",
      nextSceneId: "catholics_rally",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_peoples_party",
      text: "support_peoples_party",
      nextSceneId: "support_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "build_peoples_party",
      text: "build_peoples_party",
      nextSceneId: "build_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaigning_peoples_party",
      text: "campaigning_peoples_party",
      nextSceneId: "campaigning_peoples_party",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _democratic_rally_2: Scene = {
  id: "democratic_rally",
  title: "Rally for democracy",
  subtitle: "Rally our party and the German people to defend democracy and freedom.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['pro_republic'] += 8; state.flags['democratization'] += 1; state.flags['neorevisionist_strength'] += 5; state.flags['reformist_strength'] += 5;if (state.flags['democratization'] >= 4) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 4) { state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 3) { state.flags['catholics_spd'] += 4*(1-state.flags['dissent']); } 
  },

  

  render: `
    Wirth helps us to rally the people in defense of the <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> system.
  `,
  choices: [
    
  ]
};

export const _catholics_rally: Scene = {
  id: "catholics_rally",
  title: "Organizing Catholics",
  subtitle: "Being a devoted Catholic and former <span style=\"color: #000000;\">Center</span> member, he's particularly effective in winning votes from the <span style=\"color: #000000;\">**[+ z_party_name +]**</span>.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['pro_republic'] += 4; state.flags['catholics_spd'] += 8*(1-state.flags['dissent']); 
  },

  

  render: `
    Wirth helps us rally the Catholic demographic back from the conservative <span style="color: #000000;">**[+ z_party_name +]**</span>.
  `,
  choices: [
    
  ]
};

export const _support_peoples_party_3: Scene = {
  id: "support_peoples_party",
  title: "Build support for a People's Party",
  subtitle: "Can we expand our party beyond the industrial working class?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['peoples_party_support'] += 1; 
  },

  

  render: `
    We are building up support for the idea of a People's Party.
  `,
  choices: [
    
  ]
};

export const _build_peoples_party_3: Scene = {
  id: "build_peoples_party",
  title: "Building a People's Party",
  subtitle: "Can we expand our party beyond the industrial working class?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _campaigning_peoples_party_3: Scene = {
  id: "campaigning_peoples_party",
  title: "Campaigning as a People's Party",
  subtitle: "Campaigning with some of our previously nontraditional demographics.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _wissell: Scene = {
  id: "wissell",
  title: "Rudolf Wissell",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wissell_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Rudolf Wissell
    Wissell is a labor economist working for the ADGB, the federation of free trade unions, and has been a labor minister on multiple occasions. His priority is to improve conditions for organized workers.
  `,
  choices: [
    {
      id: "labor_rights_",
      text: "labor_rights_",
      nextSceneId: "labor_rights_",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "union_unity",
      text: "union_unity",
      nextSceneId: "union_unity",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _labor_rights_: Scene = {
  id: "labor_rights_",
  title: "Labor Rights",
  subtitle: "As Labor Minister, Wissell can help set regulations for working conditions.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['labor_rights_timer'] -= 10; state.flags['last_advisor_action'] = 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _union_unity_3: Scene = {
  id: "union_unity",
  title: "Union-party coordination",
  subtitle: "Reduce dissent among the unions.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['labor_dissent'] -= 5; state.flags['labor_strength'] += 5; 
  },

  

  render: `
    We have reduced tensions with the Labor faction, and increased its strength in the party.
  `,
  choices: [
    
  ]
};

export const _woytinsky: Scene = {
  id: "woytinsky",
  title: "Wladimir Woytinsky",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['woytinsky_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = Wladimir Woytinsky
    Wladimir Woytinsky is a Russian <span style="color: #D50032;">Menshevik</span> in exile, and the chief economist of the <span style="color: #c00000;">socialist</span> trade union federation. His primary idea is to use massive government spending as a way of stimulating demand to extricate us from the depression.
  `,
  choices: [
    {
      id: "plan",
      text: "plan",
      nextSceneId: "plan",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "carry_out_policy",
      text: "carry_out_policy",
      nextSceneId: "carry_out_policy",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "depression",
      text: "depression",
      nextSceneId: "depression",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "root",
      text: "Return to main",
      nextSceneId: "root",
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

export const _plan: Scene = {
  id: "plan",
  title: "Adopt the WTB-plan!",
  subtitle: "Convincing the rest of the party to support the WTB-plan.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _carry_out_policy: Scene = {
  id: "carry_out_policy",
  title: "Carry out the economic plan.",
  subtitle: "If we are in government, we can carry out a public works program such as the WTB-Plan.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['economic_policy_timer'] -= 12; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _depression_3: Scene = {
  id: "depression",
  title: "Addressing the economic crisis",
  subtitle: "Formulate a plan to get us out of the economic crisis.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['advisor_action_timer'] = 6; state.flags['wtb_support'] += 2; state.flags['center_dissent'] += 10; state.flags['labor_strength'] += 5; state.flags['wtb_points'] += 15; 
  },

  

  render: `
    [? if not wtb_concept: Woytinsky, Tarnow, and Baade, has been working together to draft a plan for getting us out of the depression. Woytinsky canvasses in favor of this policy through the <span style="color: #c00000;">**SPD**</span> and the unions. ?][? if wtb_concept: The WTB-plan, named for its primary supporters Woytinsky, Tarnow, and Baade, has been adopted as the unions' plan for getting us out of the depression. Woytinsky canvasses in favor of this policy through the <span style="color: #c00000;">**SPD**</span> and the unions. ?]
  `,
  choices: [
    
  ]
};
