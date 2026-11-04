// ============================================================================
// Duart Lingo — configuração do registro de logins no Firebase
//
// Este arquivo é OPCIONAL. Sem ele, o site funciona normalmente (login local
// no navegador), apenas não registra os acessos numa lista central.
//
// COMO ATIVAR (5 minutos, plano gratuito do Firebase):
//
// 1. Crie um projeto em https://console.firebase.google.com
// 2. Menu "Firestore Database" > Criar banco de dados > modo produção
//    > região southamerica-east1 (São Paulo)
// 3. Menu "Configurações do projeto" (engrenagem) > aba "Geral"
//    > role até "Seus apps" > clique no ícone </> (Web) > registre o app
// 4. Copie apiKey e projectId do bloco firebaseConfig que aparece
// 5. Cole os dois valores abaixo, entre as aspas
// 6. Na aba "Regras" do Firestore, cole e publique:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /logins/{doc} {
//          allow create: if true;   // qualquer aluno pode registrar um acesso
//          allow read, update, delete: if false;
//        }
//      }
//    }
//
// Para VER a lista de acessos: Firestore > coleção "logins". Cada documento
// tem tipo (cadastro/login), nome, quando, pagina e navegador.
// ============================================================================

window.DL_FIREBASE = {
  apiKey: "",      // ex.: "AIzaSy..."
  projectId: ""    // ex.: "duart-lingo"
};
