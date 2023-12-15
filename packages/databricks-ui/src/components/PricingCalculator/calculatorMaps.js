import React from "react"

const getCalculatorProps = ({ type, level, cloud }) => {
  const propMap = {
    level2: {
      "SQL Compute": {
        name: "Compute Configuration",
      },
      "SQL Pro Compute": {
        name: "Compute Configuration",
      },
      "SQL Pro Compute (Promotional Price)": {
        name: "Compute Configuration",
      },
      "SQL Serverless Compute": {
        name: "Compute Configuration",
      },
      "SQL Serverless Compute (Promotional Price)": {
        name: "Compute Configuration",
      },
      "Model Serving/Serverless Real-Time Inference": {
        name: "Serverless configuration",
      },
      default: {
        name: `${cloud?.toUpperCase()} instance type`,
      },
    },

    level3: {
      "Model Serving/Serverless Real-Time Inference": {
        tooltip: (
          <span>
            <strong>Queries per second</strong>
            <p>
              Represents the throughput requirements for your serving workload. QPS
              and Model execution time are used to determine how many instances the
              autoscaler will need to meet customer requirements
            </p>
          </span>
        ),
        name: "Queries per second",
        max: 999999,
        min: 0,
      },
      default: {
        tooltip: (
          <span>
            <strong># Instances / Clusters:</strong>
            <p>
              For Classic Compute products, this is the number of {cloud} instances
              used for running driver and worker nodes; value must be greater than or
              equal to 2.
            </p>
            {cloud?.toUpperCase() === "AWS" && (
              <p>
                For Serverless products, this is the number of clusters of the
                specified cluster size.
              </p>
            )}
          </span>
        ),
        name: "#Instances",
        min: 1,
        max: 999,
        placeholder: 2,
      },
    },

    level4: {
      "Model Serving/Serverless Real-Time Inference": {
        name: "Model exec time (sec)",
        max: 999,
      },
      default: {
        name: "Hours/Day",
        min: 0,
        max: 24,
        placeholder: 0,
      },
    },

    level5: {
      "Model Serving/Serverless Real-Time Inference": {
        name: "Hours/month",
        max: 999,
      },
      default: {
        name: "Days/Month",
        min: 0,
        max: 31,
        placeholder: 0,
      },
    },
  }

  const currentLevel = propMap[level]

  return {
    ...currentLevel?.default,
    ...currentLevel?.[type],
  }
}

export const calculateTotal = ({
  type,
  dbuValue,
  instanceOption,
  instancesCount,
  hoursCount,
  daysCount,
}) => {
  if (type?.includes("Model Serving/Serverless Real-Time Inference")) {
    return (
      dbuValue *
      Math.ceil((instancesCount * hoursCount) / instanceOption.value) *
      instanceOption.value *
      daysCount
    ).toFixed(2)
  }

  return (
    dbuValue *
    instanceOption.value *
    instancesCount *
    hoursCount *
    daysCount
  ).toFixed(2)
}
export default getCalculatorProps
