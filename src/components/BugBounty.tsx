import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import {
  ShieldAlert,
  ShieldCheck,
  Mail,
  ExternalLink,
  Linkedin,
  Copy,
  Check,
  AlertTriangle,
  FileCheck,
  Users,
} from 'lucide-react';
import { bountyResearchers, BountyResearcher } from '../data/siteData';
import { CardSpotlight } from './ui/CardSpotlight';

const tierBadgeStyles: Record<BountyResearcher['rewardTier'], { bg: string; text: string; border: string }> = {
  'Hall of Fame': {
    bg: 'bg-emerald-950/80',
    text: 'text-emerald-400',
    border: 'border-emerald-800/50',
  },
  Critical: {
    bg: 'bg-rose-950/80',
    text: 'text-rose-400',
    border: 'border-rose-800/50',
  },
  High: {
    bg: 'bg-amber-950/80',
    text: 'text-amber-400',
    border: 'border-amber-800/50',
  },
  Medium: {
    bg: 'bg-cyan-950/80',
    text: 'text-cyan-400',
    border: 'border-cyan-800/50',
  },
};

export const BugBounty: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <section id="bug-bounty" className="relative py-28 bg-slate-950 overflow-hidden border-t border-white/[0.08]">
      {/* Background Radial Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[240px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-12">
          <Parallax speed={-2}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <ShieldCheck size={13} />
              <span>Vulnerability Disclosure & Hall of Fame</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Security <span className="text-gradient-cyan">Hall of Fame</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-slate-400 text-base font-normal leading-relaxed"
            >
              Recognizing ethical security researchers who contribute to safeguarding the PotenFYR Studios ecosystem through responsible disclosure and collaborative vulnerability reporting.
            </motion.p>
          </Parallax>
        </div>

        {/* STRICT POLICY DISCLAIMER BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-14 rounded-2xl border-2 border-amber-500/40 bg-amber-950/20 backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
        >
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle size={22} />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                  Strict Program Policy Notice
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">• Read Before Submitting</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                No Monetary Rewards &mdash; Recognition Only
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                PotenFYR Studios does <strong className="text-amber-300 font-semibold">NOT</strong> and will <strong className="text-amber-300 font-semibold">NEVER</strong> provide monetary rewards, bounties, cash payouts, or financial compensation of any kind. We provide <span className="text-white font-semibold underline decoration-cyan-400 underline-offset-4">public Hall of Fame recognition and attribution ONLY</span>, granted strictly when a finding is independently verified and deemed worthy by our engineering and security team.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Spotlight Banner */}
        <div className="flex items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users size={20} className="text-cyan-400" />
            <span>Independent Security Research Team</span>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
            VERIFIED RESEARCHERS
          </span>
        </div>

        {/* Researchers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {bountyResearchers.map((researcher, idx) => {
            const tierStyle = tierBadgeStyles[researcher.rewardTier] || tierBadgeStyles['Hall of Fame'];

            return (
              <motion.div
                key={researcher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="h-full"
              >
                <CardSpotlight className="h-full p-6 sm:p-7 flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300">
                  <div>
                    {/* Card Header: Avatar, Name, Handle, and Severity Badge */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black text-xl shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                          {researcher.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                            <span>{researcher.name}</span>
                          </h3>
                          <div className="text-xs font-mono text-cyan-400/90 mt-0.5">
                            {researcher.teamRole || 'Independent Security Researcher'}
                          </div>
                          {researcher.age && (
                            <div className="mt-1 inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-900 border border-white/10 text-slate-300 rounded-full">
                              Age: {researcher.age}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tier Badge */}
                      <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}>
                        {researcher.rewardTier}
                      </span>
                    </div>

                    {/* Email Contact with Copy Button */}
                    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 mb-5">
                      <div className="flex items-center gap-2 truncate">
                        <Mail size={14} className="text-cyan-400 shrink-0" />
                        <a href={`mailto:${researcher.email}`} className="hover:text-cyan-300 transition-colors truncate">
                          {researcher.email}
                        </a>
                      </div>
                      <button
                        onClick={() => copyEmail(researcher.email)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Copy email address"
                        aria-label="Copy email"
                      >
                        {copiedEmail === researcher.email ? (
                          <Check size={14} className="text-emerald-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    {/* Key Contribution / Finding Highlight */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <FileCheck size={13} className="text-cyan-400" />
                        <span>Research & Contribution:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                        "{researcher.highlight}"
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Verified LinkedIn & Socials */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs font-mono text-slate-500">
                      Inducted: <span className="text-slate-300 font-semibold">{researcher.awardedDate}</span>
                    </div>

                    {researcher.socials.linkedin && (
                      <a
                        href={researcher.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/35 border border-[#0A66C2]/40 text-[#70b5f9] hover:text-white text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        <Linkedin size={13} className="text-[#0A66C2]" />
                        <span>LinkedIn Profile</span>
                        <ExternalLink size={11} className="opacity-70" />
                      </a>
                    )}
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>

        {/* Responsible Disclosure Guidelines & Submission */}
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90 p-8 sm:p-10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2.5 text-center md:text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <ShieldAlert className="text-cyan-400" />
              <span>Submit a Vulnerability Report</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Discovered an issue in AuthCore, Statfyr, APICordon, universal container eggs, or our platforms? Email our security desk with a reproducible PoC. Valid and worthy findings will be inducted into the Hall of Fame.
            </p>
            <p className="text-xs font-mono text-amber-400/90">
              * Reminder: Non-monetary program. Recognition awarded when deemed worthy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="mailto:security@potenfyr.in?subject=Vulnerability%20Report%20-%20PotenFYR%20Studios&body=Note:%20This%20is%20a%20non-monetary%20recognition-only%20program.%0A%0AComponent%20Affected:%0ASeverity:%0ASteps%20to%20Reproduce:%0AProof%20of%20Concept%20(PoC):%0AResearcher%20Name%20%26%20Public%20Profile%20(LinkedIn/GitHub):"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              <Mail size={16} />
              <span>Report to security@potenfyr.in</span>
            </a>
            <a
              href="https://discord.gg/PRJASTKqwD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 font-semibold text-sm transition-all duration-300"
            >
              <ExternalLink size={15} className="text-slate-400" />
              <span>Security Discord</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
