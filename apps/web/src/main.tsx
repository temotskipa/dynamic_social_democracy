import { render, type ComponentChildren } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type { SessionCardSnapshot, SessionView } from '@dsd/contracts';
import {
    chooseChoice,
    goBack,
    goToScene,
    initializeSession,
    loadPersistedSession,
    resetSession,
    saveSession,
    sessionView,
} from './engine/state';
import './styles.css';

type StatusTab = 'main' | 'politics' | 'defense' | 'polls';
type Overlay = 'save-load' | 'options' | null;

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const PARTY_ROWS = [
    { key: 'spd', label: 'SPD', title: 'Social Democratic Party of Germany' },
    { key: 'z', label: 'Z', title: 'Center Party' },
    { key: 'bvp', label: 'BVP', title: "Bavarian People's Party" },
    { key: 'kpd', label: 'KPD', title: 'Communist Party of Germany' },
    { key: 'ddp', label: 'DDP', title: 'German Democratic Party' },
    { key: 'dvp', label: 'DVP', title: "German People's Party" },
    { key: 'dnvp', label: 'DNVP', title: "German National People's Party" },
    { key: 'nsdap', label: 'NSDAP', title: "National-Socialist German Worker's Party" },
    { key: 'other', label: 'Others', title: 'Other parties' },
];

const PARAMILITARY_ROWS = [
    { strengthKey: 'reichsbanner_strength', militancyKey: 'reichsbanner_militancy', label: 'Reichsbanner' },
    { strengthKey: 'rfb_strength', militancyKey: 'rfb_militancy', label: 'RFB' },
    { strengthKey: 'stahlhelm_strength', militancyKey: 'stahlhelm_militancy', label: 'Stahlhelm' },
    { strengthKey: 'sa_strength', militancyKey: 'sa_militancy', label: 'SA' },
];

function formatRichText(html: string) {
    return html
        .replace(/\{!/g, '')
        .replace(/!\}/g, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\s*= (.*)$/gm, '<h2>$1</h2>')
        .replace(/\n/g, '<br/>');
}

function RichText({ html, className }: { html: string; className?: string }) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: formatRichText(html) }} />;
}

function flagValue(flags: Record<string, any>, key: string, fallback: unknown = '') {
    const value = flags[key];
    return value === undefined || value === null || value === '' ? fallback : value;
}

function formatMonth(value: unknown) {
    const month = Number(value);
    if (!Number.isFinite(month) || month < 1 || month > 12) {
        return String(value || '');
    }

    return MONTH_NAMES[month - 1];
}

function formatDate(flags: Record<string, any>, view: SessionView) {
    const year = flagValue(flags, 'year', view.time.year);
    const month = flagValue(flags, 'month', view.time.month);
    return `${formatMonth(month)} ${year}`.trim();
}

function formatPercent(value: unknown, fallback = '0%') {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
        return fallback;
    }

    return `${Number(numericValue.toFixed(1))}%`;
}

function formatNumber(value: unknown, fallback = '0') {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
        return fallback;
    }

    return Number(numericValue.toFixed(1)).toString();
}

function formatRelation(value: unknown) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
        return String(value || 'unknown');
    }

    if (numericValue >= 75) return 'warm';
    if (numericValue >= 55) return 'neutral';
    if (numericValue >= 35) return 'cool';
    if (numericValue >= 15) return 'cold';
    return 'hostile';
}

function formatMilitancy(value: unknown) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
        return String(value || 'unknown');
    }

    if (numericValue >= 0.75) return 'High';
    if (numericValue >= 0.35) return 'Medium';
    if (numericValue > 0) return 'Low';
    return 'Nonexistant';
}

function StatusRow({ label, children }: { label: string; children: ComponentChildren }) {
    return (
        <div>
            <dt>{label}</dt>
            <dd>{children}</dd>
        </div>
    );
}

function PartyName({ label, title }: { label: string; title?: string }) {
    return <strong title={title}>{label}</strong>;
}

