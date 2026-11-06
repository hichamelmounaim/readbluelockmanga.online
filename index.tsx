import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// The prerendered HTML carries per-page head tags for crawlers. React (via react-helmet-async)
// renders its own copies, so drop the static ones first to avoid duplicate canonicals/titles.
document.querySelectorAll('[data-prerender]').forEach(node => node.remove());

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);