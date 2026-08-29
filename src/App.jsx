import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  NavLink,
} from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Handshake,
  Users,
  ChartNoAxesCombined,
  Plug,
  ShieldCheck,
  Settings,
  Search,
  Bell,
  ArrowRight,
  Check,
  Clock3,
  Sparkles,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  MapPin,
  Mail,
  LockKeyhole,
  FileCheck2,
  BadgeCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingDown,
  WalletCards,
  Target,
  Activity,
  ReceiptText,
  Building2,
  CalendarDays,
  Send,
  Scale,
  LogOut,
  Eye,
  EyeOff,
  ChevronDown,
  Zap,
} from "lucide-react";
import { suppliers, scores } from "./data";
const C = createContext(),
  money = (n) => new Intl.NumberFormat("en-US").format(n) + " MAD",
  SESSION = "souk-session",
  STORE = "souk-demo-v2";
const base = {
  item: "Ergonomic office chairs",
  quantity: "500",
  budget: "50000",
  delivery: "10",
  warranty: "3",
  notes:
    "Prioritize ergonomic quality and proven supplier reliability. Neutral colors preferred.",
};
const acts = [
  [
    "/",
    "new-procurement",
    "Planning",
    "Reading the procurement mandate",
    "Open the request",
    "PROCUREMENT MANDATE READ",
    "500 ergonomic chairs · Budget ≤ 50,000 MAD · Delivery ≤ 10 days",
  ],
  [
    "/procurement",
    "launch-mission",
    "Planning",
    "Validating mandate and guardrails",
    "Search suppliers",
    "MANDATE VALIDATED",
    "Weights total 100% · Human approval required",
  ],
  [
    "/discovery",
    "discovery",
    "Searching suppliers",
    "Analyzing procurement mandate",
    "Search network",
    "SUPPLIER SEARCH",
    "Analyzing mandate and supplier fit",
  ],
  [
    "/discovery",
    "discovery",
    "Searching suppliers",
    "Searching supplier network",
    "Verify fit",
    "SUPPLIER SEARCH",
    "3 qualified suppliers found",
  ],
  [
    "/discovery",
    "discovery",
    "Searching suppliers",
    "Verifying supplier fit",
    "Build shortlist",
    "SUPPLIERS VERIFIED",
    "Atlas, CasaPro and Mobilia verified",
  ],
  [
    "/discovery",
    "start-negotiation",
    "Searching suppliers",
    "Building qualified shortlist",
    "Start negotiations",
    "SHORTLIST BUILT",
    "3 suppliers selected",
  ],
  [
    "/negotiations",
    "atlas-offer",
    "Analyzing quotation",
    "Inspecting initial quotations",
    "Verify best price",
    "NEGOTIATION STARTED",
    "3 parallel negotiations started",
  ],
  [
    "/negotiations",
    "intelligence",
    "Updating intelligence",
    "Verifying CasaPro quotation",
    "Apply price leverage",
    "VERIFIED INTELLIGENCE",
    "Best price: 44,500 MAD",
  ],
  [
    "/negotiations",
    "next-round",
    "Negotiating",
    "Applying verified price leverage",
    "Review improvements",
    "LEVERAGE APPLIED",
    "Benchmark shared with Atlas and Mobilia",
  ],
  [
    "/negotiations",
    "atlas-offer",
    "Negotiating",
    "Reviewing improved Atlas pricing",
    "Improve delivery",
    "TERM IMPROVED",
    "Atlas: 47,000 → 44,000 MAD",
  ],
  [
    "/negotiations",
    "next-round",
    "Negotiating",
    "Applying delivery benchmark",
    "Collect final offers",
    "TERM IMPROVED",
    "CasaPro delivery: 15 → 9 days",
  ],
  [
    "/negotiations",
    "analyze-offers",
    "Comparing offers",
    "Comparing final offers",
    "Open Decision Engine",
    "FINAL OFFERS RECEIVED",
    "Mobilia cheapest; CasaPro constraint-qualified",
  ],
  [
    "/decision",
    "decision-engine",
    "Comparing offers",
    "Scoring offers against constraints",
    "Prepare approval",
    "DECISION READY",
    "CasaPro scored 94 / 100",
  ],
  [
    "/approval",
    "human-approval",
    "Waiting for approval",
    "Waiting for your approval",
    "A human must decide",
    "HUMAN INPUT REQUIRED",
    "Final supplier approval required",
  ],
];
const initial = {
  i: -1,
  playing: false,
  approved: false,
  form: base,
  weights: { Price: 45, Delivery: 30, Quality: 20, "Payment terms": 5 },
  style: "Balanced",
  timeline: [],
  cursor: true,
  autoOpen: true,
  speed: "Presentation",
};
function useD() {
  return useContext(C);
}
function Provider({ children }) {
  const nav = useNavigate(),
    [session, setSession] = useState(localStorage.getItem(SESSION) === "1"),
    [d, setD] = useState(() => {
      try {
        return { ...initial, ...JSON.parse(localStorage.getItem(STORE)) };
      } catch {
        return initial;
      }
    });
  useEffect(() => localStorage.setItem(STORE, JSON.stringify(d)), [d]);
  const next = () =>
    setD((x) => {
      if (x.i >= acts.length - 1) return { ...x, playing: false };
      let ni = x.i + 1,
        a = acts[ni];
      if (x.autoOpen) setTimeout(() => nav(a[0]), x.cursor ? 420 : 0);
      return {
        ...x,
        i: ni,
        playing: x.playing && ni < acts.length - 1,
        timeline: [
          ...x.timeline,
          {
            time: new Date().toLocaleTimeString("en-GB"),
            title: a[5],
            detail: a[6],
          },
        ],
      };
    });
  useEffect(() => {
    if (!d.playing || d.i >= acts.length - 1) return;
    let t = setTimeout(
      next,
      { Normal: 2600, Fast: 1600, Presentation: 1050 }[d.speed] +
        (d.i === 7 ? 700 : 0),
    );
    return () => clearTimeout(t);
  }, [d.playing, d.i, d.speed]);
  const reset = () => {
      setD(initial);
      nav("/");
    },
    login = () => {
      localStorage.setItem(SESSION, "1");
      setSession(true);
      nav("/");
    },
    logout = () => {
      localStorage.removeItem(SESSION);
      setSession(false);
      nav("/login");
    };
  return (
    <C.Provider value={{ d, setD, next, reset, login, logout, session }}>
      {children}
    </C.Provider>
  );
}
const Button = ({
    children,
    variant = "primary",
    className = "",
    onClick,
    ...p
  }) => {
    const ctx = useD();
    const click = (e) => {
      if (p["data-agent-target"] === "launch-mission")
        ctx.setD((x) => ({
          ...x,
          i: 1,
          playing: true,
          approved: false,
          timeline: [],
        }));
      onClick?.(e);
    };
    return (
      <button
        className={`btn btn-${variant} ${className}`}
        onClick={click}
        {...p}
      >
        {children}
      </button>
    );
  },
  Badge = ({ children, tone = "neutral" }) => (
    <span className={`badge badge-${tone}`}>{children}</span>
  ),
  Header = ({ eyebrow, title, description, action }) => (
    <div className="page-head">
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
function Login() {
  const { session, login } = useD();
  const [e, setE] = useState("yasmine@acme.ma"),
    [p, setP] = useState("demo123"),
    [err, setErr] = useState("");
  if (session) return <Navigate to="/" />;
  return (
    <div className="login-page">
      <section className="login-story">
        <div className="login-brand">
          <span>S</span>
          <b>SoukAI</b>
        </div>
        <div>
          <Badge tone="success">AI PROCUREMENT OPERATING SYSTEM</Badge>
          <h1>Your AI Procurement Team.</h1>
          <p>Turn supplier conversations into better purchasing decisions.</p>
          <ul>
            <li>
              <Handshake />
              Multi-supplier negotiation
            </li>
            <li>
              <BadgeCheck />
              Verified intelligence
            </li>
            <li>
              <ShieldCheck />
              Human-controlled decisions
            </li>
          </ul>
        </div>
        <small>AI negotiates. You decide.</small>
      </section>
      <section className="login-form-wrap">
        <form
          className="login-card"
          onSubmit={(x) => {
            x.preventDefault();
            e === "yasmine@acme.ma" && p === "demo123"
              ? login()
              : setErr("Use the demo credentials shown below.");
          }}
        >
          <div className="agent-orb">
            <Sparkles />
          </div>
          <span className="eyebrow">SECURE DEMO WORKSPACE</span>
          <h2>Welcome back</h2>
          <p>Sign in to continue to Acme Morocco.</p>
          <label>
            WORK EMAIL
            <input value={e} onChange={(x) => setE(x.target.value)} />
          </label>
          <label>
            PASSWORD
            <input
              type="password"
              value={p}
              onChange={(x) => setP(x.target.value)}
            />
          </label>
          {err && <div className="form-error">{err}</div>}
          <Button className="wide">
            Sign in <ArrowRight />
          </Button>
          <div className="or">
            <span />
            OR
            <span />
          </div>
          <Button
            type="button"
            className="wide"
            variant="secondary"
            onClick={login}
          >
            <Sparkles />
            Continue with Demo Account
          </Button>
          <small>Demo workspace · Acme Morocco</small>
        </form>
      </section>
    </div>
  );
}
const nav = [
  ["/", "Overview", LayoutDashboard],
  ["/procurement", "New Procurement", Plus],
  ["/negotiations", "Negotiations", Handshake],
  ["/suppliers", "Suppliers", Users],
  ["/analytics", "Analytics", ChartNoAxesCombined],
  ["/integrations", "Integrations", Plug],
  ["/guardrails", "AI Guardrails", ShieldCheck],
  ["/settings", "Settings", Settings],
];
function Shell() {
  const { session, logout } = useD();
  const [m, setM] = useState(false);
  if (!session) return <Navigate to="/login" />;
  return (
    <div className="app">
      <aside>
        <div className="brand">
          <div className="brandmark">S</div>
          <div>
            <strong>SoukAI</strong>
            <span>PROCUREMENT OS</span>
          </div>
        </div>
        <nav>
          <small>WORKSPACE</small>
          {nav.map(([to, l, I]) => (
            <NavLink to={to} end={to === "/"} key={to}>
              <I />
              {l}
            </NavLink>
          ))}
        </nav>
        <div className="side-bottom">
          <NavLink to="/settings" className="demo-side">
            <span>
              <Activity />
              Demo Mode
            </span>
            <Badge tone="success">Ready</Badge>
          </NavLink>
        </div>
      </aside>
      <main>
        <header>
          <div className="workspace">
            <Building2 />
            <b>Acme Morocco</b>
            <span>/ Procurement</span>
          </div>
          <div className="top-actions">
            <Badge tone="brand">
              <span className="live-dot" />
              DEMO
            </Badge>
            <button className="icon-btn">
              <Bell />
            </button>
            <button className="user-trigger" onClick={() => setM(!m)}>
              <span className="avatar">YA</span>
              <b>Yasmine A.</b>
              <ChevronDown />
            </button>
            {m && (
              <div className="user-menu">
                <span>yasmine@acme.ma</span>
                <button onClick={logout}>
                  <LogOut />
                  Log out
                </button>
              </div>
            )}
          </div>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/procurement" element={<Procurement />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/negotiations" element={<Negotiation />} />
            <Route path="/decision" element={<Decision />} />
            <Route path="/approval" element={<Approval />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/:type" element={<Utility />} />
          </Routes>
        </div>
      </main>
      <Cursor />
    </div>
  );
}
function Agent() {
  const { d, setD, next, reset } = useD(),
    a = acts[Math.max(0, d.i)] || [];
  return (
    <div className="agent-center">
      <div className="agent-title">
        <span>
          <Sparkles />
          SOUKAI AGENT
        </span>
        <button onClick={() => setD((x) => ({ ...x, cursor: !x.cursor }))}>
          {d.cursor ? <Eye /> : <EyeOff />}
        </button>
      </div>

      <small>CURRENT TASK</small>
      <p>{d.i < 0 ? "Ready to run the procurement mission" : a[3]}</p>
      <small>NEXT</small>
      <p>{d.i < 0 ? "Start Agent" : a[4]}</p>
      <div className="agent-controls">
        <button
          data-agent-target="start-agent"
          onClick={() =>
            setD((x) => ({
              ...x,
              playing: !x.playing,
              i: x.i === 13 ? -1 : x.i,
              timeline: x.i === 13 ? [] : x.timeline,
            }))
          }
        >
          {d.playing ? <Pause /> : <Play />}
          {d.playing ? "Pause" : d.i >= 0 ? "Resume" : "Start Agent"}
        </button>
        <button onClick={next} disabled={d.playing || d.i === 13}>
          <SkipForward />
          Next
        </button>
        <button onClick={reset}>
          <RotateCcw />
        </button>
      </div>
      <Timeline compact />
      {d.i === 13 && (
        <div className="agent-stop">
          <LockKeyhole />
          Waiting for human decision
        </div>
      )}
    </div>
  );
}
function Cursor() {
  const { d } = useD(),
    [p, setP] = useState({ x: innerWidth - 90, y: 100, c: false });
  useEffect(() => {
    if (!d.cursor || d.i < 0) return;
    let t = setTimeout(() => {
      let e = document.querySelector(`[data-agent-target="${acts[d.i][1]}"]`);
      if (e) {
        let r = e.getBoundingClientRect();
        setP({ x: r.left + r.width / 2, y: r.top + r.height / 2, c: true });
        setTimeout(() => setP((q) => ({ ...q, c: false })), 320);
      }
    }, 100);
    return () => clearTimeout(t);
  }, [d.i, d.cursor]);
  return d.cursor && d.i >= 0 ? (
    <div
      className={`agent-cursor ${p.c ? "click" : ""}`}
      style={{ transform: `translate3d(${p.x}px,${p.y}px,0)` }}
    >
      <svg viewBox="0 0 24 24">
        <path d="M5 3l13 9-6 1.5L9 20z" />
      </svg>
      <i />
    </div>
  ) : null;
}
function Timeline({ compact = false }) {
  const { d } = useD(),
    rows = compact ? d.timeline.slice(-3) : d.timeline;
  return (
    <div className={`agent-timeline ${compact ? "compact" : ""}`}>
      {!compact && (
        <div className="panel-title">
          <div>
            <span>AGENT ACTIONS</span>
            <h2>Transparent execution timeline</h2>
          </div>
          <Badge>{rows.length} ACTIONS</Badge>
        </div>
      )}
      {rows.length ? (
        rows.map((e, i) => (
          <div className="timeline-row" key={i}>
            <time>{e.time}</time>
            <i />
            <span>
              <b>{e.title}</b>
              <p>{e.detail}</p>
            </span>
          </div>
        ))
      ) : (
        <p className="empty">Start the agent to see every action.</p>
      )}
    </div>
  );
}
function Dashboard() {
  const go = useNavigate(),
    { d, setD } = useD(),
    start = () => setD((x) => ({ ...x, playing: true }));
  return (
    <>
      <Header
        eyebrow="SATURDAY, 29 AUGUST"
        title="Good afternoon, Yasmine"
        description="Your AI procurement team is ready to run today’s mission."
        action={
          <div className="head-actions">
            <Button variant="secondary" onClick={start}>
              <Sparkles />
              Start Demo
            </Button>
            <Button
              data-agent-target="new-procurement"
              onClick={() => go("/procurement")}
            >
              <Plus />
              New procurement
            </Button>
          </div>
        }
      />
      <section className="kpi-grid">
        {[
          ["TOTAL VERIFIED SAVINGS", "127,450 MAD", WalletCards],
          ["ACTIVE NEGOTIATIONS", "8", Handshake],
          ["AVERAGE SAVINGS", "11.8%", TrendingDown],
          ["SUPPLIERS ENGAGED", "43", Users],
        ].map(([a, b, I]) => (
          <div className="kpi" key={a}>
            <div className="kpi-icon green">
              <I />
            </div>
            <div>
              <p>{a}</p>
              <strong>{b}</strong>
              <span>Verified outcomes</span>
            </div>
          </div>
        ))}
      </section>
      <div className="dash-grid">
        <section className="panel mission-hero">
          <Badge tone="brand">READY FOR AUTOPILOT</Badge>
          <h2>500 ergonomic office chairs</h2>
          <p>
            SoukAI can source, negotiate, compare and prepare the decision—then
            stop for approval.
          </p>
          <div>
            <span>
              <b>50,000 MAD</b>Budget
            </span>
            <span>
              <b>≤ 10 days</b>Delivery
            </span>
            <span>
              <b>3 years</b>Warranty
            </span>
          </div>
          <Button onClick={start} disabled={d.playing}>
            <Zap />
            Run procurement mission
          </Button>
        </section>
        <section className="panel timeline-panel">
          <Timeline />
        </section>
      </div>
    </>
  );
}
function Procurement() {
  const go = useNavigate(),
    { d, setD } = useD(),
    f = d.form,
    w = d.weights,
    total = Object.values(w).reduce((a, b) => a + b, 0),
    valid =
      f.item &&
      +f.quantity &&
      +f.budget &&
      +f.delivery &&
      +f.warranty &&
      total === 100,
    up = (k, v) => setD((x) => ({ ...x, form: { ...x.form, [k]: v } }));
  const weight = (k, v) => {
    let old = w[k],
      other = Object.keys(w).find((x) => x !== k && w[x] - (v - old) >= 0);
    if (other)
      setD((x) => ({
        ...x,
        weights: {
          ...x.weights,
          [k]: v,
          [other]: x.weights[other] - (v - old),
        },
      }));
  };
  return (
    <>
      <Header
        eyebrow="NEW PROCUREMENT"
        title="Define your procurement mandate"
        description="SoukAI stays strictly inside these business boundaries."
        action={
          <Button
            variant="secondary"
            onClick={() =>
              setD((x) => ({ ...x, form: base, weights: initial.weights }))
            }
          >
            <RotateCcw />
            Load Demo Scenario
          </Button>
        }
      />
      <div className="form-layout">
        <section className="panel form-card">
          <div className="section-number">
            <b>01</b>
            <span>
              <strong>Request details</strong>
              <small>What should your agent procure?</small>
            </span>
          </div>
          <div className="field full">
            <label>WHAT DO YOU NEED?</label>
            <input
              value={f.item}
              onChange={(e) => up("item", e.target.value)}
            />
          </div>
          <div className="field-row">
            {[
              ["quantity", "QUANTITY", "units"],
              ["budget", "MAXIMUM BUDGET", "MAD"],
              ["delivery", "REQUIRED DELIVERY", "days max"],
              ["warranty", "MINIMUM WARRANTY", "years"],
            ].map(([k, l, u]) => (
              <div className="field" key={k}>
                <label>{l}</label>
                <div className="input-unit">
                  <input
                    type="number"
                    value={f[k]}
                    onChange={(e) => up(k, e.target.value)}
                  />
                  <span>{u}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="field full">
            <label>NOTES FOR YOUR AGENT</label>
            <textarea
              value={f.notes}
              onChange={(e) => up("notes", e.target.value)}
            />
          </div>
          <div className="divider" />
          {Object.entries(w).map(([k, v]) => (
            <div className="priority" key={k}>
              <span>
                {k}
                <b>{v}%</b>
              </span>
              <input
                type="range"
                min="0"
                max="60"
                value={v}
                onChange={(e) => weight(k, +e.target.value)}
              />
            </div>
          ))}
          <div className="weight-total">
            Total priority <b>{total}%</b>
          </div>
          <label className="overlabel">NEGOTIATION STYLE</label>
          <div className="segmented">
            {["Friendly", "Balanced", "Competitive"].map((x) => (
              <button
                className={d.style === x ? "active" : ""}
                onClick={() => setD((q) => ({ ...q, style: x }))}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
        </section>
        <aside className="mandate">
          <div className="mandate-head">
            <div className="agent-orb">
              <Sparkles />
            </div>
            <div>
              <span>AI NEGOTIATION MANDATE</span>
              <h2>{valid ? "Ready to negotiate" : "Needs attention"}</h2>
            </div>
          </div>
          <div className="mandate-product">
            <small>PROCUREMENT REQUEST</small>
            <b>
              {f.quantity} {f.item.toLowerCase()}
            </b>
            <span>{d.style} negotiation · 4 criteria</span>
          </div>
          {[
            ["Budget ceiling", money(+f.budget), WalletCards],
            ["Required delivery", `≤ ${f.delivery} days`, Clock3],
            ["Minimum warranty", `${f.warranty} years`, ShieldCheck],
          ].map(([a, b, I]) => (
            <div className="mandate-row" key={a}>
              <I />
              <span>{a}</span>
              <b>{b}</b>
            </div>
          ))}
          <div className="mandate-note">
            <ShieldCheck />
            <span>
              <b>Guardrails active</b>Human approval required.
            </span>
          </div>
          <Button
            data-agent-target="launch-mission"
            disabled={!valid}
            onClick={() => go("/discovery")}
            className="wide"
          >
            Launch Procurement Mission <ArrowRight />
          </Button>
        </aside>
      </div>
    </>
  );
}
function Discovery() {
  const go = useNavigate(),
    { d } = useD(),
    stage = Math.max(0, Math.min(4, d.i - 1)),
    visible = Math.max(0, stage - 1),
    labels = [
      "Analyzing procurement mandate",
      "Searching supplier network",
      "Verifying supplier fit",
      "Building shortlist",
    ];
  return (
    <>
      <Header
        eyebrow="SUPPLIER DISCOVERY"
        title="Building your qualified supplier set"
        description="Every sourcing stage visibly progresses."
      />
      <div className="discovery-flow" data-agent-target="discovery">
        {labels.map((x, i) => (
          <div className="discovery-step" key={x}>
            <div className={stage > i ? "done" : stage === i ? "loading" : ""}>
              {stage > i ? <Check /> : <span />}
            </div>
            <b>{x}</b>
            <small>
              {stage > i ? "Complete" : stage === i ? "In progress" : "Queued"}
            </small>
            {i < 3 && <i />}
          </div>
        ))}
      </div>
      <section className="reveal">
        <div className="reveal-head">
          <span>
            <Badge tone="success">{visible} OF 3 QUALIFIED</Badge>
            <h2>Recommended supplier set</h2>
          </span>
          <span className="verified">
            <ShieldCheck />
            Verified supplier profiles
          </span>
        </div>
        <div className="supplier-cards">
          {suppliers.map((s, i) => (
            <div
              className={`supplier-card ${i < visible ? "revealed" : "supplier-pending"}`}
              key={s.id}
            >
              <div className="supplier-top">
                <div className="supplier-logo" style={{ "--c": s.color }}>
                  {s.initials}
                </div>
                <Badge tone={i < visible ? "success" : "neutral"}>
                  {i < visible ? "VERIFIED" : "SEARCHING"}
                </Badge>
              </div>
              <h3>{i < visible ? s.name : "Qualified supplier"}</h3>
              <p>
                <MapPin />
                {i < visible ? s.city : "Verifying"}, Morocco
              </p>
              <div className="fit-score">
                <span>PRODUCT FIT</span>
                <b>{i < visible ? [92, 97, 88][i] + "%" : "—"}</b>
                <i>
                  <em
                    style={{
                      width: i < visible ? [92, 97, 88][i] + "%" : "8%",
                    }}
                  />
                </i>
              </div>
              <dl>
                <div>
                  <dt>Reliability</dt>
                  <dd>{i < visible ? s.reliability + "%" : "Checking"}</dd>
                </div>
                <div>
                  <dt>Relationship</dt>
                  <dd>{i < visible ? s.relationship : "Checking"}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <div className="reveal-footer">
          <span>
            <ShieldCheck />
            Supplier identities remain private.
          </span>
          <Button
            data-agent-target="start-negotiation"
            disabled={visible < 3}
            onClick={() => go("/negotiations")}
          >
            Start AI Negotiation <ArrowRight />
          </Button>
        </div>
      </section>
    </>
  );
}
function Negotiation() {
  const go = useNavigate(),
    { d, setD } = useD(),
    n = Math.max(0, d.i - 6),
    round = n < 3 ? 1 : n < 5 ? 2 : 3,
    oi = round - 1;
  return (
    <>
      <div className="nego-top">
        <div>
          <span className="eyebrow">LIVE MISSION · #SC-0241</span>
          <h1>500 ergonomic office chairs</h1>
          <p>
            <span>
              Budget <b>50,000 MAD</b>
            </span>
            <span>
              Delivery <b>≤10 days</b>
            </span>
            <span>
              Warranty <b>≥3 years</b>
            </span>
          </p>
        </div>
        <div className="demo-control">
          <div>
            <span className="live-dot" />
            <b>NEGOTIATION CONTROL</b>
            <small>Round {round} of 3</small>
          </div>
          <button
            data-agent-target="next-round"
            disabled={d.playing || d.i >= 11}
            onClick={() => setD((x) => ({ ...x, i: Math.max(6, x.i + 1) }))}
          >
            <SkipForward />
            Next Round
          </button>
          <button onClick={() => setD((x) => ({ ...x, playing: !x.playing }))}>
            {d.playing ? <Pause /> : <Play />}
            {d.playing ? "Pause" : "Resume"}
          </button>
        </div>
      </div>
      <Intelligence n={n} />
      <div className="lanes">
        {suppliers.map((s, i) => (
          <Lane key={s.id} s={s} i={i} offer={s.offers[oi]} round={round} />
        ))}
      </div>
      <section className="panel timeline-panel audit">
        <Timeline />
        {round === 3 && (
          <div className="complete-banner">
            <div>
              <CheckCircle2 />
              <span>
                <b>Negotiation complete</b>All constraints checked.
              </span>
            </div>
            <Button
              data-agent-target="analyze-offers"
              onClick={() => go("/decision")}
            >
              Analyze Final Offers <ArrowRight />
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
function Intelligence({ n }) {
  return (
    <section
      className={`intel ${n >= 1 ? "active" : ""}`}
      data-agent-target="intelligence"
    >
      <div className="intel-title">
        <div className="intel-mark">
          <Sparkles />
        </div>
        <div>
          <span>CROSS-NEGOTIATION INTELLIGENCE</span>
          <h2>Verified facts become competitive leverage</h2>
        </div>
        <Badge tone="success">
          <ShieldCheck />
          VERIFIED ONLY
        </Badge>
      </div>
      <div className="intel-flow">
        <div className="intel-stat">
          <small>CASAPRO · SOURCE VERIFIED</small>
          <strong>
            44,500 <em>MAD</em>
          </strong>
          <span>Best verified price</span>
        </div>
        <div className="flow-arrow">
          <ArrowRight />
          <b>VERIFIED</b>
        </div>
        <div className="intel-core">
          <div>
            <Scale />
            <small>CENTRAL INTELLIGENCE</small>
            <b>PRICE BENCHMARK</b>
          </div>
        </div>
        <div className="flow-arrow">
          <ArrowRight />
          <b>LEVERAGE</b>
        </div>
        <div className="intel-stat">
          <small>TARGET NEGOTIATIONS</small>
          <strong>ATLAS · MOBILIA</strong>
          <span>Requesting improved pricing</span>
        </div>
      </div>
      <div className="leverage-bar">
        <Send />
        <b>
          {n < 2
            ? "Benchmark ready"
            : n < 4
              ? "Leverage moving to target negotiations"
              : "Terms improved using verified leverage"}
        </b>
      </div>
    </section>
  );
}
function Lane({ s, i, offer, round }) {
  return (
    <article
      className={`lane ${round === 2 ? "leveraged" : ""}`}
      data-agent-target={i === 0 ? "atlas-offer" : null}
    >
      <div className="lane-head">
        <div className="supplier-logo sm" style={{ "--c": s.color }}>
          {s.initials}
        </div>
        <div>
          <h3>{s.name}</h3>
          <span>
            <Badge tone="success">VERIFIED</Badge>Reliability {s.reliability}%
          </span>
        </div>
      </div>
      <div className="offer-block">
        <div>
          <small>INPUT · SUPPLIER QUOTATION</small>
          <strong>{money(offer.price)}</strong>
          {round > 1 && (
            <span className="delta">
              <TrendingDown />
              Improved from {money(s.offers[0].price)}
            </span>
          )}
        </div>
        <Badge tone="brand">ROUND {round}</Badge>
      </div>
      <div className="terms">
        <div>
          <Clock3 />
          <span>
            Delivery<b>{offer.days} days</b>
          </span>
        </div>
        <div>
          <ShieldCheck />
          <span>
            Warranty<b>{offer.warranty} years</b>
          </span>
        </div>
        <div>
          <ReceiptText />
          <span>
            Payment<b>{i === 1 ? "30 days" : "15 days"}</b>
          </span>
        </div>
      </div>
      <div className="lane-thread">
        {[
          ["INPUT", "Quotation received", Mail],
          [
            "AGENT ACTION",
            i === 1
              ? "Improve delivery using benchmark"
              : "Request better price using leverage",
            Sparkles,
          ],
          [
            "OUTCOME",
            round > 1 ? "Commercial terms improved" : "Awaiting response",
            Building2,
          ],
        ].map(([a, b, I]) => (
          <div className="structured-msg" key={a}>
            <div>
              <I />
            </div>
            <span>
              <small>{a}</small>
              <p>{b}</p>
            </span>
          </div>
        ))}
      </div>
      <div className="lane-foot">
        <span>
          <i className={round === 3 ? "done" : ""} />
          {round === 3 ? "Final offer received" : "Negotiation active"}
        </span>
        <small>
          {round === 3 &&
            (offer.days <= 10 && offer.warranty >= 3
              ? "MEETS MANDATE"
              : "CONSTRAINT VIOLATION")}
        </small>
      </div>
    </article>
  );
}
function Decision() {
  const go = useNavigate();
  return (
    <>
      <Header
        eyebrow="NEGOTIATION COMPLETE"
        title="Decision Engine"
        description="Constraint-aware scoring prevents the cheapest non-compliant offer from winning."
      />
      <section className="recommend panel" data-agent-target="decision-engine">
        <div className="rec-left">
          <div className="rec-icon">
            <BadgeCheck />
          </div>
          <div>
            <span>RECOMMENDED SUPPLIER</span>
            <h2>CasaPro Business</h2>
            <p>Strongest overall mandate fit.</p>
          </div>
        </div>
        <div className="rec-score">
          <span>
            <strong>94</strong>/100
          </span>
          <Badge tone="success">RECOMMENDED</Badge>
        </div>
        <Button onClick={() => go("/approval")}>
          Open Human Approval <ArrowRight />
        </Button>
      </section>
      <section className="panel comparison">
        <div className="panel-title">
          <div>
            <span>FINAL OFFER COMPARISON</span>
            <h2>Business fit, not price alone</h2>
          </div>
        </div>
        <div className="compare-table">
          <div className="ct-row ct-head">
            <span>CRITERIA</span>
            {suppliers.map((s) => (
              <span className={s.id === "casa" ? "winner" : ""} key={s.id}>
                <i>{s.initials}</i>
                <b>{s.name}</b>
              </span>
            ))}
          </div>
          {[
            ["Final price", ["42,000 MAD", "43,500 MAD", "41,900 MAD"]],
            ["Delivery", ["17 days", "8 days", "25 days"]],
            ["Warranty", ["2 years", "3 years", "2 years"]],
          ].map(([k, v], r) => (
            <div className="ct-row" key={k}>
              <span>{k}</span>
              {v.map((x, i) => (
                <span
                  className={`${i === 1 ? "winner" : ""} ${r > 0 && i !== 1 ? "violation" : ""}`}
                  key={i}
                >
                  {x}
                </span>
              ))}
            </div>
          ))}
          <div className="ct-row total">
            <span>WEIGHTED SCORE</span>
            {suppliers.map((s) => (
              <span className={s.id === "casa" ? "winner" : ""} key={s.id}>
                <b>{scores[s.id]}</b>/100
              </span>
            ))}
          </div>
        </div>
      </section>
      <div className="decision-grid">
        <section className="panel rationale">
          <div className="rationale-head">
            <Target />
            <div>
              <span>WHY CASAPRO?</span>
              <h2>All critical constraints met</h2>
            </div>
          </div>
          {[
            "8-day delivery meets ≤10-day requirement",
            "3-year warranty requirement met",
            "Highest score: 94 / 100",
          ].map((x) => (
            <div className="reason" key={x}>
              <Check />
              {x}
            </div>
          ))}
        </section>
        <section className="panel why-not">
          <div className="rationale-head">
            <AlertTriangle />
            <div>
              <span>WHY NOT THE CHEAPEST?</span>
              <h2>Price cannot override constraints</h2>
            </div>
          </div>
          <div className="cheap">
            <span>
              <small>CHEAPEST OFFER</small>
              <b>Mobilia Pro</b>
            </span>
            <strong>41,900 MAD</strong>
          </div>
          <div className="constraint">
            <XCircle />
            <span>
              Mobilia saves another 1,600 MAD but misses the required delivery
              deadline by <b>15 days</b>.
            </span>
          </div>
        </section>
      </div>
      <Savings />
      <div className="human-banner">
        <div>
          <ShieldCheck />
          <span>
            <small>HUMAN CONTROL</small>
            <b>SoukAI negotiates. You decide.</b>
          </span>
        </div>
        <Button onClick={() => go("/approval")}>
          Continue to approval <ArrowRight />
        </Button>
      </div>
    </>
  );
}
function Savings() {
  return (
    <section className="panel savings">
      <div>
        <span>VERIFIED SAVINGS BREAKDOWN</span>
        <h2>You only pay when SoukAI saves you money.</h2>
      </div>
      <div className="saving-math">
        <span>
          <small>INITIAL OFFER</small>
          <b>49,000 MAD</b>
        </span>
        <i>−</i>
        <span>
          <small>SELECTED OFFER</small>
          <b>43,500 MAD</b>
        </span>
        <i>=</i>
        <span className="gross">
          <small>VERIFIED SAVINGS</small>
          <b>5,500 MAD</b>
        </span>
      </div>
      <div className="fee">
        <span>
          <small>SUCCESS FEE · 15%</small>
          <b>825 MAD</b>
        </span>
        <ArrowRight />
        <span>
          <small>NET CUSTOMER SAVINGS</small>
          <b>4,675 MAD</b>
        </span>
      </div>
    </section>
  );
}
function Approval() {
  const { d, setD } = useD(),
    [s, setS] = useState(d.approved ? "approved" : "pending"),
    act = (x) => {
      setS(x);
      setD((q) => ({ ...q, playing: false, approved: x === "approved" }));
    };
  return (
    <>
      <div className="approval-alert" data-agent-target="human-approval">
        <LockKeyhole />
        <div>
          <span>HUMAN APPROVAL REQUIRED</span>
          <h1>Waiting for your decision</h1>
          <p>SoukAI completed negotiation and stopped.</p>
        </div>
        <Badge tone="warning">AGENT PAUSED</Badge>
      </div>
      <div className="approval-layout">
        <section className="panel approval-card">
          <div className="approval-supplier">
            <div className="supplier-logo" style={{ "--c": "#b06d36" }}>
              CB
            </div>
            <div>
              <Badge tone="success">RECOMMENDED</Badge>
              <h2>CasaPro Business</h2>
              <p>Verified supplier · 97% reliability</p>
            </div>
            <span className="score-bubble">
              <b>94</b>/100
            </span>
          </div>
          <div className="final-terms">
            {[
              ["FINAL PRICE", "43,500 MAD", WalletCards],
              ["DELIVERY", "8 days", Clock3],
              ["WARRANTY", "3 years", ShieldCheck],
              ["PAYMENT", "30 days", CalendarDays],
            ].map(([a, b, I]) => (
              <div key={a}>
                <I />
                <small>{a}</small>
                <b>{b}</b>
              </div>
            ))}
          </div>
          {s === "pending" ? (
            <div className="approval-actions">
              <Button onClick={() => act("approved")}>
                <Check />
                Approve Supplier
              </Button>
              <Button variant="secondary" onClick={() => act("round")}>
                <RotateCcw />
                Request Another Round
              </Button>
              <Button variant="ghost" onClick={() => act("rejected")}>
                <XCircle />
                Reject Recommendation
              </Button>
            </div>
          ) : (
            <div className={`state-message ${s}`}>
              <CheckCircle2 />
              <span>
                <b>
                  {s === "approved"
                    ? "Supplier approved manually."
                    : s === "round"
                      ? "Another round requested."
                      : "Recommendation rejected."}
                </b>
                <p>No purchase order has been placed.</p>
              </span>
              <button onClick={() => act("pending")}>Undo</button>
            </div>
          )}
          <p className="no-order">
            <LockKeyhole />
            SoukAI never clicks approval.
          </p>
        </section>
        <aside className="panel approval-guard">
          <div className="guard-icon">
            <ShieldCheck />
          </div>
          <span>HUMAN-IN-THE-LOOP</span>
          <h2>SoukAI negotiates. You decide.</h2>
          <p>Only an authorized person can move procurement forward.</p>
          {[
            "No purchase order",
            "No contract signed",
            "No payment initiated",
            "Audit trail retained",
          ].map((x) => (
            <div key={x}>
              <Check />
              {x}
            </div>
          ))}
        </aside>
      </div>
      {s === "approved" && <Savings />}
    </>
  );
}
function Suppliers() {
  const [s, setS] = useState(suppliers[1]),
    [q, setQ] = useState("");
  return (
    <>
      <Header
        eyebrow="SUPPLIER INTELLIGENCE"
        title="Your supplier network"
        description="Verified history compounds into procurement advantage."
      />
      <div className="supplier-page">
        <section className="panel supplier-list">
          <div className="list-search">
            <Search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search suppliers..."
            />
          </div>
          {suppliers
            .filter((x) => x.name.toLowerCase().includes(q.toLowerCase()))
            .map((x) => (
              <button
                className={s.id === x.id ? "active" : ""}
                onClick={() => setS(x)}
                key={x.id}
              >
                <div className="supplier-logo sm" style={{ "--c": x.color }}>
                  {x.initials}
                </div>
                <span>
                  <b>{x.name}</b>
                  <small>
                    {x.city} · {x.specialty}
                  </small>
                </span>
                <strong>{x.reliability}%</strong>
              </button>
            ))}
        </section>
        <section className="panel supplier-detail">
          <div className="detail-head">
            <div className="supplier-logo" style={{ "--c": s.color }}>
              {s.initials}
            </div>
            <span>
              <Badge tone="success">VERIFIED</Badge>
              <h2>{s.name}</h2>
              <p>
                <MapPin />
                {s.city}, Morocco
              </p>
            </span>
          </div>
          <div className="detail-kpis">
            <div>
              <small>RELIABILITY</small>
              <b>{s.reliability}%</b>
            </div>
            <div>
              <small>AVG. DISCOUNT</small>
              <b>{s.avgDiscount}</b>
            </div>
            <div>
              <small>PRODUCT FIT</small>
              <b>94%</b>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
function Utility() {
  let type = location.pathname.slice(1),
    { d, setD, reset, logout } = useD();
  if (type === "settings")
    return (
      <>
        <Header
          eyebrow="DEMO CONTROL"
          title="Settings"
          description="Tune the three-minute presentation."
        />
        <section className="panel settings-card">
          {[
            ["Agent Autopilot", "playing"],
            ["Show Agent Cursor", "cursor"],
            ["Auto-open next step", "autoOpen"],
          ].map(([a, k]) => (
            <div className="setting-row" key={k}>
              <span>
                <b>{a}</b>
                <small>Deterministic presentation control.</small>
              </span>
              <button
                className={`switch ${d[k] ? "on" : ""}`}
                onClick={() => setD((x) => ({ ...x, [k]: !x[k] }))}
              >
                <i />
              </button>
            </div>
          ))}
          <div className="setting-row">
            <span>
              <b>Demo Speed</b>
              <small>Presentation highlights key moments.</small>
            </span>
            <div className="segmented speed">
              {["Normal", "Fast", "Presentation"].map((x) => (
                <button
                  key={x}
                  className={d.speed === x ? "active" : ""}
                  onClick={() => setD((q) => ({ ...q, speed: x }))}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="setting-actions">
            <Button variant="secondary" onClick={reset}>
              Reset Procurement Demo
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                localStorage.removeItem(STORE);
                logout();
              }}
            >
              Full App Reset
            </Button>
          </div>
        </section>
      </>
    );
  let title =
    {
      analytics: "Analytics",
      integrations: "Integrations",
      guardrails: "AI Guardrails",
    }[type] || "Coming Soon";
  return (
    <>
      <Header
        eyebrow="SOUKAI WORKSPACE"
        title={title}
        description="This area is presentation-ready and uses verified demo data."
      />
      <div className="guard-grid">
        {(type === "integrations"
          ? [
              "Email · Demo Ready",
              "Gmail · Coming Soon",
              "WhatsApp · Coming Soon",
              "ERP · Coming Soon",
              "CRM · Coming Soon",
              "Marketplaces · Coming Soon",
            ]
          : [
              "Verified data only",
              "Budget control",
              "Human approval",
              "Supplier privacy",
              "Audit trail",
              "No autonomous purchasing",
            ]
        ).map((x) => (
          <section className="panel guard-card" key={x}>
            <div>
              <ShieldCheck />
            </div>
            <Badge tone="success">
              {type === "integrations" ? "STATUS" : "ENFORCED"}
            </Badge>
            <h2>{x}</h2>
            <p>Clear, safe and transparent demo capability.</p>
          </section>
        ))}
      </div>
    </>
  );
}
export default function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Shell />} />
      </Routes>
    </Provider>
  );
}