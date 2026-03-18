// @ts-nocheck
import { Scene, GameState } from "../../engine/types";


export const _campaigning: Scene = {
  id: "campaigning",
  title: "Campaigning",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['rubicon'] || state.flags['campaigning_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1;if (state.flags['rubicon']) { state.flags['campaigning_timer'] += 2; } 
  },

  

  render: `
    = Campaigning
    Whether or not we are in an electoral campaign, the party is always trying to broaden its voter base. Who should we focus our campaign efforts on?
  `,
  choices: [
    {
      id: "workers",
      text: "The urban working class, our traditional support base.",
      nextSceneId: "workers",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "new_middle",
      text: "The \"new middle class\" of government employees and white-collar workers.",
      nextSceneId: "new_middle",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "old_middle",
      text: "The \"old middle class\" of small independent businessmen and artisans.",
      nextSceneId: "old_middle",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "rural",
      text: "Rural workers and small farmers, who have felt neglected by us in the past.",
      nextSceneId: "rural",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "unemployed",
      text: "The unemployed.",
      nextSceneId: "unemployed",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "catholics",
      text: "Catholics, who typically support the [? if z_party_name != \"CVP\": <span style=\"color: #000000;\">Center Party</span>?][? if z_party_name == \"CVP\": <span style=\"color: #000000;\">**CVP**</span>?].",
      nextSceneId: "catholics",
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
      text: "We either don't want to or cannot campaign right now.",
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

export const _workers: Scene = {
  id: "workers",
  title: "workers",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 6*(1-state.flags['dissent']);if (state.flags['unemployed'] >= 20) { state.flags['workers_spd'] -= 1; };if (state.flags['unemployed'] >= 30) { state.flags['workers_spd'] -= 1; };if (state.flags['wtb_adopted'] == 1) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); }; state.flags['resources'] -= 1;if (state.flags['nationalization_progress'] >= 1) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); }; 
  },

  

  render: `
    We have increased our campaigning among the workers. [? if unemployed >= 15: The high levels of unemployment make our campaign more difficult. ?][? if wtb_adopted = 1 : Adopting the WTB plan gives us a new rallying point around which to attract workers. ?]
  `,
  choices: [
    
  ]
};

export const _new_middle: Scene = {
  id: "new_middle",
  title: "new_middle",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['new_middle_spd'] += 6*(1-state.flags['dissent']);if (state.flags['socialism'] <= 49 && state.flags['peoples_party'] == 0) { state.flags['new_middle_spd'] -= 4; }; state.flags['resources'] -= 1; state.flags['peoples_party_support'] += 1; 
  },

  

  render: `
    We have increased our campaigning among the new middle class. [? if socialism <= 49 and peoples_party == 0: The popular antipathy towards <span style="color: #c00000;">socialism</span> among this group makes our campaign more difficult. ?] [? if peoples_party > 0: As a people's party, we have an easier time increasing support among the middle class than before. ?]
  `,
  choices: [
    
  ]
};

export const _old_middle: Scene = {
  id: "old_middle",
  title: "old_middle",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['old_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['resources'] -= 1;if (state.flags['nationalism'] >= 51 && state.flags['peoples_party'] == 0) { state.flags['old_middle_spd'] -= 3; }; state.flags['peoples_party_support'] += 1; 
  },

  

  render: `
    We have increased our campaigning among the old middle class. [? if nationalism >= 51 and peoples_party == 0: The high levels of nationalism among this group make our campaign more difficult. ?] [? if peoples_party > 0: As a people's party, we have an easier time increasing support among the middle class than before. ?]
  `,
  choices: [
    
  ]
};

export const _rural: Scene = {
  id: "rural",
  title: "rural",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rural_spd'] += 5*(1-state.flags['dissent']);if (state.flags['peoples_party'] == 0) { state.flags['rural_spd'] -= 3*(1-state.flags['dissent']); }; state.flags['resources'] -= 1; state.flags['peoples_party_support'] += 1;if (state.flags['rural_policy'] >= 2) { state.flags['rural_spd'] += 3*(1-state.flags['dissent']); } 
  },

  

  render: `
    We have increased our campaigning among farmers. [? if peoples_party == 0: We have not historically campaigned much among the farmers, and they do not trust us. ?][? if peoples_party > 0: As a people's party, we have an easier time increasing support among farmers than before. ?][? if rural_policy >= 2 : Our rural policies have made it easier for us to build support among farmers. ?]
  `,
  choices: [
    
  ]
};

export const _unemployed: Scene = {
  id: "unemployed",
  title: "unemployed",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['unemployed_spd'] += 6*(1-state.flags['dissent']); state.flags['resources'] -= 1;if (state.flags['welfare'] < 0) { state.flags['unemployed_spd'] -= 3; };if (state.flags['unemployed'] >= 30) { state.flags['unemployed_spd'] -= 2; };if (state.flags['wtb_adopted'] == 1) { state.flags['unemployed_spd'] += 6*(1-state.flags['dissent']); };if (state.flags['welfare'] >= 2) { state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); }; 
  },

  

  render: `
    We have increased our campaigning among the unemployed. [? if welfare < 0: The welfare cuts and resultant poverty make our campaign more difficult, since we are associated with the government that enacted these cuts, and our campaign may even backfire. ?][? if wtb_adopted = 1 : Adopting the WTB plan gives us a new rallying point around which to attract support from the unemployed. ?]
  `,
  choices: [
    
  ]
};

export const _catholics: Scene = {
  id: "catholics",
  title: "catholics",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['peoples_party'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['catholics_spd'] += 6*(1-state.flags['dissent']); state.flags['resources'] -= 1; 
  },

  

  render: `
    We have increased our campaigning among Catholics.
  `,
  choices: [
    
  ]
};

export const _confronting_nazis: Scene = {
  id: "confronting_nazis",
  title: "Confronting the Nazis",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['nsdap_r'] >= 10 && state.flags['nazi_urgency'] > 1) && state.flags['confronting_nazis_timer'] == 0 && state.flags['iron_front_formed'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['confronting_nazis_seen'] += 1; state.flags['confronting_nazis_timer'] = 5; state.flags['month_actions'] += 1;if (state.flags['harzburg_front_time'] == state.flags['time']) { state.flags['month_actions'] -= 1; }; 
  },

  

  render: `
    # Forming the Iron Front
    The <span style="color: #7A3C00;">Nazis</span>' strength is gaining, as shown by their recent election results and their violent presence in the streets. Their <span style="color: #7A3C00;">fascism</span> threatens to plunge Germany once again into the abyss.
    Many in our party are calling for urgent action. The "neorevisionist" faction, led by young <span style="color: #c00000;">socialists</span> like Carlo Mierendorff and Julius Leber, have formed specifically around this cause. But many in all factions of the party are calling for action.
  `,
  choices: [
    {
      id: "not_a_big_deal",
      text: "The <span style=\"color: #7A3C00;\">Nazis</span>' moment will pass. Let's not get too hasty.",
      nextSceneId: "not_a_big_deal",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "economic_crisis",
      text: "economic_crisis",
      nextSceneId: "economic_crisis",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "major_crisis",
      text: "We must do something to confront the <span style=\"color: #7A3C00;\">Nazis</span>.",
      nextSceneId: "major_crisis",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "iron_front",
      text: "iron_front",
      nextSceneId: "iron_front",
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

export const _not_a_big_deal: Scene = {
  id: "not_a_big_deal",
  title: "not_a_big_deal",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['mierendorff_advisor'] == 0 && state.flags['leber_advisor'] == 0 && state.flags['schumacher_advisor'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['nazi_urgency'] -= 1; state.flags['left_dissent'] += 5; state.flags['neorevisionist_dissent'] += 15; 
  },

  

  render: `
    The <span style="color: #7A3C00;">Nazis</span> are just another <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> movement that will die of its own contradictions sooner or later; we do not need to build a specific policy to combat them.
  `,
  choices: [
    
  ]
};

export const _economic_crisis: Scene = {
  id: "economic_crisis",
  title: "We must address the economic crisis first.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['economic_plan'] == 0 && state.flags['black_thursday_seen'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _major_crisis: Scene = {
  id: "major_crisis",
  title: "major_crisis",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] < 5);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['nazi_urgency'] += 1; state.flags['neorevisionist_dissent'] -= 5; state.flags['neorevisionist_strength'] += 5; 
  },

  

  render: `
    The <span style="color: #7A3C00;">Nazis</span> are one of the foremost threats to the German republic. However, we are still formulating a strategy to confront them, and still trying to build up consensus within our party for action. Check back on this later.
  `,
  choices: [
    
  ]
};

