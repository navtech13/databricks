const filtersData = {
  "industry": {
    type: "checkboxes",
    label: "Industry",
    field: "field_industry",
    options: [
      // { type: "option", value: "advertising_martech", label: "Advertising and Marketing Technology" },
      // { type: "option", value: "communication_service_providers", label: "Communication and Service Providers" },
      // { type: "option", value: "education", label: "Education" },
      // { type: "option", value: "energy_utilities", label: "Energy and Utilities" },
      { type: "option", value: "Financial Services", label: "Financial Services" },
      // { type: "option", value: "gaming", label: "Gaming" },
      // { type: "option", value: "federal_gov", label: "Government (Federal)" },
      // { type: "option", value: "local_gov", label: "Government (State and Local)" },
      // { type: "option", value: "healthcare", label: "Healthcare" },
      {
        type: "option",
        value: "Healthcare and Life Sciences",
        label: "Health and Life Sciences",
      },
      // { type: "option", value: "life_sciences", label: "Life Sciences" },
      { type: "option", value: "Manufacturing", label: "Manufacturing" },
      {
        type: "option",
        value: "Media and Entertainment",
        label: "Communications, Media & Entertainment",
      },
      { type: "option", value: "Retail and Consumer Goods", label: "Retail & Consumer Goods" },
      { type: "option", value: "Technology and Software", label: "Technology and Software" },
      { type: "option", value: "Public Sector", label: "Public Sector" },
    ],
  },
  "developer": {
    type: "checkboxes",
    label: "Developer",
    field: "field_developer",
    options: [
      { type: "option", value: "databricks", label: "Databricks" },
      { type: "option", value: "splunk", label: "Splunk" },
    ],
  },
  "sort" : {
    name: "sort",
    type: "single_sort",
    label: "Sort",
    field: "field_sort",
    options: [
      { type: "option", value: "alphabetical", label: "A-Z" },
      { type: "option", value: "newest", label: "Newest first" },
      { type: "option", value: "popular", label: "Most popular" },
    ],
  },
}

export default filtersData
