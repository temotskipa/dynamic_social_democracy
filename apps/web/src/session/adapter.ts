import type { SessionAdapterKind, SessionView } from "../engine/types";

export interface SessionAdapter {
  readonly kind: SessionAdapterKind;
  getView(): SessionView;
  initialize(): Promise<SessionView>;
  choose(choiceId: string): Promise<SessionView>;
  save(): Promise<SessionView>;
  load(): Promise<SessionView>;
  reset(): Promise<SessionView>;
  subscribe(listener: (view: SessionView) => void): () => void;
}
