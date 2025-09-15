const axios = require('axios');
async function lookupCep(cep){
  const clean = cep.replace(/\D/g,'');
  const res = await axios.get(`https://viacep.com.br/ws/${clean}/json/`);
  return res.data;
}
module.exports = { lookupCep };
