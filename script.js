const cards=[
{q:"API Design",a:"Clear, consistent endpoints using HTTP semantics.",d:"Basic"},
{q:"Saga",a:"Manages distributed transactions with compensating actions.",d:"Advanced"},
{q:"DNS",a:"Resolves domain names to IPs.",d:"Basic"},
{q:"Idempotency",a:"Same request repeated gives same result.",d:"Intermediate"},
{q:"JWT",a:"Stateless authentication token.",d:"Intermediate"},
{q:"HTTPS",a:"Encrypts data in transit.",d:"Basic"},
{q:"Redis",a:"In-memory datastore for caching.",d:"Intermediate"},
{q:"RPC",a:"Remote calls like local functions.",d:"Intermediate"},
{q:"Monolith vs Microservices",a:"Simplicity vs scalability tradeoff.",d:"Basic"},
{q:"Modular Monolith",a:"Monolith with strong internal boundaries.",d:"Intermediate"},
{q:"Web Request Path",a:"DNS → LB → App → DB.",d:"Basic"},
{q:"System Design Fundamentals",a:"Scalability, availability, latency.",d:"Basic"},
{q:"Consistent Hashing",a:"Minimizes rebalancing on node change.",d:"Advanced"},
{q:"API Versioning",a:"Evolve APIs without breaking clients.",d:"Intermediate"},
{q:"Microservices 101",a:"Small, independent services.",d:"Intermediate"},
{q:"Frontend 101",a:"Rendering, state, performance.",d:"Basic"},
{q:"WebSockets",a:"Real-time bidirectional communication.",d:"Intermediate"},
{q:"Bloom Filters",a:"Probabilistic membership check.",d:"Advanced"},
{q:"Security Basics",a:"Hash passwords, never plaintext.",d:"Basic"},
{q:"Service Discovery",a:"Dynamic service lookup.",d:"Intermediate"}
];
let deck=[...cards],i=0;
const card=document.getElementById("card"),
q=document.getElementById("question"),
a=document.getElementById("answer");
function show(){card.classList.remove("flipped");q.textContent=deck[i].q;a.textContent=deck[i].a}
card.addEventListener("pointerup",()=>card.classList.toggle("flipped"));
document.querySelectorAll(".actions button").forEach(b=>b.onclick=e=>{e.stopPropagation();i++;i<deck.length?show():alert("Done")});
document.getElementById("shuffleBtn").onclick=()=>{deck.sort(()=>Math.random()-.5);i=0;show()};
document.getElementById("difficultyFilter").onchange=e=>{deck=e.target.value==="All"?[...cards]:cards.filter(c=>c.d===e.target.value);i=0;show()};
show();