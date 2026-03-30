import { useState, MouseEvent as ReactMouseEvent, lazy, Suspense } from "react";
import { motion, useAnimate } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock,
  Send, AlertTriangle, Lightbulb, CheckCircle,
  Bell, ArrowRight, Users, Headphones, BookOpen,
  Globe, Twitter, Instagram, Youtube, Linkedin, Facebook,
  type LucideIcon
} from "lucide-react";

const LazyWorld = lazy(() =>
  import("@/components/ui/globe").then((m) => ({ default: m.World }))
);

/* ── Globe Arc Data ─────────────────────────────────────────── */
const GLOBE_COLORS = ["#06b6d4", "#3b82f6", "#6366f1"];
const pickColor = () => GLOBE_COLORS[Math.floor(Math.random() * GLOBE_COLORS.length)];

const GLOBE_CONFIG = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const SAMPLE_ARCS = [
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1, color: pickColor() },
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: pickColor() },
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5, color: pickColor() },
  { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: pickColor() },
  { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: pickColor() },
  { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: pickColor() },
  { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: pickColor() },
  { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: pickColor() },
  { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: pickColor() },
  { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5, color: pickColor() },
  { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: pickColor() },
  { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.1, color: pickColor() },
  { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: pickColor() },
  { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: pickColor() },
  { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.2, color: pickColor() },
  { order: 6, startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546, arcAlt: 0.7, color: pickColor() },
  { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: pickColor() },
  { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: pickColor() },
  { order: 7, startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.1, color: pickColor() },
  { order: 7, startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: pickColor() },
  { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: pickColor() },
  { order: 8, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2, color: pickColor() },
  { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: pickColor() },
  { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: pickColor() },
  { order: 9, startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: pickColor() },
  { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7, color: pickColor() },
  { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: pickColor() },
  { order: 10, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7, color: pickColor() },
  { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3, color: pickColor() },
  { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3, color: pickColor() },
  { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: pickColor() },
  { order: 11, startLat: -6.2088, startLng: 106.8456, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.2, color: pickColor() },
  { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: pickColor() },
  { order: 12, startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1, color: pickColor() },
  { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: pickColor() },
  { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.3, color: pickColor() },
  { order: 13, startLat: 52.52, startLng: 13.405, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: pickColor() },
  { order: 13, startLat: 11.986597, startLng: 8.571831, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: pickColor() },
  { order: 13, startLat: -22.9068, startLng: -43.1729, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.1, color: pickColor() },
  { order: 14, startLat: -33.936138, startLng: 18.436529, endLat: 21.395643, endLng: 39.883798, arcAlt: 0.3, color: pickColor() },
];

/* ── ClipPath Link Animation ──────────────────────────────── */
const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

type Side = "top" | "left" | "bottom" | "right";
type KeyframeMap = { [key in Side]: string[] };

const ENTRANCE_KEYFRAMES: KeyframeMap = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};
const EXIT_KEYFRAMES: KeyframeMap = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const ClipLinkBox = ({
  Icon, label, handle, href,
}: { Icon: LucideIcon; label: string; handle: string; href: string }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: ReactMouseEvent): Side => {
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const sides = [
      { proximity: Math.abs(box.left - e.clientX), side: "left" as Side },
      { proximity: Math.abs(box.right - e.clientX), side: "right" as Side },
      { proximity: Math.abs(box.top - e.clientY), side: "top" as Side },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" as Side },
    ];
    return sides.sort((a, b) => a.proximity - b.proximity)[0].side;
  };

  const handleMouseEnter = (e: ReactMouseEvent) => {
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] });
  };
  const handleMouseLeave = (e: ReactMouseEvent) => {
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-24 sm:h-32 md:h-36 w-full place-content-center group"
    >
      <div className="flex flex-col items-center gap-2">
        <Icon className="text-2xl sm:text-3xl lg:text-4xl w-8 h-8 sm:w-10 sm:h-10" />
        <span className="font-heading font-black text-xs uppercase tracking-widest opacity-60">{label}</span>
        <span className="font-body text-[10px] text-muted-foreground">{handle}</span>
      </div>

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-foreground text-background"
      >
        <div className="flex flex-col items-center gap-2">
          <Icon className="text-2xl sm:text-3xl lg:text-4xl w-8 h-8 sm:w-10 sm:h-10" />
          <span className="font-heading font-black text-xs uppercase tracking-widest opacity-70">{label}</span>
        </div>
      </div>
    </a>
  );
};

const TODAY = new Date().getDay(); // 0 = Sunday