function MainStatus({ view }: { view: SessionView }) {
    const flags = view.debugFlags;
    const resources = flagValue(flags, 'resources', flagValue(flags, 'month_actions', 0));
    const president = flagValue(flags, 'president', '');
    const presidentParty = flagValue(flags, 'president_party', '');
    const chancellor = flagValue(flags, 'chancellor', '');
    const chancellorParty = flagValue(flags, 'chancellor_party', '');
    const prussiaLeader = flagValue(flags, 'prussia_leader', flagValue(flags, 'prussian_minister_president', ''));
    const prussiaParty = flagValue(flags, 'prussia_party', '');

    return (
        <dl className="status-grid">
            <StatusRow label="Status">{formatDate(flags, view)}</StatusRow>
            <StatusRow label="Resources available">{formatNumber(resources)}</StatusRow>
            <StatusRow label="SPD position">{flagValue(flags, 'spd_position', flags.spd_in_government ? 'in government' : 'opposition')}</StatusRow>
            <StatusRow label="Prussian government">{flagValue(flags, 'prussia_government', flags.prussia_in_government ? 'in government' : '')}</StatusRow>
            <StatusRow label="Internal dissent">{flagValue(flags, 'dissent', flagValue(flags, 'internal_dissent', 'low'))}</StatusRow>
            <StatusRow label="President">{president ? `${president}${presidentParty ? ` (${presidentParty})` : ''}` : ''}</StatusRow>
            <StatusRow label="Chancellor">{chancellor ? `${chancellor}${chancellorParty ? ` (${chancellorParty})` : ''}` : ''}</StatusRow>
            <StatusRow label="Prussian Minister-President">{prussiaLeader ? `${prussiaLeader}${prussiaParty ? ` (${prussiaParty})` : ''}` : ''}</StatusRow>
            <StatusRow label="Reichstag composition">
                <span className="party-list">
                    {PARTY_ROWS.map((party) => (
                        <span key={party.key}>
                            <PartyName label={party.label} title={party.title} />: {formatPercent(flagValue(flags, `${party.key}_r`, flagValue(flags, `${party.key}_votes`, 0)))}
                        </span>
                    ))}
                </span>
            </StatusRow>
            <StatusRow label="Next election">{formatMonth(flagValue(flags, 'next_election_month', ''))} {flagValue(flags, 'next_election_year', '')}</StatusRow>
            <StatusRow label="Next Prussian election">{formatMonth(flagValue(flags, 'next_prussia_election_month', flagValue(flags, 'next_prussian_election_month', '')))} {flagValue(flags, 'next_prussia_election_year', flagValue(flags, 'next_prussian_election_year', ''))}</StatusRow>
            <StatusRow label="Inflation">{formatPercent(flagValue(flags, 'inflation', 0))}</StatusRow>
            <StatusRow label="Economic growth">{formatPercent(flagValue(flags, 'growth', flagValue(flags, 'economic_growth', 0)))}</StatusRow>
        </dl>
    );
}

function PoliticsStatus({ flags }: { flags: Record<string, any> }) {
    return (
        <dl className="status-grid">
            {PARTY_ROWS.filter((party) => party.key !== 'spd' && party.key !== 'other').map((party) => (
                <StatusRow key={party.key} label={`${party.label} relation`}>
                    {formatRelation(flagValue(flags, `${party.key}_relation`, 'unknown'))}
                </StatusRow>
            ))}
            <StatusRow label="Left strength">{flagValue(flags, 'left_strength', '')}</StatusRow>
            <StatusRow label="Center strength">{flagValue(flags, 'center_strength', '')}</StatusRow>
            <StatusRow label="Labor strength">{flagValue(flags, 'labor_strength', '')}</StatusRow>
            <StatusRow label="Reformist strength">{flagValue(flags, 'reformist_strength', '')}</StatusRow>
        </dl>
    );
}

