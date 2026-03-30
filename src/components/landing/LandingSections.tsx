import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Headphones, Tablet, Wifi, ArrowRight, Calendar,
  Clock, MapPin, Users, Smile, TrendingUp, CheckCircle, Rocket,
} from "lucide-react";
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from "@/components/animate-ui/components/radix/preview-link-card";
import DomeGallery from "@/components/DomeGallery";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ─────────────────────────────────────────────────────────────
   1. PARTNERS & SPONSORS
───────────────────────────────────────────────────────────── */
const TRUST_STATS = [
  { label: "Active Members", value: "20,000+", icon: Users, color: "bg-primary", textColor: "text-primary-foreground" },
  { label: "Customer Satisfaction", value: "99%", icon: Smile, color: "bg-secondary", textColor: "text-secondary-foreground" },
  { label: "Performance Increase", value: "+40%", icon: TrendingUp, color: "bg-accent", textColor: "text-accent-foreground" },
  { label: "Faster Access", value: "5x", icon: Rocket, color: "bg-success", textColor: "text-success-foreground" },
];

const PARTNERS = [
  { name: "City Council", abbr: "CC", color: "bg-primary" },
  { name: "Edu Foundation", abbr: "EF", color: "bg-secondary" },
  { name: "Open Books Fund", abbr: "OBF", color: "bg-accent" },
  { name: "Literate Future", abbr: "LF", color: "bg-success" },
  { name: "PageTurn Media", abbr: "PTM", color: "bg-primary" },
  { name: "ReadRight NGO", abbr: "RR", color: "bg-secondary" },
];

