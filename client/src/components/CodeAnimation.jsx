import { useEffect, useRef } from "react";

export function CodeAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const codeLines = [
      'function initAayanInfotechApp() {',
      '  const app = new AayanInfotechApp();',
      '  app.initialize({',
      '    modules: ["ai", "cloud", "security"],',
      '    theme: "modern",',
      '    version: "2.4.1"',
      '  });',
      '',
      '  // Connect to services',
      '  app.connect();',
      '',
      '  return app.start();',
      '}',
      '',
      'initAayanInfotechApp().then(result => {',
      '  console.log("App started successfully!");',
      '});'
    ];

    let html = '';
    codeLines.forEach((line, index) => {
      const delay = index * 150;
      html += `<div class="code-line" style="animation-delay: ${delay}ms">${line || '&nbsp;'}</div>`;
    });

    container.innerHTML = html;

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className="w-full max-w-lg bg-gray-900 rounded-xl p-6 font-mono text-sm leading-relaxed overflow-hidden shadow-xl">
      {/* Code window header */}
      <div className="flex items-center justify-start mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
      </div>

      {/* Code content */}
      <div ref={containerRef} className="text-gray-300 overflow-hidden"></div>

      {/* Animation styles */}
      <style>
        {`
          .code-line {
            opacity: 0;
            transform: translateY(1rem);
            animation: fadeIn 0.5s ease forwards;
            white-space: pre;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