export const _iron_front: Scene = {
  id: "iron_front",
  title: "Form the <span style=\"color: #c00000;\">Iron</span> <span style=\"color: #1A1A1A;\">Front</span>!",
  subtitle: "The <span style=\"color: #c00000;\">Iron</span> <span style=\"color: #1A1A1A;\">Front</span> consists of the <span style=\"color: #c00000;\">**SPD**</span>, the trade unions, and the Reichsbanner.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] >= 3 && state.flags['iron_front_formed'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['iron_front_formed'] = 1; state.flags['radicalization'] += 1; state.flags['nazi_urgency'] += 1; state.flags['workers_spd'] += 5*(1-state.flags['dissent']); state.flags['pro_republic'] += 5*(1-state.flags['dissent']); state.flags['left_dissent'] -= 8; state.flags['neorevisionist_dissent'] -= 10; state.flags['neorevisionist_strength'] += 5; 
  },

  onDisplay: (state: GameState): void => { 
             const Q = state.flags; 
             var cardEl = document.createElement('div');  
    cardEl.className = "face-figure2";  
    var image = new Image();  
    image.className = "face-img";  
    image.src = "img/tnoreference.png";  
    cardEl.appendChild(image);  
    var contentDiv = document.querySelector("#page #mid_panel #content");
    contentDiv.appendChild(cardEl); 
  },

  render: `
    The <span style="color: #7A3C00;">Nazi</span> threat can no longer be ignored. We must build a new organization to confront them - the <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span> - consisting of the <span style="color: #c00000;">**SPD**</span>, the ADGB trade union federation, and the *Reichsbanner* <span style="color: #000000;"><b><i>Schwarz</i></b></span>-<span style="color: #DD0000;"><b><i>Rot</i></b></span>-<span style="color: #FFCC00;"><b><i>Gold</i></b></span>. We have a new symbol - the Three Arrows, pointing down towards the left.
    What do the three arrows stand for?
  `,
  choices: [
    {
      id: "unity",
      text: "Unity, Activity, and Discipline.",
      nextSceneId: "unity",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "anti",
      text: "Opposition to <span style=\"color: #7A3C00;\">Fascism</span>, <span style=\"color:rgb(90, 0, 0);\">Stalinism</span>, and <span style=\"color: #808080;\">Monarchism</span>.",
      nextSceneId: "anti",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "orgs",
      text: "The <span style=\"color: #c00000;\">**SPD**</span>, ADGB, and Reichsbanner.",
      nextSceneId: "orgs",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "wtb",
      text: "Woytinsky, Tarnow, and Baade of the WTB-Plan",
      nextSceneId: "wtb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "all",
      text: "All of the above.",
      nextSceneId: "all",
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

export const _unity: Scene = {
  id: "unity",
  title: "unity",
  
  
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

export const _anti: Scene = {
  id: "anti",
  title: "anti",
  
  
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

export const _orgs: Scene = {
  id: "orgs",
  title: "orgs",
  
  
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

export const _wtb: Scene = {
  id: "wtb",
  title: "wtb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wtb_adopted'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _all: Scene = {
  id: "all",
  title: "all",
  
  
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

export const _if_end: Scene = {
  id: "if_end",
  title: "if_end",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span> has given a new energy to our party.
  `,
  choices: [
    
  ]
};

export const _crisis_program: Scene = {
  id: "crisis_program",
  title: "The Economic Crisis",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['crisis_urgency'] >= 2 || state.flags['year'] >= 1931 || (state.flags['month'] >= 6 && state.flags['year'] == 1930)) && state.flags['crisis_program_timer'] == 0 && state.flags['economic_plan'] == 0 && state.flags['black_thursday_seen'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['crisis_program_timer'] = 5; 
  },

  

  render: `
    = Addressing the Economic Crisis
    Our party is wracked as to how to deal with the economic crisis. From the centrist faction, Hilferding argues that the economic crisis must be allowed to play out, because it is simply a part of the cyclic nature of capitalism.
    [? if not wtb_concept: The Labor faction is arguing for increased welfare spending to alleviate the suffering of the workers. Their economist, Wladimir Woytinsky, has voiced support for a public works campaign involving deficit spending, but it will take time to iron out the details. Furthermore, he will need the united support of the ADGB; otherwise, he won't have the power to challenge Hilferding's stance. ?][? if wtb_concept: From labor, the economist Wladimir Woytinsky argues that we must pursue a massive public works program to reduce unemployment and stimulate demand, perhaps including deficit spending. His opponents, like Hilferding, argue that this plan will cause a return to hyper-inflation, and that it would not even help the economy. In addition, according to Hilferding, Woytinsky's strategy is opposed to Marxist principles. ?]
    [? if wtb_concept: The so-called WTB plan, after its chief supporters Woytinsky, Tarnow, and Baade, is receiving more attention within the party. ?]
    However, leftists in the party argue that the WTB plan is merely a bandage over the fundamental flaws of capitalism. They argue that the crisis is an opportunity to end capitalism through massive nationalizations of industry, and finally bring our country to <span style="color: #c00000;">socialism</span>.
    Meanwhile, moderates and reformists draw up proposals for a limited plan of job creation through public works, funded through taxes, that does not involve deficit spending or large-scale restructuring of the economy. Labor argues that the plan is inadequate in its scale and ambition.
  `,
  choices: [
    {
      id: "support_centrist",
      text: "Support the Centrist view.",
      nextSceneId: "support_centrist",
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
      text: "Support the Labor view.",
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
      id: "support_labor_pre",
      text: "Support the Labor view.",
      nextSceneId: "support_labor_pre",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_left",
      text: "Support the Left view.",
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
      id: "support_moderate",
      text: "Support the Reformist view.",
      nextSceneId: "support_moderate",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "defer",
      text: "Defer making a decision until we have more information.",
      nextSceneId: "defer",
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

export const _support_centrist: Scene = {
  id: "support_centrist",
  title: "support_centrist",
  subtitle: "Let the depression play itself out.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['center_strength'] += 5; state.flags['center_dissent'] -= 5; state.flags['labor_dissent'] += 10; state.flags['wtb_support'] -= 1; state.flags['left_dissent'] += 10; 
  },

  

  render: `
    Woytinsky and the trade unions vehemently criticize the centrists for their policy. The workers are starving; are we going to callously abandon them and side with bourgeois austerity? On the other hand, the centrists criticize Woytinsky for promising the workers false hope; their position is that nothing can be done to alleviate the depression. They also speak of the fear of another round of hyperinflation that may result from deficit spending.
    Our policy course is currently that nothing can be done to alleviate the depression.
  `,
  choices: [
    
  ]
};

export const _support_labor: Scene = {
  id: "support_labor",
  title: "support_labor",
  subtitle: "Call for increased public works and fiscal stimulus.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wtb_concept']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['center_dissent'] += 10; state.flags['left_dissent'] += 5; state.flags['labor_strength'] += 5; state.flags['wtb_support'] += 1; state.flags['wtb_points'] += 10; 
  },

  

  render: `
    Our support of the WTB plan alienates the orthodox Marxists of the Centrist faction, and faces both opposition and support from a variety of sources across the spectrum. Leftists argue that the plan is flawed because it leaves capitalism intact, while some reformists are cautiously optimistic.
    We have not yet convinced the party to formally adopt the plan. More work needs to be done.
  `,
  choices: [
    
  ]
};

export const _support_labor_pre: Scene = {
  id: "support_labor_pre",
  title: "support_labor_pre",
  subtitle: "Call for welfare spending and emergency relief for the workers.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['wtb_concept']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['center_dissent'] += 5; state.flags['left_dissent'] += 5; state.flags['labor_strength'] += 5; state.flags['labor_dissent'] -= 5; state.flags['wtb_support'] += 1; 
  },

  

  render: `
    The Labor faction hasn't come up with a concrete solution to our economic woes yet, but has called for increased welfare spending in light of the rise in unemployment. Perhaps supporting their efforts will encourage a real solution to the crisis to be introduced.
  `,
  choices: [
    
  ]
};

export const _support_left: Scene = {
  id: "support_left",
  title: "support_left",
  subtitle: "Call for mass nationalizations and the transformation of the economy.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['left_strength'] += 10; state.flags['reformist_dissent'] += 5; state.flags['labor_dissent'] += 5; state.flags['nationalization_support'] += 2; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _support_left_progress: Scene = {
  id: "support_left_progress",
  title: "support_left_progress",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We attempt to convince the party to support a program of mass nationalizations in response to the economic crisis. Leftists argue that this policy is in accordance with our long-standing <span style="color: #c00000;">socialist</span> platform, while reformists and some trade unionists argue that the plan is unrealistic, and that we need to focus on more immediate improvements to workers' lives.
    We have not yet formally adopted the plan. More work needs to be done.
  `,
  choices: [
    
  ]
};

export const _adopt_left: Scene = {
  id: "adopt_left",
  title: "adopt_left",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['left_strength'] += 15; state.flags['left_dissent'] -= 10; state.flags['reformist_dissent'] += 10; state.flags['neorevisionist_dissent'] += 8; state.flags['labor_dissent'] += 6; state.flags['nationalization_adopted'] = 1; state.flags['coup_progress'] += 1; state.flags['economic_plan'] = 3; state.flags['kpd_relation'] += 5*(1-state.flags['dissent']); 
  },

  

  render: `
    With our hard work, we have convinced the majority of the party to adopt the <span style="color: #c00000;">socialist</span> economic plan! [? if spd_in_government == 1 : We can begin implementing the plan as soon as possible, as long as we have the Economic or Finance ministries. ?] Bourgeois opposition is likely to be fierce. [? if spd_in_government == 0 : It might be difficult to enact the plan, given present conditions. ?]
  `,
  choices: [
    
  ]
};

export const _support_moderate: Scene = {
  id: "support_moderate",
  title: "support_moderate",
  subtitle: "Call for a limited program of job creation without deficit spending.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['moderate_plan_support'] += 1; state.flags['reformist_strength'] += 8; state.flags['reformist_dissent'] -= 5; state.flags['left_dissent'] += 6; state.flags['labor_dissent'] += 5; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _support_moderate_progress: Scene = {
  id: "support_moderate_progress",
  title: "support_moderate_progress",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We attempt to convince the party to support a moderate program of job creation without deficit spending. Advocates of the moderate plan argue that this plan is most likely to receive support from the bourgeois parties, and most practical in the immediate term. Opponents in the left and labor factions criticize the plan for being inadequate in its ambition.
    We have not yet adopted the plan. More work needs to be done.
  `,
  choices: [
    
  ]
};

export const _adopt_moderate: Scene = {
  id: "adopt_moderate",
  title: "adopt_moderate",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reformist_strength'] += 10; state.flags['reformist_dissent'] -= 10; state.flags['left_dissent'] += 8; state.flags['labor_dissent'] += 6; state.flags['moderate_plan_adopted'] = 1; state.flags['economic_plan'] = 2;if (state.flags['unemployed'] > 15) { state.flags['coalition_dissent'] -= 1; }; state.flags['z_relation'] += 5; 
  },

  

  render: `
    With our hard work, we have convinced the majority of the party to adopt the moderate job creation plan! [? if spd_in_government == 1 : We can begin implementing the plan as soon as possible, as long as we have the Economic or Finance ministries. ?]
  `,
  choices: [
    
  ]
};

export const _defer: Scene = {
  id: "defer",
  title: "defer",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We hold off on making a decision on economic policy, awaiting more information. Woytinsky and his supporters argue that inaction is a form of action of its own. 
  `,
  choices: [
    
  ]
};

export const _enemies: Scene = {
  id: "enemies",
  title: "Choosing Our Enemies",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['year'] <= 1930 && state.flags['enemies_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['enemies_timer'] = 18; 
  },

  

  render: `
    = Choosing our enemies
    In our media and campaign materials, who should we consider as our main opponents?
    [? if enemies != 0 : Previously, we had considered the [+ enemies +] as our prior enemies. Is a change of direction necessary? ?]
  `,
  choices: [
    {
      id: "anti_dem",
      text: "The anti-democratic parties of the <span style=\"color: #7A3C00;\">far</span>-[? if dnvp_ideology == \"Radical\": <span style=\"color: #3E88B3;\">right</span>?][? if dnvp_ideology == \"Moderate\": <span style=\"color: #003755;\">right</span>?] and <span style=\"color: #700000;\">left</span> - the <span style=\"color: #700000;\">**KPD**</span>, <span style=\"color: #7A3C00;\">**NSDAP**</span>, and [? if dnvp_ideology == \"Radical\": <span style=\"color: #3E88B3;\">**DNVP**</span>?][? if dnvp_ideology == \"Moderate\": <span style=\"color: #003755;\">**DNF**</span>?].",
      nextSceneId: "anti_dem",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "far_right",
      text: "The <span style=\"color: #7A3C00;\">far</span>-[? if dnvp_ideology == \"Radical\": <span style=\"color: #3E88B3;\">right</span>?][? if dnvp_ideology == \"Moderate\": <span style=\"color: #003755;\">right</span>?] - the <span style=\"color: #7A3C00;\">**NSDAP**</span> and [? if dnvp_ideology == \"Radical\": <span style=\"color: #3E88B3;\">**DNVP**</span>?][? if dnvp_ideology == \"Moderate\": <span style=\"color: #003755;\">**DNF**</span>?].",
      nextSceneId: "far_right",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nsdap",
      text: "The <span style=\"color: #7A3C00;\">**NSDAP**</span> alone.",
      nextSceneId: "nsdap",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "kpd",
      text: "The <span style=\"color: #700000;\">**KPD**</span>.",
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
      id: "bourgeois",
      text: "The bourgeois parties - the [? if z_party_name != \"CVP\": <span style=\"color: #000000;\">Center</span>?][? if z_party_name == \"CVP\": <span style=\"color: #000000;\">**CVP**</span>?] and [? if not lvp_formed and dvp_exist: <span style=\"color: #C0A054;\">**DVP**</span>?][? if not lvp_formed and not dvp_exist: <span style=\"color: #D3C24D;\">**[+ ddp_name +]**</span>?][? if lvp_formed: <span style=\"color: #FFCC00;\">**LVP**</span>?].",
      nextSceneId: "bourgeois",
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

export const _anti_dem: Scene = {
  id: "anti_dem",
  title: "anti_dem",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['enemies'] = "anti-democratic parties"; state.flags['center_strength'] += 5; state.flags['reformist_strength'] += 5; state.flags['left_dissent'] += 5; state.flags['workers_kpd'] -= 1.5; state.flags['workers_nsdap'] -= 2;if (state.flags['dnvp_ideology'] == "Radical") { state.flags['workers_dnvp'] -= 1; }; state.flags['workers_dnf'] -= 1; state.flags['unemployed_kpd'] -= 2; state.flags['unemployed_nsdap'] -= 2; state.flags['kpd_relation'] -= 10; 
  },

  

  render: `
    Attacking the <span style="color: #7A3C00;">far</span>-[? if dnvp_ideology == "Radical": <span style="color: #3E88B3;">right</span>?][? if dnvp_ideology == "Moderate": <span style="color: #003755;">right</span>?] and <span style="color: #700000;">left</span> is popular among all but the left wing of our party, who would prefer to be fighting the bourgeois parties. This might also hamper our ability to reconcile with the <span style="color: #700000;">**KPD**</span> in the future.
  `,
  choices: [
    
  ]
};

export const _far_right: Scene = {
  id: "far_right",
  title: "far_right",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['enemies'] = "far right"; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 5; state.flags['workers_nsdap'] -= 3; state.flags['unemployed_nsdap'] -= 3;if (state.flags['dnvp_ideology'] == "Radical") { state.flags['workers_dnvp'] -= 2; }; state.flags['workers_dnf'] -= 2; 
  },

  

  render: `
    Attacking the <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> is popular among the entire party, although the left considers the bourgeois parties to be just as dangerous, while the right is critical of our lack of response to the <span style="color: #700000;">**KPD**</span>. Our bourgeois coalition partners are also skeptical of our lack of commitment to anti-communism.
  `,
  choices: [
    
  ]
};

export const _nsdap: Scene = {
  id: "nsdap",
  title: "nsdap",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['enemies'] = "NSDAP"; state.flags['neorevisionist_strength'] += 5; state.flags['nazi_urgency'] += 1; state.flags['workers_nsdap'] -= 4; state.flags['unemployed_nsdap'] -= 4;if (state.flags['nsdap_votes'] < 8) { state.flags['workers_nsdap'] += 8; };if (state.flags['nsdap_votes'] < 8) { state.flags['unemployed_nsdap'] += 8; } 
  },

  

  render: `
    [? if nazi_urgency == 0 or nsdap_votes < 10: The <span style="color: #7A3C00;">**NSDAP**</span> is a tiny party right now, with more bark than bite. Many in our party are questioning our choices. [? if nsdap_votes < 8: Worst still, giving them too much attention might only end up helping them. ?] ?][? if nazi_urgency > 0 and nsdap_votes >= 10 : The <span style="color: #7A3C00;">Nazis</span> are the most urgent problem for us to deal with. ?]
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
             state.flags['enemies'] = "KPD"; state.flags['reformist_strength'] += 5; state.flags['left_dissent'] += 8; state.flags['reformist_dissent'] -= 5; state.flags['kpd_relation'] -= 15; state.flags['dvp_relation'] += 5; state.flags['ddp_relation'] += 3; state.flags['z_relation'] += 5; state.flags['lvp_relation'] += 5; state.flags['workers_kpd'] -= 3; state.flags['unemployed_kpd'] -= 4; state.flags['dvp_left'] += 1; state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] += 0.5; state.flags['lvp_left'] += 1; 
  },

  

  render: `
    Attacking the <span style="color: #700000;">**KPD**</span> is supported by all but the most left-wing <span style="color: #c00000;">socialists</span>, and wins us some measure of approval among the bourgeois parties. However, If we are to reconcile with the <span style="color: #700000;">**KPD**</span>, this may not be the best choice.
  `,
  choices: [
    
  ]
};

export const _bourgeois: Scene = {
  id: "bourgeois",
  title: "bourgeois",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['enemies'] = "bourgeois parties"; state.flags['left_strength'] += 8; state.flags['left_dissent'] -= 5; state.flags['dvp_relation'] -= 5; state.flags['z_relation'] -= 5; state.flags['ddp_relation'] -= 3; state.flags['lvp_relation'] -= 3; state.flags['kpd_relation'] += 5; state.flags['reformist_dissent'] += 8; state.flags['workers_z'] -= 3; state.flags['new_middle_dvp'] -= 2; state.flags['workers_dvp'] -= 1; state.flags['workers_ddp'] -= 0.5;if (! state.flags['dvp_exist']) { state.flags['workers_ddp'] -= 0.5; }; state.flags['coalition_dissent'] += 1; state.flags['dvp_right'] += 1; state.flags['ddp_cohesion'] -= 1; state.flags['ddp_right'] += 1; state.flags['lvp_right'] += 1; 
  },

  

  render: `
    Our anti-bourgeois rhetoric is popular among the left, but may make it harder to build the coalitions that are necessary for government in the future.
  `,
  choices: [
    
  ]
};

export const _fundraising: Scene = {
  id: "fundraising",
  title: "Fundraising",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['fundraising_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['fundraising_timer'] = 12; 
  },

  

  render: `
    = Fundraising
    For better or for worse, the party cannot exist without money. Without the support of wealthy industrialists, we depend on membership dues to sustain our efforts.
    We receive dues at the end of each year, but can adjust them throughout. Low party dissent can secure more funds, and vice versa.
  `,
  choices: [
    {
      id: "maintain",
      text: "Maintain our current dues.",
      nextSceneId: "maintain",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "reduce",
      text: "Reduce dues.",
      nextSceneId: "reduce",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "increase",
      text: "Increase dues.",
      nextSceneId: "increase",
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

export const _maintain: Scene = {
  id: "maintain",
  title: "maintain",
  subtitle: "We gain [+ dues +] resources per year.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We maintain our current dues.
  `,
  choices: [
    
  ]
};

export const _reduce: Scene = {
  id: "reduce",
  title: "reduce",
  subtitle: "We will gain [+ dues - 1 +] resources per year. -1 resource",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dues'] -= 1; state.flags['resources'] -= 1; state.flags['left_dissent'] -= 8; state.flags['center_dissent'] -= 8; state.flags['reformist_dissent'] -= 8; state.flags['labor_dissent'] -= 8;if (state.flags['dissent_percent'] < 5) { state.flags['resources'] += 1; };if (state.flags['dissent_percent'] > 30) { state.flags['resources'] -= 1; }; state.flags['month_actions'] += 1; 
  },

  

  render: `
    Our current members appreciate this, but no one decides to join a party because of the low dues.
  `,
  choices: [
    
  ]
};

export const _increase: Scene = {
  id: "increase",
  title: "increase",
  subtitle: "We will gain [+ dues + 1 +] resources per year. +1 resource [? if unemployed >= 15 : Given the present economic situation, this may be painful. ?][? if dues >= 4 : Dues are already rather high; increasing them might reduce our membership. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['dues'] <= 4);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dues'] += 1; state.flags['resources'] += 1; state.flags['workers_spd'] -= 3; state.flags['unemployed_spd'] -= 3;if (state.flags['unemployed'] >= 15) { state.flags['workers_spd'] -= 10; };if (state.flags['unemployed'] >= 15) { state.flags['unemployed_spd'] -= 10; };if (state.flags['dues'] >= 5) { state.flags['workers_spd'] -= 3*state.flags['dues']; };if (state.flags['dues'] >= 5) { state.flags['unemployed_spd'] -= 3*state.flags['dues']; }; state.flags['month_actions'] += 1; 
  },

  

  render: `
    Our members grumble at this, and some of the less committed members leave. But now, we have access to additional resources.
    [? if unemployed >= 15 : Because of the presently high unemployment, our members are feeling the extra burden hard. ?] The higher dues will make it more difficult for the <span style="color: #c00000;">**SPD**</span> to expand electorally.
  `,
  choices: [
    
  ]
};

export const _ideology: Scene = {
  id: "ideology",
  title: "Questions of Ideology",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['ideology_timer'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['old_ideology'] = state.flags['ideology']; state.flags['ideology_timer'] = 18; 
  },

  

  render: `
    #subtitle: Setting the party's ideological direction.
    = Questions of Ideology
    The <span style="color: #c00000;">**SPD**</span> is torn between many different ideological currents. What should be our primary ideological guidance for now?
    [? if ideology != 0 : We have previously chosen a [+ ideology +] ideology. Changing it will likely have drawbacks. ?]
  `,
  choices: [
    {
      id: "class_struggle",
      text: "Class struggle and preparing the proletariat for the revolution are our primary goals.",
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
      id: "centrist",
      text: "The Center <span style=\"color: #9B0000;\">Marxism</span> of Karl Kautsky remains the best way to resolve our internal contradictions.",
      nextSceneId: "centrist",
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
      text: "We should work with the trade unions to improve the lives of workers.",
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
      id: "reform",
      text: "Following Eduard Bernstein, we should work for ethical <span style=\"color: #c00000;\">socialism</span>, strengthen democracy, and expand the party's electorate.",
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
      id: "socpat",
      text: "Pursue the fusion of <span style='color: #c00000;'>socialism</span> and patriotism.",
      nextSceneId: "socpat",
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

export const _class_struggle: Scene = {
  id: "class_struggle",
  title: "class_struggle",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (Q.ideology && Q.ideology != "left") {
    Q.changed = 1;
} 
  },

  

  render: `
    The radical left of the party supports a course of class struggle, and potentially a reconciliation with the <span style="color: #700000;">**Communists**</span>.
  `,
  choices: [
    
  ]
};

export const _centrist: Scene = {
  id: "centrist",
  title: "centrist",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (Q.ideology && Q.ideology != "centrist") {
    Q.changed = 1;
} 
  },

  

  render: `
    The Center Marxists, represented by Kautsky and Hilferding, support a middle course of preparing for revolution while building up the consciousness of the working class.
  `,
  choices: [
    
  ]
};

export const _labor: Scene = {
  id: "labor",
  title: "labor",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (Q.ideology && Q.ideology != "labor") {
    Q.changed = 1;
} 
  },

  

  render: `
    The labor wing of the party supports continued participation in government in order to provide benefits to the workers, and the creation of public works programs for employment.
  `,
  choices: [
    
  ]
};

export const _reform: Scene = {
  id: "reform",
  title: "reform",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (Q.ideology && Q.ideology != "reformist") {
    Q.changed = 1;
} 
  },

  

  render: `
    The reformist wing of the party seeks to preserve the Republic and the democratic system of government, and is most supportive of coalitions with the other pro-democracy parties.
  `,
  choices: [
    
  ]
};

export const _socpat: Scene = {
  id: "socpat",
  title: "socpat",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['social_patriot']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (Q.ideology && Q.ideology != "socpat") {
    Q.changed = 1;
} 
  },

  

  render: `
    The social patriot wing of the party, widely regarded as Schleicher's puppets, is the most supportive of the <span style='color: #c00000;'>**SPD**</span> and ADGB adopting a more nationalist stance.
  `,
  choices: [
    
  ]
};

export const _changed: Scene = {
  id: "changed",
  title: "changed",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['left_dissent'] += 5; state.flags['center_dissent'] += 5; state.flags['labor_dissent'] += 5; state.flags['reformist_dissent'] += 5; 
  },

  

  render: `
    We have changed ideologies. Many in the party feel unmoored.
  `,
  choices: [
    
  ]
};

export const _international_relations: Scene = {
  id: "international_relations",
  title: "International Relations",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['international_relations_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['international_relations_timer'] += 12; 
  },

  

  render: `
    #subtitle: Building ties with our fraternal socialist parties.
    At the <span style="color: #D50032;">Labor and Socialist International</span>, we can forge contacts with our fraternal <span style="color: #c00000;">socialist</span> parties in <span style="color: #001489;">Europe</span> and across the world.
  `,
  choices: [
    {
      id: "fr_uk",
      text: "Build relationships with the <span style=\"color: #002654;\">French</span> <span style=\"color: #ff0000;\">SFIO</span> and <span style=\"color: #C8102E;\">British</span> <span style=\"color: #f0456a;\">Labour Party</span> to move their governments in Germany's favor.",
      nextSceneId: "fr_uk",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "austria",
      text: "Learn organization and street fighting from the <span style=\"color: #EF3340;\">Au</span><span style=\"color: #ffffff;\"><span style=\"color: #ffffff;\">str</span></span><span style=\"color: #EF3340;\">ian</span> <span style=\"color: #A50034;\">SDAPÖ</span>.",
      nextSceneId: "austria",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "scandi",
      text: "Learn the path of economics and reform from the Scandinavian <span style=\"color: #D70926;\">social democrats</span>.",
      nextSceneId: "scandi",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "comintern",
      text: "Forget the second international - embed a spy in the <span style=\"color: #D50000;\">Comintern</span>'s conference.",
      nextSceneId: "comintern",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "america",
      text: "Contact the <span style=\"color: #940f0f;\">Socialist Party of America</span>.",
      nextSceneId: "america",
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
      text: "We do not need international contacts at the moment.",
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

export const _fr_uk: Scene = {
  id: "fr_uk",
  title: "fr_uk",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['west_relation'] += 1; state.flags['reformist_strength'] += 3; state.flags['pacifism'] += 1; state.flags['moderate_plan_support'] += 1; state.flags['international_socialist_support'] += 1; 
  },

  

  render: `
    The <span style="color: #f0456a;">socialists</span> of <span style="color: #002654;">France</span> and <span style="color: #C8102E;">Britain</span> can influence their governments to be friendlier towards Germany. Hopefully they will reduce our reparations burden.
  `,
  choices: [
    
  ]
};

export const _austria: Scene = {
  id: "austria",
  title: "austria",
  subtitle: "-1 resources [? if austrian_parliament_seen and not austrian_civil_war_seen: - We will also help the Austrians oppose their dictatorship. ?]",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['rb_explode']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['left_strength'] += 3; state.flags['radicalization'] += 1; state.flags['rb_militancy'] += 0.03; state.flags['resources'] -= 1; state.flags['austria_relation'] += 1;if (state.flags['austrian_parliament_seen'] == 1) { state.flags['sdapo_strength'] += 1; } 
  },

  

  render: `
    Our Reichsbanner can learn much in paramilitary organization and training from the Austrian Republikanischer Schutzbund (Republican Protection Units), the paramilitary branch of the <span style="color: #EF3340;">Au</span><span style="color: #ffffff;"><span style="color: #ffffff;">str</span></span><span style="color: #EF3340;">ian</span> <span style="color: #A50034;">social democrats</span>.
    [? if austrian_parliament_seen and not austrian_civil_war_seen: We are also helping the Austrian <span style="color: #A50034;">Social Democratic Worker's Party</span> build up their resources in preparation for a future struggle, legally and illegally. ?]
  `,
  choices: [
    
  ]
};

export const _scandi: Scene = {
  id: "scandi",
  title: "scandi",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reformist_strength'] += 3; state.flags['wtb_support'] += 1; state.flags['resources'] -= 1; state.flags['moderate_plan_support'] += 1; 
  },

  

  render: `
    The programs of the Nordic <span style="color: #D70926;">socialists</span> involve active government intervention in the economy. We can learn from their economic strategies, and how they moved beyond their working-class base to attract a broader set of constituents.
  `,
  choices: [
    
  ]
};

export const _comintern: Scene = {
  id: "comintern",
  title: "comintern",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['kpd_relation'] += 5*(1-state.flags['dissent']);if (state.flags['comintern_seen'] == 0) { state.flags['communist_coalition'] += 1; }; state.flags['comintern_seen'] += 1; 
  },

  

  render: `
    The <span style="color: #8B0000;">Stalinists</span> of the <span style="color: #700000;">**KPD**</span> insists on calling us "<span style="color: #c00000;">social</span> <span style="color: #7A3C00;">fascists</span>", suggesting that we <span style="color: #c00000;">social democrats</span> are as bad or worse than actual <span style="color: #7A3C00;">fascists</span>. Needless to say, this is not good for our relationship with the <span style="color: #700000;">communists</span>. By observing the <span style="color: #D50000;">Comintern</span>, we can better understand the <span style="color: #700000;">**KPD**</span>, enabling us to potentially improve relations, or counter the <span style="color: #700000;">**KPD**</span> if it may come to that.
  `,
  choices: [
    
  ]
};

export const _america: Scene = {
  id: "america",
  title: "america",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; 
  },

  

  render: `
    The <span style="color: #940f0f;">Socialist Party of America</span> is tiny and has limited support. There is not much we can do for them, and conversely, not much they can do for us.
  `,
  choices: [
    
  ]
};

