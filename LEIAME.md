# Duart Lingo com contas na nuvem

Esta pasta é o site completo, com contas em qualquer aparelho, ranking em tempo real e painel do professor vendo todos os alunos. Usa o Firebase do Google (plano gratuito basta para turmas).

## Conteúdo
- `public/index.html`: o site (lições, aulas de 5 minutos, quiz, ranking, painel do professor)
- `public/firebase.js`: ligação com o Firebase
- `public/firebase-config.js`: **é aqui que você cola os dados do seu projeto**
- `firestore.rules`: regras de segurança do banco de dados
- `firebase.json`: configuração de publicação

## Passo a passo

**1. Criar o projeto.** Entre em https://console.firebase.google.com, clique em **Adicionar projeto** e dê o nome que quiser (pode desligar o Google Analytics).

**2. Ligar o login.** Menu **Authentication** > **Vamos começar** > aba **Método de login** > **E-mail/senha** > ative e salve.

**3. Criar o banco.** Menu **Firestore Database** > **Criar banco de dados** > modo **produção** > região `southamerica-east1` (São Paulo).

**4. Colar as regras.** No Firestore, aba **Regras**: apague tudo, cole o conteúdo do arquivo `firestore.rules` e clique em **Publicar**.

**5. Criar a conta do professor (faça antes de abrir o site para os alunos).** Em **Authentication** > aba **Usuários** > **Adicionar usuário**:
- E-mail: `professor@duartlingo.app`
- Senha: a que você quiser, com pelo menos 6 caracteres (a `676767` funciona, mas troque por outra, porque ela já apareceu em conversa)

Criar esta conta antes impede que um aluno se registre com o nome "professor". Para entrar no painel, use o nome `professor` e essa senha.

**6. Pegar os dados do app.** Na página inicial do projeto, clique no ícone **</>** (Web), dê um apelido e registre. O Firebase mostra um bloco `firebaseConfig`. Copie `apiKey`, `authDomain`, `projectId` e `appId` para `public/firebase-config.js`. Essa chave não é secreta; quem protege os dados são as regras do passo 4.

**7. Publicar o site.** Escolha uma opção:
- **Netlify (mais fácil):** entre em https://app.netlify.com/drop e arraste a pasta `public`. Depois copie o endereço que o Netlify der (algo como `xxxx.netlify.app`) e, no Firebase, vá em **Authentication** > **Configurações** > **Domínios autorizados** > **Adicionar domínio** e cole esse endereço. Sem isso o login não funciona.
- **Firebase Hosting:** instale o Node.js e rode, dentro desta pasta: `npm i -g firebase-tools`, `firebase login`, `firebase use --add` (escolha seu projeto) e `firebase deploy`. O endereço `.web.app` já vem autorizado.

**8. Testar.** Abra o endereço no celular, crie uma conta de aluno e responda uma pergunta. Abra em outro aparelho, crie outra conta e veja o ranking atualizar. Entre como `professor` para ver o painel.

## O que muda em relação à versão anterior
- Senha mínima de **6 caracteres** (regra do Firebase).
- O professor pode **zerar o progresso** e **remover do ranking**. Não dá para trocar a senha de um aluno pelo painel: se alguém esquecer a senha, apague o usuário em **Authentication** > **Usuários** e peça que ele crie a conta de novo.
- Cada aluno só consegue gravar o próprio progresso, e ganhar no máximo 50 XP por gravação. Isso dificulta trapaça simples, mas não impede alguém muito técnico.
- As contas criadas na versão anterior (salvas no navegador) **não** são migradas.
