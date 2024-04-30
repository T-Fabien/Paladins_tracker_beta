module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.paladins.com/paladinsapi.svc/:path*', // L'URL de votre API cible
      },
    ];
  },
};