export const _reduce_2: Scene = {
  id: "reduce",
  title: "reduce",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We do not need the international contacts at the moment.
  `,
  choices: [
    
  ]
};

export const _inter_party_relationships: Scene = {
  id: "inter_party_relationships",
  title: "Inter-Party Relationships",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['inter_party_relationships_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['inter_party_relationships_timer'] = 6; 
  },

  

  render: `
    #subtitle: Building relations with the other political parties of Germany.
    = Inter-Party Relationships
    The <span style="color: #c00000;">**SPD**</span> cannot govern by itself yet. Because we do not have an electoral majority, we need the support of other parties. Recently, our governments have consisted of the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> Coalition of the <span style="color: #c00000;">**SPD**</span>, <span style="color: #000000;">Center</span>, and [? if ddp_name == "DDP" and not lvp_formed: <span style="color: #D3C24D;">**Democratic**</span>?][? if ddp_name == "DStP" and not lvp_formed: <span style="color: #D3C24D;">**State**</span>?][? if lvp_formed: <span style="color: #FFCC00;">**Liberal People's**</span>?] parties. [? if cvp_formed: However the formation of the <span style="color: #000000;">**[+ z_party_name +]**</span> has only really made cooperation with the <span style="color: #D3C24D;">liberals</span> possible. ?] We can reach out and build additional connections with these parties, or perhaps we can stand alone.
  `,
  choices: [
    {
      id: "liberals",
      text: "Strengthen our bonds with the left-liberal [? if ddp_name == \"DDP\": <span style=\"color: #D3C24D;\">German Democratic Party</span>?][? if ddp_name == \"DStP\": <span style=\"color: #D3C24D;\">German State Party</span>?] and conservative-liberal <span style=\"color: #C0A054;\">German People's Party</span>.",
      nextSceneId: "liberals",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "liberals_ddp",
      text: "Strengthen our bonds with the left-liberal [? if ddp_name == \"DDP\": <span style=\"color: #D3C24D;\">German Democratic Party</span>?][? if ddp_name == \"DStP\": <span style=\"color: #D3C24D;\">German State Party</span>?].",
      nextSceneId: "liberals_ddp",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "liberals_lvp",
      text: "Strengthen our bonds with the <span style=\"color: #FFCC00;\">Liberal People's Party</span>.",
      nextSceneId: "liberals_lvp",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "center",
      text: "Strengthen our bonds with the Catholic [? if z_party_name != \"CVP\": <span style=\"color: #000000;\">Center Party</span>?][? if z_party_name == \"CVP\": <span style=\"color: #000000;\">**CVP**</span>?].",
      nextSceneId: "center",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cvp",
      text: "Reconcile with the <span style=\"color: #000000;\">Christian People's Party</span>.",
      nextSceneId: "cvp",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "kpd",
      text: "Work towards repairing relationships with the <span style=\"color: #700000;\">Communist Party</span>.",
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
      id: "dnvp",
      text: "Open dialogue with [? if dnvp_leader != \"Lambach\": Treviranus and the <span style=\"color: #0087DC;\">People's Conservatives</span>?][? if dnvp_leader == \"Lambach\": Lambach and the <span style=\"color: #6D5298;\">Christian Socials</span>?] of the <span style=\"color: #3E88B3;\">**DNVP**</span>.",
      nextSceneId: "dnvp",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nsdap",
      text: "Establish contact with Strasser and the <span style=\"color: #7A3C00;\">Nazi Party</span>'s left wing.",
      nextSceneId: "nsdap",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "spd_alone",
      text: "The <span style=\"color: #c00000;\">SPD</span> can stand alone for now.",
      nextSceneId: "spd_alone",
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

export const _kpd_2: Scene = {
  id: "kpd",
  title: "kpd",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['kpd_inter_party_seen'] += 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _kpd_1: Scene = {
  id: "kpd_1",
  title: "kpd_1",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] += 6*(1 - state.flags['dissent']);if (state.flags['kpd_inter_party_seen'] <= 1) { state.flags['communist_coalition'] += 1; }; state.flags['reformist_dissent'] += 2;if (state.flags['z_ideology'] == "Right") { state.flags['z_relation'] -= 2; }; state.flags['dvp_relation'] -= 3; state.flags['ddp_relation'] -= 2; state.flags['lvp_relation'] -= 3; 
  },

  

  render: `
    The <span style="color: #700000;">communists</span> are suspicious of our overtures, especially the <span style="color: #8B0000;">Stalinist</span> leadership, who persist in calling us "<span style="color: #c00000;">social</span> <span style="color: #7A3C00;">fascists</span>". However, connections are made at the grassroots and local levels.
  `,
  choices: [
    
  ]
};

export const _kpd_rectification_of_history: Scene = {
  id: "kpd_rectification_of_history",
  title: "kpd_rectification_of_history",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    One stumbling block for our relations with the <span style="color: #700000;">**KPD**</span> is our history of conflict, dating back to 1918 and 1919. The <span style="color: #700000;">**KPD**</span> is especially contemptuous of Gustav Noske, the <span style="color: #c00000;">**SPD**</span> "bloodhound" who reportedly ordered the violent suppression of the <span style="color: #700000;">Spartacist</span> uprising and other <span style="color: #700000;">**KPD**</span> revolts. They also blame us for the deaths of Rosa Luxemburg and Karl Liebknecht, two <span style="color: #c00000;">**SPD**</span>-turned-<span style="color: #700000;">**KPD**</span> leaders who were killed during the suppression of the uprising.
    For further improvements in <span style="color: #700000;">**KPD**</span> relations, it might be necessary to expel Noske, and hold some sort of commemoration for Luxemburg and Liebknecht.
  `,
  choices: [
    {
      id: "yes_history",
      text: "Yes, we must apologize for our past actions.",
      nextSceneId: "yes_history",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "no_history",
      text: "No, we have no need to apologize.",
      nextSceneId: "no_history",
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

export const _yes_history: Scene = {
  id: "yes_history",
  title: "yes_history",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reformist_dissent'] += 12; state.flags['reformist_strength'] -= 2; state.flags['neorevisionist_dissent'] += 5; state.flags['left_dissent'] -= 6; state.flags['left_strength'] += 5; state.flags['kpd_rectified_history'] = 1; state.flags['z_relation'] -= 3;if (state.flags['z_ideology'] == "Right") { state.flags['z_relation'] -= 3; }; state.flags['dvp_relation'] -= 6; state.flags['lvp_relation'] -= 6; state.flags['ddp_relation'] -= 4; state.flags['kpd_relation'] += 8*(1-state.flags['dissent']); state.flags['coalition_dissent'] += 1; state.flags['dvp_right'] += 2; state.flags['ddp_right'] += 2; state.flags['lvp_right'] += 2; 
  },

  

  render: `
    As part of normalizing relations with the <span style="color: #700000;">**KPD**</span>, we have to acknowledge the wrongdoings of our past. We have expelled Noske, and have held public commemorations for those killed by troops during the uprisings.
    This leads to tensions with the moderates and reformists within our party, and criticism from the <span style="color: #000000;">conservative</span> and <span style="color: #C0A054;">liberal</span> parties.
  `,
  choices: [
    
  ]
};

export const _no_history: Scene = {
  id: "no_history",
  title: "no_history",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] -= 3; 
  },

  

  render: `
    We have no need to apologize for the actions of Ebert and Noske; it is the <span style="color: #700000;">communists</span>' fault for launching a violent insurrection.
  `,
  choices: [
    
  ]
};

export const _kpd_2_2: Scene = {
  id: "kpd_2",
  title: "kpd_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] += 8*(1 - state.flags['dissent']);if (state.flags['kpd_inter_party_seen'] <= 1) { state.flags['communist_coalition'] += 1; }; state.flags['reformist_dissent'] += 2; state.flags['z_relation'] -= 3; state.flags['dvp_relation'] -= 3; state.flags['lvp_relation'] -= 3; state.flags['ddp_relation'] -= 3; 
  },

  

  render: `
    After the success of the coalition government with the <span style="color: #700000;">**KPD**</span>, they are much more amenable to us.
  `,
  choices: [
    
  ]
};

export const _kpd_blutmai: Scene = {
  id: "kpd_blutmai",
  title: "kpd_blutmai",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_relation'] += 3*(1 - state.flags['dissent']); state.flags['reformist_dissent'] += 1; 
  },

  

  render: `
    After the events of Blütmai, reconciling with the <span style="color: #700000;">Communists</span> is difficult, if not impossible. Nevertheless, we must try.
  `,
  choices: [
    
  ]
};

export const _center: Scene = {
  id: "center",
  title: "center",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['cvp_formed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1;if (state.flags['z_ideology'] == "Left") { state.flags['z_relation'] += 2; } 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _center_op: Scene = {
  id: "center_op",
  title: "center_op",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] += 5*(1 - state.flags['dissent']); 
  },

  

  render: `
    We are currently in opposition to the [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?]-led government, but that does not preclude the general building of feelings of good will.
  `,
  choices: [
    
  ]
};

export const _center_op_2: Scene = {
  id: "center_op_2",
  title: "center_op_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] += 6*(1 - state.flags['dissent']); 
  },

  

  render: `
    Together with the <span style="color: #000000;">Center</span>, we share a common opposition to the incumbent cabinet, making improving relations easier.
  `,
  choices: [
    
  ]
};

export const _center_coalition: Scene = {
  id: "center_coalition",
  title: "center_coalition",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] += 8*(1 - state.flags['dissent']); 
  },

  

  render: `
    We are currently coalition partners with them, so improving relations comes naturally.
  `,
  choices: [
    
  ]
};

export const _center_bruning: Scene = {
  id: "center_bruning",
  title: "center_bruning",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] += 5*(1 - state.flags['dissent']); 
  },

  

  render: `
    The Brüning semi-<span style="color: #808080;">autocratic</span> regime makes building friendly relations difficult, but not impossible.
  `,
  choices: [
    
  ]
};

export const _cvp: Scene = {
  id: "cvp",
  title: "cvp",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['cvp_formed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['z_relation'] += 6*(1 - state.flags['dissent']); state.flags['cvp_left'] += 1; 
  },

  

  render: `
    It's not exactly easy to get the <span style="color: #000000;">Christians</span> to like us again—but it's not impossible either. We will leverage our connections with their <span style="color: #FF7F00;">Christian Left</span> and Labor factions to lay the groundwork for a potential reconciliation between our two parties.
  `,
  choices: [
    
  ]
};

export const _liberals_ddp: Scene = {
  id: "liberals_ddp",
  title: "liberals_ddp",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['lvp_formed'] && ! state.flags['dvp_exist']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['ddp_relation'] += 8*(1 - state.flags['dissent']); state.flags['ddp_left'] += 1; state.flags['ddp_cohesion'] += 0.5; 
  },

  

  render: `
    The <span style="color: #D3C24D;">**[+ ddp_name +]**</span> has been one of our closest allies throughout the course of the Republic. Now, as they are the only remaining liberal party, strengthening ties with them should be our top priority.
  `,
  choices: [
    
  ]
};

export const _liberals: Scene = {
  id: "liberals",
  title: "liberals",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['lvp_formed'] && state.flags['dvp_exist']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['ddp_relation'] += 5*(1 - state.flags['dissent']); state.flags['ddp_left'] += 0.5; state.flags['ddp_cohesion'] += 0.25;if (state.flags['in_grand_coalition_prussia']) { state.flags['dvp_relation'] += 2; } 
  },

  

  render: `
    The <span style="color: #D3C24D;">**[+ ddp_name +]**</span> has been one of our closest allies through the course of the Republic. [? if year >= 1929: Although the national shift to the right is having them question our cooperation. ?]
  `,
  choices: [
    
  ]
};

export const _dvp_stresemann: Scene = {
  id: "dvp_stresemann",
  title: "dvp_stresemann",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dvp_relation'] += 6*(1 - state.flags['dissent']); state.flags['dvp_left'] += 1;if (state.flags['in_grand_coalition_prussia']) { state.flags['dvp_left'] += 1; } 
  },

  

  render: `
    Gustav Stresemann, the leader of the <span style="color: #C0A054;">**DVP**</span> is the best foreign policy leaders of the republic, and while he has previously expressed <span style="color: #808080;">monarchist</span> tendencies, he has been friendly towards us. [? if in_grand_coalition_prussia: Their inclusion in the Prussian government has fostered a more conciliatory attitude toward us. ?]
  `,
  choices: [
    
  ]
};

export const _dvp_loss: Scene = {
  id: "dvp_loss",
  title: "dvp_loss",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dvp_relation'] += 4*(1 - state.flags['dissent']); state.flags['dvp_left'] += 1;if (state.flags['in_grand_coalition_prussia']) { state.flags['dvp_left'] += 1; } 
  },

  

  render: `
    With the death of Gustav Stresemann, the <span style="color: #C0A054;">**DVP**</span> is much less likely to be accommodating of us. In addition, the <span style="color: #D3C24D;">liberal</span> parties are electorally in decline, so perhaps our efforts are best spent elsewhere.
    However, given the influence of the <span style="color: #C0A054;">**DVP**</span> among the other <span style="color: #808080;">right</span>-leaning parties[? if president == "Hindenburg" or president_ideology == "Moderate": and with President [+ president +] ?], it can still be helpful to influence them. [? if in_grand_coalition_prussia: Their inclusion in the Prussian government has also fostered a more conciliatory attitude toward us. ?]
  `,
  choices: [
    
  ]
};

export const _dvp_moribund: Scene = {
  id: "dvp_moribund",
  title: "dvp_moribund",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['dvp_relation'] += 4*(1 - state.flags['dissent']); state.flags['dvp_left'] += 1;if (state.flags['in_grand_coalition_prussia']) { state.flags['dvp_left'] += 1; } 
  },

  

  render: `
    The <span style="color: #D3C24D;">liberal</span> parties (both the <span style="color: #D3C24D;">**[+ ddp_name +]**</span> and <span style="color: #C0A054;">**DVP**</span>) are electorally <span style="color: #ff0000;">moribund</span>, so perhaps our efforts are best spent elsewhere.
    However, given the influence of the <span style="color: #C0A054;">**DVP**</span> among the other <span style="color: #808080;">right</span>-leaning parties[? if president == "Hindenburg" or president_ideology == "Moderate": and with President [+ president +] ?], it can still be helpful to influence them. [? if in_grand_coalition_prussia: Their inclusion in the Prussian government has also fostered a more conciliatory attitude toward us. ?]
  `,
  choices: [
    
  ]
};

export const _liberals_lvp: Scene = {
  id: "liberals_lvp",
  title: "liberals_lvp",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['lvp_formed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; 
  },

  

  render: `
    The former two liberal parties have been our closest allies through the course of the Republic. [? if year >= 1929: Although the national shift to the right is having them question our cooperation. ?]
  `,
  choices: [
    
  ]
};

export const _lvp_stresemann: Scene = {
  id: "lvp_stresemann",
  title: "lvp_stresemann",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['lvp_relation'] += 6*(1 - state.flags['dissent']); state.flags['lvp_left'] += 1; 
  },

  

  render: `
    Gustav Stresemann, the former leader of the <span style="color: #C0A054;">**DVP**</span>, is the best foreign policy leaders of the republic, and while he has previously expressed <span style="color: #808080;">monarchist</span> tendencies, he has been friendly towards us. Stresemann's influence over the right wing of the <span style="color: #FFCC00;">**LVP**</span> helps sway some more reluctant party members towards us.
  `,
  choices: [
    
  ]
};

export const _lvp_loss: Scene = {
  id: "lvp_loss",
  title: "lvp_loss",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['lvp_relation'] += 4*(1 - state.flags['dissent']); state.flags['lvp_left'] += 1; 
  },

  

  render: `
    With the death of Gustav Stresemann, the right wing of the <span style="color: #FFCC00;">**LVP**</span> is much less likely to be accommodating of us. In addition, the <span style="color: #D3C24D;">liberals</span> are electorally in decline, so perhaps our efforts are best spent elsewhere.
    However, given the influence of the <span style="color: #FFCC00;">**LVP**</span> among the other <span style="color: #808080;">right</span>-leaning parties [? if president == "Hindenburg" or president_ideology == "Moderate": and with President [+ president +] ?], it can still be helpful to influence them. 
  `,
  choices: [
    
  ]
};

