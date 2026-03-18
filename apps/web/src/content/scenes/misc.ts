// @ts-nocheck
import { Scene, GameState } from "../../engine/types";


export const _cancel_advisor_action: Scene = {
  id: "cancel_advisor_action",
  title: "Cancel action.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['last_advisor_action'] == 1 || state.flags['last_cabinet_action'] == 1);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (Q.month_actions > 0) {
    Q.month_actions -= 1;
}
if (Q.last_advisor_action) {
    Q.advisor_action_timer = 0;
    Q.last_advisor_action = 0;
}
if (Q.last_cabinet_action) {
    Q.last_cabinet_action = 0;
}
// reset the timer...
var card = this.game.scenes[this.state.prevTopSceneId];
if (Q[card.id + "_timer"]) {
    Q[card.id + "_timer"] = 0;
}
// reduce visit count
if (this.state.visits[card.id]) {
    this.state.visits[card.id] -= 1;
} 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _easy_discard: Scene = {
  id: "easy_discard",
  title: "Return card to hand.",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (state.flags['difficulty'] <= 0 && state.flags['last_advisor_action'] == 0 && state.flags['last_cabinet_action'] == 0);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (Q.month_actions > 0) {
    Q.month_actions -= 1;
}
// return card to hand
var card = this.state.lastPlayedCard;
card.image = card.cardImage;
if (Q.difficulty >= 0) {
    this.state.currentHands['main'].push(card);
} else {
    this.state.currentHands['main.main_easy'].push(card);
}
// reset the timer...
if (Q[card.id + "_timer"]) {
    Q[card.id + "_timer"] = 0;
}
if (card.id == "prussian_affairs_dvp" || card.id == "prussian_affairs_left" || card.id == "prussian_affairs_majority") {
    Q.prussian_affairs_timer = 0;
}
if (card.id == "dealing_with_toleration_right" || card.id == "dealing_with_toleration_cvp") {
    Q.dealing_with_toleration_timer = 0;
}
// reduce visit count
if (this.state.visits[card.id]) {
    this.state.visits[card.id] -= 1;
} 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _election_algorithm: Scene = {
  id: "election_algorithm",
  title: "Election",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             // calculate normalized class voting amounts (0 to 100)
for (var c of Q.classes) {
    var class_votes = 0;
    for (var party of Q.parties) {
        if (Q[c+'_'+party] < 0) {
            Q[c+'_'+party] = 0;
        }
        class_votes += Q[c+'_'+party];
    }
    for (var party of Q.parties) {
        Q[c + '_' + party + '_normalized'] = 100*Q[c+'_'+party]/class_votes;
        Q[c + '_' + party + '_display'] = Math.round(100*Q[c+'_'+party]/class_votes);
    }
}
// 1. calculate support for each of the parties
var total_support = 0;
for (var party of Q.parties) {
    var party_support = 0;
    for (var c of Q.classes) {
        // but this version is somewhat more entertaining and allows for wilder swings in votes.
        // the other option basically necessitates a multi-class strategy. while the first option allows for a working-class-only strategy.
        if (Q.old_demographics) {
            // okay i'm pretty sure this is wrong, and the hard version is correct
            // basically this allows for "spillover" effects in other demographics.
            // so you can campaign among say the workers and 
            party_support += Q[c]*Q[c+'_'+party];
            // However, there should be a cap on how much party support you can get in a certain demo.
        } else  {
            party_support += Q[c]*Q[c+'_'+party+'_normalized'];
        }
    }
    Q[party + '_support'] = party_support;
    total_support += party_support;
    if (party == "other") {
        Q.cnblp_normalized = Q.rural_other_normalized*Q.rural;
        Q.wp_normalized = (Q.new_middle_other_normalized*Q.new_middle) + (Q.old_middle_other_normalized*Q.old_middle);
        if (Q.csvd_formed && !Q.aspd_other) Q.csvd_normalized = Q.workers_other_normalized*Q.workers;
        if (Q.aspd_other) Q.aspd_normalized = (Q.workers_other_normalized*Q.workers) + (Q.unemployed_other_normalized*Q.unemployed);
        if (Q.aspd_kvp) Q.aspd_normalized = (Q.workers_kvp_normalized*Q.workers) + (Q.unemployed_kvp_normalized*Q.unemployed);
        if (Q.right_dnef) Q.right_dnef_normalized = ((Q.new_middle_dnef_normalized / 2)*Q.new_middle) + (Q.old_middle_dnef_normalized*Q.old_middle) + (Q.rural_dnef_normalized*Q.rural) + ((Q.catholics_dnef_normalized / 2)*Q.catholics);
        if (Q.left_dnef) Q.left_dnef_normalized = ((Q.new_middle_dnef_normalized / 2)*Q.new_middle) + (Q.workers_dnef_normalized*Q.workers) + (Q.unemployed_dnef_normalized*Q.unemployed) + ((Q.catholics_dnef_normalized / 2)*Q.catholics);
    }
    if (party == "nsdap" && Q.nsdap_split) {
        Q.nsdap_hitler_support = Q.rural_nsdap_normalized*Q.rural;
        Q.nsdap_hitler_support += Q.old_middle_nsdap_normalized*Q.old_middle;
        Q.nsdap_hitler_support += Q.catholics_nsdap_normalized*Q.catholics;
        if (Q.dsu_exist && !Q.nvf_exist) {
            Q.dsu_support = Q.workers_nsdap*Q.workers*((120 - Q.sa_force) / 100);
            Q.dsu_support += Q.unemployed_nsdap*Q.unemployed*((80 - Q.sa_force) / 100);
            Q.dsu_support += Q.new_middle_nsdap*Q.new_middle;
        } else if (!Q.dsu_exist && Q.nvf_exist) {
            Q.nvf_support = Q.unemployed_nsdap*Q.unemployed*((120 - Q.sa_force) / 100);
            Q.nvf_support += Q.workers_nsdap*Q.workers*((Q.sa_force - 80) / 100);
            Q.nvf_support += Q.new_middle_nsdap*Q.new_middle;
        } else if (Q.dsu_exist && Q.nvf_exist) {
            Q.dsu_support = Q.workers_nsdap*Q.workers*((120 - Q.sa_force) / 100);
            Q.dsu_support += Q.unemployed_nsdap*Q.unemployed*((80 - Q.sa_force) / 100);
            Q.dsu_support += Q.new_middle_nsdap*Q.new_middle;
            Q.nvf_support = Q.unemployed_nsdap*Q.unemployed*((120 - Q.sa_force) / 100);
            Q.nvf_support += Q.workers_nsdap*Q.workers*((Q.sa_force - 80) / 100);
        } else {
            Q.nsdap_hitler_support += Q.workers_nsdap*Q.workers;
            Q.nsdap_hitler_support += Q.unemployed_nsdap*Q.unemployed;
            Q.nsdap_hitler_support += Q.new_middle_nsdap*Q.new_middle;
        }
    }
}
// 2. normalize support (fraction)
// 3. Round to integers
for (var party of Q.parties) {
    Q[party+'_normalized'] = Q[party + '_support']/total_support;
    if (party == "other") {
        Q.cnblp_votes = (Q.cnblp_normalized/total_support);
        Q.wp_votes = (Q.wp_normalized/total_support);
        if (Q.csvd_formed && !Q.aspd_other) Q.csvd_votes = (Q.csvd_normalized/total_support);
        if (Q.aspd_other || Q.aspd_kvp) Q.aspd_votes = (Q.aspd_normalized/total_support);
        if (Q.right_dnef) Q.right_dnef_votes = (Q.right_dnef_normalized/total_support);
        if (Q.left_dnef) Q.left_dnef_votes = (Q.left_dnef_normalized/total_support);
    }
    if (party == "nsdap" && Q.nsdap_split) {
        Q.nsdap_hitler_normalized = Q.nsdap_hitler_support / total_support;
        Q.dsu_normalized = Q.dsu_support / total_support;
        if (Q.nvf_exist) Q.nvf_normalized = Q.nvf_support / total_support;
        Q.nsdap_hitler_votes = Math.round(Q.nsdap_hitler_normalized*1000) / 10;
        Q.dsu_votes = Math.round(Q.dsu_normalized*1000) / 10;
        if (Q.nvf_exist) Q.nvf_votes = Math.round(Q.nvf_normalized*1000) / 10;
    }
    Q[party+'_votes'] = Math.round(Q[party+'_normalized']*1000)/ 10;
    if (party == "other") {
        Q.cnblp_votes = Math.round((Q.cnblp_votes*1000)/10);
        Q.wp_votes = Math.round((Q.wp_votes*1000)/10);
        if (Q.csvd_formed && !Q.aspd_other) Q.csvd_votes = Math.round((Q.csvd_votes*1000)/10);
        if (Q.aspd_other || Q.aspd_kvp) Q.aspd_votes = Math.round((Q.aspd_votes*1000)/10);
        if (Q.right_dnef) Q.right_dnef_votes = Math.round((Q.right_dnef_votes*1000)/10);
        if (Q.left_dnef) Q.left_dnef_votes = Math.round((Q.left_dnef_votes*1000)/10);
    }
} 
  },

  

  render: `
    # note: this is a helpful utility to deal with elections and so on.
  `,
  choices: [
    
  ]
};

