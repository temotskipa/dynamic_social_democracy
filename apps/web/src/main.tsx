import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import {
    chooseChoice,
    initializeSession,
    loadPersistedSession,
    resetSession,
    saveSession,
    sessionView,
} from './engine/state';
import './styles.css';

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

export function App() {
    const view = sessionView.value;
    const isSessionReady = view.ready;
    const hasPersistedSession = view.hasPersistedSession;
    const [persistenceStatus, setPersistenceStatus] = useState<string | null>(null);

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
        view.currentSceneId,
        view.title,
        view.subtitle,
        view.time.year,
        view.time.month,
        view.time.week,
        JSON.stringify(view.visibleChoices),
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

    return (
        <div className="app-shell">
            <aside className="status-rail" aria-label="Game status">
                <div className="brand-block">
                    <span className="brand-kicker">Dynamic</span>
                    <strong>Social Democracy</strong>
                </div>
                <dl className="status-grid">
                    <div>
                        <dt>Scene</dt>
                        <dd>{view.sceneId}</dd>
                    </div>
                    <div>
                        <dt>Date</dt>
                        <dd>{view.time.year}-{view.time.month}</dd>
                    </div>
                    <div>
                        <dt>Session</dt>
                        <dd>{view.adapterKind}</dd>
                    </div>
                    <div>
                        <dt>Saved</dt>
                        <dd>{hasPersistedSession ? 'yes' : 'no'}</dd>
                    </div>
                </dl>
                <section className="session-panel" aria-label="Session controls">
                    <button aria-label="Save Session" onClick={() => void handleSave()}>Save</button>
                    <button aria-label="Load Session" onClick={() => void handleLoad()} disabled={!hasPersistedSession}>Load</button>
                    <button aria-label="New Session" onClick={() => void handleReset()}>New</button>
                    <p role="status">
                        {persistenceStatus ?? (hasPersistedSession ? 'Saved session available in this browser.' : 'No saved session in this browser.')}
                    </p>
                </section>
            </aside>

            <main className="play-area">
                <article className="scene-card">
                    <header className="scene-header">
                        {view.title && <h1><RichText html={view.title} /></h1>}
                        {view.subtitle && <p className="scene-subtitle"><RichText html={view.subtitle} /></p>}
                    </header>

                    <section className="scene-content">
                        <RichText html={view.contentHtml} />
                    </section>
                </article>

                <section className="choice-dock" aria-label="Choices">
                    {view.visibleChoices.map((choice) => (
                        <button
                            key={choice.id}
                            className="choice-button"
                            data-choice-id={choice.id}
                            onClick={() => void chooseChoice(choice.id)}
                        >
                            <RichText html={choice.text} />
                        </button>
                    ))}
                    {view.visibleChoices.length === 0 && <p className="empty-choices">No choices available.</p>}
                </section>

                <details className="debug-panel">
                    <summary>Debug State</summary>
                    <pre>{JSON.stringify(view.debugFlags, null, 2)}</pre>
                </details>
            </main>
        </div>
    );
}

render(<App />, document.getElementById('app') as HTMLElement);