export const _dnvp: Scene = {
  id: "dnvp",
  title: "dnvp",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wacky_weimar']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['dnvp_relation'] += 10*(1-state.flags['dissent']); state.flags['pro_republic'] += 3; state.flags['left_dissent'] += 10; state.flags['center_dissent'] += 10; 
  },

  

  render: `
    We have reached out to [+ dnvp_leader +], who responds warmly to our requests. However, it would take much more convincing to get the evil and unwholesome side of the <span style="color: #3E88B3;">**DNVP**</span> behind closer cooperation. Our Left and Center factions voice their disapproval.
  `,
  choices: [
    {
      id: "dnvp_wholesome",
      text: "dnvp_wholesome",
      nextSceneId: "dnvp_wholesome",
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

export const _dnvp_wholesome: Scene = {
  id: "dnvp_wholesome",
  title: "Conclude an electoral alliance with the <span style=\"color: #3E88B3;\">**DNVP**</span>.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.dnvp_wholesome = 1; 
Q.wholesome_point += 1;
Q.new_middle_ddp += 20;
Q.new_middle_lvp += 20;
Q.workers_dnvp = Q.workers_spd;
Q.workers_spd = Q.workers_dnvp;
Q.new_middle_dnvp = Q.new_middle_spd;
Q.new_middle_spd = Q.new_middle_dnvp;
Q.old_middle_dnvp = Q.old_middle_spd;
Q.old_middle_spd = Q.old_middle_dnvp;
Q.rural_dnvp = Q.rural_spd;
Q.rural_spd = Q.rural_dnvp;
Q.catholics_dnvp = Q.catholics_spd;
Q.catholics_spd = Q.catholics_dnvp;
Q.unemployed_dnvp = Q.unemployed_spd;
Q.unemployed_spd = Q.unemployed_dnvp;
Q.z_minus_bvp_votes = parseFloat((Q.z_votes - Q.bvp_votes).toFixed(1));
Q.z_minus_bvp_r = parseFloat((Q.z_r - Q.bvp_r).toFixed(1));
if (Q.bvp_r == Q.z_r) Q.z_minus_bvp_r = 0; 
  },

  onDisplay: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['data'] = [{
    "id": "kpd",
    "legend": "KPD",
    "name": "KPD",
    "seats": Math.round(Q.kpd_r * Q.reichstag_size),
}];
if (Q.sapd_formed && Q.sapd_r) {
    state.flags['data'].push({
        "id": "sapd",
        "legend": "SAPD",
        "name": "SAPD",
        "seats": Math.round(Q.sapd_r * Q.reichstag_size),
    });
}
if (Q.spd_r) {
    state.flags['data'].push({
        "id": "spd",
        "legend": "SPD",
        "name": "SPD",
        "seats": Math.round(Q.spd_r * Q.reichstag_size),
    });
}
if (Q.rdp_r) {
    state.flags['data'].push({
        "id": "rdp",
        "legend": "RDP",
        "name": "RDP",
        "seats": Math.round(Q.rdp_r * Q.reichstag_size),
    });
}
if (Q.dnvp_r && Q.dnvp_wholesome) {
    state.flags['data'].push({
        "id": "dnvp_wholesome",
        "legend": "DNVP",
        "name": "DNVP",
        "seats": Math.round(Q.dnvp_r * Q.reichstag_size),
    });
}
if (Q.ddp_r && !Q.lvp_formed) {
    state.flags['data'].push({
        "id": "ddp",
        "legend": Q.ddp_name,
        "name": Q.ddp_name,
        "seats": Math.round(Q.ddp_r * Q.reichstag_size),
    });
}
if (Q.lvp_r && Q.lvp_formed) {
    state.flags['data'].push({
        "id": "lvp",
        "legend": "LVP",
        "name": "LVP",
        "seats": Math.round(Q.lvp_r * Q.reichstag_size),
    });
}
if (Q.z_minus_bvp_r) {
    state.flags['data'].push({
        "id": "z",
        "legend": "Center",
        "name": "Center",
        "seats": Math.round(Q.z_minus_bvp_r * Q.reichstag_size),
    });
}
if (Q.bvp_r) {
    state.flags['data'].push({
        "id": "bvp",
        "legend": "BVP",
        "name": "BVP",
        "seats": Math.round(Q.bvp_r * Q.reichstag_size),
    });
}
if (Q.dvp_r && !Q.lvp_formed && Q.dvp_exist) {
    state.flags['data'].push({
        "id": "dvp",
        "legend": "DVP",
        "name": "DVP",
        "seats": Math.round(Q.dvp_r * Q.reichstag_size),
    });
}
if (Q.dnef_r && Q.dnef_formed) {
    state.flags['data'].push({
        "id": "dnef",
        "legend": "DNEF",
        "name": "DNEF",
        "seats": Math.round(Q.dnef_r * Q.reichstag_size),
    });
}
if (Q.other_r) {
    state.flags['data'].push({
        "id": "other",
        "legend": "Other",
        "name": "Other",
        "seats": Math.round(Q.other_r * Q.reichstag_size),
    });
}
if (Q.kvp_formed && Q.kvp_r) {
    state.flags['data'].push({
        "id": "kvp",
        "legend": "KVP",
        "name": "KVP",
        "seats": Math.round(Q.kvp_r * Q.reichstag_size),
    });
}
if (Q.dnvp_r && !Q.dnvp_wholesome) {
    state.flags['data'].push({
        "id": "dnvp",
        "legend": "DNVP",
        "name": "DNVP",
        "seats": Math.round(Q.dnvp_r * Q.reichstag_size),
    });
}
if (Q.dnf_formed && Q.dnf_r) {
    state.flags['data'].push({
        "id": "dnf",
        "legend": "DNF",
        "name": "DNF",
        "seats": Math.round(Q.dnf_r * Q.reichstag_size),
    });
}
if (Q.dsu_exist && Q.dsu_r) {
    state.flags['data'].push({
        "id": "dsu",
        "legend": "DSU",
        "name": "DSU",
        "seats": Math.round(Q.dsu_r * Q.reichstag_size),
    });
}
if (Q.nsdap_split && Q.nsdap_hitler_r) {
    state.flags['data'].push({
        "id": "nsdap",
        "legend": "NSDAP",
        "name": "NSDAP",
        "seats": Math.round(Q.nsdap_hitler_r * Q.reichstag_size),
    });
}
if (!Q.nsdap_split && Q.nsdap_r) {
    state.flags['data'].push({
        "id": "nsdap",
        "legend": "NSDAP",
        "name": "NSDAP",
        "seats": Math.round(Q.nsdap_r * Q.reichstag_size),
    });
}
if (Q.nvf_exist && Q.nvf_r) {
    state.flags['data'].push({
        "id": "nvf",
        "legend": "NVF",
        "name": "NVF",
        "seats": Math.round(Q.nvf_r * Q.reichstag_size),
    });
}
if (state.flags['d3'] && window) {
    // get screen width
    var width = 500;
    var height = 500;
    var screenWidth = document.getElementById('content').offsetWidth;
    if (screenWidth < width - 50) {
        width = screenWidth - 50;
        height = width;
        document.getElementById("reichstag").style.height = screenWidth/2 + "px";
    }
    var parliament = state.flags['d3'].parliament();
    parliament.width(width).height(height).innerRadiusCoef(0.4);
    parliament.enter.fromCenter(true).smallToBig(true);
    parliament.exit.toCenter(false).bigToSmall(true);
    state.flags['d3'].select("#reichstag").datum(state.flags['data']).call(parliament);
} 
  },

  render: `
    Due to our shared values of wholesomeness and love, we have agreed to run a joint list with the <span style="color: #3E88B3;">**DNVP**</span> and welcome them into our parliamentary group. However, because of this deal, we had to expel all our <span style="color: #005EB8;">Jewish</span> members, who join the [? if not lvp_formed: <span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed: <span style="color: #FFCC00;">**LVP**</span>?].
    {!<svg id="reichstag" style="width: 500px; height: 250px;"> </svg>!}
  `,
  choices: [
    
  ]
};

export const _nsdap_2: Scene = {
  id: "nsdap",
  title: "nsdap",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wacky_weimar']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['nsdap_relation'] += 10*(1-state.flags['dissent']); state.flags['pro_republic'] += 3; state.flags['left_dissent'] += 10; state.flags['center_dissent'] += 10; 
  },

  

  render: `
    We have began our work in wholesomeifying Gregor Strasser, who is beginning to form a moderate pro-democratic <span style="color: #7A3C00;">National Social Democratic</span> faction within the <span style="color: #7A3C00;">**NSDAP**</span> under Hitler's nose. Our Left and Center factions voice their disapproval.
  `,
  choices: [
    {
      id: "nsdap_wholesome",
      text: "nsdap_wholesome",
      nextSceneId: "nsdap_wholesome",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nsdap_wholesome_2",
      text: "nsdap_wholesome_2",
      nextSceneId: "nsdap_wholesome_2",
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

export const _nsdap_wholesome: Scene = {
  id: "nsdap_wholesome",
  title: "Create the anti-Liberal Front.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_ddp'] = 0; state.flags['new_middle_ddp'] = 0; state.flags['old_middle_ddp'] = 0; state.flags['rural_ddp'] = 0; state.flags['catholics_ddp'] = 0; state.flags['unemployed_ddp'] = 0; state.flags['workers_dvp'] = 0; state.flags['new_middle_dvp'] = 0; state.flags['old_middle_dvp'] = 0; state.flags['rural_dvp'] = 0; state.flags['catholics_dvp'] = 0; state.flags['unemployed_dvp'] = 0; state.flags['workers_lvp'] = 0; state.flags['new_middle_lvp'] = 0; state.flags['old_middle_lvp'] = 0; state.flags['rural_lvp'] = 0; state.flags['catholics_lvp'] = 0; state.flags['unemployed_lvp'] = 0; state.flags['ddp_relation'] = 0; state.flags['lvp_relation'] = 0; state.flags['dvp_relation'] = 0; state.flags['z_relation'] += 20; state.flags['dnvp_relation'] += 20; 
  },

  

  render: `
    We have formed the anti-Liberal front with Strasser's faction within the <span style="color: #7A3C00;">**NSDAP**</span>. The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] and <span style="color: #3E88B3;">**DNVP**</span> also join in.
  `,
  choices: [
    
  ]
};

export const _nsdap_wholesome_2: Scene = {
  id: "nsdap_wholesome_2",
  title: "Merge the <span style=\"color: #c00000;\">**Iron**</span> <span style=\"color: #1A1A1A;\">**Front**</span> and the Harzburg Front.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rb_strength'] += state.flags['sa_strength']; state.flags['rb_strength'] += state.flags['sh_strength']; state.flags['rb_militancy'] += 0.5; state.flags['sa_strength'] = 0; state.flags['sh_strength'] = 0; 
  },

  

  render: `
    The <span style="color: #3E88B3;">**Stahlhelm**</span> and <span style="color: #7A3C00;">**SA**</span> has dissolved and joined the Reichsbanner!
  `,
  choices: [
    
  ]
};

