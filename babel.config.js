module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
	//https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
};