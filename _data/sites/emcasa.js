module.exports = {
  name: "emcasa-home", // optional, falls back to object key
  description: "emcasa.com",
  options: {
    frequency: 60 * 23, // (in minutes), 23 hours
    freshChrome: "site", // Use "site" if sites are all on the same origin and share assets.
  },
  urls: [
    "https://www.emcasa.com",
    "https://www.emcasa.com/imoveis/sp/sao-paulo",
    "https://www.emcasa.com/imoveis/sp/sao-paulo?nextView=true",
    "https://www.emcasa.com/imoveis/sp/sao-paulo/perdizes/rua-diana/id-1451?nextView=true",
    "https://www.emcasa.com/imoveis/sp/sao-paulo/perdizes/rua-diana/id-1451",
    "https://www.emcasa.com/especialistas-de-vendas",
    "https://www.emcasa.com/vender",
    "https://www.emcasa.com/corretor-parceiro",
  ],
};