export const _spd_alone: Scene = {
  id: "spd_alone",
  title: "spd_alone",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Whether it is because we *cannot* or *will not*, we do not make ties with other parties at this moment.
  `,
  choices: [
    {
      id: "return",
      text: "Continue...",
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

export const _iron_front_2: Scene = {
  id: "iron_front",
  title: "The Iron Front",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['iron_front_formed'] == 1 && state.flags['iron_front_timer'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['iron_front_timer'] = 7; state.flags['month_actions'] += 1;if (state.flags['harzburg_front_time'] == state.flags['time']) { state.flags['month_actions'] -= 1; };if (state.flags['rb_militancy'] > 0.1) { state.flags['rb_militarization_cost'] = 2; } else { state.flags['rb_militarization_cost'] = 1; };if (state.flags['rb_militancy'] > 0.25) { state.flags['rb_militarization_cost'] = 3; } 
  },

  onDisplay: (state: GameState): void => { 
             const Q = state.flags; 
             var cardEl = document.createElement('div');  
    cardEl.className = "face-figure2";  
    var image = new Image();  
    image.className = "face-img";  
    image.src = "img/tnoreference.png";  
    cardEl.appendChild(image);  
    var contentDiv = document.querySelector("#page #mid_panel #content");
    contentDiv.appendChild(cardEl); 
  },

  render: `
    = The <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span>
    The <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span> is our new anti-<span style="color: #7A3C00;">fascists</span> coordination front, consisting of the <span style="color: #c00000;">**SPD**</span>, the trade unions, and the Reichsbanner. How should we use the <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span>?
    [? if workers_spd < 45 or workers_spd < workers_nsdap or workers_spd < workers_kpd : Unfortunately, the <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span>'s effectiveness is dragged down by the <span style="color: #c00000;">**SPD**</span>'s unpopularity, as the <span style="color: #c00000;">**SPD**</span> is no longer the dominant party among the workers. Many Reichsbanner members have left, and many workers are not interested. ?]
  `,
  choices: [
    {
      id: "defense",
      text: "Rally for defense against the <span style=\"color: #7A3C00;\">fascists</span> with the Reichsbanner.",
      nextSceneId: "defense",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "pacifism",
      text: "Rally for pacifism, against nationalism and war.",
      nextSceneId: "pacifism",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "republic",
      text: "Rally to save the democratic republic against <span style=\"color: #7A3C00;\">dictatorship</span>.",
      nextSceneId: "republic",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "wtb",
      text: "Rally for economic change and the WTB-Plan.",
      nextSceneId: "wtb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "antisemitism",
      text: "antisemitism",
      nextSceneId: "antisemitism",
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

export const _defense: Scene = {
  id: "defense",
  title: "defense",
  subtitle: "-[+ rb_militarization_cost +] resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['rb_explode']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= state.flags['rb_militarization_cost']; state.flags['rb_strength'] += 50; state.flags['rb_militancy'] += 0.05;if (state.flags['strife'] < 5) { state.flags['z_relation'] -= 3; };if (state.flags['strife'] < 5) { state.flags['ddp_relation'] -= 3; };if (state.flags['strife'] < 5) { state.flags['lvp_relation'] -= 3; } 
  },

  

  render: `
    The <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span> rallies for the militant defense of the republic against the <span style="color: #7A3C00;">fascists</span> paramilitaries, strengthening the Reichsbanner.
    [? if not cvp_leave_reichsbanner and not rb_exit: [? if strife < 5: The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] decries the militarization of the Reichsbanner, and its members are leaving the <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> organization. ?][? if strife >= 5: Seeing the strife that has filled Germany's streets, the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] and [? if not lvp_formed:<span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed:<span style="color: #FFCC00;">**LVP**</span>?] seem to be convinced that it is necessary for the Reichsbanner to be militarized, and mute their criticisms. ?] ?]
  `,
  choices: [
    
  ]
};

export const _pacifism: Scene = {
  id: "pacifism",
  title: "pacifism",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pacifism'] += 1;if (state.flags['pacifism'] >= 3) { state.flags['nationalism'] -= 5; };if (state.flags['pacifism'] >= 4) { state.flags['workers_spd'] += 5*(1-state.flags['dissent']); };if (state.flags['pacifism'] >= 4) { state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); };if (state.flags['pacifism'] >= 4) { state.flags['new_middle_spd'] += 4*(1-state.flags['dissent']); } 
  },

  

  render: `
    The <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span> rallies against nationalism and war.
  `,
  choices: [
    
  ]
};

export const _republic: Scene = {
  id: "republic",
  title: "republic",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pro_republic'] += 3*(1-state.flags['dissent']); state.flags['democratization'] += 1;if (state.flags['democratization'] >= 4) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 4) { state.flags['unemployed_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 4) { state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 4) { state.flags['ddp_left'] += 0.5; };if (state.flags['democratization'] >= 4) { state.flags['lvp_left'] += 0.5; } 
  },

  

  render: `
    The <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span> rallies in defense of the democratic republic and against <span style="color: #7A3C00;">dictatorship</span>.
  `,
  choices: [
    
  ]
};

export const _wtb_2: Scene = {
  id: "wtb",
  title: "wtb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wtb_adopted'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 4*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 1*(1-state.flags['dissent']); state.flags['rural_spd'] += 1*(1-state.flags['dissent']);if (state.flags['wtb_implemented']) { state.flags['workers_spd'] += 4*(1-state.flags['dissent']); };if (state.flags['wtb_implemented']) { state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); };if (state.flags['wtb_implemented']) { state.flags['rural_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['wtb_implemented']) { state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['wtb_implemented']) { state.flags['old_middle_spd'] += 2*(1-state.flags['dissent']); }; state.flags['wtb_rally'] += 1; 
  },

  

  render: `
    The WTB-Plan is the rallying point for the entire <span style="color: #c00000;">**SPD**</span> and its affiliated organizations, including the <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span>. [? if not wtb_implemented: However, many still believe that the plan is merely an empty slogan and will remain skeptical until we actually implement it. ?]
  `,
  choices: [
    
  ]
};

export const _antisemitism: Scene = {
  id: "antisemitism",
  title: "Rally against antisemitism and in defense of <span style=\"color: #005EB8;\">Jewish</span> Germans.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['confronting_antisemitism'] > 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['nationalism'] -= 4*(1-state.flags['dissent']); state.flags['pro_republic'] += 1.5*(1-state.flags['dissent']); state.flags['confronting_antisemitism'] += 1; state.flags['workers_nsdap'] -= 4*(1-state.flags['dissent']); state.flags['unemployed_nsdap'] -= 4*(1-state.flags['dissent']); state.flags['ddp_left'] += 0.5; state.flags['lvp_left'] += 1; 
  },

  

  render: `
    The <span style="color: #7A3C00;">Nazis</span> and other <span style="color: #7A3C00;">far</span>-<span style="color: #3E88B3;">right</span> political movements are increasingly turning their hatred against the <span style="color: #005EB8;">Jewish</span> community of Germany. The <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span> rallies in defense of individual <span style="color: #005EB8;">Jews</span> and the broader community against violence.
  `,
  choices: [
    
  ]
};

export const _media: Scene = {
  id: "media",
  title: "Media",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['media_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['media_timer'] += 6; 
  },

  

  render: `
    #subtitle: Setting the direction for our newspapers and radio.
    = Media
    The <span style="color: #c00000;">**SPD**</span> runs a veritable media empire, with many newspapers throughout every German city and region. We could use the media for various purposes...
  `,
  choices: [
    {
      id: "commercial",
      text: "commercial",
      nextSceneId: "commercial",
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
      text: "campaign",
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
      id: "ideological",
      text: "ideological",
      nextSceneId: "ideological",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "radio",
      text: "radio",
      nextSceneId: "radio",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "radio_2",
      text: "radio_2",
      nextSceneId: "radio_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "radio_3",
      text: "radio_3",
      nextSceneId: "radio_3",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "radio_4",
      text: "radio_4",
      nextSceneId: "radio_4",
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
      text: "We should not do anything with media at the moment.",
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

export const _commercial: Scene = {
  id: "commercial",
  title: "Make our newspapers more commercialized by broadening their appeal beyond party supporters.",
  subtitle: "This might upset ideological purists, but it may bring in more funds and perhaps expose the middle class to <span style=\"color: #c00000;\">socialist</span> views.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] += 1; state.flags['commercialized_media'] += 1; state.flags['new_middle_spd'] += 4*(1 - state.flags['dissent']); state.flags['old_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['left_dissent'] += 10; state.flags['labor_dissent'] += 10; state.flags['pro_republic'] += 1*(1-state.flags['dissent']); state.flags['nationalism'] -= 1*(1 - state.flags['dissent']); 
  },

  

  render: `
    Our commercialized newspapers are able to bring in more funds. However, the left and labor factions express their displeasure.
  `,
  choices: [
    
  ]
};

export const _campaign: Scene = {
  id: "campaign",
  title: "The purpose of our media is to elect more <span style=\"color: #c00000;\">Social Democrats</span>.",
  subtitle: "Our newspapers will focus on the electoral campaign.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['campaign_media'] += 1; state.flags['workers_spd'] += 4*(1 - state.flags['dissent']); state.flags['unemployed_spd'] += 2*(1-state.flags['dissent']); 
  },

  

  render: `
    Our campaign media is mostly reaching the workers who are already saturated with <span style="color: #c00000;">Socialist</span> propaganda, but it must be doing *something*, or at least that is what we hope.
  `,
  choices: [
    
  ]
};

export const _ideological: Scene = {
  id: "ideological",
  title: "We will have vibrant ideological debate within our newspapers.",
  subtitle: "There will be space for all factions to air their views.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['left_dissent'] -= 6; state.flags['labor_dissent'] -= 6; state.flags['center_dissent'] -= 6; state.flags['reformist_dissent'] -= 6; state.flags['neorevisionist_dissent'] -= 6; 
  },

  

  render: `
    This has been our media course historically, and it has successfully paved over the many tensions in our party.
  `,
  choices: [
    
  ]
};

export const _radio: Scene = {
  id: "radio",
  title: "Why not fund a radio station?",
  subtitle: "-2 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['radio'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['radio'] += 1; state.flags['resources'] -= 2; state.flags['new_middle_spd'] += 4*(1 - state.flags['dissent']); state.flags['old_middle_spd'] += 3*(1 - state.flags['dissent']); state.flags['workers_spd'] += 2*(1 - state.flags['dissent']); state.flags['labor_dissent'] += 5; state.flags['socialism'] += 3*(1 - state.flags['dissent']);  state.flags['nationalism'] -= 1*(1 - state.flags['dissent']);if (state.flags['pacifism'] > 1) { state.flags['nationalism'] -= 2*(1 - state.flags['dissent']); }; state.flags['pro_republic'] += 2*(1-state.flags['dissent']); 
  },

  

  render: `
    Our new radio station allows us to connect to people in a more intimate setting than before, spreading the message of <span style="color: #c00000;">socialism</span> along with music and other popular content. Since most proletarians cannot afford family radios right now, we are reaching the middle class, a fact of which our labor comrades are painfully aware.
  `,
  choices: [
    
  ]
};

export const _radio_2: Scene = {
  id: "radio_2",
  title: "We must keep on building up our radio network.",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['radio'] > 0 && state.flags['radio'] <= 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['radio'] += 1; state.flags['resources'] -= 1; state.flags['new_middle_spd'] += 5*(1 - state.flags['dissent']); state.flags['old_middle_spd'] += 3*(1 - state.flags['dissent']); state.flags['workers_spd'] += 3*(1 - state.flags['dissent']); state.flags['socialism'] += 3*(1 - state.flags['dissent']); state.flags['nationalism'] -= 1*(1 - state.flags['dissent']);if (state.flags['pacifism'] > 2) { state.flags['nationalism'] -= 2*(1 - state.flags['dissent'])*(state.flags['pacifism']-2); }; state.flags['pro_republic'] += 2*(1-state.flags['dissent']); 
  },

  

  render: `
    Our new radio network has a mix of popular and political programming, and is proving a success.
  `,
  choices: [
    
  ]
};

export const _radio_3: Scene = {
  id: "radio_3",
  title: "We must keep on building up our radio network.",
  subtitle: "It is now financially self-sufficient, and does not require any more resources.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['radio'] > 3 && state.flags['radio'] <= 5 && state.flags['year'] <= 1931);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['radio'] += 1; state.flags['new_middle_spd'] += 5*(1 - state.flags['dissent']); state.flags['old_middle_spd'] += 4*(1 - state.flags['dissent']); state.flags['workers_spd'] += 4*(1 - state.flags['dissent']); state.flags['rural_spd'] += 3*(1 - state.flags['dissent']); state.flags['unemployed_spd'] += 2*(1-state.flags['dissent']); state.flags['socialism'] += 3*(1 - state.flags['dissent']); state.flags['nationalism'] -= 1*(1 - state.flags['dissent']);if (state.flags['pacifism'] > 2) { state.flags['nationalism'] -= 2*(1 - state.flags['dissent'])*(state.flags['pacifism']-2); }; state.flags['pro_republic'] += 2*(1-state.flags['dissent']); 
  },

  

  render: `
    Our radio network has become a successful tool for spreading our message.
  `,
  choices: [
    
  ]
};

export const _radio_4: Scene = {
  id: "radio_4",
  title: "We should keep on supporting our radio network.",
  subtitle: "As radio becomes more common, the novelty is beginning to wear off, and radio is becoming saturated in society. -1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['radio'] > 3 && (state.flags['radio'] >= 6 || state.flags['year'] >= 1932) && state.flags['radio'] <= 9);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['radio'] += 1; state.flags['resources'] -= 1; state.flags['new_middle_spd'] += 3*(1 - state.flags['dissent']); state.flags['old_middle_spd'] += 2*(1 - state.flags['dissent']); state.flags['workers_spd'] += 3*(1 - state.flags['dissent']); state.flags['rural_spd'] += 2*(1 - state.flags['dissent']); state.flags['unemployed_spd'] += 2*(1-state.flags['dissent']); state.flags['socialism'] += 2*(1 - state.flags['dissent']); state.flags['nationalism'] -= 1*(1 - state.flags['dissent']);if (state.flags['pacifism'] > 2) { state.flags['nationalism'] -= 2*(1 - state.flags['dissent'])*(state.flags['pacifism']-2); }; state.flags['pro_republic'] += 2*(1-state.flags['dissent']); 
  },

  

  render: `
    We are continuing to invest in our radio stations. Both commercial and political radio are becoming more prevalent, making it harder to spread our message amidst the competition.
  `,
  choices: [
    
  ]
};

export const _neorevisionism: Scene = {
  id: "neorevisionism",
  title: "Neorevisionism: a new idea",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['nazi_urgency'] > 0 && state.flags['neorevisionism'] == 0 && (state.flags['nsdap_r'] >= 10 || state.flags['nsdap_normalized'] >= 0.15 || state.flags['radicalization'] >= 3));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['shuffle_leadership_timer'] = 0; 
  },

  

  render: `
    = Neorevisionism: A New Idea
    Several young <span style="color: #f0456a;">socialists</span>, led by Carlo Mierendorff, are calling for a "new revisionism" in response to the <span style="color: #7A3C00;">Nazi</span> threat. This political tendency calls for a mass movement in favor of democracy in order to counter the <span style="color: #7A3C00;">Nazi</span> and <span style="color: #700000;">**Communist**</span> movements, and to update our rhetoric and imagery to appeal to emotion and not just reason.
    #- @shuffle_leadership: It's time to change our advisors to take into account new ideas.
  `,
  choices: [
    {
      id: "support_neo",
      text: "Support the neorevisionist movement.",
      nextSceneId: "support_neo",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "no_new_ideas",
      text: "We don't need new ideas.",
      nextSceneId: "no_new_ideas",
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

export const _support_neo: Scene = {
  id: "support_neo",
  title: "support_neo",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['neorevisionist_strength'] += 10; state.flags['nazi_urgency'] += 1; state.flags['neorevisionism'] = 1; state.flags['peoples_party_support'] += 1; 
  },

  

  render: `
    We support the new leaders, and start using new-style propaganda techniques in our campaigns. The results are uncertain so far...
  `,
  choices: [
    {
      id: "shuffle_leadership",
      text: "We should use this opportunity to change the party's leadership.",
      nextSceneId: "shuffle_leadership",
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
      text: "Continue...",
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

export const _no_new_ideas: Scene = {
  id: "no_new_ideas",
  title: "no_new_ideas",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['neorevisionist_strength'] -= 5; state.flags['center_strength'] += 5; state.flags['neorevisionism'] = -1; 
  },

  

  render: `
    We do not need these new ideas; they seem to imitate too closely those of the <span style="color: #7A3C00;">Nazis</span> and <span style="color: #700000;">**Communists**</span>.
  `,
  choices: [
    
  ]
};

export const _party_disunity: Scene = {
  id: "party_disunity",
  title: "Party Disunity",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['party_disunity_timer'] == 0 && (state.flags['dissent'] >= 0.3 || (state.flags['reformist_dissent'] > 30 && ! state.flags['reformists_resign']) || (state.flags['center_dissent'] > 30 && ! state.flags['centrists_resign']) || (state.flags['left_dissent'] > 30 && ! state.flags['left_split']) || (state.flags['labor_dissent'] > 30 && ! state.flags['unions_independent']) || (state.flags['neorevisionist_dissent'] > 30 && state.flags['neorevisionism'])));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['party_disunity_timer'] = 4; 
  },

  

  render: `
    = Party Disunity
    The party is being torn apart by internal dissent. Upset at the leadership and general direction, factions have started sabotaging their rivals, hampering our efforts to win votes and carry out our policies.
    [? if reformist_dissent > 30 : The reformists are upset at our direction.  ?]
    [? if center_dissent > 30 : The centrists are displeased with the direction of our party. ?]
    [? if labor_dissent > 30 : The trade unions disagree with our present course of action. ?]
    [? if left_dissent > 30: Leftists are making noises about another party split. ?]
    [? if neorevisionist_dissent > 30 and neorevisionism = 1 : Neorevisionists are in disagreement about our political direction. ?]
    Something must be done to reinforce party unity.
  `,
  choices: [
    {
      id: "enforce_unity",
      text: "enforce_unity",
      nextSceneId: "enforce_unity",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "concessions_reformists",
      text: "concessions_reformists",
      nextSceneId: "concessions_reformists",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "concessions_center",
      text: "concessions_center",
      nextSceneId: "concessions_center",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "concessions_left",
      text: "concessions_left",
      nextSceneId: "concessions_left",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "concessions_labor",
      text: "concessions_labor",
      nextSceneId: "concessions_labor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "concessions_neorevisionists",
      text: "concessions_neorevisionists",
      nextSceneId: "concessions_neorevisionists",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "do_nothing",
      text: "do_nothing",
      nextSceneId: "do_nothing",
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

export const _enforce_unity: Scene = {
  id: "enforce_unity",
  title: "Enforce party discipline.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reformist_dissent'] -= 8; state.flags['center_dissent'] -= 8; state.flags['labor_dissent'] -= 8; state.flags['left_dissent'] -= 8; state.flags['neorevisionist_dissent'] -= 8; state.flags['workers_spd'] -= (state.flags['dissent'] * 10); state.flags['new_middle_spd'] -= (state.flags['dissent'] * 5); state.flags['unemployed_spd'] -= (state.flags['dissent'] * 5); 
  },

  

  render: `
    Enforcing party discipline reduces dissent, but it could lead to an exit of dissenting members.
    # enforcing party discipline applies to all parties.
    # each party has a concessions action and an expulsions action.
  `,
  choices: [
    
  ]
};

export const _concessions_reformists: Scene = {
  id: "concessions_reformists",
  title: "Give concessions to the reformists.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reformist_dissent'] > 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['reformist_dissent'] -= 15; state.flags['left_dissent'] += 10; 
  },

  

  render: `
    We have promised to adopt a more reformist posture. This may alienate the left, however.
  `,
  choices: [
    
  ]
};

export const _concessions_center: Scene = {
  id: "concessions_center",
  title: "Give concessions to the centrists.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['center_dissent'] > 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['center_dissent'] -= 15; state.flags['reformist_dissent'] += 8; state.flags['left_dissent'] += 8; state.flags['neorevisionist_dissent'] += 8; 
  },

  

  render: `
    We have promised to take more policy suggestions from the centrists. Both the left and reformist wings of the party might be displeased.
  `,
  choices: [
    
  ]
};

export const _concessions_left: Scene = {
  id: "concessions_left",
  title: "Give concessions to the left.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['left_dissent'] > 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['left_dissent'] -= 15; state.flags['reformist_dissent'] += 10; state.flags['center_dissent'] += 5; 
  },

  

  render: `
    We have promised that we will listen to the left wing of the party. Of course, this leads to increased dissent from the reformists and centrists.
  `,
  choices: [
    
  ]
};

export const _concessions_labor: Scene = {
  id: "concessions_labor",
  title: "Give concessions to labor.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['labor_dissent'] > 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['labor_dissent'] -= 15; state.flags['center_dissent'] += 10; 
  },

  

  render: `
    The trade unions will be granted more influence in party decision making. This upsets the centrists, who would prefer to centralize political decision making within the party.
  `,
  choices: [
    
  ]
};

export const _concessions_neorevisionists: Scene = {
  id: "concessions_neorevisionists",
  title: "Give concessions to the neorevisionists.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['neorevisionist_dissent'] > 30 && state.flags['neorevisionism'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['neorevisionist_dissent'] -= 15; state.flags['center_dissent'] += 10; 
  },

  

  render: `
    Giving the neorevisionists more influence will cause increased dissent from the centrists.
  `,
  choices: [
    
  ]
};

export const _do_nothing: Scene = {
  id: "do_nothing",
  title: "Let the factions argue with themselves.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['labor_dissent'] += 1; state.flags['left_dissent'] += 1; state.flags['center_dissent'] += 1; state.flags['reformist_dissent'] += 1; 
  },

  

  render: `
    Let the factions bicker; perhaps dissent is healthy for the party.
  `,
  choices: [
    
  ]
};

export const _expel_reformists: Scene = {
  id: "expel_reformists",
  title: "Expel the dissident reformists.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reformist_dissent'] > 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _expel_left: Scene = {
  id: "expel_left",
  title: "Expel the dissident leftists.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['left_dissent'] > 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _expel_center: Scene = {
  id: "expel_center",
  title: "Expel the centrists.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['center_dissent'] > 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _expel_labor: Scene = {
  id: "expel_labor",
  title: "Expel the labor supporters.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['labor_dissent'] > 30);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _party_organizations: Scene = {
  id: "party_organizations",
  title: "Party Organizations",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['party_organizations_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['party_organizations_timer'] = 6; 
  },

  

  render: `
    #subtitle: Outside of electoral politics, the SPD runs a social world onto itself.
    = Party Organizations
    In addition to being a political party, the <span style="color: #c00000;">**SPD**</span> is a social world onto itself, with a vast array of associated organizations which serve the social needs of their members from cradle to grave.
  `,
  choices: [
    {
      id: "newspapers",
      text: "Fund more newspapers and journalists.",
      nextSceneId: "newspapers",
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
      text: "Fund more mutual aid and welfare programs.",
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
      id: "culture",
      text: "Fund sports leagues, educational, and cultural programs.",
      nextSceneId: "culture",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "rb",
      text: "Fund the Reichsbanner, our self-defense organization.",
      nextSceneId: "rb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "youth",
      text: "We have the reputation of being a party for old men. Support the youth organizations.",
      nextSceneId: "youth",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nothing",
      text: "Do not increase funding for any program.",
      nextSceneId: "nothing",
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

export const _newspapers: Scene = {
  id: "newspapers",
  title: "newspapers",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['media_timer'] = 0; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _welfare: Scene = {
  id: "welfare",
  title: "welfare",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['workers_aid'] += 1; state.flags['unemployed_spd'] += 5*(1 - state.flags['dissent']); 
  },

  

  render: `
    We have increased funding to Workers' Welfare. [? if black_thursday_seen > 0 : In an age of economic crisis, this will be helpful for improving our standing among the unemployed. ?]
  `,
  choices: [
    
  ]
};

export const _culture: Scene = {
  id: "culture",
  title: "culture",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['cultural_organizations'] += 1; state.flags['left_dissent'] -= 6; state.flags['center_dissent'] -= 6; state.flags['labor_dissent'] -= 6; state.flags['reformist_dissent'] -= 6; state.flags['neorevisionist_dissent'] -= 6; 
  },

  

  render: `
    It is not enough for the <span style="color: #c00000;">**SPD**</span> to solely be a political party. The Worker Singer's League, Worker's Sports, and our schools and libraries are crucial to our members' lives. Funding these organizations makes our members more committed to the party, even when our policies might not be to their liking.
    [? if sa_strength > 500 : However, it feels frivolous to spend on sports and choirs when the <span style="color: #7A3C00;">fascists</span> are murdering us in the streets. ?]
  `,
  choices: [
    
  ]
};

export const _rb: Scene = {
  id: "rb",
  title: "rb",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['rb_explode']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['rb_strength']  += 100; state.flags['rb_militancy'] += 0.01; state.flags['reichsbanner_timer'] = 0; state.flags['funded_reichsbanner'] += 1; 
  },

  

  render: `
    We have increased recruiting to the Reichsbanner.
  `,
  choices: [
    
  ]
};

export const _youth: Scene = {
  id: "youth",
  title: "youth",
  subtitle: "-1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (! state.flags['rb_explode']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['rb_strength'] += 50; state.flags['rb_militancy'] += 0.02; state.flags['young_socialists'] += 1; state.flags['left_strength'] += 5; state.flags['neorevisionist_strength'] += 5; state.flags['radicalization'] += 1; 
  },

  

  render: `
    Our new youth members flock to the left or neorevisionist wings of the party, and also bring new radicalism to the Reichsbanner.
  `,
  choices: [
    
  ]
};

export const _nothing: Scene = {
  id: "nothing",
  title: "nothing",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We do not fund any party organizations.
  `,
  choices: [
    {
      id: "return",
      text: "Continue...",
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

export const _peoples_party: Scene = {
  id: "peoples_party",
  title: "Building a People's Party",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['neorevisionism'] > 0 && state.flags['peoples_party_support'] >= 3 && state.flags['peoples_party'] == 0 && state.flags['peoples_party_timer'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['peoples_party_timer'] = 6; 
  },

  

  render: `
    #subtitle: Can the SPD move beyond the working class?
    = Building a People's Party
    Contrary to orthodox Marxist predictions, the industrial proletariat is not constantly increasing in size. The rapid growth of the "new middle class" of white-collar workers and the persistence of small farmers and the peasantry confound predictions of a working-class majority.
    In order to build a <span style="color: #c00000;">socialist</span> majority, many reformists and neorevisionists are calling for our party to move beyond the urban working class, to embrace the concerns of the middle class, farmers, and women of all classes. We can create a new and inclusive vision of the party that encompasses all people who work for a living, which is almost everyone in the country save the aristocrats and top capitalists.
  `,
  choices: [
    {
      id: "support_peoples_party",
      text: "Yes, we must become a people's party!",
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
      id: "build_support",
      text: "We must build additional support before becoming a people's party.",
      nextSceneId: "build_support",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "support_peoples_party_hard",
      text: "Despite strong opposition from the Center and Left factions, we will become a people's party.",
      nextSceneId: "support_peoples_party_hard",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "no_new_ideas",
      text: "No, we will always be a party of the working class.",
      nextSceneId: "no_new_ideas",
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
      text: "Perhaps we can discuss this at a later time.",
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

export const _build_support: Scene = {
  id: "build_support",
  title: "build_support",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['neorevisionist_strength'] + state.flags['reformist_strength'] < state.flags['left_strength'] + state.flags['center_strength']) || state.flags['peoples_party_support'] < 5);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['peoples_party_support'] += 1; state.flags['neorevisionist_strength'] += 5; state.flags['left_strength'] -= 5; state.flags['left_dissent'] += 5; 
  },

  

  render: `
    Within our party, we are pushing forward proposals for a people's party against the Left and Center.
  `,
  choices: [
    
  ]
};

export const _support_peoples_party: Scene = {
  id: "support_peoples_party",
  title: "support_peoples_party",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['neorevisionist_strength'] += 15; state.flags['reformist_strength'] += 15; state.flags['neorevisionist_dissent'] -= 10; state.flags['reformist_dissent'] -= 10; state.flags['peoples_party'] = 1; state.flags['workers_spd'] -= 12; state.flags['rural_spd'] += 10; state.flags['new_middle_spd'] += 10; state.flags['old_middle_spd'] += 8; state.flags['catholics_spd'] += 8; state.flags['left_dissent'] += 25; state.flags['center_dissent'] += 20; state.flags['kpd_relation'] -= 10; state.flags['kpd_coalition_dissent'] += 1; state.flags['coalition_dissent'] -= 1; state.flags['z_relation'] += 5*(1-state.flags['dissent']); state.flags['dvp_relation'] += 5*(1-state.flags['dissent']); state.flags['ddp_relation'] += 5*(1-state.flags['dissent']); state.flags['lvp_relation'] += 5*(1-state.flags['dissent']); state.flags['dvp_left'] += 3; state.flags['ddp_left'] += 3; state.flags['ddp_cohesion'] += 2; state.flags['lvp_left'] += 3; 
  },

  

  render: `
    In an emergency conference, we have decided to become a people's party that encompasses all of the regular people of Germany, not just the workers and urban poor. The Left and Center claim that our new party platform is a betrayal of our founding principles, a turn away from <span style="color: #9B0000;">Marxism</span> towards bourgeois opportunism. Whatever the case, we are now a party representing all of the people, not just the proletariat.
    Should we run a new campaign to publicize our new platform?
  `,
  choices: [
    {
      id: "campaign_workers",
      text: "campaign_workers",
      nextSceneId: "campaign_workers",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_middle",
      text: "campaign_middle",
      nextSceneId: "campaign_middle",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_rural",
      text: "campaign_rural",
      nextSceneId: "campaign_rural",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_unemployed",
      text: "campaign_unemployed",
      nextSceneId: "campaign_unemployed",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_women",
      text: "campaign_women",
      nextSceneId: "campaign_women",
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

export const _support_peoples_party_hard: Scene = {
  id: "support_peoples_party_hard",
  title: "support_peoples_party_hard",
  subtitle: "This will increase dissent.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return ((state.flags['neorevisionist_strength'] + state.flags['reformist_strength'] < state.flags['left_strength'] + state.flags['center_strength']) || (state.flags['peoples_party_support'] < 4));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['neorevisionist_strength'] += 10; state.flags['reformist_strength'] += 8; state.flags['peoples_party'] = 1; state.flags['workers_spd'] -= 15; state.flags['rural_spd'] += 10; state.flags['new_middle_spd'] += 10; state.flags['old_middle_spd'] += 8; state.flags['catholics_spd'] += 8; state.flags['left_dissent'] += 40; state.flags['center_dissent'] += 40; state.flags['kpd_relation'] -= 10; state.flags['kpd_coalition_dissent'] += 1; state.flags['coalition_dissent'] -= 1; state.flags['z_relation'] += 4*(1-state.flags['dissent']); state.flags['dvp_relation'] += 4*(1-state.flags['dissent']); state.flags['ddp_relation'] += 5*(1-state.flags['dissent']); state.flags['lvp_relation'] += 5*(1-state.flags['dissent']); state.flags['dvp_left'] += 2; state.flags['ddp_left'] += 2; state.flags['ddp_cohesion'] += 1.5; state.flags['lvp_left'] += 2; 
  },

  

  render: `
    It is an arduous and contentious process, but we have pushed through the proposal to become a people's party. The Left and Center claim that our new party platform is a betrayal of our founding principles, a turn away from <span style="color: #9B0000;">Marxism</span> towards bourgeois opportunism. Whatever the case, we are now a party representing all of the people, not just the proletariat.
    Should we run a new campaign to publicize our new platform?
  `,
  choices: [
    {
      id: "campaign_workers",
      text: "campaign_workers",
      nextSceneId: "campaign_workers",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_middle",
      text: "campaign_middle",
      nextSceneId: "campaign_middle",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_rural",
      text: "campaign_rural",
      nextSceneId: "campaign_rural",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_unemployed",
      text: "campaign_unemployed",
      nextSceneId: "campaign_unemployed",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_women",
      text: "campaign_women",
      nextSceneId: "campaign_women",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_catholics",
      text: "campaign_catholics",
      nextSceneId: "campaign_catholics",
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

export const _campaign_workers: Scene = {
  id: "campaign_workers",
  title: "Campaign among the workers, to assuage their doubts about our changes.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 6*(1-state.flags['dissent']); 
  },

  

  render: `
    The workers are still a key part of our constituency, and we must not alienate them in the transformation of our party.
  `,
  choices: [
    
  ]
};

export const _campaign_middle: Scene = {
  id: "campaign_middle",
  title: "Campaign among the middle classes.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['old_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 6*(1-state.flags['dissent']); 
  },

  

  render: `
    As a people's party, we represent the employees and small businesspeople of the middle class, and they are becoming receptive to our messages.
  `,
  choices: [
    
  ]
};

export const _campaign_rural: Scene = {
  id: "campaign_rural",
  title: "Campaign in rural areas.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rural_spd'] += 7*(1-state.flags['dissent']); 
  },

  

  render: `
    As a people's party, we represent farmers and rural workers as well, and they are becoming receptive to our messages.
  `,
  choices: [
    
  ]
};

export const _campaign_unemployed: Scene = {
  id: "campaign_unemployed",
  title: "Campaign among the unemployed.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['unemployed_spd'] += 6*(1-state.flags['dissent']); 
  },

  

  render: `
    As a people's party, the urban poor are still a key part of our constituency.
  `,
  choices: [
    
  ]
};

export const _campaign_women: Scene = {
  id: "campaign_women",
  title: "Campaign among women of all classes.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['rural_spd'] += 3*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); 
  },

  

  render: `
    As a people's party, we represent women of all classes.
  `,
  choices: [
    
  ]
};

export const _campaign_catholics: Scene = {
  id: "campaign_catholics",
  title: "Campaign among political Catholics.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['catholics_spd'] += 7*(1-state.flags['dissent']); 
  },

  

  render: `
    Catholics have historically been tied to the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?], but there is no reason why our party cannot appeal to them. The Prussian Concordat in particular is a sign of our friendship with Catholicism.
  `,
  choices: [
    
  ]
};

export const _no_new_ideas_2: Scene = {
  id: "no_new_ideas",
  title: "no_new_ideas",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['neorevisionist_strength'] -= 6; state.flags['neorevisionist_dissent'] += 5; state.flags['center_strength'] += 8; state.flags['left_strength'] += 3; state.flags['peoples_party'] = 0; state.flags['peoples_party_support'] -= 3; 
  },

  

  render: `
    The <span style="color: #c00000;">Social Democrats</span> have been and will always be a party of the working class.
  `,
  choices: [
    
  ]
};

export const _peoples_party_campaigning: Scene = {
  id: "peoples_party_campaigning",
  title: "Campaigning (People's Party)",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    # basically, we can campaign as part of the people's party...
  `,
  choices: [
    {
      id: "campaign_workers",
      text: "campaign_workers",
      nextSceneId: "campaign_workers",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_middle",
      text: "campaign_middle",
      nextSceneId: "campaign_middle",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_rural",
      text: "campaign_rural",
      nextSceneId: "campaign_rural",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_unemployed",
      text: "campaign_unemployed",
      nextSceneId: "campaign_unemployed",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_women",
      text: "campaign_women",
      nextSceneId: "campaign_women",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "campaign_catholics",
      text: "campaign_catholics",
      nextSceneId: "campaign_catholics",
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

export const _campaign_workers_2: Scene = {
  id: "campaign_workers",
  title: "Campaign among the workers, to assuage their doubts about our changes.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 5*(1-state.flags['dissent']); 
  },

  

  render: `
    The workers are still a key part of our constituency, and we must not alienate them in the transformation of our party.
  `,
  choices: [
    
  ]
};

export const _campaign_middle_2: Scene = {
  id: "campaign_middle",
  title: "Campaign among the middle classes.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['old_middle_spd'] += 5*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 5*(1-state.flags['dissent']); 
  },

  

  render: `
    As a people's party, we represent the employees and small businesspeople of the middle class, and they are becoming receptive to our messages.
  `,
  choices: [
    
  ]
};

export const _campaign_rural_2: Scene = {
  id: "campaign_rural",
  title: "Campaign in rural areas.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rural_spd'] += 6*(1-state.flags['dissent']); 
  },

  

  render: `
    As a people's party, we represent farmers and rural workers as well, and they are becoming receptive to our messages.
  `,
  choices: [
    
  ]
};

export const _campaign_unemployed_2: Scene = {
  id: "campaign_unemployed",
  title: "Campaign among the unemployed.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['unemployed_spd'] += 5*(1-state.flags['dissent']); 
  },

  

  render: `
    As a people's party, the urban poor are still a key part of our constituency.
  `,
  choices: [
    
  ]
};

export const _campaign_women_2: Scene = {
  id: "campaign_women",
  title: "Campaign among women of all classes.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 3*(1-state.flags['dissent']); state.flags['rural_spd'] += 3*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); 
  },

  

  render: `
    As a people's party, we represent women of all classes.
  `,
  choices: [
    
  ]
};

export const _campaign_catholics_2: Scene = {
  id: "campaign_catholics",
  title: "Campaign among political Catholics.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['catholics_spd'] += 5*(1-state.flags['dissent']); 
  },

  

  render: `
    Catholics have historically been tied to the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?], but there is no reason why our party cannot appeal to them. The Prussian Concordat in particular is a sign of our friendship with Catholicism.
  `,
  choices: [
    
  ]
};

export const _rally: Scene = {
  id: "rally",
  title: "Political Rally",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rally_timer'] <= 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1;if (state.flags['next_election_time'] - state.flags['time'] > 6 && ! (state.flags['year'] == 1928 && state.flags['month'] == 1)) { state.flags['rally_timer'] = 6; };if ((state.flags['year'] == 1928 && state.flags['month'] == 1) || (state.flags['next_election_time'] - state.flags['time'] <= 6)) { state.flags['rally_timer'] = 2; } 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _sa_disrupt: Scene = {
  id: "sa_disrupt",
  title: "sa_disrupt",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The <span style="color: #7A3C00;">Nazi</span> <span style="color: #7A3C00;">**SA**</span> has disrupted our rally! Their street troops are preventing us from meeting.
  `,
  choices: [
    {
      id: "police_protect",
      text: "Call the police to protect our rally.",
      nextSceneId: "police_protect",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "rb_protect",
      text: "Use the Reichsbanner to protect our rally.",
      nextSceneId: "rb_protect",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "both_protect",
      text: "The police and Reichsbanner should work together to protect our rally.",
      nextSceneId: "both_protect",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cancel",
      text: "Cancel the rally.",
      nextSceneId: "cancel",
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

export const _police_protect: Scene = {
  id: "police_protect",
  title: "police_protect",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussia_leader'] == "Braun" || state.flags['prussia_leader'] == "Rosenfeld");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['police_protect_success'] = state.flags['prussian_police_loyalty'] * state.flags['prussian_police_militancy'] * state.flags['prussian_police_strength']*2 - state.flags['sa_militancy']*state.flags['sa_strength']; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _police_protect_win: Scene = {
  id: "police_protect_win",
  title: "police_protect_win",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The police successfully protected our rally, so it can go ahead as usual.
  `,
  choices: [
    
  ]
};

export const _police_protect_lose: Scene = {
  id: "police_protect_lose",
  title: "police_protect_lose",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_nsdap'] += 3; state.flags['strife'] += 1; 
  },

  

  render: `
    Unfortunately, the police were unable or unwilling to hold back the <span style="color: #7A3C00;">**SA**</span> mob. The <span style="color: #7A3C00;">Nazis</span> have won this show of strength.
  `,
  choices: [
    
  ]
};

export const _rb_protect: Scene = {
  id: "rb_protect",
  title: "rb_protect",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rb_success'] = state.flags['rb_strength']*state.flags['rb_militancy'] - state.flags['sa_strength']*state.flags['sa_militancy']; state.flags['strife'] += 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _rb_protect_win: Scene = {
  id: "rb_protect_win",
  title: "rb_protect_win",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The Reichsbanner has successfully protected our rally against the <span style="color: #7A3C00;">**SA**</span>! Our meeting can go ahead as usual.
  `,
  choices: [
    
  ]
};

export const _rb_protect_lose: Scene = {
  id: "rb_protect_lose",
  title: "rb_protect_lose",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_nsdap'] += 3; state.flags['rb_strength'] -= 50; 
  },

  

  render: `
    Unfortunately, the Reichsbanner was not able to hold back the <span style="color: #7A3C00;">**SA**</span> mob. The <span style="color: #7A3C00;">Nazis</span> have won this show of strength.
  `,
  choices: [
    
  ]
};

export const _both_protect: Scene = {
  id: "both_protect",
  title: "both_protect",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussia_leader'] == "Braun" || state.flags['prussia_leader'] == "Rosenfeld");
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rb_success'] = state.flags['rb_strength']*state.flags['rb_militancy'] - state.flags['sa_strength']*state.flags['sa_militancy'] + state.flags['prussian_police_loyalty']*state.flags['prussian_police_militancy']*state.flags['prussian_police_strength']*2; state.flags['strife'] += 1; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _both_protect_win: Scene = {
  id: "both_protect_win",
  title: "both_protect_win",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The police and Reichsbanner have successfully protected our rally against the <span style="color: #7A3C00;">**SA**</span>! Our meeting can go ahead as usual.
  `,
  choices: [
    
  ]
};

export const _both_protect_lose: Scene = {
  id: "both_protect_lose",
  title: "both_protect_lose",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_nsdap'] += 3; state.flags['rb_strength'] -= 50; 
  },

  

  render: `
    Unfortunately, the police and Reichsbanner were not able to hold back the <span style="color: #7A3C00;">**SA**</span> mob. The <span style="color: #7A3C00;">Nazi</span> have won this show of strength.
  `,
  choices: [
    
  ]
};

export const _cancel: Scene = {
  id: "cancel",
  title: "cancel",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_nsdap'] += 3; 
  },

  

  render: `
    The <span style="color: #7A3C00;">**SA**</span> have won this show of strength.
  `,
  choices: [
    
  ]
};

export const _main_rally: Scene = {
  id: "main_rally",
  title: "main_rally",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    Mass rallies are a common feature of <span style="color: #c00000;">social democratic</span> life, especially in the lead-up to an election. What is the primary theme of this rally?
  `,
  choices: [
    {
      id: "class_struggle",
      text: "The class struggle of the proletariat against the bourgeoisie.",
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
      id: "welfare",
      text: "Sozialpolitik - the maintenance and expansion of social welfare programs.",
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
      id: "democracy",
      text: "Expanding our nascent democracy and defending it against <span style=\"color: #808080;\">dictatorship</span> and <span style=\"color: #7A3C00;\">fascism</span>.",
      nextSceneId: "democracy",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "pacifism",
      text: "Opposing war, nationalism, and militarism at all costs.",
      nextSceneId: "pacifism",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "wtb",
      text: "Support the WTB plan!",
      nextSceneId: "wtb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "local",
      text: "A mixture of various local and national concerns that resonate most with the audience.",
      nextSceneId: "local",
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

export const _class_struggle_2: Scene = {
  id: "class_struggle",
  title: "class_struggle",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 4*(1-state.flags['dissent']);if (state.flags['nationalization_adopted']) { state.flags['workers_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['nationalization_adopted']) { state.flags['unemployed_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['left_strength'] > state.flags['reformist_strength']) { state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['nationalization_progress'] > 0) { state.flags['workers_spd'] += 4*(1-state.flags['dissent']); };if (state.flags['nationalization_progress'] > 0) { state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); }; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 5; state.flags['old_middle_spd'] -= 3; state.flags['new_middle_spd'] -= 2; state.flags['dvp_right'] += 0.5; state.flags['ddp_right'] += 0.5; state.flags['lvp_right'] += 0.5; 
  },

  

  render: `
    Our message of class struggle appeals to the left wing of the working class, while potentially alienating the middle class. [? if nationalization_adopted :  The adoption of the Left’s nationalization plan has done much to revitalize worker enthusiasm. ?][? if nationalization_progress > 0 : Our achievements in nationalization have assisted our messaging. ?]
  `,
  choices: [
    
  ]
};

export const _welfare_2: Scene = {
  id: "welfare",
  title: "welfare",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 3*(1-state.flags['dissent']);if (state.flags['welfare'] > 0) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['welfare'] > 0) { state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['welfare'] > 1) { state.flags['unemployed_spd'] += 4*(1-state.flags['dissent']); }; state.flags['reformist_strength'] += 3; state.flags['labor_strength'] += 4; state.flags['reformist_dissent'] -= 3; state.flags['labor_dissent'] -= 3; 
  },

  

  render: `
    The reformist message appeals to the organized workers, whose benefits are the accomplishments of <span style="color: #c00000;">social democracy</span>. [? if welfare > 1 : Our achievements in expanding welfare have made this message more effective. ?]
  `,
  choices: [
    
  ]
};

export const _democracy: Scene = {
  id: "democracy",
  title: "democracy",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['democratization'] += 1; state.flags['pro_republic'] += 3*(1 - state.flags['dissent']);if (state.flags['democratization'] >= 3) { state.flags['workers_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 3) { state.flags['unemployed_spd'] += 1*(1-state.flags['dissent']); };if (state.flags['democratization'] >= 3) { state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['pro_republic'] >= 70) { state.flags['ddp_left'] += 0.5; };if (state.flags['pro_republic'] >= 70) { state.flags['lvp_left'] += 0.5; } 
  },

  

  render: `
    Our speakers defend the <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> system and rail against the <span style="color: #808080;">monarchists</span> and <span style="color: #7A3C00;">authoritarians</span> who threaten it.
    [? if democratization < 3 : Talk of democracy does not excite the workers as much as more practical issues. But that may change; part of our job is to provide political education to the proletariat. ?]
    [? if democratization >= 3 : Since we have consistently made democratization a theme of our campaign, the workers are enthusiastic about our message. ?]
  `,
  choices: [
    
  ]
};

export const _pacifism_2: Scene = {
  id: "pacifism",
  title: "pacifism",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pacifism'] += 1; state.flags['nationalism'] -= 3*(1 - state.flags['dissent']);if (state.flags['pacifism'] >= 3) { state.flags['workers_spd'] += 2*(1 - state.flags['dissent']); };if (state.flags['pacifism'] >= 3) { state.flags['unemployed_spd'] += 1*(1-state.flags['dissent']); };if (state.flags['pacifism'] >= 3) { state.flags['nationalism'] -= 3*(1-state.flags['dissent']); };if (state.flags['pacifism'] >= 3) { state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); };if ((state.flags['pacifism'] >= 3 && state.flags['nationalism'] <= 50)) { state.flags['ddp_left'] += 0.5; } 
  },

  

  render: `
    Our speakers denounce the military establishment and all the spending entering that black hole. Some adventurous speakers question the responsibility of the military elites in organizing the Great War.
    [? if pacifism < 3 : Given the volume of nationalist indoctrination in our society, it is difficult to argue so vehemently against the military. ?]
    [? if pacifism >= 3 : Since we have consistently made pacifism a theme of our campaign, the workers are enthusiastic about our message. ?]
  `,
  choices: [
    
  ]
};

export const _wtb_3: Scene = {
  id: "wtb",
  title: "wtb",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wtb_adopted'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); state.flags['rural_spd'] += 1*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 1*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 1*(1-state.flags['dissent']);if (state.flags['wtb_implemented']) { state.flags['workers_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['wtb_implemented']) { state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); };if (state.flags['wtb_implemented']) { state.flags['rural_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['wtb_implemented']) { state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); };if (state.flags['wtb_implemented']) { state.flags['old_middle_spd'] += 2*(1-state.flags['dissent']); }; state.flags['wtb_rally'] += 1; 
  },

  

  render: `
    The WTB plan has become a popular rallying cry for our party. The workers are eager to go back to work, and that is exactly what the plan promises. [? if not wtb_implemented: However, many still believe that the plan is merely an empty slogan and will remain skeptical until we actually implement it. ?]
  `,
  choices: [
    
  ]
};

export const _local: Scene = {
  id: "local",
  title: "local",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += 3*(1-state.flags['dissent']); state.flags['old_middle_spd'] += 1*(1-state.flags['dissent']); state.flags['new_middle_spd'] += 2*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 3*(1-state.flags['dissent']); 
  },

  

  render: `
    Our speakers have gauged the mood and are speaking to the issues that seem to most affect the workers in this moment.
  `,
  choices: [
    
  ]
};

