import type { GameSession, GameState } from "@dsd/contracts";

export function createInitialState(initialSceneId = ""): GameState {
  return {
    time: { year: 1928, month: 1, week: 1 },
    resources: { budget: 0, politicalCapital: 0 },
    parties: {
      spd: 50,
      kpd: 20,
      center: 40,
      dnvp: 30,
      nsdap: 5,
    },
    flags: {},
    history: [],
    currentSceneId: initialSceneId,
  };
}

export function cloneGameState(state: GameState): GameState {
  return {
    ...state,
    time: { ...state.time },
    resources: { ...state.resources },
    parties: { ...state.parties },
    flags: { ...state.flags },
    history: [...state.history],
  };
}

export function mutateGameState(
  state: GameState,
  mutator: (nextState: GameState) => void,
): GameState {
  const nextState = cloneGameState(state);
  mutator(nextState);
  return nextState;
}

export function cloneGameSession(session: GameSession): GameSession {
  return {
    ...session,
    state: cloneGameState(session.state),
  };
}

export function mutateGameSession(
  session: GameSession,
  mutator: (nextState: GameState) => void,
): GameSession {
  const nextSession = cloneGameSession(session);
  mutator(nextSession.state);
  return nextSession;
}
