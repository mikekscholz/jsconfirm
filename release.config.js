module.exports = {
  debug: true,
  branches: ['main'],
  verifyConditions: ['@semantic-release/changelog', '@semantic-release/npm', '@semantic-release/github'],
  prepare: [
    {
      path: '@semantic-release/exec',
      cmd: 'VERSION=${nextRelease.version} ./node_modules/.bin/zx tools/build-dist.mjs',
    },
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
  publish: [
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/jsconfirm.all.js' },
          { path: 'dist/jsconfirm.all.min.js' },
          { path: 'dist/jsconfirm.css' },
          { path: 'dist/jsconfirm.js' },
          { path: 'dist/jsconfirm.min.css' },
          { path: 'dist/jsconfirm.min.js' },
        ],
      },
    ],
  ],
  success: [
    '@semantic-release/github',
    {
      path: '@semantic-release/exec',
      cmd: './node_modules/.bin/zx tools/purge-jsdelivr.mjs',
    },
  ],
}