export const _reichsbanner: Scene = {
  id: "reichsbanner",
  title: "Reichsbanner",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['reichsbanner_timer'] <= 0 && ! state.flags['rb_explode']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['reichsbanner_timer'] += 6;if (state.flags['rb_militancy'] > 0.1) { state.flags['rb_militarization_cost'] = 2; } else { state.flags['rb_militarization_cost'] = 1; };if (state.flags['rb_militancy'] > 0.25) { state.flags['rb_militarization_cost'] = 3; } 
  },

  

  render: `
    #subtitle: Paramilitary organizing in defense of the republic.
    = Reichsbanner
    The *Reichsbanner* <span style="color: #000000;"><b><i>Schwarz</i></b></span>-<span style="color: #DD0000;"><b><i>Rot</i></b></span>-<span style="color: #FFCC00;"><b><i>Gold</i></b></span> is a mass organization for the defense of the Republic against the extremists who threaten it. Some would call it a paramilitary, although currently it is hardly any sort of military. It is officially associated with the pro-democratic parties -the <span style="color: #c00000;">**SPD**</span>, [? if z_party_name != "CVP": <span style="color: #000000;">Center</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?], and <span style="color: #D3C24D;">**[+ ddp_name +]**</span>, but by far the largest component is with the <span style="color: #c00000;">**SPD**</span>.
    [? if workers_spd < 46 or workers_spd < workers_nsdap or workers_spd < workers_kpd : The Reichsbanner is having a more difficult time recruiting, as the <span style="color: #c00000;">**SPD**</span> is no longer the dominant party among the workers. Many of its members have left. ?]
    #- Orient reichsbanner towards anti-fascism (only available if we have prioritized anti fascism)
  `,
  choices: [
    {
      id: "militant",
      text: "Fund more military-style training and equipment for the Reichsbanner.",
      nextSceneId: "militant",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "militant_2",
      text: "Use our existing resources to support more training for the Reichsbanner.",
      nextSceneId: "militant_2",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "same",
      text: "Keep the Reichsbanner as it is.",
      nextSceneId: "same",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "cut_rb",
      text: "Cut funding for the Reichsbanner.",
      nextSceneId: "cut_rb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "women_rb",
      text: "women_rb",
      nextSceneId: "women_rb",
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

export const _militant: Scene = {
  id: "militant",
  title: "militant",
  subtitle: "-[+ rb_militarization_cost +] resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= state.flags['rb_militarization_cost']; state.flags['rb_investment'] += 1; state.flags['rb_strength'] += 100; state.flags['rb_militancy'] += 0.05; state.flags['left_strength'] += 2; state.flags['left_dissent'] -= 2; state.flags['reformist_dissent'] += 5; state.flags['spd_militancy'] += 0.05; state.flags['workers_spd'] += 2*(1-state.flags['dissent']); state.flags['unemployed_spd'] += 2*(1-state.flags['dissent']);if (state.flags['strife'] < 5) { state.flags['z_relation'] -= 3; };if (state.flags['strife'] < 5) { state.flags['ddp_relation'] -= 3; };if (state.flags['strife'] < 5) { state.flags['lvp_relation'] -= 3; } 
  },

  

  render: `
    Some in our party decry the increasing militarization of the Reichsbanner. They say it is emulating the <span style="color: #3E88B3;">right-wing nationalists</span> or the <span style="color: #700000;">communists</span>, and risks alienating our allies in the centrist parties. On the other hand, more left-leaning radicals are being lured to our organizations, away from the <span style="color: #700000;">communists</span>.
    [? if not cvp_leave_reichsbanner and not rb_exit: [? if strife < 5: The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] decries the militarization of the Reichsbanner, and its members are leaving the <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> organization. ?][? if strife >= 5: Seeing the strife that has filled Germany's streets, the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] and [? if not lvp_formed:<span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed:<span style="color: #FFCC00;">**LVP**</span>?] seem to be convinced that it is necessary for the Reichsbanner to be militarized, and mute their criticisms. ?] ?]
  `,
  choices: [
    
  ]
};

export const _militant_2: Scene = {
  id: "militant_2",
  title: "militant_2",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['funded_reichsbanner'] >= 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rb_militancy'] += 0.02; state.flags['funded_reichsbanner'] -= 1; 
  },

  

  render: `
    As we have already funded resources towards the Reichsbanner, we can invest in building up their militancy. 
  `,
  choices: [
    
  ]
};

