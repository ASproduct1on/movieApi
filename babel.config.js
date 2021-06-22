const presets = [
    [
      '@babel/preset-env',
      {
        "targets": "defaults",
      },
    ],
    '@babel/preset-typescript',
  ];

  const plugins = ['@babel/plugin-proposal-class-properties'];

  module.exports = {
    presets,
    plugins,
  };
