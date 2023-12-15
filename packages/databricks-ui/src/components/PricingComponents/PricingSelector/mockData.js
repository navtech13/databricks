const regionData = {
  title: "Select region",
  select: "Select",
  options: {
    AWS: [
      { label: "US East (N. Virginia)", value: "US East (N. Virginia)" },
      { label: "US East (Ohio)", value: "US East (Ohio)" },
      { label: "US West (Oregon)", value: "US West (Oregon)" },
      { label: "US West (California)", value: "US West (California)" },
      { label: "Canada", value: "Canada" },
      { label: "SA (Brazil)", value: "SA (Brazil)" },
      { label: "Europe (Ireland)", value: "Europe (Ireland)" },
      { label: "Europe (Frankfurt)", value: "Europe (Frankfurt)" },
      { label: "Europe (London)", value: "Europe (London)" },
      { label: "Europe (France)", value: "Europe (France)" },
      { label: "AP (Sydney)", value: "AP (Sydney)" },
      { label: "AP (Mumbai)", value: "AP (Mumbai)" },
      { label: "AP (Singapore)", value: "AP (Singapore)" },
      { label: "AP (Tokyo)", value: "AP (Tokyo)" },
      { label: "AP (Seoul)", value: "AP (Seoul)" },
    ],
    Azure: [
      { label: "US East", value: "US East" },
      { label: "US East 2", value: "US East 2" },
      { label: "US Central", value: "US Central" },
      { label: "US North Central", value: "US North Central" },
      { label: "US South Central", value: "US South Central" },
      { label: "US West Central", value: "US West Central" },
      { label: "US West", value: "US West" },
      { label: "US West 2", value: "US West 2" },
      { label: "US West 3", value: "US West 3" },
      { label: "Canada East", value: "Canada East" },
      { label: "Canada Central", value: "Canada Central" },
      { label: "Brazil South", value: "Brazil South" },
      { label: "North Europe", value: "North Europe" },
      { label: "UK South", value: "UK South" },
      { label: "UK West", value: "UK West" },
      { label: "France Central", value: "France Central" },
      { label: "Norway East", value: "Norway East" },
      { label: "Germany West Central", value: "Germany West Central" },
      { label: "Switzerland West", value: "Switzerland West" },
      { label: "Switzerland North", value: "Switzerland North" },
      { label: "Sweden Central", value: "Sweden Central" },
      { label: "Australia East", value: "Australia East" },
      { label: "Australia Central", value: "Australia Central" },
      { label: "Australia Central 2", value: "Australia Central 2" },
      { label: "Australia Southeast", value: "Australia Southeast" },
      { label: "South Africa North", value: "South Africa North" },
      { label: "India West", value: "India West" },
      { label: "India South", value: "India South" },
      { label: "India Central", value: "India Central" },
      { label: "Asia Southeast", value: "Asia Southeast" },
      { label: "Asia East", value: "Asia East" },
      { label: "Japan West", value: "Japan West" },
      { label: "Japan East", value: "Japan East" },
      { label: "Korea Central", value: "Korea Central" },
      { label: "UAE North", value: "UAE North" },
      { label: "CN East 2", value: "CN East 2" },
      { label: "CN North 2", value: "CN North 2" },
      { label: "CN East 3", value: "CN East 3" },
      { label: "CN North 3", value: "CN North 3" },
    ],
  },
}

const planData = {
  title: "Select plan",
  options: [
    { label: "Standard", value: "standard" },
    { label: "Premium", value: "premium" },
    { label: "Enterprise", value: "enterprise" },
  ],
}

const cloudData = {
  title: "Select cloud",
  options: [
    { label: "AWS", value: "AWS" },
    { label: "Azure", value: "Azure" },
    { label: "Google Cloud", value: "GCP" },
  ],
}

export { regionData, planData, cloudData }