export const _same: Scene = {
  id: "same",
  title: "same",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The Reichsbanner is already serving the purpose it needs to serve. There is no reason to change what already works.
  `,
  choices: [
    {
      id: "return",
      text: "Continue...",
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

export const _cut_rb: Scene = {
  id: "cut_rb",
  title: "cut_rb",
  subtitle: "+1 resources",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] += 1; state.flags['rb_strength'] -= 100; state.flags['rb_militancy'] -= 0.05; state.flags['left_strength'] -= 2; state.flags['left_dissent'] -= 2; state.flags['spd_militancy'] -= 0.05; state.flags['workers_kpd'] += 2; state.flags['unemployed_kpd'] += 2; 
  },

  

  render: `
    Cutting resources to the Reichsbanner causes a drop in the membership, and leads some would-be members to join the <span style="color: #700000;">Communists</span> instead.
  `,
  choices: [
    
  ]
};

export const _women_rb: Scene = {
  id: "women_rb",
  title: "Allow women to join the Reichsbanner.",
  subtitle: "-1 resources - This might cause a backlash from existing members.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['womens_rights'] >= 4 && state.flags['sender_advisor'] == 1 && state.flags['iron_front_formed'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= 1; state.flags['rb_militancy'] *= 0.85; state.flags['rb_strength'] += 400; state.flags['women_in_rb'] = 1;if (state.flags['repealed_175']) { state.flags['rb_militancy'] += 0.05; };if (state.flags['trans_rights']) { state.flags['rb_militancy'] += 0.04; };if (state.flags['reformed_183']) { state.flags['rb_militancy'] += 0.02; }; 
  },

  

  render: `
    The suggestion to allow women into the Reichsbanner is ridiculed by most, except for Toni Sender. But this is an exceptional time, and we need anyone who is willing to join. Thus, we organize specialized units for women, [? if homosexual_rights > 0: and even some covert units for <span style="color: deepskyblue;">tran</span><span style="color: linen;">sse</span><span style="color: lightpink;">xuals</span> and <span style="color: red;">ho</span><span style="color: orange;">m</span><span style="color: yellow;">os</span><span style="color: green;">ex</span><span style="color: blue;">ua</span><span style="color: purple;">ls</span>?].
    After allowing women to join, the number of comrades who leave is more than balanced out by the number of radicalized women and others who join. However, many of our departed members were veterans, and many of the new members have no experience with military-style training.
  `,
  choices: [
    
  ]
};

export const _homosexual: Scene = {
  id: "homosexual",
  title: "homosexual",
  
  
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

export const _response_to_antisemitism: Scene = {
  id: "response_to_antisemitism",
  title: "Confronting Antisemitism",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['iron_front_formed'] == 1 && state.flags['nazi_urgency'] >= 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['confronting_antisemitism'] += 1; state.flags['month_actions'] += 1; 
  },

  

  render: `
    = Confronting Antisemitism
    Antisemitism has long been a latent feature of German society, but since the beginning of the economic depression, it has grown to a horrifying extent. The <span style="color: #7A3C00;">Nazis</span> are the worst of it, but all the right-wing parties are deeply antisemitic. Regarding the <span style="color: #c00000;">**SPD**</span> specifically, our right-wing enemies love to deploy their racist rhetoric against our many <span style="color: #005EB8;">Jewish</span> comrades, magnifying criticism of any minor transgression, and they call the entire <span style="color: #c00000;">**SPD**</span> a <span style="color: #005EB8;">Jewish</span> party. We are a favorite target of their invectives.
  `,
  choices: [
    {
      id: "socialism_of_fools",
      text: "Antisemitism is the \"<span style=\"color: #c00000;\">socialism</span> of <span style=\"color: #7A3C00;\">fools</span>\". We will defeat them with real <span style=\"color: #c00000;\">socialism</span>.",
      nextSceneId: "socialism_of_fools",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "if",
      text: "Antisemitism is a crisis. Direct the full force of the <span style=\"color: #c00000;\">Iron</span> <span style=\"color: #1A1A1A;\">Front</span> against antisemitism.",
      nextSceneId: "if",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "all",
      text: "All Germans will suffer from <span style=\"color: #7A3C00;\">fascism</span>, not just the <span style=\"color: #005EB8;\">Jews</span>. We do not need a separate policy for them.",
      nextSceneId: "all",
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

export const _socialism_of_fools: Scene = {
  id: "socialism_of_fools",
  title: "socialism_of_fools",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    The best policy to deal with this sort of irrational, senseless hatred is to ignore it. Few are swayed by racist rhetoric; the best way to combat it is to provide economic security so that people do not turn to antisemitism.
  `,
  choices: [
    
  ]
};

export const _if: Scene = {
  id: "if",
  title: "if",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['confronting_antisemitism'] += 2; state.flags['sa_strength'] -= 20; state.flags['democratization'] += 1; state.flags['pacifism'] += 1; state.flags['nationalism'] -= 5*(1-state.flags['dissent']); state.flags['workers_nsdap'] -= 6*(1-state.flags['dissent']); 
  },

  

  render: `
    We develop an entire campaign against antisemitism under the auspices of the <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span>. Hopefully our campaign can sway the workers away from <span style="color: #7A3C00;">Nazism</span>.
  `,
  choices: [
    
  ]
};

export const _all_2: Scene = {
  id: "all",
  title: "all",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    We do not need any special treatment for minorities.
  `,
  choices: [
    
  ]
};

export const _shuffle_leadership: Scene = {
  id: "shuffle_leadership",
  title: "Shuffle Leadership",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['shuffle_leadership_timer'] == 0 && state.flags['difficulty'] >= 0 && ! state.flags['started']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_activities'] += 1; state.flags['shuffle_leadership_timer'] = 10; 
  },

  

  render: `
    ###################### removing leaders
  `,
  choices: [
    {
      id: "rm_main",
      text: "Remove advisors",
      nextSceneId: "rm_main",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "add_advisors",
      text: "Add advisors",
      nextSceneId: "add_advisors",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "remove_none",
      text: "Don't change advisors.",
      nextSceneId: "remove_none",
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

export const _rm_main: Scene = {
  id: "rm_main",
  title: "Remove advisors.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.last_time_check = Q.time;
if (Q.time > Q.last_time_check) {
    Q.advisor_1 = [];
    for (let key in Q) {
        if (key.endsWith('_advisor') && Q[key] === 1) {
            Q.advisor_1.push(key.replace('_advisor', ''));
        }
    }
}
console.log(Q.advisor_1); 
  },

  

  render: `
    The <span style="color: #c00000;">**SPD**</span> is a diverse and <span class="tooltip-text" title="good mod">dynamic</span> party, but its internal divisions cause factional dissent to gradually increase over time. [? if nsdap_votes >= 20: However, the threat posed by the <span style="color: #7A3C00;">**NSDAP**</span> to the Republic has quieted much of the internal bickering. ?]
    Appointing individual advisors will boost their respective faction’s loyalty and influence, at the cost of increasing resentment among the sidelined factions. 
    {!<span class="tooltip-text" title="The Left is interested in radical, transformative policies and cooperation with the KPD.">Left</span>!} strength: [+ left_strength : strength +], dissent: [+ left_dissent : dissent +]
    {!<span class="tooltip-text" title="The Center is a faction of Center Marxists, between reform and revolution.">Center</span>!} strength: [+ center_strength : strength +], dissent: [+ center_dissent : dissent +]
    {!<span class="tooltip-text" title="Labor's goal is economic reform and benefits for organized workers.">Labor</span>!} strength: [+ labor_strength : strength +], dissent: [+ labor_dissent : dissent +]
    {!<span class="tooltip-text" title="Reformists are pragmatic participants in government, and seek to expand the welfare state and defend democracy.">Reformist</span>!} strength: [+ reformist_strength : strength +], dissent: [+ reformist_dissent : dissent +]
  `,
  choices: [
    
  ]
};

export const _rm_main_menu: Scene = {
  id: "rm_main_menu",
  title: "rm_main_menu",
  
  
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
      id: "remove_advisor",
      text: "remove_advisor",
      nextSceneId: "remove_advisor",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "add_advisors",
      text: "Add advisors",
      nextSceneId: "add_advisors",
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

export const _remove_none: Scene = {
  id: "remove_none",
  title: "Stop changing advisors.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.advisor_2 = [];
for (let key in Q) {
    if (key.endsWith('_advisor') && Q[key] === 1) {
        Q.advisor_2.push(key.replace('_advisor', ''));
    }
}
console.log(Q.advisor_2)
function arraysAreEqual(arr1, arr2) {
    if (state.flags['arr1'].length !== state.flags['arr2'].length) return false;
    for (let i = 0; i < state.flags['arr1'].length; i++) {
        if (state.flags['arr1'][i] !== state.flags['arr2'][i]) return false;
    }
    return true;
}
if (arraysAreEqual(Q.advisor_1, Q.advisor_2)) {
    Q.shuffle_leadership_timer = 0;
} 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _remove_hilferding: Scene = {
  id: "remove_hilferding",
  title: "Remove Hilferding",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['hilferding_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['hilferding_advisor'] = 0; state.flags['center_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Hilferding has been removed as an advisor. The Centrist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_wels: Scene = {
  id: "remove_wels",
  title: "Remove Wels",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wels_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['wels_advisor'] = 0; state.flags['center_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Wels has been removed as an advisor. The Centrist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_muller: Scene = {
  id: "remove_muller",
  title: "Remove Müller",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['muller_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['muller_advisor'] = 0; state.flags['center_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Müller has been removed as an advisor. The Centrist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_breitscheid: Scene = {
  id: "remove_breitscheid",
  title: "Remove Breitscheid",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['breitscheid_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['breitscheid_advisor'] = 0; state.flags['center_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Breitscheid has been removed as an advisor. The Centrist faction disapproves.
    # reformists
  `,
  choices: [
    
  ]
};

