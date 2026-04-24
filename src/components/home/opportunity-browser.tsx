"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Filter, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { analyticsAttributes, trackEvent } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { opportunities, type Opportunity } from "./home-data";

type CategoryFilter = Opportunity["category"] | "All";
type ModeFilter = Opportunity["mode"] | "All";
type CommitmentFilter = Opportunity["commitment"] | "All";

const categoryOptions: CategoryFilter[] = [
  "All",
  "Health",
  "Education",
  "Relief",
  "Logistics",
  "Community",
];

const modeOptions: ModeFilter[] = ["All", "On-site", "Hybrid"];
const commitmentOptions: CommitmentFilter[] = [
  "All",
  "One day",
  "Weekend",
  "Flexible",
  "Ongoing",
];

function filterCount<T extends string>(
  items: Opportunity[],
  getValue: (item: Opportunity) => T,
  value: T | "All",
) {
  if (value === "All") {
    return items.length;
  }

  return items.filter((item) => getValue(item) === value).length;
}

function FilterGroup<T extends string>({
  title,
  options,
  selected,
  onSelect,
  countFor,
}: {
  title: string;
  options: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
  countFor: (value: T) => number;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === selected;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                active
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground hover:border-accent/50 hover:bg-accent/5",
              )}
            >
              <span>{option}</span>
              <span className="rounded-full bg-card px-2 py-0.5 text-xs text-muted-foreground">
                {countFor(option)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OpportunityBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [mode, setMode] = useState<ModeFilter>("All");
  const [commitment, setCommitment] = useState<CommitmentFilter>("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    return opportunities.filter((item) => {
      const matchesQuery =
        !normalized ||
        [item.title, item.ngo, item.location, item.summary, item.category]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesCategory = category === "All" || item.category === category;
      const matchesMode = mode === "All" || item.mode === mode;
      const matchesCommitment =
        commitment === "All" || item.commitment === commitment;

      return matchesQuery && matchesCategory && matchesMode && matchesCommitment;
    });
  }, [category, commitment, deferredQuery, mode]);

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setMode("All");
    setCommitment("All");
  }

  const filters = (
    <div className="space-y-5 rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <label
          htmlFor="opportunity-search"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Search opportunities
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="opportunity-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-11"
            placeholder="Search by cause, NGO, or location"
          />
        </div>
      </div>

      <FilterGroup
        title="Cause"
        options={categoryOptions}
        selected={category}
        onSelect={setCategory}
        countFor={(value) => filterCount(opportunities, (item) => item.category, value)}
      />
      <FilterGroup
        title="Mode"
        options={modeOptions}
        selected={mode}
        onSelect={setMode}
        countFor={(value) => filterCount(opportunities, (item) => item.mode, value)}
      />
      <FilterGroup
        title="Commitment"
        options={commitmentOptions}
        selected={commitment}
        onSelect={setCommitment}
        countFor={(value) => filterCount(opportunities, (item) => item.commitment, value)}
      />

      <Button type="button" variant="outline" onClick={clearFilters} className="w-full">
        Clear filters
      </Button>
    </div>
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <div className="hidden xl:block">{filters}</div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 rounded-[24px] border border-border bg-card/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Results
            </p>
            <p className="text-lg font-semibold text-foreground">
              {filtered.length} opportunities available
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              className="xl:hidden"
              onClick={() => setMobileFiltersOpen((open) => !open)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
            {(query || category !== "All" || mode !== "All" || commitment !== "All") && (
              <Button type="button" variant="ghost" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Reset all
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileFiltersOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden"
            >
              {filters}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="grid gap-4">
          {filtered.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{opportunity.category}</Badge>
                    <Badge variant="accent">{opportunity.commitment}</Badge>
                    <Badge variant="info">{opportunity.mode}</Badge>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{opportunity.title}</CardTitle>
                    <p className="text-base text-muted-foreground">{opportunity.ngo}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">{opportunity.date}</p>
                  <p>{opportunity.spots} spots open</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    {opportunity.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Filter className="h-4 w-4 text-secondary" />
                    {opportunity.commitment}
                  </span>
                </div>
                <p className="max-w-3xl text-base text-foreground/90">
                  {opportunity.summary}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    onClick={() =>
                      trackEvent({
                        event: "opportunity_apply_clicked",
                        category: "volunteer",
                        label: opportunity.title,
                        destination: "/auth",
                      })
                    }
                    {...analyticsAttributes({
                      event: "opportunity_apply_clicked",
                      category: "volunteer",
                      label: opportunity.title,
                      destination: "/auth",
                    })}
                  >
                    <a href="/auth">Apply now</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    onClick={() =>
                      trackEvent({
                        event: "opportunity_learn_more_clicked",
                        category: "volunteer",
                        label: opportunity.title,
                        destination: "/volunteer",
                      })
                    }
                    {...analyticsAttributes({
                      event: "opportunity_learn_more_clicked",
                      category: "volunteer",
                      label: opportunity.title,
                      destination: "/volunteer",
                    })}
                  >
                    <a href="/volunteer">Preview volunteer flow</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
