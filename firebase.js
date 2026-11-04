import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore,doc,getDoc,setDoc,updateDoc,collection,onSnapshot,query,orderBy,limit,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {firebaseConfig} from "./firebase-config.js";

if(String(firebaseConfig.apiKey).startsWith("COLE")){window.onFatal("Falta configurar o Firebase. Abra public/firebase-config.js e cole os dados do seu projeto (veja o LEIAME).")}
else{
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
const DOMAIN="duartlingo.app";
const slug=n=>n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");
const fresh=()=>({xp:0,streak:0,done:[],hearts:5});
const msg=e=>({"auth/email-already-in-use":"Esse nome já está em uso. Escolha outro ou toque em Entrar.","auth/invalid-credential":"Nome ou senha incorretos.","auth/wrong-password":"Nome ou senha incorretos.","auth/user-not-found":"Nome ou senha incorretos.","auth/weak-password":"A senha precisa ter pelo menos 6 caracteres.","auth/network-request-failed":"Sem internet. Tente de novo.","auth/too-many-requests":"Muitas tentativas. Espere um pouco e tente de novo."}[e.code]||("Erro: "+(e.code||e.message)));
let creating=false;
async function handle(user){
 const ref=doc(db,"users",user.uid);let s=await getDoc(ref);
 if(!s.exists()){await setDoc(ref,{name:user.displayName||"Aluno",...fresh(),created:serverTimestamp()});s=await getDoc(ref)}
 window.onUser({uid:user.uid,name:s.data().name},s.data());
}
onAuthStateChanged(auth,u=>{if(creating)return;u?handle(u).catch(e=>window.onFatal("Não foi possível carregar sua conta: "+(e.code||e.message))):window.onUser(null)});
window.FB={
 async signUp(name,pw){const k=slug(name);if(!k)throw new Error("Use letras ou números no nome.");
  creating=true;
  try{const c=await createUserWithEmailAndPassword(auth,k+"@"+DOMAIN,pw);await updateProfile(c.user,{displayName:name});
   await setDoc(doc(db,"users",c.user.uid),{name,...fresh(),created:serverTimestamp()});creating=false;await handle(c.user)}
  catch(e){creating=false;throw new Error(e.code?msg(e):e.message)}},
 async signIn(name,pw){const k=slug(name);if(!k)throw new Error("Nome ou senha incorretos.");
  try{await signInWithEmailAndPassword(auth,k+"@"+DOMAIN,pw)}catch(e){throw new Error(msg(e))}},
 signOut:()=>signOut(auth),
 save(uid,d){updateDoc(doc(db,"users",uid),{xp:d.xp,streak:d.streak,done:d.done,hearts:d.hearts}).catch(e=>console.warn("save",e.code))},
 watchRank(cb){return onSnapshot(query(collection(db,"users"),orderBy("xp","desc"),limit(300)),s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),e=>console.warn("rank",e.code))}
};
}
