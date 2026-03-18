// @ts-nocheck
import { Scene, GameState } from "../../engine/types";


export const _agricultural_policy: Scene = {
  id: "agricultural_policy",
  title: "Agricultural Policy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && (state.flags['agriculture_minister_party'] == "SPD") && state.flags['agricultural_policy_timer'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['agricultural_policy_timer'] += 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: Issues of farmer financing, grain purchasing, and land reform.
    = Agricultural Policy
    While agricultural policy has historically not been the domain of the <span style="color: #c00000;">**SPD**</span>, there is much need for policy in this area. Our urban constituencies hope for cheaper and more stable food supplies, while small farmers need economic relief. There is also the movement for land reform, to break up the large aristocratic estates and redistribute land to peasants.
  `,
  choices: [
    {
      id: "land_reform",
      text: "land_reform",
      nextSceneId: "land_reform",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "agricultural_finance",
      text: "agricultural_finance",
      nextSceneId: "agricultural_finance",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "pro_consumer",
      text: "pro_consumer",
      nextSceneId: "pro_consumer",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "state_buyer",
      text: "state_buyer",
      nextSceneId: "state_buyer",
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
      text: "Do not enact any policies for now.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _land_reform: Scene = {
  id: "land_reform",
  title: "Land Reform",
  subtitle: "-1 budget - Break up the large aristocratic estates and give land to landless workers.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['land_reform'] += 1; state.flags['coalition_dissent'] += 1; state.flags['rural_spd'] += 7*(1-state.flags['dissent']); state.flags['rural_nsdap'] -= 4*(1-state.flags['dissent']); state.flags['rural_other'] -= 2*(1-state.flags['dissent']);if (state.flags['unemployed'] >= 5) { state.flags['unemployed'] -= 1; }; state.flags['dvp_relation'] -= 5; state.flags['z_relation'] -= 4; state.flags['lvp_relation'] -= 3; state.flags['left_strength'] += 8; state.flags['left_dissent'] -= 5; state.flags['rural_sol'] += 3; state.flags['rural_policy'] += 1; state.flags['coup_progress'] += 1; state.flags['agriculture_goal_completed'] += 1; state.flags['dvp_right'] += 1; state.flags['lvp_right'] += 1; state.flags['agriculture_goal_spd_peoples'] += 1; state.flags['hindenburg_angry'] += 10; 
  },

  

  render: `
    With our policy of land reform, we are acquiring farmland from large estates, and giving the land to farmworkers' associations and small peasants. In essence, this brings class struggle to the countryside, breaking the semi-feudal property relations present in East Prussia and other areas with large estates. The bourgeois parties and large farmers despise our intrusion into the sacredness of private property, while leftists are cautiously optimistic.
    [? if president == "Hindenburg": This policy has especially earned us the ire of President Hindenburg and his inner circle. ?]
  `,
  choices: [
    
  ]
};

export const _agricultural_finance: Scene = {
  id: "agricultural_finance",
  title: "Agricultural Financing",
  subtitle: "-1 budget - Increase financing for agricultural credit and insurance.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['agricultural_finance'] += 1; state.flags['rural_spd'] += 5*(1-state.flags['dissent']); state.flags['rural_nsdap'] -= 3*(1-state.flags['dissent']); state.flags['peoples_party_support'] += 1; state.flags['center_dissent'] += 5; state.flags['left_dissent'] += 4; state.flags['rural_sol'] += 4; state.flags['rural_policy'] += 1; state.flags['agriculture_goal_spd_peoples'] += 1; state.flags['economic_growth'] += 0.2; 
  },

  

  render: `
    We have increased financial support for small farmers, providing access to credit and insurance, saving them from privation. The left and center of our party are opposed to our rural policy, seeing these policies as giveaways to petit-bourgeois farmers.
  `,
  choices: [
    
  ]
};

export const _pro_consumer: Scene = {
  id: "pro_consumer",
  title: "Food Procurement",
  subtitle: "-1 budget - Provide inexpensive food for workers.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['pro_consumer'] += 1; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); state.flags['workers_sol'] += 4;if (state.flags['black_thursday_seen']) { state.flags['coalition_dissent'] += 1; };if (state.flags['black_thursday_seen']) { state.flags['dvp_right'] += 1; };if (state.flags['black_thursday_seen']) { state.flags['lvp_right'] += 1; }; state.flags['agriculture_goal_spd'] += 1; state.flags['economic_growth'] += 0.2; 
  },

  

  render: `
    We have increased state purchasing of food staples to provide to urban workers and the poor. This benefits workers more than it benefits farmers, as we are negotiating for lower purchase prices. [? if black_thursday_seen and (in_weimar_coalition or in_grand_coalition) : Our coalition partners consider this policy to be a wasteful handout. ?]
  `,
  choices: [
    
  ]
};

export const _state_buyer: Scene = {
  id: "state_buyer",
  title: "State Buyer",
  subtitle: "-2 budget - Create a state monopoly for grain purchases, guaranteeing prices for farmers and stable prices for consumers. [? if judicial_reform < 2 : The judiciary would never allow this. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 2; state.flags['state_buyer'] = 1; state.flags['rural_spd'] += 5*(1-state.flags['dissent']); state.flags['rural_nsdap'] -= 3*(1-state.flags['dissent']); state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 5*(1-state.flags['dissent']);if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['coalition_dissent'] += 1; }; state.flags['dvp_relation'] -= 5; state.flags['lvp_relation'] -= 4; state.flags['z_relation'] -= 3; state.flags['peoples_party_support'] += 1; state.flags['rural_policy'] += 2; state.flags['capital_strike_progress'] += 1; state.flags['dvp_right'] += 2; state.flags['ddp_relation'] -= 3; state.flags['lvp_right'] += 2; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 0.5; state.flags['agriculture_goal_spd'] += 1; state.flags['hindenburg_angry'] += 5; state.flags['economic_growth'] += 0.4; state.flags['agriculture_goal_spd_peoples'] += 1; 
  },

  

  render: `
    Our new purchasing agency guarantees fair prices for farmers, while also providing lower food prices for workers and the urban poor. This policy necessitates heavy spending and an unprecedented level of state intervention in the economy, raising the ire of conservative economists.
    [? if president == "Hindenburg": This policy has earned us the ire of President Hindenburg and his inner circle. ?]
  `,
  choices: [
    
  ]
};

export const _blank: Scene = {
  id: "blank",
  title: "Missing Report",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['chancellor'] == "Schleicher" && state.flags['schleicher_time'] && state.flags['schleicher_time'] >= 8 && state.flags['schleicher_spd_influence'] >= 2);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    = &nbsp;
    ...
  `,
  choices: [
    {
      id: "help",
      text: "&nbsp;",
      nextSceneId: "help",
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

export const _help: Scene = {
  id: "help",
  title: "help",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    &nbsp;
  `,
  choices: [
    
  ]
};

export const _blank_2: Scene = {
  id: "blank_2",
  title: "Missing Report",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['chancellor'] == "Schleicher" && state.flags['schleicher_time'] && state.flags['schleicher_time'] >= 8 && state.flags['schleicher_spd_influence'] >= 4);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    = &nbsp;
    ...
  `,
  choices: [
    {
      id: "help",
      text: "&nbsp;",
      nextSceneId: "help",
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

export const _help_2: Scene = {
  id: "help",
  title: "help",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    &nbsp;
  `,
  choices: [
    
  ]
};

export const _blank_2_alt: Scene = {
  id: "blank_2_alt",
  title: "Missing Report",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['chancellor'] == "Schleicher" && state.flags['schleicher_time'] && state.flags['schleicher_time'] >= 8 && state.flags['schleicher_spd_influence'] >= 4);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    = &nbsp;
    ...
  `,
  choices: [
    {
      id: "help",
      text: "&nbsp;",
      nextSceneId: "help",
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

export const _help_3: Scene = {
  id: "help",
  title: "help",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    &nbsp;
  `,
  choices: [
    
  ]
};

export const _blank_3: Scene = {
  id: "blank_3",
  title: "Missing Report",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['chancellor'] == "Schleicher" && state.flags['schleicher_time'] && state.flags['schleicher_time'] >= 8 && state.flags['schleicher_spd_influence'] >= 6);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    = &nbsp;
    ...
  `,
  choices: [
    {
      id: "help",
      text: "&nbsp;",
      nextSceneId: "help",
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

export const _help_4: Scene = {
  id: "help",
  title: "help",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    &nbsp;
  `,
  choices: [
    
  ]
};

export const _blank_3_alt: Scene = {
  id: "blank_3_alt",
  title: "Missing Report",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['chancellor'] == "Schleicher" && state.flags['schleicher_time'] && state.flags['schleicher_time'] >= 8 && state.flags['schleicher_spd_influence'] >= 6);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    = &nbsp;
    ...
  `,
  choices: [
    {
      id: "help",
      text: "&nbsp;",
      nextSceneId: "help",
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

export const _help_5: Scene = {
  id: "help",
  title: "help",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    &nbsp;
  `,
  choices: [
    
  ]
};

export const _blank_4: Scene = {
  id: "blank_4",
  title: "Missing Report",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['chancellor'] == "Schleicher" && state.flags['schleicher_time'] && state.flags['schleicher_time'] >= 8 && state.flags['schleicher_spd_influence'] >= 8);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    = &nbsp;
    ...
  `,
  choices: [
    {
      id: "help",
      text: "&nbsp;",
      nextSceneId: "help",
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

export const _help_6: Scene = {
  id: "help",
  title: "help",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    &nbsp;
  `,
  choices: [
    
  ]
};

export const _blank_alt: Scene = {
  id: "blank_alt",
  title: "Missing Report",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['chancellor'] == "Schleicher" && state.flags['schleicher_time'] && state.flags['schleicher_time'] >= 8 && state.flags['schleicher_spd_influence'] >= 2);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    = &nbsp;
    ...
  `,
  choices: [
    {
      id: "help",
      text: "&nbsp;",
      nextSceneId: "help",
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

export const _help_7: Scene = {
  id: "help",
  title: "help",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    &nbsp;
  `,
  choices: [
    
  ]
};

export const _coalition_affairs: Scene = {
  id: "coalition_affairs",
  title: "Coalition Affairs",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['coalition_dissent'] >= 1 && state.flags['coalition_affairs_timer'] == 0 && (state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'] || state.flags['in_popular_front']));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['coalition_affairs_timer'] = 5; 
  },

  

  render: `
    #subtitle: There is dissent within our coalition.
    = Coalition Affairs
    Our coalition is in trouble. The right-leaning members of the [? if not in_social_liberal_coalition: [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?]?] [? if not in_social_catholic_coalition:[? if in_grand_coalition and not lvp_formed: and <span style="color: #C0A054;">**DVP**</span> ?][? if not lvp_formed and in_weimar_coalition: [? if not in_social_liberal_coalition: and?] <span style="color: #D3C24D;">**[+ ddp_name +]**</span> ?][? if lvp_formed: [? if not in_social_liberal_coalition: and?] <span style="color: #FFCC00;">**LVP**</span> ?]?] are constantly criticizing us for our policies, and are threatening to call a vote of no confidence to collapse this government[? if spd_prussia :, or to do the same for our government in the state of Prussia?].
    How do we reduce tensions with the coalition?
  `,
  choices: [
    {
      id: "dvp_prussia_2",
      text: "Let the <span style=\"color: #C0A054;\">**DVP**</span> into Prussia.",
      nextSceneId: "dvp_prussia_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "promise_cuts",
      text: "Agree to the bourgeois plans to cut welfare.",
      nextSceneId: "promise_cuts",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "resources",
      text: "Use our party resources to support our allies.",
      nextSceneId: "resources",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "bring_down",
      text: "Instead, we will bring down the government with a no-confidence vote, and call for new elections.",
      nextSceneId: "bring_down",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "no_change",
      text: "Take none of these actions.",
      nextSceneId: "no_change",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _dvp_prussia_2: Scene = {
  id: "dvp_prussia_2",
  title: "dvp_prussia_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['year'] <= 1929 && state.flags['in_grand_coalition_prussia'] == 0 && (state.flags['in_weimar_coalition_prussia'] || state.flags['in_minority_weimar_coalition_prussia']) && state.flags['in_grand_coalition'] == 1 && state.flags['dvp_was_in_prussia'] == 0 && ! state.flags['lvp_formed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['in_right_coalition_prussia'] = 0; state.flags['in_weimar_coalition_prussia'] = 0; state.flags['in_grand_coalition_prussia'] = 1; state.flags['in_minority_grand_coalition_prussia'] = 0; state.flags['in_popular_front_prussia'] = 0; state.flags['in_left_front_prussia'] = 0; state.flags['in_spd_majority_prussia'] = 0; state.flags['in_center_right_coalition_prussia'] = 0; state.flags['in_far_right_coalition_prussia'] = 0; state.flags['in_minority_weimar_coalition_prussia'] = 0; state.flags['spd_prussia'] = 1; state.flags['ddp_in_popular_front_prussia'] = 0; state.flags['kpd_goals_seen_prussia'] = 0; state.flags['spd_toleration_prussia'] = 0; state.flags['dvp_relation'] += 10; state.flags['z_relation'] -= 5; state.flags['ddp_relation'] += 3; state.flags['coalition_dissent'] -= 1; state.flags['left_dissent'] += 5; state.flags['in_grand_coalition_prussia'] = 1; state.flags['in_weimar_coalition_prussia'] = 0; state.flags['in_minority_weimar_coalition_prussia'] = 0; state.flags['dvp_left'] += 3; state.flags['new_middle_dvp'] += 3; 
  },

  

  render: `
    Letting the <span style="color: #C0A054;">**DVP**</span> into the Prussian government is an offer too good for them to refuse, no matter their leadership. 
    However, this has negatively impacted our freedom of action we previously had in the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> coalition.
  `,
  choices: [
    
  ]
};

export const _give_up_prussia: Scene = {
  id: "give_up_prussia",
  title: "give_up_prussia",
  subtitle: "Braun would need to resign.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussia_leader'] == "Braun" && state.flags['neo_weimar_coalition_prussia'] >= 50);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['coalition_dissent'] = 1; state.flags['prussia_leader'] = "Stegerwald";if (state.flags['z_leader'] == "Stegerwald") { state.flags['prussia_leader'] = "Brüning"; }; state.flags['reformist_dissent'] += 10; state.flags['center_dissent'] += 10; state.flags['labor_dissent'] += 10; state.flags['left_dissent'] += 5; state.flags['workers_spd'] -= 5; state.flags['new_middle_spd'] -= 5; state.flags['rural_spd'] -= 3; state.flags['braun_resign'] = 1; 
  },

  

  render: `
    Fine. We no longer control the government of Prussia. The vote has been called off.
    The Minister-President position is transferred to the [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?].
  `,
  choices: [
    
  ]
};

export const _promise_cuts: Scene = {
  id: "promise_cuts",
  title: "promise_cuts",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] -= 5; state.flags['unemployed_spd'] -= 6; state.flags['workers_kpd'] += 5; state.flags['unemployed_kpd'] += 3; state.flags['unemployed_nsdap'] += 3; state.flags['left_dissent'] += 10; state.flags['labor_dissent'] += 5; state.flags['welfare'] -= 1; state.flags['budget'] += 1; state.flags['coalition_dissent'] = 0; state.flags['dvp_left'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['ddp_right'] += 1; state.flags['lvp_left'] += 1; state.flags['goal_spd_cancel'] += 1; state.flags['social_welfare_timer'] = 10; 
  },

  

  render: `
    Fine. By cutting welfare, we have reduced dissent within the coalition.
  `,
  choices: [
    
  ]
};

export const _resources: Scene = {
  id: "resources",
  title: "resources",
  subtitle: "-2 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['historical_mode'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 2; state.flags['coalition_dissent'] -= 1; 
  },

  

  render: `
    By transferring campaign funds to our coalition partners, we can make our policies more acceptable to them. Some would call this corruption, but perhaps it is necessary to save democracy.
  `,
  choices: [
    
  ]
};

export const _no_change: Scene = {
  id: "no_change",
  title: "no_change",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    No. We will not do this.
  `,
  choices: [
    
  ]
};

export const _bring_down: Scene = {
  id: "bring_down",
  title: "bring_down",
  subtitle: "Bring down this government before our opponents do.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['spd_in_government'] = 0;if (state.flags['in_grand_coalition']) { state.flags['grand_coalition_collapsed'] = 1; }; state.flags['in_grand_coalition'] = 0; state.flags['in_weimar_coalition'] = 0; state.flags['chancellor'] = "Brüning"; state.flags['chancellor_party'] = "Z"; state.flags['spd_toleration'] = 0; state.flags['spd_toleration_right'] = 0; state.flags['left_strength'] += 8; state.flags['pro_republic'] -= 5; state.flags['new_middle_spd'] -= 3; state.flags['rural_spd'] -= 3; state.flags['old_middle_spd'] -= 3; state.flags['catholics_spd'] -= 3; state.flags['reformist_dissent'] += 5;if (! state.flags['bruning_event_seen'] && state.flags['year'] >= 1930) { state.flags['bruning_event_timer'] = 6; } 
  },

  

  render: `
    We have called for a vote of no confidence in ourselves, and have brought down this government. Chancellor [+ chancellor +] currently rules as acting chancellor.
    [? if not bruning_event_seen and year >= 1930: New elections haven't been called yet but it's likely that they will be soon, considering Brüning most likely doesn't have the majority of the Reichstag behind him. ?]
  `,
  choices: [
    
  ]
};

export const _elections: Scene = {
  id: "elections",
  title: "elections",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    New elections have been set for [+ next_election_month : month +] [+ next_election_year +].
  `,
  choices: [
    
  ]
};

export const _constitutional_reform: Scene = {
  id: "constitutional_reform",
  title: "Constitutional Reform",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['justice_minister_party'] == "SPD" && state.flags['constitutional_reform_timer'] == 0 && state.flags['judicial_reform'] >= 4 && state.flags['neorevisionism'] && ((state.flags['in_weimar_coalition']) || (state.flags['in_spd_majority']) || (state.flags['in_left_front']) || (state.flags['in_popular_front'])) && state.flags['constitutional_reform'] < 3 && state.flags['neorevisionism']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['constitutional_reform_timer'] += 12; state.flags['pass_threshold'] = 0.51;if (state.flags['pro_republic'] < 65) { state.flags['pass_threshold'] = 0.6; }; 
  },

  

  render: `
    #subtitle: Major changes to government.
    # technically you could do some trickery to get a 2/3 quorum in the Reichstag by stopping some people from attending... if the <span style="color: #7A3C00;">**NSDAP**</span> is boycotting the Reichstag, or if the <span style="color: #7A3C00;">**NSDAP**</span> or <span style="color: #3E88B3;">**DNVP**</span> are banned in the aftermath of a coup atempt...
    # alternatively, a constitutional referendum can be initiated, that requires a simple majority of voters to pass (as I understand article 76). This should depend on support for the republic and for democracy, and the relationships with the other parties (more similar to the presidential election).
    = Constitutional Reform
    # the ideas for constitutional reform here are based on the bundesrepublik basic law... I'm not sure if it's totally realistic to what someone like Mierendorff would've wanted.
    Many neorevisionists consider the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Constitution to be inadequate. They believe that the clauses of the constitution are in part responsible for the instability of the country, and must change in order to build a more stable democratic republic. Ideas from both <span style="color: #c00000;">socialists</span> and <span style="color: #D3C24D;">liberals</span>.
    A constitutional reform requires either a two-thirds supermajority in the Reichstag, or a constitutional referendum with support from a majority of the electorate. If we do not have a supermajority in the Reichstag, we must be assured of strong support from the other parties for the constitutional referendum.
  `,
  choices: [
    
  ]
};

export const _reforms_menu: Scene = {
  id: "reforms_menu",
  title: "reforms_menu",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    #- @constitutional_bans: Allow the banning of anti-constitutional parties.
  `,
  choices: [
    {
      id: "vote_threshold",
      text: "Change the vote threshold.",
      nextSceneId: "vote_threshold",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "constructive_vonc",
      text: "Ban non-constructive votes of no confidence.",
      nextSceneId: "constructive_vonc",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "presidential_powers",
      text: "Reduce presidential powers.",
      nextSceneId: "presidential_powers",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "as_is",
      text: "Do not pursue constitutional reform.",
      nextSceneId: "as_is",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _vote_threshold: Scene = {
  id: "vote_threshold",
  title: "vote_threshold",
  subtitle: "Change the vote threshold to 5% for parties to be represented in the Reichstag.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['electoral_threshold'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.reform_support = Q.spd_normalized;
if (Q.z_relation > 30) {
    Q.reform_support += Q.z_normalized - 0.03;
}
if (Q.kpd_relation > 50 && Q.kpd_normalized >= 0.1) {
    Q.reform_support += Q.kpd_normalized;
}
if (Q.nsdap_normalized >= 0.2 ) {
    Q.reform_support += Q.nsdap_normalized;
} 
  },

  

  render: `
    # The left is opposed to this.
    Some political thinkers believe that the proliferation of minor parties is responsible for the instability of the republic. They believe that a higher electoral threshold will reduce the influence of small radical parties. Parties that win a plurality in a constituency will maintain their representation, a gift to regional parties such as the <span style="color: #A2D8E0;">**BVP**</span>. 
    The smaller parties will obviously oppose this reform. [? if z_relation > 30 : The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] supports this reform, while their <span style="color: #A2D8E0;">**BVP**</span> partners oppose it. ?] [? if kpd_relation > 50 and kpd_normalized >= 0.1 : Perhaps surprisingly, the <span style="color: #700000;">**KPD**</span> supports this reform. ?] [? if nsdap_normalized >= 0.2 : The <span style="color: #7A3C00;">**NSDAP**</span> supports this reform, as they believe they have something to gain. ?]
    The <span style="color: #c00000;">**SPD**</span> Left opposes this change, as they believe it to be anti-democratic.
  `,
  choices: [
    {
      id: "vote_threshold_2",
      text: "Call a constitutional referendum to pass the reform!",
      nextSceneId: "vote_threshold_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "reforms_menu",
      text: "See other reform options.",
      nextSceneId: "reforms_menu",
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

export const _vote_threshold_2: Scene = {
  id: "vote_threshold_2",
  title: "vote_threshold_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['constitutional_reform'] += 1; state.flags['electoral_threshold'] = 5; state.flags['ddp_relation'] -= 25; state.flags['dvp_relation'] -= 25; state.flags['lvp_relation'] -= 5; state.flags['left_dissent'] += 20; state.flags['workers_dnvp'] += state.flags['workers_other']*0.4; state.flags['workers_nsdap'] += state.flags['workers_other']*0.4; state.flags['workers_other'] *= 0.1; state.flags['new_middle_lvp'] += state.flags['new_middle_other']*0.5; state.flags['old_middle_lvp'] += state.flags['old_middle_other']*0.5; state.flags['new_middle_dvp'] += state.flags['new_middle_other']*0.3; state.flags['new_middle_ddp'] += state.flags['new_middle_other']*0.15; state.flags['new_middle_nsdap'] += state.flags['new_middle_other']*0.3; state.flags['new_middle_other'] *= 0.1; state.flags['old_middle_dvp'] += 0.3*state.flags['old_middle_other']; state.flags['old_middle_ddp'] += state.flags['old_middle_other']*0.15; state.flags['old_middle_nsdap'] += 0.3*state.flags['old_middle_other']; state.flags['old_middle_dnvp'] += 0.3*state.flags['old_middle_other']; state.flags['old_middle_other'] *= 0.1; state.flags['rural_dvp'] += 0.1*state.flags['rural_other']; state.flags['rural_lvp'] += 0.1*state.flags['rural_other']; state.flags['rural_dnvp'] += 0.5*state.flags['rural_other']; state.flags['rural_nsdap'] += 0.3*state.flags['rural_other']; state.flags['rural_other'] *= 0.1; state.flags['unemployed_nsdap'] += 0.3*state.flags['unemployed_other']; state.flags['unemployed_kpd'] += 0.4*state.flags['unemployed_other']; state.flags['unemployed_other'] *= 0.2; state.flags['catholics_z'] += 0.6*state.flags['catholics_other']; state.flags['catholics_other'] *= 0.1; state.flags['ddp_right'] += 10; state.flags['ddp_cohesion'] -= 3; state.flags['lvp_right'] += 3; state.flags['bourgeois_cooperation'] += 20; state.flags['liberal_cooperation'] += 10; 
  },

  

  render: `
    # this should result in a redistribution of votes - other parties should not get so many votes anymore. maybe ddp and dvp get a recovery of middle-class votes? or maybe they flow to the others.
    # TODO: add bourgeois mergers cuz of this
    We have passed a constitutional amendment to increase the electoral threshold to 5%. This is likely to benefit the larger parties and harm the smaller ones.
  `,
  choices: [
    
  ]
};

export const _constructive_vonc: Scene = {
  id: "constructive_vonc",
  title: "constructive_vonc",
  subtitle: "Votes of no confidence can only be called if an alternative plan for government formation can be passed, greatly reducing their incidence.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['constructive_vonc'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.reform_support = Q.spd_normalized + Q.ddp_normalized;
if (Q.z_relation >= 50) {
    Q.reform_support += Q.z_normalized - 0.03;
}
if (!Q.stresemann_dead) {
    Q.reform_support += Q.dvp_normalized;
} 
  },

  

  render: `
    [? if z_relation >= 30 and not lvp_formed : The <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Coalition parties, the <span style="color: #D3C24D;">**[+ ddp_name +]**</span> and [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?], support this reform, which will greatly improve the stability of the government. ?][? if z_relation >= 30 and lvp_formed : The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] supports this reform, which will greatly improve the stability of the government, but the <span style="color: #FFCC00;">**LVP**</span> remains heavily opposed for obvious reasons. ?] [? if z_relation < 30 and not lvp_formed : The <span style="color: #D3C24D;">**[+ ddp_name +]**</span> supports this reform, but the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] does not trust us enough to support the constitutional referendum. ?][? if z_relation < 30 and lvp_formed : The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] does not trust us enough to support the constitutional referendum, and the <span style="color: #FFCC00;">**LVP**</span> remains heavily opposed for obvious reasons. ?] The more conservative and radical right-wing parties and the <span style="color: #700000;">**KPD**</span> are in opposition, as they seem to relish in the <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> system's instability.
  `,
  choices: [
    {
      id: "constructive_vonc_2",
      text: "Call a constitutional referendum to pass the reform!",
      nextSceneId: "constructive_vonc_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "reforms_menu",
      text: "See other reform options.",
      nextSceneId: "reforms_menu",
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

export const _constructive_vonc_2: Scene = {
  id: "constructive_vonc_2",
  title: "constructive_vonc_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['constitutional_reform'] += 1; state.flags['constructive_vonc'] = 1; 
  },

  

  render: `
    We have successfully passed a constitutional amendment to ban votes of no confidence when a new government cannot be formed. Hopefully this increases the stability of our governments.
  `,
  choices: [
    
  ]
};

export const _presidential_powers: Scene = {
  id: "presidential_powers",
  title: "presidential_powers",
  subtitle: "The president can no longer dissolve the Reichstag at will, or call a <i>Reichsexekution</i> on state governments.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['presidential_powers'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.reform_support = Q.spd_normalized + Q.ddp_normalized + Q.kpd_normalized + (Q.lvp_normalized / 3);
if (Q.z_relation > 65 && (Q.president == "Hindenburg" || Q.president_ideology == "Moderate")) {
    Q.reform_support += Q.z_normalized;
    Q.z_support_reform = 1;
} else if (Q.president_ideology == "Left" || Q.z_relation > 55 && !(Q.president == "Hindenburg" || Q.president_ideology == "Moderate")) {
    Q.reform_support += Q.z_normalized;
    Q.z_support_reform = 1;
}
if (Q.president_ideology == "Left") {
    Q.reform_support += (Q.lvp_normalized * 2) / 3;
} else if (Q.lvp_relation >= 49) {
    Q.reform_support += (Q.lvp_normalized * 2) / 3;
} 
  },

  

  render: `
    The wide-ranging presidential powers promised by the constitution are a potential gateway to <span style="color: #808080;">authoritarianism</span>. Thus, we can support reforms that limit the powers of the president, ending his power to unilaterally terminate an elected government and to remove state governments.
    The <span style="color: #700000;">**KPD**</span> is in favor of this reform, having been victims of the <i>Reichsexekution</i> in the past (when <span style="color: #700000;">**KPD**</span>-supported state governments in Thuringia and Saxony were removed). The democrats of the [? if not lvp_formed:<span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed:<span style="color: #FFCC00;">**LVP**</span>?] also support this. [? if president == "Hindenburg" or president_ideology == "Moderate": However, the opposition from conservatives is vehement, as they see a reduction in presidential powers as disrespectful to [+ president +]. ?] [? if z_relation <= 65 and (president == "Hindenburg" or president_ideology == "Moderate") : Thus, the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] has been influenced to oppose these reforms[? if lvp_relation < 49 and (president == "Hindenburg" or president_ideology == "Moderate") and lvp_formed:&nbsp;along with the majority of the <span style="color: #FFCC00;">**LVP**</span>?][? if lvp_relation >= 49 and (president == "Hindenburg" or president_ideology == "Moderate") and lvp_formed:&nbsp;however, the majority of the <span style="color: #FFCC00;">**LVP**</span> is convinced somehow?]. ?] [? if z_relation > 65 and (president == "Hindenburg" or president_ideology == "Moderate") : Despite this, the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] supports the proposed reform[? if lvp_relation < 49 and (president == "Hindenburg" or president_ideology == "Moderate") and lvp_formed:&nbsp;however, the rightists in the <span style="color: #FFCC00;">**LVP**</span> are unable to be convinced?][? if lvp_relation >= 49 and (president == "Hindenburg" or president_ideology == "Moderate") and lvp_formed:&nbsp;along with the majority of the <span style="color: #FFCC00;">**LVP**</span>?]. ?] [? if president_ideology == "Left" : The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] supports this reform. ?]
  `,
  choices: [
    {
      id: "presidential_powers_2",
      text: "Call a constitutional referendum to pass the reform!",
      nextSceneId: "presidential_powers_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "reforms_menu",
      text: "See other reform options.",
      nextSceneId: "reforms_menu",
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

export const _presidential_powers_2: Scene = {
  id: "presidential_powers_2",
  title: "presidential_powers_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['constitutional_reform'] += 1; state.flags['presidential_powers'] = 1; 
  },

  

  render: `
    We have successfully passed a constitutional amendment to limit presidential powers! Hopefully this results in a less <span style="color: #808080;">authoritarian</span> Germany.
  `,
  choices: [
    
  ]
};

export const _bundesrepublik: Scene = {
  id: "bundesrepublik",
  title: "bundesrepublik",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _constitutional_bans: Scene = {
  id: "constitutional_bans",
  title: "constitutional_bans",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    # Temporarily disable this for now - how would this interact with the already-extant law for the protection of the republic? This 
  `,
  choices: [
    
  ]
};

export const _as_is: Scene = {
  id: "as_is",
  title: "as_is",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _dealing_with_toleration: Scene = {
  id: "dealing_with_toleration",
  title: "Dealing with Toleration",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['dealing_with_toleration_timer'] == 0 && state.flags['spd_toleration'] && ! state.flags['spd_toleration_right'] && state.flags['chancellor_party'] == "Z" && ! state.flags['cvp_formed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dealing_with_toleration_timer'] += 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: Despite not being in government, we can still provide support.
    = Dealing with Toleration
    We are currently acting as external support to the government of Chancellor [+ chancellor +]. How should we use our position?
  `,
  choices: [
    {
      id: "break_toleration",
      text: "break_toleration",
      nextSceneId: "break_toleration",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "urge_against_austerity",
      text: "urge_against_austerity",
      nextSceneId: "urge_against_austerity",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "urge_against_austerity_limited",
      text: "urge_against_austerity_limited",
      nextSceneId: "urge_against_austerity_limited",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "urge_paramilitary",
      text: "urge_paramilitary",
      nextSceneId: "urge_paramilitary",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "improve_relations",
      text: "improve_relations",
      nextSceneId: "improve_relations",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "stay_course",
      text: "Stay the course, for stability's sake.",
      nextSceneId: "stay_course",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _break_toleration: Scene = {
  id: "break_toleration",
  title: "End the toleration agreement with a vote of no confidence!",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['constructive_vonc']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Are we sure about this? A vote of no confidence would trigger new elections, and potentially an increased vote-share for the extremist parties. [? if in_weimar_coalition_prussia or in_grand_coalition_prussia or in_popular_front_prussia: The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] also threatens a no-confidence vote against us in Prussia, pressuring us to stay the course.?]
  `,
  choices: [
    {
      id: "vonc",
      text: "Yes, end this arrangement!",
      nextSceneId: "vonc",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "stay_course",
      text: "No, we should stay the course.",
      nextSceneId: "stay_course",
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

export const _vonc: Scene = {
  id: "vonc",
  title: "vonc",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['spd_in_government'] = 0; state.flags['spd_toleration'] = 0; state.flags['spd_toleration_right'] = 0; state.flags['in_grand_coalition'] = 0; state.flags['chancellor'] = "Brüning"; state.flags['chancellor_party'] = "Z";if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; state.flags['left_strength'] += 8; state.flags['pro_republic'] -= 5; state.flags['new_middle_spd'] -= 3; state.flags['rural_spd'] -= 3; state.flags['old_middle_spd'] -= 3; state.flags['catholics_spd'] -= 3; state.flags['reformist_dissent'] += 5; state.flags['left_dissent'] -= 5; state.flags['dvp_relation'] -= 4; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['ddp_right'] += 1; state.flags['dvp_right'] += 2; state.flags['spd_break_toleration'] += 1; 
  },

  

  render: `
    We have called for a vote of no confidence, and have brought down this government. Chancellor [+ chancellor +] currently rules as acting chancellor.
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

export const _urge_against_austerity: Scene = {
  id: "urge_against_austerity",
  title: "Urge the coalition against austerity politics, and to increase social spending.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _urge_success: Scene = {
  id: "urge_success",
  title: "urge_success",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['welfare'] += 1; state.flags['budget'] -= 1; state.flags['workers_spd'] += 5*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 5*(1-state.flags['dissent']); state.flags['new_middle_ddp'] += 1; state.flags['old_middle_ddp'] += 1; state.flags['new_middle_dvp'] += 1.5; state.flags['old_middle_dvp'] += 1.5; state.flags['new_middle_other'] += 1.5; state.flags['old_middle_other'] += 1.5; state.flags['new_middle_lvp'] += 3; state.flags['old_middle_lvp'] += 3; state.flags['z_relation'] -= 3; state.flags['dvp_relation'] -= 3; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 3; state.flags['reformist_dissent'] -= 5; state.flags['center_dissent'] -= 5; state.flags['labor_dissent'] -= 5; state.flags['dvp_right'] += 1; state.flags['ddp_right'] += 0.5; state.flags['lvp_right'] += 1; state.flags['hindenburg_angry_bruning'] += 10; state.flags['economic_growth'] += 0.2; state.flags['unemployed'] -= 0.2; 
  },

  

  render: `
    We have successfully urged the coalition parties to increase social spending! Unfortunately, the center-right parties increasingly see us as a nuisance, and might not wish to continue these negotiations. [? if president == "Hindenburg": President Hindenburg is also losing patience with Brüning for yielding to our demands.?]
  `,
  choices: [
    
  ]
};

export const _urge_failure: Scene = {
  id: "urge_failure",
  title: "urge_failure",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] -= 3; state.flags['dvp_relation'] -= 3; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 3; 
  },

  

  render: `
    Unfortunately, our negotiations have met with failure. The center-right parties increasingly see us as a nuisance, and might not wish to continue these negotiations.
  `,
  choices: [
    
  ]
};

export const _urge_against_austerity_limited: Scene = {
  id: "urge_against_austerity_limited",
  title: "Attempt to pressure Brüning to curb the worse excesses of his austerity policies. ",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _urge_success_limited: Scene = {
  id: "urge_success_limited",
  title: "urge_success_limited",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['bruning_austerity_limited'] += 1; state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']);if (state.flags['bruning_austerity_limited'] >= 3) { state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); }; state.flags['new_middle_ddp'] += 1; state.flags['old_middle_ddp'] += 1; state.flags['new_middle_dvp'] += 1; state.flags['old_middle_dvp'] += 1; state.flags['new_middle_other'] += 1; state.flags['old_middle_other'] += 1; state.flags['new_middle_nsdap'] -= 2; state.flags['old_middle_nsdap'] -= 2; state.flags['new_middle_lvp'] += 2; state.flags['old_middle_lvp'] += 2; state.flags['z_relation'] -= 3; state.flags['reformist_dissent'] -= 3; state.flags['center_dissent'] -= 3; state.flags['labor_dissent'] -= 3; state.flags['dvp_right'] += 1; state.flags['ddp_right'] += 0.5; state.flags['lvp_right'] += 1; state.flags['hindenburg_angry_bruning'] += 5; state.flags['economic_growth'] += 0.1; state.flags['unemployed'] -= 0.1; 
  },

  

  render: `
    We have successfully pressured Brüning to tone down the severity of his austerity policies in his emergency decrees. Unfortunately, the center-right parties increasingly see us as a nuisance, and will attempt to force Brüning to form a majority coalition with the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> instead. [? if president == "Hindenburg": President Hindenburg is also losing patience with Brüning for yielding to our demands.?]
    [? if bruning_austerity_limited == 1: We have successfully prevented Brüning from decreasing taxes on high earners, lessening the burden of compensatory tax increases on the lower strata. ?][? if bruning_austerity_limited == 2: We have successfully pressured Brüning into attempting to appease us by reinstating the 40-hour workweek, however wages themselves remains suboptimal. ?][? if bruning_austerity_limited >= 3: We have successfully pressured Brüning in reversing some salary cuts to civil servants. ?]
  `,
  choices: [
    
  ]
};

export const _urge_paramilitary: Scene = {
  id: "urge_paramilitary",
  title: "Urge Brüning to grant us stronger actions against political extremists, and to restrict certain rights.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['political_decree'] < 2 && ! state.flags['sa_nationwide_ban']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['political_decree'] += 1; state.flags['prussian_police_loyalty'] += 0.04; state.flags['prussian_police_strength'] += 5; state.flags['kpd_relation'] -= 6; state.flags['rfb_militancy'] *= 0.9; state.flags['rfb_strength'] *= 0.85; state.flags['sa_militancy'] *= 0.96; state.flags['sa_strength'] *= 0.96; state.flags['sh_militancy'] *= 0.98; state.flags['sh_strength'] *= 0.98; state.flags['workers_kpd'] -= 1; state.flags['workers_nsdap'] -= 1; state.flags['unemployed_kpd'] -= 3; state.flags['unemployed_nsdap'] -= 3; state.flags['new_middle_nsdap'] -= 2; state.flags['hindenburg_angry_bruning'] += 5; 
  },

  

  render: `
    Carl Severing and other Prussian officials have successfully urged Brüning to issue an emergency decree expanding police authority to suppress political extremism. The decree imposes restrictions on political meetings, organizations, newspapers, and posters, all of which now require police approval beforehand.
    As a result, several <span style="color: #7A3C00;">Nazi</span> and <span style="color: #700000;">Communist</span> newspapers have been banned, triggering violent clashes between their supporters and the police. [? if president == "Hindenburg": President Hindenburg has reluctantly signed the decree, but is losing patience with Brüning for yielding to our demands. ?]
  `,
  choices: [
    
  ]
};

export const _improve_relations: Scene = {
  id: "improve_relations",
  title: "Improve relations with the parties of the coalition.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] += 5*(1-state.flags['dissent']); state.flags['dvp_relation'] += 4*(1-state.flags['dissent']); state.flags['ddp_relation'] += 4*(1-state.flags['dissent']); state.flags['lvp_relation'] += 4*(1-state.flags['dissent']); state.flags['left_dissent'] += 5; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_left'] += 1; 
  },

  

  render: `
    We have increased our level of contact and discussions with the parties of the coalition, primarily the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] [? if not lvp_formed and dvp_exist:and <span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed:and <span style="color: #FFCC00;">**LVP**</span>?].
    Our attempts to reach out to the center-right are met with disdain by leftists within our party.
  `,
  choices: [
    
  ]
};

export const _stay_course: Scene = {
  id: "stay_course",
  title: "stay_course",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We will stay the course of toleration, for the sake of stability.
  `,
  choices: [
    
  ]
};

export const _dealing_with_toleration_cvp: Scene = {
  id: "dealing_with_toleration_cvp",
  title: "Dealing with Toleration",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['dealing_with_toleration_timer'] == 0 && state.flags['spd_toleration'] && state.flags['chancellor_party'] == "Z" && state.flags['cvp_formed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dealing_with_toleration_timer'] += 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: Despite not being in government, we can still provide support.
    = Dealing with Toleration
    We are currently providing external support to the government of Chancellor [+ chancellor +], but our influence has been severely weakened due to the formation of the <span style="color: #000000;">**[+ z_party_name +]**</span> by former <span style="color: #3E88B3;">**DNVP**</span> members. Furthermore, the <span style="color: #000000;">**[+ z_party_name +]**</span> is actively trying to distance itself from our support. How should we use our position?
  `,
  choices: [
    {
      id: "break_toleration",
      text: "break_toleration",
      nextSceneId: "break_toleration",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "urge_against_austerity_limited",
      text: "urge_against_austerity_limited",
      nextSceneId: "urge_against_austerity_limited",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "improve_relations",
      text: "improve_relations",
      nextSceneId: "improve_relations",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "stay_course",
      text: "Stay the course, for stability's sake.",
      nextSceneId: "stay_course",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _break_toleration_2: Scene = {
  id: "break_toleration",
  title: "End the toleration agreement with a vote of no confidence!",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['constructive_vonc']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Are we sure about this? A vote of no confidence would trigger new elections, and potentially an increased vote-share for the extremist parties. [? if in_weimar_coalition_prussia or in_grand_coalition_prussia or in_popular_front_prussia: The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] also threatens a no-confidence vote against us in Prussia, pressuring us to stay the course.?]
  `,
  choices: [
    {
      id: "vonc",
      text: "Yes, end this arrangement!",
      nextSceneId: "vonc",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "stay_course",
      text: "No, we should stay the course.",
      nextSceneId: "stay_course",
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

export const _vonc_2: Scene = {
  id: "vonc",
  title: "vonc",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['spd_in_government'] = 0; state.flags['spd_toleration'] = 0; state.flags['spd_toleration_right'] = 0; state.flags['in_grand_coalition'] = 0; state.flags['chancellor'] = "Brüning"; state.flags['chancellor_party'] = "Z";if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; state.flags['left_strength'] += 8; state.flags['pro_republic'] -= 5; state.flags['new_middle_spd'] -= 3; state.flags['rural_spd'] -= 3; state.flags['old_middle_spd'] -= 3; state.flags['catholics_spd'] -= 3; state.flags['reformist_dissent'] += 5; state.flags['left_dissent'] -= 5; state.flags['dvp_relation'] -= 4; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['ddp_right'] += 1; state.flags['dvp_right'] += 2; 
  },

  

  render: `
    We have called for a vote of no confidence, and have brought down this government. Chancellor [+ chancellor +] currently rules as acting chancellor.
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

export const _urge_failure_2: Scene = {
  id: "urge_failure",
  title: "urge_failure",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dvp_relation'] -= 3; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 3; state.flags['cvp_left'] += 1; state.flags['workers_z'] -= 2; state.flags['workers_spd'] += 2; state.flags['unemployed_z'] -= 2; state.flags['unemployed_spd'] += 2; 
  },

  

  render: `
    Unfortunately, the historically strict party discipline of the <span style="color: #000000;">Center Party</span> has carried over to its successor, which has successfully rallied the party against the bill. However, this is sure to spark discontent within the party, as it struggles to maintain its diverse coalition while also attempting to implement its fiscal reform policy.
  `,
  choices: [
    
  ]
};

export const _urge_against_austerity_limited_2: Scene = {
  id: "urge_against_austerity_limited",
  title: "Put forth a proposal to increase welfare spending and reverse austerity cuts.",
  subtitle: "This move will drive a wedge between the <span style=\"color: #000000;\">**[+ z_party_name +]**</span> and their Labor and <span style=\"color: #FF7F00;\">Christian Left</span> factions.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _urge_success_limited_2: Scene = {
  id: "urge_success_limited",
  title: "urge_success_limited",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['bruning_austerity_limited'] += 1; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']);if (state.flags['bruning_austerity_limited'] >= 3) { state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); }; state.flags['new_middle_ddp'] += 2; state.flags['old_middle_ddp'] += 2; state.flags['new_middle_dvp'] += 2; state.flags['old_middle_dvp'] += 2; state.flags['new_middle_nsdap'] -= 2; state.flags['old_middle_nsdap'] -= 2; state.flags['new_middle_lvp'] += 2; state.flags['old_middle_lvp'] += 2; state.flags['z_relation'] -= 3; state.flags['reformist_dissent'] -= 5; state.flags['center_dissent'] -= 3; state.flags['labor_dissent'] -= 5; state.flags['dvp_right'] += 1; state.flags['ddp_right'] += 0.5; state.flags['lvp_right'] += 1; state.flags['hindenburg_angry_bruning'] += 10; state.flags['economic_growth'] += 0.2; state.flags['unemployed'] -= 0.2; state.flags['cvp_left'] += 2; 
  },

  

  render: `
    The motion passes! Despite the historically strict party discipline within the former <span style="color: #000000;">Center</span>, the diverse base of the party has weakened the leadership’s control over its parliamentary delegation. However, this has left the incumbent cabinet vulnerable to strong attacks from the <span style="color: #7A3C00;">far</span>-<span style="color: #003755;">right</span>, as it further cements their association with the <span style="color: #c00000;">socialists</span> in the eyes of their industrial backers.
    [? if bruning_austerity_limited == 1: We have successfully prevented Brüning from decreasing taxes on high earners, thus lessening the burden of compensatory tax increases on the lower strata. ?][? if bruning_austerity_limited == 2: We have successfully pressured Brüning into appeasing us by reinstating the 40-hour workweek, although wages remain suboptimal. ?][? if bruning_austerity_limited >= 3: We have successfully pressured Brüning into reversing some salary cuts for civil servants. ?]
  `,
  choices: [
    
  ]
};

export const _improve_relations_2: Scene = {
  id: "improve_relations",
  title: "Improve relations with the parties of the coalition.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] += 4*(1-state.flags['dissent']); state.flags['dvp_relation'] += 3*(1-state.flags['dissent']); state.flags['ddp_relation'] += 3*(1-state.flags['dissent']); state.flags['lvp_relation'] += 3*(1-state.flags['dissent']); state.flags['left_dissent'] += 5; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_left'] += 1;if (state.flags['spd_toleration_right']) { state.flags['dnvp_angry'] += 1; } 
  },

  

  render: `
    We have increased our level of contact and discussions with the parties of the coalition, primarily the [? if not lvp_formed and dvp_exist:and <span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed:and <span style="color: #FFCC00;">**LVP**</span>?] and, to some extent, the <span style="color: #000000;">**CVP**</span>. However, the <span style="color: #3E88B3;">nationalist</span> elements of the <span style="color: #000000;">**CVP**</span> continue to obstruct our efforts to foster constructive cooperation with Brüning.
    Our attempts to reach out to the center-right are met with disdain from the leftists within our party.
  `,
  choices: [
    
  ]
};

export const _stay_course_2: Scene = {
  id: "stay_course",
  title: "stay_course",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We will stay the course of toleration, for the sake of stability.
  `,
  choices: [
    
  ]
};

export const _dealing_with_toleration_right: Scene = {
  id: "dealing_with_toleration_right",
  title: "Dealing with Toleration",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['dealing_with_toleration_timer'] == 0 && state.flags['spd_toleration'] && state.flags['spd_toleration_right'] && state.flags['chancellor_party'] == "Z" && ! state.flags['cvp_formed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dealing_with_toleration_timer'] += 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: Despite not being in government, we can still provide support.
    = Dealing with Toleration
    We are currently acting as external support to the government of Chancellor [+ chancellor +], although our influence is weakened by his inclusion of [? if not cvp_formed: the?][? if cvp_formed: former?] <span style="color: #3E88B3;">**DNVP**</span>[? if cvp_formed:&nbsp;members?]. How should we use our position?
  `,
  choices: [
    {
      id: "break_toleration",
      text: "break_toleration",
      nextSceneId: "break_toleration",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "urge_against_austerity",
      text: "urge_against_austerity",
      nextSceneId: "urge_against_austerity",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "urge_against_austerity_limited",
      text: "urge_against_austerity_limited",
      nextSceneId: "urge_against_austerity_limited",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "urge_paramilitary",
      text: "urge_paramilitary",
      nextSceneId: "urge_paramilitary",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "improve_relations",
      text: "improve_relations",
      nextSceneId: "improve_relations",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "stay_course",
      text: "Stay the course, for stability's sake.",
      nextSceneId: "stay_course",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _break_toleration_3: Scene = {
  id: "break_toleration",
  title: "End the toleration agreement with a vote of no confidence!",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['constructive_vonc']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Are we sure about this? A vote of no confidence would trigger new elections, and potentially an increased vote-share for the extremist parties. [? if in_weimar_coalition_prussia or in_grand_coalition_prussia or in_popular_front_prussia: The [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] also threatens a no-confidence vote against us in Prussia, pressuring us to stay the course.?]
  `,
  choices: [
    {
      id: "vonc",
      text: "Yes, end this arrangement!",
      nextSceneId: "vonc",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "stay_course",
      text: "No, we should stay the course.",
      nextSceneId: "stay_course",
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

export const _vonc_3: Scene = {
  id: "vonc",
  title: "vonc",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['spd_in_government'] = 0; state.flags['spd_toleration'] = 0; state.flags['spd_toleration_right'] = 0; state.flags['in_grand_coalition'] = 0; state.flags['chancellor'] = "Brüning"; state.flags['chancellor_party'] = "Z";if (state.flags['next_election_time'] > state.flags['time']+3) { state.flags['next_election_time'] = state.flags['time'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+3) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; state.flags['left_strength'] += 8; state.flags['pro_republic'] -= 5; state.flags['new_middle_spd'] -= 3; state.flags['rural_spd'] -= 3; state.flags['old_middle_spd'] -= 3; state.flags['catholics_spd'] -= 3; state.flags['reformist_dissent'] += 5; state.flags['left_dissent'] -= 5; state.flags['dvp_relation'] -= 4; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['ddp_right'] += 1; state.flags['dvp_right'] += 2; 
  },

  

  render: `
    We have called for a vote of no confidence, and have brought down this government. Chancellor [+ chancellor +] currently rules as acting chancellor.
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

export const _urge_against_austerity_2: Scene = {
  id: "urge_against_austerity",
  title: "Urge the coalition against austerity politics, and to increase social spending.",
  subtitle: "This will be significantly more difficult with the <span style=\"color: #3E88B3;\">DNVP</span> in government.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _urge_success_2: Scene = {
  id: "urge_success",
  title: "urge_success",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['welfare'] += 1; state.flags['budget'] -= 1; state.flags['workers_spd'] += 5*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 5*(1-state.flags['dissent']); state.flags['new_middle_ddp'] += 1; state.flags['old_middle_ddp'] += 1; state.flags['new_middle_dvp'] += 1.5; state.flags['old_middle_dvp'] += 1.5; state.flags['new_middle_other'] += 1.5; state.flags['old_middle_other'] += 1.5; state.flags['new_middle_lvp'] += 3; state.flags['old_middle_lvp'] += 3; state.flags['z_relation'] -= 3; state.flags['dvp_relation'] -= 3; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 3; state.flags['reformist_dissent'] -= 5; state.flags['center_dissent'] -= 5; state.flags['labor_dissent'] -= 5; state.flags['dvp_right'] += 1; state.flags['ddp_right'] += 0.5; state.flags['lvp_right'] += 1; state.flags['hindenburg_angry_bruning'] += 10; state.flags['economic_growth'] += 0.2; state.flags['unemployed'] -= 0.2; state.flags['dnvp_angry'] += 1;if (state.flags['spd_toleration_right']) { state.flags['dnvp_angry'] += 2; } 
  },

  

  render: `
    We have successfully urged the coalition parties to increase social spending! Unfortunately, the center-right parties increasingly see us as a nuisance, and might not wish to continue these negotiations. [? if president == "Hindenburg": President Hindenburg is also losing patience with Brüning for yielding to our demands.?]
  `,
  choices: [
    
  ]
};

export const _urge_failure_3: Scene = {
  id: "urge_failure",
  title: "urge_failure",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] -= 3; state.flags['dvp_relation'] -= 3; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 3; 
  },

  

  render: `
    Unfortunately, our negotiations have met with failure. The center-right parties increasingly see us as a nuisance, and might not wish to continue these negotiations.
  `,
  choices: [
    
  ]
};

export const _urge_against_austerity_limited_3: Scene = {
  id: "urge_against_austerity_limited",
  title: "Attempt to pressure Brüning to curb the worse excesses of his austerity policies. ",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _urge_success_limited_3: Scene = {
  id: "urge_success_limited",
  title: "urge_success_limited",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['bruning_austerity_limited'] += 1; state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']);if (state.flags['bruning_austerity_limited'] >= 3) { state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); }; state.flags['new_middle_ddp'] += 1; state.flags['old_middle_ddp'] += 1; state.flags['new_middle_dvp'] += 1; state.flags['old_middle_dvp'] += 1; state.flags['new_middle_other'] += 1; state.flags['old_middle_other'] += 1; state.flags['new_middle_nsdap'] -= 2; state.flags['old_middle_nsdap'] -= 2; state.flags['new_middle_lvp'] += 2; state.flags['old_middle_lvp'] += 2; state.flags['z_relation'] -= 3; state.flags['reformist_dissent'] -= 3; state.flags['center_dissent'] -= 3; state.flags['labor_dissent'] -= 3; state.flags['dvp_right'] += 1; state.flags['ddp_right'] += 0.5; state.flags['lvp_right'] += 1; state.flags['hindenburg_angry_bruning'] += 5; state.flags['economic_growth'] += 0.1; state.flags['unemployed'] -= 0.1;if (state.flags['spd_toleration_right']) { state.flags['dnvp_angry'] += 1; } 
  },

  

  render: `
    We have successfully pressured Brüning to tone down the severity of his austerity policies in his emergency decrees. Unfortunately, the center-right parties increasingly see us as a nuisance, and will attempt to force Brüning to form a majority coalition with the <span style="color: #7A3C00;">far</span>-<span style="color: #003755;">right</span> instead. [? if president == "Hindenburg": President Hindenburg is also losing patience with Brüning for yielding to our demands.?]
    [? if bruning_austerity_limited == 1: We have successfully prevented Brüning from decreasing taxes on high earners, lessening the burden of compensatory tax increases on the lower strata. ?][? if bruning_austerity_limited == 2: We have successfully pressured Brüning into attempting to appease us by reinstating the 40-hour workweek, however wages themselves remains suboptimal. ?][? if bruning_austerity_limited >= 3: We have successfully pressured Brüning in reversing some salary cuts to civil servants. ?]
  `,
  choices: [
    
  ]
};

export const _urge_paramilitary_2: Scene = {
  id: "urge_paramilitary",
  title: "Urge Brüning to grant us stronger actions against political extremists, and to restrict certain rights.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['political_decree'] < 2 && ! state.flags['sa_nationwide_ban']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['political_decree'] += 1; state.flags['prussian_police_loyalty'] += 0.04; state.flags['prussian_police_strength'] += 5; state.flags['kpd_relation'] -= 6; state.flags['rfb_militancy'] *= 0.9; state.flags['rfb_strength'] *= 0.85; state.flags['sa_militancy'] *= 0.96; state.flags['sa_strength'] *= 0.96; state.flags['sh_militancy'] *= 0.98; state.flags['sh_strength'] *= 0.98; state.flags['workers_kpd'] -= 1; state.flags['workers_nsdap'] -= 1; state.flags['unemployed_kpd'] -= 3; state.flags['unemployed_nsdap'] -= 3; state.flags['new_middle_nsdap'] -= 2; state.flags['hindenburg_angry_bruning'] += 5; 
  },

  

  render: `
    Carl Severing and other Prussian officials have successfully urged Brüning to issue an emergency decree expanding police authority to suppress political extremism. The decree imposes restrictions on political meetings, organizations, newspapers, and posters, all of which now require police approval beforehand.
    As a result, several <span style="color: #7A3C00;">Nazi</span> and <span style="color: #700000;">Communist</span> newspapers have been banned, triggering violent clashes between their supporters and the police. [? if president == "Hindenburg": President Hindenburg has reluctantly signed the decree, but is losing patience with Brüning for yielding to our demands. ?]
  `,
  choices: [
    
  ]
};

export const _improve_relations_3: Scene = {
  id: "improve_relations",
  title: "Improve relations with the parties of the coalition.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] += 4*(1-state.flags['dissent']); state.flags['dvp_relation'] += 3*(1-state.flags['dissent']); state.flags['ddp_relation'] += 3*(1-state.flags['dissent']); state.flags['lvp_relation'] += 3*(1-state.flags['dissent']); state.flags['left_dissent'] += 5; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_left'] += 1;if (state.flags['spd_toleration_right']) { state.flags['dnvp_angry'] += 1; } 
  },

  

  render: `
    We have increased our level of contact and discussions with the parties of the coalition, primarily the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] [? if not lvp_formed and dvp_exist:and <span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed:and <span style="color: #FFCC00;">**LVP**</span>?]. The <span style="color: #3E88B3;">**DNVP**</span> does its best to obstruct our efforts at constructive cooperation with Brüning.
    Our attempts to reach out to the center-right are met with disdain by leftists within our party.
  `,
  choices: [
    
  ]
};

export const _stay_course_3: Scene = {
  id: "stay_course",
  title: "stay_course",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We will stay the course of toleration, for the sake of stability.
  `,
  choices: [
    
  ]
};

export const _deport_hitler: Scene = {
  id: "deport_hitler",
  title: "We can deport Hitler.",
  subtitle: "He is a foreign citizen and a criminal, after all.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && state.flags['hitler_deported'] == 0 && state.flags['chancellor'] != "Papen" && state.flags['chancellor'] != "Schleicher" && state.flags['investigate_far_right'] >= 2);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Is it really that simple? Won't his supporters react violently to this suggestion? And even if the deportation does succeed, won't he just re-enter the country, or perhaps organize from Austria? And, some people consider this to be an anti-democratic abuse of power, using the law in order to target a political opponent.
  `,
  choices: [
    {
      id: "deport",
      text: "Deport him!",
      nextSceneId: "deport",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "no_deport",
      text: "No, we must not.",
      nextSceneId: "no_deport",
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

export const _deport: Scene = {
  id: "deport",
  title: "deport",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _deport_violence: Scene = {
  id: "deport_violence",
  title: "deport_violence",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    When the police approach, he is surrounded by his <span style="color: #7A3C00;">**SA**</span> guards, preventing him from being extricated! We can attempt to force a confrontation, but that may have negative consequences. The Reichsbanner may also attempt to draw off the <span style="color: #7A3C00;">**SA**</span>.
  `,
  choices: [
    {
      id: "force_approach",
      text: "Force the approach!",
      nextSceneId: "force_approach",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "no_deport",
      text: "Cancel the deportation.",
      nextSceneId: "no_deport",
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

export const _force_approach: Scene = {
  id: "force_approach",
  title: "force_approach",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             var total_allied_strength = Q.rb_strength*Q.rb_militancy + Q.prussian_police_strength*Q.prussian_police_militancy*Q.prussian_police_loyalty;
var enemy_strength = Q.sa_strength*Q.sa_militancy;
console.log('Deporting Hitler - force approach');
console.log(total_allied_strength, enemy_strength);
if (total_allied_strength > enemy_strength) {
    Q.deportation_success = 1;
} else {
    Q.deportation_success = 0;
} 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _force_fail: Scene = {
  id: "force_fail",
  title: "force_fail",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] += 50; state.flags['workers_nsdap'] += 5; state.flags['unemployed_nsdap'] += 5; state.flags['new_middle_nsdap'] += 5; state.flags['old_middle_nsdap'] += 5; state.flags['rural_nsdap'] += 5; state.flags['coup_progress'] += 3; state.flags['pro_republic'] -= 5; 
  },

  

  render: `
    Unfortunately, our forces fail to dislodge the <span style="color: #7A3C00;">**SA**</span> from their positions surrounding Hitler. He is seen as both a strong and powerful leader and a victim, further reinforcing his image. The <span style="color: #7A3C00;">Nazis</span> are left stronger than ever.
  `,
  choices: [
    
  ]
};

export const _force_success: Scene = {
  id: "force_success",
  title: "force_success",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['hitler_deported'] = 1; state.flags['sa_strength'] = state.flags['sa_strength']/2; state.flags['workers_nsdap'] *= 0.7; state.flags['new_middle_nsdap'] *= 0.7; state.flags['old_middle_nsdap'] *= 0.7; state.flags['rural_nsdap'] *= 0.7; state.flags['unemployed_nsdap'] *= 0.7;if (! state.flags['sa_banned']) { state.flags['interior_goal_prussia'] -= 1; }; state.flags['sa_banned'] = 1; state.flags['coup_progress'] -= 2; state.flags['nsdap_leader'] = "Goebbels"; state.flags['nsdap_chancellor'] = "Göring"; state.flags['pro_republic'] += 10; 
  },

  

  render: `
    The confrontation ends with the police and Reichsbanner prevailing, capturing Hitler so he can be deported! This is a sign of weakness, and his physical distance makes organizing difficult, impeding the <span style="color: #7A3C00;">Nazi</span> effort to win more votes.
    In Hitler's absence, Joseph Goebbels has become the temporary leader of the <span style="color: #7A3C00;">Nazi</span> party, with substantial influence from Hermann Göring.
  `,
  choices: [
    
  ]
};

export const _deport_success: Scene = {
  id: "deport_success",
  title: "deport_success",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['hitler_deported'] = 1; state.flags['sa_strength'] = state.flags['sa_strength']/2; state.flags['workers_nsdap'] *= 0.7; state.flags['new_middle_nsdap'] *= 0.7; state.flags['old_middle_nsdap'] *= 0.7; state.flags['rural_nsdap'] *= 0.7; state.flags['unemployed_nsdap'] *= 0.7;if (! state.flags['sa_banned']) { state.flags['interior_goal_prussia'] -= 1; }; state.flags['sa_banned'] = 1; state.flags['coup_progress'] -= 2; state.flags['nsdap_leader'] = "Goebbels"; state.flags['nsdap_chancellor'] = "Göring"; state.flags['pro_republic'] += 10; 
  },

  

  render: `
    Somehow, the plan worked! There was minimal resistance to Hitler's deportation. This is a sign of weakness, and his physical distance makes organizing difficult, impeding the <span style="color: #7A3C00;">Nazi</span> effort to win more votes.
    In Hitler's absence, Joseph Goebbels has become the temporary leader of the <span style="color: #7A3C00;">Nazi</span> party, with substantial influence from Hermann Göring.
  `,
  choices: [
    
  ]
};

export const _no_deport: Scene = {
  id: "no_deport",
  title: "no_deport",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We will not be deporting Hitler.
  `,
  choices: [
    
  ]
};

export const _domestic_enemies: Scene = {
  id: "domestic_enemies",
  title: "Investigating Domestic Enemies",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['interior_minister_party'] == "SPD");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    #card-image: img/portraits/SeveringCarl.jpg
    #is-card: true
    #new-page: true
    # this is not a card...
    = Investigating Domestic Enemies
    As we have control over the Interior Ministry, we can direct police and intelligence services to investigate internal enemies. We can proscribe various organizations.
  `,
  choices: [
    {
      id: "deport_hitler",
      text: "deport_hitler",
      nextSceneId: "deport_hitler",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sa",
      text: "Ban the <span style=\"color: #7A3C00;\">**SA**</span>.",
      nextSceneId: "ban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_sa",
      text: "Unban the <span style=\"color: #7A3C00;\">**SA**</span>.",
      nextSceneId: "unban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "persecute_sa",
      text: "persecute_sa",
      nextSceneId: "persecute_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sh",
      text: "Ban the <span style=\"color: #3E88B3;\">**Stahlhelm**</span>.",
      nextSceneId: "ban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_sh",
      text: "Unban the <span style=\"color: #3E88B3;\">**Stahlhelm**</span>.",
      nextSceneId: "unban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "persecute_sh",
      text: "persecute_sh",
      nextSceneId: "persecute_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_rfb",
      text: "Ban the <span style=\"color: #700000;\">Communist</span> <span style=\"color: #8B0000;\">**RFB**</span>.",
      nextSceneId: "ban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_rfb",
      text: "Unban the <span style=\"color: #8B0000;\">**RFB**</span>.",
      nextSceneId: "unban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "persecute_rfb",
      text: "persecute_rfb",
      nextSceneId: "persecute_rfb",
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
      text: "Take no action for now.",
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

export const _ban_sa: Scene = {
  id: "ban_sa",
  title: "ban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && state.flags['sa_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.85;if (state.flags['interior_police_loyalty'] >= 0.7) { state.flags['sa_strength'] *= 0.7; };if (state.flags['interior_police_loyalty'] >= 0.7) { state.flags['sa_banned_pro'] = 1; };if (state.flags['interior_police_loyalty'] < 0.7) { state.flags['sa_banned_pro'] = 0; }; state.flags['sa_banned'] = 1; state.flags['dvp_relation'] -= 3; state.flags['prussian_police_loyalty'] -= 0.05; state.flags['interior_police_loyalty'] -= 0.05; state.flags['sa_militancy'] -= 0.05; state.flags['sa_ban_timer'] = 6; state.flags['sa_coup_progress'] = state.flags['coup_progress'];if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 2; }; state.flags['interior_goal_prussia'] -= 1; 
  },

  

  render: `
    As it turns out, the <span style="color: #7A3C00;">Nazi</span> <span style="color: #7A3C00;">**SA**</span> has many allies in the police and bureaucracy. Our relationship with the police weakens, and the <span style="color: #7A3C00;">**SA**</span> can still organize illegally, right under the police's noses. [? if sa_banned_pro : Nevertheless, the <span style="color: #7A3C00;">**SA**</span> is substantially weakened by our ban. ?]
    [? if coup_progress >= 6: There are reports of an imminent coup by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. We have disrupted some of these plans, but the threat is still present. ?]
  `,
  choices: [
    
  ]
};

export const _unban_sa: Scene = {
  id: "unban_sa",
  title: "unban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sa_banned'] == 1 && state.flags['in_popular_front_prussia'] == 0 && state.flags['in_left_front_prussia'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_banned'] = 0; state.flags['sa_strength'] += 100; state.flags['sa_militancy'] += 0.05;if (state.flags['sa_coup_progress'] >= 6) { state.flags['coup_progress'] += 2; } 
  },

  

  render: `
    The <span style="color: #7A3C00;">**SA**</span> is no longer banned. They immediately go on a recruiting spree.
  `,
  choices: [
    
  ]
};

export const _persecute_sa: Scene = {
  id: "persecute_sa",
  title: "Further persecute the <span style=\"color: #7A3C00;\">**SA**</span>.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sa_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.7; state.flags['sa_militancy'] -= 0.05;if (state.flags['coup_progress'] >= 4) { state.flags['coup_progress'] -= 2; } 
  },

  

  render: `
    We have arrested more of the <span style="color: #7A3C00;">**SA**</span>'s leaders and confiscated their weapons.
    [? if coup_progress >= 4: There are reports of a planned coup by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. We have cracked down on some of these plans, but the threat still lingers. ?]
  `,
  choices: [
    
  ]
};

export const _ban_sh: Scene = {
  id: "ban_sh",
  title: "ban_sh",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_strength'] *= 0.85;if (state.flags['interior_police_loyalty'] >= 0.7) { state.flags['sh_strength'] *= 0.7; }; state.flags['sh_banned'] = 1; state.flags['dvp_relation'] -= 5; state.flags['prussian_police_loyalty'] -= 0.1; state.flags['interior_police_loyalty'] -= 0.05;if (state.flags['spd_in_government'] == 1 && state.flags['in_grand_coalition'] == 1 && state.flags['president'] == "Hindenburg") { state.flags['coalition_dissent'] += 1; };if (state.flags['in_social_catholic_coalition_prussia'] && state.flags['cvp_formed']) { state.flags['coalition_dissent'] += 1; }; state.flags['sh_ban_timer'] = 6; state.flags['sh_coup_progress'] = state.flags['coup_progress'];if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 1; }; state.flags['hindenburg_angry'] += 8; state.flags['interior_goal_prussia'] -= 1; 
  },

  

  render: `
    [? if president == "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with President Hindenburg, as well as the political right and the police. ?][? if president != "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with the political right and the police. ?] [? if spd_in_government = 1 and in_grand_coalition = 1 and president = "Hindenburg" : It also weakens our coalition due to the influence of Hindenburg on the right wing of our coalition. ?] In addition, the <span style="color: #3E88B3;">**Stahlhelm**</span> still operates out of public sight.
  `,
  choices: [
    
  ]
};

export const _unban_sh: Scene = {
  id: "unban_sh",
  title: "unban_sh",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 1 && state.flags['in_popular_front_prussia'] == 0 && state.flags['in_left_front_prussia'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_banned'] = 0; state.flags['sh_strength'] += 100;if (state.flags['sh_coup_progress'] >= 6) { state.flags['coup_progress'] += 2; }; state.flags['hindenburg_angry'] -= 5; 
  },

  

  render: `
    The <span style="color: #3E88B3;">**Stahlhelm**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _persecute_sh: Scene = {
  id: "persecute_sh",
  title: "Further persecute the <span style=\"color: #3E88B3;\">**Stahlhelm**</span>.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_strength'] *= 0.7; state.flags['sh_militancy'] -= 0.05; state.flags['dvp_relation'] -= 5; state.flags['lvp_relation'] -= 3; state.flags['prussian_police_loyalty'] -= 0.1; state.flags['interior_police_loyalty'] -= 0.05;if (state.flags['spd_in_government'] == 1 && state.flags['in_grand_coalition'] == 1 && state.flags['president'] == "Hindenburg") { state.flags['coalition_dissent'] += 1; }; state.flags['dvp_right'] += 1;if (state.flags['coup_progress'] >= 4) { state.flags['coup_progress'] -= 1; }; state.flags['hindenburg_angry'] += 5; 
  },

  

  render: `
    We have arrested more of the <span style="color: #3E88B3;">**Stahlhelm**</span>'s leaders and confiscated their weapons.
    [? if coup_progress >= 4: There are reports of a planned coup by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. We have cracked down on some of these plans, but the threat still lingers. ?]
  `,
  choices: [
    
  ]
};

export const _ban_rfb: Scene = {
  id: "ban_rfb",
  title: "ban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['communist_coalition'] < 3 && state.flags['rfb_banned'] == 0 && state.flags['in_popular_front_prussia'] == 0 && state.flags['in_left_front_prussia'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] -= 15; state.flags['rfb_strength'] -= 50; state.flags['rfb_banned'] = 1; state.flags['communist_coalition'] -= 1; state.flags['z_relation'] += 5; state.flags['dvp_relation'] += 5; state.flags['lvp_relation'] += 5; state.flags['prussian_police_loyalty'] += 0.1; state.flags['interior_police_loyalty'] += 0.1; state.flags['kpd_coalition_dissent'] += 2;if (state.flags['coalition_dissent'] > 0 && state.flags['n_rfb_banned'] == 0) { state.flags['coalition_dissent'] -= 1; }; state.flags['n_rfb_banned'] += 1; state.flags['hindenburg_angry'] -= 8; 
  },

  

  render: `
    The ban is enthusiastically carried out by the police, perhaps too enthusiastically. The <span style="color: #700000;">Communists</span> take this as one more reason why the <span style="color: #c00000;">Socialists</span> are traitors to the left. However, the <span style="color: #000000;">moderate</span> and <span style="color: #C0A054;">center-right</span> parties approve, as do the police.
  `,
  choices: [
    
  ]
};

export const _unban_rfb: Scene = {
  id: "unban_rfb",
  title: "unban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rfb_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rfb_banned'] = 0; state.flags['kpd_relation'] += 5; state.flags['rfb_strength'] += 50; state.flags['prussian_police_loyalty'] -= 0.05; state.flags['interior_police_loyalty'] -= 0.05; state.flags['hindenburg_angry'] += 8; state.flags['rfb_goal_prussia'] -= 1; 
  },

  

  render: `
    The <span style="color: #700000;">Communist</span> <span style="color: #8B0000;">**RFB**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _persecute_rfb: Scene = {
  id: "persecute_rfb",
  title: "Further persecute the <span style=\"color: #8B0000;\">**RFB**</span>.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rfb_banned'] == 1 && state.flags['in_popular_front_prussia'] == 0 && state.flags['in_left_front_prussia'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rfb_strength'] *= 0.7; state.flags['rfb_militancy'] -= 0.05; state.flags['kpd_relation'] -= 10; state.flags['kpd_coalition_dissent'] += 1; state.flags['z_relation'] += 2; state.flags['dvp_relation'] += 2; state.flags['lvp_relation'] += 2; state.flags['prussian_police_loyalty'] += 0.1; state.flags['interior_police_loyalty'] += 0.1;if (state.flags['coalition_dissent'] > 0 && state.flags['n_rfb_persecuted'] == 0) { state.flags['coalition_dissent'] -= 1; }; state.flags['n_rfb_persecuted'] += 1; state.flags['hindenburg_angry'] -= 5; 
  },

  

  render: `
    We have arrested more of the <span style="color: #8B0000;">**RFB**</span>'s leaders and confiscated their weapons.
  `,
  choices: [
    
  ]
};

export const _economic_democracy: Scene = {
  id: "economic_democracy",
  title: "Economic Democracy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] && (state.flags['economic_minister_party'] == "SPD" || state.flags['finance_minister_party'] == "SPD") && (state.flags['labor_minister_party'] == "SPD") && ! state.flags['cvp_economy_accepted'] && state.flags['economic_democracy_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['economic_democracy_timer'] += 10; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: How can we give workers more control over the means of production?
    = Economic Democracy
    A key part of the <span style="color: #c00000;">social democratic</span> platform is that workers should have more control over the economy. This can be done either directly at the enterprise level, by giving works councils greater influence over management, or indirectly via the democratic government, by acquiring key industries from the capitalist class and placing them under democratic control.
    As we control the Labor [? if economic_minister_party == "SPD" : and Economic ?][? if finance_minister_party == "SPD" : and Finance ?] ministries, we can finally begin to implement our long-standing goals. [? if in_grand_coalition or in_weimar_coalition: Our bourgeois coalition partners might not agree, however. ?]
  `,
  choices: [
    {
      id: "expand_councils",
      text: "expand_councils",
      nextSceneId: "expand_councils",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "expand_councils_2",
      text: "expand_councils_2",
      nextSceneId: "expand_councils_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "expand_councils_3",
      text: "expand_councils_3",
      nextSceneId: "expand_councils_3",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nationalize_1",
      text: "nationalize_1",
      nextSceneId: "nationalize_1",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cooperatives_1",
      text: "cooperatives_1",
      nextSceneId: "cooperatives_1",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "return",
      text: "Do not enact any policies for now.",
      nextSceneId: "return",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _expand_councils: Scene = {
  id: "expand_councils",
  title: "Support works councils.",
  subtitle: "Give works councils a greater influence in managing enterprises.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['works_councils'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['economic_democracy'] += 1; state.flags['workers_spd'] += 7*(1-state.flags['dissent']); state.flags['capital_strike_progress'] += 1; state.flags['works_councils'] += 1; state.flags['labor_dissent'] -= 6; state.flags['labor_strength'] += 8; state.flags['dvp_relation'] -= 5; state.flags['lvp_relation'] -= 5; state.flags['ddp_relation'] -= 3; state.flags['coalition_dissent'] += 1; state.flags['dvp_right'] += 2; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['lvp_right'] += 1; state.flags['economy_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1; 
  },

  

  render: `
    The works councils, elected by workers at each major business, have been in place since the German Revolution of 1918, but they have been largely powerless in the face of capital. Now, we will have worker representation on the boards of companies, giving them more influence in management decisions.
  `,
  choices: [
    
  ]
};

export const _expand_councils_2: Scene = {
  id: "expand_councils_2",
  title: "Support national and sectorial works councils.",
  subtitle: "This is a step towards workers' control over the entire economy.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['works_councils'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['economic_democracy'] += 1; state.flags['workers_spd'] += 7*(1-state.flags['dissent']); state.flags['capital_strike_progress'] += 1; state.flags['works_councils'] += 1; state.flags['labor_dissent'] -= 6; state.flags['labor_strength'] += 8; state.flags['dvp_relation'] -= 5; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 5; state.flags['coalition_dissent'] += 1; state.flags['dvp_right'] += 2; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['lvp_right'] += 2; state.flags['economy_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1;if (state.flags['economic_growth'] < 3) { state.flags['economic_growth'] += 0.1; } 
  },

  

  render: `
    National and sectorial workers councils have been part of the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Constitution, but they were disempowered in the past, acting as nothing more than advisory bodies. We can change that.
  `,
  choices: [
    
  ]
};

export const _expand_councils_3: Scene = {
  id: "expand_councils_3",
  title: "Empower sectorial works councils.",
  subtitle: "Give works councils a role in setting wage and price policy for entire industrial sectors.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['works_councils'] == 2);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['economic_democracy'] += 1; state.flags['workers_spd'] += 7*(1-state.flags['dissent']); state.flags['capital_strike_progress'] += 1; state.flags['works_councils'] += 1; state.flags['labor_dissent'] -= 6; state.flags['labor_strength'] += 8; state.flags['dvp_relation'] -= 5; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 5; state.flags['coalition_dissent'] += 1;if (state.flags['unemployed'] > 5) { state.flags['unemployed'] -= 2; }; state.flags['workers'] += 2; state.flags['dvp_right'] += 2; state.flags['ddp_right'] += 1; state.flags['lvp_right'] += 2; state.flags['economy_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1;if (state.flags['economic_growth'] < 3) { state.flags['economic_growth'] += 0.1; };if (state.flags['kpd_leader'] == "Conciliators") { state.flags['economy_goal_completed'] += 1; } 
  },

  

  render: `
    Sectorial works councils can now negotiate wage and price policies for entire economic sectors, helping to both give workers more of a voice, and to rationalize the economy, smoothing over the anarchy of the market.
    [? if kpd_leader == "Conciliators" and kpd_ultimatum_timer: The Conciliators of the <span style="color: #700000;">**KPD**</span> are satisfied with our efforts, happy to count this as part of the 'substantial nationalization of the economy' demand. ?]
  `,
  choices: [
    
  ]
};

export const _nationalize_1: Scene = {
  id: "nationalize_1",
  title: "Begin to socialize key industries.",
  subtitle: "-1 budget - we should buy out industries and govern them together with workers and consumers.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['economic_democracy'] += 1; state.flags['capital_strike_progress'] += 1; state.flags['budget'] -= 1; state.flags['socializations'] += 1; state.flags['workers_spd'] += 6*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); state.flags['coalition_dissent'] += 1;if (state.flags['black_thursday_seen']) { state.flags['capital_strike_progress'] += 1; };if (state.flags['unemployed'] > 9) { state.flags['unemployed'] -= 1; }; state.flags['dvp_relation'] -= 3; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 3; state.flags['dvp_right'] += 1; state.flags['lvp_right'] += 1; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['economy_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1;if (state.flags['economic_growth'] < 5) { state.flags['economic_growth'] += 0.2; };if (state.flags['socializations'] >= 2) { state.flags['economy_goal_completed'] += 1; } 
  },

  

  render: `
    We have begun to socialize key industries by buying out the capitalist owners, and creating coordinated governing boards consisting of worker, consumer, and state representatives. The capitalists are not pleased at our intrusion into the economy.
    [? if kpd_leader == "Conciliators" and socializations >= 2 and kpd_ultimatum_timer: The Conciliators of the <span style="color: #700000;">**KPD**</span> are satisfied with our efforts, happy to count this as part of the 'substantial nationalization of the economy' demand. ?]
  `,
  choices: [
    
  ]
};

export const _cooperatives_1: Scene = {
  id: "cooperatives_1",
  title: "Support worker and consumer cooperatives.",
  subtitle: "-1 budget ",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['economic_democracy'] += 1; state.flags['cooperatives'] += 1; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); state.flags['budget'] -= 1;if (state.flags['unemployed'] > 9) { state.flags['unemployed'] -= 1; }; state.flags['economy_goal_spd'] += 1; state.flags['economic_growth'] += 0.2; 
  },

  

  render: `
    We have enacted legislation that makes it easier to create cooperative enterprises of all sorts, and provide financial support to struggling cooperatives.
  `,
  choices: [
    
  ]
};

export const _economic_policy: Scene = {
  id: "economic_policy",
  title: "Economic Policy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && (state.flags['economic_minister_party'] == "SPD" || state.flags['finance_minister_party'] == "SPD") && state.flags['economic_policy_timer'] <= 0 && state.flags['economic_plan'] > 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['economic_policy_timer'] += 12; state.flags['month_actions'] += 1; state.flags['nationalize_budget'] = 4;if (state.flags['works_councils'] >= 2) { state.flags['nationalize_budget'] -= 1; };if (state.flags['works_councils'] >= 3) { state.flags['nationalize_budget'] -= 1; };if (state.flags['socializations'] + state.flags['nationalization_progress'] >= 2) { state.flags['nationalize_budget'] -= 1; }; state.flags['wtb_budget'] = 4;if (state.flags['works_councils'] >= 2 || state.flags['socializations'] >= 1 || state.flags['pro_labor'] >= 2) { state.flags['wtb_budget'] -= 1; } 
  },

  

  render: `
    #subtitle: Policies to address the economic crisis.
    = Economic Policy
    We have already formulated an economic plan. Now we have to implement it. [? if budget < 0: If our budget falls too far into the red, a capital strike will almost certainly be triggered. ?]
  `,
  choices: [
    
  ]
};

export const _economic_plan_dilemma: Scene = {
  id: "economic_plan_dilemma",
  title: "economic_plan_dilemma",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The [+ public_works_name +] Plan was already implemented by the Brüning cabinet before us. Should we continue with the plan and potentially expand its scope, or should we pursue our own chosen economic strategy?
  `,
  choices: [
    {
      id: "lautenbach_continuation",
      text: "lautenbach_continuation",
      nextSceneId: "lautenbach_continuation",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "lautenbach_wtb",
      text: "lautenbach_wtb",
      nextSceneId: "lautenbach_wtb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nationalize_1",
      text: "nationalize_1",
      nextSceneId: "nationalize_1",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nationalize_2",
      text: "nationalize_2",
      nextSceneId: "nationalize_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _lautenbach_continuation: Scene = {
  id: "lautenbach_continuation",
  title: "We will continue the implementation of the [+ public_works_name +] plan.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (state.flags['time'] >= state.flags['lautenbach_plan_time']) { state.flags['lautenbach_plan_time'] = state.flags['time'] + 12; };if (state.flags['lautenbach_plan_time'] >= state.flags['time']) { state.flags['lautenbach_plan_time'] += 12; }; state.flags['works_program'] += 1; state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 2*(1-state.flags['dissent']); state.flags['rural_spd'] += 2*(1-state.flags['dissent']);if (state.flags['lautenbach_wtb']) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['lautenbach_wtb']) { state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); };if (state.flags['lautenbach_wtb']) { state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['lautenbach_wtb']) { state.flags['old_middle_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['lautenbach_wtb']) { state.flags['rural_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['lautenbach_wtb']) { state.flags['workers_nsdap'] -= 4; }; state.flags['workers_nsdap'] -= 2; state.flags['z_relation'] += 5; state.flags['ddp_relation'] += 5; state.flags['dvp_relation'] += 5; state.flags['lvp_relation'] += 5;if (state.flags['coalition_dissent'] >= 1) { state.flags['coalition_dissent'] -= 1; };if (state.flags['capital_strike_progress'] >= 0) { state.flags['capital_strike_progress'] -= 1; }; state.flags['dvp_left'] += 2; state.flags['ddp_left'] += 4; state.flags['ddp_cohesion'] += 2; state.flags['lvp_left'] += 3; state.flags['pro_republic'] += 3; state.flags['economic_plan_goal_spd'] += 1;if (state.flags['unemployed'] >= 25) { state.flags['unemployed'] -= 2; }; state.flags['unemployed'] -= 1; state.flags['inflation'] += 1; state.flags['economic_growth'] += 1.6; state.flags['economy_goal_spd_peoples'] += 1;if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 8; }; state.flags['kpd_coalition_dissent'] += 1; 
  },

  

  render: `
    Our spending on public works has reduced the need for unemployment insurance and welfare, while also increasing tax receipts through the multiplier effect as the new money circulates in the economy, helping to recover some of our spending. We continue to reinvest most of this new revenue into the program.
    The economy is finally showing signs of improvement. The bourgeois parties are pleased to see that we’re following through with their economic recovery plan and are offering their full support. The investor confidence generated by our successes has led to a small-scale revival of the private sector, along with capital inflows from foreign investors. [? if not lautenbach_wtb: However, the workers are dissatisfied with our slow pace in raising their wages. ?]
    [? if in_popular_front or in_left_front: The <span style="color: #700000;">**KPD**</span> opposes the economic plan, seeing it as a rescue of capitalism rather than a step towards real <span style="color: #9b0000;">socialism</span>. ?]
  `,
  choices: [
    
  ]
};

export const _lautenbach_wtb: Scene = {
  id: "lautenbach_wtb",
  title: "Infuse the WTB Plan with the [+ public_works_name +] plan, with a considerable expansion of public works and wages.",
  subtitle: "-2 budget.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wtb_adopted']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['lautenbach_wtb'] = 1;if (state.flags['time'] >= state.flags['lautenbach_plan_time']) { state.flags['lautenbach_plan_time'] = state.flags['time'] + 12; };if (state.flags['lautenbach_plan_time'] >= state.flags['time']) { state.flags['lautenbach_plan_time'] += 12; }; state.flags['works_program'] += 1; state.flags['workers_spd'] += 6*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 8*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 4*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 4*(1-state.flags['dissent']); state.flags['rural_spd'] += 4*(1-state.flags['dissent']); state.flags['workers_nsdap'] -= 6; state.flags['z_relation'] += 3; state.flags['ddp_relation'] += 3; state.flags['dvp_relation'] += 3; state.flags['lvp_relation'] += 3;if (state.flags['coalition_dissent'] >= 1) { state.flags['coalition_dissent'] -= 1; };if (state.flags['capital_strike_progress'] >= 3) { state.flags['capital_strike_progress'] -= 1; }; state.flags['dvp_left'] += 2; state.flags['ddp_left'] += 3; state.flags['ddp_cohesion'] += 1; state.flags['lvp_left'] += 2; state.flags['pro_republic'] += 5; state.flags['economic_plan_goal_spd'] += 1;if (state.flags['unemployed'] >= 15) { state.flags['unemployed'] -= 2; }; state.flags['unemployed'] -= 2; state.flags['inflation'] += 2; state.flags['economic_growth'] += 2.6; state.flags['economy_goal_spd_peoples'] += 1;if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 8; }; state.flags['kpd_coalition_dissent'] += 1; 
  },

  

  render: `
    We have considerably expanded the public works program, and together with a campaign to raise wages, money is beginning to flow through the economy. The bourgeois parties express concerns about inflation and spending, preferring a more cautious approach. However, they accept our plan, reassured by the surplus we’ve built up.
    Our spending on public works has reduced the need for unemployment insurance and welfare, while also increasing tax receipts through the multiplier effect as the new money circulates in the economy, helping to recover some of our spending. We continue to reinvest most of this new revenue into the program.
    [? if in_popular_front or in_left_front: The <span style="color: #700000;">**KPD**</span> opposes the economic plan, seeing it as a rescue of capitalism rather than a step towards real <span style="color: #9b0000;">socialism</span>. ?]
  `,
  choices: [
    
  ]
};

export const _economic_plan_menu: Scene = {
  id: "economic_plan_menu",
  title: "economic_plan_menu",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "wtb_2",
      text: "wtb_2",
      nextSceneId: "wtb_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "wtb_2_deficit",
      text: "wtb_2_deficit",
      nextSceneId: "wtb_2_deficit",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "wtb_continuation",
      text: "wtb_continuation",
      nextSceneId: "wtb_continuation",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "implement_wtb_no_deficit",
      text: "implement_wtb_no_deficit",
      nextSceneId: "implement_wtb_no_deficit",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "implement_wtb_deficit",
      text: "implement_wtb_deficit",
      nextSceneId: "implement_wtb_deficit",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nationalize_1",
      text: "nationalize_1",
      nextSceneId: "nationalize_1",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nationalize_2",
      text: "nationalize_2",
      nextSceneId: "nationalize_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "moderate_plan",
      text: "moderate_plan",
      nextSceneId: "moderate_plan",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "moderate_plan_limited_budget",
      text: "moderate_plan_limited_budget",
      nextSceneId: "moderate_plan_limited_budget",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "austerity",
      text: "austerity",
      nextSceneId: "austerity",
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
      text: "Do not implement the economic plan.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _austerity: Scene = {
  id: "austerity",
  title: "Look into potential austerity measures.",
  subtitle: "We have to scrounge up money somehow.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['black_thursday_seen']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "cut_salaries",
      text: "cut_salaries",
      nextSceneId: "cut_salaries",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "industrial_levy",
      text: "industrial_levy",
      nextSceneId: "industrial_levy",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "economic_plan_menu",
      text: "Go back.",
      nextSceneId: "economic_plan_menu",
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

export const _cut_salaries: Scene = {
  id: "cut_salaries",
  title: "Slash the salaries of government employees.",
  subtitle: "This will radicalize the middle class. +1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['government_salaries_cut'] = 1; state.flags['new_middle_spd'] -= 8; state.flags['new_middle_ddp'] -= 4; state.flags['new_middle_dvp'] -= 4; state.flags['new_middle_lvp'] -= 8; state.flags['new_middle_nsdap'] += 12; state.flags['pro_republic'] -= 5; state.flags['labor_dissent'] += 15; state.flags['left_dissent'] += 15; state.flags['center_dissent'] += 10; state.flags['unemployed'] += 1; state.flags['inflation'] -= 0.5; state.flags['economic_growth'] -= 0.4; state.flags['budget'] += 1; state.flags['ddp_right'] += 3; state.flags['dvp_right'] += 6; state.flags['lvp_right'] += 5; state.flags['ddp_cohesion'] -= 3; state.flags['ddp_relation'] -= 10; state.flags['dvp_relation'] -= 15; state.flags['z_relation'] -= 6; state.flags['lvp_relation'] -= 12; state.flags['goal_spd_cancel_peoples'] += 1; state.flags['goal_spd_cancel'] += 1; 
  },

  

  render: `
    We have slashed wages for government employees by about 15%, framing it as a painful, but necessary step towards Germany's economic recovery. However, this justification doesn't persuade many, with many switching their allegiance away from the democratic parties toward the radical <span style="color: #7A3C00;">**NSDAP**</span>.
  `,
  choices: [
    
  ]
};

export const _industrial_levy: Scene = {
  id: "industrial_levy",
  title: "Maintain the industrial levy.",
  subtitle: "A reparations tax now rendered obsolete by the Young Plan. Businesses will be displeased. +1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['young_plan_ratified']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['industrial_levy'] = 1; state.flags['reformist_dissent'] += 10; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 5; state.flags['new_middle_spd'] -= 4; state.flags['new_middle_ddp'] -= 2; state.flags['new_middle_nsdap'] += 6; state.flags['new_middle_spd'] -= 4; state.flags['old_middle_ddp'] -= 2; state.flags['old_middle_nsdap'] += 6; state.flags['pro_republic'] -= 3; state.flags['capital_strike_progress'] += 3; state.flags['unemployed'] += 1; state.flags['inflation'] -= 0.8; state.flags['economic_growth'] -= 0.8; state.flags['upper_tax_rates'] += 1; state.flags['budget'] += 1; state.flags['ddp_right'] += 3; state.flags['dvp_right'] += 8; state.flags['lvp_right'] += 6; state.flags['ddp_cohesion'] -= 3; state.flags['ddp_relation'] -= 8; state.flags['dvp_relation'] -= 15; state.flags['z_relation'] -= 5; state.flags['lvp_relation'] -= 12; state.flags['hindenburg_angry'] += 20; state.flags['goal_spd_cancel_peoples'] += 1; 
  },

  

  render: `
    We have kept the collection of the industrial levy, despite it no longer being used to fund our reparation payments. We have expectedly earned the ire of the business community[? if president == "Hindenburg":, who will take their complaints to President Hindenburg?]. In response to our decision, industrialists will double their financial support for the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>[? if in_grand_coalition and not lvp_formed:, and the <span style="color: #C0A054;">**DVP**</span>, in hopes that they'll take down our government?][? if (in_weimar_coalition or in_grand_coalition) and lvp_formed:, and the <span style="color: #FFCC00;">**LVP**</span>, in hopes that they'll take down our government?].
  `,
  choices: [
    
  ]
};

export const _wtb_2: Scene = {
  id: "wtb_2",
  title: "Continue the implementation of the WTB-Plan.",
  subtitle: "-3 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wtb_implemented'] > 2 && state.flags['budget'] >= 3 );
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['wtb_enactment_2_finish'] = state.flags['time'] + 10; state.flags['works_program'] += 1; state.flags['budget'] -= 3; state.flags['workers_spd'] += 5*(1-state.flags['dissent']);if (state.flags['works_program'] <= 4) { state.flags['workers'] += 1; }; state.flags['unemployed_spd'] += 7*(1-state.flags['dissent']);if (state.flags['schleicher_spd']) { state.flags['workers_spd'] -= 2*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['unemployed_spd'] -= 3*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['reichswehr_strength'] += 35; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_loyalty'] += 0.1; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_militancy'] += 0.5; }; state.flags['workers_nsdap'] -= 3; state.flags['wtb_implemented'] += 1; state.flags['kpd_coalition_dissent'] += 1;if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 5; }; state.flags['inflation'] += 2;if (state.flags['schleicher_spd']) { state.flags['inflation'] -= 1; }; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 3; state.flags['ddp_cohesion'] += 1; state.flags['lvp_left'] += 2; state.flags['pro_republic'] += 3; state.flags['economic_plan_goal_spd'] += 1; state.flags['wtb_rally'] -= 1; 
  },

  

  render: `
    [? if works_program == 4 : We have commenced Phase 2 of the WTB-Plan. ?][? if works_program > 4 :  We have continued our implementation of the WTB-Plan. ?] In addition to public works, we are now focusing on rebuilding our industries.
  `,
  choices: [
    
  ]
};

export const _wtb_2_deficit: Scene = {
  id: "wtb_2_deficit",
  title: "Continue the implementation of the WTB-Plan.",
  subtitle: "-3 budget - we will enter a deficit.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wtb_implemented'] > 2 && state.flags['budget'] < 3 && state.flags['budget'] >= -3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['works_program'] += 1; state.flags['budget'] -= 3; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 6*(1-state.flags['dissent']);if (state.flags['works_program'] <= 4) { state.flags['workers'] += 1; };if (state.flags['schleicher_spd']) { state.flags['workers_spd'] -= 2*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['unemployed_spd'] -= 3*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['reichswehr_strength'] += 35; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_loyalty'] += 0.1; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_militancy'] += 0.5; }; state.flags['workers_nsdap'] -= 2; state.flags['coalition_dissent'] += 1;if (state.flags['z_leader'] == "Kaiser") { state.flags['coalition_dissent'] -= 1; }; state.flags['capital_strike_progress'] += 1; state.flags['wtb_implemented'] += 1; state.flags['kpd_coalition_dissent'] += 1;if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 5; }; state.flags['inflation'] += 3;if (state.flags['schleicher_spd']) { state.flags['inflation'] -= 1; }; state.flags['dvp_right'] += 1; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['lvp_right'] += 1; state.flags['economic_plan_goal_spd'] += 1; state.flags['wtb_rally'] -= 1; 
  },

  

  render: `
    We have continued our implementation of the WTB-Plan, despite the continued deficit spending. In addition to public works, we are now focusing on rebuilding our industries.
  `,
  choices: [
    
  ]
};

export const _wtb_continuation: Scene = {
  id: "wtb_continuation",
  title: "Look back on our results, and continue our implementation...",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wtb_implemented'] >= 1 && state.flags['wtb_implemented'] <= 2);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (state.flags['wtb_implemented'] == 1) { state.flags['wtb_enactment_continuation_finish'] = state.flags['time'] + 6; };if (state.flags['wtb_implemented'] == 2 && state.flags['wtb_enactment_continuation_finish'] > state.flags['time']) { state.flags['wtb_enactment_continuation_finish'] = state.flags['wtb_enactment_continuation_finish'] + 6; };if (state.flags['wtb_implemented'] == 2 && state.flags['wtb_enactment_continuation_finish'] < state.flags['time']) { state.flags['wtb_enactment_continuation_finish'] = state.flags['time'] + 6; };if (state.flags['works_program'] <= 2) { state.flags['budget'] += 1; }; state.flags['workers_spd'] += 5*(1-state.flags['dissent']);if (state.flags['works_program'] <= 2) { state.flags['workers'] += 2; } else { state.flags['workers'] += 1; }; state.flags['unemployed_spd'] += 8*(1-state.flags['dissent']);if (state.flags['schleicher_spd']) { state.flags['workers_spd'] -= 2.5*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['unemployed_spd'] -= 4*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['reichswehr_strength'] += 20; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_loyalty'] += 0.05; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_militancy'] += 0.25; }; state.flags['workers_nsdap'] -= 2; state.flags['works_program'] += 1; state.flags['z_relation'] += 3; state.flags['dvp_relation'] += 3; state.flags['lvp_relation'] += 3;if (state.flags['coalition_dissent'] >= 1) { state.flags['coalition_dissent'] -= 1; }; state.flags['wtb_implemented'] += 1;if (state.flags['capital_strike_progress'] >= 3) { state.flags['capital_strike_progress'] -= 1; }; state.flags['dvp_left'] += 1; state.flags['ddp_relation'] += 5; state.flags['ddp_left'] += 3; state.flags['ddp_cohesion'] += 2; state.flags['lvp_left'] += 2; state.flags['pro_republic'] += 5; state.flags['economic_plan_goal_spd'] += 1; state.flags['wtb_rally'] -= 1; 
  },

  

  render: `
    Our spending on public works has resulted in a lower need for unemployment insurance and welfare, and increased tax receipts through the multiplier effect as the new money courses through the economy, recuperating some of our spending. We continue to invest most of the new revenue into the program.
    The economy is doing better, finally. Even the bourgeois parties are beginning to see the light.
    [? if in_popular_front or in_left_front: The <span style="color: #700000;">**KPD**</span>, however, still opposes our policy of "rescuing" capitalism. ?]
  `,
  choices: [
    
  ]
};

export const _implement_wtb_no_deficit: Scene = {
  id: "implement_wtb_no_deficit",
  title: "Implement the WTB plan.",
  subtitle: "-[+ wtb_budget +] budget. [? if wtb_budget == 3 : Our pro-labor policies have reduced the cost of the plan. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['budget'] >= state.flags['wtb_budget'] && state.flags['wtb_implemented'] == 0 && state.flags['wtb_adopted'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= state.flags['wtb_budget'];if ((state.flags['in_grand_coalition'] || state.flags['in_minority_government'])) { state.flags['coalition_dissent'] += 1; }; state.flags['works_program'] += 1; state.flags['unemployed'] -= 4; state.flags['workers_spd'] += 8*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 8*(1-state.flags['dissent']);if (state.flags['schleicher_spd']) { state.flags['workers_spd'] -= 4*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['unemployed_spd'] -= 4*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['reichswehr_strength'] += 20; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_loyalty'] += 0.05; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_militancy'] += 0.5; }; state.flags['wtb_implemented'] += 1; state.flags['kpd_coalition_dissent'] += 1;if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 5; }; state.flags['inflation'] += 2; state.flags['dvp_right'] += 1; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['lvp_right'] += 1; state.flags['pro_republic'] += 3*(1-state.flags['dissent']); state.flags['economic_growth'] += 2.8;if (state.flags['schleicher_spd']) { state.flags['economic_growth'] -= 0.8; }; state.flags['economic_plan_goal_spd'] += 1; state.flags['wtb_rally'] = 0; 
  },

  

  render: `
    We have started to enact the WTB plan. Money is beginning to flow through the economy via investments in large-scale public works. The bourgeois parties express concerns about inflation and spending, preferring tax cuts to address the economic crisis. However, they begrudgingly accept our plan, reassured by the surplus we’ve built up.
    [? if in_popular_front or in_left_front: The <span style="color: #700000;">**KPD**</span> opposes the WTB plan, seeing it as a rescue of capitalism rather than a step towards real <span style="color: #9b0000;">socialism</span>. ?]
  `,
  choices: [
    
  ]
};

export const _implement_wtb_deficit: Scene = {
  id: "implement_wtb_deficit",
  title: "Implement the WTB plan.",
  subtitle: "-[+ wtb_budget +] budget - we will enter deficit spending. [? if wtb_budget == 3 : Our pro-labor policies have reduced the cost of the plan. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['budget'] < state.flags['wtb_budget'] && state.flags['wtb_implemented'] == 0 && state.flags['wtb_adopted'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['coalition_dissent'] += 2;if (state.flags['in_minority_government']) { state.flags['coalition_dissent'] += 1; };if (state.flags['chancellor'] == "Brüning") { state.flags['coalition_dissent'] += 1; };if (state.flags['z_leader'] == "Kaiser") { state.flags['coalition_dissent'] -= 1; }; state.flags['works_program'] += 1; state.flags['budget'] -= state.flags['wtb_budget']; state.flags['unemployed'] -= 4; state.flags['workers'] += 2; state.flags['workers_spd'] += 8*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 8*(1-state.flags['dissent']);if (state.flags['schleicher_spd']) { state.flags['workers_spd'] -= 4*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['unemployed_spd'] -= 4*(1-state.flags['dissent']); };if (state.flags['schleicher_spd']) { state.flags['reichswehr_strength'] += 20; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_loyalty'] += 0.05; };if (state.flags['reichswehr_spd']) { state.flags['reichswehr_militancy'] += 0.5; }; state.flags['capital_strike_progress'] += 1; state.flags['wtb_implemented'] += 1; state.flags['kpd_coalition_dissent'] += 1;if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 5; }; state.flags['inflation'] += 3; state.flags['dvp_right'] += 3; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['dvp_relation'] -= 10; state.flags['ddp_relation'] -= 5; state.flags['z_relation'] -= 5; state.flags['lvp_relation'] -= 8; state.flags['lvp_right'] += 2; state.flags['pro_republic'] += 3*(1-state.flags['dissent']); state.flags['economic_growth'] += 3;if (state.flags['schleicher_spd']) { state.flags['economic_growth'] -= 1; }; state.flags['economic_plan_goal_spd'] += 1; state.flags['wtb_rally'] = 0; 
  },

  

  render: `
    We have entered the realm of deficit spending. Our coalition partners are disgusted, but the works plan is enacted anyway. Money is beginning to flow through the economy via investments in large-scale public works.
    [? if in_popular_front or in_left_front: The <span style="color: #700000;">**KPD**</span> opposes the WTB plan, seeing it as a rescue of capitalism rather than a step towards real <span style="color: #9b0000;">socialism</span>. ?]
    ####################### left economic policies (socializations)
  `,
  choices: [
    
  ]
};

export const _nationalize_1_2: Scene = {
  id: "nationalize_1",
  title: "Implement the Left plan for the transformation of the economy.",
  subtitle: "-[+ nationalize_budget +] budget. [? if works_councils >= 3 : Our works councils have reduced the budget necessary for this program. ?] [? if socializations >= 2: Our existing socialization policies have reduced the budget necessary for this program. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nationalization_adopted'] == 1 && state.flags['nationalization_progress'] == 0 && ! state.flags['schleicher_spd']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _nationalize_no_deficit: Scene = {
  id: "nationalize_no_deficit",
  title: "nationalize_no_deficit",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['nationalization_progress'] += 1; state.flags['capital_strike_progress'] += 2;if (state.flags['unemployed'] >= 6) { state.flags['unemployed'] -= 3.5; };if (state.flags['works_councils'] >= 3) { state.flags['unemployed'] -= 1.2; };if (state.flags['nationalization_progress'] < 2) { state.flags['workers'] += 2; }; state.flags['budget'] -= state.flags['nationalize_budget']; state.flags['works_program'] += 1; state.flags['workers_spd'] += 8*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 5*(1-state.flags['dissent']); state.flags['coalition_dissent'] += 1; state.flags['dvp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['left_dissent'] -= 5; state.flags['new_middle_spd'] -= 2; state.flags['old_middle_spd'] -= 3; state.flags['economy_goal_completed'] += 1; state.flags['economic_plan_goal_spd'] += 1; state.flags['inflation'] += 2; state.flags['dvp_right'] += 2; state.flags['ddp_relation'] -= 4; state.flags['ddp_right'] += 3; state.flags['ddp_cohesion'] -= 2; state.flags['lvp_right'] += 2; state.flags['goal_spd_cancel_peoples'] += 1;if (state.flags['economic_growth'] < 5) { state.flags['economic_growth'] += 1.7; }; 
  },

  

  render: `
    [? if nationalization_progress == 1 : We have begun purchasing idling enterprises from the capitalists[? if works_councils >= 1: , and running them in coordination with empowered works councils ?]. By keeping production going, we can stave off the rising unemployment. ?]
    [? if nationalization_progress == 1 : The Left argues that this should only be a first step in the <span style="color: #c00000;">socialist</span> transformation of the economy. Eventually, much of the economy must be brought under popular control. ?]
    [? if nationalization_progress > 1 : We purchase additional underutilized enterprises and run them in a coordinated <span style="color: #c00000;">socialist</span> fashion with the works councils, hiring formerly laid off workers. A significant portion of the economy is now under public control. ?]
  `,
  choices: [
    
  ]
};

export const _nationalize_deficit: Scene = {
  id: "nationalize_deficit",
  title: "nationalize_deficit",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Unfortunately, we do not have the budget to begin buying out industrial facilities. Some are urging for deficit spending in order to purchase factories, while others are encouraging (currently illegal) factory takeovers by workers, or nationalization without compensation. Taking any of these actions would require a vast departure from our previous party stances.
  `,
  choices: [
    {
      id: "nationalize_deficit_1",
      text: "nationalize_deficit_1",
      nextSceneId: "nationalize_deficit_1",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nationalize_without_compensation",
      text: "nationalize_without_compensation",
      nextSceneId: "nationalize_without_compensation",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "empower_workers",
      text: "empower_workers",
      nextSceneId: "empower_workers",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "return",
      text: "No, we should not do this.",
      nextSceneId: "return",
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

export const _nationalize_deficit_1: Scene = {
  id: "nationalize_deficit_1",
  title: "Take a budget deficit to fund the nationalization program.",
  subtitle: "[? if woytinsky_advisor: Woytinsky can bring us around to supporting a budget deficit. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['nationalization_progress'] += 1; state.flags['capital_strike_progress'] += 3;if (state.flags['unemployed'] >= 6) { state.flags['unemployed'] -= 3; };if (state.flags['works_councils'] >= 3) { state.flags['unemployed'] -= 1.2; }; state.flags['budget'] -= state.flags['nationalize_budget']; state.flags['works_program'] += 1; state.flags['workers_spd'] += 8*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 5*(1-state.flags['dissent']); state.flags['coalition_dissent'] += 2;if (state.flags['z_leader'] == "Kaiser") { state.flags['coalition_dissent'] -= 1; }; state.flags['dvp_relation'] -= 6; state.flags['lvp_relation'] -= 6; state.flags['z_relation'] -= 4; state.flags['new_middle_spd'] -= 3; state.flags['old_middle_spd'] -= 3; state.flags['economy_goal_completed'] += 1; state.flags['economic_plan_goal_spd'] += 1; state.flags['inflation'] += 3; state.flags['dvp_right'] += 4; state.flags['ddp_relation'] -= 6; state.flags['ddp_right'] += 3; state.flags['ddp_cohesion'] -= 2; state.flags['lvp_right'] += 4; state.flags['goal_spd_cancel_peoples'] += 1;if (state.flags['economic_growth'] < 5) { state.flags['economic_growth'] += 2; }; 
  },

  

  render: `
    [? if woytinsky_advisor: Most of the party, even on the left, are opposed to budget deficits for any purpose, with the exception of Wladimir Woytinsky. While he did not originally support the left's "transformational" plan, he has come around, and has persuaded the party and the Finance Ministry to support budget deficits in limited cases, for the purpose of exiting from the depression. ?]
    [? if nationalization_progress == 1 : We have begun purchasing idling enterprises from the capitalists[? if works_councils >= 1: , and running them in coordination with empowered works councils ?]. By keeping production going, we can stave off the rising unemployment. ?]
    [? if nationalization_progress == 1 : The Left argues that this should only be a first step in the <span style="color: #c00000;">socialist</span> transformation of the economy. Eventually, much of the economy must be brought under popular control. ?]
    [? if nationalization_progress > 1 : We purchase additional underutilized enterprises and run them in a coordinated <span style="color: #c00000;">socialist</span> fashion with the works councils, hiring formerly laid off workers. A significant portion of the economy is now under public control. ?]
  `,
  choices: [
    
  ]
};

export const _nationalize_without_compensation: Scene = {
  id: "nationalize_without_compensation",
  title: "Nationalize without compensation.",
  subtitle: "There is no reason why we should not simply take over idle factories. This is likely to provoke a confrontation with the capitalists.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['nationalization_progress'] += 1; state.flags['capital_strike_progress'] += 7; state.flags['coup_progress'] += 3;if (state.flags['unemployed'] >= 6) { state.flags['unemployed'] -= 2.5; };if (state.flags['works_councils'] >= 3 && state.flags['unemployed'] >= 3) { state.flags['unemployed'] -= 1.2; }; state.flags['works_program'] += 1; state.flags['workers_spd'] += 8*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 6*(1-state.flags['dissent']); state.flags['coalition_dissent'] += 2;if (state.flags['z_leader'] == "Kaiser") { state.flags['coalition_dissent'] -= 1; }; state.flags['dvp_relation'] -= 10; state.flags['z_relation'] -= 8; state.flags['ddp_relation'] -= 8; state.flags['lvp_relation'] -= 10; state.flags['left_strength'] += 15; state.flags['reformist_dissent'] += 10; state.flags['left_dissent'] -= 10; state.flags['new_middle_spd'] -= 5; state.flags['old_middle_spd'] -= 8; state.flags['economy_goal_completed'] += 1; state.flags['economic_plan_goal_spd'] += 1; state.flags['kpd_relation'] += 5*(1-state.flags['dissent']); state.flags['inflation'] += 4; state.flags['dvp_right'] += 5; state.flags['ddp_right'] += 5; state.flags['ddp_cohesion'] -= 2.5; state.flags['lvp_right'] += 5; state.flags['goal_spd_cancel_peoples'] += 1;if (state.flags['economic_growth'] < 4) { state.flags['economic_growth'] += 1; }; 
  },

  

  render: `
    The capitalists are, predictably, up in arms about our policy of nationalization without compensation. They call it illegal expropriation, and it is. Nevertheless, it is clear that they have failed by keeping their factories idle, and we must take radical action.
    [? if nationalization_progress == 1 : We have begun acquiring idling enterprises from the capitalists[? if works_councils >= 1: , and running them in coordination with empowered works councils ?]. By keeping production going, we can stave off the rising unemployment. ?]
    [? if nationalization_progress > 1 : We acquired additional underutilized enterprises and run them in a coordinated <span style="color: #c00000;">socialist</span> fashion with the works councils, hiring formerly laid off workers. A significant portion of the economy is now under public control. ?]
  `,
  choices: [
    
  ]
};

export const _empower_workers: Scene = {
  id: "empower_workers",
  title: "Empower workers to take over factories.",
  subtitle: "We can promise to legalize factory occupations, giving the factories over to worker unions. This is highly confrontational, and would likely provoke a reaction from right-wing militants as well as capitalists.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['nationalization_progress'] += 1; state.flags['capital_strike_progress'] += 6; state.flags['coup_progress'] += 5;if (state.flags['unemployed'] >= 6) { state.flags['unemployed'] -= 3; };if (state.flags['works_councils'] >= 3 && state.flags['unemployed'] > 4) { state.flags['unemployed'] -= 1.5; }; state.flags['works_program'] += 1; state.flags['workers_spd'] += 10*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 10*(1-state.flags['dissent']); state.flags['coalition_dissent'] += 2;if (state.flags['z_leader'] == "Kaiser") { state.flags['coalition_dissent'] -= 1; }; state.flags['dvp_relation'] -= 10; state.flags['z_relation'] -= 8; state.flags['ddp_relation'] -= 8; state.flags['lvp_relation'] -= 10; state.flags['workers_nsdap'] -= 5*(1-state.flags['dissent']); state.flags['unemployed_nsdap'] -= 5*(1-state.flags['dissent']); state.flags['left_strength'] += 15; state.flags['reformist_dissent'] += 10; state.flags['left_dissent'] -= 10; state.flags['new_middle_spd'] -= 5; state.flags['old_middle_spd'] -= 10; state.flags['factory_takeovers'] += 1; state.flags['economy_goal_completed'] += 1; state.flags['economic_plan_goal_spd'] += 1; state.flags['kpd_relation'] += 5*(1-state.flags['dissent']); state.flags['inflation'] += 3; state.flags['dvp_right'] += 10; state.flags['ddp_right'] += 7.5; state.flags['ddp_cohesion'] -= 3; state.flags['lvp_right'] += 10; state.flags['goal_spd_cancel_peoples'] += 1;if (state.flags['economic_growth'] < 3) { state.flags['economic_growth'] += 1; }; 
  },

  

  render: `
    The capitalists are, predictably, up in arms about our policy of legalizing factory occupations. They call it illegal expropriation, and it is. Nevertheless, it is clear that they have failed, and we must take radical action.
    <span style="color: #7A3C00;">Fascists</span> have been taking increasingly violent actions around the occupied factories, calling us thieves and looters. However, the some of the working-class supporters of the <span style="color: #7A3C00;">fascists</span> have been peeled off, or at least the ones with a sense of class solidarity.
  `,
  choices: [
    
  ]
};

export const _nationalize_2: Scene = {
  id: "nationalize_2",
  title: "Continue the Left plan for the transformation of the economy.",
  subtitle: "-[+ nationalize_budget +] budget. [? if works_councils >= 3 : Our works councils have reduced the budget necessary for this program. ?] [? if socializations + nationalization_progress >= 2: Our existing socialization policies have reduced the budget necessary for this program. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nationalization_adopted'] == 1 && state.flags['nationalization_progress'] >= 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    #######################################
    # Moderate economic plan
  `,
  choices: [
    
  ]
};

export const _moderate_plan: Scene = {
  id: "moderate_plan",
  title: "Implement the Reformists' job-creation plan.",
  subtitle: "-2 budget.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['moderate_plan_adopted'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 2; state.flags['works_program'] += 1;if (state.flags['time'] >= state.flags['reformist_plan_time']) { state.flags['reformist_plan_time'] = state.flags['time'] + 6; };if (state.flags['reformist_plan_time'] >= state.flags['time']) { state.flags['reformist_plan_time'] += 6; };if (state.flags['unemployed'] >= 8) { state.flags['unemployed'] -= 3; };if (state.flags['unemployed'] >= 30) { state.flags['unemployed'] -= 2; }; state.flags['inflation'] += 1.5; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 2*(1-state.flags['dissent']); state.flags['rural_spd'] += 2*(1-state.flags['dissent']); state.flags['moderate_plan_progress'] += 1; state.flags['kpd_coalition_dissent'] += 1;if (state.flags['unemployed'] < 10) { state.flags['inflation'] += 1; };if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 5; }; state.flags['dvp_left'] += 2; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] += 0.5; state.flags['lvp_left'] += 2; state.flags['economic_plan_goal_spd'] += 1; state.flags['economy_goal_spd_peoples'] += 1; state.flags['economic_growth'] += 1.6; 
  },

  

  render: `
    [? if moderate_plan_progress == 1 : We have started to implement the job-creation plan! Funds are sent to build public works projects across Germany, reducing unemployment. ?]
    [? if moderate_plan_progress > 1 : We have continued to fund the job-creation plan, using our funds to build public works throughout Germany. ?]
    [? if unemployed >= 10 : The bourgeois approve of this plan as the "least bad" alternative, seeing it as necessary to save Germany's economy. ?]
    [? if unemployed < 10 : Unemployment is low enough that the plan does not seem to have the intended effect. ?]
    [? if in_popular_front or in_left_front: The <span style="color: #700000;">**KPD**</span> opposes the economic plan, seeing it as a rescue of capitalism rather than a step towards real <span style="color: #9b0000;">socialism</span>. ?]
  `,
  choices: [
    
  ]
};

export const _moderate_plan_limited_budget: Scene = {
  id: "moderate_plan_limited_budget",
  title: "Partially implement the Reformists' job-creation plan, with a lower cost.",
  subtitle: "-1 budget.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['moderate_plan_adopted'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['works_program'] += 1;if (state.flags['time'] >= state.flags['reformist_plan_time']) { state.flags['reformist_plan_time'] = state.flags['time'] + 3; };if (state.flags['reformist_plan_time'] >= state.flags['time']) { state.flags['reformist_plan_time'] += 3; };if (state.flags['unemployed'] >= 8) { state.flags['unemployed'] -= 1; };if (state.flags['unemployed'] >= 30) { state.flags['unemployed'] -= 2; }; state.flags['inflation'] += 1; state.flags['workers_spd'] += 2*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 2*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 1.5*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 1*(1-state.flags['dissent']); state.flags['rural_spd'] += 1*(1-state.flags['dissent']); state.flags['moderate_plan_progress'] += 1; state.flags['kpd_coalition_dissent'] += 1;if (state.flags['unemployed'] < 10) { state.flags['inflation'] += 1; };if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 5; }; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] += 0.25; state.flags['lvp_left'] += 1; state.flags['economic_plan_goal_spd'] += 1; state.flags['economy_goal_spd_peoples'] += 1; state.flags['economic_growth'] += 0.7; 
  },

  

  render: `
    [? if moderate_plan_progress == 1 : We have started to implement the job-creation plan! Funds are sent to build public works projects across Germany, reducing unemployment. ?]
    [? if moderate_plan_progress > 1 : We have continued to fund the job-creation plan, using our funds to build public works throughout Germany. ?]
    [? if unemployed >= 10 : The bourgeois approve of this plan as the "least bad" alternative, seeing it as necessary to save Germany's economy. ?]
    [? if unemployed < 10 : Unemployment is low enough that the plan does not seem to have the intended effect. ?]
    [? if in_popular_front or in_left_front: The <span style="color: #700000;">**KPD**</span> opposes the economic plan, seeing it as a rescue of capitalism rather than a step towards real <span style="color: #9b0000;">socialism</span>. ?]
  `,
  choices: [
    
  ]
};

export const _education_science: Scene = {
  id: "education_science",
  title: "Education & Science",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] && (state.flags['prussia_leader'] == "Braun" || state.flags['prussia_leader'] == "Rosenfeld") && state.flags['chancellor_party'] == "SPD" && state.flags['education_science_timer'] == 0 && (state.flags['black_thursday_seen'] == 0 || state.flags['return_to_normalcy'] == 1));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['education_science_timer'] += 9; state.flags['month_actions'] += 1; 
  },

  

  render: `
    # options:
    # - fund research (basic science research at the KWI, medical research, applied and industrial research to benefit Germany's economy)
    # - change the educational curriculum (only once per 3 years) - will have a "major" and "minor" option:
    # - democratic education - focus on critical thinking and democratic values rather than authoritarian teaching. (+ democratization, pro_republic)
    # - scientific education - focus on the sciences, mathematics, and technical skills (+ NMC, science)
    # - humanistic education - focus on literature, history, and philosophy. (+ NMC, pro_republic if democratization is high)
    # - traditional education (reduces relations with DDP)
    # - increase educational opportunities for working-class families.
    # - Secularize education (+ DVP, instant Zentrum vonc)
    # source for some of the education stuff: Martin, G. W. “Educational Reform in Germany 1918-1933.” Masters, Durham University, 1972. https://etheses.dur.ac.uk/9738/.
    # Forman, Paul. “The Financial Support and Political Alignment of Physicists in Weimar Germany.” Minerva 12, no. 1 (1974): 39–66.
    # science increases economic growth...
    = Education and Science
    Education in Germany is an area of mixed responsibility between the state governments and the central government. The <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Constitution claims that schools are the domain of the central government, but in practice much of it is left to the states, as the Reichstag has historically been unable to pass an education law. Currently, with our control of Prussia and the Chancellorship, we can try to set policy for a large part of the country.
    [? if major_curriculum: Current educational curriculum - [+ major_curriculum +], [+ minor_curriculum +] ?]
  `,
  choices: [
    
  ]
};

export const _ed_menu: Scene = {
  id: "ed_menu",
  title: "ed_menu",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['last_advisor_action']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "increase_science",
      text: "increase_science",
      nextSceneId: "increase_science",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "structure",
      text: "structure",
      nextSceneId: "structure",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "curriculum",
      text: "curriculum",
      nextSceneId: "curriculum",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "return",
      text: "Do not enact any policies for now.",
      nextSceneId: "return",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _increase_science: Scene = {
  id: "increase_science",
  title: "Increase funding for scientific research.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    <span style="color: #9b0000;">Socialism</span> has always stood for science and rationality. Despite the setbacks of the Great War, hyperinflation, and the politicized and <span style="color: #808080;">reactionary</span> attitudes of many academics, science in the German Republic is still the envy of the world. With a great expansion of funding, we hope to keep it that way, and expand on our achievements. 
  `,
  choices: [
    {
      id: "kwg",
      text: "kwg",
      nextSceneId: "kwg",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "applied",
      text: "applied",
      nextSceneId: "applied",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "medical",
      text: "medical",
      nextSceneId: "medical",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cut_funding",
      text: "cut_funding",
      nextSceneId: "cut_funding",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ed_menu",
      text: "Do not increase research funding.",
      nextSceneId: "ed_menu",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _kwg: Scene = {
  id: "kwg",
  title: "Fund the Kaiser Wilhelm Society for basic scientific research.",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['science'] += 1; state.flags['kwg_research'] += 1;if (state.flags['economic_growth'] <= 8) { state.flags['economic_growth'] += 0.3; }; state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['ddp_relation'] += 5*(1-state.flags['dissent']); state.flags['lvp_relation'] += 3*(1-state.flags['dissent']);if (state.flags['unemployed'] >= 4) { state.flags['unemployed'] -= 0.2; }; state.flags['west_relation'] += 1; state.flags['science_funding'] += 1; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] += 0.5; state.flags['lvp_left'] += 0.5; state.flags['education_goal_spd_peoples'] += 1; 
  },

  

  render: `
    The Kaiser Wilhelm Society is one of the most respected scientific research institutions in the world, with physicist Albert Einstein as its most famous employee. Our research program is to provide the Society with additional resources to hire and train scientists and conduct fundamental research, based on the scientists' own interests.
  `,
  choices: [
    
  ]
};

export const _applied: Scene = {
  id: "applied",
  title: "Fund applied research in economically useful technologies.",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['science'] += 1; state.flags['applied_research'] += 1;if (state.flags['economic_growth'] <= 8 && state.flags['applied_research'] <= 1) { state.flags['economic_growth'] += 0.5; };if (state.flags['applied_research'] > 1) { state.flags['economic_growth'] += 3; }; state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['ddp_relation'] += 5*(1-state.flags['dissent']); state.flags['lvp_relation'] += 3*(1-state.flags['dissent']);if (state.flags['unemployed'] >= 4) { state.flags['unemployed'] -= 0.5; };if (state.flags['capital_strike_progress'] > 1) { state.flags['capital_strike_progress'] -= 1; }; state.flags['science_funding'] += 1; state.flags['education_goal_spd_peoples'] += 1; 
  },

  

  render: `
    Our research program focuses on collaborating with industry to develop useful technologies, creating new research institutions for applied science. This collaboration is focused on economic growth and development.
  `,
  choices: [
    
  ]
};

export const _medical: Scene = {
  id: "medical",
  title: "Fund biomedical research at the hospitals and medical schools.",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['science'] += 1; state.flags['medical_research'] += 1;if (state.flags['economic_growth'] <= 8) { state.flags['economic_growth'] += 0.4; }; state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['ddp_relation'] += 5*(1-state.flags['dissent']); state.flags['lvp_relation'] += 3*(1-state.flags['dissent']);if (state.flags['unemployed'] >= 4) { state.flags['unemployed'] -= 0.2; }; state.flags['science_funding'] += 1; state.flags['education_goal_spd_peoples'] += 1; 
  },

  

  render: `
    Our research program focuses on medical research to improve the treatment of diseases and public health. [? if change_sex: Some of our medical advancements include new methods for sex change surgery and hormone therapy for <span style="color: deepskyblue;">tran</span><span style="color: linen;">sse</span><span style="color: lightpink;">xuals</span> individuals. ?]
  `,
  choices: [
    
  ]
};

export const _cut_funding: Scene = {
  id: "cut_funding",
  title: "Cut science funding.",
  subtitle: "+1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] += 1; state.flags['science'] -= 1; state.flags['science_funding'] -= 1; state.flags['applied_research'] -= 0.33; state.flags['kwg_research'] -= 0.33; state.flags['medical_research'] -= 0.33; state.flags['economic_growth'] -= 0.5; state.flags['new_middle_spd'] -= 5; state.flags['workers_spd'] -= 2; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 2; state.flags['unemployed'] += 0.3; state.flags['ddp_right'] += 1; state.flags['lvp_right'] += 0.5; state.flags['goal_spd_cancel_peoples'] += 1; 
  },

  

  render: `
    We have cut funding for science. This has a negative effect on our economic growth, and unemployed scientists are less likely to support the <span style="color: #c00000;">**SPD**</span>.
  `,
  choices: [
    
  ]
};

export const _structure: Scene = {
  id: "structure",
  title: "Change the structure and funding of education.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Education in Germany has traditionally been organized on religious and class lines. Schools are often either Protestant or Catholic (or rarely <span style="color: #005EB8;">Jewish</span>), and religious classes are required in most mixed-denomination schools. In addition, the working class has at most eight years of public education in primary and middle schools, while the middle and upper classes have access to private schools and Gymnasiums that prepare students for universities. Thus, the universities tend to be dominated by <span style="color: #3E88B3;">conservatives</span> and <span style="color: #808080;">reactionaries</span>, which has negative consequences for bureaucratic recruitment.
  `,
  choices: [
    {
      id: "secularize",
      text: "secularize",
      nextSceneId: "secularize",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "public_hs",
      text: "public_hs",
      nextSceneId: "public_hs",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "school_boards",
      text: "school_boards",
      nextSceneId: "school_boards",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ed_menu",
      text: "Do not change school funding or organization.",
      nextSceneId: "ed_menu",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _secularize: Scene = {
  id: "secularize",
  title: "Support secular schools to end the religious dominance in education.",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['secularized'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _secularize_menu: Scene = {
  id: "secularize_menu",
  title: "secularize_menu",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Are you sure about this? The <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Coalition had an agreement to not touch religious schools; the Catholic [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] will revolt.
  `,
  choices: [
    {
      id: "secularize_2",
      text: "Yes, do it.",
      nextSceneId: "secularize_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ed_menu",
      text: "No, do not touch religious education.",
      nextSceneId: "ed_menu",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _secularize_2: Scene = {
  id: "secularize_2",
  title: "secularize_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['secularized'] = 1; state.flags['secularized_a'] = 1; state.flags['budget'] -= 1; state.flags['catholics_spd'] -= 15; state.flags['catholics'] -= 5; state.flags['z_relation'] -= 15; state.flags['dvp_relation'] += 6*(1-state.flags['dissent']); state.flags['ddp_relation'] += 6*(1-state.flags['dissent']); state.flags['lvp_relation'] += 6*(1-state.flags['dissent']); state.flags['kpd_relation'] += 6*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['education_science'] += 0.5; state.flags['new_middle_ddp'] += 4; state.flags['new_middle_dvp'] += 4; state.flags['new_middle_lvp'] += 8; state.flags['dvp_left'] += 3; state.flags['ddp_left'] += 3; state.flags['ddp_cohesion'] += 2; state.flags['lvp_left'] += 5; state.flags['education_goal_spd'] += 1; 
  },

  

  render: `
    # instant VONC from zentrum
    The <span style="color: #c00000;">**SPD**</span>, [? if not lvp_formed: <span style="color: #D3C24D;">**[+ ddp_name +]**</span>, [? if not dvp_exist: former ?]<span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed: <span style="color: #FFCC00;">**LVP**</span>?], and <span style="color: #700000;">**KPD**</span> vote in favor of secular education, overcoming the opposition of the religiously-oriented [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] and <span style="color: #3E88B3;">**DNVP**</span>. We have funded secular community schools to replace some previous denominational schools.
    [? if in_weimar_coalition or in_grand_coalition or in_popular_front or in_emergency_government: Of course, the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] is in revolt at this proposal, and have called for a vote of no confidence in our government. ?]
  `,
  choices: [
    
  ]
};

export const _public_hs: Scene = {
  id: "public_hs",
  title: "Increase educational opportunities for the working class by funding public high schools.",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['public_hs'] += 1; state.flags['workers_spd'] += 6*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); state.flags['prussian_police_loyalty'] += 0.04; state.flags['education_science'] += 0.5; state.flags['unemployed'] -= 0.1; state.flags['economic_growth'] += 0.2; state.flags['pro_republic'] += 4*(1-state.flags['dissent']); state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['education_goal_spd'] += 1; 
  },

  

  render: `
    # this makes the bureaucracy more proletarian
    We have funded more public secondary schools so that proletarian children may receive the same education as middle and upper-class children, and can be prepared for universities.
  `,
  choices: [
    
  ]
};

export const _school_boards: Scene = {
  id: "school_boards",
  title: "Create elected school boards to give local areas more control over education.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['school_boards'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['school_boards'] += 1; state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 2*(1-state.flags['dissent']); state.flags['education_science'] += 0.2; state.flags['education_goal_spd'] += 1; 
  },

  

  render: `
    We have created local elected school boards, and delegated some of the decision-making for local schools to them.
  `,
  choices: [
    
  ]
};

export const _curriculum: Scene = {
  id: "curriculum",
  title: "Change the educational curriculum.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Many <span style="color: #c00000;">socialists</span> believe that education in Germany is not fit for the modern era. Much of the educational system still follows imperial-era traditions of militaristic discipline, and <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> professors and students rule the universities. Nevertheless, there have been strides in bringing working-class children into the schools.
    What should be the major focus of our new curriculum?
    # note: education_science is a variable that affects how much education affects economic growth.
  `,
  choices: [
    {
      id: "dem_major",
      text: "dem_major",
      nextSceneId: "dem_major",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "science_major",
      text: "science_major",
      nextSceneId: "science_major",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "human_major",
      text: "human_major",
      nextSceneId: "human_major",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "vocational_major",
      text: "vocational_major",
      nextSceneId: "vocational_major",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "trad_major",
      text: "trad_major",
      nextSceneId: "trad_major",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ed_menu",
      text: "Do not change the curriculum now.",
      nextSceneId: "ed_menu",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _dem_major: Scene = {
  id: "dem_major",
  title: "Democratic curriculum",
  subtitle: "Critical thinking, democratic citizenship, and collaboration",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['curriculum_timer'] = 50; state.flags['major_curriculum'] = "democratic"; state.flags['pro_republic'] += 5*(1-state.flags['dissent']); state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['democratization'] += 1; state.flags['z_relation'] -= 3; state.flags['ddp_relation'] += 3;if (state.flags['lvp_ideology'] != "Right") { state.flags['lvp_relation'] += 3; };if (state.flags['lvp_ideology'] == "Right") { state.flags['lvp_relation'] -= 3; }; state.flags['dvp_relation'] -= 5; state.flags['ddp_left'] += 2; state.flags['ddp_cohesion'] += 1; state.flags['dvp_right'] += 2; state.flags['lvp_left'] += 1;if (state.flags['in_grand_coalition']) { state.flags['coalition_dissent'] += 1; }; state.flags['pacifism'] += 1; state.flags['education_science'] += 0.3; 
  },

  

  render: `
    We should teach students how to be citizens of a democratic republic, by teaching them to critically evaluate politics and current events, to exercise their rights and to respect the rights of other citizens. Traditionalists of all stripes are critical of this curriculum.
  `,
  choices: [
    
  ]
};

export const _science_major: Scene = {
  id: "science_major",
  title: "Scientific curriculum",
  subtitle: "Modern science, mathematics, and technical skills",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['curriculum_timer'] = 50; state.flags['major_curriculum'] = "scientific"; state.flags['education_science'] += 1;if (state.flags['in_weimar_coalition']) { state.flags['coalition_dissent'] += 1; }; state.flags['z_relation'] -= 5; state.flags['ddp_relation'] += 4*(1-state.flags['dissent']); state.flags['lvp_relation'] += 2*(1-state.flags['dissent']); state.flags['kpd_relation'] += 3*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['workers_spd'] += 2*(1-state.flags['dissent']); state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] += 0.5; state.flags['lvp_left'] += 0.5; 
  },

  

  render: `
    Our educational system should reflect the modern age, and we should teach science and rational thinking. Religious conservatives tend to react negatively against this. 
  `,
  choices: [
    
  ]
};

export const _human_major: Scene = {
  id: "human_major",
  title: "Humanist curriculum",
  subtitle: "Arts, literature, history, and philosophy",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['curriculum_timer'] = 50; state.flags['major_curriculum'] = "humanist"; state.flags['ddp_relation'] += 3*(1-state.flags['dissent']); state.flags['lvp_relation'] += 2*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 4*(1-state.flags['dissent']); state.flags['education_science'] += 0.2; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 0.5; 
  },

  

  render: `
    Our educational curriculum should be focused on the humanities, including arts, literature, history, and philosophy. Some criticize this curriculum as focusing too much on "useless" subjects, while others worry that the arts establishment is too closely tied to romantic nationalism.
  `,
  choices: [
    
  ]
};

export const _vocational_major: Scene = {
  id: "vocational_major",
  title: "Vocational curriculum",
  subtitle: "Useful technical skills for future careers",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['curriculum_timer'] = 50; state.flags['major_curriculum'] = "vocational"; state.flags['dvp_relation'] += 3*(1-state.flags['dissent']); state.flags['ddp_relation'] += 3*(1-state.flags['dissent']); state.flags['lvp_relation'] += 3*(1-state.flags['dissent']); state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['rural_spd'] += 2*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); state.flags['new_middle_spd'] -= 1; state.flags['unemployed'] -= 0.1; state.flags['education_science'] += 0.5; state.flags['ddp_left'] += 0.5; state.flags['dvp_left'] += 0.5; state.flags['lvp_left'] += 0.5; state.flags['education_goal_spd'] += 1; 
  },

  

  render: `
    Education should be focused on providing a useful hands-on education, and teach the skills that will be most useful for students' future lives.
  `,
  choices: [
    
  ]
};

export const _trad_major: Scene = {
  id: "trad_major",
  title: "Traditional curriculum",
  subtitle: "Classics, discipline, and nationalism",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['curriculum_timer'] = 50; state.flags['major_curriculum'] = "traditional"; state.flags['dvp_relation'] += 5*(1-state.flags['dissent']);  state.flags['z_relation'] += 4*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['rural_spd'] += 3*(1-state.flags['dissent']);if (state.flags['pacifism'] > 0) { state.flags['pacifism'] -= 1; }; state.flags['pro_republic'] -= 5; state.flags['nationalism'] += 5; state.flags['education_science'] += 0.2;if (state.flags['lvp_ideology'] != "Left") { state.flags['lvp_relation'] += 3; };if (state.flags['lvp_ideology'] == "Left") { state.flags['lvp_relation'] -= 3; }; state.flags['ddp_right'] += 2; state.flags['dvp_right'] += 2; state.flags['lvp_right'] += 2; 
  },

  

  render: `
    The traditional curriculum had a focus on ancient history and language (particularly Latin and Greek), as well as rigid discipline and some level of militarism.
  `,
  choices: [
    
  ]
};

export const _curriculum_minor: Scene = {
  id: "curriculum_minor",
  title: "curriculum_minor",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    And what should be a secondary focus of the curriculum?
  `,
  choices: [
    {
      id: "dem_minor",
      text: "dem_minor",
      nextSceneId: "dem_minor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "science_minor",
      text: "science_minor",
      nextSceneId: "science_minor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "human_minor",
      text: "human_minor",
      nextSceneId: "human_minor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "vocational_minor",
      text: "vocational_minor",
      nextSceneId: "vocational_minor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "trad_minor",
      text: "trad_minor",
      nextSceneId: "trad_minor",
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

export const _dem_minor: Scene = {
  id: "dem_minor",
  title: "Democratic curriculum",
  subtitle: "Critical thinking, democratic citizenship, and collaboration",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['major_curriculum'] != "democratic");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['minor_curriculum'] = "democratic"; state.flags['pro_republic'] += 3*(1-state.flags['dissent']); state.flags['workers_spd'] += 2*(1-state.flags['dissent']); state.flags['democratization'] += 1; state.flags['z_relation'] -= 2; state.flags['dvp_relation'] -= 3; state.flags['ddp_relation'] += 2;if (state.flags['lvp_ideology'] != "Right") { state.flags['lvp_relation'] += 3; };if (state.flags['lvp_ideology'] == "Right") { state.flags['lvp_relation'] -= 3; }; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] += 0.5; state.flags['lvp_left'] += 0.5; 
  },

  

  render: `
    We should teach students how to be citizens of a democratic republic, by teaching them to critically evaluate politics and current events, to exercise their rights and to respect the rights of other citizens. Traditionalists of all stripes are critical of this curriculum.
  `,
  choices: [
    
  ]
};

export const _science_minor: Scene = {
  id: "science_minor",
  title: "Scientific curriculum",
  subtitle: "Modern science, mathematics, and technical skills",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['major_curriculum'] != "scientific");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['minor_curriculum'] = "scientific"; state.flags['education_science'] += 0.5; state.flags['z_relation'] -= 3; state.flags['ddp_relation'] += 3*(1-state.flags['dissent']); state.flags['lvp_relation'] += 2*(1-state.flags['dissent']); state.flags['kpd_relation'] += 2*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); state.flags['workers_spd'] += 2*(1-state.flags['dissent']); state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] += 0.5; state.flags['lvp_left'] += 0.25; 
  },

  

  render: `
    Our educational system should reflect the modern age, and we should teach science and rational thinking. Religious conservatives tend to react negatively against this. 
  `,
  choices: [
    
  ]
};

export const _human_minor: Scene = {
  id: "human_minor",
  title: "Humanist curriculum",
  subtitle: "Arts, literature, history, and philosophy",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['major_curriculum'] != "humanist");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['minor_curriculum'] = "humanist"; state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['ddp_relation'] += 3*(1-state.flags['dissent']); state.flags['lvp_relation'] += 2*(1-state.flags['dissent']); state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 0.5; 
  },

  

  render: `
    Our educational curriculum should be focused on the humanities, including arts, literature, history, and philosophy. Some criticize this curriculum as focusing too much on "useless" subjects, while others worry that the arts establishment is too closely tied to romantic nationalism.
  `,
  choices: [
    
  ]
};

export const _vocational_minor: Scene = {
  id: "vocational_minor",
  title: "Vocational curriculum",
  subtitle: "Useful technical skills for future careers",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['major_curriculum'] != "vocational");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['minor_curriculum'] = "vocational"; state.flags['education_science'] += 0.3; state.flags['dvp_relation'] += 2*(1-state.flags['dissent']); state.flags['ddp_relation'] += 2*(1-state.flags['dissent']); state.flags['lvp_relation'] += 2*(1-state.flags['dissent']); state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 2*(1-state.flags['dissent']); state.flags['ddp_left'] += 0.25; state.flags['dvp_left'] += 0.25; state.flags['lvp_left'] += 0.25; 
  },

  

  render: `
    Education should be focused on providing a useful hands-on education, and teach the skills that will be most useful for students' future lives.
  `,
  choices: [
    
  ]
};

export const _trad_minor: Scene = {
  id: "trad_minor",
  title: "Traditional curriculum",
  subtitle: "Classics, discipline, and nationalism",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['major_curriculum'] != "traditional");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['minor_curriculum'] = "traditional"; state.flags['dvp_relation'] += 2*(1-state.flags['dissent']); state.flags['z_relation'] += 2*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 2*(1-state.flags['dissent']); state.flags['rural_spd'] += 2*(1-state.flags['dissent']); state.flags['pro_republic'] -= 3; state.flags['nationalism'] += 3;if (state.flags['lvp_ideology'] != "Left") { state.flags['lvp_relation'] += 2; };if (state.flags['lvp_ideology'] == "Left") { state.flags['lvp_relation'] -= 2; }; state.flags['ddp_right'] += 1; state.flags['dvp_right'] += 1; state.flags['lvp_right'] += 1; 
  },

  

  render: `
    The traditional curriculum had a focus on ancient history and language (particularly Latin and Greek), as well as rigid discipline.
  `,
  choices: [
    
  ]
};

export const _fiscal_policy: Scene = {
  id: "fiscal_policy",
  title: "Fiscal Policy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['finance_minister_party'] == "SPD" && state.flags['fiscal_policy_timer'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['fiscal_policy_timer'] += 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: Issues of taxation, budget, and tariffs.
    = Fiscal Policy
    Fiscal policy involves issues of taxation and budget.
  `,
  choices: [
    
  ]
};

export const _fiscal_menu: Scene = {
  id: "fiscal_menu",
  title: "fiscal_menu",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Upper-income tax rates: [+ upper_tax_rates : taxation +]
    Lower-income tax rates: [+ lower_tax_rates : taxation +]
  `,
  choices: [
    {
      id: "raise_rich",
      text: "Increase taxes on the rich.",
      nextSceneId: "raise_rich",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "raise_poor",
      text: "raise_poor",
      nextSceneId: "raise_poor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "raise_overall",
      text: "Increase overall taxes.",
      nextSceneId: "raise_overall",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cut_rich",
      text: "cut_rich",
      nextSceneId: "cut_rich",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cut_poor",
      text: "cut_poor",
      nextSceneId: "cut_poor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cut_overall",
      text: "Cut overall taxes.",
      nextSceneId: "cut_overall",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "raise_progressive",
      text: "Make the tax system more progressive by raising taxes on the rich and cutting them for the poor.",
      nextSceneId: "raise_progressive",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "regressive",
      text: "regressive",
      nextSceneId: "regressive",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "tariffs",
      text: "tariffs",
      nextSceneId: "tariffs",
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
      text: "Do not change the tax system.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _raise_progressive: Scene = {
  id: "raise_progressive",
  title: "raise_progressive",
  subtitle: "This does not change overall revenue. [? if lower_tax_rates < -5 : Lower-class tax rates are too low to cut anymore. ?] [? if upper_tax_rates > 5 : Upper-class tax rates are too high to increase. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 6*(1-state.flags['dissent']); state.flags['old_middle_spd'] -= 3; state.flags['new_middle_spd'] -= 3;if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_ddp'] -= 1; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_ddp'] -= 1; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] -= 1; };if (state.flags['in_weimar_coalition']) { state.flags['old_middle_ddp'] -= 1; };if (state.flags['in_grand_coalition']) { state.flags['new_middle_dvp'] -= 2; };if (state.flags['in_grand_coalition']) { state.flags['old_middle_dvp'] -= 2; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_lvp'] -= 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_lvp'] -= 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_other'] += 3; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_other'] += 3; };if ((state.flags['in_grand_coalition'] || (state.flags['in_weimar_coalition'] && state.flags['lvp_formed']))) { state.flags['coalition_dissent'] += 1; }; state.flags['dvp_relation'] -= 4; state.flags['lvp_relation'] -= 3;if (state.flags['ddp_ideology'] != "Left") { state.flags['ddp_relation'] -= 2; }; state.flags['finance_goal_completed'] += 1; state.flags['upper_tax_rates'] += 1; state.flags['lower_tax_rates'] -= 1; state.flags['capital_strike_progress'] += 1;if (state.flags['upper_tax_rates'] > 1) { state.flags['capital_strike_progress'] += 1; };if (state.flags['upper_tax_rates'] > 3) { state.flags['capital_strike_progress'] += 1; };if (state.flags['upper_tax_rates'] > 1) { state.flags['new_middle_spd'] -= 2; };if (state.flags['upper_tax_rates'] > 1) { state.flags['old_middle_spd'] -= 2; }; state.flags['dvp_right'] += 1; state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_right'] += 1; state.flags['finance_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1; 
  },

  

  render: `
    Making the tax system more progressive is popular among our base, but it upsets our bourgeois coalition partners, as well as our minimal number of bourgeois voters. [? if in_grand_coalition or in_weimar_coalition: Furthermore, the liberals in our governing coalition will also face backlash from their support base for participating in the government that increases their own taxes. ?]
  `,
  choices: [
    
  ]
};

export const _raise_rich: Scene = {
  id: "raise_rich",
  title: "raise_rich",
  subtitle: "+2 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['upper_tax_rates'] += 1; state.flags['capital_strike_progress'] += 1;if (state.flags['upper_tax_rates'] > 1) { state.flags['capital_strike_progress'] += 1; };if (state.flags['upper_tax_rates'] > 3) { state.flags['capital_strike_progress'] += 1; }; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['old_middle_spd'] -= 4; state.flags['new_middle_spd'] -= 4;if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_ddp'] -= 1; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] -= 1; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_ddp'] -= 1; };if (state.flags['in_weimar_coalition']) { state.flags['old_middle_ddp'] -= 1; };if (state.flags['in_grand_coalition']) { state.flags['new_middle_dvp'] -= 2; };if (state.flags['in_grand_coalition']) { state.flags['old_middle_dvp'] -= 2; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_lvp'] -= 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_lvp'] -= 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_other'] += 3; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_other'] += 3; };if ((state.flags['in_grand_coalition'] || (state.flags['in_weimar_coalition'] && state.flags['lvp_formed']))) { state.flags['coalition_dissent'] += 1; };if (state.flags['capital_strike_progress'] >= 5) { state.flags['coalition_dissent'] += 1; }; state.flags['budget'] += 2; state.flags['dvp_relation'] -= 4; state.flags['unemployed'] += 1; state.flags['finance_goal_completed'] += 1; state.flags['inflation'] -= 0.6; state.flags['dvp_right'] += 1; state.flags['lvp_right'] += 1; state.flags['ddp_relation'] -= 4; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_relation'] -= 4; state.flags['finance_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1; state.flags['economic_growth'] -= 0.4;if (state.flags['upper_tax_rates'] > 1) { state.flags['new_middle_spd'] -= 2; };if (state.flags['upper_tax_rates'] > 1) { state.flags['old_middle_spd'] -= 2; }; state.flags['left_dissent'] -= 3; state.flags['labor_dissent'] -= 3; 
  },

  

  render: `
    Raising taxes on the rich is popular among our base, but it alienates the bourgeoisie. Increasing taxes also decreases economic demand, which may lead to more unemployment. [? if in_grand_coalition or in_weimar_coalition: Furthermore, the liberals in our governing coalition will also face backlash from their support base for participating in the government that increases their own taxes. ?]
  `,
  choices: [
    
  ]
};

export const _raise_poor: Scene = {
  id: "raise_poor",
  title: "Raise consumption taxes, which disproportionately affect the poor.",
  subtitle: "+2 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] += 2; state.flags['workers_spd'] -= 4; state.flags['unemployed_spd'] -= 4; state.flags['goal_spd_cancel'] += 1; state.flags['kpd_coalition_dissent'] += 1; state.flags['lower_tax_rates'] += 1;if (state.flags['lower_tax_rates'] >= 2) { state.flags['workers_spd'] -= 6; };if (state.flags['lower_tax_rates'] >= 2) { state.flags['unemployed_spd'] -= 6; }; state.flags['labor_dissent'] += 10; state.flags['left_dissent'] += 10; 
  },

  

  render: `
    We have raised taxes for the poor and working class. This hurts our support among the workers.
  `,
  choices: [
    
  ]
};

export const _cut_overall: Scene = {
  id: "cut_overall",
  title: "cut_overall",
  subtitle: "-3 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 3; state.flags['upper_tax_rates'] -= 1; state.flags['lower_tax_rates'] -= 1; state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 4*(1-state.flags['dissent']); state.flags['workers_spd'] += 3*(1-state.flags['dissent']);if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_dvp'] -= 2; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_dvp'] -= 2; };if (state.flags['in_grand_coalition']) { state.flags['new_middle_dvp'] += 4; };if (state.flags['in_grand_coalition']) { state.flags['old_middle_dvp'] += 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_lvp'] += 6; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_lvp'] += 6; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_other'] -= 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_other'] -= 4; }; state.flags['dvp_relation'] += 5*(1-state.flags['dissent']); state.flags['z_relation'] += 5*(1-state.flags['dissent']); state.flags['ddp_relation'] += 5*(1-state.flags['dissent']); state.flags['lvp_relation'] += 5*(1-state.flags['dissent']);if (state.flags['unemployed'] >= 5) { state.flags['unemployed'] -= 1.5; };if (state.flags['upper_tax_rates'] < 0) { state.flags['capital_strike_progress'] -= 1; }; state.flags['inflation'] += 1; state.flags['dvp_left'] += 2; state.flags['ddp_cohesion'] += 1; state.flags['lvp_left'] += 1; state.flags['finance_goal_spd'] += 1; state.flags['finance_goal_spd_peoples'] += 1; state.flags['economic_growth'] += 0.6; 
  },

  

  render: `
    Cutting taxes benefits most the rich and middle-class, who pay more taxes than the working class. Our coalition partners are happy at our orthodox economic course. [? if in_grand_coalition or in_weimar_coalition: Furthermore, the liberals within our governing coalition will benefit from their participation in the government. This will help dispel the notion that they fail to adequately represent the interests of the middle class while in power. ?]
  `,
  choices: [
    
  ]
};

export const _cut_poor: Scene = {
  id: "cut_poor",
  title: "Cut consumption taxes for the poor.",
  subtitle: "-2 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 2; state.flags['lower_tax_rates'] -= 1; state.flags['workers_spd'] += 5*(1-state.flags['dissent']);if (state.flags['unemployed'] >= 5) { state.flags['unemployed'] -= 0.7; }; state.flags['inflation'] += 0.6; state.flags['economic_growth'] += 0.4; state.flags['finance_goal_completed'] += 1; state.flags['finance_goal_spd'] += 1; state.flags['labor_dissent'] -= 5; state.flags['left_dissent'] -= 5; 
  },

  

  render: `
    Our tax cuts disproportionately benefit the poor and working class.
  `,
  choices: [
    
  ]
};

export const _cut_rich: Scene = {
  id: "cut_rich",
  title: "Cut income taxes for the rich.",
  subtitle: "-2 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 2; state.flags['upper_tax_rates'] -= 1; state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 4*(1-state.flags['dissent']);if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_dvp'] -= 2; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_dvp'] -= 2; };if (state.flags['in_grand_coalition']) { state.flags['new_middle_dvp'] += 4; };if (state.flags['in_grand_coalition']) { state.flags['old_middle_dvp'] += 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_lvp'] += 6; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_lvp'] += 6; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_other'] -= 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_other'] -= 4; }; state.flags['dvp_relation'] += 4*(1-state.flags['dissent']); state.flags['lvp_relation'] += 4*(1-state.flags['dissent']); state.flags['z_relation'] += 4*(1-state.flags['dissent']); state.flags['ddp_relation'] += 4*(1-state.flags['dissent']);if (state.flags['unemployed'] >= 5) { state.flags['unemployed'] -= 0.7; };if (state.flags['upper_tax_rates'] < 0) { state.flags['capital_strike_progress'] -= 1; }; state.flags['inflation'] += 0.6; state.flags['economic_growth'] += 0.4; state.flags['finance_goal_spd_peoples'] += 1; state.flags['labor_dissent'] += 5; state.flags['left_dissent'] += 5; state.flags['dvp_left'] += 3; state.flags['ddp_cohesion'] -= 1; state.flags['ddp_right'] += 1; state.flags['lvp_left'] += 2; 
  },

  

  render: `
    We have reduced income and property taxes for the rich and middle class. The bourgeois parties approve of this orthodox economic course. [? if in_grand_coalition or in_weimar_coalition: Furthermore, the liberals within our governing coalition will benefit from their participation in the government. This will help dispel the notion that they fail to adequately represent the interests of the middle class while in power. ?]
  `,
  choices: [
    
  ]
};

export const _raise_overall: Scene = {
  id: "raise_overall",
  title: "raise_overall",
  subtitle: "+3 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] += 3; state.flags['new_middle_spd'] -= 4; state.flags['old_middle_spd'] -= 4; state.flags['workers_spd'] -= 4;if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_ddp'] -= 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] -= 2; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_ddp'] -= 2; };if (state.flags['in_weimar_coalition']) { state.flags['old_middle_ddp'] -= 2; };if (state.flags['in_grand_coalition']) { state.flags['new_middle_dvp'] -= 4; };if (state.flags['in_grand_coalition']) { state.flags['old_middle_dvp'] -= 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_lvp'] -= 6; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_lvp'] -= 6; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_other'] += 5; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_other'] += 5; }; state.flags['unemployed'] += 2; state.flags['kpd_coalition_dissent'] += 1; state.flags['lower_tax_rates'] += 1; state.flags['upper_tax_rates'] += 1;if (state.flags['upper_tax_rates'] > 1) { state.flags['capital_strike_progress'] += 1; };if (state.flags['upper_tax_rates'] > 2) { state.flags['capital_strike_progress'] += 1; };if (state.flags['lower_tax_rates'] > 1) { state.flags['workers_spd'] -= 5; }; state.flags['inflation'] -= 1.1; state.flags['goal_spd_cancel'] += 1; state.flags['goal_spd_cancel_peoples'] += 1; state.flags['economic_growth'] -= 0.6;if (state.flags['upper_tax_rates'] > 1) { state.flags['new_middle_spd'] -= 2; };if (state.flags['upper_tax_rates'] > 1) { state.flags['old_middle_spd'] -= 2; } 
  },

  

  render: `
    Raising taxes hurts our support among all those who pay taxes. [? if in_grand_coalition or in_weimar_coalition : However, our coalition partners are more supportive of the idea of "shared sacrifice" than simply taxing the rich. ?] Increasing taxes also decreases economic demand, which may lead to more unemployment. [? if in_grand_coalition or in_weimar_coalition: The liberals in our governing coalition will also face backlash from their support base for participating in the government that increases their own taxes. ?]
  `,
  choices: [
    
  ]
};

export const _regressive: Scene = {
  id: "regressive",
  title: "Lower taxes on the rich, while increasing consumption taxes (which affect the working class more).",
  subtitle: "This does not change overall revenue. [? if upper_tax_rates < -5 : Rich tax rates are too low to cut anymore. ?] [? if lower_tax_rates > 5 : Lower-class tax rates are too high to increase. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] -= 6; state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 5*(1-state.flags['dissent']);if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_dvp'] -= 2; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_ddp'] += 2; };if (state.flags['in_weimar_coalition']) { state.flags['new_middle_dvp'] -= 2; };if (state.flags['in_grand_coalition']) { state.flags['new_middle_dvp'] += 4; };if (state.flags['in_grand_coalition']) { state.flags['old_middle_dvp'] += 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_lvp'] += 6; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_lvp'] += 6; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['new_middle_other'] -= 4; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['old_middle_other'] -= 4; }; state.flags['dvp_relation'] += 5; state.flags['lvp_relation'] += 5; state.flags['z_relation'] += 4;if (((state.flags['in_grand_coalition'] || (state.flags['in_weimar_coalition'] && state.flags['lvp_formed'])) && state.flags['coalition_dissent'] > 0)) { state.flags['coalition_dissent'] -= 1; }; state.flags['kpd_coalition_dissent'] += 1; state.flags['upper_tax_rates'] -= 1; state.flags['lower_tax_rates'] += 1;if (state.flags['lower_tax_rates'] >= 2) { state.flags['workers_spd'] -= 5; };if (state.flags['upper_tax_rates'] < 0) { state.flags['capital_strike_progress'] -= 1; }; state.flags['dvp_left'] += 3; state.flags['ddp_cohesion'] -= 1; state.flags['ddp_right'] += 2; state.flags['lvp_left'] += 2; state.flags['workers_nsdap'] += 2; state.flags['goal_spd_cancel'] += 1; state.flags['finance_goal_spd_peoples'] += 1; state.flags['labor_dissent'] += 10; state.flags['left_dissent'] += 10; 
  },

  

  render: `
    Our regressive taxation policy benefits the rich while hurting the poor and working-class. Our bourgeois coalition partners approve of this orthodox economic course. [? if in_grand_coalition or in_weimar_coalition: Furthermore, the liberals within our governing coalition will benefit from their participation in the government. This will help dispel the notion that they fail to adequately represent the interests of the middle class while in power. ?]
  `,
  choices: [
    
  ]
};

export const _tariffs: Scene = {
  id: "tariffs",
  title: "Change tariffs instead.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Tariffs, or taxes on international imports, are another way to finance our government.
    Historically, <span style="color: #c00000;">socialists</span> have been in favor of free trade and a low-tariff regime. Workers in export-oriented industries benefit from free trade, and they also benefit from lower prices for imported necessities. Do the present economic circumstances change these calculations?
    Current tariff level: [+ tariffs : taxation +]
  `,
  choices: [
    {
      id: "raise_tariffs",
      text: "raise_tariffs",
      nextSceneId: "raise_tariffs",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "lower_tariffs",
      text: "lower_tariffs",
      nextSceneId: "lower_tariffs",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "fiscal_menu",
      text: "Change domestic taxes instead of tariffs.",
      nextSceneId: "fiscal_menu",
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
      text: "Do not change tariffs or taxes.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _raise_tariffs: Scene = {
  id: "raise_tariffs",
  title: "Raise tariffs on imports.",
  subtitle: "+2 budget. Other countries will retaliate by increasing tariffs of their own. [? if tariffs > 5 : Further increases in tariffs will not raise revenue, as we have already nearly reached economic autarky. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['tariffs'] += 1;if (state.flags['inflation'] > 0) { state.flags['inflation'] += 1; };if (state.flags['inflation'] <= 0) { state.flags['inflation'] += 0.5; }; state.flags['unemployed'] += 1.5; state.flags['budget'] += 2; state.flags['workers_spd'] -= 5; state.flags['unemployed_spd'] -= 5; state.flags['rural_spd'] += 4*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['ddp_relation'] -= 4; state.flags['dvp_relation'] -= 2; state.flags['lvp_relation'] -= 3; state.flags['west_relation'] -= 1; state.flags['east_relation'] -= 1; state.flags['reparations_negotiation'] -= 2;if (state.flags['eu_progress'] > 0) { state.flags['eu_progress'] -= 1; }; state.flags['peoples_party_support'] += 1; state.flags['ddp_cohesion'] -= 1;if (state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'] || (state.flags['in_popular_front'] && state.flags['liberal_parliament'] == 0)) { state.flags['rural_ddp'] -= 2; }; state.flags['tariff_goal_spd_peoples'] += 1; state.flags['economic_growth'] -= 0.4; 
  },

  

  render: `
    Increasing tariffs leads to higher prices for basic goods, increasing inflation and hurting consumption among the working class. Retaliatory tariffs reduce the competitiveness of German exports, raising unemployment among workers. They also lead to an atmosphere of international suspicion, reducing our ability to negotiate with other countries.
    On the other hand, agricultural producers and some small businesses benefit from higher tariffs, as farmers can now command higher prices for grain, and formerly uncompetitive businesses are now able to function.
  `,
  choices: [
    
  ]
};

export const _lower_tariffs: Scene = {
  id: "lower_tariffs",
  title: "Lower tariffs on imports.",
  subtitle: "-2 budget. [? if tariffs <= -5 : There are no tariffs left to cut. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['tariffs'] -= 1; state.flags['budget'] -= 2; state.flags['inflation'] -= 0.5; state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); state.flags['rural_spd'] -= 5; state.flags['old_middle_spd'] -= 3;if (! state.flags['kvp_formed']) { state.flags['rural_dnvp'] += 4; };if (! state.flags['kvp_formed']) { state.flags['old_middle_dnvp'] += 2; };if (state.flags['kvp_formed']) { state.flags['rural_kvp'] += 4; };if (state.flags['kvp_formed']) { state.flags['old_middle_kvp'] += 2; }; state.flags['west_relation'] += 1; state.flags['east_relation'] += 1;if (state.flags['eu_progress'] > 0) { state.flags['eu_progress'] += 1; }; state.flags['goal_spd_cancel_peoples'] += 1; state.flags['economic_growth'] += 0.4; 
  },

  

  render: `
    Lowering tariffs helps workers and the urban poor by reducing prices for basic necessities. In addition, other countries are pleased by lower tariffs, and are more willing to negotiate on many issues.
    Farmers are hurt by this policy, as cheap imported grain leads to ruin for some small producers. In general, cheap imports are detrimental for small-scale industries aimed at the domestic market. Those negatively affected have rallied behind the [? if not kvp_formed: <span style="color: #3E88B3;">**DNVP**</span>?][? if kvp_formed: <span style="color: #0087DC;">**KVP**</span>?][? if dnvp_ideology == "Radical":, stoking their urgency to reenter government to act upon this?]. 
  `,
  choices: [
    
  ]
};

export const _foreign_policy: Scene = {
  id: "foreign_policy",
  title: "Foreign Policy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['foreign_minister_party'] == "SPD" &&  state.flags['foreign_policy_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['foreign_policy_timer'] += 8; 
  },

  

  render: `
    #subtitle: International relations and dealing with Versailles.
    = Foreign Policy
    What should our foreign policy priority be?
  `,
  choices: [
    
  ]
};

export const _fp_menu: Scene = {
  id: "fp_menu",
  title: "fp_menu",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "improve_west",
      text: "improve_west",
      nextSceneId: "improve_west",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "improve_east",
      text: "improve_east",
      nextSceneId: "improve_east",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "improve_soviet",
      text: "improve_soviet",
      nextSceneId: "improve_soviet",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "improve_soviet_eco",
      text: "improve_soviet_eco",
      nextSceneId: "improve_soviet_eco",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "customs_union",
      text: "customs_union",
      nextSceneId: "customs_union",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "negotiate",
      text: "negotiate",
      nextSceneId: "negotiate",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "reduce_reparations",
      text: "reduce_reparations",
      nextSceneId: "reduce_reparations",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "settle_reparations",
      text: "settle_reparations",
      nextSceneId: "settle_reparations",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "expose",
      text: "expose",
      nextSceneId: "expose",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "european_union",
      text: "european_union",
      nextSceneId: "european_union",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "european_union_2",
      text: "european_union_2",
      nextSceneId: "european_union_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "concordat_negotiate",
      text: "concordat_negotiate",
      nextSceneId: "concordat_negotiate",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "concordat",
      text: "concordat",
      nextSceneId: "concordat",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_austria",
      text: "support_austria",
      nextSceneId: "support_austria",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_austria_2",
      text: "support_austria_2",
      nextSceneId: "support_austria_2",
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
      text: "Do not enact any policies for now.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _improve_west: Scene = {
  id: "improve_west",
  title: "Improve our relations with the <span style=\"color: #002654;\">Western</span> <span style=\"color: #D7141A;\">Allies</span>.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['west_relation'] += 2; state.flags['reparations_negotiation'] += 1; 
  },

  

  render: `
    The key to peace in Europe is a rapprochement between <span style="color: #002654;">France</span> and Germany. We are taking steps towards that rapprochement. [? if young_plan_seen == 0 : This is difficult to do when <span style="color: #002654;">France</span> is occupying a major portion of Germany's territory, but we are working on that part. ?]
  `,
  choices: [
    
  ]
};

export const _improve_east: Scene = {
  id: "improve_east",
  title: "Improve our relations with our eastern neighbors.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['east_relation'] += 2; 
  },

  

  render: `
    We also aim to improve relations with our eastern neighbors, <span style="color: #DC143C;">Pol</span><span style="color: #FFFFFF;">and</span> and <span style="color: #11457E;">Czech</span><span style="color: #FFFFFF;">oslo</span><span style="color: #D7141A;">vakia</span>, who are rightfully terrified of German aggression. Hopefully we can convince them of our peaceful intentions.
  `,
  choices: [
    
  ]
};

export const _improve_soviet_eco: Scene = {
  id: "improve_soviet_eco",
  title: "Expand our exports to the <span style=\"color: #750e0e;\">**Soviet Union**</span>.",
  subtitle: "A win for our economy and for our relationship with the <span style=\"color: #700000;\">**KPD**</span>.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['year'] >= 1930);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['soviet_export'] = 1; state.flags['soviet_relation'] += 1; state.flags['economic_growth'] += 0.5; state.flags['unemployed'] -= 0.5; state.flags['foreign_goal_completed'] += 1; state.flags['kpd_relation'] += 6; state.flags['communist_coalition'] += 1; state.flags['hindenburg_angry'] += 15; state.flags['z_relation'] -= 3; state.flags['ddp_relation'] -= 3; state.flags['dvp_relation'] -= 3; state.flags['lvp_relation'] -= 3; state.flags['dvp_right'] += 1; state.flags['lvp_right'] += 1; state.flags['ddp_right'] += 1; 
  },

  

  render: `
    The <span style="color: #750e0e;">Soviet Union</span>, with its centrally planned economy and isolation from global markets, has insulated itself from the effects of the Great Depression. They have since been rapidly industrializing in accordance with their Five-Year Plan, making them a prime partner for exports, especially as tariffs from our nominal trading partners in the West have increased, along with their general isolation from international markets.
    The <span style="color: #940000;">Soviets</span> are pleased by this, and we stand to reap the economic benefits. The only downside is that the right-wing propaganda machine has decried this action, pressuring [? if president == "Hindenburg": President Hindenburg and?] the bourgeois parties to break with us.
  `,
  choices: [
    
  ]
};

export const _improve_soviet: Scene = {
  id: "improve_soviet",
  title: "Improve our relations with the <span style=\"color: #750e0e;\">**Soviet Union**</span>.",
  subtitle: "We could also broach the question of the <span style=\"color: #700000;\">**KPD**</span>...",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The <span style="color: #750e0e;">Soviet Union</span> also suffered from the international order created by the Treaty of Versailles; they have been participating in our secret rearmament program. The Treaty of Rapallo in 1922 affirmed our friendly relations.
    The <span style="color: #940000;">Soviets</span> are asking for economic and developmental assistance. They are still a poor country on the whole, and are desperately trying to catch up to the western powers. There is a chance that our <span style="color: #FF0000;">anti</span>-<span style="color: #700000;">communist</span> coalition partners would be upset, but we could assuage them by asking the <span style="color: #940000;">Soviets</span> for secret assistance in training and equipping the Reichswehr.
  `,
  choices: [
    {
      id: "soviet_economic_aid_yes_mil",
      text: "Provide aid, in exchange for Reichswehr assistance.",
      nextSceneId: "soviet_economic_aid_yes_mil",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "soviet_economic_aid_yes",
      text: "Provide aid, in exchange for only good relations.",
      nextSceneId: "soviet_economic_aid_yes",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "soviet_economic_aid_no",
      text: "Don't provide aid.",
      nextSceneId: "soviet_economic_aid_no",
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

export const _soviet_economic_aid_yes_mil: Scene = {
  id: "soviet_economic_aid_yes_mil",
  title: "soviet_economic_aid_yes_mil",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['soviet_aid_forpol'] = 1; state.flags['budget'] -= 1; state.flags['soviet_relation'] += 1; state.flags['reichswehr_militancy'] += 0.2; state.flags['reichswehr_loyalty'] += 0.05; state.flags['foreign_goal_completed'] += 1; 
  },

  

  render: `
    The <span style="color: #940000;">Soviets</span> are pleased that we have sent them aid, and have agreed to help train our military. The Reichswehr appreciates our support.
  `,
  choices: [
    
  ]
};

export const _soviet_economic_aid_yes: Scene = {
  id: "soviet_economic_aid_yes",
  title: "soviet_economic_aid_yes",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['soviet_aid_forpol'] = 1; state.flags['budget'] -= 1; state.flags['soviet_relation'] += 2; state.flags['coalition_dissent'] += 1; state.flags['foreign_goal_completed'] += 1; 
  },

  

  render: `
    The <span style="color: #940000;">Soviets</span> are pleased that we have sent them aid, and have not asked for anything specific in exchange. Our coalition partners are less pleased.
  `,
  choices: [
    {
      id: "kpd",
      text: "Ask if <span style=\"color: #940000;\">Moscow</span> could help repair our relations with the <span style=\"color: #700000;\">**KPD**</span>.",
      nextSceneId: "kpd",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "wittorf",
      text: "Do the <span style=\"color: #940000;\">Soviets</span> know about the Wittorf Affair? Do they know that we know?",
      nextSceneId: "wittorf",
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
      text: "Do not mention the <span style=\"color: #700000;\">**KPD**</span>.",
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

export const _soviet_economic_aid_no: Scene = {
  id: "soviet_economic_aid_no",
  title: "soviet_economic_aid_no",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The <span style="color: #940000;">Soviets</span> are slightly upset, but they seemed to expect this answer.
  `,
  choices: [
    
  ]
};

export const _kpd: Scene = {
  id: "kpd",
  title: "kpd",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] += 8*(1-state.flags['dissent']);if (state.flags['kpd_foreign_seen'] == 0) { state.flags['communist_coalition'] += 1; }; state.flags['kpd_foreign_seen'] = 1; 
  },

  

  render: `
    We also mention the <span style="color: #700000;">**KPD**</span> in our conversations with the <span style="color: #940000;">Soviet</span> ambassador. They claim that the <span style="color: #700000;">**KPD**</span> is entirely independent of the <span style="color: #940000;">Soviet</span> government, and that the conflict is Thälmann's doing. But, soon after our conversation we notice a slight improvement in attitudes from the <span style="color: #700000;">**KPD**</span>.
  `,
  choices: [
    
  ]
};

export const _wittorf: Scene = {
  id: "wittorf",
  title: "wittorf",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wittorf_secret'] == 1 && ((state.flags['year'] == 1929 && state.flags['month'] < 6) || state.flags['year'] == 1928) && state.flags['wittorf_soviet_union'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['wittorf_soviet_union'] = 1; state.flags['kpd_relation'] += 6*(1-state.flags['dissent']); state.flags['kpd_foreign_seen'] = 1; 
  },

  

  render: `
    Of course <span style="color: #8B0000;">Stalin</span> and the various leaders of the <span style="color: #D50000;">Comintern</span> know about the Wittorf Affair, but they do not seem to know that we know as well. The <span style="color: #D50000;">Comintern</span> was planning to build a narrative around the affair that absolves Thälmann, but perhaps now they will be less inclined to defend him.
  `,
  choices: [
    
  ]
};

export const _customs_union: Scene = {
  id: "customs_union",
  title: "Form a customs union with Austria?",
  subtitle: "This will likely incur the wrath of <span style=\"color: #002654;\">France</span>.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['black_thursday_seen'] == 1 && state.flags['customs_union'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The right has long desired closer ties with Austria, with the eventual goal of the merger of the two German-speaking countries. A customs union with Austria is the first step towards this goal. Additionally, many believe that a union with Austria would improve our current economic circumstances.
    However, the Allies, especially <span style="color: #002654;">France</span>, are likely to object. This agreement would break the terms of the Versailles Treaty, and could lead to economic sanctions, further hurting our economy.
  `,
  choices: [
    {
      id: "customs_union_2",
      text: "Yes, do it!",
      nextSceneId: "customs_union_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "fp_menu",
      text: "No, we should do something else.",
      nextSceneId: "fp_menu",
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

export const _customs_union_2: Scene = {
  id: "customs_union_2",
  title: "customs_union_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['banking_crisis_timer'] = 4; state.flags['customs_union'] = 1; state.flags['west_relation'] -= 2; state.flags['east_relation'] -= 2; state.flags['z_relation'] += 6; state.flags['dvp_relation'] += 6; state.flags['ddp_relation'] += 4; state.flags['lvp_relation'] += 6;if (state.flags['coalition_dissent'] > 0) { state.flags['coalition_dissent'] -= 1; }; state.flags['coup_progress'] -= 1; state.flags['hindenburg_angry'] -= 15; 
  },

  

  render: `
    We have formed a customs union with Austria! The right-wing parties are praising us for this unexpected turn of events.
    Immediately, <span style="color: #002654;">France</span> and other neighboring countries lodge their protests. The longer-term response is yet to be seen.
  `,
  choices: [
    
  ]
};

export const _negotiate: Scene = {
  id: "negotiate",
  title: "Negotiate regarding our remaining obligations from the Treaty of Versailles.",
  subtitle: "[? if young_plan_seen == 1 and black_thursday_seen : After passing the Young Plan, <span style=\"color: #002654;\">France</span> has committed to withdrawing from the Rhineland. Now, we must see if they can reduce our reparations further, given the economic depression. ?][? if young_plan_seen == 1 and not black_thursday_seen : After passing the Young Plan, <span style=\"color: #002654;\">France</span> has committed to withdrawing from the Rhineland. Now, we must see if they can reduce our reparations further. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reparations'] > -2 && state.flags['reparations_negotiation'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['west_relation'] += 1; state.flags['reparations_negotiation'] += 1;if (state.flags['pacifism'] >= 3) { state.flags['reparations_negotiation'] += 1; };if (state.flags['nationalism'] <= 50) { state.flags['reparations_negotiation'] += 1; };if (state.flags['west_relation'] >= 3) { state.flags['reparations_negotiation'] += 1; } 
  },

  

  render: `
    Negotiations proceed smoothly for the most part. The Western powers are convinced of Germany's sincerity and goodwill. [? if nationalism <= 50 or pacifism >= 3 : They are pleased to see that we are renouncing militarism. ?]
  `,
  choices: [
    
  ]
};

export const _reduce_reparations: Scene = {
  id: "reduce_reparations",
  title: "The <span style=\"color: #0A3161;\">Western</span> <span style=\"color: #C8102E;\">Allies</span> are finally willing to pause our reparations payments!",
  subtitle: "Our negotiations have been successful.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reparations_negotiation'] >= 3 && state.flags['reparations'] > -2 && state.flags['young_plan_seen']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['west_relation'] += 1; state.flags['reparations'] = -2;if (state.flags['hoover_memorandum_seen'] == 0) { state.flags['budget'] += 2; };if (state.flags['hoover_memorandum_seen'] == 1) { state.flags['budget'] += 1; };if (state.flags['coalition_dissent'] > 0) { state.flags['coalition_dissent'] -= 1; }; state.flags['workers_spd'] += 8*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['rural_spd'] += 5*(1-state.flags['dissent']);if (state.flags['coup_progress'] > 2) { state.flags['coup_progress'] -= 2; }; state.flags['dvp_left'] += 3; state.flags['pro_republic'] += 8; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] += 1; state.flags['lvp_left'] += 3; state.flags['hindenburg_angry'] -= 20;if (state.flags['economic_growth'] < 0) { state.flags['economic_growth'] += 0.5; }; state.flags['labor_dissent'] -= 15; state.flags['dvp_relation'] += 5; state.flags['ddp_relation'] += 5; state.flags['z_relation'] += 5; state.flags['lvp_relation'] += 5; 
  },

  

  render: `
    Finally, given both the economic circumstances and our continued negotiations, the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> are willing to pause our reparations payments! Much of the credit must go to <span style="color: #0A3161;">Western</span> president Hoover, who has been friendlier towards us than the <span style="color: #001489;">Europeans</span>.
    This has reduced tensions within our government, and our party has gotten credit for the achievement.
  `,
  choices: [
    
  ]
};

export const _settle_reparations: Scene = {
  id: "settle_reparations",
  title: "We will finally settle the reparations issues with the <span style=\"color: #0A3161;\">Western</span> <span style=\"color: #C8102E;\">Allies</span>!",
  subtitle: "The issue of reparations and future payments will finally be resolved.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reparations'] == -2 && ! state.flags['lausanne_seen']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['west_relation'] += 1; state.flags['eu_progress'] += 1; state.flags['reparations_resolved'] = 1; state.flags['budget'] += 1;if (state.flags['coalition_dissent'] > 0) { state.flags['coalition_dissent'] -= 3; }; state.flags['workers_spd'] += 8*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 6*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 6*(1-state.flags['dissent']); state.flags['rural_spd'] += 6*(1-state.flags['dissent']); state.flags['catholics_spd'] += 6*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 6*(1-state.flags['dissent']);if (state.flags['coup_progress'] > 4) { state.flags['coup_progress'] -= 4; }; state.flags['dvp_left'] += 8; state.flags['ddp_left'] += 4; state.flags['ddp_cohesion'] += 4; state.flags['pro_republic'] += 15; state.flags['lvp_left'] += 8; state.flags['hindenburg_angry'] -= 100; state.flags['economic_growth'] += 2.5; state.flags['unemployed'] -= 3; state.flags['labor_dissent'] -= 15; state.flags['workers_nsdap'] -= 5; state.flags['unemployed_nsdap'] -= 5; state.flags['new_middle_nsdap'] -= 5; state.flags['old_middle_nsdap'] -= 5; state.flags['rural_nsdap'] -= 5; state.flags['catholics_nsdap'] -= 5; state.flags['dvp_relation'] += 10; state.flags['ddp_relation'] += 10; state.flags['z_relation'] += 10; state.flags['lvp_relation'] += 10; 
  },

  

  render: `
    With our success in negotiating a pause in reparation payments, the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> have been convinced of our sincere commitment to pacifism and distancing from militarism. Additionally, <span style="color: #002654;">France</span>'s new <span style="color: #E0B0FF;">left-wing</span> Prime Minister has been considerably more amicable than their predecessor. As a result, we have secured their agreement to a conference aimed at finally settling the reparations issue.
    In the end, Germany is required to make only a final payment of three billion marks, effectively ending future reparation obligations. This has greatly boosted investor confidence and sparked a new wave of capital inflows to Germany. This has greatly eased tensions within our government, with our party receiving credit for the achievement—much to the detriment of the <span style="color: #7A3C00;">**NSDAP**</span>, which had built much of its appeal on the narrative of Germany’s "national slavery."
  `,
  choices: [
    {
      id: "schleicher_spd",
      text: "schleicher_spd",
      nextSceneId: "schleicher_spd",
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

export const _schleicher_spd: Scene = {
  id: "schleicher_spd",
  title: "But of course, Schleicher stipulates that we demand military parity.",
  subtitle: "This will be a severe betrayal of our values!",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['schleicher_spd'] && state.flags['president'] == "Hindenburg");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (state.flags['eu'] || (state.flags['west_relation'] >= 8 && state.flags['reformist_strength'] >= state.flags['left_strength'] + state.flags['center_strength'] && state.flags['soviet_relation'] == 0 && state.flags['kpd_relation'] < 30)) { state.flags['military_parity'] = 1; };if (state.flags['military_parity']) { state.flags['reichswehr_strength'] += 300; };if (state.flags['military_parity']) { state.flags['sh_strength'] -= 100; };if (state.flags['military_parity']) { state.flags['sa_strength'] -= 50; };if (state.flags['military_parity']) { state.flags['rb_strength'] -= 150; }; state.flags['nationalism'] += 5;if (state.flags['military_parity']) { state.flags['nationalism'] += 15; }; state.flags['pacifism'] -= 3;if (state.flags['military_parity']) { state.flags['reichswehr_loyalty'] += 0.5; };if (state.flags['military_parity']) { state.flags['reichswehr_militancy'] += 2; }; state.flags['workers_spd'] -= 6; state.flags['old_middle_spd'] -= 2; state.flags['new_middle_spd'] -= 4; state.flags['rural_spd'] -= 2; state.flags['catholics_spd'] -= 2; state.flags['unemployed_spd'] -= 4; state.flags['workers_kpd'] += 6; state.flags['old_middle_ddp'] += 2; state.flags['new_middle_ddp'] += 4; state.flags['rural_ddp'] += 2; state.flags['catholics_kpd'] += 2; state.flags['unemployed_kpd'] += 4;if (state.flags['military_parity']) { state.flags['old_middle_spd'] += 20; };if (state.flags['military_parity']) { state.flags['workers_nsdap'] -= 3; };if (state.flags['military_parity']) { state.flags['unemployed_nsdap'] -= 4; };if (state.flags['military_parity']) { state.flags['new_middle_nsdap'] -= 3; };if (state.flags['military_parity']) { state.flags['old_middle_nsdap'] -= 15; };if (state.flags['military_parity']) { state.flags['rural_nsdap'] -= 3; };if (state.flags['military_parity']) { state.flags['catholics_nsdap'] -= 3; }; state.flags['left_dissent'] += 50; state.flags['center_dissent'] += 40; state.flags['labor_dissent'] += 30; state.flags['reformist_dissent'] += 20; state.flags['neorevisionist_dissent'] += 20; state.flags['left_strength'] -= 20; state.flags['center_strength'] -= 10; state.flags['ddp_relation'] -= 5; state.flags['dvp_relation'] += 15; state.flags['dvp_left'] += 5; state.flags['ddp_left'] += 10; state.flags['ddp_cohesion'] += 5; state.flags['lvp_relation'] += 5;if (state.flags['ddp_leader'] == "Lüders") { state.flags['new_middle_ddp'] += 10; };if (state.flags['ddp_leader'] == "Lüders") { state.flags['new_middle_spd'] -= 10; };if (state.flags['ddp_leader'] == "Lüders") { state.flags['workers_ddp'] += 5; };if (state.flags['ddp_leader'] == "Lüders") { state.flags['workers_spd'] -= 5; }; state.flags['west_relation'] -= 4; state.flags['eu_progress'] -= 2; 
  },

  

  render: `
    General Schleicher has demanded that we raise the issue of rearmament, which remains restricted under the Treaty of Versailles. However, <span style="color: #002654;">French</span> Premier Édouard Herriot seized on this as an admission that Germany is, in fact, capable of paying its reparations and would simply redirect freed-up funds toward rearmament.
    [? if military_parity:[? if eu: However, with the formation of the <span style="color: #001489;">European</span> <span style="color: #FFDD00;">Union</span> and its defense agreements, preventing Germany’s rearmament has become increasingly irrelevant. As a result, military restrictions are lifted!?][? if not eu: However, our exceptionally friendly relations with the <span style="color: #0A3161;">Western</span> <span style="color: #C8102E;">Allies</span> have led them to begrudgingly grant us flexibility in rearmament, believing that we could serve as a bulwark against the <span style="color: #700000;">Bolsheviks</span>.?] As a result, the <span style="color: #7A3C00;">**NSDAP**</span> has lost yet another propaganda tool. However, we continue to suffer heavy losses to the <span style="color: #700000;">**Communists**</span>[? if not lvp_formed:&nbsp;and <span style="color: #D3C24D;">**[+ ddp_name +]**</span>, who we have suffered serious defections to?]. ?]
    [? if not military_parity: This has caused great embarrassment to our pacifist and democratic image, both at home and abroad. Damn you, Schleicher! ?]
  `,
  choices: [
    
  ]
};

export const _expose: Scene = {
  id: "expose",
  title: "Expose the secret rearmament plans of the previous foreign ministry!",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rearmament_exposed'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['west_relation'] += 2; state.flags['east_relation'] += 1; state.flags['nationalism'] -= 5*(1-state.flags['dissent']); state.flags['pro_republic'] += 5*(1-state.flags['dissent']); state.flags['coalition_dissent'] += 1; state.flags['reichswehr_loyalty'] -= 0.05; state.flags['rearmament_exposed'] += 1; state.flags['reparations_negotiation'] += 3; state.flags['coup_progress'] += 2; state.flags['dvp_right'] += 2; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['lvp_right'] += 1; state.flags['hindenburg_angry'] += 20; 
  },

  

  render: `
    The previous foreign ministry, despite its benevolent and peaceful face, was secretly helping the Reichswehr to build up its forces, in contravention of the Treaty of Versailles.
    The Allies are grateful of our exposure and repudiation of militarism. Our partners in the coalition are less supportive.
  `,
  choices: [
    
  ]
};

export const _concordat_negotiate: Scene = {
  id: "concordat_negotiate",
  title: "Negotiate a Concordat between the Germany and the Vatican.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['prussian_concordat'] == 1 || ! state.flags['spd_prussia']) && state.flags['reichskonkordat'] == 0 && state.flags['reichskonkordat_progress'] < 4);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reichskonkordat_progress'] += 1;if (state.flags['z_leader'] == "Kaas") { state.flags['reichskonkordat_progress'] += 1; };if (state.flags['abortion_rights']) { state.flags['reichskonkordat_progress'] -= 1; };if (state.flags['family_law']) { state.flags['reichskonkordat_progress'] -= 1; }; state.flags['z_relation'] += 3*(1-state.flags['dissent']); state.flags['dvp_relation'] -= 1; state.flags['ddp_relation'] -= 2; state.flags['ddp_cohesion'] -= 0.25; state.flags['lvp_relation'] -= 1; state.flags['foreign_goal_spd_peoples'] += 1; 
  },

  

  render: `
    The Roman Catholic Church is interested in furthering relations with the German Republic, seeing us as preferable to the old anti-Catholic policies of the Empire. We are working towards the signing of a Concordat, an agreement between the Vatican and the Republic that formally recognizes the Church's rights and interests in the country. The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] is especially interested in making this agreement. The liberal parties are against this idea.
    [? if family_law : Our liberalized divorce policies make it difficult to build relations with the Vatican. ?] [? if abortion : Our legalization of abortion make it difficult to connect with the Church. ?] [? if z_leader == "Kaas" : Kaas from the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] is able to use his connections to speed up negotiations. ?]
  `,
  choices: [
    
  ]
};

export const _concordat: Scene = {
  id: "concordat",
  title: "We can sign a Concordat with the Vatican!",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reichskonkordat_progress'] >= 4 && state.flags['reichskonkordat'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reichskonkordat'] = 1; state.flags['z_relation'] += 15*(1-state.flags['dissent']); state.flags['catholics_spd'] += 8*(1-state.flags['dissent']);if (state.flags['in_weimar_coalition'] || state.flags['in_grand_coalition'] || state.flags['in_popular_front']) { state.flags['catholics_z'] += 5; }; state.flags['foreign_goal_spd_peoples'] += 1; 
  },

  

  render: `
    We have successfully signed a Concordat between Germany and the Roman Catholic Church! This treaty defines a formal relationship between the Church and the German state, guaranteeing freedom of worship for Catholics, and the right of the church to appoint their own clergy. Catholics in Germany are pleased, as are their representatives in the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?].
  `,
  choices: [
    
  ]
};

export const _support_austria: Scene = {
  id: "support_austria",
  title: "Diplomatically support Austrian democracy against the Dollfuß dictatorship.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['austrian_parliament_seen'] == 1 && state.flags['austrian_civil_war_seen'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sdapo_strength'] += 1; state.flags['left_dissent'] -= 3; state.flags['center_dissent'] -= 3; 
  },

  

  render: `
    We provide verbal backing to Austrian democracy, wage a war of words against <span style="color: #7A3C00;">Austrofascism</span>, and promulgate additional trade sanctions. Time will tell if it will be enough.
  `,
  choices: [
    
  ]
};

export const _support_austria_2: Scene = {
  id: "support_austria_2",
  title: "Provide material support to Austrian democracy against the Dollfuß dictatorship.",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['austrian_parliament_seen'] == 1 && state.flags['austrian_civil_war_seen'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['sdapo_strength'] += 3; state.flags['left_dissent'] -= 6; state.flags['center_dissent'] -= 6; 
  },

  

  render: `
    In public, we provide verbal backing to Austrian democracy, wage a war of words against <span style="color: #7A3C00;">Austrofascism</span>, and promulgate additional trade sanctions. Privately, we provide financial and various forms of "support" to our comrades in Austria in their struggle against dictatorship.
  `,
  choices: [
    
  ]
};

export const _european_union: Scene = {
  id: "european_union",
  title: "Take steps to form a \"<span style=\"color: #001489;\">European</span> <span style=\"color: #FFDD00;\">Union</span>\".",
  subtitle: "Is a \"United States of Europe\" possible?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reparations'] <= -2 && state.flags['eu_progress'] < 3 && ! state.flags['eu'] && state.flags['france_left_seen']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['eu_negotiation'] = 1; state.flags['eu_progress'] += 1; state.flags['west_relation'] += 1; state.flags['foreign_goal_spd_peoples'] += 1; 
  },

  

  render: `
    Forming a "<span style="color: #FFDD00;">United States</span> of <span style="color: #001489;">Europe</span>" has long been part of the <span style="color: #c00000;">**Social Democratic**</span> foreign program. Finally, we are taking steps towards it. Given our positive relations with the other countries of <span style="color: #001489;">Europe</span>, we can begin to hold multilateral negotiations for more <span style="color: #001489;">European</span> <span style="color: #FFDD00;">federalism</span>. It will take time to hammer out the exact shape of this future "<span style="color: #001489;">European</span> <span style="color: #FFDD00;">Union</span>", however.
  `,
  choices: [
    
  ]
};

export const _european_union_2: Scene = {
  id: "european_union_2",
  title: "We can sign a treaty to form a <span style=\"color: #001489;\">European</span> <span style=\"color: #FFDD00;\">Union</span>!",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['west_relation'] >= 5 && state.flags['east_relation'] >= 4 && state.flags['eu_progress'] >= 3 && ! state.flags['eu'] && state.flags['france_left_seen']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['eu'] = 1;if (state.flags['unemployed'] >= 10) { state.flags['unemployed'] -= 2; };if (state.flags['inflation'] <= -2) { state.flags['inflation'] += 2; };if (state.flags['inflation'] >= 4.5) { state.flags['inflation'] -= 1; }; state.flags['workers_spd'] += 5*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['rural_spd'] += 4*(1-state.flags['dissent']); state.flags['catholics_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); state.flags['pro_republic'] += 5; state.flags['nationalism'] -= 5; state.flags['budget'] += 1; state.flags['ddp_left'] += 3; state.flags['ddp_cohesion'] += 3; state.flags['ddp_relation'] += 10; state.flags['lvp_relation'] += 5; state.flags['foreign_goal_spd_peoples'] += 1;if (state.flags['economic_growth'] < 3) { state.flags['economic_growth'] += 1; }; state.flags['kpd_coalition_dissent'] += 1; state.flags['kpd_relation'] -= 10; 
  },

  

  render: `
    Along with <span style="color: #002654;">France</span>, <span style="color: #C8102E;">Great Britain</span>, and many other states of Western and Eastern Europe, we have signed a treaty to form a <span style="color: #001489;">European</span> <span style="color: #FFDD00;">Union</span>! It is hoped that <span style="color: #001489;">Europe</span> has learned the lessons of the Great War; never again will there be another war that tears the continent apart.
    A major component of the union is the free movement of people and goods across the countries of Europe, as well as the stabilization of currency exchange rates. This provides new markets for German products and new sources of investment.
    <span style="color: #7A3C00;">Fascist</span> Italy remains a problem, and the <span style="color: #750e0e;">Soviet Union</span> also lies outside the system. But for now, there is new hope for peace and prosperity throughout the continent.
  `,
  choices: [
    
  ]
};

export const _homosexual_rights: Scene = {
  id: "homosexual_rights",
  title: "Homosexual Rights",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && (state.flags['progressive_coalition'] >= 50) && state.flags['chancellor_party'] == "SPD" && state.flags['homosexual_rights_timer'] == 0 && state.flags['homosexual_rights'] < 3 && ! state.flags['cvp_women_accepted']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['homosexual_rights_timer'] += 11; state.flags['month_actions'] += 1; 
  },

  

  render: `
    = <span style="color: red;">Ho</span><span style="color: orange;">m</span><span style="color: yellow;">o</span><span style="color: green;">se</span><span style="color: blue;">xu</span><span style="color: purple;">al</span> Rights
    There is a constellation of different groups that have grown up around divergences in gender and sexuality, including <span style="color: red;">ho</span><span style="color: orange;">m</span><span style="color: yellow;">os</span><span style="color: green;">ex</span><span style="color: blue;">ua</span><span style="color: purple;">ls</span>, <span style="color: coral;">les</span><span style="color: linen;">bi</span><span style="color: mediumvioletred;">ans</span>, <span style="color: deepskyblue;">tran</span><span style="color: linen;">sse</span><span style="color: lightpink;">xuals</span>, transvestites, inverts, etc. Our party's policy is to support their right to live freely and free from persecution; Magnus Hirschfeld, the founder of the Institut für Sexualwissenschaft, is a member of our party and a major advocate for <span style="color: red;">ho</span><span style="color: orange;">m</span><span style="color: yellow;">o</span><span style="color: green;">se</span><span style="color: blue;">xu</span><span style="color: purple;">al</span> rights. 
    # economic growth due to gay tourism, and creating a new economic niche for the gay populace.
  `,
  choices: [
    {
      id: "repeal_175",
      text: "Repeal Paragraph 175.",
      nextSceneId: "repeal_175",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "reform_183",
      text: "Reform Paragraph 183.",
      nextSceneId: "reform_183",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "change_sex",
      text: "Create a legal process for changing sex.",
      nextSceneId: "change_sex",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "return",
      text: "Do not enact any changes for now.",
      nextSceneId: "return",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _repeal_175: Scene = {
  id: "repeal_175",
  title: "repeal_175",
  subtitle: "Paragraph 175 currently criminalizes <span style=\"color: red;\">ho</span><span style=\"color: orange;\">m</span><span style=\"color: yellow;\">o</span><span style=\"color: green;\">se</span><span style=\"color: blue;\">xu</span><span style=\"color: purple;\">al</span> acts. We can pass a law to change that.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['repealed_175'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['repealed_175'] = 1; state.flags['homosexual_rights'] += 1; state.flags['z_relation'] -= 5; state.flags['kpd_relation'] += 4*(1-state.flags['dissent']); state.flags['ddp_relation'] += 4*(1-state.flags['dissent']);if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['coalition_dissent'] += 1; }; state.flags['catholics_spd'] -= 4; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['economic_growth'] += 0.1; 
  },

  

  render: `
    Together with the progressives in the <span style="color: #700000;">**KPD**</span> and [? if not lvp_formed: <span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed: leftist <span style="color: #FFCC00;">**LVP**</span> members?], we have effectively decriminalized <span style="color: red;">ho</span><span style="color: orange;">m</span><span style="color: yellow;">o</span><span style="color: green;">se</span><span style="color: blue;">xu</span><span style="color: purple;">al</span> sex in Germany. Persecution of <span style="color: red;">ho</span><span style="color: orange;">m</span><span style="color: yellow;">o</span><span style="color: green;">se</span><span style="color: blue;">xu</span><span style="color: purple;">al</span> for their private acts will stop, as long as the police are loyal to the republic.
    Of course, conservatives and the <span style="color: #7A3C00;">far</span> <span style="color: #3E88B3;">right</span> accuse us of "degeneracy".
  `,
  choices: [
    
  ]
};

export const _heuchelei: Scene = {
  id: "heuchelei",
  title: "heuchelei",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _reform_183: Scene = {
  id: "reform_183",
  title: "reform_183",
  subtitle: "Paragraph 183 criminalizes public <span style=\"color: red;\">ho</span><span style=\"color: orange;\">m</span><span style=\"color: yellow;\">o</span><span style=\"color: green;\">se</span><span style=\"color: blue;\">xu</span><span style=\"color: purple;\">al</span> displays and cross-dressing. We can change that.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reformed_183'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reformed_183'] = 1; state.flags['homosexual_rights'] += 1; state.flags['z_relation'] -= 5; state.flags['kpd_relation'] += 4*(1-state.flags['dissent']); state.flags['ddp_relation'] += 4*(1-state.flags['dissent']);if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['coalition_dissent'] += 1; }; state.flags['catholics_spd'] -= 4; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['economic_growth'] += 0.1; 
  },

  

  render: `
    Voting together with the progressives in the <span style="color: #700000;">**KPD**</span> and [? if not lvp_formed: <span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed: leftist <span style="color: #FFCC00;">**LVP**</span> members?], we have reformed Paragraph 183 so that it no longer criminalizes public <span style="color: red;">ho</span><span style="color: orange;">mo</span><span style="color: yellow;">se</span><span style="color: green;">xu</span><span style="color: blue;">al</span><span style="color: purple;">ity</span> and <span style="color: deepskyblue;">cross</span>-<span style="color: deeppink;">dressing</span>.
  `,
  choices: [
    
  ]
};

export const _change_sex: Scene = {
  id: "change_sex",
  title: "change_sex",
  subtitle: "We can create a legal process for individuals to change their sex, making their lives easier.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['trans_rights'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['trans_rights'] = 1; state.flags['homosexual_rights'] += 1; state.flags['z_relation'] -= 5; state.flags['kpd_relation'] += 4*(1-state.flags['dissent']); state.flags['ddp_relation'] += 4*(1-state.flags['dissent']);if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition'])) { state.flags['coalition_dissent'] += 1; }; state.flags['catholics_spd'] -= 4; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['economic_growth'] += 0.1; 
  },

  

  render: `
    We have passed a bill to allow legal recognition of <span style="color: deepskyblue;">tran</span><span style="color: linen;">sse</span><span style="color: lightpink;">xuals</span> and transvestite individuals as the sex in which they live, and allow them to change their name, dress as they wish without police persecution, and undergo medical treatment.
    Of course, conservatives and the <span style="color: #7A3C00;">far</span> <span style="color: #3E88B3;">right</span> accuse us of "degeneracy".
  `,
  choices: [
    
  ]
};

export const _judiciary: Scene = {
  id: "judiciary",
  title: "Judiciary Reform",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['justice_minister_party'] == "SPD" && state.flags['judiciary_timer'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['judiciary_timer'] += 6; 
  },

  

  render: `
    = Judiciary Reform
    The Judiciary is one of the most <span style="color: #808080;">reactionary</span> components of the government, along with the military. Many jurists have held office since the days of the Emperor. They give violent <span style="color: #7A3C00;">fascists</span> like Adolf Hitler laughably light sentences, while ruthlessly persecuting leftists and pacifists for lesser crimes.
    [? if judicial_reform <= 0 : There is great demand in our membership for reforming the judiciary, although this may bring us into a collision course with our coalition allies. ?]
    [? if judicial_reform == 1 : We have started on the path to judicial reform. While some of the most antediluvian and biased justices have been replaced, many still remain. More should be done. ?]
    [? if judicial_reform >= 2 : We have successfully reformed the judiciary, to some extent. At the very least, the courts will not actively obstruct our attempts to prosecute crimes committed by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. ?]
  `,
  choices: [
    {
      id: "reform",
      text: "Carry out substantial judicial reforms.",
      nextSceneId: "reform",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "minor_reforms",
      text: "Carry out minor judicial reforms.",
      nextSceneId: "minor_reforms",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "as_is",
      text: "Leave the judiciary as it is.",
      nextSceneId: "as_is",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _reform: Scene = {
  id: "reform",
  title: "reform",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['democratization'] += 2;if ((state.flags['in_grand_coalition'] || (state.flags['in_weimar_coalition'] && state.flags['lvp_formed']))) { state.flags['coalition_dissent'] += 1; };if (state.flags['democratization'] >= 3) { state.flags['workers_spd'] += 5*(1-state.flags['dissent']); }; state.flags['judicial_reform'] += 2; state.flags['pro_republic'] += 4*(1-state.flags['dissent']); state.flags['coup_progress'] += 1;if (state.flags['historical_mode']) { state.flags['coalition_dissent'] += 1; }; state.flags['dvp_left'] += 2; state.flags['ddp_left'] += 1; state.flags['lvp_left'] += 1.5; state.flags['hindenburg_angry'] += 5; 
  },

  

  render: `
    We investigate jurists who have shown themselves to have biased or corrupt behavior, and try to remove them, replacing them with more democratically-oriented jurists. This obviously raises quite a great deal of ire in conservative circles, including within our coalition. 
  `,
  choices: [
    
  ]
};

export const _minor_reforms: Scene = {
  id: "minor_reforms",
  title: "minor_reforms",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['democratization'] += 1;if (state.flags['democratization'] >= 3) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); }; state.flags['judicial_reform'] += 1; state.flags['pro_republic'] += 2*(1-state.flags['dissent']); state.flags['judiciary_timer'] += 6; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['lvp_left'] += 0.5; 
  },

  

  render: `
    We try to remove the most obviously biased and corrupt jurists, while leaving most of the system intact. It is slow work reforming the judiciary.
  `,
  choices: [
    
  ]
};

export const _as_is_2: Scene = {
  id: "as_is",
  title: "as_is",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _labor_affairs: Scene = {
  id: "labor_affairs",
  title: "Labor Affairs",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['labor_minister_party'] == "SPD" && state.flags['labor_affairs_timer'] == 0 && state.flags['strike_term_seen'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['labor_affairs_timer'] = 6; state.flags['month_actions'] += 1; state.flags['labor_affairs_seen'] = 1; 
  },

  

  render: `
    = Labor Affairs
    The industrial Ruhr region is aflame with labor unrest. The employers have started a major lockout to force the workers to take more cuts to wages and benefits. There is a need for the Labor Ministry to arbitrate in conflicts between employers and workers.
    #- @cancel_advisor_action
  `,
  choices: [
    {
      id: "support_labor",
      text: "Support labor in their demands.",
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
      id: "support_employers",
      text: "Support the employers in their demands.",
      nextSceneId: "support_employers",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "balance",
      text: "Try to strike a compromise between the sides.",
      nextSceneId: "balance",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _support_labor: Scene = {
  id: "support_labor",
  title: "support_labor",
  subtitle: "Popular among the workers, this will alienate the bourgeoisie.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['labor_strength'] += 5; state.flags['labor_dissent'] -= 5; state.flags['left_dissent'] -= 5; state.flags['workers_spd'] += 6*(1-state.flags['dissent']); state.flags['coalition_dissent'] += 1; state.flags['dvp_relation'] -= 4; state.flags['ddp_relation'] -= 2;if ((state.flags['dvp_relation'] <= 30 && ! state.flags['lvp_formed'])) { state.flags['capital_strike_progress'] += 1; };if ((state.flags['lvp_relation'] <= 30 && state.flags['lvp_formed'])) { state.flags['capital_strike_progress'] += 1; };if (state.flags['unemployed'] > 15) { state.flags['capital_strike_progress'] += 1; };if (state.flags['unemployed'] > 24) { state.flags['capital_strike_progress'] += 1; }; state.flags['labor_goal_completed'] += 1; state.flags['inflation'] += 0.1; state.flags['pro_labor'] += 1; state.flags['strike_term_seen'] += 1; state.flags['dvp_right'] += 1; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['lvp_right'] += 1; state.flags['labor_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1; state.flags['economic_growth'] -= 0.1; 
  },

  

  render: `
    Supporting labor is always popular in the <span style="color: #c00000;">**SPD**</span>, although many of our coalition partners represent employers, and they are less enthused.
  `,
  choices: [
    
  ]
};

export const _support_employers: Scene = {
  id: "support_employers",
  title: "support_employers",
  subtitle: "Popular among the bourgeoisie, much less so among the workers.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['labor_dissent'] += 8; state.flags['workers_spd'] -= 3;if (state.flags['coalition_dissent'] > 0) { state.flags['coalition_dissent'] -= 1; }; state.flags['dvp_relation'] += 5; state.flags['lvp_relation'] += 5; state.flags['z_relation'] += 5; state.flags['ddp_relation'] += 4; state.flags['workers_kpd'] += 3; state.flags['kpd_coalition_dissent'] += 1; state.flags['kpd_relation'] -= 8;if (state.flags['capital_strike_progress'] > 1) { state.flags['capital_strike_progress'] -= 1; };if (state.flags['capital_strike_progress'] > 8) { state.flags['capital_strike_progress'] -= 1; }; state.flags['pro_labor'] -= 1; state.flags['strike_term_seen'] += 1; state.flags['dvp_left'] += 1; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_left'] += 1; state.flags['goal_spd_cancel'] += 1; state.flags['labor_goal_spd_peoples'] += 1; 
  },

  

  render: `
    The more radical workers despise our suppression of their strikes, recalling the days of Friedrich Ebert.
  `,
  choices: [
    
  ]
};

export const _balance: Scene = {
  id: "balance",
  title: "balance",
  subtitle: "Both sides need to share the pain in the current crisis.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['labor_dissent'] += 4; state.flags['workers_spd'] -= 2; state.flags['kpd_coalition_dissent'] += 1; state.flags['kpd_relation'] -= 5; state.flags['strike_term_seen'] += 1; state.flags['ddp_cohesion'] += 1; state.flags['ddp_left'] += 1; state.flags['ddp_relation'] += 4; state.flags['labor_goal_spd_peoples'] += 1; 
  },

  

  render: `
    Many workers are unhappy at our compromises, but they will learn to accept that we are all in a shared struggle against economic forces.
    # options: support the workers in their demands, pushing back against the employers.
    # this is the approach favored by the unions. While they do not get everything they desire, an agreement favorable to the workers is reached. The employer associations and their bourgeois allies accuse us of overstepping our bounds.
    # try to make some compromise between the sides. Both sides need to share the pain in the current crisis.
    # whatever it takes, end the strikes and unrest as soon as possible.
    # this is not our business to intervene.
    # We are the party of labor, and it is not our business to intervene? There is incredulity in the ranks. The workers are less likely to trust us in the future.
  `,
  choices: [
    
  ]
};

export const _labor_rights: Scene = {
  id: "labor_rights",
  title: "Labor Rights",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['labor_minister_party'] == "SPD" && state.flags['labor_rights_timer'] <= 0 && state.flags['labor_affairs_seen'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['labor_rights_timer'] += 10; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: Working hours, safety regulations, and unemployment insurance.
    = Labor Rights
    With control of the Labor Ministry, we can set national standards for labor. Our supporters expect us to enforce a 40-hour work week and enforce safety regulations, as well as fully fund the unemployment insurance program.
    # enforce a 40-hour work week
    # develop and enforce safety regulations in mines and industries
    # works councils are part of another card...
  `,
  choices: [
    
  ]
};

export const _labor_rights_menu: Scene = {
  id: "labor_rights_menu",
  title: "labor_rights_menu",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "working_hours",
      text: "Enforce the 40-hour work week.",
      nextSceneId: "working_hours",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "shorten_hours",
      text: "Shorten work hours less than 40 hours.",
      nextSceneId: "shorten_hours",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "safety",
      text: "Develop and enforce safety regulations.",
      nextSceneId: "safety",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unemployment_insurance",
      text: "Fund the unemployment insurance program.",
      nextSceneId: "unemployment_insurance",
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
      text: "Do not enact any policies.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _working_hours: Scene = {
  id: "working_hours",
  title: "working_hours",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['working_hours'] < 2);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['working_hours'] += 1; state.flags['labor_dissent'] -= 8; state.flags['left_dissent'] -= 5; state.flags['labor_strength'] += 5; state.flags['workers_spd'] += 7*(1-state.flags['dissent']); state.flags['dvp_relation'] -= 4; state.flags['ddp_relation'] -= 2; state.flags['lvp_relation'] -= 3; state.flags['coalition_dissent'] += 1;if ((state.flags['dvp_relation'] <= 30 && ! state.flags['lvp_formed'])) { state.flags['capital_strike_progress'] += 1; };if ((state.flags['lvp_relation'] <= 30 && state.flags['lvp_formed'])) { state.flags['capital_strike_progress'] += 1; }; state.flags['labor_goal_completed'] = 1; state.flags['inflation'] += 0.1; state.flags['dvp_right'] += 1; state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_right'] += 1; state.flags['labor_goal_spd'] += 1; state.flags['pro_labor'] += 1; state.flags['economic_growth'] -= 0.1; 
  },

  

  render: `
    While a 40-hour work week was declared during the German Revolution in 1918, enforcement has become increasingly porous over the years. The capitalists have successfully added numerous exceptions and loopholes, returning to the old regime of forced overtime for workers.
    Now, with the force of the Labor Ministry, we are finally enforcing the rights of workers to their own time. The bourgeoisie and their political representatives are displeased.
  `,
  choices: [
    
  ]
};

export const _shorten_hours: Scene = {
  id: "shorten_hours",
  title: "shorten_hours",
  subtitle: "Could we induce more hiring and reduce unemployment by reducing work hours?",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['working_hours'] >= 2 && state.flags['black_thursday_seen'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['working_hours'] += 1; state.flags['labor_dissent'] -= 8; state.flags['left_dissent'] -= 5; state.flags['labor_strength'] += 5; state.flags['workers_spd'] += 7*(1-state.flags['dissent']); state.flags['dvp_relation'] -= 4; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 4; state.flags['coalition_dissent'] += 1; state.flags['capital_strike_progress'] += 1; state.flags['labor_goal_completed'] = 1; state.flags['unemployed'] -= 0.3; state.flags['dvp_right'] += 2; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_right'] += 2; state.flags['labor_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1; state.flags['pro_labor'] += 1; state.flags['economic_growth'] -= 0.2; 
  },

  

  render: `
    Some in the labor movement argue that by reducing the maximum number of hours worked, employers would be induced to hire more workers, reducing unemployment. The argument also goes that this would be complementary to deflation, maintaining the same purchasing power for workers by cutting hours without cutting wages. Employers, however, resist this policy, arguing for more flexibility in hiring and firing.
  `,
  choices: [
    
  ]
};

export const _safety: Scene = {
  id: "safety",
  title: "safety",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_safety'] += 1; state.flags['labor_dissent'] -= 5; state.flags['labor_strength'] += 2; state.flags['workers_spd'] += 5*(1-state.flags['dissent']);if (state.flags['workers_safety'] >= 3) { state.flags['capital_strike_progress'] += 1; };if (state.flags['workers_safety'] >= 3) { state.flags['ddp_right'] += 1; };if (state.flags['workers_safety'] >= 3) { state.flags['dvp_right'] += 1; };if (state.flags['workers_safety'] >= 3) { state.flags['lvp_right'] += 1; }; state.flags['labor_goal_spd'] += 1; 
  },

  

  render: `
    The Labor Ministry works on developing and enforcing safety regulations, in order to ensure healty working conditions for the proletariat. [? if workers_safety >= 3 : Businesses have begun to argue that our focus on safety is overbearing and unnecessary, interfering with the economy. ?]
  `,
  choices: [
    
  ]
};

export const _unemployment_insurance: Scene = {
  id: "unemployment_insurance",
  title: "unemployment_insurance",
  subtitle: "With increasing unemployment, we must find new ways to fund our signature program.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['unemployed'] >= state.flags['unemployment_insurance_threshold'] + 4);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    With the onset of the Depression and its throngs of unemployed, our unemployment insurance program is under strain. The program was never designed for this many claimants; something must be done to balance the budget.
  `,
  choices: [
    {
      id: "cut_benefits",
      text: "Cut benefits.",
      nextSceneId: "cut_benefits",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "increase_employers",
      text: "Increase employer contributions.",
      nextSceneId: "increase_employers",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "balance",
      text: "Increase both employer and employee contributions.",
      nextSceneId: "balance",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "labor_rights_menu",
      text: "We can defer this decision for now.",
      nextSceneId: "labor_rights_menu",
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

export const _cut_benefits: Scene = {
  id: "cut_benefits",
  title: "cut_benefits",
  subtitle: "The workers will regard this as a betrayal.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] -= 0.12*state.flags['workers_spd']; state.flags['unemployed_spd'] -= 0.2*state.flags['unemployed_spd']; state.flags['workers_kpd'] += 5; state.flags['workers_nsdap'] += 5; state.flags['unemployed_kpd'] += 5; state.flags['unemployed_nsdap'] += 5; state.flags['left_dissent'] += 15; state.flags['center_dissent'] += 10; state.flags['labor_dissent'] += 15; state.flags['reformist_dissent'] += 5; state.flags['welfare'] -= 2; state.flags['budget'] += 1; state.flags['unemployed'] += 3; state.flags['pro_republic'] -= 4; state.flags['kpd_relation'] -= 8; state.flags['inflation'] -= 2; state.flags['unemployment_insurance_threshold'] = state.flags['unemployed']; state.flags['unemployment_insurance_timer'] = 10; state.flags['dvp_left'] += 2;if (state.flags['ddp_ideology'] == "Left") { state.flags['ddp_left'] += 2; };if (state.flags['ddp_ideology'] == "Left") { state.flags['workers_ddp'] += 3; }; state.flags['lvp_left'] += 1; state.flags['goal_spd_cancel'] += 1; state.flags['labor_goal_spd_peoples'] += 1; state.flags['economic_growth'] -= 0.2; 
  },

  

  render: `
    For budgetary reasons, we have cut unemployment insurance benefits. Unfortunately, our reasons for fiscal discipline are alien to the workers. They are furious at our betrayal, as are a good portion of our membership throughout the factions. Our loss is the <span style="color: #700000 ;">**KPD**</span>'s gain, and even the <span style="color: #7A3C00;">**NSDAP**</span>, those lapdogs of the bourgeoisie, have joined in criticizing us for our austerity.
  `,
  choices: [
    
  ]
};

export const _increase_employers: Scene = {
  id: "increase_employers",
  title: "increase_employers",
  subtitle: "Employers are strongly against this. [? if in_grand_coalition: The [? if not lvp_formed: <span style=\"color: #C0A054;\">**DVP**</span>?][? if lvp_formed: <span style=\"color: #FFCC00;\">**LVP**</span>?] will likely break the coalition. ?][? if in_weimar_coalition and lvp_formed: The <span style=\"color: #FFCC00;\">**LVP**</span> will likely break the coalition. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['capital_strike_progress'] += 2;if (state.flags['in_grand_coalition']) { state.flags['coalition_dissent'] = 2; };if ((state.flags['in_weimar_coalition'] && state.flags['lvp_formed'])) { state.flags['coalition_dissent'] = 2; }; state.flags['coalition_dissent'] += 1;if ((state.flags['lvp_ideology'] == "Right" && state.flags['in_weimar_coalition'] && state.flags['lvp_formed'])) { state.flags['coalition_dissent'] += 1; }; state.flags['welfare'] += 1; state.flags['workers_spd'] += 6*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 6*(1-state.flags['dissent']); state.flags['old_middle_spd'] -= 6*(1-state.flags['dissent']); state.flags['new_middle_spd'] -= 2*(1-state.flags['dissent']); state.flags['unemployment_insurance_threshold'] = state.flags['unemployed']; state.flags['unemployment_insurance_timer'] = 10; state.flags['dvp_right'] += 2; state.flags['ddp_right'] += 2; state.flags['ddp_cohesion'] -= 1; state.flags['lvp_right'] += 2; state.flags['dvp_relation'] -= 6; state.flags['z_relation'] -= 4; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 4; state.flags['unemployment_goal_spd'] += 1; state.flags['goal_spd_cancel_peoples'] += 1; state.flags['economic_growth'] -= 0.2; 
  },

  

  render: `
    We have increased employer contributions to the unemployment insurance fund, allowing the program to continue without hurting workers and the unemployed. Perhaps understandably, the capitalists and their political parties are furious, while our base in the unions and among the unemployed are pleased.
  `,
  choices: [
    
  ]
};

export const _balance_2: Scene = {
  id: "balance",
  title: "balance",
  subtitle: "Neither workers nor employers will be entirely satisfied or dissatisfied. [? if in_grand_coalition and ((dvp_ideology == \"Right\") or (dvp_ideology == \"Moderate\" and dvp_relation < 40) or (dvp_ideology == \"Left\" and dvp_relation < 30)) and not lvp_formed: The <span style=\"color: #C0A054;\">**DVP**</span> will likely consider the compromise unacceptable. ?][? if in_grand_coalition and ((dvp_ideology == \"Left\" and dvp_relation >= 30) or (dvp_ideology == \"Moderate\" and dvp_relation >= 40)) and dvp_ideology != \"Right\" and not lvp_formed: The <span style=\"color: #C0A054;\">**DVP**</span> might grudgingly accept the compromise for now. ?][? if (in_grand_coalition or in_weimar_coalition) and ((lvp_ideology == \"Right\") or (lvp_ideology == \"Moderate\" and lvp_relation < 40) or (lvp_ideology == \"Left\" and lvp_relation < 30)) and lvp_formed: The <span style=\"color: #FFCC00;\">**LVP**</span> will likely consider the compromise unacceptable. ?][? if (in_grand_coalition or in_weimar_coalition) and ((lvp_ideology == \"Left\" and lvp_relation >= 30) or (lvp_ideology == \"Moderate\" and lvp_relation >= 40)) and lvp_ideology != \"Right\" and lvp_formed: The <span style=\"color: #FFCC00;\">**LVP**</span> might grudgingly accept the compromise for now. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] -= 4; state.flags['unemployed_spd'] -= 5; state.flags['workers_kpd'] += 3; state.flags['unemployed_kpd'] += 3; state.flags['unemployed_nsdap'] += 3; state.flags['left_dissent'] += 10; state.flags['labor_dissent'] += 8; state.flags['center_dissent'] += 5; state.flags['welfare'] -= 1; state.flags['budget'] += 1; state.flags['kpd_relation'] -= 4; state.flags['inflation'] -= 1; state.flags['unemployment_insurance_threshold'] = state.flags['unemployed']; state.flags['unemployment_insurance_timer'] = 10;if (state.flags['in_grand_coalition'] && ((state.flags['dvp_ideology'] == "Right") || (state.flags['dvp_ideology'] == "Moderate" && state.flags['dvp_relation'] < 40) || (state.flags['dvp_ideology'] == "Left" && state.flags['dvp_relation'] < 30))) { state.flags['coalition_dissent'] = 2; };if ((state.flags['in_grand_coalition'] || state.flags['in_weimar_coalition']) && ((state.flags['lvp_ideology'] == "Right") || (state.flags['lvp_ideology'] == "Moderate" && state.flags['lvp_relation'] < 40) || (state.flags['lvp_ideology'] == "Left" && state.flags['lvp_relation'] < 30)) && state.flags['lvp_formed']) { state.flags['coalition_dissent'] = 2; };if (state.flags['in_grand_coalition']) { state.flags['coalition_dissent'] += 1; };if ((state.flags['in_weimar_coalition'] && state.flags['lvp_formed'])) { state.flags['coalition_dissent'] += 1; }; state.flags['dvp_right'] += 1; state.flags['ddp_right'] += 1; state.flags['lvp_right'] += 1; state.flags['labor_goal_spd_peoples'] += 1; state.flags['economic_growth'] -= 0.1; 
  },

  

  render: `
    Neither side is entirely satisfied by our compromise solution. Many of the workers and unemployed see this as a betrayal, although we present it as the successful aversion of a much worse alternative. [? if (in_grand_coalition or (in_weimar_coalition and lvp_formed)): Meanwhile, the [? if not lvp_formed: <span style="color: #C0A054;">**DVP**</span>?][? if lvp_formed: <span style="color: #FFCC00;">**LVP**</span>?] is aghast at the prospect of raising any taxes on businesses at all. ?]
  `,
  choices: [
    
  ]
};

export const _military_policy: Scene = {
  id: "military_policy",
  title: "Military Policy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['reichswehr_minister_party'] == "SPD" && state.flags['military_policy_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['military_policy_timer'] += 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: Dealing with the Reichswehr.
    = Military Policy
    The Reichswehr is a deeply <span style="color: #808080;">reactionary</span> institution that has been generally hostile to any notion of <span style="color: #c00000;">socialism</span> or democracy. However, we now control the military as part of the government. What should we do to reform it?
  `,
  choices: [
    {
      id: "increase_funding",
      text: "Increase funding for the military to purchase its loyalty.",
      nextSceneId: "increase_funding",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "decrease_funding",
      text: "Reduce funding for the military so we have more for social spending.",
      nextSceneId: "decrease_funding",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "reform",
      text: "Conduct a thorough reform of the ranks, reducing the influence of <span style=\"color: #808080;\">reactionaries</span> and making it more hospitable to us.",
      nextSceneId: "reform",
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
      text: "No change to military policy.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _increase_funding: Scene = {
  id: "increase_funding",
  title: "increase_funding",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1;if (state.flags['coalition_dissent'] > 0) { state.flags['coalition_dissent'] -= 1; };if (state.flags['reichswehr_loyalty'] < 1) { state.flags['reichswehr_loyalty'] += 0.07; }; state.flags['reichswehr_strength'] += 20; state.flags['left_dissent'] += 5; state.flags['kpd_coalition_dissent'] += 1; state.flags['west_relation'] -= 1; state.flags['east_relation'] -= 1; state.flags['reparations_negotiation'] -= 1; state.flags['eu_progress'] -= 1; state.flags['dvp_left'] += 1; state.flags['dvp_relation'] += 4; state.flags['lvp_relation'] += 4; state.flags['ddp_relation'] += 2; state.flags['ddp_cohesion'] -= 1; state.flags['ddp_right'] += 1; state.flags['lvp_left'] += 1; state.flags['goal_spd_cancel'] += 1; state.flags['hindenburg_angry'] -= 10; state.flags['economic_growth'] += 0.1; 
  },

  

  render: `
    The military and the center-right parties are pleasantly surprised that we would increase military funding. Our membership tends to be anti-military, and is less enthused. Germany's neighbors are watching our military buildup with worry. [? if reparations >= 0 : This is not good for the reparations negotiations. ?]
  `,
  choices: [
    
  ]
};

export const _decrease_funding: Scene = {
  id: "decrease_funding",
  title: "decrease_funding",
  subtitle: "+1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] += 1;if (state.flags['in_grand_coalition'] == 1) { state.flags['coalition_dissent'] += 1; };if ((state.flags['in_weimar_coalition'] && state.flags['lvp_formed'])) { state.flags['coalition_dissent'] += 1; }; state.flags['dvp_relation'] -= 8; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 6; state.flags['z_relation'] -= 4; state.flags['reichswehr_militancy'] -= 1; state.flags['reichswehr_strength'] -= 20; state.flags['sh_strength'] += 15; state.flags['sa_strength'] += 5; state.flags['sh_militancy'] += 0.05;if (state.flags['reichswehr_loyalty'] > 0) { state.flags['reichswehr_loyalty'] -= 0.05; }; state.flags['coup_progress'] += 1;if (state.flags['reichswehr_loyalty'] < 0.2) { state.flags['coup_progress'] += 1; };if (state.flags['reichswehr_loyalty'] < 0.1) { state.flags['coup_progress'] += 1; };if (state.flags['reichswehr_loyalty'] <= 0) { state.flags['coup_progress'] += 1; }; state.flags['reichswehr_goal_completed'] = 1; state.flags['dvp_right'] += 3; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['lvp_right'] += 2; state.flags['reichswehr_goal_spd'] += 1; state.flags['hindenburg_angry'] += 10; state.flags['economic_growth'] -= 0.1; 
  },

  

  render: `
    The military has fewer guns and fewer soldiers. There is no hint of a coup yet, but we do not know where the line will be drawn. The center-right parties are committed to the military and deeply opposed to our budget cuts.
    Many demobilized soldiers have joined the right-wing paramilitaries such as the <span style="color: #3E88B3;">**Stahlhelm**</span> and <span style="color: #7A3C00;">**SA**</span>, and weapons are missing from our stockpiles.
  `,
  choices: [
    
  ]
};

export const _reform_2: Scene = {
  id: "reform",
  title: "reform",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if ((state.flags['in_grand_coalition'] || (state.flags['in_weimar_coalition'] && state.flags['lvp_formed']))) { state.flags['coalition_dissent'] += 1; }; state.flags['reichswehr_loyalty'] += 0.15;if (state.flags['reichswehr_loyalty'] < 0.5) { state.flags['reichswehr_militancy'] -= 0.5; }; state.flags['budget'] -= 1; state.flags['coup_progress'] += 1; state.flags['dvp_relation'] -= 5; state.flags['pacifism'] += 1; state.flags['democratization'] += 1; state.flags['dvp_right'] += 2; state.flags['ddp_left'] += 1; state.flags['lvp_right'] += 1; state.flags['hindenburg_angry'] += 5; 
  },

  

  render: `
    Our efforts are at least somewhat successful; we have changed the recruiting and training patterns so that more soldiers from non-<span style="color: #808080;">reactionary</span> backgrounds can join, hopefully changing the culture of the forces. We have also removed some of the officers who supported the previous Kapp putsch.
    The center-right parties are committed to the military and deeply suspicious of our efforts to reform it.
  `,
  choices: [
    
  ]
};

export const _police: Scene = {
  id: "police",
  title: "Internal Security",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['interior_minister_party'] == "SPD" && state.flags['police_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['police_timer'] += 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    = Internal Security
    The Interior Ministry controls internal security throughout the German Republic. While most police work is delegated to the states, the national security agency can perform special investigations.
    As with the state police units and the Reichswehr, the internal police tends to be <span style="color: #808080;">reactionary</span>, and has serious issues with loyalty to the elected government of the Republic.
  `,
  choices: [
    {
      id: "loyalty",
      text: "Improve the loyalty of the Interior Ministry forces.",
      nextSceneId: "loyalty",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "investigate_corruption",
      text: "Investigate corruption by big businesses.",
      nextSceneId: "investigate_corruption",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "investigate_far_right",
      text: "Investigate illegal activity among the <span style=\"color: #7A3C00;\">far</span> <span style=\"color: #3E88B3;\">right</span>.",
      nextSceneId: "investigate_far_right",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "domestic_enemies",
      text: "Investigate or ban our domestic enemies.",
      nextSceneId: "domestic_enemies",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "deport_hitler",
      text: "deport_hitler",
      nextSceneId: "deport_hitler",
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
      text: "Take no action for now.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _loyalty: Scene = {
  id: "loyalty",
  title: "loyalty",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['interior_police_loyalty'] += 0.1; 
  },

  

  render: `
    As with the Prussian state police, there are measures we can take to root out <span style="color: #808080;">reactionary</span> and anti-democratic sentiment in the police. We can improve training and recruiting procedures, and identify and remove known <span style="color: #7A3C00;">fascists</span> and the like.
    Current interior police loyalty: [+ interior_police_loyalty : loyalty +]
  `,
  choices: [
    
  ]
};

export const _investigate_corruption: Scene = {
  id: "investigate_corruption",
  title: "investigate_corruption",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _investigate_corruption_success: Scene = {
  id: "investigate_corruption_success",
  title: "investigate_corruption_success",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['investigate_corruption'] += 1; state.flags['workers_spd'] += 5*(1-state.flags['dissent']);if (state.flags['inflation'] > 3) { state.flags['inflation'] -= 0.1; };if (state.flags['inflation'] >= 8) { state.flags['inflation'] -= 0.2; }; state.flags['dvp_relation'] -= 3; state.flags['dvp_right'] += 1; state.flags['ddp_relation'] -= 1; state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_relation'] -= 2; state.flags['lvp_right'] += 1; 
  },

  

  render: `
    Corruption in big business is rampant, of course. We have uncovered a number of scandals, and publicizing them brings new attention to the work of Interior Minister [+ interior_minister +], building up his popular appeal and that of the <span style="color: #c00000;">**SPD**</span>.
  `,
  choices: [
    
  ]
};

export const _investigate_corruption_failure: Scene = {
  id: "investigate_corruption_failure",
  title: "investigate_corruption_failure",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Unfortunately, our investigations have failed to turn up anything. Rumors are that the targets of our investigation were tipped off by infiltrators within the police.
  `,
  choices: [
    
  ]
};

export const _investigate_far_right: Scene = {
  id: "investigate_far_right",
  title: "investigate_far_right",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _investigate_far_right_success: Scene = {
  id: "investigate_far_right_success",
  title: "investigate_far_right_success",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['investigate_far_right'] += 1; state.flags['sa_strength'] *= 0.96;if (state.flags['investigate_far_right'] == 2) { state.flags['sa_strength'] *= 0.96; }; state.flags['workers_nsdap'] -= 1; state.flags['new_middle_nsdap'] -= 2;if (state.flags['investigate_far_right'] == 2) { state.flags['nazi_urgency'] += 1; };if (state.flags['investigate_far_right'] == 3) { state.flags['nazi_urgency'] += 2; };if (state.flags['investigate_far_right'] == 3) { state.flags['workers_nsdap'] -= 2; };if (state.flags['investigate_far_right'] == 3) { state.flags['new_middle_nsdap'] -= 3; };if (state.flags['investigate_far_right'] == 3) { state.flags['old_middle_nsdap'] -= 3; };if (state.flags['investigate_far_right'] == 3) { state.flags['unemployed_spd'] += 3; };if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 1; } 
  },

  

  render: `
    [? if investigate_far_right == 1 : We have discovered collusion between Hjalmar Schacht, president of the Reichsbank, and the <span style="color: #7A3C00;">Nazis</span>. This is very useful information. ?]
    [? if investigate_far_right == 2 : We have discovered illegal arms smuggling by the <span style="color: #7A3C00;">**SA**</span>, the <span style="color: #7A3C00;">Nazi</span> paramilitary. ?]
    [? if investigate_far_right == 3 : We have discovered a secret cache of documents from the <span style="color: #7A3C00;">**NSDAP**</span> detailing their plan to violently take over the country if they enter into power. This is an anti-constitutional plot, and will be publicized and persecuted. ?]
    [? if investigate_far_right > 3 : Of course the <span style="color: #7A3C00;">Nazis</span> are doing crimes; everyone knows that. Now, we finally have proof. ?]
    [? if coup_progress >= 6: There are reports of an imminent coup by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. We have attempted to disrupt some of these plans, but the threat is still present. ?]
  `,
  choices: [
    
  ]
};

export const _investigate_far_right_failure: Scene = {
  id: "investigate_far_right_failure",
  title: "investigate_far_right_failure",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Unfortunately, our investigations have failed to turn up anything. Rumors are that the targets of our investigation were tipped off by infiltrators within the police.
  `,
  choices: [
    
  ]
};

export const _prussian_affairs: Scene = {
  id: "prussian_affairs",
  title: "The Prussian Bulwark",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['in_weimar_coalition_prussia'] || state.flags['in_social_liberal_coalition_prussia'] || state.flags['in_social_catholic_coalition_prussia']) && (state.flags['prussian_affairs_timer'] <= 0 || (state.flags['prussian_affairs_timer'] <= 3 && state.flags['rubicon'])));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_affairs_timer'] += 6;if (state.flags['prussia_leader'] != "Braun") { state.flags['prussian_affairs_timer'] += 6; }; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: The state government of Prussia is a bulwark of democracy...
    = Prussian Affairs
    Prussia, by far the largest and most important state in Germany, is governed by our party, in a coalition with the [? if not in_social_liberal_coalition_prussia: [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?]?][? if not in_social_catholic_coalition_prussia:&nbsp;and [? if ddp_name == "DDP" and not lvp_formed: <span style="color: #D3C24D;">**Democratic**</span>?][? if ddp_name == "DStP" and not lvp_formed: <span style="color: #D3C24D;">**State**</span>?][? if lvp_formed: <span style="color: #FFCC00;">**Liberal People's**</span>?] parties?]. It is the most stable and democratic state government in Germany, led by [? if prussia_leader == "Braun": the able Otto Braun?][? if prussia_leader == "Brüning": Heinrich Brüning?][? if prussia_leader == "Stegerwald": Adam Stegerwald?]. [? if prussia_leader != "Braun": Without Braun at the helm in Prussia, our pace of action has noticeably slowed. ?]
    We can enact policies in Prussia.
  `,
  choices: [
    {
      id: "police_loyalty",
      text: "Bolster the loyalty of the police.",
      nextSceneId: "police_loyalty",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "police_strength",
      text: "Recruit additional police.",
      nextSceneId: "police_strength",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "bureaucracy",
      text: "Purge the bureaucracy of <span style=\"color: #808080;\">reactionary</span> elements.",
      nextSceneId: "bureaucracy",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sa",
      text: "Ban the <span style=\"color: #7A3C00;\">**SA**</span>, the <span style=\"color: #7A3C00;\">Nazi</span> paramilitary group.",
      nextSceneId: "ban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "prosecute_sa",
      text: "Target the <span style=\"color: #7A3C00;\">**SA**</span>, and minimize their disruptions.",
      nextSceneId: "prosecute_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_sa",
      text: "Reverse the <span style=\"color: #7A3C00;\">**SA**</span> ban.",
      nextSceneId: "unban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_rfb",
      text: "Ban the <span style=\"color: #8B0000;\">**RFB**</span>, the <span style=\"color: #700000;\">Communist</span> paramilitary.",
      nextSceneId: "ban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_rfb",
      text: "Reverse the <span style=\"color: #8B0000;\">**RFB**</span> ban.",
      nextSceneId: "unban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sh",
      text: "Ban the <span style=\"color: #3E88B3;\">**Stahlhelm**</span>, the Nationalist paramilitary.",
      nextSceneId: "ban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_sh",
      text: "Reverse the <span style=\"color: #3E88B3;\">**Stahlhelm**</span> ban.",
      nextSceneId: "unban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "negotiate_concordat",
      text: "Negotiate a concordat with the Vatican.",
      nextSceneId: "negotiate_concordat",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "sign_concordat",
      text: "Sign a concordat with the Vatican.",
      nextSceneId: "sign_concordat",
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
      text: "No new policies are needed.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _police_loyalty: Scene = {
  id: "police_loyalty",
  title: "police_loyalty",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussian_police_loyalty'] < 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_loyalty'] += 0.1; 
  },

  

  render: `
    The police have historically been overrun with <span style="color: #808080;">reactionaries</span>, and we are trying to change this, little by little. We have improved the training and recruitment process to select for a broader demographic than the traditional <span style="color: #3E88B3;">conservatives</span>, and to put a tighter leash on their political activity. In addition, we set up committees to investigate the ranks of the police and remove those with <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> sympathies. It is a slow and arduous work.
    Current police loyalty: [+ prussian_police_loyalty : loyalty +].
  `,
  choices: [
    
  ]
};

export const _police_strength: Scene = {
  id: "police_strength",
  title: "police_strength",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_strength'] += 20; 
  },

  

  render: `
    We have increased the size of the Prussian police.
  `,
  choices: [
    
  ]
};

export const _bureaucracy: Scene = {
  id: "bureaucracy",
  title: "bureaucracy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_loyalty'] += 0.05; state.flags['nationalism'] -= 3; state.flags['pacifism'] += 1; state.flags['democratization'] += 1; state.flags['pro_republic'] += 3*(1-state.flags['dissent']);if (state.flags['democratization'] >= 3) { state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); }; state.flags['new_middle_z'] += 0.5; state.flags['new_middle_ddp'] += 1; state.flags['new_middle_lvp'] += 2; state.flags['coup_progress'] += 0.5; state.flags['dvp_left'] += 0.5; state.flags['ddp_left'] += 0.25; state.flags['lvp_left'] += 0.5; 
  },

  

  render: `
    The bureaucracy is deeply <span style="color: #808080;">reactionary</span>, and many abuse their power to favor the <span style="color: #3E88B3;">political right</span>. By removing the <span style="color: #3E88B3;">pro-monarchy</span> and <span style="color: #7A3C00;">pro-dictatorship</span> elements, we can democratize it. Some of our opponents claim that we are infringing on individual freedoms, but perhaps the security of the republic requires it.
  `,
  choices: [
    
  ]
};

export const _ban_sa_2: Scene = {
  id: "ban_sa",
  title: "ban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && state.flags['sa_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.9;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_strength'] *= 0.75; };if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_banned_pro'] = 1; };if (state.flags['prussian_police_loyalty'] < 0.75) { state.flags['sa_banned_pro'] = 0; }; state.flags['sa_banned'] = 1; state.flags['dvp_relation'] -= 3; state.flags['prussian_police_loyalty'] -= 0.05; state.flags['sa_militancy'] -= 0.05; state.flags['sa_ban_timer'] = 6;if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 2; } 
  },

  

  render: `
    As it turns out, the <span style="color: #7A3C00;">Nazi</span> <span style="color: #7A3C00;">**SA**</span> has many allies in the police and bureaucracy. Our relationship with the police weakens, and the <span style="color: #7A3C00;">**SA**</span> can still organize illegally, right under the police's noses. [? if sa_banned_pro : Nevertheless, the <span style="color: #7A3C00;">**SA**</span> is substantially weakened by our ban. ?] 
    [? if coup_progress >= 6: There are reports of an imminent coup by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. We have disrupted some of these plans, but the threat is still present. ?]
  `,
  choices: [
    
  ]
};

export const _prosecute_sa: Scene = {
  id: "prosecute_sa",
  title: "prosecute_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && ! state.flags['sa_banned'] && (state.flags['chancellor'] == "Papen" || state.flags['chancellor'] == "Schleicher"));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.97; state.flags['sa_militancy'] -= 0.02; state.flags['prussian_police_loyalty'] -= 0.02;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_strength'] *= 0.98; } 
  },

  

  render: `
    While an outright ban on the <span style="color: #7A3C00;">**SA**</span> may be out of reach, we can make life as difficult as possible for the <span style="color: #7A3C00;">Storm Troopers</span>. The most reckless among them can be prosecuted on charges of murder and related crimes, and we can ensure legal public demonstrations and meetings are protected from their unlawful disruptions.
  `,
  choices: [
    
  ]
};

export const _unban_sa_2: Scene = {
  id: "unban_sa",
  title: "unban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sa_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_banned'] = 0; state.flags['sa_strength'] += 100; state.flags['sa_militancy'] += 0.05;if (state.flags['sa_coup_progress'] >= 6) { state.flags['coup_progress'] += 2; } 
  },

  

  render: `
    The <span style="color: #7A3C00;">**SA**</span> is no longer banned. They immediately go on a recruiting spree.
  `,
  choices: [
    
  ]
};

export const _ban_sh_2: Scene = {
  id: "ban_sh",
  title: "ban_sh",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 0 && ! state.flags['in_social_catholic_coalition_prussia']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_strength'] *= 0.85;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sh_strength'] *= 0.7; }; state.flags['sh_banned'] = 1; state.flags['dvp_relation'] -= 5; state.flags['lvp_relation'] -= 2; state.flags['prussian_police_loyalty'] -= 0.1;if (state.flags['spd_in_government'] == 1 && state.flags['in_grand_coalition'] == 1 && state.flags['president'] == "Hindenburg") { state.flags['coalition_dissent'] += 1; };if (state.flags['in_social_catholic_coalition_prussia'] && state.flags['cvp_formed']) { state.flags['coalition_dissent'] += 1; }; state.flags['sh_ban_timer'] = 6; state.flags['sh_coup_progress'] = state.flags['coup_progress'];if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 1; }; state.flags['hindenburg_angry'] += 5; 
  },

  

  render: `
    [? if president == "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with President Hindenburg, as well as the political <span style="color: #3E88B3;">right</span> and the police. ?][? if president != "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with the political <span style="color: #3E88B3;">right</span> and the police. ?] [? if spd_in_government = 1 and in_grand_coalition = 1 and president = "Hindenburg" : It also weakens our coalition due to the influence of Hindenburg on the <span style="color: #C0A054;">right</span> wing of our coalition. ?] In addition, the <span style="color: #3E88B3;">**Stahlhelm**</span> still operates out of public sight. 
  `,
  choices: [
    
  ]
};

export const _unban_sh_2: Scene = {
  id: "unban_sh",
  title: "unban_sh",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_banned'] = 0; state.flags['sh_strength'] += 100;if (state.flags['sh_coup_progress'] >= 6) { state.flags['coup_progress'] += 2; }; state.flags['hindenburg_angry'] -= 5; 
  },

  

  render: `
    The <span style="color: #3E88B3;">**Stahlhelm**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _ban_rfb_2: Scene = {
  id: "ban_rfb",
  title: "ban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['communist_coalition'] < 3 && state.flags['rfb_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] -= 15; state.flags['rfb_strength'] -= 50; state.flags['rfb_banned'] = 1; state.flags['communist_coalition'] -= 1; state.flags['z_relation'] += 5; state.flags['dvp_relation'] += 5; state.flags['ddp_relation'] += 5; state.flags['lvp_relation'] += 5; state.flags['prussian_police_loyalty'] += 0.1; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['lvp_left'] += 1; state.flags['hindenburg_angry'] -= 8; 
  },

  

  render: `
    The ban is enthusiastically carried out by the police, perhaps too enthusiastically. The <span style="color: #700000;">Communists</span> take this as one more reason why the <span style="color: #c00000;">Socialists</span> are traitors to the <span style="color: #9B0000;">left</span>. However, the <span style="color: #000000;">moderate</span> and <span style="color: #C0A054;">center-right</span> parties approve, as do the police.
  `,
  choices: [
    
  ]
};

export const _unban_rfb_2: Scene = {
  id: "unban_rfb",
  title: "unban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rfb_banned'] == 1 && ! state.flags['in_social_catholic_coalition_prussia']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rfb_banned'] = 0; state.flags['rfb_strength'] += 50; state.flags['prussian_police_loyalty'] -= 0.1; state.flags['hindenburg_angry'] += 8; 
  },

  

  render: `
    The <span style="color: #700000;">Communist</span> <span style="color: #700000;">**RFB**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _negotiate_concordat: Scene = {
  id: "negotiate_concordat",
  title: "negotiate_concordat",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['prussian_concordat_progress'] < 2 && state.flags['z_leader'] != "Kaas") || (state.flags['prussian_concordat_progress'] < 1 && state.flags['z_leader'] == "Kaas") && state.flags['prussian_concordat'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_concordat_progress'] += 1; state.flags['z_relation'] += 2*(1-state.flags['dissent']); 
  },

  

  render: `
    We are making progress towards negotiating a concordat between Prussia and the Catholic church. [? if z_leader = "Kaas": Ludwig Kaas of the [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] Party uses his connections to speed up negotiations. ?]
  `,
  choices: [
    
  ]
};

export const _sign_concordat: Scene = {
  id: "sign_concordat",
  title: "sign_concordat",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['prussian_concordat_progress'] >= 2 && ! state.flags['z_leader'] == "Kaas") || (state.flags['prussian_concordat_progress'] >= 1 && state.flags['z_leader'] == "Kaas") && state.flags['prussian_concordat'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_concordat'] = 1; state.flags['z_relation'] += 8; state.flags['catholics_spd'] += 3*(1-state.flags['dissent']);if (state.flags['dnvp_ideology'] == "Radical") { state.flags['catholics_dnvp'] -= 2; }; state.flags['ddp_relation'] -= 2; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_relation'] -= 2; 
  },

  

  render: `
    We have signed a Concordat between the Free State of Prussia and the Roman Catholic Church, guaranteeing religious freedom for Catholics in Prussia. This sets the stage for the negotiation of a national Concordat covering all of Germany.
    [? if dnvp_ideology == "Radical": The Catholic members of the <span style="color: #3E88B3;">**DNVP**</span> in Prussia are in open conflict with their leadership over the vote, with many leaving the party. ?]
  `,
  choices: [
    
  ]
};

export const _prussian_affairs_dvp: Scene = {
  id: "prussian_affairs_dvp",
  title: "The Prussian Bulwark",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['in_grand_coalition_prussia'] == 1 && state.flags['prussian_affairs_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_affairs_timer'] += 6;if (state.flags['prussia_leader'] != "Braun") { state.flags['prussian_affairs_timer'] += 6; }; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: The state government of Prussia is a bulwark of democracy...
    = Prussian Affairs
    Prussia, by far the largest and most important state in Germany, is governed by our party, in a coalition with the [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?], [? if ddp_name == "DDP": <span style="color: #D3C24D;">**Democratic**</span>?][? if ddp_name == "DStP": <span style="color: #D3C24D;">**State**</span>?] and <span style="color: #C0A054;">**People's**</span> parties. It is a stable and democratic state government in Germany, led by [? if prussia_leader == "Braun": the able Otto Braun?][? if prussia_leader == "Brüning": Heinrich Brüning?][? if prussia_leader == "Stegerwald": Adam Stegerwald?]. [? if prussia_leader != "Braun": Without Braun at the helm in Prussia, our pace of action has noticeably slowed. ?]
    We can enact policies in Prussia. The inclusion of the <span style="color: #C0A054;">**DVP**</span> will mitigate our effect.
  `,
  choices: [
    {
      id: "police_loyalty",
      text: "Bolster the loyalty of the police.",
      nextSceneId: "police_loyalty",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "police_strength",
      text: "Recruit additional police.",
      nextSceneId: "police_strength",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "bureaucracy",
      text: "Purge the bureaucracy of <span style=\"color: #808080;\">reactionary</span> elements.",
      nextSceneId: "bureaucracy",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sa",
      text: "Ban the <span style=\"color: #7A3C00;\">**SA**</span>, the <span style=\"color: #7A3C00;\">Nazi</span> paramilitary group.",
      nextSceneId: "ban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "prosecute_sa",
      text: "Target the <span style=\"color: #7A3C00;\">**SA**</span>, and minimize their disruptions.",
      nextSceneId: "prosecute_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_sa",
      text: "Reverse the <span style=\"color: #7A3C00;\">**SA**</span> ban.",
      nextSceneId: "unban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_rfb",
      text: "Ban the <span style=\"color: #8B0000;\">**RFB**</span>, the <span style=\"color: #700000;\">Communist</span> paramilitary.",
      nextSceneId: "ban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_rfb",
      text: "Reverse the <span style=\"color: #8B0000;\">**RFB**</span> ban.",
      nextSceneId: "unban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sh",
      text: "Ban the <span style=\"color: #3E88B3;\">**Stahlhelm**</span>, the Nationalist paramilitary.",
      nextSceneId: "ban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_sh",
      text: "Reverse the <span style=\"color: #3E88B3;\">**Stahlhelm**</span> ban.",
      nextSceneId: "unban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "negotiate_concordat",
      text: "Negotiate a concordat with the Vatican.",
      nextSceneId: "negotiate_concordat",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "sign_concordat",
      text: "Sign a concordat with the Vatican.",
      nextSceneId: "sign_concordat",
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
      text: "No new policies are needed.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _police_loyalty_2: Scene = {
  id: "police_loyalty",
  title: "police_loyalty",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussian_police_loyalty'] < 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_loyalty'] += 0.08; 
  },

  

  render: `
    The police have historically been overrun with <span style="color: #808080;">reactionaries</span>, and we are trying to change this, little by little. We have improved the training and recruitment process to select for a broader demographic than the traditional <span style="color: #3E88B3;">conservatives</span>, and to put a tighter leash on their political activity. In addition, we set up committees to investigate the ranks of the police and remove those with <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> sympathies. It is a slow and arduous work.
    The <span style="color: #C0A054;">**DVP**</span> is sabotaging against our efforts in favor for the right.
    Current police loyalty: [+ prussian_police_loyalty : loyalty +].
  `,
  choices: [
    
  ]
};

export const _police_strength_2: Scene = {
  id: "police_strength",
  title: "police_strength",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_strength'] += 15; 
  },

  

  render: `
    We have increased the size of the Prussian police.
  `,
  choices: [
    
  ]
};

export const _bureaucracy_2: Scene = {
  id: "bureaucracy",
  title: "bureaucracy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_loyalty'] += 0.03; state.flags['nationalism'] -= 2; state.flags['pacifism'] += 1; state.flags['democratization'] += 1; state.flags['pro_republic'] += 2*(1-state.flags['dissent']);if (state.flags['democratization'] >= 4) { state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); }; state.flags['new_middle_z'] += 0.5; state.flags['new_middle_ddp'] += 1; state.flags['new_middle_dvp'] += 1; state.flags['new_middle_lvp'] += 2; state.flags['coup_progress'] += 0.5; state.flags['ddp_left'] += 0.25; state.flags['dvp_left'] += 0.5; state.flags['lvp_left'] += 0.5; 
  },

  

  render: `
    The bureaucracy is deeply <span style="color: #808080;">reactionary</span>, and many abuse their power to favor the <span style="color: #3E88B3;">political right</span>. By removing the <span style="color: #3E88B3;">pro-monarchy</span> and <span style="color: #7A3C00;">pro-dictatorship</span> elements, we can democratize it. Some of our opponents claim that we are infringing on individual freedoms, but perhaps the security of the republic requires it.
    The <span style="color: #C0A054;">**DVP**</span> fills up the bureaucracy with their own monarchist and industrialist sympathizers.
  `,
  choices: [
    
  ]
};

export const _ban_sa_3: Scene = {
  id: "ban_sa",
  title: "ban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && state.flags['sa_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.92;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_strength'] *= 0.8; };if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_banned_pro'] = 1; };if (state.flags['prussian_police_loyalty'] < 0.75) { state.flags['sa_banned_pro'] = 0; }; state.flags['sa_banned'] = 1; state.flags['prussian_police_loyalty'] -= 0.07; state.flags['sa_militancy'] -= 0.03; state.flags['sa_ban_timer'] = 6;if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 2; } 
  },

  

  render: `
    As it turns out, the <span style="color: #7A3C00;">Nazi</span> <span style="color: #7A3C00;">**SA**</span> has many allies in the police and bureaucracy, such as in the <span style="color: #C0A054;">**DVP**</span>. Our relationship with the police weakens, and the <span style="color: #7A3C00;">**SA**</span> can still organize illegally, right under the police's noses. [? if sa_banned_pro : Nevertheless, the <span style="color: #7A3C00;">**SA**</span> is substantially weakened by our ban. ?] 
    [? if coup_progress >= 6: There are reports of an imminent coup by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. We have disrupted some of these plans, but the threat is still present. ?]
  `,
  choices: [
    
  ]
};

export const _prosecute_sa_2: Scene = {
  id: "prosecute_sa",
  title: "prosecute_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && ! state.flags['sa_banned'] && (state.flags['chancellor'] == "Papen" || state.flags['chancellor'] == "Schleicher"));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.97; state.flags['sa_militancy'] -= 0.02; state.flags['prussian_police_loyalty'] -= 0.02;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_strength'] *= 0.98; } 
  },

  

  render: `
    While an outright ban on the <span style="color: #7A3C00;">**SA**</span> may be out of reach, we can make life as difficult as possible for the <span style="color: #7A3C00;">Storm Troopers</span>. The most reckless among them can be prosecuted on charges of murder and related crimes, and we can ensure legal public demonstrations and meetings are protected from their unlawful disruptions.
  `,
  choices: [
    
  ]
};

export const _unban_sa_3: Scene = {
  id: "unban_sa",
  title: "unban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sa_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_banned'] = 0; state.flags['sa_strength'] += 100; state.flags['sa_militancy'] += 0.05;if (state.flags['sa_coup_progress'] >= 6) { state.flags['coup_progress'] += 2; } 
  },

  

  render: `
    The <span style="color: #7A3C00;">**SA**</span> is no longer banned. They immediately go on a recruiting spree.
  `,
  choices: [
    
  ]
};

export const _ban_sh_3: Scene = {
  id: "ban_sh",
  title: "ban_sh",
  subtitle: "The <span style=\"color: #C0A054;\">**DVP**</span> won't like this.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_strength'] *= 0.9;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sh_strength'] *= 0.75; }; state.flags['sh_banned'] = 1; state.flags['dvp_relation'] -= 6; state.flags['prussian_police_loyalty'] -= 0.1;if (state.flags['spd_in_government'] == 1 && state.flags['in_grand_coalition'] == 1 && state.flags['president'] == "Hindenburg") { state.flags['coalition_dissent'] += 1; }; state.flags['sh_ban_timer'] = 6;if (state.flags['in_social_catholic_coalition_prussia'] && state.flags['cvp_formed']) { state.flags['coalition_dissent'] += 1; };if (state.flags['in_grand_coalition']) { state.flags['coalition_dissent'] += 1; }; state.flags['sh_coup_progress'] = state.flags['coup_progress'];if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 1; }; state.flags['hindenburg_angry'] += 8; 
  },

  

  render: `
    [? if president == "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with President Hindenburg, as well as the political <span style="color: #3E88B3;">right</span> and the police. ?][? if president != "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with the political <span style="color: #3E88B3;">right</span> and the police. ?] [? if spd_in_government = 1 and in_grand_coalition = 1 and president = "Hindenburg" : It also weakens our coalition due to the influence of Hindenburg on the <span style="color: #C0A054;">right</span> wing of our coalition. ?] In addition, the <span style="color: #3E88B3;">**Stahlhelm**</span> still operates out of public sight. 
  `,
  choices: [
    
  ]
};

export const _unban_sh_3: Scene = {
  id: "unban_sh",
  title: "unban_sh",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_banned'] = 0; state.flags['sh_strength'] += 100;if (state.flags['sh_coup_progress'] >= 6) { state.flags['coup_progress'] += 2; }; state.flags['hindenburg_angry'] -= 5; 
  },

  

  render: `
    The <span style="color: #3E88B3;">**Stahlhelm**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _ban_rfb_3: Scene = {
  id: "ban_rfb",
  title: "ban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['communist_coalition'] < 3 && state.flags['rfb_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] -= 15; state.flags['rfb_strength'] -= 50; state.flags['rfb_banned'] = 1; state.flags['communist_coalition'] -= 1; state.flags['z_relation'] += 5; state.flags['dvp_relation'] += 5; state.flags['prussian_police_loyalty'] += 0.1; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['hindenburg_angry'] -= 8; 
  },

  

  render: `
    The ban is enthusiastically carried out by the police, perhaps too enthusiastically. The <span style="color: #700000;">Communists</span> take this as one more reason why the <span style="color: #c00000;">Socialists</span> are traitors to the <span style="color: #9B0000;">left</span>. However, the <span style="color: #000000;">moderate</span> and <span style="color: #C0A054;">center-right</span> parties approve, as do the police.
  `,
  choices: [
    
  ]
};

export const _unban_rfb_3: Scene = {
  id: "unban_rfb",
  title: "unban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rfb_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rfb_banned'] = 0; state.flags['rfb_strength'] += 50; state.flags['prussian_police_loyalty'] -= 0.1; state.flags['hindenburg_angry'] += 8; 
  },

  

  render: `
    The <span style="color: #700000;">Communist</span> <span style="color: #700000;">**RFB**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _negotiate_concordat_2: Scene = {
  id: "negotiate_concordat",
  title: "negotiate_concordat",
  subtitle: "The <span style=\"color: #C0A054;\">**DVP**</span> won't like this.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['prussian_concordat_progress'] < 2 && state.flags['z_leader'] != "Kaas") || (state.flags['prussian_concordat_progress'] < 1 && state.flags['z_leader'] == "Kaas") && state.flags['prussian_concordat'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_concordat_progress'] += 1; state.flags['z_relation'] += 2*(1-state.flags['dissent']); state.flags['dvp_relation'] -= 2; state.flags['ddp_relation'] -= 1; 
  },

  

  render: `
    We are making progress towards negotiating a concordat between Prussia and the Catholic church. [? if z_leader = "Kaas": Ludwig Kaas of the [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] Party uses his connections to speed up negotiations. ?]
  `,
  choices: [
    
  ]
};

export const _sign_concordat_2: Scene = {
  id: "sign_concordat",
  title: "sign_concordat",
  subtitle: "The <span style=\"color: #C0A054;\">**DVP**</span> won't like this.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['prussian_concordat_progress'] >= 2 && ! state.flags['z_leader'] == "Kaas") || (state.flags['prussian_concordat_progress'] >= 1 && state.flags['z_leader'] == "Kaas") && state.flags['prussian_concordat'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_concordat'] = 1; state.flags['z_relation'] += 5; state.flags['catholics_spd'] += 3*(1-state.flags['dissent']);if (state.flags['dnvp_ideology'] == "Radical") { state.flags['catholics_dnvp'] -= 2; };if (state.flags['in_grand_coalition']) { state.flags['coalition_dissent'] += 1; }; state.flags['dvp_relation'] -= 5; state.flags['ddp_relation'] -= 3; state.flags['ddp_cohesion'] -= 1; 
  },

  

  render: `
    We have signed a Concordat between the Free State of Prussia and the Roman Catholic Church, guaranteeing religious freedom for Catholics in Prussia. This sets the stage for the negotiation of a national Concordat covering all of Germany.
    [? if dnvp_ideology == "Radical": The Catholic members of the <span style="color: #3E88B3;">**DNVP**</span> in Prussia are in open conflict with their leadership over the vote, with many leaving the party. ?] The <span style="color: #C0A054;">**DVP**</span> has gotten into strong disagreements with the [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?].
  `,
  choices: [
    
  ]
};

export const _prussian_affairs_left: Scene = {
  id: "prussian_affairs_left",
  title: "The Prussian Bulwark",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussia_leader'] == "Rosenfeld" && state.flags['in_popular_front_prussia'] == 1 || state.flags['in_left_front_prussia'] == 1 && state.flags['prussian_affairs_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_affairs_timer'] += 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: The state government of Prussia is a bulwark of democracy...
    = Prussian Affairs
    Prussia, by far the largest and most important state in Germany, is governed by our party, in a coalition with the [? if in_popular_front_prussia: [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?], [? if ddp_in_popular_front_prussia and not lvp_formed: [? if ddp_name == "DDP": <span style="color: #D3C24D;">**Democratic**</span>?][? if ddp_name == "DStP": <span style="color: #D3C24D;">**State**</span>?]?] and <span style="color: #700000;">**Communist**</span> parties.?][? if in_left_front_prussia: <span style="color: #700000;">**Communists**</span>.?] It is the most left-wing state government in Germany, led by Kurt Rosenfeld.
    We can enact policies in Prussia. [? if president == "Hindenburg": However, President Hindenburg and the political right are closely monitoring our every move and can invoke Reichsexekution at any time. Tread lightly. ?]
  `,
  choices: [
    {
      id: "police_loyalty",
      text: "Bolster the loyalty of the police.",
      nextSceneId: "police_loyalty",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "police_strength",
      text: "Recruit additional police.",
      nextSceneId: "police_strength",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "bureaucracy",
      text: "Purge the bureaucracy of <span style=\"color: #808080;\">reactionary</span> elements.",
      nextSceneId: "bureaucracy",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sa",
      text: "Ban the <span style=\"color: #7A3C00;\">**SA**</span>, the <span style=\"color: #7A3C00;\">Nazi</span> paramilitary group.",
      nextSceneId: "ban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sh",
      text: "Ban the <span style=\"color: #3E88B3;\">**Stahlhelm**</span>, the Nationalist paramilitary.",
      nextSceneId: "ban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_rfb",
      text: "Reverse the <span style=\"color: #8B0000;\">**RFB**</span> ban.",
      nextSceneId: "unban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "free_kpd",
      text: "Protect <span style=\"color: #8B0000;\">**KPD**</span> demonstrations from the <span style=\"color: #7A3C00;\">far</span>-<span style=\"color: #3E88B3;\">right</span>.",
      nextSceneId: "free_kpd",
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
      text: "No new policies are needed.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _police_loyalty_3: Scene = {
  id: "police_loyalty",
  title: "police_loyalty",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussian_police_loyalty'] < 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_loyalty'] += 0.15; state.flags['rfb_strength'] += 25; state.flags['reichsexekution'] += 1; 
  },

  

  render: `
    The police have historically been overrun with <span style="color: #808080;">reactionaries</span>, and we are trying to change this, little by little. We have improved the training and recruitment process to select for a broader demographic than the traditional <span style="color: #3E88B3;">conservatives</span>, and to put a tighter leash on their political activity. In addition, we set up committees to investigate the ranks of the police and remove those with <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> sympathies. The <span style="color: #700000;">**KPD**</span> have also began to infiltrate some of their own into the police force...
    Current police loyalty: [+ prussian_police_loyalty : loyalty +].
  `,
  choices: [
    
  ]
};

export const _police_strength_3: Scene = {
  id: "police_strength",
  title: "police_strength",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_strength'] += 30; state.flags['rfb_strength'] += 50; 
  },

  

  render: `
    We have increased the size of the Prussian police.
  `,
  choices: [
    
  ]
};

export const _bureaucracy_3: Scene = {
  id: "bureaucracy",
  title: "bureaucracy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_loyalty'] += 0.08; state.flags['nationalism'] -= 5; state.flags['pacifism'] += 1; state.flags['democratization'] += 2; state.flags['pro_republic'] += 3*(1-state.flags['dissent']);if (state.flags['democratization'] >= 3) { state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 4) { state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); }; state.flags['coup_progress'] += 0.5; state.flags['dvp_left'] += 2; state.flags['ddp_left'] += 1; state.flags['lvp_left'] += 1.5; state.flags['reichsexekution'] += 1; state.flags['bureaucracy_goal_prussia'] -= 1; state.flags['new_middle_kpd'] += 2; 
  },

  

  render: `
    The bureaucracy is deeply <span style="color: #808080;">reactionary</span>, and many abuse their power to favor the <span style="color: #3E88B3;">political right</span>. By removing the <span style="color: #3E88B3;">pro-monarchy</span> and <span style="color: #7A3C00;">pro-dictatorship</span> elements, we can democratize it. The <span style="color: #700000;">**KPD**</span> have also began to infiltrate some of their own into the state bureaucracy...
  `,
  choices: [
    
  ]
};

export const _ban_sa_4: Scene = {
  id: "ban_sa",
  title: "ban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sa_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.9;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_strength'] *= 0.75; };if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_banned_pro'] = 1; };if (state.flags['prussian_police_loyalty'] < 0.75) { state.flags['sa_banned_pro'] = 0; }; state.flags['sa_banned'] = 1; state.flags['dvp_relation'] -= 3; state.flags['prussian_police_loyalty'] -= 0.05; state.flags['sa_militancy'] -= 0.05; state.flags['sa_ban_timer'] = 6; state.flags['interior_goal_prussia'] -= 1;if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 2; } 
  },

  

  render: `
    As it turns out, the <span style="color: #7A3C00;">Nazi</span> <span style="color: #7A3C00;">**SA**</span> has many allies in the police and bureaucracy. Our relationship with the police weakens, and the <span style="color: #7A3C00;">**SA**</span> can still organize illegally, right under the police's noses. [? if sa_banned_pro : Nevertheless, the <span style="color: #7A3C00;">**SA**</span> is substantially weakened by our ban. ?] 
    [? if coup_progress >= 6: There are reports of an imminent coup by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. We have disrupted some of these plans, but the threat is still present. ?]
  `,
  choices: [
    
  ]
};

export const _ban_sh_4: Scene = {
  id: "ban_sh",
  title: "ban_sh",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_strength'] *= 0.85;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sh_strength'] *= 0.7; }; state.flags['sh_banned'] = 1; state.flags['dvp_relation'] -= 5; state.flags['lvp_relation'] -= 2; state.flags['prussian_police_loyalty'] -= 0.1;if (state.flags['spd_in_government'] == 1 && state.flags['in_grand_coalition'] == 1 && state.flags['president'] == "Hindenburg") { state.flags['coalition_dissent'] += 1; }; state.flags['sh_ban_timer'] = 6; state.flags['interior_goal_prussia'] -= 1; state.flags['sh_coup_progress'] = state.flags['coup_progress'];if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 1; }; state.flags['hindenburg_angry'] += 5; 
  },

  

  render: `
    [? if president == "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with President Hindenburg, as well as the political <span style="color: #3E88B3;">right</span> and the police. ?][? if president != "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with the political <span style="color: #3E88B3;">right</span> and the police. ?] [? if spd_in_government = 1 and in_grand_coalition = 1 and president = "Hindenburg" : It also weakens our coalition due to the influence of Hindenburg on the <span style="color: #C0A054;">right</span> wing of our coalition. ?] In addition, the <span style="color: #3E88B3;">**Stahlhelm**</span> still operates out of public sight. 
  `,
  choices: [
    
  ]
};

export const _unban_rfb_4: Scene = {
  id: "unban_rfb",
  title: "unban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rfb_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rfb_banned'] = 0; state.flags['rfb_strength'] += 100; state.flags['prussian_police_loyalty'] -= 0.1; state.flags['rfb_goal_prussia'] -= 1; state.flags['hindenburg_angry'] += 8; 
  },

  

  render: `
    The <span style="color: #700000;">Communist</span> <span style="color: #700000;">**RFB**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _free_kpd: Scene = {
  id: "free_kpd",
  title: "free_kpd",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rfb_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rfb_banned'] = 0; state.flags['rfb_strength'] += 50; state.flags['rfb_militancy'] += 0.03; state.flags['prussian_police_loyalty'] -= 0.05; state.flags['workers_kpd'] += 4; state.flags['unemployed_kpd'] += 4; state.flags['free_kpd_goal_prussia'] -= 1; state.flags['reichsexekution'] += 1; state.flags['dvp_relation'] -= 5; state.flags['ddp_relation'] -= 4; state.flags['lvp_relation'] -= 5; state.flags['z_relation'] -= 4; state.flags['dvp_right'] += 2; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_right'] += 1.5; state.flags['left_dissent'] -= 5; state.flags['reformist_dissent'] += 5; 
  },

  

  render: `
    Restrictions are lifted and police are deployed to protect <span style="color: #700000;">Communist</span> demonstrations and organizations from the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>.
  `,
  choices: [
    
  ]
};

export const _prussian_affairs_majority: Scene = {
  id: "prussian_affairs_majority",
  title: "The Prussian Bulwark",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['in_spd_majority_prussia'] && (state.flags['prussian_affairs_timer'] <= 0 || (state.flags['prussian_affairs_timer'] <= 3 && state.flags['rubicon'])));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_affairs_timer'] += 6;if (state.flags['prussia_leader'] != "Braun") { state.flags['prussian_affairs_timer'] += 6; }; state.flags['month_actions'] += 1; 
  },

  

  render: `
    #subtitle: The state government of Prussia is a bulwark of democracy...
    = Prussian Affairs
    Prussia, by far the largest and most important state in Germany, is governed solely by our party, free from the compromises demanded by the bourgeois parties. This grants us the opportunity to pursue meaningful reforms. Under the capable leadership of Otto Braun, Prussia stands as the most stable and democratic government in the Republic.
    All our actions have increased effectiveness. 
    We can enact policies in Prussia.
  `,
  choices: [
    {
      id: "police_loyalty",
      text: "Bolster the loyalty of the police.",
      nextSceneId: "police_loyalty",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "police_strength",
      text: "Recruit additional police.",
      nextSceneId: "police_strength",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "bureaucracy",
      text: "Purge the bureaucracy of <span style=\"color: #808080;\">reactionary</span> elements.",
      nextSceneId: "bureaucracy",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sa",
      text: "Ban the <span style=\"color: #7A3C00;\">**SA**</span>, the <span style=\"color: #7A3C00;\">Nazi</span> paramilitary group.",
      nextSceneId: "ban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "prosecute_sa",
      text: "Target the <span style=\"color: #7A3C00;\">**SA**</span>, and minimize their disruptions.",
      nextSceneId: "prosecute_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_sa",
      text: "Reverse the <span style=\"color: #7A3C00;\">**SA**</span> ban.",
      nextSceneId: "unban_sa",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_rfb",
      text: "Ban the <span style=\"color: #8B0000;\">**RFB**</span>, the <span style=\"color: #700000;\">Communist</span> paramilitary.",
      nextSceneId: "ban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_rfb",
      text: "Reverse the <span style=\"color: #8B0000;\">**RFB**</span> ban.",
      nextSceneId: "unban_rfb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "ban_sh",
      text: "Ban the <span style=\"color: #3E88B3;\">**Stahlhelm**</span>, the Nationalist paramilitary.",
      nextSceneId: "ban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unban_sh",
      text: "Reverse the <span style=\"color: #3E88B3;\">**Stahlhelm**</span> ban.",
      nextSceneId: "unban_sh",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "negotiate_concordat",
      text: "Negotiate a concordat with the Vatican.",
      nextSceneId: "negotiate_concordat",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "sign_concordat",
      text: "Sign a concordat with the Vatican.",
      nextSceneId: "sign_concordat",
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
      text: "No new policies are needed.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _police_loyalty_4: Scene = {
  id: "police_loyalty",
  title: "police_loyalty",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussian_police_loyalty'] < 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_loyalty'] += 0.15; 
  },

  

  render: `
    The police have historically been overrun with <span style="color: #808080;">reactionaries</span>, and we are trying to change this, little by little. We have improved the training and recruitment process to select for a broader demographic than the traditional <span style="color: #3E88B3;">conservatives</span>, and to put a tighter leash on their political activity. In addition, we set up committees to investigate the ranks of the police and remove those with <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> sympathies. It is a slow and arduous work.
    Current police loyalty: [+ prussian_police_loyalty : loyalty +].
  `,
  choices: [
    
  ]
};

export const _police_strength_4: Scene = {
  id: "police_strength",
  title: "police_strength",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_strength'] += 35; 
  },

  

  render: `
    We have increased the size of the Prussian police.
  `,
  choices: [
    
  ]
};

export const _bureaucracy_4: Scene = {
  id: "bureaucracy",
  title: "bureaucracy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_police_loyalty'] += 0.08; state.flags['nationalism'] -= 4; state.flags['pacifism'] += 1; state.flags['democratization'] += 1; state.flags['pro_republic'] += 4*(1-state.flags['dissent']);if (state.flags['democratization'] >= 3) { state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); } 
  },

  

  render: `
    The bureaucracy is deeply <span style="color: #808080;">reactionary</span>, and many abuse their power to favor the <span style="color: #3E88B3;">political right</span>. By removing the <span style="color: #3E88B3;">pro-monarchy</span> and <span style="color: #7A3C00;">pro-dictatorship</span> elements, we can democratize it. Some of our opponents claim that we are infringing on individual freedoms, but perhaps the security of the republic requires it.
  `,
  choices: [
    
  ]
};

export const _ban_sa_5: Scene = {
  id: "ban_sa",
  title: "ban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && state.flags['sa_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.85;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_strength'] *= 0.75; };if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_banned_pro'] = 1; };if (state.flags['prussian_police_loyalty'] < 0.75) { state.flags['sa_banned_pro'] = 0; }; state.flags['sa_banned'] = 1; state.flags['dvp_relation'] -= 3; state.flags['prussian_police_loyalty'] -= 0.05; state.flags['sa_militancy'] -= 0.05; state.flags['sa_ban_timer'] = 6;if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 2; } 
  },

  

  render: `
    As it turns out, the <span style="color: #7A3C00;">Nazi</span> <span style="color: #7A3C00;">**SA**</span> has many allies in the police and bureaucracy. Our relationship with the police weakens, and the <span style="color: #7A3C00;">**SA**</span> can still organize illegally, right under the police's noses. [? if sa_banned_pro : Nevertheless, the <span style="color: #7A3C00;">**SA**</span> is substantially weakened by our ban. ?] 
    [? if coup_progress >= 6: There are reports of an imminent coup by the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span>. We have disrupted some of these plans, but the threat is still present. ?]
  `,
  choices: [
    
  ]
};

export const _prosecute_sa_3: Scene = {
  id: "prosecute_sa",
  title: "prosecute_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && ! state.flags['sa_banned'] && (state.flags['chancellor'] == "Papen" || state.flags['chancellor'] == "Schleicher"));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_strength'] *= 0.95; state.flags['sa_militancy'] -= 0.02; state.flags['prussian_police_loyalty'] -= 0.02;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sa_strength'] *= 0.98; } 
  },

  

  render: `
    While an outright ban on the <span style="color: #7A3C00;">**SA**</span> may be out of reach, we can make life as difficult as possible for the <span style="color: #7A3C00;">Storm Troopers</span>. The most reckless among them can be prosecuted on charges of murder and related crimes, and we can ensure legal public demonstrations and meetings are protected from their unlawful disruptions.
  `,
  choices: [
    
  ]
};

export const _unban_sa_4: Scene = {
  id: "unban_sa",
  title: "unban_sa",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sa_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sa_banned'] = 0; state.flags['sa_strength'] += 100; state.flags['sa_militancy'] += 0.05;if (state.flags['sa_coup_progress'] >= 6) { state.flags['coup_progress'] += 2; } 
  },

  

  render: `
    The <span style="color: #7A3C00;">**SA**</span> is no longer banned. They immediately go on a recruiting spree.
  `,
  choices: [
    
  ]
};

export const _ban_sh_5: Scene = {
  id: "ban_sh",
  title: "ban_sh",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 0 && ! state.flags['in_social_catholic_coalition_prussia']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_strength'] *= 0.8;if (state.flags['prussian_police_loyalty'] >= 0.75) { state.flags['sh_strength'] *= 0.7; }; state.flags['sh_banned'] = 1; state.flags['dvp_relation'] -= 5; state.flags['lvp_relation'] -= 2; state.flags['prussian_police_loyalty'] -= 0.1;if (state.flags['spd_in_government'] == 1 && state.flags['in_grand_coalition'] == 1 && state.flags['president'] == "Hindenburg") { state.flags['coalition_dissent'] += 1; };if (state.flags['in_social_catholic_coalition_prussia'] && state.flags['cvp_formed']) { state.flags['coalition_dissent'] += 1; }; state.flags['sh_ban_timer'] = 6; state.flags['sh_coup_progress'] = state.flags['coup_progress'];if (state.flags['coup_progress'] >= 6) { state.flags['coup_progress'] -= 1; }; state.flags['hindenburg_angry'] += 5; 
  },

  

  render: `
    [? if president == "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with President Hindenburg, as well as the political <span style="color: #3E88B3;">right</span> and the police. ?][? if president != "Hindenburg": Banning the <span style="color: #3E88B3;">**Stahlhelm**</span> weakens our relationship with the political <span style="color: #3E88B3;">right</span> and the police. ?] [? if spd_in_government = 1 and in_grand_coalition = 1 and president = "Hindenburg" : It also weakens our coalition due to the influence of Hindenburg on the <span style="color: #C0A054;">right</span> wing of our coalition. ?] In addition, the <span style="color: #3E88B3;">**Stahlhelm**</span> still operates out of public sight. 
  `,
  choices: [
    
  ]
};

export const _unban_sh_4: Scene = {
  id: "unban_sh",
  title: "unban_sh",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sh_banned'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sh_banned'] = 0; state.flags['sh_strength'] += 100;if (state.flags['sh_coup_progress'] >= 6) { state.flags['coup_progress'] += 2; }; state.flags['hindenburg_angry'] -= 5; 
  },

  

  render: `
    The <span style="color: #3E88B3;">**Stahlhelm**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _ban_rfb_4: Scene = {
  id: "ban_rfb",
  title: "ban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['communist_coalition'] < 3 && state.flags['rfb_banned'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] -= 15; state.flags['rfb_strength'] -= 50; state.flags['rfb_banned'] = 1; state.flags['communist_coalition'] -= 1; state.flags['z_relation'] += 5; state.flags['dvp_relation'] += 5; state.flags['ddp_relation'] += 5; state.flags['lvp_relation'] += 5; state.flags['prussian_police_loyalty'] += 0.1; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['lvp_left'] += 1; state.flags['hindenburg_angry'] -= 8; 
  },

  

  render: `
    The ban is enthusiastically carried out by the police, perhaps too enthusiastically. The <span style="color: #700000;">Communists</span> take this as one more reason why the <span style="color: #c00000;">Socialists</span> are traitors to the <span style="color: #9B0000;">left</span>. However, the <span style="color: #000000;">moderate</span> and <span style="color: #C0A054;">center-right</span> parties approve, as do the police.
  `,
  choices: [
    
  ]
};

export const _unban_rfb_5: Scene = {
  id: "unban_rfb",
  title: "unban_rfb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rfb_banned'] == 1 && ! state.flags['in_social_catholic_coalition_prussia']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rfb_banned'] = 0; state.flags['rfb_strength'] += 50; state.flags['prussian_police_loyalty'] -= 0.1; state.flags['hindenburg_angry'] += 8; 
  },

  

  render: `
    The <span style="color: #700000;">Communist</span> <span style="color: #700000;">**RFB**</span> is no longer banned.
  `,
  choices: [
    
  ]
};

export const _negotiate_concordat_3: Scene = {
  id: "negotiate_concordat",
  title: "negotiate_concordat",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['prussian_concordat_progress'] < 2 && state.flags['z_leader'] != "Kaas") || (state.flags['prussian_concordat_progress'] < 1 && state.flags['z_leader'] == "Kaas") && state.flags['prussian_concordat'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_concordat_progress'] += 1; state.flags['z_relation'] += 2*(1-state.flags['dissent']); 
  },

  

  render: `
    We are making progress towards negotiating a concordat between Prussia and the Catholic church. [? if z_leader = "Kaas": Ludwig Kaas of the [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] Party uses his connections to speed up negotiations. ?]
  `,
  choices: [
    
  ]
};

export const _sign_concordat_3: Scene = {
  id: "sign_concordat",
  title: "sign_concordat",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['prussian_concordat_progress'] >= 2 && ! state.flags['z_leader'] == "Kaas") || (state.flags['prussian_concordat_progress'] >= 1 && state.flags['z_leader'] == "Kaas") && state.flags['prussian_concordat'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['prussian_concordat'] = 1; state.flags['z_relation'] += 8; state.flags['catholics_spd'] += 3*(1-state.flags['dissent']);if (state.flags['dnvp_ideology'] == "Radical") { state.flags['catholics_dnvp'] -= 2; }; state.flags['ddp_relation'] -= 2; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_relation'] -= 2; 
  },

  

  render: `
    We have signed a Concordat between the Free State of Prussia and the Roman Catholic Church, guaranteeing religious freedom for Catholics in Prussia. This sets the stage for the negotiation of a national Concordat covering all of Germany.
    [? if dnvp_ideology == "Radical": The Catholic members of the <span style="color: #3E88B3;">**DNVP**</span> in Prussia are in open conflict with their leadership over the vote, with many leaving the party. ?]
  `,
  choices: [
    
  ]
};

export const _red_general: Scene = {
  id: "red_general",
  title: "Relations with the Red General",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['rubicon'] && state.flags['red_general_unlock'] && state.flags['red_general_timer'] <= 0 && ! state.flags['schleicher_fight']) && ! state.flags['schleicher_dead']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1;if (! state.flags['schleicher_spd_adopted']) { state.flags['red_general_timer'] += 4; };if (state.flags['schleicher_spd_adopted']) { state.flags['red_general_timer'] += 6; };if (state.flags['chancellor'] == "Schleicher") { state.flags['red_general_timer'] -= 2; } 
  },

  

  render: `
    = Relations with the Red General
    While the <span style="color: #c00000;">**SPD**</span> remains steadfast in its commitment to a united front against the incumbent <span style="color: #808080;">reactionary</span> government, the ADGB, our union, has shown some openness to an accommodation with General Kurt von Schleicher. He has also shown interest in winning over the union through his support for public works.
  `,
  choices: [
    
  ]
};

export const _schleicher_menu: Scene = {
  id: "schleicher_menu",
  title: "schleicher_menu",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "spd_schleicher_adopted",
      text: "Adopt a policy of cooperation with the Red General!",
      nextSceneId: "spd_schleicher_adopted",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "convince_spd_schleicher",
      text: "Push the party toward a more cooperative line with von Schleicher.",
      nextSceneId: "convince_spd_schleicher",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "united_front",
      text: "Reiterate our opposition against the <span style=\"color: #808080;\">reactionaries</span>.",
      nextSceneId: "united_front",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _spd_schleicher_adopted: Scene = {
  id: "spd_schleicher_adopted",
  title: "spd_schleicher_adopted",
  subtitle: "The unions have firmly decided, but convincing the party is a whole another matter.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['schleicher_spd_support'] >= 10);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schleicher_spd_adopted'] = 1;if (state.flags['schleicher_spd_r'] < 5) { state.flags['schleicher_spd_r'] += 1; }; state.flags['center_dissent'] += 5; state.flags['left_dissent'] += 10; state.flags['labor_strength'] += 10; state.flags['reformist_strength'] += 5; state.flags['schleicher_approval'] += 2; 
  },

  

  render: `
    The ADGB leadership has now officially—although only in private—taken a stance in favor of cooperating with the "Red General." The union will attempt to leverage its influence over the <span style="color: #c00000;">**SPD**</span> to push our hesitant party leadership toward adopting the same position.
    Gradually, a shift in opinion is becoming visible within the party. Otto Braun has now come out in support of making deals with the General.
  `,
  choices: [
    
  ]
};

export const _convince_spd_schleicher: Scene = {
  id: "convince_spd_schleicher",
  title: "convince_spd_schleicher",
  subtitle: "[? if chancellor == \"Papen\": It's almost impossible to argue to the party to pursue this line, at least with Papen as chancellor. ?][? if chancellor == \"Schleicher\": Cooperation with the General himself is not unthinkable, with his concessions made toward the unions. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['schleicher_spd_support'] < 10);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schleicher_spd_support'] += 3;if (state.flags['wtb_adopted']) { state.flags['schleicher_spd_support'] += 1; };if (state.flags['chancellor'] == "Papen") { state.flags['schleicher_spd_support'] -= 1; };if (state.flags['otl_prussian_coup_seen']) { state.flags['schleicher_spd_support'] -= 1; }; state.flags['workers_spd'] -= 1; state.flags['unemployed_spd'] -= 1; state.flags['workers_kpd'] += 1; state.flags['unemployed_kpd'] += 1; state.flags['center_dissent'] += 5; state.flags['left_dissent'] += 5; 
  },

  

  render: `
    Slowly but surely, the ADGB leadership is beginning to warm to the idea of constructive cooperation with the so-called "Red General." However, much work remains to be done—many within the union, and the overwhelming majority of the <span style="color: #c00000;">**SPD**</span>, remain firmly opposed to cooperating with the man [? if chancellor == "Papen": propping up the widely despised Papen cabinet?][? if chancellor == "Schleicher": who now heads a widely unpopular government?]. [? if wtb_adopted: Our adoption of the WTB Plan—and Schleicher’s public support for similar public works initiatives—has modestly increased the party’s willingness to consider cooperation. ?]
    [? if otl_prussian_coup_seen: Furthermore, his role in the coup against our Prussian government has only deepened the animosity toward both him and the <span style="color: #c00000;">**SPD**</span>. ?] Rumors about our cooperation has damaged our standing among the working class.
  `,
  choices: [
    
  ]
};

export const _united_front: Scene = {
  id: "united_front",
  title: "united_front",
  subtitle: "The consensus view within the <span style=\"color: #c00000;\">**SPD**</span>. We are a democratic party after all.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (state.flags['schleicher_spd_support'] > 0) { state.flags['schleicher_spd_support'] -= 2; };if (state.flags['schleicher_spd_r'] > 0) { state.flags['schleicher_spd_r'] -= 1; };if (state.flags['schleicher_spd_influence'] > 0) { state.flags['schleicher_spd_influence'] -= 1; }; state.flags['workers_spd'] += 2; state.flags['workers_kpd'] -= 1; state.flags['left_dissent'] -= 5; state.flags['center_dissent'] -= 5; 
  },

  

  render: `
    We continue to argue for a united opposition of the democratic parties against the unpopular [+ chancellor +] government, and win support among the people for doing so. 
  `,
  choices: [
    
  ]
};

export const _schleicher_spd_established: Scene = {
  id: "schleicher_spd_established",
  title: "schleicher_spd_established",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "schleicher_ties",
      text: "Cultivate closer ties with the Red General.",
      nextSceneId: "schleicher_ties",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "schleicher_distance",
      text: "Distance ourselves from Schleicher.",
      nextSceneId: "schleicher_distance",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "concessions",
      text: "Using our influence, demand concessions on the government.",
      nextSceneId: "concessions",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _schleicher_ties: Scene = {
  id: "schleicher_ties",
  title: "schleicher_ties",
  subtitle: "More regular meetings will be held between the two groups.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schleicher_spd_r'] += 1; state.flags['schleicher_spd_support'] += 1; state.flags['schleicher_spd_influence'] += 1; 
  },

  

  render: `
    Regular secret meetings between the ADGB, the <span style="color: #c00000;">**SPD**</span>, and von Schleicher are being held. This will aid in reducing the mutual distrust between the party and the government.
  `,
  choices: [
    
  ]
};

export const _schleicher_distance: Scene = {
  id: "schleicher_distance",
  title: "schleicher_distance",
  subtitle: "We will sideline his sympathizers.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schleicher_spd_r'] -= 1; state.flags['schleicher_spd_support'] -= 2; state.flags['schleicher_spd_influence'] -= 1; state.flags['labor_dissent'] += 8; state.flags['reformist_dissent'] += 8; state.flags['social_patriot_dissent'] += 8; state.flags['center_dissent'] -= 5; state.flags['left_dissent'] -= 5; state.flags['neorevisionist_dissent'] -= 5; state.flags['reformist_strength'] -= 4; state.flags['labor_strength'] -= 4; state.flags['social_patriot_strength'] -= 4; 
  },

  

  render: `
    In recent months, Schleicher has gained significant sympathizers within the Reformist and Labor factions of the <span style="color: #c00000;">**SPD**</span>. Sidelining them would provoke Schleicher’s distrust and stir dissent within their factions affected.
  `,
  choices: [
    
  ]
};

export const _concessions: Scene = {
  id: "concessions",
  title: "concessions",
  subtitle: "There's a limit to what we can demand, but we can look at our options.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['chancellor'] == "Schleicher" && state.flags['schleicher_time'] >= 8 && state.flags['schleicher_spd_concession'] < 2);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    [? if prussia_leader == "Schleicher": Braun demands the restoration of his government in Prussia. ?]
    Labor demands the restoration of their rights and welfare.
    The <span style="color: #c00000;">**SPD**</span> a cabinet reshuffle.
    We may only demand one, as to not push our luck.
  `,
  choices: [
    {
      id: "prussia",
      text: "prussia",
      nextSceneId: "prussia",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "labor",
      text: "labor",
      nextSceneId: "labor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cabinet_reshuffle",
      text: "cabinet_reshuffle",
      nextSceneId: "cabinet_reshuffle",
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

export const _prussia: Scene = {
  id: "prussia",
  title: "Demand the reinstatement of our government in Prussia.",
  subtitle: "Regain control over the Prussian police and secure participation in state government.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussia_leader'] == "Schleicher");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schleicher_spd_concession'] += 1; state.flags['schleicher_spd_influence'] += 4; state.flags['schleicher_spd_support'] += 2; state.flags['schleicher_spd_r'] -= 2; state.flags['prussia_returned'] = 1; state.flags['prussia_leader'] = state.flags['older_prussia_leader'];if (state.flags['pre_in_weimar_coalition_prussia']) { state.flags['in_weimar_coalition_prussia'] = 1; };if (state.flags['pre_in_grand_coalition_prussia']) { state.flags['in_grand_coalition_prussia'] = 1; };if (state.flags['in_weimar_coalition_prussia'] && state.flags['weimar_coalition_prussia'] < 50) { state.flags['in_minority_weimar_coalition_prussia'] = 1; };if (state.flags['in_grand_coalition_prussia'] && state.flags['grand_coalition_prussia'] < 50) { state.flags['in_minority_grand_coalition_prussia'] = 1; }; state.flags['pro_republic'] += 10; state.flags['workers_spd'] += 5; state.flags['new_middle_spd'] += 5; state.flags['unemployed_spd'] += 3; state.flags['new_middle_ddp'] += 3; state.flags['labor_dissent'] -= 15; state.flags['reformist_dissent'] -= 15; state.flags['reformist_strength'] += 15; state.flags['left_dissent'] -= 15; state.flags['prussian_police_loyalty'] += 0.3; state.flags['rb_strength'] *= 1.1; state.flags['rb_militancy'] *= 1.1; state.flags['papen_strength'] += 1; state.flags['schleicher_strength'] -= 1; state.flags['hindenburg_schleicher_r'] -= 2; state.flags['schleicher_approval'] += 1; state.flags['nationalists_schleicher_bonus'] -= 2; state.flags['industrialists_schleicher_bonus'] -= 1; state.flags['republicans_schleicher_bonus'] += 2; 
  },

  

  render: `
    Despite rejecting Braun’s offer a few months ago, Schleicher has since reconsidered. With such a popular statesman on his side, his rule will gain legitimacy in the eyes of the <span style="color: #000000;">repu</span><span style="color: #DD0000;">bli</span><span style="color: #FFCC00;">cans</span> and the public. Braun, in turn, will tirelessly advocate for a pro-Schleicher policy within the party.
    Now, with control over the democratic bulwark once again, we can reassert democratic oversight over the bureaucracy and the Prussian police force, reversing the purges enacted under Papen and Schleicher.
  `,
  choices: [
    {
      id: "prussian_affairs",
      text: "prussian_affairs",
      nextSceneId: "prussian_affairs",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "prussian_affairs_dvp",
      text: "prussian_affairs_dvp",
      nextSceneId: "prussian_affairs_dvp",
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

export const _labor: Scene = {
  id: "labor",
  title: "Demand more concessions for the trade unions, and restoration of the German welfare system.",
  subtitle: "Push for higher wages, the repeal of Papen’s decrees, and the restoration of the eight-hour workday.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['schleicher_labor']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schleicher_spd_concession'] += 1; state.flags['schleicher_labor'] = 1; state.flags['schleicher_spd_influence'] += 4; state.flags['schleicher_spd_support'] += 2; state.flags['schleicher_spd_r'] -= 2; state.flags['hindenburg_schleicher_r'] -= 1; state.flags['unemployed'] -= 1.8; state.flags['economic_growth'] += 0.8; state.flags['inflation'] += 1.4; state.flags['budget'] -= 1; state.flags['workers_kpd'] -= 6; state.flags['unemployed_kpd'] -= 6; state.flags['workers_nsdap'] -= 2; state.flags['unemployed_nsdap'] -= 2; state.flags['workers_spd'] += 6; state.flags['unemployed_spd'] += 6; state.flags['workers_z'] += 2; state.flags['unemployed_z'] += 2; state.flags['workers_dnef'] += 4; state.flags['unemployed_dnef'] += 2; state.flags['workers_dnef_bonus'] += 4; state.flags['unemployed_dnef_bonus'] += 2; state.flags['pro_republic'] += 5; state.flags['labor_dissent'] -= 40; state.flags['labor_strength'] += 15; state.flags['social_patriot_strength'] += 10; state.flags['schleicher_approval'] += 2; state.flags['industrialists_schleicher_bonus'] -= 1; 
  },

  

  render: `
    The <span style="color: #c00000;">Social</span> General has lived up to his nickname: the means test for unemployment insurance has been abolished, and an eight-hour workday has been reinstated in select industries to "spread out" the work among more people. Funding for the Labor Ministry, gutted under Papen, has been restored, and welfare levels are climbing back from their absolute lows.
    The downside is clear—Schleicher now holds significant leverage over the unions, and many workers are beginning to place their loyalty in the chancellor, rather than the party that fought to make this possible.
  `,
  choices: [
    
  ]
};

export const _cabinet_reshuffle: Scene = {
  id: "cabinet_reshuffle",
  title: "Demand a reshuffle of the cabinet.",
  subtitle: "Schleicher’s cabinet remains dominated by deeply <span style=\"color: #808080;\">reactionary</span> holdovers from the Papen cabinet of barons.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schleicher_spd_concession'] += 1; state.flags['schleicher_spd_influence'] += 2; state.flags['schleicher_spd_support'] += 2; state.flags['schleicher_spd_r'] -= 2; state.flags['papen_strength'] += 2; state.flags['schleicher_strength'] -= 1; state.flags['hindenburg_schleicher_r'] -= 3; state.flags['schleicher_cabinet_weak'] = 1; state.flags['unemployed'] -= 0.4; state.flags['economic_growth'] += 0.2; state.flags['workers_spd'] += 2; state.flags['unemployed_spd'] += 2; state.flags['workers_kpd'] -= 2; state.flags['unemployed_kpd'] -= 2; state.flags['pro_republic'] += 8; state.flags['reformist_dissent'] -= 10; state.flags['reformist_strength'] += 5; state.flags['schleicher_approval'] += 1; 
  },

  

  render: `
    Although many <span style="color: #808080;">reactionary</span> figures in the cabinet have already been replaced by <span style="color: #000000;">Center Party</span> appointees, further reform is needed to nudge Schleicher’s government toward a more democratic appearance.
    The Finance Ministry, previously held by Schwerin von Krosigk, is handed over to a more neutral, non-partisan banker. The Interior Ministry and the Minister without Portfolio post are assigned to the [? if dnvp_ideology == "Moderate": <span style="color: #3E88B3;">**DNVP**</span>?][? if dnvp_ideology == "Radical": <span style="color: #0087DC;">**KVP**</span>?] moderate, Gottfried Treviranus. The Agricultural Ministry is granted to Hans Schlange-Schöningen, a [? if not kvp_formed and dnvp_ideology == "Radical": <span style="color: #7FCEB1;">**CNBLP**</span>?][? if kvp_formed: <span style="color: #0087DC;">**KVP**</span>?][? if dnvp_ideology == "Moderate": <span style="color: #3E88B3;">**DNVP**</span>?] <span style="color: #385A38;">agrarian</span> in support of peasant homesteads.
    Though these shifts may seem minor on the surface, the entry of more democratic-leaning ministers into the cabinet makes our continued support more palatable to both the party and our electorate—and subtly shifts the balance in key cabinet votes.
  `,
  choices: [
    
  ]
};

export const _rubicon_filler: Scene = {
  id: "rubicon_filler",
  title: "Biding our Time",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rubicon']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; 
  },

  

  render: `
    = Biding our Time
    The reality is, there is not much we can do. We cannot simply do nothing either.
  `,
  choices: [
    {
      id: "money",
      text: "Raise funds.",
      nextSceneId: "money",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "dissent",
      text: "Reduce party dissent.",
      nextSceneId: "dissent",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign",
      text: "Restore faith in the Republic.",
      nextSceneId: "campaign",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "protest",
      text: "Protest against the government.",
      nextSceneId: "protest",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _money: Scene = {
  id: "money",
  title: "money",
  subtitle: "+1 resource",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['resources'] < 2);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] += 1; 
  },

  

  render: `
    We have gained one additional resource.
  `,
  choices: [
    
  ]
};

export const _dissent: Scene = {
  id: "dissent",
  title: "dissent",
  subtitle: "We mustn't be divided, not in a time like this.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['left_dissent'] -= 5; state.flags['center_dissent'] -= 5; state.flags['labor_dissent'] -= 5; state.flags['reformist_dissent'] -= 5; 
  },

  

  render: `
    We have reduced dissent across all factions.
  `,
  choices: [
    
  ]
};

export const _campaign: Scene = {
  id: "campaign",
  title: "campaign",
  subtitle: "We must defend our creation.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pro_republic'] += 2; 
  },

  

  render: `
    In a few years time, the German people will thank us.
  `,
  choices: [
    
  ]
};

export const _protest: Scene = {
  id: "protest",
  title: "protest",
  subtitle: "The [+ chancellor +] cabinet must not be allowed to stand.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['papen_post_2']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pro_republic'] -= 2; state.flags['workers_spd'] += 1; state.flags['new_middle_spd'] += 1; 
  },

  

  render: `
    Labor has taken to the streets.
  `,
  choices: [
    
  ]
};

export const _shuffle_cabinet: Scene = {
  id: "shuffle_cabinet",
  title: "Shuffle Cabinet",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['shuffle_cabinet_timer'] == 0 && state.flags['chancellor_party'] == "SPD" && ! state.flags['in_spd_majority'] && ! state.flags['in_emergency_government'] && ! state.flags['in_left_front']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['shuffle_cabinet_timer'] = 6; 
  },

  

  render: `
    Do we wish to shuffle our cabinet? This might upset our current coalition.
    Current cabinet:
    Labor: 
    [? if labor_minister_party == "DNEF": <span style="color: #BFC8CC;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "SPD": <span style="color: #c00000;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "KPD": <span style="color: #700000;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == ddp_name: <span style="color: #D3C24D;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "LVP": <span style="color: #FFCC00;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "Z": <span style="color: #000000;">[+ z_party_name +]</span> ?]
    [? if labor_minister_party == "BVP": <span style="color: #A2D8E0;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "DVP": <span style="color: #C0A054;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "Others": <span style="color: #c00000;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "KVP": <span style="color: #0087DC;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "DNVP": <span style="color: #3E88B3;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "DNF": <span style="color: #003755;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "NSDAP": <span style="color: #7A3C00;">[+ labor_minister_party +]</span> ?]
    [? if labor_minister_party == "I": [+ labor_minister_party +] ?]
    Interior: 
    [? if interior_minister_party == "DNEF": <span style="color: #BFC8CC;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "SPD": <span style="color: #c00000;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "KPD": <span style="color: #700000;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == ddp_name: <span style="color: #D3C24D;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "LVP": <span style="color: #FFCC00;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "Z": <span style="color: #000000;">[+ z_party_name +]</span> ?]
    [? if interior_minister_party == "BVP": <span style="color: #A2D8E0;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "DVP": <span style="color: #C0A054;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "Others": <span style="color: #c00000;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "KVP": <span style="color: #0087DC;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "DNVP": <span style="color: #3E88B3;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "DNF": <span style="color: #003755;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "NSDAP": <span style="color: #7A3C00;">[+ interior_minister_party +]</span> ?]
    [? if interior_minister_party == "I": [+ labor_minister_party +] ?]
    Finance:
    [? if finance_minister_party == "DNEF": <span style="color: #BFC8CC;">[+ finance_minister_party +]</span> ?] 
    [? if finance_minister_party == "SPD": <span style="color: #c00000;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "KPD": <span style="color: #700000;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == ddp_name: <span style="color: #D3C24D;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "LVP": <span style="color: #FFCC00;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "Z": <span style="color: #000000;">[+ z_party_name +]</span> ?]
    [? if finance_minister_party == "BVP": <span style="color: #A2D8E0;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "DVP": <span style="color: #C0A054;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "Others": <span style="color: #c00000;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "KVP": <span style="color: #0087DC;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "DNVP": <span style="color: #3E88B3;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "DNF": <span style="color: #003755;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "NSDAP": <span style="color: #7A3C00;">[+ finance_minister_party +]</span> ?]
    [? if finance_minister_party == "I": [+ finance_minister_party +] ?]
    Economic: 
    [? if economic_minister_party == "DNEF": <span style="color: #BFC8CC;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "SPD": <span style="color: #c00000;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "KPD": <span style="color: #700000;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == ddp_name: <span style="color: #D3C24D;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "LVP": <span style="color: #FFCC00;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "Z": <span style="color: #000000;">[+ z_party_name +]</span> ?]
    [? if economic_minister_party == "BVP": <span style="color: #A2D8E0;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "DVP": <span style="color: #C0A054;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "Others": <span style="color: #c00000;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "KVP": <span style="color: #0087DC;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "DNVP": <span style="color: #3E88B3;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "DNF": <span style="color: #003755;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "NSDAP": <span style="color: #7A3C00;">[+ economic_minister_party +]</span> ?]
    [? if economic_minister_party == "I": [+ economic_minister_party +] ?]
    Justice: 
    [? if justice_minister_party == "DNEF": <span style="color: #BFC8CC;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "SPD": <span style="color: #c00000;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "KPD": <span style="color: #700000;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == ddp_name: <span style="color: #D3C24D;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "LVP": <span style="color: #FFCC00;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "Z": <span style="color: #000000;">[+ z_party_name +]</span> ?]
    [? if justice_minister_party == "BVP": <span style="color: #A2D8E0;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "DVP": <span style="color: #C0A054;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "Others": <span style="color: #c00000;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "KVP": <span style="color: #0087DC;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "DNVP": <span style="color: #3E88B3;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "DNF": <span style="color: #003755;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "NSDAP": <span style="color: #7A3C00;">[+ justice_minister_party +]</span> ?]
    [? if justice_minister_party == "I": [+ justice_minister_party +] ?]
    Foreign: 
    [? if labor_minister_party == "DNEF": <span style="color: #BFC8CC;">[+ labor_minister_party +]</span> ?]
    [? if foreign_minister_party == "SPD": <span style="color: #c00000;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "KPD": <span style="color: #700000;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == ddp_name: <span style="color: #D3C24D;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "LVP": <span style="color: #FFCC00;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "Z": <span style="color: #000000;">[+ z_party_name +]</span> ?]
    [? if foreign_minister_party == "BVP": <span style="color: #A2D8E0;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "DVP": <span style="color: #C0A054;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "Others": <span style="color: #c00000;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "KVP": <span style="color: #0087DC;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "DNVP": <span style="color: #3E88B3;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "DNF": <span style="color: #003755;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "NSDAP": <span style="color: #7A3C00;">[+ foreign_minister_party +]</span> ?]
    [? if foreign_minister_party == "I": [+ foreign_minister_party +] ?]
    Reichswehr: 
    [? if reichswehr_minister_party == "DNEF": <span style="color: #BFC8CC;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "SPD": <span style="color: #c00000;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "KPD": <span style="color: #700000;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == ddp_name: <span style="color: #D3C24D;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "LVP": <span style="color: #FFCC00;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "Z": <span style="color: #000000;">[+ z_party_name +]</span> ?]
    [? if reichswehr_minister_party == "BVP": <span style="color: #A2D8E0;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "DVP": <span style="color: #C0A054;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "Others": <span style="color: #c00000;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "KVP": <span style="color: #0087DC;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "DNVP": <span style="color: #3E88B3;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "DNF": <span style="color: #003755;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "NSDAP": <span style="color: #7A3C00;">[+ reichswehr_minister_party +]</span> ?]
    [? if reichswehr_minister_party == "I": [+ reichswehr_minister_party +] ?]
    Agriculture: 
    [? if agriculture_minister_party == "DNEF": <span style="color: #BFC8CC;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "SPD": <span style="color: #c00000;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "KPD": <span style="color: #700000;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == ddp_name: <span style="color: #D3C24D;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "LVP": <span style="color: #FFCC00;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "Z": <span style="color: #000000;">[+ z_party_name +]</span> ?]
    [? if agriculture_minister_party == "BVP": <span style="color: #A2D8E0;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "DVP": <span style="color: #C0A054;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "Others": <span style="color: #c00000;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "KVP": <span style="color: #0087DC;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "DNVP": <span style="color: #3E88B3;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "DNF": <span style="color: #003755;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "NSDAP": <span style="color: #7A3C00;">[+ agriculture_minister_party +]</span> ?]
    [? if agriculture_minister_party == "I": [+ agriculture_minister_party +] ?]
  `,
  choices: [
    {
      id: "shuffle",
      text: "Yes, do it.",
      nextSceneId: "shuffle",
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
      text: "No, there is no need.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _shuffle: Scene = {
  id: "shuffle",
  title: "shuffle",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['coalition_dissent'] += 1; state.flags['month_actions'] += 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _social_welfare: Scene = {
  id: "social_welfare",
  title: "Social welfare policy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['social_welfare_timer'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['social_welfare_timer'] = 10; state.flags['month_actions'] += 1; 
  },

  

  render: `
    = Social Welfare Policy
    The social welfare program, including unemployment insurance, healthcare, and old-age care, is the proudest achievement of the <span style="color: #c00000;">**SPD**</span> in our time in government. There is continuous pressure to dismantle the welfare system[? if black_thursday_seen = 1 :, especially given the economic crisis ?].
    #- @cancel_advisor_action
  `,
  choices: [
    {
      id: "reduce_spending",
      text: "Reduce spending on welfare.",
      nextSceneId: "reduce_spending",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "increase_spending_pre_depression",
      text: "Increase spending on welfare.",
      nextSceneId: "increase_spending_pre_depression",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "increase_spending_post_depression",
      text: "Increase spending (welfare levels will remain about the same).",
      nextSceneId: "increase_spending_post_depression",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "spending_same_pre_depression",
      text: "Keep spending the same.",
      nextSceneId: "spending_same_pre_depression",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "spending_same_post_depression",
      text: "Keep spending the same (effectively a service cut).",
      nextSceneId: "spending_same_post_depression",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
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

export const _reduce_spending: Scene = {
  id: "reduce_spending",
  title: "reduce_spending",
  subtitle: "This will hurt our proletarian base. +1 Budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] += 1; state.flags['workers_spd'] -= 6; state.flags['unemployed_spd'] -= 6; state.flags['workers_kpd'] += 3; state.flags['welfare'] -= 1; state.flags['reformist_dissent'] += 10; state.flags['left_dissent'] += 10; state.flags['labor_dissent'] += 10; state.flags['center_dissent'] += 5; state.flags['neorevisionist_dissent'] += 5; state.flags['dvp_relation'] += 5; state.flags['ddp_relation'] += 2; state.flags['lvp_relation'] += 3; state.flags['z_relation'] += 3; state.flags['pro_republic'] -= 3;if (((state.flags['in_grand_coalition'] || (state.flags['in_weimar_coalition'] && state.flags['lvp_formed'])) && state.flags['coalition_dissent'] > 0)) { state.flags['coalition_dissent'] -= 1; }; state.flags['kpd_coalition_dissent'] += 1; state.flags['kpd_relation'] -= 8; state.flags['inflation'] -= 0.3; state.flags['unemployed'] += 0.4; state.flags['dvp_left'] += 1; state.flags['ddp_right'] += 1; state.flags['ddp_cohesion'] -= 0.5; state.flags['lvp_left'] += 0.5; state.flags['goal_spd_cancel'] += 1; state.flags['economic_growth'] -= 0.2; 
  },

  

  render: `
    We have reduced levels of social welfare spending. This means more poverty and suffering for the working class. Our detractors claim that we are sacrificing proletarian livelihoods for the sake of class peace with the bourgeoisie. Are they wrong? Are the workers wrong to turn to the <span style="color: #700000;">**Communists**</span>, in light of our choices?
  `,
  choices: [
    
  ]
};

export const _increase_spending_pre_depression: Scene = {
  id: "increase_spending_pre_depression",
  title: "increase_spending_pre_depression",
  subtitle: "-1 Budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['unemployed'] <= 15);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['workers_spd'] += 6*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 6*(1-state.flags['dissent']); state.flags['welfare'] += 1; state.flags['reformist_dissent'] -= 5; state.flags['labor_dissent'] -= 5; state.flags['center_dissent'] -= 5; state.flags['left_dissent'] -= 5; state.flags['neorevisionist_dissent'] -= 5;if (state.flags['welfare'] > 1) { state.flags['coalition_dissent'] += 1; }; state.flags['welfare_goal_completed'] += 1; state.flags['welfare_goal_spd'] += 1; state.flags['inflation'] += 0.3; state.flags['unemployed'] -= 0.4;if (state.flags['welfare'] > 1) { state.flags['dvp_right'] += 1; };if (state.flags['welfare'] > 1) { state.flags['lvp_right'] += 1; };if (state.flags['welfare'] > 2) { state.flags['ddp_right'] += 1; }; state.flags['economic_growth'] += 0.2; 
  },

  

  render: `
    We have increased welfare spending. Our proletarian base is pleased.
  `,
  choices: [
    
  ]
};

export const _increase_spending_post_depression: Scene = {
  id: "increase_spending_post_depression",
  title: "increase_spending_post_depression",
  subtitle: "The increased levels of unemployment necessitate more spending on aid to maintain the same benefits. -1 Budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['unemployed'] > 15);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['budget'] -= 1; state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']);if (state.flags['welfare'] > 0) { state.flags['coalition_dissent'] += 1; }; state.flags['welfare_goal_completed'] += 1; state.flags['welfare_goal_spd'] += 1; state.flags['inflation'] += 0.3; state.flags['dvp_right'] += 1;if (state.flags['welfare'] > 1) { state.flags['ddp_right'] += 1; }; state.flags['lvp_right'] += 1; 
  },

  

  render: `
    Increasing welfare spending is necessary in light of the rise in unemployment, so we are essentially treading water.
  `,
  choices: [
    
  ]
};

export const _spending_same_pre_depression: Scene = {
  id: "spending_same_pre_depression",
  title: "spending_same_pre_depression",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['unemployed'] <= 15);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We have kept welfare spending the same.
  `,
  choices: [
    
  ]
};

export const _spending_same_post_depression: Scene = {
  id: "spending_same_post_depression",
  title: "spending_same_post_depression",
  subtitle: "The increased levels of unemployment necessitate more spending on aid.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['unemployed'] > 15);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] -= 3; state.flags['unemployed_spd'] -= 4; state.flags['welfare'] -= 1; state.flags['reformist_dissent'] += 5; state.flags['left_dissent'] += 5; state.flags['labor_dissent'] += 5; state.flags['center_dissent'] += 5; state.flags['neorevisionist_dissent'] += 5; state.flags['kpd_coalition_dissent'] += 1;if (state.flags['in_popular_front'] || state.flags['in_left_front']) { state.flags['kpd_relation'] -= 8; }; state.flags['goal_spd_cancel'] += 1; 
  },

  

  render: `
    Increasing welfare spending is necessary in light of the rise in unemployment, so we have essentially cut welfare. The workers are justifiably displeased - we are sacrificing their livelihoods to appease bourgeois demands for austerity.
    [? if in_popular_front or in_left_front: The <span style="color: #700000;">**KPD**</span> is turning against us for our welfare policy. ?]
  `,
  choices: [
    
  ]
};

export const _war_guilt: Scene = {
  id: "war_guilt",
  title: "War Guilt Inquiry",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['war_guilt_timer'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['war_guilt_timer'] = 6; state.flags['month_actions'] += 1; 
  },

  

  render: `
    = Reichstag War Guilt Inquiry
    The War Guilt Inquiry has been an intermittent Reichstag committee for investigating the causes of the Great War and the German defeat. So far, it has faced massive resistance from the military establishment up to President Hindenburg.
  `,
  choices: [
    {
      id: "restart",
      text: "Restart the inquiry.",
      nextSceneId: "restart",
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
      text: "Do nothing.",
      nextSceneId: "root",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _restart: Scene = {
  id: "restart",
  title: "restart",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['war_guilt'] += 1; 
  },

  

  render: `
    What is the goal of this tribunal?
  `,
  choices: [
    {
      id: "pure_history",
      text: "To provide a historical record of the events of the war.",
      nextSceneId: "pure_history",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "rewrite",
      text: "To revise the popular German histories and finally put to rest the \"stabbed in the back\" myth.",
      nextSceneId: "rewrite",
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

export const _pure_history: Scene = {
  id: "pure_history",
  title: "pure_history",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['hindenburg_angry'] -= 5; 
  },

  

  render: `
    The history is being compiled, as it always has been.
  `,
  choices: [
    
  ]
};

export const _rewrite: Scene = {
  id: "rewrite",
  title: "rewrite",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pacifism'] += 1; state.flags['nationalism'] -= 5*(1-state.flags['dissent']); state.flags['pro_republic'] += 5*(1-state.flags['dissent']); state.flags['coup_progress'] += 1; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['lvp_left'] += 1; state.flags['hindenburg_angry'] += 10; 
  },

  

  render: `
    Destroying the "stabbed in the back" myth, in addition to finally correcting the historical record, would do a great deal to improve our party's reputation. This is why it would be resisted by the military establishment every step of the way.
  `,
  choices: [
    
  ]
};

export const _womens_rights: Scene = {
  id: "womens_rights",
  title: "Women's Rights",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['spd_in_government'] == 1 && state.flags['womens_rights_timer'] == 0 && state.flags['chancellor_party'] == "SPD" && ! state.flags['cvp_women_accepted']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['womens_rights_timer'] += 10; state.flags['month_actions'] += 1; 
  },

  

  render: `
    = Women's Rights
    According to the Constitution, women are equal to men, but this is not followed in practice. Women in the workforce are not paid equally for the same work, in addition to often being pushed out of employment after marriage. Men are still favored in marriage and family policy, and there are restrictions on women's rights in many other domains. And that is not to mention the overwhelming patriarchal culture present in Germany.
    For better or for worse, the <span style="color: #c00000;">Socialists</span> stand virtually alone in supporting increased rights for women, and even within the party, the leadership does not consider it a priority. [? if spd_r < 50 : Unfortunately, women still disproportionately support the bourgeois parties. ?]
  `,
  choices: [
    {
      id: "labor",
      text: "Institute policies that help women in the workforce.",
      nextSceneId: "labor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "family",
      text: "Reform marriage, divorce, and property law.",
      nextSceneId: "family",
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
      text: "Improve welfare for single mothers and children.",
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
      id: "liberalize",
      text: "Attempt to liberalize abortion laws.",
      nextSceneId: "liberalize",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "return",
      text: "Do not enact any policies for now.",
      nextSceneId: "return",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "easy_discard",
      text: "easy_discard",
      nextSceneId: "easy_discard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel_advisor_action",
      text: "cancel_advisor_action",
      nextSceneId: "cancel_advisor_action",
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

export const _labor_2: Scene = {
  id: "labor",
  title: "labor",
  subtitle: "Paid maternal leave policies, equal pay policies, and so on.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['womens_work'] += 1; state.flags['womens_rights'] += 1;if (state.flags['unemployed'] > 15) { state.flags['workers_spd'] -= 4; }; state.flags['new_middle_spd'] += 4*(1-state.flags['dissent']); state.flags['workers_spd'] += 4*(1 - state.flags['dissent']); state.flags['women_goal_spd'] += 1; state.flags['economic_growth'] += 0.1; 
  },

  

  render: `
    These policies mean that our party is increasing in popularity among the "new women" who work outside the home. [? if unemployed > 15 : However, many male workers develop a backlash towards women in the workplace, especially given the rising unemployment. ?]
  `,
  choices: [
    
  ]
};

export const _family: Scene = {
  id: "family",
  title: "family",
  subtitle: "Change family and inheritance law to treat women more equally.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['family_law'] += 1; state.flags['womens_rights'] += 1; state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['old_middle_spd'] -= 2; state.flags['rural_spd'] -= 2; state.flags['catholics_spd'] -= 4; state.flags['coalition_dissent'] += 1; state.flags['z_relation'] -= 4; state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] += 0.5; state.flags['lvp_left'] += 0.5; state.flags['women_goal_spd'] += 1; 
  },

  

  render: `
    These policies aim to ensure that women have equal rights within a marriage, including the right to divorce. The more conservative segments of society treat our reforms as deleterious to the social fabric.
  `,
  choices: [
    
  ]
};

export const _welfare: Scene = {
  id: "welfare",
  title: "welfare",
  subtitle: "-1 budget",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['welfare'] += 1; state.flags['workers_spd'] += 5*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 5*(1-state.flags['dissent']); state.flags['budget'] -= 1; state.flags['womens_rights'] += 1;if (state.flags['welfare'] >= 1 && state.flags['unemployed'] >= 15) { state.flags['coalition_dissent'] += 1; }; state.flags['unemployed'] -= 0.4; state.flags['inflation'] += 0.2;if (state.flags['welfare'] >= 1) { state.flags['dvp_right'] += 1; };if (state.flags['welfare'] >= 1) { state.flags['lvp_right'] += 1; }; state.flags['women_goal_spd'] += 1; state.flags['economic_growth'] += 0.3; 
  },

  

  render: `
    We have increased welfare spending on women and children. [? if welfare >= 1 and unemployed >= 15 : Some of our coalition partners consider increased welfare spending profligate at this time. ?]
  `,
  choices: [
    
  ]
};

export const _liberalize: Scene = {
  id: "liberalize",
  title: "liberalize",
  subtitle: "[? if progressive_coalition < 50 : This is unlikely to succeed; we do not have majority support. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _liberalize_fail: Scene = {
  id: "liberalize_fail",
  title: "liberalize_fail",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] -= 5; state.flags['coalition_dissent'] += 1; state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['catholics_spd'] -= 5; 
  },

  

  render: `
    Unfortunately, our proposal is voted down in the Reichstag, with the Catholic [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] party (our long-time partners) speaking in particularly vehement opposition, and some of our own members breaking party discipline. The activists, feeling demoralized from this attempt, have decided to bide their time.
  `,
  choices: [
    
  ]
};

export const _liberalize_success: Scene = {
  id: "liberalize_success",
  title: "liberalize_success",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['abortion_rights'] += 1; state.flags['womens_rights'] += 1; state.flags['coalition_dissent'] += 2;if (state.flags['in_social_catholic_coalition']) { state.flags['coalition_dissent'] += 3; }; state.flags['z_relation'] -= 8; state.flags['catholics_spd'] -= 10; state.flags['dvp_relation'] -= 5; state.flags['ddp_relation'] += 4; state.flags['lvp_relation'] -= 2; state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['workers_z'] += 3; state.flags['new_middle_z'] += 3; state.flags['old_middle_z'] += 3; state.flags['old_middle_dnvp'] += 3; state.flags['rural_dnvp'] += 3; state.flags['workers_nsdap'] -= 3; state.flags['new_middle_nsdap'] -= 3; state.flags['old_middle_nsdap'] -= 2; state.flags['rural_nsdap'] -= 2; state.flags['unemployed_nsdap'] -= 2; state.flags['unemployed_z'] += 3; state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); state.flags['new_middle_ddp'] += 4; state.flags['workers_ddp'] += 1; state.flags['rural_ddp'] -= 2; state.flags['ddp_left'] += 3; state.flags['lvp_left'] += 1; state.flags['rural_lvp'] -= 3; state.flags['old_middle_lvp'] -= 3; state.flags['new_middle_lvp'] += 3; state.flags['workers_lvp'] += 2; state.flags['women_goal_spd'] += 1; 
  },

  

  render: `
    With the support of a "progressive coalition" including the <span style="color: #700000;">**KPD**</span> and [? if not lvp_formed: <span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed: leftist <span style="color: #FFCC00;">**LVP**</span> members?], we have successfully passed a bill to legalize abortion in Germany! This has heartened our more progressive supporters, while hurting our relations with the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?]. With the increasing political discourse around abortion, the religiously-oriented [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] and <span style="color: #3E88B3;">**DNVP**</span> have gained conservative votes at the expense of the <span style="color: #7A3C00;">**NSDAP**</span>.
  `,
  choices: [
    
  ]
};
