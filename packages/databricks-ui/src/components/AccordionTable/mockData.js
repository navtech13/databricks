const columns = [
  {
    Header: "Feature",
    accessor: "column1",
    columnWidth: 9,
  },
  {
    Header: "Cloud",
    accessor: "column2",
    columnWidth: 3,
  },
]

const data = [
  {
    column1: "Network Access",
    column2: "CLOUD",
    subRows: [
      {
        column1:
          "Private access from user or clients to the Databricks control plane UI and APIs",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private communication between the Databricks control plane and the classic data plane ",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private access from the classic data plane to data on the cloud platform",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private communication between the classic data plane and the Databricks control plane",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure,</a> <a href='/'>GCP</a>",
      },
    ],
  },
  {
    column1: "User and group administration",
    column2: "CLOUD",
    subRows: [
      {
        column1:
          "Private access from user or clients to the Databricks control plane UI and APIs",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private communication between the Databricks control plane and the classic data plane ",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private access from the classic data plane to data on the cloud platform",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private communication between the classic data plane and the Databricks control plane",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure,</a> <a href='/'>GCP</a>",
      },
    ],
  },
  {
    column1: "Access management",
    column2: "CLOUD",
    subRows: [
      {
        column1:
          "Private access from user or clients to the Databricks control plane UI and APIs",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private communication between the Databricks control plane and the classic data plane ",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private access from the classic data plane to data on the cloud platform",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure</a>",
      },
      {
        column1:
          "Private communication between the classic data plane and the Databricks control plane",
        column2: "<a href='/'>AWS,</a> <a href='/'>Azure,</a> <a href='/'>GCP</a>",
      },
    ],
  },
]

export { columns, data }
