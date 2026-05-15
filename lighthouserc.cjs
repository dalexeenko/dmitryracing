module.exports = {
  ci: {
    collect: {
      url: ["http://127.0.0.1:3001/"],
      numberOfRuns: 1,
      settings: {
        chromeFlags:
          "--no-sandbox --disable-dev-shm-usage --disable-gpu --disable-software-rasterizer",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.35 }],
        "categories:accessibility": ["warn", { minScore: 0.75 }],
      },
    },
  },
};
