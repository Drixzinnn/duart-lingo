# Duart Lingo com login básico e contas no servidor

Login simples (nome + senha). Qualquer pessoa cria a conta e entra de qualquer aparelho; todas as contas e o progresso ficam guardados no Firebase (plano gratuito basta).

## Arquivos
- `public/index.html`: o site
- `public/firebase.js`: ligação com o Firebase
- `public/firebase-config.js`: **é aqui que você cola os dados do seu projeto**
- `firestore.rules`: regras de segurança do banco
- `firebase.json`: configuração de publicação

## Passo a passo
1. **Criar o projeto** em https://console.firebase.google.com (Adicionar projeto).
2. **Authentication** > Vamos começar > Método de login > **E-mail/senha** > ativar e salvar.
3. **Firestore Database** > Criar banco de dados > modo produção > região `southamerica-east1`.
4. **Regras:** no Firestore, aba Regras, apague tudo, cole o conteúdo de `firestore.rules` e clique em Publicar.
5. **Dados do app:** na página inicial do projeto, clique no ícone **</>** (Web), registre o app e copie `apiKey`, `authDomain`, `projectId` e `appId` para `public/firebase-config.js`.
6. **Publicar:**
   - Netlify: arraste a pasta `public` em https://app.netlify.com/drop. Depois, no Firebase, em Authentication > Configurações > Domínios autorizados, adicione o endereço `xxxx.netlify.app`. Sem isso o login não funciona.
   - Firebase Hosting: `npm i -g firebase-tools`, `firebase login`, `firebase use --add`, `firebase deploy`.
7. **Testar:** crie uma conta no celular e outra em outro aparelho; entre de novo com a mesma senha e confira que o progresso voltou.

## Observações
- Senha mínima de 6 caracteres (regra do Firebase).
- Não existe mais painel do professor nem nome reservado.
- Quem esquecer a senha: apague o usuário em Authentication > Usuários e a pessoa cria a conta de novo.
- Cada pessoa só grava o próprio progresso, com limite de 50 XP por gravação.
