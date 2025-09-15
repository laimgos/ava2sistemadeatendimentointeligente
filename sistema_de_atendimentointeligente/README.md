# Sistema de Atendimento Inteligente - Entrega

## Estrutura
- backend/  -> API Node.js + Express + MongoDB
- frontend/ -> App Vue.js 3

## Como preparar repositório Git e subir ao GitHub
1. Crie repositório no GitHub (ex: sistema-atendimento).
2. No seu projeto local:
   ```
   git init
   git add .
   git commit -m "Initial commit - scaffold"
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/<seu-repo>.git
   git push -u origin main
   ```
3. Adicione `.gitignore` com `node_modules` e arquivos sensíveis.

## Deploy sugerido
- Backend: Render/Heroku/DigitalOcean. Configure variáveis de ambiente (MONGO_URI, TOKEN_SECRET, OPENWEATHER_KEY).
- Frontend: Vercel/Netlify - configure build command (`npm run build`) e apontar para pasta `dist`.

## Arquivos incluídos
- scaffold de backend e frontend
- README em cada pasta com instruções básicas

## Observações finais
Substitua valores em `.env` e adicione suas chaves de API antes de rodar em produção.
