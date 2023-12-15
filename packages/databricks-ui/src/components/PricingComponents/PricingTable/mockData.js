const columns = [
  {
    Header: "Feature",
    accessor: "feature",
    columnWidth: 9,
  },
  {
    Header: "Cloud",
    accessor: "cloud",
    columnWidth: 3,
  },
]

const data = [
  {
    feature: "Network Access",
    cloud: "CLOUD",
    subRows: [
      {
        feature:
          "Private access from user or clients to the Databricks control plane UI and APIs",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private communication between the Databricks control plane and the classic data plane ",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private access from the classic data plane to data on the cloud platform",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private communication between the classic data plane and the Databricks control plane",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure,</a> <a href='/'>GCP</a>",
      },
    ],
  },
  {
    feature: "User and group administration",
    cloud: "CLOUD",
    subRows: [
      {
        feature:
          "Private access from user or clients to the Databricks control plane UI and APIs",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private communication between the Databricks control plane and the classic data plane ",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private access from the classic data plane to data on the cloud platform",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private communication between the classic data plane and the Databricks control plane",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure,</a> <a href='/'>GCP</a>",
      },
    ],
  },
  {
    feature: "Access management",
    cloud: "CLOUD",
    subRows: [
      {
        feature:
          "Private access from user or clients to the Databricks control plane UI and APIs",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private communication between the Databricks control plane and the classic data plane ",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private access from the classic data plane to data on the cloud platform",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        feature:
          "Private communication between the classic data plane and the Databricks control plane",
        cloud: "<a href='/'>AWS,</a> <a href='/'>Azure,</a> <a href='/'>GCP</a>",
      },
    ],
  },
]

export { columns, data }
