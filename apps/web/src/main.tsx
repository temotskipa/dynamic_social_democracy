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

    const formatContent = (html: string) => {
        return html
            .replace(/\n/g, '<br/>')
            .replace(/= (.*)/g, '<h1>$1</h1>');
    };

    return (
        <div className="game-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <header>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div>
                        {view.title && <h1 style={{ fontSize: '2em', marginBottom: '0.5em' }}>{view.title}</h1>}
                        {view.subtitle && <h3 style={{ color: '#666' }}>{view.subtitle}</h3>}
                    </div>
                    <section aria-label="Session controls" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '220px' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button onClick={() => void handleSave()} style={{ padding: '0.5rem 0.75rem' }}>
                                Save Session
                            </button>
                            <button
                                onClick={() => void handleLoad()}
                                disabled={!hasPersistedSession}
                                style={{ padding: '0.5rem 0.75rem' }}
                            >
                                Load Session
                            </button>
                            <button onClick={() => void handleReset()} style={{ padding: '0.5rem 0.75rem' }}>
                                New Session
                            </button>
                        </div>
                        <p role="status" style={{ margin: 0, color: '#555', fontSize: '0.9em' }}>
                            {persistenceStatus ?? (hasPersistedSession ? 'Saved session available in this browser.' : 'No saved session in this browser.')}
                        </p>
                    </section>
                </div>
            </header>

            <main className="scene-content" style={{ margin: '2rem 0', lineHeight: '1.6', fontSize: '1.1em' }}>
                <div dangerouslySetInnerHTML={{ __html: formatContent(view.contentHtml) }} />
            </main>

            <section className="choices" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {view.visibleChoices.map((choice) => (
                    <button
                        key={choice.id}
                        onClick={() => void chooseChoice(choice.id)}
                        style={{
                            padding: '1rem',
                            textAlign: 'left',
                            fontSize: '1em',
                            cursor: 'pointer',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    >
                        {choice.text}
                    </button>
                ))}
                {view.visibleChoices.length === 0 && <p>No choices available.</p>}
            </section>

            <footer style={{ marginTop: '4rem', borderTop: '1px solid #eee', paddingTop: '1rem', color: '#999', fontSize: '0.8em' }}>
                <p>Scene: <code>{view.sceneId}</code> | Time: {view.time.year}-{view.time.month}</p>
                <p>Session Adapter: <code>{view.adapterKind}</code> | Saved Session: {hasPersistedSession ? 'yes' : 'no'}</p>
                <details>
                    <summary>Debug State</summary>
                    <pre>{JSON.stringify(view.debugFlags, null, 2)}</pre>
                </details>
            </footer>
        </div>
    );
}

render(<App />, document.getElementById('app') as HTMLElement);