export const _election_simulation: Scene = {
  id: "election_simulation",
  title: "Election Simulation",
  
  
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
      id: "1928",
      text: "1928 historical scenario",
      nextSceneId: "1928",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "1930",
      text: "1930 historical scenario",
      nextSceneId: "1930",
      viewIf: (state: GameState) => {
         const Q = state.flags;
         return (true); 
      },
      onChoose: (state: GameState) => {
         const Q = state.flags;
          
      },
    },
    {
      id: "1932",
      text: "1932 (July) historical scenario",
      nextSceneId: "1932",
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

export const _1928: Scene = {
  id: "1928",
  title: "1928",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.workers = 46; // industry and trade
Q.old_middle = 13; // "old mittelstand"
// 16.4 trade & commerce, 6.6 public and private services, 4.4 domestic help
Q.new_middle = 14; // "new mittelstand"
Q.rural = 25; // agriculture and forestry employment... but many of those are proletarians so...
// source: https://surface.syr.edu/cgi/viewcontent.cgi?filename=3&article=1016&context=books&type=additional page 43, table 3.3
Q.unemployed = 8.6;
Q.catholics = 30;
Q.classes = ['workers', 'old_middle', 'new_middle', 'rural', 'unemployed', 'catholics'];
Q.parties = ['spd', 'kpd', 'z', 'ddp', 'dvp', 'dnvp', 'nsdap', 'other'];
// Support for party by social group
// they don't have to sum to 100 since the electoral calculations will be normalized.
Q.workers_spd = 65;
Q.workers_kpd = 20;
Q.workers_z = 5;
Q.workers_ddp = 0;
Q.workers_dvp = 0;
Q.workers_dnvp = 5;
Q.workers_nsdap = 0;
Q.workers_other = 10;
Q.old_middle_spd = 5;
Q.old_middle_kpd = 0;
Q.old_middle_z = 5;
Q.old_middle_ddp= 10;
Q.old_middle_dvp = 25;
Q.old_middle_dnvp = 25;
Q.old_middle_nsdap = 10;
Q.old_middle_other = 10;
Q.new_middle_spd = 5;
Q.new_middle_kpd = 0;
Q.new_middle_z = 10;
Q.new_middle_ddp= 25;
Q.new_middle_dvp = 25;
Q.new_middle_dnvp = 10;
Q.new_middle_nsdap = 5;
Q.new_middle_other = 15;
Q.rural_spd = 10;
Q.rural_kpd = 0;
Q.rural_z = 5;
Q.rural_ddp= 5;
Q.rural_dvp = 15;
Q.rural_dnvp = 45;
Q.rural_nsdap = 5;
Q.rural_other = 10;
Q.unemployed_spd = 25;
Q.unemployed_kpd = 55;
Q.unemployed_z = 1;
Q.unemployed_ddp = 0;
Q.unemployed_dvp = 0;
Q.unemployed_dnvp = 5;
Q.unemployed_nsdap = 15;
Q.unemployed_other = 9;
Q.catholics_spd = 15;
Q.catholics_kpd = 5;
Q.catholics_z = 50;
Q.catholics_ddp = 0;
Q.catholics_dvp = 5;
Q.catholics_dnvp = 5;
Q.catholics_nsdap = 0;
Q.catholics_other = 10; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _1930: Scene = {
  id: "1930",
  title: "1930",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.workers = 46; // industry and trade
Q.old_middle = 13; // "old mittelstand"
// 16.4 trade & commerce, 6.6 public and private services, 4.4 domestic help
Q.new_middle = 14; // "new mittelstand"
Q.rural = 25; // agriculture and forestry employment... but many of those are proletarians so...
// source: https://surface.syr.edu/cgi/viewcontent.cgi?filename=3&article=1016&context=books&type=additional page 43, table 3.3
Q.unemployed = 20;
Q.catholics = 30;
Q.classes = ['workers', 'old_middle', 'new_middle', 'rural', 'unemployed', 'catholics'];
Q.parties = ['spd', 'kpd', 'z', 'ddp', 'dvp', 'dnvp', 'nsdap', 'other'];
// Support for party by social group
// they don't have to sum to 100 since the electoral calculations will be normalized.
Q.workers_spd = 60;
Q.workers_kpd = 20;
Q.workers_z = 5;
Q.workers_ddp = 0;
Q.workers_dvp = 0;
Q.workers_dnvp = 0;
Q.workers_nsdap = 10;
Q.workers_other = 15;
Q.old_middle_spd = 5;
Q.old_middle_kpd = 0;
Q.old_middle_z = 5;
Q.old_middle_ddp= 5;
Q.old_middle_dvp = 10;
Q.old_middle_dnvp = 20;
Q.old_middle_nsdap = 30;
Q.old_middle_other = 15;
Q.new_middle_spd = 5;
Q.new_middle_kpd = 0;
Q.new_middle_z = 5;
Q.new_middle_ddp = 10;
Q.new_middle_dvp = 20;
Q.new_middle_dnvp = 10;
Q.new_middle_nsdap = 25;
Q.new_middle_other = 15;
Q.rural_spd = 5;
Q.rural_kpd = 0;
Q.rural_z = 5;
Q.rural_ddp= 5;
Q.rural_dvp = 10;
Q.rural_dnvp = 20;
Q.rural_nsdap = 25;
Q.rural_other = 15;
Q.unemployed_spd = 20;
Q.unemployed_kpd = 50;
Q.unemployed_z = 0;
Q.unemployed_ddp = 0;
Q.unemployed_dvp = 0;
Q.unemployed_dnvp = 5;
Q.unemployed_nsdap = 25;
Q.unemployed_other = 5;
Q.catholics_spd = 10;
Q.catholics_kpd = 5;
Q.catholics_z = 50;
Q.catholics_ddp = 0;
Q.catholics_dvp = 5;
Q.catholics_dnvp = 5;
Q.catholics_nsdap = 10;
Q.catholics_other = 5;
Q.spd_r = 25;
Q.kpd_r = 10;
Q.z_r = 15;
Q.ddp_r = 10;
Q.dvp_r = 10;
Q.dnvp_r = 14;
Q.nsdap_r = 10;
Q.other_r = 5; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _1932: Scene = {
  id: "1932",
  title: "1932",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             Q.workers = 46; // industry and trade
Q.old_middle = 13; // "old mittelstand"
// 16.4 trade & commerce, 6.6 public and private services, 4.4 domestic help
Q.new_middle = 14; // "new mittelstand"
Q.rural = 25; // agriculture and forestry employment... but many of those are proletarians so...
// source: https://surface.syr.edu/cgi/viewcontent.cgi?filename=3&article=1016&context=books&type=additional page 43, table 3.3
Q.unemployed = 33;
Q.catholics = 30;
Q.classes = ['workers', 'old_middle', 'new_middle', 'rural', 'unemployed', 'catholics'];
Q.parties = ['spd', 'kpd', 'z', 'ddp', 'dvp', 'dnvp', 'nsdap', 'other'];
// Support for party by social group
// they don't have to sum to 100 since the electoral calculations will be normalized.
Q.workers_spd = 55;
Q.workers_kpd = 20;
Q.workers_z = 5;
Q.workers_ddp = 0;
Q.workers_dvp = 0;
Q.workers_dnvp = 0;
Q.workers_nsdap = 15;
Q.workers_other = 5;
Q.old_middle_spd = 0;
Q.old_middle_kpd = 0;
Q.old_middle_z = 5;
Q.old_middle_ddp = 4;
Q.old_middle_dvp = 4;
Q.old_middle_dnvp = 15;
Q.old_middle_nsdap = 70;
Q.old_middle_other = 5;
Q.new_middle_spd = 5;
Q.new_middle_kpd = 0;
Q.new_middle_z = 5;
Q.new_middle_ddp = 10;
Q.new_middle_dvp = 10;
Q.new_middle_dnvp = 10;
Q.new_middle_nsdap = 60;
Q.new_middle_other = 5;
Q.rural_spd = 0;
Q.rural_kpd = 0;
Q.rural_z = 5;
Q.rural_ddp = 0;
Q.rural_dvp = 5;
Q.rural_dnvp = 15;
Q.rural_nsdap = 65;
Q.rural_other = 5;
Q.unemployed_spd = 20;
Q.unemployed_kpd = 40;
Q.unemployed_z = 0;
Q.unemployed_ddp = 0;
Q.unemployed_dvp = 0;
Q.unemployed_dnvp = 0;
Q.unemployed_nsdap = 50;
Q.unemployed_other = 5;
Q.catholics_spd = 10;
Q.catholics_kpd = 5;
Q.catholics_z = 60;
Q.catholics_ddp = 0;
Q.catholics_dvp = 5;
Q.catholics_dnvp = 5;
Q.catholics_nsdap = 10;
Q.catholics_other = 5;
Q.spd_r = 25;
Q.kpd_r = 10;
Q.z_r = 15;
Q.ddp_r = 10;
Q.dvp_r = 10;
Q.dnvp_r = 14;
Q.nsdap_r = 10;
Q.other_r = 5; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _post_election: Scene = {
  id: "post_election",
  title: "post_election",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             // set congress proportion to votes
Q.spd_r = Q.spd_votes;
Q.z_r = Q.z_votes;
Q.kpd_r = Q.kpd_votes;
Q.ddp_r = Q.ddp_votes;
Q.dvp_r = Q.dvp_votes;
Q.dnvp_r = Q.dnvp_votes;
Q.nsdap_r = Q.nsdap_votes;
Q.other_r = Q.other_votes;
// The largest party can only be the NSDAP or the <span style="color: #c00000;">**SPD**</span>.
Q.largest_party = 'SPD';
if (Q.nsdap_r >= Q.spd_r && Q.nsdap_r >= Q.kpd_r) {
    Q.largest_party = 'NSDAP';
}
if (Q.kpd_r >= Q.spd_r && Q.kpd_r >= Q.nsdap_r) {
    Q.largest_party = 'KPD';
}
// coalitions
Q.weimar_coalition = Q.spd_r + Q.ddp_r + Q.z_r - 3;
Q.grand_coalition = Q.spd_r + Q.ddp_r + Q.z_r + Q.dvp_r;
Q.bourgeois_coalition = Q.ddp_r + Q.z_r + Q.dvp_r + Q.other_r;
Q.center_right_coalition = Q.z_r + Q.ddp_r + Q.dvp_r + Q.other_r + Q.dnvp_r;
Q.right_coalition = Q.z_r + Q.dvp_r + Q.other_r + Q.dnvp_r;
Q.far_right_coalition = Q.dnvp_r + Q.nsdap_r;
Q.left_coalition = Q.spd_r + Q.kpd_r;
// this is an absurd concept lol
Q.united_front_coalition = Q.spd_r + Q.kpd_r + Q.z_r + Q.ddp_r - 3;
Q.anti_democratic_coalition = Q.kpd_r + Q.nsdap_r;
// aka everyone except nazi, kpd, dnvp
Q.neo_weimar_coalition = Q.spd_r + Q.ddp_r + Q.z_r + Q.dvp_r + Q.other_r; 
  },

  

  render: `
    The electoral system is essentially proportional, with the proportion of Reichstag seats roughly equal to the proportion of votes.
    **Election results:**
    # 1928: 30, 1930: 25, 1932: 22
    SPD: [+ spd_r +]
    # 1928: 15, 1930: 15, 1932: 
    Z + BVP: [+ z_r +]
    # 1928: 10, 1930: 13
    KPD: [+ kpd_r +]
    # 1928: 5, 1930: 4 (as DStP)
    DDP: [+ ddp_r +]
    # 1928: 9, 1930: 5
    DVP: [+ dvp_r +]
    # 1928: 14, 1930: 7
    DNVP: [+ dnvp_r +]
    # 1928: 3, 1930: 18
    NSDAP: [+ nsdap_r +]
    # 1928: 9, 1930: 10
    Other: [+ other_r +]
    **Potential coalitions:**
    Weimar Coalition (SPD + Z + DDP): [+ weimar_coalition +]
    Grand Coalition (SPD + Z + BVP + DDP + DVP): [+ grand_coalition +]
    Bourgeois Coalition (Z + BVP + DDP + DVP + Others): [+ bourgeois_coalition +]
    Right-wing Coalition (Z + BVP + DVP + Others + DNVP): [+ right_coalition +]
  `,
  choices: [
    
  ]
};

export const _mod_loader: Scene = {
  id: "mod_loader",
  title: "Mods",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  onDisplay: (state: GameState): void => { 
             const Q = state.flags; 
             var mods_list = document.getElementById('mods_list');
// load mods from url
var mods_url = 'https://aucchen.github.io/social_democracy_mods/mod_list.tsv';
var table = document.createElement('table');
table.style.border = '1px solid';
table.style['border-collapse'] = 'collapse';
table.style['font-size'] = '0.8em';
Q.mods_table = {};
state.flags['fetch'](mods_url)
.then(response => response.text())
.then(text => {
    // split text
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line_data = lines[i].split('\t');
        if (line_data.length < 5) {
            continue;
        }
        var tr = document.createElement('tr');
        for (var j = 0; j < 4; j++) {
            var td = document.createElement('td');
            if (i == 0) {
                td = document.createElement('th');
            }
            td.style.border = '1px solid';
            td.style.padding = '0.5em';
            td.textContent = line_data[j];
            tr.appendChild(td);
        }
        if (i > 0) {
            Q.mods_table[line_data[2]] = {
                name: line_data[0],
                author: line_data[1],
                description: line_data[3],
            };
        }
        table.appendChild(tr);
    }
    mods_list.appendChild(table);
})
.catch(err => console.log(err));
var submit = document.getElementById('submit');
submit.onclick = function() {
    var mod_url = document.getElementById('mod_url').value;
    // if it's a known mod, set the game's titlebar and author.
    if (Q.mods_table[mod_url]) {
        var mod_data = Q.mods_table[mod_url];
        var title = document.getElementById('game-title');
        title.textContent = mod_data.name;
        var author = document.getElementById('game-author');
        author.textContent = mod_data.author;
    }
    window.loadMod(mod_url);
}; 
  },

  render: `
    Curated mods:
    {!<div id="mods_list"></div>!}
    Enter a mod's URL:
    {!<input type="text" size="25" id="mod_url" name="mod_url"/> <button id="submit">Submit</button>!}
  `,
  choices: [
    {
      id: "backSpecialScene",
      text: "Back",
      nextSceneId: "backSpecialScene",
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

export const _return: Scene = {
  id: "return",
  title: "Back to main",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (state.flags['difficulty'] < 0) { state.flags['month_actions'] -= 1; } 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _set_next_election_time: Scene = {
  id: "set_next_election_time",
  title: "next election time",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (state.flags['next_election_time'] >= state.flags['time']+state.flags['time_to_election']) { state.flags['next_election_time'] = state.flags['time']+state.flags['time_to_election']; };if (state.flags['next_election_time'] >= state.flags['time']+state.flags['time_to_election']) { state.flags['next_election_month'] = state.flags['month'] + 3; };if (state.flags['next_election_time'] >= state.flags['time']+state.flags['time_to_election']) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _set_next_election_time_2: Scene = {
  id: "set_next_election_time_2",
  title: "next election time",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (state.flags['next_election_time'] >= state.flags['time']+state.flags['time_to_election']) { state.flags['next_election_time'] = state.flags['time']+state.flags['time_to_election']; };if (state.flags['next_election_time'] >= state.flags['time']+state.flags['time_to_election']) { state.flags['next_election_month'] = state.flags['month'] + 2; };if (state.flags['next_election_time'] >= state.flags['time']+state.flags['time_to_election']) { state.flags['next_election_year'] = state.flags['year']; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_year'] += 1; };if (state.flags['next_election_month'] > 12) { state.flags['next_election_month'] -= 12; }; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _set_next_election_time_prussia: Scene = {
  id: "set_next_election_time_prussia",
  title: "next election time",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
             if (state.flags['next_election_time_prussia'] >= state.flags['time']+3) { state.flags['next_election_time_prussia'] = state.flags['time']+3; };if (state.flags['next_election_time_prussia'] >= state.flags['time']+3) { state.flags['next_election_month_prussia'] = state.flags['month'] + 3; };if (state.flags['next_election_time_prussia'] >= state.flags['time']+3) { state.flags['next_election_year_prussia'] = state.flags['year']; };if (state.flags['next_election_month_prussia'] > 12) { state.flags['next_election_year_prussia'] += 1; };if (state.flags['next_election_month_prussia'] > 12) { state.flags['next_election_month_prussia'] -= 12; }; 
  },

  

  render: `
    
  `,
  choices: [
    
  ]
};

export const _status_right: Scene = {
  id: "status_right",
  title: "[? if not dnef_existed: Scheming?][? if dnef_existed: The House of Cards?]",
  
  
  viewIf: (state: GameState): boolean => { 
             const Q = state.flags; 
             return (true);
  },
  
  onArrival: (state: GameState): void => { 
             const Q = state.flags; 
              
  },

  

  render: `
    = [? if not dnef_existed: Scheming?][? if dnef_existed: The House of Cards?]
    [? if not dnef_existed: <div style="text-align: center;">President: Paul von Hindenburg (<span style="color: #808080;">I</span>)</div> ?]
    [? if not dnef_existed: <div><img src="img/portraits/hindenburger.jpg" alt="Paul von Hindenburg" style="width: 60%;display: block;margin: auto;margin-bottom: 5px;"></div> ?]
    [? if not dnef_existed: <p style="text-align: center;margin-bottom: 0;">Favorite: [? if schleicher_strength >= papen_strength: Kurt von Schleicher?][? if schleicher_strength < papen_strength: Franz von Papen?]</p> ?]
    [? if not dnef_existed: <p style="text-align: center;margin-bottom: 5px;">[+ nsdap_chancellor +] chancellorship: [+ hindenburg_hitler_r : hindenburg_hitler +]</p> ?]
    [? if not dnef_existed: <h1>The Camarilla</h1> ?]
    [? if not dnef_existed: <div style="display: flex;gap: 5px;margin-bottom: 5px;margin-left: -3px;"> ?]
    [? if not dnef_existed: <img src="img/portraits/PapenFranz.jpg" alt="Franz von Papen" style="width: 50%;"> ?]
    [? if not dnef_existed: <img src="img/portraits/SchleicherKurt.jpg" alt="Kurt von Schleicher" style="width: 50%;"> ?]
    [? if not dnef_existed: </div> ?]
    [? if not dnef_existed: <div style="display: flex; justify-content: space-between; gap: 0px; margin-bottom: 5px;"> ?]
    [? if not dnef_existed: <div style="flex: 1;"> ?]
    [? if not dnef_existed: <p style="font-weight: bold;margin-bottom: 2px;">Franz von Papen</p> ?]
    [? if not dnef_existed: <p style="white-space: nowrap;margin-bottom: 2px;">Influence: [+ papen_strength : camarilla_strength +]</p> ?]
    [? if not dnef_existed: <p style="margin-bottom: 2px;">Goal: [+ papen_goal +] </p> ?]
    [? if not dnef_existed: </div> ?]
    [? if not dnef_existed: <div style="flex: 1;margin-right: -8px;"> ?]
    [? if not dnef_existed: <p style="white-space: nowrap;text-align: center;font-weight: bold;margin-bottom: 0px;">Kurt von Schleicher</p> ?]
    [? if not dnef_existed: <p style="margin-bottom: 2px;">Influence: [+ schleicher_strength : camarilla_strength +]</p> ?]
    [? if not dnef_existed: <p style="margin-bottom: 2px;">Goal: [+ schleicher_goal +]</p> ?]
    [? if not dnef_existed: </div> ?]
    [? if not dnef_existed: </div> ?]
    [? if not dnef_existed: <div style="display: flex;gap: 5px;margin-bottom: 5px;margin-left: -3px;"> ?]
    [? if not dnef_existed: <img src="img/portraits/Meissner.jpg" alt="Otto Meissner" style="width: 50%;"> ?]
    [? if not dnef_existed: <img src="img/portraits/oskar.jpg" alt="Oskar von Hindenburg" style="width: 50%;"> ?]
    [? if not dnef_existed: </div> ?]
    [? if not dnef_existed: <div style="display: flex; justify-content: space-between; gap: 0px; margin-bottom: 5px;"> ?]
    [? if not dnef_existed: <div style="flex: 1;"> ?]
    [? if not dnef_existed: <p style="font-weight: bold;margin-bottom: 2px;">Otto Meissner</p> ?]
    [? if not dnef_existed: <p style="margin-bottom: 2px;">Influence: [+ meissner_strength : camarilla_strength +]</p> ?]
    [? if not dnef_existed: <p style="margin-bottom: 2px;">Goal: [+ meissner_goal +]</p> ?]
    [? if not dnef_existed: </div> ?]
    [? if not dnef_existed: <div style="flex: 1;"> ?]
    [? if not dnef_existed: <p style="font-weight: bold; margin-bottom: 0px;">Oskar von Hindenburg</p> ?]
    [? if not dnef_existed: <p style="margin-bottom: 2px;">Influence: [+ oskar_strength : camarilla_strength +]</p> ?]
    [? if not dnef_existed: <p style="margin-bottom: 2px;">Goal: [+ oskar_goal +]</p> ?]
    [? if not dnef_existed: </div> ?]
    [? if not dnef_existed: </div> ?]
    [? if dnef_existed: <div style="position: relative; width: 100%; max-width: 600px; margin: auto;"> ?]
    [? if dnef_existed: <div style="white-space: nowrap; display: flex; justify-content: space-between; width: 100%;"> ?]
    [? if dnef_existed: [? if president == "Hindenburg": <div style="text-align: left; flex: 1;">Paul von Hindenburg</div> ?][? if president == "Bumke (acting)": <div style="text-align: left; flex: 1;">Erwin Bumke (acting)</div> ?][? if president == "Großmann (acting)": <div style="text-align: left; flex: 1;">Hermann Großmann (acting)</div> ?][? if president == "Hammerstein": <div style="text-align: left; flex: 1;">Kurt von Hammerstein-Equord</div> ?][? if president == "Seeckt": <div style="text-align: left; flex: 1;">Hans von Seeckt</div> ?] ?]
    [? if dnef_existed and chancellor == "Schleicher": <div style="text-align: right; flex: 1;">Kurt von Schleicher</div> ?]
    [? if dnef_existed and chancellor == "Bredow": <div style="text-align: right; flex: 1;">Ferdinand von Bredow</div> ?]
    [? if dnef_existed and chancellor == "Goerdeler": <div style="text-align: right; flex: 1;">Carl Goerdeler</div> ?]
    [? if dnef_existed and chancellor == "Treviranus": <div style="text-align: right; flex: 1;">Gottfried Treviranus</div> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: <div style="display: flex;gap: 5px;margin-bottom: 5px;margin-left: -3px;"> ?]
    [? if dnef_existed and president == "Hindenburg": <img src="img/portraits/hindenburger.jpg" alt="Paul von Hindenburg" style="width: 50%;"> ?]
    [? if dnef_existed and president == "Bumke (acting)": <img src="img/portraits/bumke.jpg" alt="Erwin Bumke" style="width: 50%;"> ?]
    [? if dnef_existed and president == "Großmann (acting)": <img src="img/portraits/placeholder.jpg" alt="Hermann Großmann" style="width: 50%;"> ?]
    [? if dnef_existed and president == "Hammerstein": <img src="img/portraits/hammerstein.jpg" alt="Kurt von Hammerstein-Equord" style="width: 50%;"> ?]
    [? if dnef_existed and president == "Seeckt": <img src="img/portraits/seeckt.jpg" alt="Hans von Seeckt" style="width: 50%;"> ?]
    [? if dnef_existed and chancellor == "Schleicher": <img src="img/portraits/SchleicherKurt.jpg" alt="Kurt von Schleicher" style="width: 50%;"> ?]
    [? if dnef_existed and chancellor == "Bredow": <img src="img/portraits/bredow.jpg" alt="Ferdinand von Bredow" style="width: 50%;"> ?]
    [? if dnef_existed and chancellor == "Goerdeler": <img src="img/portraits/goerdeler.jpg" alt="Carl Friedrich Goerdeler" style="width: 50%;"> ?]
    [? if dnef_existed and chancellor == "Treviranus": <img src="img/portraits/Treviranus.jpg" alt="Gottfried Reinhold Treviranus" style="width: 50%;"> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: <p style="text-align: center;margin-bottom: 5px;">Hindenburg's confidence: [+ hindenburg_schleicher_r : confidence +]</p> ?]
    [? if dnef_existed: <p style="text-align: center;margin-bottom: 5px;">[+ chancellor +]'s public popularity: [+ schleicher_approval : schleicher_popularity +]</p> ?]
    [? if dnef_existed: <div style="display: flex; gap: 5px; margin-bottom: 5px; margin-left: -3px;"> ?]
    [? if dnef_existed: <img src="img/beauty_of_labor.jpg" alt="Workers and Trade Unions" style="width: 50%;"> ?]
    [? if dnef_existed: <img src="img/capitalism.jpg" alt="Big Business and Industrialists" style="width: 50%;"> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: <div style="display: flex; justify-content: space-between; gap: 0px; margin-bottom: 5px;"> ?]
    [? if dnef_existed: <div style="flex: 1;"> ?]
    [? if dnef_existed: <p style="font-weight: bold;margin-bottom: 2px;">Workers</p> ?]
    [? if dnef_existed: <p style="white-space: nowrap;margin-bottom: 2px;">Influence: dominant</p> ?]
    [? if dnef_existed: <p style="margin-bottom: 2px;">Opinion of [+ chancellor +]: [+ workers_schleicher : schleicher_spd_4 +]</p> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: <div style="flex: 1; margin-right: -8px;"> ?]
    [? if dnef_existed: <p style="white-space: nowrap;font-weight: bold;margin-bottom: 0px;">Industrialists</p> ?]
    [? if dnef_existed: <p style="margin-bottom: 2px;">Influence: powerful</p> ?]
    [? if dnef_existed: <p style="margin-bottom: 2px;">Opinion of [+ chancellor +]: [+ industrialists_schleicher : schleicher_spd_4 +]</p> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: <div style="display: flex; gap: 5px; margin-bottom: 5px; margin-left: -3px;"> ?]
    [? if dnef_existed: <img src="img/weimar_coalition_3.jpg" alt="Republicans and Constitutionalists" style="width: 50%;"> ?]
    [? if dnef_existed: <img src="img/dnvp_monarchy.jpg" alt="Nationalists and Conservatives" style="width: 50%;"> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: <div style="display: flex; justify-content: space-between; gap: 0px; margin-bottom: 5px;"> ?]
    [? if dnef_existed: <div style="flex: 1;"> ?]
    [? if dnef_existed: <p style="font-weight: bold;margin-bottom: 2px;">Republicans</p> ?]
    [? if dnef_existed: <p style="margin-bottom: 2px;">Influence: [? if weimar_votes < 20: modest?][? if weimar_votes < 30 and weimar_votes >= 20: sizable?][? if weimar_votes < 40 and weimar_votes >= 30: substantial?][? if weimar_votes >= 40: powerful?]</p> ?]
    [? if dnef_existed: <p style="margin-bottom: 2px;">Opinion of [+ chancellor +]: [+ republicans_schleicher : schleicher_spd_4 +]</p> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: <div style="flex: 1;"> ?]
    [? if dnef_existed: <p style="font-weight: bold; margin-bottom: 0px;">Nationalists</p> ?]
    [? if dnef_existed: <p style="margin-bottom: 2px;">Influence: [? if nationalist_votes < 15: modest?][? if nationalist_votes >= 15: sizable?]</p> ?]
    [? if dnef_existed: <p style="margin-bottom: 2px;">Opinion of [+ chancellor +]: [+ nationalists_schleicher : schleicher_spd_4 +]</p> ?]
    [? if dnef_existed: </div> ?]
    [? if dnef_existed: </div> ?]
  `,
  choices: [
    
  ]
};
