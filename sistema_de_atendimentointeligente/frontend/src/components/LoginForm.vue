<template>
  <form @submit.prevent="submit">
    <input v-model="email" placeholder="Email"/>
    <input v-model="password" placeholder="Password" type="password"/>
    <button>Login</button>
  </form>
</template>
<script>
import api from '../services/api';
export default {
  data(){ return { email:'', password:'' } },
  methods:{
    async submit(){
      const res = await api.post('/auth/login',{ email:this.email, password:this.password });
      localStorage.setItem('token', res.data.token);
      this.$router.push('/dashboard');
    }
  }
}
</script>
