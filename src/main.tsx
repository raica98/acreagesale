import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import '../tailwind.css'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          maxWidth: '600px',
          margin: '100px auto',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '10px' }}>Something went wrong</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = document.getElementById('app');

if (!root) {
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 100px auto; text-align: center;">
      <h1 style="color: #dc2626;">Error: Root element not found</h1>
      <p style="color: #666;">The app container element is missing from the HTML.</p>
    </div>
  `;
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
}