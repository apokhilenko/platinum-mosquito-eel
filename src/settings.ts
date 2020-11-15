export const settings = {
  dateFormat: "YYYY-MM-DD",
  maxRangeInMonths: 3,
  initialDateFrom: "2020-10-04",
  initialDateTo: "2020-11-04",
  account: 1,
  timezone: 60,
  repositories: [
    "github.com/athenianco/athenian-api",
    "github.com/athenianco/athenian-webapp",
    "github.com/athenianco/infrastructure",
    "github.com/athenianco/metadata",
  ],
  metrics: ["pr-review-time", "pr-opened"],
  granularity: "day",
};
