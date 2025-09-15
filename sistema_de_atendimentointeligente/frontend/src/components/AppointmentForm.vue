<template>
  <form @submit.prevent="submit">
    <input v-model="cep" placeholder="CEP" @blur="lookupCep"/>
    <input v-model="street" placeholder="Street"/>
    <input v-model="city" placeholder="City"/>
    <input v-model="date" type="datetime-local"/>
    <button>Agendar</button>
  </form>
</template>
<script>
import api from '../services/api';
export default {
  data(){ return { cep:'', street:'', city:'', date:'' } },
  methods:{
    async lookupCep(){
      if(!this.cep) return;
      const res = await api.get(`/cep/${this.cep}`);
      const d = res.data;
      this.street = d.logradouro || '';
      this.city = d.localidade || '';
    },
    async submit(){
      const token = localStorage.getItem('token');
      await api.post('/appointments',{ patientId:'', date:this.date, address:{cep:this.cep, street:this.street, city:this.city}},{ headers:{ Authorization:`Bearer ${token}` }});
      alert('Agendado');
    }
  }
}
</script>