const HOURS = [
  { day: "Monday", dayIdx: 1, hours: "8:00 AM – 9:00 PM" },
  { day: "Tuesday", dayIdx: 2, hours: "8:00 AM – 9:00 PM" },
  { day: "Wednesday", dayIdx: 3, hours: "8:00 AM – 9:00 PM" },
  { day: "Thursday", dayIdx: 4, hours: "8:00 AM – 9:00 PM" },
  { day: "Friday", dayIdx: 5, hours: "8:00 AM – 8:00 PM" },
  { day: "Saturday", dayIdx: 6, hours: "10:00 AM – 6:00 PM" },
  { day: "Sunday", dayIdx: 0, hours: "12:00 PM – 5:00 PM" },
];



const SOCIALS = [
  { label: "Twitter / X", icon: Twitter, handle: "@LibraVault", href: "#" },
  { label: "Instagram", icon: Instagram, handle: "@libravault.lib", href: "#" },
  { label: "Facebook", icon: Facebook, handle: "LibraVault", href: "#" },
  { label: "LinkedIn", icon: Linkedin, handle: "LibraVault Org", href: "#" },
  { label: "YouTube", icon: Youtube, handle: "LibraVault", href: "#" },
  { label: "Website", icon: Globe, handle: "libravault.org", href: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};



/* ── Main Contact Section ─────────────────────────────────── */
const ContactSection = () => {
  // const [faqSearch, setFaqSearch] = useState("");
  const [contactSent, setContactSent] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [suggestionSent, setSuggestionSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);



  return (
    <div id="contact" className="space-y-0">

      {/* ── 1. Hero Contact Header ─────────────────────────── */}
      <section className="py-24 px-6 bg-white text-foreground overflow-hidden relative min-h-[600px]">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 40px,#e5e7eb 40px,#e5e7eb 42px),repeating-linear-gradient(90deg,transparent,transparent 40px,#e5e7eb 40px,#e5e7eb 42px)" }}
        />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left — Text */}
            <motion.div
              className="w-full lg:w-1/2 max-w-2xl"
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="font-heading font-bold text-primary text-sm tracking-[0.3em] uppercase mb-4">
                LibraVault — Contact
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-6xl md:text-8xl font-black leading-none mb-6">
                LET'S<br />
                <span className="text-primary">TALK.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-xl text-foreground/70 max-w-xl mb-10">
                Have a question, a suggestion, or just want to say hello? Our team is here and ready to help — every single day.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a href="#contact-form" className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading inline-flex items-center gap-2">
                  Send Us a Message <ArrowRight className="w-5 h-5" />
                </a>
                <a href="tel:+15550100000" className="brutal-btn bg-background text-foreground rounded-md font-heading inline-flex items-center gap-2"
                  style={{ border: "2px solid hsl(var(--foreground))" }}>
                  <Phone className="w-5 h-5" /> Call Now
                </a>
              </motion.div>
            </motion.div>

            {/* Right — Globe */}
            <div className="w-full lg:w-1/2 relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
              <div className="absolute w-full h-full z-10">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                }>
                  <LazyWorld data={SAMPLE_ARCS} globeConfig={GLOBE_CONFIG} />
                </Suspense>
              </div>
              <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-transparent z-20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Response Time Promise ───────────────────────── */}
      <section className="py-8 px-6 bg-primary">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 text-primary-foreground">
            {[
              { icon: Clock, label: "Reply within 24 hours" },
              { icon: CheckCircle, label: "Expert team available" },
              { icon: Headphones, label: "Dedicated support line" },
              { icon: Mail, label: "Email response guaranteed" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 font-heading font-bold">
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Get In Touch Cards ─────────────────────────── */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h3
            className="font-heading text-4xl font-black mb-10"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          >
            Get In Touch
          </motion.h3>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          >
            {[
              { icon: Phone, title: "Call Us", detail: "+1 (555) 010-0000", sub: "Mon–Fri, 8 AM – 9 PM", color: "bg-primary", href: "tel:+15550100000" },
              { icon: Mail, title: "Email Us", detail: "hello@libravault.org", sub: "We reply within 24 hours", color: "bg-secondary", href: "mailto:hello@libravault.org" },
              { icon: MapPin, title: "Visit Us", detail: "Nanganallur, Chennai", sub: "Open 7 days a week", color: "bg-accent", href: "#map" },
            ].map(({ icon: Icon, title, detail, sub, color, href }) => (
              <motion.a
                key={title}
                variants={fadeUp}
                href={href}
                className="brutal-card p-6 rounded-lg group block"
              >
                <div className={`${color} w-14 h-14 brutal-border rounded-lg flex items-center justify-center mb-4 group-hover:rotate-3 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-heading text-2xl font-black mb-1">{title}</h4>
                <p className="font-heading font-bold text-lg">{detail}</p>
                <p className="text-muted-foreground text-sm mt-1">{sub}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Contact Form + Library Hours ───────────────── */}
      <section id="contact-form" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-heading text-4xl font-black mb-8">Send a Message</h3>
              {contactSent ? (
                <div className="brutal-card p-8 rounded-lg text-center space-y-4">
                  <CheckCircle className="w-16 h-16 mx-auto text-primary" />
                  <h4 className="font-heading text-2xl font-black">Message Sent!</h4>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setContactSent(false)} className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading text-sm">
                    Send Another
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => { e.preventDefault(); setContactSent(true); }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-heading font-bold text-sm mb-1 block">Full Name *</label>
                      <input required placeholder="Jane Smith" className="brutal-input w-full rounded-md" data-testid="input-contact-name" />
                    </div>
                    <div>
                      <label className="font-heading font-bold text-sm mb-1 block">Email *</label>
                      <input required type="email" placeholder="jane@example.com" className="brutal-input w-full rounded-md" data-testid="input-contact-email" />
                    </div>
                  </div>
                  <div>
                    <label className="font-heading font-bold text-sm mb-1 block">Subject *</label>
                    <select required className="brutal-input w-full rounded-md bg-background" data-testid="select-contact-subject">
                      <option value="">— Select a subject —</option>
                      <option>General Enquiry</option>
                      <option>Membership Help</option>
                      <option>Book Request</option>
                      <option>Borrowing / Returns</option>
                      <option>Fines & Payments</option>
                      <option>Events & Programs</option>
                      <option>Technical Issue</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-heading font-bold text-sm mb-1 block">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="brutal-input w-full rounded-md resize-none"
                      data-testid="textarea-contact-message"
                    />
                  </div>
                  <button type="submit" className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading inline-flex items-center gap-2 w-full justify-center" data-testid="button-contact-submit">
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Library Hours */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-heading text-4xl font-black mb-8">Library Hours</h3>
              <div className="brutal-card rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-foreground text-background">
                      <th className="font-heading font-black text-left px-5 py-3 text-sm uppercase tracking-wider">Day</th>
                      <th className="font-heading font-black text-left px-5 py-3 text-sm uppercase tracking-wider">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HOURS.map(({ day, dayIdx, hours }) => {
                      const isToday = dayIdx === TODAY;
                      return (
                        <tr
                          key={day}
                          className={`border-t-2 border-border transition-colors ${isToday ? "bg-primary" : "hover:bg-muted"}`}
                        >
                          <td className="px-5 py-3 font-heading font-bold flex items-center gap-2">
                            {day}
                            {isToday && (
                              <span className="text-[10px] font-black bg-foreground text-background px-1.5 py-0.5 rounded uppercase">
                                Today
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3 font-body text-sm">{hours}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 font-body">
                * Hours may differ on public holidays. Follow us on social media for updates.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Map + Visit Us ─────────────────────────────── */}
      <section id="map" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h3
            className="font-heading text-4xl font-black mb-10"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          >
            Find Us
          </motion.h3>
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Map Embed */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            >
              <div className="brutal-card rounded-lg overflow-hidden" style={{ height: 380 }}>
                <iframe
                  title="LibraVault Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.610565863953!2d80.19233621430487!3d12.99041281784534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d883b6b7a69%3A0xd64f43472097e3z3!2sNanganallur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Visit Us Info */}
            <motion.div
              className="space-y-5"
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            >
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  lines: ["Nanganullur", "Chennai, Tamil Nadu"],
                },
                {
                  icon: Clock,
                  title: "Parking",
                  lines: ["Free 2-hour parking", "Lot B — entrance on Oak St"],
                },
                {
                  icon: Users,
                  title: "Accessibility",
                  lines: ["Wheelchair ramp at main entrance", "Elevator to all floors", "Hearing loop available"],
                },
              ].map(({ icon: Icon, title, lines }) => (
                <motion.div key={title} variants={fadeUp} className="brutal-card p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-secondary flex-shrink-0" />
                    <h4 className="font-heading font-black text-base">{title}</h4>
                  </div>
                  {lines.map((l) => (
                    <p key={l} className="text-sm text-muted-foreground font-body">{l}</p>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>



      {/* ── 8. Report an Issue + Suggestion Box ───────────── */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Report an Issue */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-destructive brutal-border rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-black">Report an Issue</h3>
              </div>
              {reportSent ? (
                <div className="brutal-card p-6 rounded-lg text-center space-y-3">
                  <CheckCircle className="w-12 h-12 mx-auto text-primary" />
                  <p className="font-heading font-bold">Report received — thank you!</p>
                  <button onClick={() => setReportSent(false)} className="brutal-btn bg-primary text-primary-foreground rounded-md text-sm font-heading">
                    Submit Another
                  </button>
                </div>
              ) : (
                <form className="brutal-card p-6 rounded-lg space-y-4" onSubmit={(e) => { e.preventDefault(); setReportSent(true); }}>
                  <div>
                    <label className="font-heading font-bold text-sm mb-1 block">Issue Type *</label>
                    <select required className="brutal-input w-full rounded-md bg-background" data-testid="select-report-type">
                      <option value="">— Select type —</option>
                      <option>Damaged Book</option>
                      <option>Missing Page / Content</option>
                      <option>Website Bug</option>
                      <option>Incorrect Catalogue Info</option>
                      <option>Billing / Fine Error</option>
                      <option>Staff Complaint</option>
                      <option>Accessibility Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-heading font-bold text-sm mb-1 block">Description *</label>
                    <textarea required rows={4} placeholder="Describe the issue in detail..." className="brutal-input w-full rounded-md resize-none" data-testid="textarea-report-description" />
                  </div>
                  <div>
                    <label className="font-heading font-bold text-sm mb-1 block">Your Email (optional)</label>
                    <input type="email" placeholder="For follow-up updates" className="brutal-input w-full rounded-md" data-testid="input-report-email" />
                  </div>
                  <button type="submit" className="brutal-btn bg-destructive text-destructive-foreground rounded-md font-heading w-full inline-flex items-center justify-center gap-2" data-testid="button-report-submit">
                    <Send className="w-4 h-4" /> Submit Report
                  </button>
                </form>
              )}
            </motion.div>

            {/* Suggestion Box */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary brutal-border rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-black">Suggestion Box</h3>
              </div>
              {suggestionSent ? (
                <div className="brutal-card p-6 rounded-lg text-center space-y-3">
                  <CheckCircle className="w-12 h-12 mx-auto text-primary" />
                  <p className="font-heading font-bold">Thanks for the idea!</p>
                  <p className="text-sm text-muted-foreground">We review all suggestions weekly.</p>
                  <button onClick={() => setSuggestionSent(false)} className="brutal-btn bg-primary text-primary-foreground rounded-md text-sm font-heading">
                    Drop Another Idea
                  </button>
                </div>
              ) : (
                <form className="brutal-card p-6 rounded-lg space-y-4" onSubmit={(e) => { e.preventDefault(); setSuggestionSent(true); }}>
                  <div>
                    <label className="font-heading font-bold text-sm mb-1 block">Category *</label>
                    <select required className="brutal-input w-full rounded-md bg-background" data-testid="select-suggestion-category">
                      <option value="">— What's your idea about? —</option>
                      <option>Book Request</option>
                      <option>New Feature / Website</option>
                      <option>Event / Program Idea</option>
                      <option>Improvement to Existing Service</option>
                      <option>Collection Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-heading font-bold text-sm mb-1 block">Your Idea *</label>
                    <textarea required rows={4} placeholder="Tell us your brilliant idea..." className="brutal-input w-full rounded-md resize-none" data-testid="textarea-suggestion" />
                  </div>
                  <button type="submit" className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading w-full inline-flex items-center justify-center gap-2" data-testid="button-suggestion-submit">
                    <Lightbulb className="w-4 h-4" /> Drop Your Idea
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. Social Media ──────────────────────────────── */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <motion.h3
            className="font-heading text-4xl font-black mb-10"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          >
            Follow Us
          </motion.h3>

          <div className="divide-y-2 divide-foreground border-2 border-foreground">
            {/* Row 1 — 3 cols */}
            <div className="grid grid-cols-3 divide-x-2 divide-foreground">
              {SOCIALS.slice(0, 3).map(({ label, icon: Icon, handle, href }) => (
                <ClipLinkBox key={label} Icon={Icon} label={label} handle={handle} href={href} />
              ))}
            </div>
            {/* Row 2 — 3 cols */}
            <div className="grid grid-cols-3 divide-x-2 divide-foreground">
              {SOCIALS.slice(3, 6).map(({ label, icon: Icon, handle, href }) => (
                <ClipLinkBox key={label} Icon={Icon} label={label} handle={handle} href={href} />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── 12. Newsletter Opt-in ─────────────────────────── */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="w-16 h-16 bg-foreground brutal-border rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-background" />
            </motion.div>
            <motion.h3 variants={fadeUp} className="font-heading text-4xl font-black mb-3 text-primary-foreground">
              Stay in the Loop
            </motion.h3>
            <motion.p variants={fadeUp} className="text-primary-foreground/80 mb-8 font-body">
              Get new arrivals, event announcements, and reading picks — straight to your inbox. No spam, ever.
            </motion.p>
            {newsletterSent ? (
              <motion.div
                className="brutal-card p-6 rounded-lg inline-flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="font-heading font-bold">You're subscribed!</span>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                onSubmit={(e) => { e.preventDefault(); setNewsletterSent(true); }}
              >
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="brutal-input flex-1 rounded-md"
                  data-testid="input-newsletter-email"
                />
                <button type="submit" className="brutal-btn bg-foreground text-background rounded-md font-heading flex-shrink-0" data-testid="button-newsletter-subscribe">
                  Subscribe
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ContactSection;
