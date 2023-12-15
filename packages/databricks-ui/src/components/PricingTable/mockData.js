const columns = [
  {
    id: "column1",
    accessor: "column1",
    textAlign: "left",
    columnWidth: 3,
  },
  {
    id: "column2",
    header: "Standard",
    description: "One platform for your data analytics and ML workloads",
    accessor: "column2",
    columnWidth: 3,
  },
  {
    id: "column3",
    header: "Premium",
    description: "Data analytics and ML at scale across your business",
    accessor: "column3",
    columnWidth: 3,
  },
  {
    id: "column4",
    header: "Enterprise",
    description: "Data analytics and ML for your mission critical workloads",
    accessor: "column4",
    columnWidth: 3,
  },
]

const data = [
  {
    type: "price",
    column1: {
      title: "Jobs Compute",
      description:
        '<p class="md:mb-1.5 mb-1">Run data engineering pipelines to build data lakes and manage data at scale. Available with Photon.</p><p><a href="/" class="arrow-icon">See details</a></p>',
    },
    column2: {
      price: "$0.10 / DBU",
      description: "Light available starting at $0.07",
    },
    column3: {
      price: "$0.15 / DBU",
      description: "With Photon $0.40",
    },
    column4: {
      price: "$0.20 / DBU",
      description: "With Photon $0.54",
    },
  },
  {
    type: "price",
    column1: {
      title: "SQL Compute <br /><span class='h6'>(preview)</span>",
      description:
        '<p class="md:mb-1.5 mb-1">Run SQL queries for BI reporting, analytics, and visualization to get timely insights from data lakes.</p><p><a href="/" class="arrow-icon">See details </a></p>',
    },
    column2: {
      price: "-",
    },
    column3: {
      price: "$0.15 / DBU",
    },
    column4: {
      price: "$0.15 / DBU",
    },
  },
  {
    type: "price",
    column1: {
      title: "All-purpose Compute",
      description:
        '<p class="md:mb-1.5 mb-1">Run interactive data science and machine learning workloads. Also good for data engineering, BI and data analytics. Available with Photon.</p><p><a href="/" class="arrow-icon">See details</a></p>',
      cta: {
        text: "Compare compute options",
        to: "/",
      },
    },
    column2: {
      price: "$0.40 / DBU",
      cta: {
        text: "Calculate price",
        to: "/",
      },
    },
    column3: {
      price: "$0.55 / DBU",
      description: "With Photon $1.20",
      cta: {
        text: "Calculate price",
        to: "/",
      },
    },
    column4: {
      price: "$0.65 / DBU",
      description: "With Photon $1.40",
      cta: {
        text: "Calculate price",
        to: "/",
      },
    },
  },
  {
    type: "features",
    column1: "Databricks workspaces",
    column2: "Workspace for production jobs, analytics, and ML",
    column3: "Workspace for production jobs, analytics, and ML",
    column4: "Workspace for production jobs, analytics, and ML",
    subRows: [
      {
        column1: "Private access",
        column2: "Placeholder",
        column3: "Placeholder",
        column4: "Placeholder",
      },
      {
        column1: "Data science workspaces",
        column2: "Placeholder",
        column3: "Placeholder",
        column4: "Placeholder",
      },
    ],
  },
  {
    type: "features",
    column1: "Performance",
    column2: "Up to 50x faster than Apache Spark",
    column3: "Autoscaling for optimized performance",
    column4: "Autoscaling for optimized performance",
    subRows: [
      {
        column1: "Private access",
        column2: "Placeholder",
        column3: "Placeholder",
        column4: "Placeholder",
      },
      {
        column1: "Data science workspaces",
        column2: "Placeholder",
        column3: "Placeholder",
        column4: "Placeholder",
      },
    ],
  },
  {
    type: "features",
    column1: "Governance & manageability",
    column2: "Databricks Workspace administration",
    column3: "Audit logs & automated policy controls",
    column4: "Audit logs & automated policy controls",
    subRows: [
      {
        column1: "Private access",
        column2: "Placeholder",
        column3: "Placeholder",
        column4: "Placeholder",
      },
      {
        column1: "Data science workspaces",
        column2: "Placeholder",
        column3: "Placeholder",
        column4: "Placeholder",
      },
    ],
  },
  {
    type: "features",
    column1: "Enterprise security",
    column2: "Single sign-on",
    column3: "Extend your cloud native security for company wide adoption",
    column4: "Extend your cloud native security for company wide adoption",
    subRows: [
      {
        column1: "Private access",
        column2: "Placeholder",
        column3: "Placeholder",
        column4: "Placeholder",
      },
      {
        column1: "Data science workspaces",
        column2: "Placeholder",
        column3: "Placeholder",
        column4: "Placeholder",
      },
    ],
  },
]

export { columns, data }