export const _remove_severing: Scene = {
  id: "remove_severing",
  title: "Remove Severing",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['severing_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['severing_advisor'] = 0; state.flags['reformist_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Severing has been removed as an advisor. The Reformist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_braun: Scene = {
  id: "remove_braun",
  title: "Remove Braun",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['braun_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['braun_advisor'] = 0; state.flags['reformist_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Braun has been removed as an advisor. The Reformist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_juchacz: Scene = {
  id: "remove_juchacz",
  title: "Remove Juchacz",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['juchacz_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['juchacz_advisor'] = 0; state.flags['reformist_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Juchacz has been removed as an advisor. The Reformist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_pfulf: Scene = {
  id: "remove_pfulf",
  title: "Remove Pfülf",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['pfulf_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pfulf_advisor'] = 0; state.flags['reformist_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Pfülf has been removed as an advisor. The Reformist faction disapproves.
    # labor
  `,
  choices: [
    
  ]
};

export const _remove_leipart: Scene = {
  id: "remove_leipart",
  title: "Remove Leipart",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['leipart_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['leipart_advisor'] = 0; state.flags['labor_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Leipart has been removed as an advisor. The Labor faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_aufhauser: Scene = {
  id: "remove_aufhauser",
  title: "Remove Aufhäuser",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['aufhauser_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['aufhauser_advisor'] = 0; state.flags['labor_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Aufhäuser has been removed as an advisor. The Labor faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_wissell: Scene = {
  id: "remove_wissell",
  title: "Remove Wissell",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wissell_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['wissell_advisor'] = 0; state.flags['labor_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Wissell has been removed as an advisor. The Labor faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_woytinsky: Scene = {
  id: "remove_woytinsky",
  title: "Remove Woytinsky",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['woytinsky_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['woytinsky_advisor'] = 0; state.flags['labor_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Woytinsky has been removed as an advisor. The Labor faction disapproves.
    # left
  `,
  choices: [
    
  ]
};

export const _remove_levi: Scene = {
  id: "remove_levi",
  title: "Remove Levi",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['levi_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['levi_advisor'] = 0; state.flags['left_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Levi has been removed as an advisor. The Leftist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_sender: Scene = {
  id: "remove_sender",
  title: "Remove Sender",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sender_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sender_advisor'] = 0; state.flags['left_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Sender has been removed as an advisor. The Leftist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_rosenfeld: Scene = {
  id: "remove_rosenfeld",
  title: "Remove Rosenfeld",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rosenfeld_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rosenfeld_advisor'] = 0; state.flags['left_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Rosenfeld has been removed as an advisor. The Leftist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_seydewitz: Scene = {
  id: "remove_seydewitz",
  title: "Remove Seydewitz",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['seydewitz_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['seydewitz_advisor'] = 0; state.flags['left_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Seydewitz has been removed as an advisor. The Leftist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_siemsen: Scene = {
  id: "remove_siemsen",
  title: "Remove Siemsen",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['siemsen_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['siemsen_advisor'] = 0; state.flags['left_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Siemsen has been removed as an advisor. The Leftist faction disapproves.
    # neorevisionists
  `,
  choices: [
    
  ]
};

export const _remove_mierendorff: Scene = {
  id: "remove_mierendorff",
  title: "Remove Mierendorff",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['mierendorff_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['mierendorff_advisor'] = 0; state.flags['neorevisionist_dissent'] += 10; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Mierendorff has been removed as an advisor. The Neorevisionist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_leber: Scene = {
  id: "remove_leber",
  title: "Remove Leber",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['leber_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['leber_advisor'] = 0; state.flags['neorevisionist_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Leber has been removed as an advisor. The Neorevisionist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_schumacher: Scene = {
  id: "remove_schumacher",
  title: "Remove Schumacher",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['schumacher_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schumacher_advisor'] = 0; state.flags['neorevisionist_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Schumacher has been removed as an advisor. The Neorevisionist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_wirth: Scene = {
  id: "remove_wirth",
  title: "Remove Wirth",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wirth_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['wirth_advisor'] = 0; state.flags['neorevisionist_dissent'] += 7; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Wirth has been removed as an advisor. The Neorevisionist faction disapproves.
    ## nonfactional
    # tbh I'm not sure if Baade should be a reformist or nonfactional. same for stampfer. they were vaguely reformist-aligned but had pretty different ideas from the other reformists here. so they're non-factional.
  `,
  choices: [
    
  ]
};

export const _remove_baade: Scene = {
  id: "remove_baade",
  title: "Remove Baade",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['baade_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['baade_advisor'] = 0; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Baade has been removed as an advisor.
    #The Reformist faction disapproves.
  `,
  choices: [
    
  ]
};

export const _remove_hirschfeld: Scene = {
  id: "remove_hirschfeld",
  title: "Remove Hirschfeld",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['hirschfeld_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['hirschfeld_advisor'] = 0; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Hirschfeld has been removed as an advisor. 
  `,
  choices: [
    
  ]
};

export const _remove_stampfer: Scene = {
  id: "remove_stampfer",
  title: "Remove Stampfer",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['stampfer_advisor'] == 1 && ! state.flags['stampfer_killed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['stampfer_advisor'] = 0; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Stampfer has been removed as an advisor. 
  `,
  choices: [
    
  ]
};

export const _remove_radbruch: Scene = {
  id: "remove_radbruch",
  title: "Remove Radbruch",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['radbruch_advisor'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['radbruch_advisor'] = 0; state.flags['n_advisors'] -= 1; 
  },

  

  render: `
    Radbruch has been removed as an advisor. 
    ####################### adding advisors
  `,
  choices: [
    
  ]
};

export const _add_advisors: Scene = {
  id: "add_advisors",
  title: "Add advisors",
  
  
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

export const _advisor_menu: Scene = {
  id: "advisor_menu",
  title: "Add other advisors.",
  
  
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
      id: "centrist",
      text: "Add Centrists",
      nextSceneId: "centrist",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "left",
      text: "Add Leftists",
      nextSceneId: "left",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "reformist",
      text: "Add Reformists",
      nextSceneId: "reformist",
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
      text: "Add Labor",
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
      id: "neorev",
      text: "Add Neorevisionists",
      nextSceneId: "neorev",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "nonfactional",
      text: "Add non-factional advisors",
      nextSceneId: "nonfactional",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "rm_main",
      text: "Remove advisors instead.",
      nextSceneId: "rm_main",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "remove_none",
      text: "Stop changing advisors.",
      nextSceneId: "remove_none",
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

export const _centrist_2: Scene = {
  id: "centrist",
  title: "centrist",
  subtitle: "The glue holding the party together. Reduces faction loyalty decay by 30% for each advisor appointed.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "center_advisor",
      text: "center_advisor",
      nextSceneId: "center_advisor",
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

export const _reformist: Scene = {
  id: "reformist",
  title: "reformist",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "reformist_advisor",
      text: "reformist_advisor",
      nextSceneId: "reformist_advisor",
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

export const _left: Scene = {
  id: "left",
  title: "left",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "left_advisor",
      text: "left_advisor",
      nextSceneId: "left_advisor",
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
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "labor_advisor",
      text: "labor_advisor",
      nextSceneId: "labor_advisor",
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

export const _neorev: Scene = {
  id: "neorev",
  title: "neorev",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['neorevisionism'] > 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "neorev_advisor",
      text: "neorev_advisor",
      nextSceneId: "neorev_advisor",
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

export const _nonfactional: Scene = {
  id: "nonfactional",
  title: "nonfactional",
  subtitle: "Generally disinterested in internal struggles. Reduces faction loyalty decay by 10% for each advisor appointed.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    
  `,
  choices: [
    {
      id: "nonfactional_advisor",
      text: "nonfactional_advisor",
      nextSceneId: "nonfactional_advisor",
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

export const _add_hilferding: Scene = {
  id: "add_hilferding",
  title: "Rudolf Hilferding",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['hilferding_advisor'] == 0 && state.flags['n_advisors'] < 3 && state.flags['centrists_resign'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['hilferding_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['center_dissent'] -= 7; state.flags['center_strength'] += 5; 
  },

  

  render: `
    Rudolf Hilferding is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_wels: Scene = {
  id: "add_wels",
  title: "Otto Wels",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wels_advisor'] == 0 && state.flags['n_advisors'] < 3 && state.flags['centrists_resign'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['wels_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['center_dissent'] -= 7; state.flags['center_strength'] += 5; 
  },

  

  render: `
    Otto Wels is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_muller: Scene = {
  id: "add_muller",
  title: "Hermann Müller",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['muller_advisor'] == 0 && state.flags['muller_dead'] == 0 && state.flags['n_advisors'] < 3 && state.flags['centrists_resign'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['muller_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['center_dissent'] -= 7; state.flags['center_strength'] += 5; 
  },

  

  render: `
    Hermann Müller is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_breitscheid: Scene = {
  id: "add_breitscheid",
  title: "Rudolf Breitscheid",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['breitscheid_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['breitscheid_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['center_dissent'] -= 7; state.flags['center_strength'] += 5; 
  },

  

  render: `
    Rudolf Breitscheid is now an advisor.
    # reformist
  `,
  choices: [
    
  ]
};

export const _add_severing: Scene = {
  id: "add_severing",
  title: "Carl Severing",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['severing_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['severing_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['reformist_strength'] += 5; state.flags['reformist_dissent'] -= 7; 
  },

  

  render: `
    Carl Severing is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_braun: Scene = {
  id: "add_braun",
  title: "Otto Braun",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['braun_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['braun_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['reformist_strength'] += 5; state.flags['reformist_dissent'] -= 7; 
  },

  

  render: `
    Otto Braun is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_juchacz: Scene = {
  id: "add_juchacz",
  title: "Marie Juchacz",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['juchacz_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['juchacz_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['reformist_strength'] += 5; state.flags['reformist_dissent'] -= 7; 
  },

  

  render: `
    Marie Juchacz is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_pfulf: Scene = {
  id: "add_pfulf",
  title: "Antonie Pfülf",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['pfulf_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pfulf_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['reformist_strength'] += 5; state.flags['reformist_dissent'] -= 7; 
  },

  

  render: `
    Antonie Pfülf is now an advisor.
    # left
  `,
  choices: [
    
  ]
};

export const _add_levi: Scene = {
  id: "add_levi",
  title: "Paul Levi",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['levi_advisor'] == 0 && state.flags['levi_dead'] == 0 && state.flags['n_advisors'] < 3 && state.flags['left_split'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['levi_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 7; 
  },

  

  render: `
    Paul Levi is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_sender: Scene = {
  id: "add_sender",
  title: "Toni Sender",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['sender_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['sender_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 4; 
  },

  

  render: `
    Toni Sender is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_rosenfeld: Scene = {
  id: "add_rosenfeld",
  title: "Kurt Rosenfeld",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rosenfeld_advisor'] == 0 && state.flags['n_advisors'] < 3 && state.flags['left_split'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rosenfeld_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 4; 
  },

  

  render: `
    Kurt Rosenfeld is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_seydewitz: Scene = {
  id: "add_seydewitz",
  title: "Max Seydewitz",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['seydewitz_advisor'] == 0 && state.flags['n_advisors'] < 3 && state.flags['left_split'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['seydewitz_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 4; 
  },

  

  render: `
    Max Seydewitz is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_siemsen: Scene = {
  id: "add_siemsen",
  title: "Anna Siemsen",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['siemsen_advisor'] == 0 && state.flags['n_advisors'] < 3 && state.flags['left_split'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['siemsen_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['left_strength'] += 5; state.flags['left_dissent'] -= 8; 
  },

  

  render: `
    Anna Siemsen is now an advisor.
    # labor
  `,
  choices: [
    
  ]
};

export const _add_leipart: Scene = {
  id: "add_leipart",
  title: "Theodor Leipart",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['leipart_advisor'] == 0 && state.flags['n_advisors'] < 3 && state.flags['unions_independent'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['leipart_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['labor_strength'] += 5; state.flags['labor_dissent'] -= 8; 
  },

  

  render: `
    Theodor Leipart is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_aufhauser: Scene = {
  id: "add_aufhauser",
  title: "Siegfried Aufhäuser",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['aufhauser_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['aufhauser_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['labor_strength'] += 5; state.flags['labor_dissent'] -= 8; 
  },

  

  render: `
    Siegfried Aufhäuser is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_wissell: Scene = {
  id: "add_wissell",
  title: "Rudolf Wissell",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wissell_advisor'] == 0 && state.flags['n_advisors'] < 3 && state.flags['unions_independent'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['wissell_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['labor_strength'] += 3; state.flags['labor_dissent'] -= 4; 
  },

  

  render: `
    Rudolf Wissell is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_woytinsky: Scene = {
  id: "add_woytinsky",
  title: "Wladimir Woytinsky",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['woytinsky_advisor'] == 0 && state.flags['n_advisors'] < 3 && state.flags['unions_independent'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['woytinsky_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['labor_strength'] += 3; state.flags['labor_dissent'] -= 4; 
  },

  

  render: `
    Wladimir Woytinsky is now an advisor.
    # neorevisionist leaders
  `,
  choices: [
    
  ]
};

export const _add_mierendorff: Scene = {
  id: "add_mierendorff",
  title: "Carlo Mierendorff",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['mierendorff_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['mierendorff_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['neorevisionist_strength'] += 5; state.flags['neorevisionist_dissent'] -= 8; 
  },

  

  render: `
    Carlo Mierendorff is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_schumacher: Scene = {
  id: "add_schumacher",
  title: "Kurt Schumacher",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['schumacher_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['schumacher_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['neorevisionist_strength'] += 5; state.flags['neorevisionist_dissent'] -= 8; 
  },

  

  render: `
    Kurt Schumacher is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_leber: Scene = {
  id: "add_leber",
  title: "Julius Leber",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['leber_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['leber_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['neorevisionist_strength'] += 5; state.flags['neorevisionist_dissent'] -= 8; 
  },

  

  render: `
    Julius Leber is now an advisor.
    # Nonfactional advisors
  `,
  choices: [
    
  ]
};

export const _add_wirth: Scene = {
  id: "add_wirth",
  title: "Joseph Wirth",
  subtitle: "Joseph Wirth is a former member of the <span style=\"color: #000000;\">Center</span>'s left wing and a former chancellor, known for his ardent <span style=\"color: #000000;\">rep</span><span style=\"color: #DD0000;\">ubl</span><span style=\"color: #FFCC00;\">ican</span> convictions.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['wirth_advisor'] == 0 && state.flags['wirth_spd'] && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['wirth_advisor'] = 1; state.flags['n_advisors'] += 1; state.flags['neorevisionist_strength'] += 5; state.flags['neorevisionist_dissent'] -= 8; 
  },

  

  render: `
    Joseph Wirth is now an advisor.
    # Nonfactional advisors
  `,
  choices: [
    
  ]
};

export const _add_baade: Scene = {
  id: "add_baade",
  title: "Fritz Baade",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['baade_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['baade_advisor'] = 1; state.flags['n_advisors'] += 1; 
  },

  

  render: `
    Fritz Baade is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_hirschfeld: Scene = {
  id: "add_hirschfeld",
  title: "Magnus Hirschfeld",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['hirschfeld_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['hirschfeld_advisor'] = 1; state.flags['n_advisors'] += 1; 
  },

  

  render: `
    Magnus Hirschfeld is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_radbruch: Scene = {
  id: "add_radbruch",
  title: "Gustav Radbruch",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['radbruch_advisor'] == 0 && state.flags['n_advisors'] < 3);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['radbruch_advisor'] = 1; state.flags['n_advisors'] += 1; 
  },

  

  render: `
    Gustav Radbruch is now an advisor.
  `,
  choices: [
    
  ]
};

export const _add_stampfer: Scene = {
  id: "add_stampfer",
  title: "Friedrich Stampfer",
  subtitle: "<br><br>",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['stampfer_advisor'] == 0 && state.flags['n_advisors'] < 3 && ! state.flags['stampfer_killed']);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['stampfer_advisor'] = 1; state.flags['n_advisors'] += 1; 
  },

  

  render: `
    Friedrich Stampfer is now an advisor.
  `,
  choices: [
    
  ]
};

export const _streetfighting: Scene = {
  id: "streetfighting",
  title: "Streetfighting",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['year'] >= 1930 && state.flags['far_right_force'] >= 30 && state.flags['streetfighting_timer'] == 0 && ! state.flags['return_to_normalcy'] && (state.flags['chancellor'] != "Schleicher" || state.flags['schleicher_time'] < 8));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['streetfighting_timer'] = 6; state.flags['month_actions'] += 1;if (state.flags['rb_militancy'] > 0.1) { state.flags['rb_militarization_cost'] = 2; } else { state.flags['rb_militarization_cost'] = 1; };if (state.flags['rb_militancy'] > 0.25) { state.flags['rb_militarization_cost'] = 3; }; state.flags['strife'] += 1; 
  },

  

  render: `
    = Streetfighting
    Battles rage on the streets between the <span style="color: #7A3C00;">Nazi</span> <span style="color: #7A3C00;">**SA**</span>, nationalist <span style="color: #3E88B3;">**Stahlhelm**</span>, communist <span style="color: #8B0000;">Rotfrontkämpferbund</span> (<span style="color: #8B0000;">**RFB**</span>), and our own Reichsbanner. In some parts of the country, conditions are nearing civil war levels, as dozens of people are killed each month.
    We must do something to protect the workers against these predations.
    # - @battle: Test our defense units in battle against the fascists!
  `,
  choices: [
    {
      id: "arm_rb",
      text: "Increase training and armaments for the Reichsbanner.",
      nextSceneId: "arm_rb",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "if_training",
      text: "Train union members to fight as part of the <span style=\"color: #c00000;\">Iron</span> <span style=\"color: #1A1A1A;\">Front</span>.",
      nextSceneId: "if_training",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "prussian_police_training",
      text: "Use the Prussian police to help train the Reichsbanner.",
      nextSceneId: "prussian_police_training",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "peace",
      text: "Try to avoid all militant confrontations, as much as possible.",
      nextSceneId: "peace",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "truce_rfb",
      text: "Try to make peace with the <span style=\"color: #8B0000;\">**RFB**</span>.",
      nextSceneId: "truce_rfb",
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

export const _battle: Scene = {
  id: "battle",
  title: "battle",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rb_militancy'] > 0.1 && state.flags['rb_militancy'] < 0.5);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rb_militancy'] += 0.1; state.flags['sa_strength'] += 40; state.flags['rb_strength'] -= 100; 
  },

  

  render: `
    Many Reichsbanner members are not ready for actual fighting, and thus quit. However, the remainder are toughened as a result. Our confrontations also provide ample recruiting material for the <span style="color: #7A3C00;">Nazi</span> <span style="color: #7A3C00;">**SA**</span>.
  `,
  choices: [
    
  ]
};

export const _arm_rb: Scene = {
  id: "arm_rb",
  title: "arm_rb",
  subtitle: "-[+ rb_militarization_cost +] resource",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['resources'] -= state.flags['rb_militarization_cost']; state.flags['rb_militancy'] += 0.06; state.flags['rb_strength'] += 50; state.flags['sa_strength'] += 50;if (state.flags['strife'] < 5) { state.flags['z_relation'] -= 3; };if (state.flags['strife'] < 5) { state.flags['ddp_relation'] -= 3; };if (state.flags['strife'] < 5) { state.flags['lvp_relation'] -= 3; } 
  },

  

  render: `
    We have increased training and purchased more armaments for the Reichsbanner.
    [? if not cvp_leave_reichsbanner and not rb_exit: [? if strife < 5: The [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] decries the militarization of the Reichsbanner, and its members are leaving the <span style="color: #000000;">rep</span><span style="color: #DD0000;">ubl</span><span style="color: #FFCC00;">ican</span> organization. ?][? if strife >= 5: Seeing the strife that has filled Germany's streets, the [? if z_party_name != "CVP": <span style="color: #000000;">Center Party</span>?][? if z_party_name == "CVP": <span style="color: #000000;">**CVP**</span>?] and [? if not lvp_formed:<span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed:<span style="color: #FFCC00;">**LVP**</span>?] seem to be convinced that it is necessary for the Reichsbanner to be militarized, and mute their criticisms. ?] ?]
  `,
  choices: [
    
  ]
};

export const _if_training: Scene = {
  id: "if_training",
  title: "if_training",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['iron_front_formed'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rb_militancy'] += 0.03; state.flags['rb_strength'] += 200; state.flags['sa_strength'] += 50; 
  },

  

  render: `
    As part of the <span style="color: #c00000;">**Iron**</span> <span style="color: #1A1A1A;">**Front**</span>, we are increasing coordination between the Reichsbanner and the unions, and many union members want to become more involved.
  `,
  choices: [
    
  ]
};

export const _prussian_police_training: Scene = {
  id: "prussian_police_training",
  title: "prussian_police_training",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['prussia_leader'] == "Braun" || state.flags['prussia_leader'] == "Rosenfeld" && state.flags['prussian_police_loyalty'] > 0.5);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rb_militancy'] += 0.05; state.flags['sa_strength'] += 50; state.flags['prussian_police_training'] += 1; 
  },

  

  render: `
    The loyal sections of the Prussian police can help train the Reichsbanner.
  `,
  choices: [
    
  ]
};

export const _peace: Scene = {
  id: "peace",
  title: "peace",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['rb_militancy'] -= 0.02; state.flags['rb_strength'] -= 50; state.flags['pacifism'] += 1; 
  },

  

  render: `
    By not fighting, the strength of the Reichsbanner atrophies. Pacifists in the party are gaining the upper hand.
  `,
  choices: [
    
  ]
};

export const _truce_rfb: Scene = {
  id: "truce_rfb",
  title: "truce_rfb",
  subtitle: "The <span style=\"color: #8B0000;\">RFB</span> will be added to the balance of power.",
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['kpd_truce'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['kpd_truce'] = 1; state.flags['kpd_relation'] += 5; state.flags['rfb_strength'] += 50; state.flags['rb_strength'] += 50; state.flags['sa_strength'] += 50; 
  },

  

  render: `
    We have made at least a temporary truce with the <span style="color: #700000;">**KPD**</span>, so that our respective paramilitaries will stop fighting.
  `,
  choices: [
    
  ]
};

export const _weimar_rally: Scene = {
  id: "weimar_rally",
  title: "Republican Coordination",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['rubicon'] && state.flags['weimar_rally'] && state.flags['rb_stay'] && state.flags['weimar_rally_timer'] <= 0 && state.flags['z_relation'] >= 50 && (state.flags['ddp_relation'] > 50 || state.flags['lvp_relation'] >= 40));
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['month_actions'] += 1; state.flags['weimar_rally_timer'] += 6; 
  },

  

  render: `
    = Republican Coordination
    Thanks to our historically strong ties with the <span style="color: #000000;">We</span><span style="color: #DD0000;">im</span><span style="color: #FFCC00;">ar</span> coalition parties, they have once again rallied to defend the republic we helped establish. The *Deutscher Republikanischer Reichsbund* (German Republican Reich League), once a non-partisan alliance of figures from all three parties, has now been restructured into an active political organization—intended to complement the efforts of the Reichsbanner.
    Membership has surged, and fresh funding has arrived from all three coalition parties. The question now is: what will we do with control of this new organization?
  `,
  choices: [
    {
      id: "nazi",
      text: "Focus attacks on the <span style=\"color: #7A3C00;\">Nazis</span>—currently the greatest threat to Germany.",
      nextSceneId: "nazi",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "rally",
      text: "Conduct joint rallies and deepen electoral cooperation between the parties.",
      nextSceneId: "rally",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "republic",
      text: "Launch a mass propaganda campaign in support of the republic and in opposition to <span style=\"color: #808080;\">dictatorship</span>.",
      nextSceneId: "republic",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "relation",
      text: "Strengthen ties with the <span style=\"color: #000000;\">We</span><span style=\"color: #DD0000;\">im</span><span style=\"color: #FFCC00;\">ar</span> coalition parties.",
      nextSceneId: "relation",
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

export const _nazi: Scene = {
  id: "nazi",
  title: "nazi",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_nsdap'] -= 2; state.flags['new_middle_nsdap'] -= 2; state.flags['old_middle_nsdap'] -= 2; state.flags['catholics_nsdap'] -= 2; 
  },

  

  render: `
    The organization’s main effort is to steer people away from the allure of the <span style="color: #7A3C00;">Nazis</span> and expose the contradictions and demagoguery inherent in their politics.
  `,
  choices: [
    
  ]
};

export const _rally_2: Scene = {
  id: "rally",
  title: "rally",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['workers_spd'] += (state.flags['pro_republic'] / 15); state.flags['new_middle_spd'] += (state.flags['pro_republic'] / 15); state.flags['old_middle_spd'] += (state.flags['pro_republic'] / 20); state.flags['rural_spd'] += (state.flags['pro_republic'] / 20); state.flags['workers_ddp'] += (state.flags['pro_republic'] / 40); state.flags['new_middle_ddp'] += (state.flags['pro_republic'] / 20); state.flags['old_middle_ddp'] += (state.flags['pro_republic'] / 20); state.flags['rural_ddp'] += (state.flags['pro_republic'] / 30); state.flags['workers_lvp'] += (state.flags['pro_republic'] / 30); state.flags['new_middle_lvp'] += (state.flags['pro_republic'] / 15); state.flags['old_middle_lvp'] += (state.flags['pro_republic'] / 15); state.flags['rural_lvp'] += (state.flags['pro_republic'] / 25); state.flags['workers_z'] += (state.flags['pro_republic'] / 50); state.flags['new_middle_z'] += (state.flags['pro_republic'] / 40); state.flags['old_middle_z'] += (state.flags['pro_republic'] / 40); state.flags['rural_z'] += (state.flags['pro_republic'] / 40); state.flags['catholics_z'] += (state.flags['pro_republic'] / 15); state.flags['peoples_party_support'] += 1; state.flags['neorevisionist_strength'] += 5; state.flags['left_dissent'] += 3; state.flags['kpd_relation'] -= 5; 
  },

  

  render: `
    We rally alongside politicians from the <span style="color: #000000;">Center</span> and [? if not lvp_formed: <span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed: <span style="color: #FFCC00;">**LVP**</span>?], united in our commitment to the Republic.
  `,
  choices: [
    
  ]
};

export const _republic_2: Scene = {
  id: "republic",
  title: "republic",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['pro_republic'] += 6; 
  },

  

  render: `
    The <span style="color: #7A3C00;">Nazi</span> and <span style="color: #700000;">Communist</span> propaganda machines have poisoned the public’s view of the Republic. Our goal is to counter their narrative with propaganda of our own.
  `,
  choices: [
    
  ]
};

export const _relation: Scene = {
  id: "relation",
  title: "relation",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             state.flags['z_relation'] += 5*(1-state.flags['dissent']); state.flags['ddp_relation'] += 5*(1-state.flags['dissent']); state.flags['lvp_relation'] += 5*(1-state.flags['dissent']); state.flags['ddp_left'] += 1; state.flags['lvp_left'] += 1; 
  },

  

  render: `
    We’ve been able to strengthen our relations with the involved parties through the participation of figures like Heuss and Wirth—members of the [? if not lvp_formed: <span style="color: #D3C24D;">**[+ ddp_name +]**</span>?][? if lvp_formed: <span style="color: #FFCC00;">**LVP**</span>?] and the <span style="color: #000000;">Center Party</span>, respectively.
  `,
  choices: [
    
  ]
};
