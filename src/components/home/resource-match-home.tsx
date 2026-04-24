"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Menu,
  MessageCircleHeart,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  contactLinks,
  impactMetrics,
  onboardingCards,
  processSteps,
  testimonials,
} from "./home-data";
import { OpportunityBrowser } from "./opportunity-browser";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "Browse", href: "#browse" },
  { label: "Impact", href: "#impact" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <Badge variant="secondary">{badge}</Badge>
      <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
}

export function ResourceMatchHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-card focus:px-4 focus:py-3 focus:text-foreground"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="#home" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-foreground">ResourceMatch</p>
              <p className="text-sm text-muted-foreground">Volunteer and NGO portal</p>
            </div>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 lg:flex"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline">
              <Link href="/auth">Volunteer Login</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/auth">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link href="/auth">NGO Login</Link>
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen ? (
          <div
            id="mobile-navigation"
            className="border-t border-border/70 bg-background px-5 py-4 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-3">
                <Button asChild variant="secondary">
                  <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                    Volunteer Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                    NGO Login
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main-content" className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 pt-28 sm:px-8 lg:px-12">
        <section
          id="home"
          className="grid min-h-[calc(100vh-7rem)] items-center gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-6"
          >
            <Badge variant="secondary">Accessible volunteer portal</Badge>
            <div className="space-y-5">
              <h1 className="text-balance text-5xl font-black tracking-tight text-foreground sm:text-6xl">
                Find the right cause. Show up with clarity. Make a difference.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
                ResourceMatch helps volunteers discover trusted NGO opportunities fast,
                with concise mobile-first flows, clear filters, and guided onboarding for
                both individuals and organizations.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#browse">
                  Browse opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="#about">How it works</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "Short, mobile-first sign up",
                "Accessible filters with clear counts",
                "Separate volunteer and NGO paths",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-white/85 px-4 py-4 shadow-sm"
                >
                  <p className="text-sm font-medium text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-earth-glow p-6 shadow-soft"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.2))]" />
            <div className="relative space-y-5">
              <div
                role="img"
                aria-label="Illustration of volunteers coordinating supply kits, healthcare support, and community outreach across neighborhoods."
                className="overflow-hidden rounded-[1.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(209,96,61,0.18),rgba(63,81,181,0.12),rgba(107,142,35,0.18))] p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/88 p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                      Volunteers
                    </p>
                    <p className="mt-3 text-lg font-bold text-foreground">
                      Clear role cards, large touch targets, and quick apply actions.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/88 p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                      NGOs
                    </p>
                    <p className="mt-3 text-lg font-bold text-foreground">
                      Publish opportunities and reach the right volunteers without extra friction.
                    </p>
                  </div>
                  <div className="sm:col-span-2 rounded-2xl bg-white/88 p-5 shadow-sm">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl bg-muted/70 p-4">
                        <p className="text-sm text-muted-foreground">Discover</p>
                        <p className="mt-2 font-semibold text-foreground">Search by cause, city, or date</p>
                      </div>
                      <div className="rounded-xl bg-muted/70 p-4">
                        <p className="text-sm text-muted-foreground">Decide</p>
                        <p className="mt-2 font-semibold text-foreground">See role fit, time, and location</p>
                      </div>
                      <div className="rounded-xl bg-muted/70 p-4">
                        <p className="text-sm text-muted-foreground">Act</p>
                        <p className="mt-2 font-semibold text-foreground">Apply with confidence from any device</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="default">High contrast</Badge>
                <Badge variant="accent">Keyboard friendly</Badge>
                <Badge variant="warning">Mobile first</Badge>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="scroll-mt-28 py-16">
          <SectionHeading
            badge="How it works"
            title="A simple flow that respects volunteer time"
            description="Every section does one job well: explain the platform, surface relevant opportunities, build trust, and guide the next action without clutter."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <Card key={step.title} className="bg-white/90">
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/12 text-lg font-bold text-secondary">
                    {index + 1}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="browse" className="scroll-mt-28 py-16">
          <SectionHeading
            badge="Browse opportunities"
            title="Search and filter without losing your place"
            description="The browser stays focused on relevant filters only, shows counts for each option, and keeps the mobile experience compact with a collapsible filter panel."
          />

          <div className="mt-8">
            <OpportunityBrowser />
          </div>
        </section>

        <section id="impact" className="scroll-mt-28 py-16">
          <SectionHeading
            badge="Impact & trust"
            title="Trust signals that help people commit"
            description="A few strong numbers and real volunteer voices can do more than a wall of copy. This section is concise on purpose."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle className="text-3xl text-secondary-foreground">Community impact</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {impactMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/20 bg-white/10 p-4"
                  >
                    <p className="text-3xl font-black">{metric.value}</p>
                    <p className="mt-2 text-sm text-secondary-foreground/90">{metric.label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="bg-white/92">
                  <CardContent className="pt-6">
                    <MessageCircleHeart className="h-8 w-8 text-primary" aria-hidden="true" />
                    <p className="mt-4 text-lg text-foreground">{testimonial.quote}</p>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {testimonial.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <SectionHeading
            badge="Get started"
            title="Separate paths for volunteers and NGOs"
            description="Different audiences need different entry points, so the calls to action stay clear and role-specific."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {onboardingCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
              >
                <Card className="h-full bg-white/92">
                  <CardHeader className="space-y-4">
                    <Badge variant={index === 0 ? "secondary" : "accent"} className="w-fit">
                      {card.title}
                    </Badge>
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="text-muted-foreground">{card.description}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {card.fields.map((field) => (
                        <div
                          key={field}
                          className="rounded-xl border border-border bg-muted/55 px-4 py-3 text-sm font-medium text-foreground"
                        >
                          {field}
                        </div>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Multi-step flow with clear progress and mobile-friendly inputs
                    </div>
                    <Button asChild className="w-full sm:w-auto">
                      <Link href={card.href}>{card.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-16">
          <div className="grid gap-6 rounded-[2rem] border border-border bg-white/88 p-6 shadow-soft lg:grid-cols-[1fr_0.9fr] lg:p-8">
            <div className="space-y-4">
              <Badge variant="accent">Accessible by design</Badge>
              <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Built to be clear, inclusive, and easy to navigate
              </h2>
              <p className="text-lg text-muted-foreground">
                The interface uses high-contrast colors, visible focus states, semantic
                structure, large touch targets, and clear language so more people can
                participate comfortably.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Single-column mobile forms",
                  "Sticky navigation with anchor links",
                  "Keyboard-friendly controls",
                  "Descriptive labels and alt text",
                ].map((item) => (
                  <div key={item} className="rounded-xl bg-muted/55 px-4 py-4 text-sm font-medium text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-card">
              <CardHeader className="space-y-4">
                <Badge variant="warning" className="w-fit">
                  Contact
                </Badge>
                <CardTitle>Need help getting started?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactLinks.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-muted/45 px-4 py-4"
                  >
                    <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Verified NGOs and moderated volunteer listings
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="border-t border-border/70 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-xl font-bold text-foreground">ResourceMatch</p>
              <p className="text-sm text-muted-foreground">
                Connecting volunteers, NGOs, and donors through clear, accessible digital journeys.
              </p>
            </div>
            <nav aria-label="Footer links" className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link href="#home" className="hover:text-foreground">
                Home
              </Link>
              <Link href="#browse" className="hover:text-foreground">
                Browse
              </Link>
              <Link href="#about" className="hover:text-foreground">
                About
              </Link>
              <Link href="#contact" className="hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