function DefenseStatus({ flags }: { flags: Record<string, any> }) {
    return (
        <dl className="status-grid">
            {PARAMILITARY_ROWS.map((row) => (
                <StatusRow key={row.label} label={row.label}>
                    Strength: {formatNumber(flagValue(flags, row.strengthKey, 0))} thousand; Militarization: {formatMilitancy(flagValue(flags, row.militancyKey, 0))}
                </StatusRow>
            ))}
            <StatusRow label="Reichswehr">{formatNumber(flagValue(flags, 'reichswehr_strength', 100))} thousand troops</StatusRow>
            <StatusRow label="Reichswehr loyalty">{flagValue(flags, 'reichswehr_loyalty', 'generally disloyal')}</StatusRow>
            <StatusRow label="Prussian police">{formatNumber(flagValue(flags, 'prussian_police_strength', 90))} thousand members</StatusRow>
            <StatusRow label="Prussian police loyalty">{flagValue(flags, 'prussian_police_loyalty', 'divided')}</StatusRow>
        </dl>
    );
}

function PollsStatus({ flags }: { flags: Record<string, any> }) {
    return (
        <dl className="status-grid">
            {PARTY_ROWS.map((party) => (
                <StatusRow key={party.key} label={party.label}>
                    {formatPercent(flagValue(flags, `${party.key}_r`, flagValue(flags, `${party.key}_votes`, 0)))}
                </StatusRow>
            ))}
            <StatusRow label="Support for the Republic">{formatPercent(flagValue(flags, 'pro_republic', 0))}</StatusRow>
            <StatusRow label="Workers">{formatPercent(flagValue(flags, 'workers_spd', 0), '0%')} SPD support</StatusRow>
            <StatusRow label="New Middle Class">{formatPercent(flagValue(flags, 'new_middle_spd', 0), '0%')} SPD support</StatusRow>
            <StatusRow label="Old Middle Class">{formatPercent(flagValue(flags, 'old_middle_spd', 0), '0%')} SPD support</StatusRow>
            <StatusRow label="Rural">{formatPercent(flagValue(flags, 'rural_spd', 0), '0%')} SPD support</StatusRow>
            <StatusRow label="Unemployed">{formatPercent(flagValue(flags, 'unemployed_spd', 0), '0%')} SPD support</StatusRow>
            <StatusRow label="Catholics">{formatPercent(flagValue(flags, 'catholics_spd', 0), '0%')} SPD support</StatusRow>
        </dl>
    );
}

