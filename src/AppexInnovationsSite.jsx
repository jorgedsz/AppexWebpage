import React from "react";
import { PALETTE, cx } from "./palette";

/* -------------------------
 * UI Primitives
 * ------------------------*/

function Card(props) {
  return (
    <div
      className={cx("rounded-2xl border shadow-sm", props.className)}
      style={{ background: PALETTE.s1, borderColor: "rgba(80,83,87,0.5)" }}
    >
      {props.children}
    </div>
  );
}

function Button(props) {
  var variant = props.variant || "primary";
  var base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";
  var ringStyle = {
    "--tw-ring-offset-color": PALETTE.bg,
    "--tw-ring-color":
      variant === "primary"
        ? PALETTE.copperLight
        : variant === "secondary"
        ? PALETTE.border
        : PALETTE.border,
  };

  var style =
    variant === "primary"
      ? { background: PALETTE.copper, color: "white" }
      : variant === "secondary"
      ? {
          background: "transparent",
          color: PALETTE.text,
          border: "1px solid " + PALETTE.border,
        }
      : { background: "transparent", color: PALETTE.muted };

  var className = cx(
    base,
    variant === "secondary" ? "hover:bg-[#1D1F23]" : "",
    variant === "ghost" ? "hover:bg-[#1D1F23] hover:text-white" : ""
  );

  if (props.href) {
    return (
      <a href={props.href} className={className} style={Object.assign({}, style, ringStyle)}>
        {props.children}
      </a>
    );
  }

  return (
    <button onClick={props.onClick} className={className} style={Object.assign({}, style, ringStyle)}>
      {props.children}
    </button>
  );
}

function Pill(props) {
  var active = !!props.active;
  return (
    <button
      onClick={props.onClick}
      className="rounded-full px-3 py-1 text-xs font-semibold transition-all border"
      style={{
        background: active ? PALETTE.slate : "transparent",
        color: active ? PALETTE.text : PALETTE.muted,
        borderColor: active ? PALETTE.steel : PALETTE.border,
      }}
    >
      {props.children}
    </button>
  );
}

function SectionHeader(props) {
  return (
    <div className={cx("max-w-2xl", props.className)}>
      {props.kicker ? (
        <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.copperLight }}>
          {props.kicker}
        </div>
      ) : null}
      <div className="mt-2 text-2xl md:text-3xl font-semibold" style={{ color: PALETTE.text }}>
        {props.title}
      </div>
      {props.subtitle ? (
        <div className="mt-3 text-sm md:text-base" style={{ color: PALETTE.muted }}>
          {props.subtitle}
        </div>
      ) : null}
    </div>
  );
}

function LogoMark(props) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 rounded-2xl flex items-center justify-center border"
        style={{ background: PALETTE.s2, borderColor: "rgba(80,83,87,0.4)" }}
      >
        <div className="h-5 w-5 rotate-45 border-2" style={{ borderColor: PALETTE.copper }} />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-extrabold tracking-wide" style={{ color: PALETTE.text }}>
          {props.brandName}
        </div>
        <div className="text-[11px]" style={{ color: PALETTE.subMuted }}>
          Need-driven automation
        </div>
      </div>
    </div>
  );
}

function Stat(props) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: PALETTE.s1, borderColor: "rgba(80,83,87,0.5)" }}
    >
      <div className="text-xs" style={{ color: PALETTE.subMuted }}>
        {props.label}
      </div>
      <div className="mt-2 text-2xl font-semibold" style={{ color: PALETTE.text }}>
        {props.value}
      </div>
      <div className="mt-2 text-xs" style={{ color: PALETTE.muted }}>
        {props.note}
      </div>
    </div>
  );
}

/* -------------------------
 * Modal
 * ------------------------*/

