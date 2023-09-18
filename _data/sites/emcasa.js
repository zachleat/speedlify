module.exports = {
  name: "emcasa-home", // optional, falls back to object key
  description: "emcasa.com",
  options: {
    frequency: 60 * 23, // (in minutes), 23 hours
    freshChrome: "site", // Use "site" if sites are all on the same origin and share assets.
  },
  urls: [
    "https://emcasa.com",
    "https://emcasa.com/imoveis/sp/sao-paulo",
    "https://emcasa.com/imoveis/sp/sao-paulo/vila-mariana/condominio-abitare-chacara-klabin",
    "https://emcasa.com/imoveis/sp/sao-paulo/bela-vista/hospital-santa-catarina",
    "https://emcasa.com/imoveis/sp/sao-paulo/perdizes/rua-diana/id-1451",
    "https://emcasa.com/especialistas-de-vendas",
    "https://emcasa.com/vender",
    "https://emcasa.com/corretor-parceiro",
    "https://emcasa.com/regioes-atendidas",
    "https://emcasa.com/regioes-atendidas/sp/sao-paulo",
    "https://emcasa.com/regioes-atendidas/sp/sao-paulo/vila-mariana",
    "https://emcasa.com/regioes-atendidas/sp/sao-paulo/vila-mariana/condominio-abitare-chacara-klabin",
  ],
};
