// =======================
// System Design Flashcards
// =======================
//
// Difficulty tags: "Basic" | "Intermediate" | "Advanced"
//
const FLASHCARDS = [

  {
    q: "1) API Design — What is it?",
    a: `How clients interact with your system through well-defined endpoints.

Key points:
• Use clear resource names (/users, /orders)
• Follow HTTP semantics (GET, POST, PUT, DELETE)
• Return proper status codes
• Keep APIs consistent and predictable

Interview line:
“Good API design minimizes coupling and maximizes clarity for clients.”`,
    d: "Basic"
  },

  {
    q: "2) Saga — What is it?",
    a: `A pattern to manage distributed transactions across services.

Key points:
• Breaks a transaction into steps
• Each step has a compensating action
• Avoids global locks

Interview line:
“Saga trades strong consistency for eventual consistency in microservices.”`,
    d: "Intermediate"
  },

  {
    q: "3) DNS — What is it?",
    a: `Translates domain names to IP addresses.

Key points:
• Caching improves performance
• TTL controls how long records are cached
• Critical for availability and latency

Interview line:
“DNS is the first dependency in almost every web request.”`,
    d: "Basic"
  },

  {
    q: "4) Idempotency — What is it?",
    a: `Performing an operation multiple times has the same effect as once.

Key points:
• Critical for retries
• Common in payment and order APIs
• Usually implemented with idempotency keys

Interview line:
“Idempotency makes distributed systems resilient to retries.”`,
    d: "Intermediate"
  },

  {
    q: "5) JWT — What is it?",
    a: `A compact, stateless authentication token.

Key points:
• Signed, not encrypted (by default)
• Stored on client
• No server-side session storage

Interview line:
“JWT scales well but requires careful expiration and rotation.”`,
    d: "Intermediate"
  },

  {
    q: "6) HTTPS — What is it?",
    a: `HTTP over TLS for secure communication.

Key points:
• Encrypts data in transit
• Prevents man-in-the-middle attacks
• Required for modern browsers

Interview line:
“HTTPS protects both data integrity and user trust.”`,
    d: "Basic"
  },

  {
    q: "7) Redis — What is it?",
    a: `An in-memory data store.

Key points:
• Used for caching, sessions, rate limiting
• Extremely fast
• Data structures like lists, sets, hashes

Interview line:
“Redis reduces database load and improves latency.”`,
    d: "Basic"
  },

  {
    q: "8) RPC — What is it?",
    a: `Calling a remote service like a local function.

Key points:
• Strong contracts
• Faster than REST in some cases
• Tighter coupling

Interview line:
“RPC optimizes performance but reduces flexibility.”`,
    d: "Intermediate"
  },

  {
    q: "9) Monolith vs Microservices — What is it?",
    a: `How the system is structured.

Key points:
• Monolith: simple, fast to start
• Microservices: scalable, complex
• Trade-offs depend on team and scale

Interview line:
“Architecture should match organizational maturity.”`,
    d: "Basic"
  },

  {
    q: "10) Modular Monolith — What is it?",
    a: `A monolith with strong internal boundaries.

Key points:
• Single deployable unit
• Clear module separation
• Easier migration to microservices

Interview line:
“Modular monoliths give many benefits of microservices without the overhead.”`,
    d: "Intermediate"
  },

  {
    q: "11) Web Request Path — What is it?",
    a: `Lifecycle of a request from browser to backend.

Key points:
• DNS → Load balancer → App → DB
• Many failure points
• Latency accumulates at each step

Interview line:
“Understanding the request path helps diagnose performance issues.”`,
    d: "Basic"
  },

  {
    q: "12) System Design Fundamentals — What is it?",
    a: `Core principles behind all designs.

Key points:
• Scalability
• Availability
• Consistency
• Latency
• Fault tolerance

Interview line:
“Every system design is a trade-off between these fundamentals.”`,
    d: "Basic"
  },

  {
    q: "13) Consistent Hashing — What is it?",
    a: `Distributes data evenly across nodes.

Key points:
• Minimizes rebalancing
• Used in caches and sharded systems
• Supports horizontal scaling

Interview line:
“Consistent hashing reduces disruption when nodes change.”`,
    d: "Advanced"
  },

  {
    q: "14) API Versioning — What is it?",
    a: `Managing API changes without breaking clients.

Key points:
• URI-based (/v1)
• Header-based
• Backward compatibility matters

Interview line:
“Versioning protects clients from unexpected breaking changes.”`,
    d: "Intermediate"
  },

  {
    q: "15) Microservices 101 — What is it?",
    a: `Small, independent services.

Key points:
• Own data per service
• Independent deployments
• Requires strong observability

Interview line:
“Microservices optimize for team autonomy, not simplicity.”`,
    d: "Intermediate"
  },

  {
    q: "16) Frontend 101 — What is it?",
    a: `Client-side system design basics.

Key points:
• Rendering strategies
• State management
• Performance and caching

Interview line:
“Frontend scalability affects user perception directly.”`,
    d: "Basic"
  },

  {
    q: "17) WebSockets — What is it?",
    a: `Persistent, bi-directional communication.

Key points:
• Real-time updates
• Chat, notifications, trading
• Requires connection management

Interview line:
“WebSockets trade scalability for real-time responsiveness.”`,
    d: "Advanced"
  },

  {
    q: "18) Bloom Filters — What is it?",
    a: `Probabilistic data structure for membership checks.

Key points:
• Very space-efficient
• False positives allowed
• No false negatives

Interview line:
“Bloom filters optimize expensive lookups at scale.”`,
    d: "Advanced"
  },

  {
    q: "19) Security Basics — What is it?",
    a: `Protecting user credentials.

Key points:
• Never store plaintext passwords
• Use salted hashes
• Apply rate limiting

Interview line:
“Security failures are usually design failures.”`,
    d: "Basic"
  },

  {
    q: "20) Service Discovery — What is it?",
    a: `How services find each other dynamically.

Key points:
• Required in microservices
• Avoids hardcoded IPs
• Enables scaling

Interview line:
“Service discovery decouples service identity from location.”`,
    d: "Intermediate"
  }

];