function Modal(props) {
  React.useEffect(
    function () {
      function onKey(e) {
        if (e && e.key === "Escape") props.onClose();
      }
      if (props.open) {
        document.addEventListener("keydown", onKey);
        return function () {
          document.removeEventListener("keydown", onKey);
        };
      }
      return;
    },
    [props.open]
  );

  if (!props.open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={props.onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <Card className="overflow-hidden">
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)" }}
            >
              <div className="text-sm md:text-base font-semibold" style={{ color: PALETTE.text }}>
                {props.title}
              </div>
              <Button variant="ghost" onClick={props.onClose}>
                Close
              </Button>
            </div>
            <div className="p-5">{props.children}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* -------------------------
 * Media Slider
 * ------------------------*/

function MediaViewer(props) {
  var media = props.media || [];
  var [idx, setIdx] = React.useState(0);
  var current = media.length ? media[idx] : null;

  function next() {
    if (!media.length) return;
    setIdx((idx + 1) % media.length);
  }
  function prev() {
    if (!media.length) return;
    setIdx((idx - 1 + media.length) % media.length);
  }

  return (
    <div>
      <div className="rounded-2xl border p-3" style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)" }}>
        {!current ? (
          <div
            className="h-56 md:h-64 rounded-xl border flex items-center justify-center text-sm"
            style={{ background: PALETTE.s2, borderColor: "rgba(80,83,87,0.4)", color: PALETTE.muted }}
          >
            Add images/videos for this solution
          </div>
        ) : current.kind === "video" && current.src ? (
          <video
            className="w-full h-56 md:h-64 rounded-xl border bg-black"
            style={{ borderColor: "rgba(80,83,87,0.4)" }}
            controls
            src={current.src}
          />
        ) : current.kind === "image" && current.src ? (
          <img
            className="w-full h-56 md:h-64 rounded-xl border object-cover"
            style={{ borderColor: "rgba(80,83,87,0.4)" }}
            src={current.src}
            alt={current.title}
          />
        ) : (
          <div
            className="h-56 md:h-64 rounded-xl border flex items-center justify-center"
            style={{
              borderColor: "rgba(80,83,87,0.4)",
              background: "linear-gradient(135deg, rgba(169,94,75,0.25), rgba(64,74,90,0.25))",
            }}
          >
            <div className="text-center px-4">
              <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
                {current.title}
              </div>
              <div className="mt-1 text-xs" style={{ color: PALETTE.muted }}>
                {current.note || (current.kind === "video" ? "Video placeholder" : "Image placeholder")}
              </div>
              <div className="mt-3 text-xs" style={{ color: PALETTE.subMuted }}>
                (Replace with real media later)
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs" style={{ color: PALETTE.subMuted }}>
            {media.length ? idx + 1 : 0}/{media.length}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={prev}>
              &#9664;
            </Button>
            <Button variant="secondary" onClick={next}>
              &#9654;
            </Button>
          </div>
        </div>
      </div>

      {media.length ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {media.slice(0, 8).map(function (m, i) {
            var active = i === idx;
            return (
              <button
                key={m.title + i}
                onClick={function () {
                  setIdx(i);
                }}
                className="rounded-xl border p-2 text-left transition-all"
                style={{
                  borderColor: active ? PALETTE.copperLight : "rgba(80,83,87,0.4)",
                  background: active ? PALETTE.slate : PALETTE.s1,
                }}
              >
                <div className="text-[11px] font-semibold truncate" style={{ color: PALETTE.text }}>
                  {m.kind === "video" ? "▶ " : "▢ "}
                  {m.title}
                </div>
                <div className="text-[10px] truncate" style={{ color: PALETTE.subMuted }}>
                  {m.note || (m.kind === "video" ? "Video" : "Image")}
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------
 * Data
 * ------------------------*/

function buildSolutions() {
  return [
    {
      id: "missed-call-recovery",
      tier: "Major",
      title: "Missed-Call Recovery System",
      outcome: "Instant WhatsApp/SMS reply after missed calls + capture details + book or route.",
      industries: ["Dentists", "Doctors", "Beauty Clinics", "Beauty Salons", "Electricians", "Mechanics", "Painters", "Drivers", "Other"],
      needs: ["Missed Calls", "After-hours", "Lead Qualification"],
      channels: ["WhatsApp", "SMS", "Voice"],
      tags: ["Missed Calls", "After-hours", "Lead Qualification"],
      includes: [
        "Missed-call trigger + automation",
        "Short intake questions",
        "Routing + escalation with summary",
        "Optional booking link",
      ],
      howItWorks: [
        "A missed call triggers an instant WhatsApp/SMS within seconds.",
        "The system asks 3–5 questions to capture intent and details.",
        "Qualified leads get routed to the right person/location automatically.",
        "If a human should take over, it escalates with a clean summary.",
      ],
      priceLabel: "Starting at $___",
      priceNote: "Final price depends on channels + routing complexity.",
      emotional: {
        money: "Recover leads that would have gone to competitors — more booked jobs and more revenue without extra staff.",
        freedom: "Even if you miss a call, you still look responsive. Less stress after hours, more time for family.",
        growth: "A reliable intake engine that scales with your team — not with one person's availability.",
        service: "Clients feel taken care of instantly, which builds trust and increases conversions.",
      },
      media: [
        { kind: "image", title: "Missed call → WhatsApp reply", note: "Flow overview" },
        { kind: "image", title: "Lead capture questions", note: "Short intake" },
        { kind: "video", title: "Demo video", note: "30–60s walkthrough" },
        { kind: "image", title: "Routing + escalation", note: "Human handoff" },
      ],
    },
    {
      id: "reminders-confirmations",
      tier: "Major",
      title: "Reminders + Confirmations",
      outcome: "Reduce no-shows with confirmations, reschedules, and follow-ups.",
      industries: ["Dentists", "Doctors", "Beauty Clinics", "Beauty Salons"],
      needs: ["Reminders", "Scheduling", "Follow-ups"],
      channels: ["WhatsApp", "SMS"],
      tags: ["Reminders", "Scheduling", "Follow-ups"],
      includes: ["Multi-touch reminders", "Confirm/reschedule flows", "No-response escalation", "Daily summary report"],
      howItWorks: [
        "Send reminders at 48h / 24h / same-day.",
        "Clients confirm or reschedule in one tap.",
        "No response triggers follow-up and optional staff alert.",
        "You get a daily summary of risk appointments.",
      ],
      priceLabel: "Starting at $___",
      priceNote: "Depends on calendar/CRM integration and reminder complexity.",
      emotional: {
        money: "Lower no-shows = more revenue from the same schedule (no extra marketing spend).",
        freedom: "Your team stops chasing confirmations manually — more time for higher-value tasks.",
        growth: "Scaling locations becomes easier once reminders run automatically.",
        service: "Clients feel guided and supported, which improves retention and referrals.",
      },
      media: [
        { kind: "image", title: "Reminder schedule", note: "48h / 24h / same-day" },
        { kind: "image", title: "Confirm or reschedule", note: "Two-way messaging" },
        { kind: "video", title: "Demo video", note: "How confirmations work" },
      ],
    },
    {
      id: "ai-receptionist",
      tier: "Major",
      title: "AI Receptionist (Voice + Chat)",
      outcome: "Answers FAQs, qualifies clients, and escalates to a human when needed.",
      industries: ["Dentists", "Doctors", "Beauty Clinics", "Beauty Salons", "Electricians", "Mechanics", "Other"],
      needs: ["FAQ Handling", "Lead Qualification", "Routing"],
      channels: ["Voice", "WhatsApp", "SMS"],
      tags: ["FAQ Handling", "Lead Qualification", "Routing"],
      includes: ["FAQ answers", "Qualification questions", "Routing rules", "Conversation summaries"],
      howItWorks: [
        "AI greets the client and identifies intent.",
        "Answers common questions fast and consistently.",
        "Captures details and qualifies where needed.",
        "Escalates to a human with a clean summary.",
      ],
      priceLabel: "Starting at $___",
      priceNote: "Depends on channels + knowledge base size + routing rules.",
      emotional: {
        money: "Convert more inquiries because you respond instantly — higher conversions with the same team.",
        freedom: "Fewer interruptions for staff; smoother peak-hour operations.",
        growth: "Consistent front desk experience across multiple locations.",
        service: "Your client experience improves because answers are fast, consistent, and guided.",
      },
      media: [
        { kind: "image", title: "AI greeting flow", note: "Receptionist behavior" },
        { kind: "video", title: "Demo video", note: "Voice + WhatsApp handoff" },
        { kind: "image", title: "Summary to staff", note: "Clean escalation" },
      ],
    },
    {
      id: "patient-checkins",
      tier: "Major",
      title: "Patient / Client Check-In Journeys",
      outcome: "Automated follow-ups that keep clients on track and alert your team when needed.",
      industries: ["Dentists", "Doctors", "Beauty Clinics"],
      needs: ["Follow-ups", "Care Journey", "Escalation"],
      channels: ["WhatsApp", "SMS"],
      tags: ["Follow-ups", "Escalation", "Care Journey"],
      includes: ["Journey schedule", "Response logging", "Escalation triggers", "Basic reporting"],
      howItWorks: [
        "After a visit/service, the system schedules check-ins automatically.",
        'Clients reply with simple options (e.g., "Good", "Need help").',
        "Problems trigger an alert to your staff instantly.",
        "You keep consistent follow-up without manual tracking.",
      ],
      priceLabel: "Starting at $___",
      priceNote: "Depends on number of touchpoints + escalation rules.",
      emotional: {
        money: "Higher retention and referrals because clients feel cared for.",
        freedom: "No manual follow-up chaos — the system does it automatically.",
        growth: "Consistent follow-up supports quality at scale.",
        service: "You detect issues early and protect your reputation.",
      },
      media: [
        { kind: "image", title: "Day 1 check-in", note: "Simple options" },
        { kind: "image", title: "Staff alert", note: "Escalation trigger" },
        { kind: "video", title: "Journey demo", note: "Walkthrough" },
      ],
    },
    {
      id: "whatsapp-busy-pack",
      tier: "Mini",
      title: "WhatsApp Auto-Reply Pack (Busy / After-hours)",
      outcome: "Fast setup for auto replies that capture details and set expectations.",
      industries: ["Dentists", "Doctors", "Beauty Clinics", "Beauty Salons", "Electricians", "Mechanics", "Painters", "Drivers", "Other"],
      needs: ["After-hours", "Lead Capture"],
      channels: ["WhatsApp"],
      tags: ["After-hours", "Lead Capture"],
      includes: ["Message templates", "Quick flow setup", "Basic routing"],
      howItWorks: [
        "We install a ready template for your top questions.",
        "Clients get immediate answers and a short intake.",
        "You receive details organized and ready to act.",
      ],
      priceLabel: "Fixed price: $___",
      priceNote: "Quick setup. Optional upgrades available.",
      emotional: {
        money: "Capture leads you'd normally lose after hours — quick ROI.",
        freedom: "Stop worrying about replying instantly; your business stays responsive.",
        growth: "A perfect first step toward a full automation system.",
        service: "Clients get clarity and next steps, which increases trust.",
      },
      media: [
        { kind: "image", title: "Busy auto-reply", note: "Set expectations" },
        { kind: "video", title: "Quick demo", note: "Template walkthrough" },
      ],
    },
    {
      id: "sheets-airtable-tracker",
      tier: "Mini",
      title: "Lead Tracker (Google Sheets / Airtable) + Alerts",
      outcome: "Simple pipeline tracking + alerts when leads stall or need action.",
      industries: ["Dentists", "Doctors", "Beauty Clinics", "Beauty Salons", "Electricians", "Mechanics", "Painters", "Drivers", "Other"],
      needs: ["Reporting", "Ops Tracking"],
      channels: ["Internal"],
      tags: ["Reporting", "Ops Tracking"],
      includes: ["Tracker setup", "Alert automations", "Basic dashboard view"],
      howItWorks: [
        "We create a clean tracker for leads and statuses.",
        "Alerts fire when leads stall or need follow-up.",
        "Your team stays consistent without extra tools.",
      ],
      priceLabel: "Fixed price: $___",
      priceNote: "Perfect for small teams that want clarity fast.",
      emotional: {
        money: "More follow-ups = more closed deals. The tracker prevents leads from silently dying.",
        freedom: "Your team knows exactly what to do next without chaos.",
        growth: "Tracking becomes a habit — the foundation for scaling operations.",
        service: "Consistency improves customer experience and reduces complaints.",
      },
      media: [
        { kind: "image", title: "Tracker view", note: "Simple pipeline" },
        { kind: "image", title: "Alerts", note: "No more forgotten leads" },
        { kind: "video", title: "Setup demo", note: "2–3 min walkthrough" },
      ],
    },
  ];
}

var INDUSTRIES = [
  { key: "dentists", label: "Dentists", examples: ["No-shows", "Follow-ups", "Scheduling"] },
  { key: "doctors", label: "Doctors & Clinics", examples: ["Check-ins", "Reminders", "Intake"] },
  { key: "beauty", label: "Beauty Clinics & Salons", examples: ["Bookings", "After-hours", "Reactivation"] },
  { key: "electricians", label: "Electricians", examples: ["Missed calls", "Quotes", "Dispatch"] },
  { key: "mechanics", label: "Mechanics", examples: ["Missed calls", "Estimates", "Updates"] },
  { key: "painters", label: "Painters", examples: ["Quote intake", "Follow-ups", "Reviews"] },
  { key: "drivers", label: "Drivers & Field Teams", examples: ["Routing", "Updates", "Reminders"] },
];

var FOCUS_BLOCKS = [
  {
    title: "Growth",
    subtitle:
      "We build systems that help you capture more leads, book more appointments, and scale your operation without adding chaos.",
  },
  {
    title: "Peace of mind",
    subtitle:
      "Don't lose clients because you were busy. Our automations respond instantly and keep people supported — especially in health and care scenarios.",
  },
  {
    title: "Time back for your team and your family",
    subtitle:
      "When follow-ups, confirmations, and routine questions are automated, your team can focus on improving the business — and you get breathing room at home.",
  },
  {
    title: "Ambitious ownership",
    subtitle:
      "Make more money, gain more control, and run like an owner. Systems create leverage — so your growth doesn't depend on you being everywhere.",
  },
  {
    title: "Customer service: the hidden growth lever",
    subtitle:
      "Most businesses never improve because they don't track what went wrong. Our follow-up systems collect feedback, highlight issues, and help you fix them fast.",
  },
];

/* -------------------------
 * Shared blocks
 * ------------------------*/

function SoftGlow() {
  var bgStyle = {
    background:
      "radial-gradient(800px 400px at 20% 10%, rgba(169,94,75,0.18), transparent 60%), radial-gradient(700px 350px at 80% 20%, rgba(64,74,90,0.18), transparent 60%)",
  };
  return <div className="pointer-events-none fixed inset-0 opacity-40" style={bgStyle} />;
}

function TagRow(props) {
  return (
    <div className={cx("flex flex-wrap gap-2 items-start", props.className)}>
      {props.tags.map(function (t) {
        return (
          <span
            key={t}
            className="rounded-full border px-3 py-1 text-xs"
            style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)", color: PALETTE.muted }}
          >
            {t}
          </span>
        );
      })}
    </div>
  );
}

function CTABox(props) {
  return (
    <div
      className={cx("rounded-2xl border p-6", props.className)}
      style={{
        background: "linear-gradient(135deg, rgba(169,94,75,0.18), rgba(41,49,62,0.35))",
        borderColor: "rgba(80,83,87,0.5)",
      }}
    >
      <div className="text-xl md:text-2xl font-semibold" style={{ color: PALETTE.text }}>
        {props.title}
      </div>
      <div className="mt-2 text-sm md:text-base" style={{ color: PALETTE.muted }}>
        {props.subtitle}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="primary" onClick={props.onPrimary}>
          {props.primaryLabel}
        </Button>
        {props.secondaryLabel ? (
          <Button variant="secondary" href={props.secondaryHref}>
            {props.secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------
 * HOME PAGE (Multi-section)
 * ------------------------*/

function NeedTile(props) {
  return (
    <Card className="p-4 hover:opacity-95 transition-opacity">
      <button onClick={props.onClick} className="w-full text-left">
        <div className="flex items-start gap-3">
          <div
            className="h-10 w-10 rounded-2xl border flex items-center justify-center"
            style={{ background: PALETTE.s2, borderColor: "rgba(80,83,87,0.4)" }}
          >
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: PALETTE.copperLight }} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
              {props.title}
            </div>
            <div className="mt-1 text-xs" style={{ color: PALETTE.muted }}>
              {props.desc}
            </div>
          </div>
        </div>
      </button>
    </Card>
  );
}

function StepCard(props) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)" }}
    >
      <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.copperLight }}>
        STEP {props.n}
      </div>
      <div className="mt-2 text-sm font-semibold" style={{ color: PALETTE.text }}>
        {props.title}
      </div>
      <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
        {props.desc}
      </div>
    </div>
  );
}

function QuoteCard(props) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: PALETTE.s1, borderColor: "rgba(80,83,87,0.5)" }}
    >
      <div className="text-sm" style={{ color: PALETTE.muted }}>
        &ldquo;{props.quote}&rdquo;
      </div>
      <div className="mt-4 text-xs font-semibold" style={{ color: PALETTE.text }}>
        {props.name}
      </div>
      <div className="mt-1 text-xs" style={{ color: PALETTE.subMuted }}>
        {props.role}
      </div>
    </div>
  );
}

function FAQItem(props) {
  var [open, setOpen] = React.useState(false);
  return (
    <div className="rounded-2xl border" style={{ borderColor: "rgba(80,83,87,0.5)", background: PALETTE.s1 }}>
      <button
        onClick={function () {
          setOpen(!open);
        }}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
      >
        <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
          {props.q}
        </div>
        <div className="text-sm" style={{ color: PALETTE.subMuted }}>
          {open ? "−" : "+"}
        </div>
      </button>
      {open ? (
        <div className="px-5 pb-5 text-sm" style={{ color: PALETTE.muted }}>
          {props.a}
        </div>
      ) : null}
    </div>
  );
}

function HomePage(props) {
  var needs = [
    {
      title: "Missed calls → instant WhatsApp reply",
      desc: "Recover lost leads automatically and capture details.",
      need: "Missed Calls",
    },
    {
      title: "After-hours auto-reply (Busy mode)",
      desc: "Stay responsive when you're offline.",
      need: "After-hours",
    },
    {
      title: "Appointment reminders + confirmations",
      desc: "Reduce no-shows with two-way confirmations.",
      need: "Reminders",
    },
    {
      title: "Patient / client follow-ups (check-ins)",
      desc: "Keep clients on track and alert staff when needed.",
      need: "Follow-ups",
    },
    {
      title: "AI receptionist for calls + chat",
      desc: "Answer FAQs, qualify, route, and escalate to humans.",
      need: "Lead Qualification",
    },
    {
      title: "Simple trackers + alerts (Sheets/Airtable)",
      desc: "Stop losing opportunities to lack of visibility.",
      need: "Reporting",
    },
  ];

  var steps = [
    { n: 1, title: "Pick a need", desc: "Choose the exact situation you want to fix (missed calls, reminders, follow-ups, etc.)." },
    { n: 2, title: "Deploy a proven solution", desc: "We install a ready workflow that fits your industry and tools." },
    { n: 3, title: "Measure & optimize", desc: "Track results and refine to increase conversions and retention." },
  ];

  var faqs = [
    {
      q: "Do you work with WhatsApp only, or also SMS and voice?",
      a: "We can do WhatsApp-only, or combine WhatsApp + SMS + voice depending on your needs and your market.",
    },
    {
      q: "Can this integrate with my existing tools?",
      a: "Yes. We commonly connect CRMs, calendars, Sheets/Airtable, and custom dashboards. If you already use tools, we adapt.",
    },
    {
      q: "Is this only for clinics?",
      a: "No. We focus on service businesses: clinics/dentists, beauty, contractors, and field teams (electricians, mechanics, etc.).",
    },
    {
      q: "How fast can I launch something small?",
      a: "Mini offers (like WhatsApp Busy Pack) can be deployed quickly. Major systems take longer based on routing and integrations.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-12">
      {/* HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
            style={{ background: PALETTE.s1, borderColor: "rgba(80,83,87,0.5)", color: PALETTE.muted }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: PALETTE.copperLight }} />
            Growth &bull; Peace of mind &bull; Better service
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight" style={{ color: PALETTE.text }}>
            {props.heroTitle}
          </h1>

          <p className="mt-4 text-sm md:text-base max-w-xl" style={{ color: PALETTE.muted }}>
            {props.heroSubtitle}
          </p>

          <ul className="mt-6 space-y-2 text-sm" style={{ color: PALETTE.muted }}>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full" style={{ background: PALETTE.copper }} />
              Instant replies to missed calls and messages
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full" style={{ background: PALETTE.copper }} />
              Reminders, confirmations, and follow-ups that run automatically
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full" style={{ background: PALETTE.copper }} />
              Human handoff with clean summaries when needed
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="primary" onClick={props.onGoSolutions}>
              Find My Solution
            </Button>
            <Button variant="secondary" onClick={props.onGoIndustries}>
              See Industries
            </Button>
            <Button variant="secondary" href={props.calendarLink}>
              Book a Call
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs" style={{ color: PALETTE.subMuted }}>
            <span className="rounded-full border px-3 py-1" style={{ borderColor: "rgba(80,83,87,0.4)", background: PALETTE.s1 }}>
              Built fast
            </span>
            <span className="rounded-full border px-3 py-1" style={{ borderColor: "rgba(80,83,87,0.4)", background: PALETTE.s1 }}>
              Works with your stack
            </span>
            <span className="rounded-full border px-3 py-1" style={{ borderColor: "rgba(80,83,87,0.4)", background: PALETTE.s1 }}>
              Trackable results
            </span>
          </div>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
              Workflow preview
            </div>
            <div className="text-xs" style={{ color: PALETTE.subMuted }}>
              Missed-call recovery
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { s: "Step 1", t: "Missed call detected", d: "Auto-triggers within seconds." },
              { s: "Step 2", t: "WhatsApp message sent", d: "Collects intent + key details." },
              { s: "Step 3", t: "Book / route / escalate", d: "Booking link or staff handoff." },
            ].map(function (x) {
              return (
                <div
                  key={x.s}
                  className="rounded-xl border p-4"
                  style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)" }}
                >
                  <div className="text-xs" style={{ color: PALETTE.subMuted }}>
                    {x.s}
                  </div>
                  <div className="mt-1 text-sm font-semibold" style={{ color: PALETTE.text }}>
                    {x.t}
                  </div>
                  <div className="mt-1 text-xs" style={{ color: PALETTE.muted }}>
                    {x.d}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-xs" style={{ color: PALETTE.subMuted }}>
            (Replace placeholders with real screenshots later.)
          </div>
        </Card>
      </div>

      {/* SECTION: NEEDS */}
      <section className="mt-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            kicker="START HERE"
            title="What are you trying to fix right now?"
            subtitle="Click a tile to jump into the Solutions Finder with the right filter."
          />
          <div className="flex gap-2">
            <Button variant="secondary" onClick={props.onGoSolutions}>
              Open solutions &rarr;
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {needs.map(function (n) {
            return (
              <NeedTile
                key={n.title}
                title={n.title}
                desc={n.desc}
                onClick={function () {
                  props.onPickNeed(n.need);
                }}
              />
            );
          })}
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section className="mt-14">
        <SectionHeader
          kicker="HOW IT WORKS"
          title="A simple path from chaos to clarity"
          subtitle="Systems create leverage: more money, more control, more peace of mind."
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map(function (s) {
            return <StepCard key={s.n} n={s.n} title={s.title} desc={s.desc} />;
          })}
        </div>
      </section>

      {/* SECTION: PROOF */}
      <section className="mt-14">
        <SectionHeader
          kicker="PROOF"
          title="What clients usually get in the first 30 days"
          subtitle="Swap placeholders with real metrics as you collect results."
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Response speed" value="Seconds" note="Auto-replies triggered instantly after missed calls/messages." />
          <Stat label="Bookings recovered" value="↑" note="More clients convert because you respond when competitors don't." />
          <Stat label="No-shows reduced" value="↓" note="Two-way confirmations and smart reminders improve attendance." />
          <Stat label="Staff time saved" value="Hours" note="AI handles repetitive questions and follow-ups." />
        </div>
      </section>

      {/* SECTION: FEATURED SOLUTIONS */}
      <section className="mt-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            kicker="FEATURED"
            title="Popular solutions"
            subtitle={'Need-driven offers that solve real problems — not just \u201ctools.\u201d'}
          />
          <Button variant="secondary" onClick={props.onGoSolutions}>
            Browse all &rarr;
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {props.featuredSolutions.map(function (s) {
            return (
              <Card key={s.id} className="p-5">
                <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.copperLight }}>
                  {String(s.tier).toUpperCase()}
                </div>
                <div className="mt-2 text-base font-semibold" style={{ color: PALETTE.text }}>
                  {s.title}
                </div>
                <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
                  {s.outcome}
                </div>
                <div className="mt-4 min-h-[56px]">
                  <TagRow tags={s.tags.slice(0, 3)} />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="primary"
                    onClick={function () {
                      props.onOpenSolution(s.id);
                    }}
                  >
                    View details
                  </Button>
                  <Button variant="secondary" onClick={props.onGoSolutions}>
                    Compare
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SECTION: INDUSTRIES TEASER */}
      <section className="mt-14">
        <Card className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <SectionHeader
                kicker="INDUSTRIES"
                title="Built for the people who run the real world"
                subtitle="Clinics, dentists, beauty, and field teams — systems that help you respond faster and follow up consistently."
              />
              <div className="mt-5 flex flex-wrap gap-2">
                {INDUSTRIES.slice(0, 7).map(function (i) {
                  return (
                    <span
                      key={i.key}
                      className="rounded-full border px-3 py-1 text-xs"
                      style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)", color: PALETTE.muted }}
                    >
                      {i.label}
                    </span>
                  );
                })}
              </div>
              <div className="mt-6">
                <Button variant="primary" onClick={props.onGoIndustries}>
                  Explore industries &rarr;
                </Button>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Dentist", "Doctor", "Beauty Pro", "Electrician", "Mechanic", "Driver"].map(function (l) {
                  return (
                    <div
                      key={l}
                      className="h-24 rounded-2xl border flex items-end p-3"
                      style={{
                        borderColor: "rgba(80,83,87,0.4)",
                        background: "linear-gradient(135deg, rgba(169,94,75,0.22), rgba(64,74,90,0.22))",
                      }}
                    >
                      <div className="text-xs font-semibold" style={{ color: PALETTE.text }}>
                        {l}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 text-xs" style={{ color: PALETTE.subMuted }}>
                (Replace placeholders with real photos of professionals smiling and proud.)
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* SECTION: TESTIMONIALS PLACEHOLDERS */}
      <section className="mt-14">
        <SectionHeader
          kicker="STORIES"
          title="The outcome clients actually want"
          subtitle="More money, more control, and peace of mind — because the system keeps working even when you're busy."
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuoteCard
            quote="We stopped losing patients after hours. The auto-replies capture everything and my staff sees a clean summary."
            name="Clinic Owner"
            role="Dentistry / Clinic"
          />
          <QuoteCard
            quote="No-shows dropped because confirmations are automatic. My team finally focuses on care, not chasing messages."
            name="Operations Manager"
            role="Medical practice"
          />
          <QuoteCard
            quote="I'm a contractor — if I'm on a job, I can't answer. Now I look responsive and I close more work."
            name="Owner"
            role="Field services"
          />
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section className="mt-14">
        <SectionHeader
          kicker="FAQ"
          title="Quick answers"
          subtitle="This is where you remove friction and help SEO with clear intent-based content."
        />
        <div className="mt-6 grid grid-cols-1 gap-3">
          {faqs.map(function (f) {
            return <FAQItem key={f.q} q={f.q} a={f.a} />;
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-14">
        <CTABox
          title="Ready to stop losing clients when you're busy?"
          subtitle="Pick a solution or book a quick call — we'll map the best workflow for your industry and goals."
          primaryLabel="Find My Solution"
          secondaryLabel="Book a Call"
          secondaryHref={props.calendarLink}
          onPrimary={props.onGoSolutions}
        />
      </section>
    </div>
  );
}

/* -------------------------
 * SOLUTIONS PAGE
 * ------------------------*/

function SolutionCard(props) {
  var s = props.s;
  return (
    <Card className="p-5">
      <button onClick={props.onOpen} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.copperLight }}>
              {String(s.tier).toUpperCase()}
            </div>
            <div className="mt-1 text-base font-semibold" style={{ color: PALETTE.text }}>
              {s.title}
            </div>
          </div>
          <div className="text-xs text-right" style={{ color: PALETTE.subMuted }}>
            {s.channels.join(" • ")}
          </div>
        </div>

        <div className="mt-3 text-sm" style={{ color: PALETTE.muted }}>
          {s.outcome}
        </div>

        {/* aligned tags */}
        <div className="mt-4 min-h-[56px]">
          <TagRow tags={s.tags} />
        </div>

        <div className="mt-3 text-xs" style={{ color: PALETTE.subMuted }}>
          Click to open popup &rarr;
        </div>
      </button>
    </Card>
  );
}

function ValueBlock(props) {
  return (
    <div className="rounded-xl border p-4" style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)" }}>
      <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.copperLight }}>
        {String(props.title).toUpperCase()}
      </div>
      <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
        {props.text}
      </div>
    </div>
  );
}

function SolutionsPage(props) {
  var allSolutions = React.useMemo(function () {
    return buildSolutions();
  }, []);

  var tiers = ["All", "Major", "Mini"];
  var industryOptions = ["All"].concat(
    ["Dentists", "Doctors", "Beauty Clinics", "Beauty Salons", "Electricians", "Mechanics", "Painters", "Drivers", "Other"]
  );
  var needOptions = [
    "All",
    "Missed Calls",
    "After-hours",
    "Lead Qualification",
    "Reminders",
    "Scheduling",
    "Follow-ups",
    "Care Journey",
    "Escalation",
    "Lead Capture",
    "Reporting",
    "Ops Tracking",
    "FAQ Handling",
    "Routing",
  ];

  var [q, setQ] = React.useState(props.defaultQuery || "");
  var [tier, setTier] = React.useState("All");
  var [industry, setIndustry] = React.useState("All");
  var [need, setNeed] = React.useState(props.defaultNeed || "All");

  var [openId, setOpenId] = React.useState(null);
  var active = openId
    ? allSolutions.filter(function (x) {
        return x.id === openId;
      })[0]
    : null;

  var filtered = allSolutions
    .filter(function (s) {
      if (tier !== "All" && s.tier !== tier) return false;
      if (industry !== "All" && s.industries.indexOf(industry) === -1) return false;
      if (need !== "All" && s.needs.indexOf(need) === -1) return false;
      var qq = (q || "").trim().toLowerCase();
      if (!qq) return true;
      var hay = (s.title + " " + s.outcome + " " + s.tags.join(" ") + " " + s.channels.join(" ")).toLowerCase();
      return hay.indexOf(qq) !== -1;
    });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHeader
          kicker="SOLUTIONS"
          title="Find the right solution in 30 seconds"
          subtitle="Filter by industry and situation. Click a solution to open a popup with media, steps, and pricing."
        />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={props.onGoHome}>
            &larr; Home
          </Button>
          <Button variant="secondary" onClick={props.onGoIndustries}>
            Industries &rarr;
          </Button>
          <Button variant="primary" href={props.calendarLink}>
            Book a Call
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4 lg:col-span-2">
          <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
            SEARCH
          </div>
          <input
            value={q}
            onChange={function (e) {
              setQ(e.target.value);
            }}
            className="mt-2 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{
              background: PALETTE.bg,
              borderColor: "rgba(80,83,87,0.5)",
              color: PALETTE.text,
              "--tw-ring-color": PALETTE.copperLight,
              "--tw-ring-offset-color": PALETTE.bg,
            }}
            placeholder="Try: missed calls, reminders, receptionist, WhatsApp..."
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
                INDUSTRY
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {industryOptions.map(function (x) {
                  return (
                    <Pill
                      key={x}
                      active={industry === x}
                      onClick={function () {
                        setIndustry(x);
                      }}
                    >
                      {x}
                    </Pill>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
                NEED
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {needOptions.map(function (x) {
                  return (
                    <Pill
                      key={x}
                      active={need === x}
                      onClick={function () {
                        setNeed(x);
                      }}
                    >
                      {x}
                    </Pill>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
                OFFER TYPE
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tiers.map(function (x) {
                  return (
                    <Pill
                      key={x}
                      active={tier === x}
                      onClick={function () {
                        setTier(x);
                      }}
                    >
                      {x}
                    </Pill>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
            Want the fastest recommendation?
          </div>
          <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
            Book a quick call. We&apos;ll match the best flow for your industry and goals.
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="primary" href={props.calendarLink}>
              Book a 15-min Call
            </Button>
            <Button variant="secondary" onClick={props.onGoIndustries}>
              See industries
            </Button>
          </div>
          <div className="mt-5 text-xs" style={{ color: PALETTE.subMuted }}>
            SEO tip: later you can create &ldquo;Need + Industry&rdquo; pages (e.g., &ldquo;Missed Call Recovery for Dentists&rdquo;).
          </div>
        </Card>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm" style={{ color: PALETTE.muted }}>
          Showing <span style={{ color: PALETTE.text, fontWeight: 700 }}>{filtered.length}</span> solutions
        </div>
        <Button
          variant="ghost"
          onClick={function () {
            setQ("");
            setIndustry("All");
            setNeed("All");
            setTier("All");
          }}
        >
          Reset filters
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(function (s) {
          return (
            <SolutionCard
              key={s.id}
              s={s}
              onOpen={function () {
                setOpenId(s.id);
              }}
            />
          );
        })}
      </div>

      <Modal
        open={!!active}
        title={active ? active.title : "Solution"}
        onClose={function () {
          setOpenId(null);
        }}
      >
        {!active ? null : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <MediaViewer media={active.media} />
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.copperLight }}>
                {String(active.tier).toUpperCase()} SOLUTION
              </div>
              <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
                {active.outcome}
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
                  HOW IT WORKS
                </div>
                <ol className="mt-2 space-y-2 text-sm list-decimal list-inside" style={{ color: PALETTE.muted }}>
                  {active.howItWorks.map(function (x) {
                    return <li key={x}>{x}</li>;
                  })}
                </ol>
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
                  WHAT YOU GET
                </div>
                <ul className="mt-2 space-y-1 text-sm" style={{ color: PALETTE.muted }}>
                  {active.includes.map(function (x) {
                    return (
                      <li key={x} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full" style={{ background: PALETTE.copper }} />
                        <span>{x}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div
                className="mt-4 rounded-2xl border p-4"
                style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)" }}
              >
                <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.copperLight }}>
                  PRICING
                </div>
                <div className="mt-2 text-xl font-semibold" style={{ color: PALETTE.text }}>
                  {active.priceLabel}
                </div>
                <div className="mt-1 text-sm" style={{ color: PALETTE.muted }}>
                  {active.priceNote}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="primary" href={props.calendarLink}>
                    Get this solution
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={function () {
                      setOpenId(null);
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <ValueBlock title="More money" text={active.emotional.money} />
                <ValueBlock title="Freedom" text={active.emotional.freedom} />
                <ValueBlock title="Growth" text={active.emotional.growth} />
                <ValueBlock title="Better service" text={active.emotional.service} />
              </div>

              <div className="mt-4">
                <TagRow tags={active.tags} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* -------------------------
 * INDUSTRIES PAGE
 * ------------------------*/

function PhotoCard(props) {
  return (
    <div
      className="h-24 md:h-28 rounded-2xl border flex items-end p-3"
      style={{
        borderColor: "rgba(80,83,87,0.4)",
        background: "linear-gradient(135deg, rgba(169,94,75,0.22), rgba(64,74,90,0.22))",
      }}
    >
      <div className="text-xs font-semibold" style={{ color: PALETTE.text }}>
        {props.label}
      </div>
    </div>
  );
}

function ProfessionalsStrip(props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {props.labels.slice(0, 5).map(function (l) {
        return <PhotoCard key={l} label={l} />;
      })}
    </div>
  );
}

function FocusBlock(props) {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div>
          <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.copperLight }}>
            FOCUS
          </div>
          <div className="mt-2 text-xl font-semibold" style={{ color: PALETTE.text }}>
            {props.title}
          </div>
          <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
            {props.subtitle}
          </div>
          <div className="mt-4 text-xs" style={{ color: PALETTE.subMuted }}>
            (Replace these placeholders with real photos of professionals smiling and proud.)
          </div>
        </div>
        <div>
          <ProfessionalsStrip labels={props.professionals} />
        </div>
      </div>
    </Card>
  );
}

function IndustriesPage(props) {
  var proLabels = ["Dentist", "Doctor", "Beauty Pro", "Electrician", "Mechanic"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHeader
          kicker="INDUSTRIES"
          title="Built for the people who run the real world"
          subtitle="We help service businesses respond faster, follow up consistently, and grow with systems — not stress."
        />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={props.onGoHome}>
            &larr; Home
          </Button>
          <Button variant="secondary" onClick={props.onGoSolutions}>
            Solutions &rarr;
          </Button>
          <Button variant="primary" href={props.calendarLink}>
            Book a Call
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <Card className="p-5">
          <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
            WHO WE HELP
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map(function (i) {
              return (
                <div
                  key={i.key}
                  className="rounded-2xl border p-4"
                  style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)" }}
                >
                  <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
                    {i.label}
                  </div>
                  <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
                    {i.examples.join(" • ")}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4">
        {FOCUS_BLOCKS.map(function (b) {
          return (
            <FocusBlock key={b.title} title={b.title} subtitle={b.subtitle} professionals={proLabels} />
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="primary" onClick={props.onGoSolutions}>
          Explore solutions &rarr;
        </Button>
      </div>
    </div>
  );
}

/* -------------------------
 * ABOUT PAGE
 * ------------------------*/

function AboutPage(props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHeader
          kicker="ABOUT"
          title="We build systems that keep working when you're busy"
          subtitle="APPEX INNOVATIONS is focused on need-driven automation and AI agents for service businesses."
        />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={props.onGoHome}>
            &larr; Home
          </Button>
          <Button variant="secondary" onClick={props.onGoSolutions}>
            Solutions &rarr;
          </Button>
          <Button variant="primary" href={props.calendarLink}>
            Book a Call
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
            Our philosophy
          </div>
          <div className="mt-3 text-sm" style={{ color: PALETTE.muted }}>
            Most businesses don&apos;t need more &ldquo;tools.&rdquo; They need outcomes: faster response, consistent follow-up, fewer no-shows,
            more closed deals, and better customer experience. We package proven workflows into solutions you can deploy and
            improve over time.
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { t: "Need-driven", d: "We lead with the client need and the outcome, not the software." },
              { t: "Fast to deploy", d: 'Major systems and quick \u201cmini offers\u201d depending on urgency.' },
              { t: "Works with your stack", d: "We integrate your CRM, calendar, sheets, and messaging." },
              { t: "Measured results", d: "Dashboards and logs so you can optimize and scale." },
            ].map(function (x) {
              return (
                <div
                  key={x.t}
                  className="rounded-2xl border p-4"
                  style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)" }}
                >
                  <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
                    {x.t}
                  </div>
                  <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
                    {x.d}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
            Typical stack
          </div>
          <div className="mt-3 text-sm" style={{ color: PALETTE.muted }}>
            WhatsApp/SMS/Voice + automations + databases + dashboards.
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "WhatsApp",
              "SMS",
              "Voice Agents",
              "Make.com",
              "n8n",
              "Zapier",
              "Airtable",
              "Supabase",
              "Dashboards",
            ].map(function (t) {
              return (
                <span
                  key={t}
                  className="rounded-full border px-3 py-1 text-xs"
                  style={{ background: PALETTE.bg, borderColor: "rgba(80,83,87,0.4)", color: PALETTE.muted }}
                >
                  {t}
                </span>
              );
            })}
          </div>

          <div className="mt-6">
            <Button variant="primary" href={props.calendarLink}>
              Talk to us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* -------------------------
 * CONTACT PAGE
 * ------------------------*/

function Field(props) {
  return (
    <div>
      <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
        {props.label}
      </div>
      <input
        className="mt-2 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2"
        style={{
          background: PALETTE.bg,
          borderColor: "rgba(80,83,87,0.5)",
          color: PALETTE.text,
          "--tw-ring-color": PALETTE.copperLight,
          "--tw-ring-offset-color": PALETTE.bg,
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
}

function TextArea(props) {
  return (
    <div>
      <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
        {props.label}
      </div>
      <textarea
        rows={6}
        className="mt-2 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2"
        style={{
          background: PALETTE.bg,
          borderColor: "rgba(80,83,87,0.5)",
          color: PALETTE.text,
          "--tw-ring-color": PALETTE.copperLight,
          "--tw-ring-offset-color": PALETTE.bg,
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
}

function ContactPage(props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHeader
          kicker="CONTACT"
          title="Tell us what you need"
          subtitle="Describe the situation (industry + problem). We'll recommend the best solution."
        />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={props.onGoHome}>
            &larr; Home
          </Button>
          <Button variant="secondary" onClick={props.onGoSolutions}>
            Solutions &rarr;
          </Button>
          <Button variant="primary" href={props.calendarLink}>
            Book a Call
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
            Contact form (placeholder)
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" placeholder="Your name" />
            <Field label="Email" placeholder="you@email.com" />
            <Field label="Phone / WhatsApp" placeholder="+503 ..." />
            <Field label="Industry" placeholder="Dentist / Clinic / Beauty / Contractor..." />
          </div>
          <div className="mt-4">
            <TextArea label="What do you need solved?" placeholder="Example: I miss calls after hours and lose leads. I want WhatsApp auto-replies + lead capture + booking." />
          </div>
          <div className="mt-5 flex gap-2">
            <Button variant="primary" onClick={function () {}}>
              Send (placeholder)
            </Button>
            <Button variant="secondary" href={props.calendarLink}>
              Or book a call
            </Button>
          </div>
          <div className="mt-3 text-xs" style={{ color: PALETTE.subMuted }}>
            Later you can connect this to your form tool / CRM / automation webhook.
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
            Direct contact
          </div>
          <div className="mt-3 text-sm" style={{ color: PALETTE.muted }}>
            Email: {props.contactEmail}
          </div>
          <div className="mt-1 text-sm" style={{ color: PALETTE.muted }}>
            Phone: {props.contactPhone}
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold tracking-wider" style={{ color: PALETTE.subMuted }}>
              FASTEST PATH
            </div>
            <div className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
              Book a quick call. We&apos;ll map a solution based on your need and industry.
            </div>
            <div className="mt-4">
              <Button variant="primary" href={props.calendarLink}>
                Book a 15-min Call
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* -------------------------
 * LEGAL PAGES
 * ------------------------*/

function LegalPage(props) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader kicker={props.kicker} title={props.title} subtitle={props.subtitle} />
        <Button variant="secondary" onClick={props.onGoHome}>
          &larr; Home
        </Button>
      </div>

      <Card className="p-6 mt-8">
        <div className="text-sm" style={{ color: PALETTE.muted }}>
          This is a placeholder {props.title} page. Replace the sections below with your final legal text.
        </div>

        <div className="mt-6 space-y-4 text-sm" style={{ color: PALETTE.muted }}>
          <div>
            <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
              1) Overview
            </div>
            <div className="mt-2">
              Explain what data you collect, how you use it, and what users can expect.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
              2) Data &amp; Security
            </div>
            <div className="mt-2">
              Describe storage, access, and best-effort security practices.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
              3) Contact
            </div>
            <div className="mt-2">
              Provide a contact email for legal/privacy requests.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* -------------------------
 * FOOTER
 * ------------------------*/

function Footer(props) {
  return (
    <footer className="border-t" style={{ borderColor: "rgba(80,83,87,0.4)", background: PALETTE.bg }}>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <LogoMark brandName={props.brandName} />
            <div className="mt-3 text-sm" style={{ color: PALETTE.muted }}>
              {props.footerTagline}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
              Pages
            </div>
            <div className="mt-3 space-y-2 text-sm" style={{ color: PALETTE.muted }}>
              {[
                ["home", "Home"],
                ["solutions", "Solutions"],
                ["industries", "Industries"],
                ["about", "About"],
                ["contact", "Contact"],
              ].map(function (x) {
                return (
                  <button key={x[0]} className="block hover:opacity-90" onClick={function () { props.onNav(x[0]); }}>
                    {x[1]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
              Legal
            </div>
            <div className="mt-3 space-y-2 text-sm" style={{ color: PALETTE.muted }}>
              <button className="block hover:opacity-90" onClick={function () { props.onNav("privacy"); }}>
                Privacy Policy
              </button>
              <button className="block hover:opacity-90" onClick={function () { props.onNav("terms"); }}>
                Terms
              </button>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold" style={{ color: PALETTE.text }}>
              Contact
            </div>
            <div className="mt-3 space-y-2 text-sm" style={{ color: PALETTE.muted }}>
              <div>{props.contactEmail}</div>
              <div>{props.contactPhone}</div>
              <div className="text-xs" style={{ color: PALETTE.subMuted }}>
                (Location placeholder)
              </div>

              <div className="mt-3 flex gap-2">
                {[PALETTE.copper, PALETTE.copperLight, PALETTE.slate, PALETTE.border].map(function (c) {
                  return (
                    <div
                      key={c}
                      className="h-8 w-8 rounded-xl border"
                      style={{ background: c, borderColor: "rgba(80,83,87,0.4)" }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 border-t pt-6 text-xs flex flex-col md:flex-row gap-4 justify-between"
          style={{ borderColor: "rgba(80,83,87,0.4)", color: PALETTE.subMuted }}
        >
          <div>
            &copy; {new Date().getFullYear()} {props.brandName}. All rights reserved.
          </div>
          <div className="flex gap-3">
            <button className="hover:opacity-90" onClick={function () { props.onNav("privacy"); }}>Privacy</button>
            <button className="hover:opacity-90" onClick={function () { props.onNav("terms"); }}>Terms</button>
            <button className="hover:opacity-90" onClick={function () { props.onNav("contact"); }}>Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------
 * MAIN APP (Single export)
 * ------------------------*/

export default function AppexInnovationsSite(props) {
  var brandName = props.brandName || "APPEX INNOVATIONS";
  var initialPage = props.initialPage || "home";
  var heroTitle = props.heroTitle || "Never miss a lead or patient again — even when you're busy.";
  var heroSubtitle = props.heroSubtitle || "AI agents + automations that respond instantly, qualify clients, book appointments, and follow up until they take action.";
  var calendarLink = props.calendarLink || "#";
  var contactEmail = props.contactEmail || "hello@appexinnovations.com";
  var contactPhone = props.contactPhone || "+1 (000) 000-0000";
  var footerTagline = props.footerTagline || "Need-driven automations and AI agents that help teams respond faster, book more, and operate with peace of mind.";

  var allSolutions = React.useMemo(function () { return buildSolutions(); }, []);
  var featuredSolutions = allSolutions.slice(0, 3);

  var [page, setPage] = React.useState(initialPage);

  var [defaultNeed, setDefaultNeed] = React.useState("All");
  var [openSolutionId, setOpenSolutionId] = React.useState(null);

  function nav(p) {
    setPage(p);
    window.scrollTo(0, 0);
  }

  function goSolutionsWithNeed(need) {
    setDefaultNeed(need || "All");
    setPage("solutions");
    window.scrollTo(0, 0);
  }

  return (
    <div className="min-h-screen" style={{ background: PALETTE.bg, color: PALETTE.text }}>
      <SoftGlow />

      {/* TOP NAV */}
      <div
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ borderColor: "rgba(80,83,87,0.4)", background: "rgba(15,16,18,0.8)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <button onClick={function () { nav("home"); }} className="shrink-0">
            <LogoMark brandName={brandName} />
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: PALETTE.muted }}>
            {[
              ["home", "Home"],
              ["solutions", "Solutions"],
              ["industries", "Industries"],
              ["about", "About"],
              ["contact", "Contact"],
            ].map(function (x) {
              var active = page === x[0];
              return (
                <button
                  key={x[0]}
                  onClick={function () { nav(x[0]); }}
                  className="hover:opacity-90"
                  style={{ color: active ? PALETTE.text : PALETTE.muted }}
                >
                  {x[1]}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="secondary" href={calendarLink}>
              Book a Call
            </Button>
            <Button variant="primary" onClick={function () { nav("solutions"); }}>
              Find My Solution
            </Button>
          </div>
        </div>
      </div>

      {/* PAGES */}
      <div className="relative">
        {page === "home" ? (
          <HomePage
            heroTitle={heroTitle}
            heroSubtitle={heroSubtitle}
            calendarLink={calendarLink}
            featuredSolutions={featuredSolutions}
            onGoSolutions={function () { nav("solutions"); }}
            onGoIndustries={function () { nav("industries"); }}
            onPickNeed={function (need) { goSolutionsWithNeed(need); }}
            onOpenSolution={function (id) {
              setOpenSolutionId(id);
              nav("solutions");
            }}
          />
        ) : page === "industries" ? (
          <IndustriesPage
            calendarLink={calendarLink}
            onGoHome={function () { nav("home"); }}
            onGoSolutions={function () { nav("solutions"); }}
          />
        ) : page === "about" ? (
          <AboutPage
            calendarLink={calendarLink}
            onGoHome={function () { nav("home"); }}
            onGoSolutions={function () { nav("solutions"); }}
          />
        ) : page === "contact" ? (
          <ContactPage
            calendarLink={calendarLink}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            onGoHome={function () { nav("home"); }}
            onGoSolutions={function () { nav("solutions"); }}
          />
        ) : page === "privacy" ? (
          <LegalPage
            kicker="LEGAL"
            title="Privacy Policy"
            subtitle="Placeholder — replace with your final privacy policy."
            onGoHome={function () { nav("home"); }}
          />
        ) : page === "terms" ? (
          <LegalPage
            kicker="LEGAL"
            title="Terms of Service"
            subtitle="Placeholder — replace with your final terms."
            onGoHome={function () { nav("home"); }}
          />
        ) : (
          <SolutionsPage
            calendarLink={calendarLink}
            defaultNeed={defaultNeed}
            defaultQuery=""
            onGoHome={function () { nav("home"); }}
            onGoIndustries={function () { nav("industries"); }}
            key={"solutions-" + defaultNeed + "-" + String(openSolutionId || "")}
          />
        )}

        <Footer
          brandName={brandName}
          footerTagline={footerTagline}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
          onNav={nav}
        />
      </div>
    </div>
  );
}
