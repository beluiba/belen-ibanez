import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ...existing header ... */}
        <div id="modal-root" />
        <main id="main-content">{children}</main>
        {/* ...existing footer ... */}
      </body>
    </html>
  );
}