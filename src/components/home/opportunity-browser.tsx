"use client";

import { useDeferredValue, useState } from "react";
import { Filter, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { opportunities, type Opportunity } from "./home-data";

type Filters = {
  category: string;
  location: string;
  schedule: string;
};

const allValue = "All";

const matchesFilters = (
  opportunity: Opportunity,
  searchTerm: string,
  filters: Filters,
  ignoreKey?: keyof Filters,
) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchesSearch =
    normalizedSearch.length === 0 ||
    [opportunity.title, opportunity.ngo, opportunity.summary, opportunity.location]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);

  const matchesCategory =
    ignoreKey === "category" ||
    filters.category === allValue ||
    opportunity.category === filters.category;
  const matchesLocation =
    ignoreKey === "location" ||
    filters.location === allValue ||
    opportunity.location === filters.location;
  const matchesSchedule =
    ignoreKey === "schedule" ||
    filters.schedule === allValue ||
    opportunity.schedule === filters.schedule;

  return matchesSearch && matchesCategory && matchesLocation && matchesSchedule;
};

export function OpportunityBrowser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    category: allValue,
    location: allValue,
    schedule: allValue,
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const deferredSearchTerm = useDeferredValue(searchTerm);
  const categories = Array.from(new Set(opportunities.map((item) => item.category)));
  const locations = Array.from(new Set(opportunities.map((item) => item.location)));
  const schedules = Array.from(new Set(opportunities.map((item) => item.schedule)));

  const filteredOpportunities = opportunities.filter((opportunity) =>
    matchesFilters(opportunity, deferredSearchTerm, filters),
  );

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    filters.category !== allValue ||
    filters.location !== allValue ||
    filters.schedule !== allValue;

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      category: allValue,
      location: allValue,
      schedule: allValue,
    });
  };

  const renderOptionLabel = (
    option: string,
    filterKey: keyof Filters,
    optionsFilters: Filters,
  ) => {
    const count = opportunities.filter((opportunity) => {
      if (option === allValue) {
        return matchesFilters(opportunity, deferredSearchTerm, optionsFilters, filterKey);
      }

      return (
        matchesFilters(opportunity, deferredSearchTerm, optionsFilters, filterKey) &&
        opportunity[filterKey] === option
      );
    }).length;

    return `${option} (${count})`;
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="lg:hidden">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between"
          aria-expanded={filtersOpen}
          aria-controls="opportunity-filters"
          onClick={() => setFiltersOpen((current) => !current)}
        >
          <span className="inline-flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </span>
          <span className="text-sm text-muted-foreground">
            {filteredOpportunities.length} results
          </span>
        </Button>
      </div>

      <aside
        id="opportunity-filters"
        className={cn(
          "space-y-4 lg:block",
          filtersOpen ? "block" : "hidden",
        )}
      >
        <Card className="bg-white/90">
          <CardHeader className="space-y-3">
            <Badge variant="secondary" className="w-fit">
              Search & filter
            </Badge>
            <CardTitle className="text-2xl">Find a role that fits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="opportunity-search" className="text-sm font-medium text-foreground">
                Search opportunities
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="opportunity-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Cause, NGO, or city"
                  className="pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="category-filter" className="text-sm font-medium text-foreground">
                Cause
              </label>
              <select
                id="category-filter"
                value={filters.category}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, category: event.target.value }))
                }
                className="flex h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground shadow-sm transition-all duration-200 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {[allValue, ...categories].map((category) => (
                  <option key={category} value={category}>
                    {renderOptionLabel(category, "category", filters)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="location-filter" className="text-sm font-medium text-foreground">
                Location
              </label>
              <select
                id="location-filter"
                value={filters.location}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, location: event.target.value }))
                }
                className="flex h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground shadow-sm transition-all duration-200 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {[allValue, ...locations].map((location) => (
                  <option key={location} value={location}>
                    {renderOptionLabel(location, "location", filters)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="schedule-filter" className="text-sm font-medium text-foreground">
                Availability
              </label>
              <select
                id="schedule-filter"
                value={filters.schedule}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, schedule: event.target.value }))
                }
                className="flex h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground shadow-sm transition-all duration-200 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {[allValue, ...schedules].map((schedule) => (
                  <option key={schedule} value={schedule}>
                    {renderOptionLabel(schedule, "schedule", filters)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <p className="rounded-lg bg-muted/45 px-4 py-3 text-sm text-muted-foreground">
                Results update instantly as you type or change a filter.
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
              >
                Clear filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white/85 px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Opportunity browser</p>
            <h3 className="text-2xl font-bold text-foreground">
              {filteredOpportunities.length} opportunities ready to explore
            </h3>
          </div>
          {hasActiveFilters ? (
            <div className="flex flex-wrap gap-2">
              {searchTerm.trim().length > 0 ? (
                <Badge variant="accent">Search: {searchTerm.trim()}</Badge>
              ) : null}
              {filters.category !== allValue ? (
                <Badge variant="secondary">{filters.category}</Badge>
              ) : null}
              {filters.location !== allValue ? (
                <Badge variant="default">{filters.location}</Badge>
              ) : null}
              {filters.schedule !== allValue ? (
                <Badge variant="warning">{filters.schedule}</Badge>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Start with a keyword or choose a few filters.
            </p>
          )}
        </div>

        {filteredOpportunities.length === 0 ? (
          <Card className="bg-white/92">
            <CardContent className="flex flex-col items-start gap-4 pt-6">
              <Badge variant="warning">No exact match</Badge>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-foreground">
                  Try clearing a filter or broadening your search
                </h4>
                <p className="max-w-2xl text-muted-foreground">
                  We kept your place in the results so you can adjust one filter at a time
                  without losing context.
                </p>
              </div>
              <Button type="button" variant="outline" onClick={clearFilters}>
                Reset all filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="bg-white/92">
                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{opportunity.category}</Badge>
                    <Badge variant="accent">{opportunity.mode}</Badge>
                  </div>
                  <div className="space-y-2">
                    <CardTitle>{opportunity.title}</CardTitle>
                    <p className="text-base text-muted-foreground">{opportunity.summary}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/55 p-3">
                      <p className="font-medium text-foreground">{opportunity.ngo}</p>
                      <p>Partner NGO</p>
                    </div>
                    <div className="rounded-lg bg-muted/55 p-3">
                      <p className="font-medium text-foreground">{opportunity.commitment}</p>
                      <p>Time needed</p>
                    </div>
                    <div className="rounded-lg bg-muted/55 p-3">
                      <p className="font-medium text-foreground">{opportunity.dateLabel}</p>
                      <p>Start date</p>
                    </div>
                    <div className="rounded-lg bg-muted/55 p-3">
                      <p className="font-medium text-foreground">{opportunity.schedule}</p>
                      <p>Availability</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      {opportunity.location}
                    </div>
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/auth">Apply</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