export const PartnersSection = () => (
  <section className="py-24 px-6 bg-muted/40 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 pointer-events-none opacity-20"
      style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #000 1px, transparent 0)", backgroundSize: "32px 32px" }}
    />

    <div className="container mx-auto relative z-10">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-6xl font-black mb-4">
          Trusted by thousands of <br className="hidden md:block" /> library teams worldwide
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
          Our platform helps libraries deliver better reading experiences faster with data-driven insights and powerful collection management tools.
        </motion.p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        {TRUST_STATS.map(({ label, value, icon: Icon, color, textColor }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="brutal-card p-8 rounded-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform cursor-default"
          >
            <div className={`${color} ${textColor} w-16 h-16 brutal-border rounded-full flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              <Icon className="w-8 h-8" />
            </div>
            <div className="font-heading text-4xl font-black mb-2">{value}</div>
            <p className="font-body text-sm font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Industry Leaders Block */}
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="brutal-card bg-background rounded-2xl overflow-hidden p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-shadow"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <h3 className="font-heading text-4xl font-black leading-tight">
              Trusted by <span className="text-primary italic underline underline-offset-4">industry leaders</span>
            </h3>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Join thousands of innovative institutions that are transforming their library services and community engagement with our platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="brutal-btn bg-primary text-primary-foreground rounded-lg font-heading inline-flex items-center gap-2">
                See success stories <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right: Partner Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {PARTNERS.map(({ name, abbr, color }) => (
              <div
                key={name}
                className="brutal-card p-4 rounded-lg flex flex-col items-center justify-center gap-2 bg-muted/20 group hover:bg-muted/50 transition-colors"
              >
                <div className={`${color} w-12 h-12 brutal-border rounded flex items-center justify-center font-heading font-black text-sm group-hover:scale-110 transition-transform`}>
                  {abbr}
                </div>
                <span className="font-heading font-black text-[10px] uppercase text-center opacity-70">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   2. GENRE EXPLORER GRID
───────────────────────────────────────────────────────────── */
const GENRES = [
  { name: "Fiction", count: "2,340 books", color: "bg-primary", textColor: "text-primary-foreground", rotate: -2, imageUrl: "https://i.pinimg.com/736x/f6/df/43/f6df43c1f2d7376cdeedcf4603be46c5.jpg" },
  { name: "Sci-Fi", count: "1,120 books", color: "bg-secondary", textColor: "text-secondary-foreground", rotate: 1, imageUrl: "https://i.pinimg.com/736x/ef/46/7f/ef467f446262375f139b75e63e6daaf9.jpg" },
  { name: "History", count: "980 books", color: "bg-accent", textColor: "text-accent-foreground", rotate: -1, imageUrl: "https://i.pinimg.com/1200x/58/01/1a/58011a854c28215a4c8d25ade6e0aa9a.jpg" },
  { name: "Mystery", count: "870 books", color: "bg-success", textColor: "text-success-foreground", rotate: 2, imageUrl: "https://i.pinimg.com/736x/56/22/b2/5622b21c74eef9e94a3c44de6eed78d7.jpg" },
  { name: "Romance", count: "1,450 books", color: "bg-primary", textColor: "text-primary-foreground", rotate: 1, imageUrl: "https://i.pinimg.com/736x/f9/78/a9/f978a9e4cd1d0be424bdf37e5725ded8.jpg" },
  { name: "Biography", count: "640 books", color: "bg-foreground", textColor: "text-background", rotate: -2, imageUrl: "https://i.pinimg.com/736x/e1/6e/1f/e16e1f8e6dcf99651a45612faf922c8f.jpg" },
  { name: "Children's", count: "760 books", color: "bg-secondary", textColor: "text-secondary-foreground", rotate: 1, imageUrl: "https://i.pinimg.com/1200x/e6/f1/8d/e6f18df315395d3d8635b950cfd9aa0f.jpg" },
  { name: "Self-Help", count: "530 books", color: "bg-accent", textColor: "text-accent-foreground", rotate: -1, imageUrl: "https://i.pinimg.com/1200x/31/64/b4/3164b4a90268d2f65147219e5650bbc6.jpg" },
  { name: "Fantasy", count: "1,200 books", color: "bg-success", textColor: "text-success-foreground", rotate: 2, imageUrl: "https://i.pinimg.com/736x/6c/d0/c6/6cd0c6f8669d70bcce1604e9216a3ee3.jpg" },
  { name: "Thriller", count: "890 books", color: "bg-primary", textColor: "text-primary-foreground", rotate: -1, imageUrl: "https://i.pinimg.com/736x/de/1a/5c/de1a5cb626115ca2950583b8f324ea71.jpg" },
  { name: "Poetry", count: "310 books", color: "bg-secondary", textColor: "text-secondary-foreground", rotate: 1, imageUrl: "https://i.pinimg.com/736x/2b/1d/ca/2b1dca2b4b4c1192201d1d23445bc861.jpg" },
  { name: "Technology", count: "720 books", color: "bg-foreground", textColor: "text-background", rotate: -2, imageUrl: "https://i.pinimg.com/736x/1d/ff/81/1dff8198d3e2749c9907ab44060800bc.jpg" },
];

export const GenreExplorerSection = () => (
  <section className="py-20 px-6">
    <div className="container mx-auto">
      <motion.div
        className="text-center mb-12"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        <motion.p variants={fadeUp} className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Browse by Genre
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-black">
          Genre Explorer
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
          Dive into any world you want. Pick a genre and start exploring thousands of titles.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        {GENRES.map(({ name, count, color, textColor, rotate, imageUrl }) => (
          <motion.div key={name} variants={fadeUp} style={{ rotate: `${rotate}deg` }}>
            <PreviewLinkCard href="/dashboard/books" followCursor="x" className="block">
              <PreviewLinkCardTrigger className="block">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
                  className={`${color} ${textColor} brutal-border rounded-lg p-4 md:p-6 cursor-pointer relative group h-full`}
                >
                  <h3 className="font-heading text-xl md:text-2xl font-black leading-tight mb-1 break-words hyphens-auto">{name}</h3>
                  <p className="font-body text-xs md:text-sm opacity-80">{count}</p>
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </PreviewLinkCardTrigger>

              <PreviewLinkCardContent side="top" sideOffset={14} align="center">
                <PreviewLinkCardImage src={imageUrl} alt={name} />
                <div className="p-3 border-t-2 border-border">
                  <p className="font-heading font-black text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground font-body">{count} available</p>
                </div>
              </PreviewLinkCardContent>
            </PreviewLinkCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-10"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
      >
        <Link to="/dashboard/books" className="brutal-btn bg-foreground text-background rounded-md font-heading inline-flex items-center gap-2">
          Browse All Genres <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   3. NEW ARRIVALS
───────────────────────────────────────────────────────────── */
export const NewArrivalsSection = () => (
  <section className="relative flex flex-col" style={{ background: '#060010' }}>
    {/* Header overlay */}
    <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-10 pb-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <p className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-white/50 mb-2">
            Fresh Off the Shelf
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white">
            New Arrivals
          </h2>
        </div>
      </div>
    </div>

    {/* DomeGallery */}
    <div style={{ width: '100%', height: '100vh' }}>
      <DomeGallery
        fit={0.8}
        minRadius={600}
        maxVerticalRotationDeg={0}
        segments={34}
        dragDampening={2}
        grayscale
        overlayBlurColor="#060010"
        imageBorderRadius="16px"
        openedImageBorderRadius="20px"
        openedImageWidth="450px"
        openedImageHeight="450px"
      />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   4. LIBRARY EVENTS & PROGRAMS
───────────────────────────────────────────────────────────── */
const EVENTS = [
  {
    title: "Mystery Book Club",
    date: "Apr 5, 2026",
    time: "6:00 PM – 8:00 PM",
    location: "Reading Room A",
    seats: 12,
    tag: "Book Club",
    tagColor: "bg-primary",
    desc: "This month we explore Agatha Christie's overlooked masterpiece. All genres welcome!",
  },
  {
    title: "Author Talk: Nadia Cross",
    date: "Apr 10, 2026",
    time: "5:30 PM – 7:00 PM",
    location: "Main Hall",
    seats: 80,
    tag: "Author Talk",
    tagColor: "bg-secondary",
    desc: "Bestselling Sci-Fi author Nadia Cross discusses her new novel and answers your questions.",
  },
  {
    title: "Kids' Reading Hour",
    date: "Apr 12, 2026",
    time: "10:00 AM – 11:00 AM",
    location: "Children's Corner",
    seats: 30,
    tag: "Children's",
    tagColor: "bg-accent",
    desc: "A fun-filled morning of stories, illustrations, and interactive reading for ages 4–10.",
  },
  {
    title: "Creative Writing Workshop",
    date: "Apr 18, 2026",
    time: "2:00 PM – 5:00 PM",
    location: "Study Room 3",
    seats: 16,
    tag: "Workshop",
    tagColor: "bg-success",
    desc: "Guided exercises on character building, world-making, and narrative structure.",
  },
  {
    title: "Poetry Open Mic Night",
    date: "Apr 22, 2026",
    time: "7:00 PM – 9:00 PM",
    location: "Courtyard",
    seats: 50,
    tag: "Open Mic",
    tagColor: "bg-primary",
    desc: "Take the mic or just listen — all styles, all voices, all levels welcome.",
  },
  {
    title: "Digital Literacy for Seniors",
    date: "Apr 26, 2026",
    time: "10:00 AM – 12:00 PM",
    location: "Computer Lab",
    seats: 20,
    tag: "Workshop",
    tagColor: "bg-secondary",
    desc: "Hands-on help with smartphones, e-readers, and library digital resources.",
  },
];

export const EventsSection = () => (
  <section className="py-20 px-6 bg-[#ff3333] text-white" style={{ borderTop: "4px solid hsl(var(--foreground))", borderBottom: "4px solid hsl(var(--foreground))" }}>
    <div className="container mx-auto">
      <motion.div
        className="text-center mb-12"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        <motion.p variants={fadeUp} className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-white/80 mb-3">
          What's On
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-black">
          Events &amp; Programs
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/80 font-body mt-3 max-w-lg mx-auto">
          Book clubs, author talks, kids' reading hour and more — there's always something happening at LibraVault.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
      >
        {EVENTS.map(({ title, date, time, location, seats, tag, tagColor, desc }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="brutal-card rounded-lg p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-transform text-foreground"
          >
            <div className="flex items-start justify-between gap-2">
              <span className={`${tagColor} text-foreground font-heading font-black text-xs px-2 py-1 rounded brutal-border`}>
                {tag}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-heading font-semibold">
                <Users className="w-3.5 h-3.5" /> {seats} seats
              </div>
            </div>

            <div>
              <h3 className="font-heading font-black text-xl leading-tight mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground font-body">{desc}</p>
            </div>

            <div className="space-y-1.5 mt-auto pt-2 border-t-2 border-border">
              <div className="flex items-center gap-2 text-sm font-heading font-semibold">
                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" /> {date}
              </div>
              <div className="flex items-center gap-2 text-sm font-heading font-semibold">
                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" /> {time}
              </div>
              <div className="flex items-center gap-2 text-sm font-heading font-semibold">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" /> {location}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-10"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
      >
        <Link to="/dashboard" className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading inline-flex items-center gap-2">
          View All Events <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  </section>
);

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Link as RouterLink } from "react-router-dom";


const DIGITAL_FEATURES = [
  {
    icon: BookOpen,
    title: "10,000+ E-Books",
    desc: "Access a massive digital catalog spanning every genre imaginable.",
    color: "bg-primary",
  },
  {
    icon: Headphones,
    title: "Audiobooks",
    desc: "Listen on the go with our premium audiobook collection.",
    color: "bg-secondary",
  },
  {
    icon: Tablet,
    title: "Any Device",
    desc: "Read seamlessly on your phone, tablet, or laptop.",
    color: "bg-accent",
  },
  {
    icon: Wifi,
    title: "Offline Mode",
    desc: "Download and read anywhere — no internet required.",
    color: "bg-success",
  },
];

const PeerlistBadge = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      ></path>
    </svg>
  );
};

export const DigitalLibrarySection = () => {
  return (
    <section className="bg-white dark:bg-[#0B0B0F] text-foreground relative w-full overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 40px,#e5e7eb 40px,#e5e7eb 42px),repeating-linear-gradient(90deg,transparent,transparent 40px,#e5e7eb 40px,#e5e7eb 42px)" }}
      />
      
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-start relative z-10">

        {/* ── LEFT: Sticky Content Area ── */}
        <div className="w-full lg:w-5/12 pt-24 pb-10 lg:pb-24 lg:sticky lg:top-20 z-10 flex flex-col h-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="pr-0 lg:pr-8"
          >
            <motion.p
              variants={fadeUp}
              className="font-heading font-bold text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3"
            >
              Go Digital
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl xl:text-5xl font-black mb-6 text-foreground"
            >
              Your Entire Library, <br />
              <span className="text-secondary">In Your Pocket.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-body text-lg mb-10 leading-relaxed"
            >
              Access thousands of e-books and audiobooks from anywhere, anytime.
              LibraVault's digital platform brings the library experience to
              every screen — no late fees, no limits.
            </motion.p>

            {/* Feature grid */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left"
            >
              {DIGITAL_FEATURES.map(({ icon: Icon, title, desc, color }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="brutal-card rounded-lg p-5 flex flex-col gap-3 group hover:-translate-y-1 transition-transform"
                >
                  <div
                    className={`${color} w-10 h-10 rounded-lg brutal-border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white dark:text-black" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-sm mb-1">
                      {title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Extra Content */}
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground font-body text-sm mb-8 leading-relaxed border-l-4 border-primary pl-4"
            >
              Join thousands of readers who have already made the switch. With seamless syncing across all platforms, your reading progress, bookmarks, and highlights are always exactly where you left them.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="flex gap-8 mb-10 flex-wrap"
            >
              {[
                { value: "10K+", label: "E-Books" },
                { value: "5K+", label: "Audiobooks" },
                { value: "24/7", label: "Access" },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="font-heading text-3xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-6">
              <RouterLink
                to="/dashboard/books"
                className="brutal-btn bg-primary text-primary-foreground rounded-md text-lg font-heading inline-flex items-center gap-2"
              >
                Explore Digital Library <ArrowRight className="w-5 h-5" />
              </RouterLink>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT: Scrolling MacBook Animation ── */}
        <div className="w-full lg:w-7/12 flex justify-center lg:justify-end pb-24 lg:pb-0 pt-8 lg:pt-64">
          <div className="w-full flex justify-center origin-top xl:scale-100 lg:scale-[0.8] md:scale-90 scale-100 sm:scale-100">
            <MacbookScroll
              title={<span className="hidden"></span>}
              badge={
                <a href="https://peerlist.io/manuarora" target="_blank" rel="noopener noreferrer">
                  <PeerlistBadge className="h-10 w-10 -rotate-12 transform" />
                </a>
              }
              src="/library-dashboard.jpg"
              showGradient={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
