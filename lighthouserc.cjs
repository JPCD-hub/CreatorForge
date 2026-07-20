module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx http-server out -p 4174 -c-1",
      startServerReadyPattern: "Available",
      url: ["http://127.0.0.1:4174/", "http://127.0.0.1:4174/#proyectos", "http://127.0.0.1:4174/#planes", "http://127.0.0.1:4174/#contacto"],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: { target: "filesystem", outputDir: "reports/lighthouse" },
  },
};