function StatusRail({ activeTab, onTabChange, view }: {
    activeTab: StatusTab;
    onTabChange: (tab: StatusTab) => void;
    view: SessionView;
}) {
    return (
        <aside className="status-rail" aria-label="Game status">
            <div className="status-tabs" role="tablist" aria-label="Status panels">
                {(['main', 'politics', 'defense', 'polls'] as const).map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab[0].toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
            <section className="status-panel" aria-label={`${activeTab} status`}>
                {activeTab === 'main' && <MainStatus view={view} />}
                {activeTab === 'politics' && <PoliticsStatus flags={view.debugFlags} />}
                {activeTab === 'defense' && <DefenseStatus flags={view.debugFlags} />}
                {activeTab === 'polls' && <PollsStatus flags={view.debugFlags} />}
            </section>
        </aside>
    );
}

function CardButton({ card, onChoose }: {
    card: SessionCardSnapshot;
    onChoose: (card: SessionCardSnapshot) => void;
}) {
    const image = card.ui?.cardImage;

    return (
        <button className="board-card" type="button" onClick={() => onChoose(card)}>
            {image && <img src={image} alt="" loading="lazy" />}
            <span><RichText html={card.title} /></span>
        </button>
    );
}

function BoardGroup({ title, description, cards, onChoose }: {
    title: string;
    description?: string;
    cards: SessionCardSnapshot[];
    onChoose: (card: SessionCardSnapshot) => void;
}) {
    if (cards.length === 0) {
        return null;
    }

    return (
        <section className="board-group">
            <p className="board-heading">{title}{description ? ` - ${description}` : ''}</p>
            <div className="board-card-grid">
                {cards.map((card) => (
                    <CardButton key={card.id} card={card} onChoose={onChoose} />
                ))}
            </div>
        </section>
    );
}

function BoardSurface({ view, onCardChoose }: {
    view: SessionView;
    onCardChoose: (card: SessionCardSnapshot) => void;
}) {
    const board = view.board;
    if (!board) {
        return null;
    }

    return (
        <div className="board-surface" aria-label="Card board">
            <BoardGroup title="Decks" cards={board.decks} onChoose={onCardChoose} />
            <BoardGroup
                title="Hand"
                description={board.maxCards ? `${board.hand.length}/${board.maxCards} cards` : undefined}
                cards={board.hand}
                onChoose={onCardChoose}
            />
            <BoardGroup
                title="Advisors"
                description={board.pinnedDescription}
                cards={board.pinnedCards}
                onChoose={onCardChoose}
            />
        </div>
    );
}

export function App() {
    const view = sessionView.value;
    const isSessionReady = view.ready;
    const hasPersistedSession = view.hasPersistedSession;
    const [persistenceStatus, setPersistenceStatus] = useState<string | null>(null);
    const [activeStatusTab, setActiveStatusTab] = useState<StatusTab>('main');
    const [overlay, setOverlay] = useState<Overlay>(null);

    useEffect(() => {
        void initializeSession();
    }, []);

    useEffect(() => {
        if (view.persistenceError) {
            setPersistenceStatus(view.persistenceError);
        }
    }, [view.persistenceError]);

    useEffect(() => {
        if (!isSessionReady) {
            return;
        }

        const snapshotWithPersistence = {
            sceneId: view.sceneId,
            currentSceneId: view.currentSceneId,
            title: view.title,
            subtitle: view.subtitle,
            time: view.time,
            visibleChoices: view.visibleChoices,
            board: view.board,
            debugFlags: view.debugFlags,
            persistence: {
                adapterKind: view.adapterKind,
                hasPersistedSession,
            },
        };

        window.render_game_to_text = () => JSON.stringify(snapshotWithPersistence);

        window.advanceTime = () => {};

        return () => {
            delete window.render_game_to_text;
            delete window.advanceTime;
        };
    }, [
        isSessionReady,
        hasPersistedSession,
        view.adapterKind,
        view.sceneId,
        view.currentSceneId,
        view.title,
        view.subtitle,
        view.time.year,
        view.time.month,
        view.time.week,
        JSON.stringify(view.visibleChoices),
        JSON.stringify(view.board),
    ]);

    if (!isSessionReady) {
        return <div style={{ padding: '2rem' }}>Loading session...</div>;
    }

    const handleSave = async () => {
        const nextView = await saveSession();
        if (!nextView.persistenceError) {
            setPersistenceStatus('Session saved locally.');
            return;
        }

        setPersistenceStatus(nextView.persistenceError ?? 'Unable to save the current session.');
    };

    const handleLoad = async () => {
        const nextView = await loadPersistedSession();
        if (nextView.hasPersistedSession && !nextView.persistenceError) {
            setPersistenceStatus('Saved session loaded.');
            return;
        }

        setPersistenceStatus(nextView.persistenceError ?? 'No saved session is available.');
    };

    const handleReset = async () => {
        const nextView = await resetSession();
        setPersistenceStatus(nextView.persistenceError ?? 'Started a new session.');
    };

    const handleBoardCardChoose = (card: SessionCardSnapshot) => {
        if (card.choiceId) {
            void chooseChoice(card.choiceId);
            return;
        }

        void goToScene(card.id);
    };

    const isLibraryDetail = view.sceneId.startsWith('library.') && view.sceneId !== 'library.menu';
    const boardChoiceIds = new Set([
        ...(view.board?.decks ?? []).flatMap((card) => card.choiceId ? [card.choiceId] : []),
        ...(view.board?.hand ?? []).flatMap((card) => card.choiceId ? [card.choiceId] : []),
        ...(view.board?.pinnedCards ?? []).flatMap((card) => card.choiceId ? [card.choiceId] : []),
        ...((view.board?.pinnedCards.length ?? 0) > 0 ? ['advisor'] : []),
    ]);
    const genericChoices = view.visibleChoices.filter((choice) => (
        !boardChoiceIds.has(choice.id) && !choice.target?.ui?.cardKind
    ));
    const sceneIdParts = view.sceneId.split('.');
    const defaultGeneratedTitle = sceneIdParts[sceneIdParts.length - 1] ?? view.sceneId;
    const sceneTitle = view.board && (view.title === view.sceneId || view.title === defaultGeneratedTitle)
        ? ''
        : view.title;

    return (
        <div className="app-root">
            <header className="game-header">
                <div>
                    <h1>Dynamic Social Democracy: An Alternate History</h1>
                    <p>by Autumn Chen, modded by originn0</p>
                </div>
                <nav aria-label="Game navigation">
                    <button type="button" onClick={() => void goToScene('library.menu')}>Library</button>
                    <button type="button" onClick={() => setOverlay('save-load')}>Save/Load</button>
                    <button type="button" onClick={() => setOverlay('options')}>Options</button>
                </nav>
            </header>

            <div className="app-shell">
                <StatusRail activeTab={activeStatusTab} onTabChange={setActiveStatusTab} view={view} />

                <main className="play-area">
                    <article className="scene-card">
                        <header className="scene-header">
                            {sceneTitle && <h1><RichText html={sceneTitle} /></h1>}
                            {view.subtitle && <p className="scene-subtitle"><RichText html={view.subtitle} /></p>}
                        </header>

                        <BoardSurface view={view} onCardChoose={handleBoardCardChoose} />

                        <section className="scene-content">
                            <RichText html={view.contentHtml} />
                        </section>
                    </article>

                    <section className="choice-dock" aria-label="Choices">
                        {genericChoices.map((choice) => (
                            <button
                                key={choice.id}
                                className="choice-button"
                                data-choice-id={choice.id}
                                onClick={() => void chooseChoice(choice.id)}
                            >
                                <RichText html={choice.text} />
                            </button>
                        ))}
                        {genericChoices.length === 0 && !isLibraryDetail && !view.board && <p className="empty-choices">No choices available.</p>}
                        {isLibraryDetail && (
                            <button className="choice-button secondary" type="button" onClick={() => void goBack()}>
                                Back to Library
                            </button>
                        )}
                    </section>

                    <section className="session-panel" aria-label="Session controls">
                        <button aria-label="Save Session" onClick={() => void handleSave()}>Save</button>
                        <button aria-label="Load Session" onClick={() => void handleLoad()} disabled={!hasPersistedSession}>Load</button>
                        <button aria-label="New Session" onClick={() => void handleReset()}>New</button>
                        <p role="status">
                            {persistenceStatus ?? (hasPersistedSession ? 'Saved session available in this browser.' : 'No saved session in this browser.')}
                        </p>
                    </section>

                    <details className="debug-panel">
                        <summary>Debug State</summary>
                        <pre>{JSON.stringify(view.debugFlags, null, 2)}</pre>
                    </details>
                </main>
            </div>

            {overlay && (
                <div className="overlay-backdrop">
                    <section className="overlay-panel" role="dialog" aria-label={overlay === 'save-load' ? 'Save Load' : 'Options'}>
                        {overlay === 'save-load' ? (
                            <>
                                <h2>Save/Load</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Slot</th>
                                            <th>Action</th>
                                            <th>State</th>
                                        </tr>
                                        <tr>
                                            <td>Auto</td>
                                            <td><button type="button" onClick={() => void handleLoad()} disabled={!hasPersistedSession}>Load</button></td>
                                            <td>{hasPersistedSession ? 'Saved session available' : 'Empty'}</td>
                                        </tr>
                                        <tr>
                                            <td>0</td>
                                            <td><button type="button" onClick={() => void handleSave()}>Save</button></td>
                                            <td>{view.sceneId}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button type="button" onClick={() => setOverlay(null)}>Close</button>
                            </>
                        ) : (
                            <>
                                <h2>Options</h2>
                                {['Backgrounds', 'Event images', 'Animations', 'Music', 'Color scheme', 'Colored text'].map((option) => (
                                    <fieldset key={option}>
                                        <legend>{option}</legend>
                                        <label><input type="radio" name={option} defaultChecked /> On</label>
                                        <label><input type="radio" name={option} /> Off</label>
                                    </fieldset>
                                ))}
                                <button type="button" onClick={() => setOverlay(null)}>Close</button>
                            </>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}

render(<App />, document.getElementById('app') as HTMLElement);
