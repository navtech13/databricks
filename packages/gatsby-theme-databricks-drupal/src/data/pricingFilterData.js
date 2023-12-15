import useTranslate from "../utils/translate"

const getRegionData = () => {
  const { translate } = useTranslate()

  const regionData = {
    title: translate("pricing.region.selector"),
    select: "Select",
    options: {
      srti: {
        aws: [
          { label: "US East (N. Virginia)", value: "US East (N. Virginia)" },
          { label: "US East (Ohio)", value: "US East (Ohio)" },
          { label: "US West (Oregon)", value: "US West (Oregon)" },
          { label: "US West (N. California)", value: "US West (N. California)" },
          { label: "Canada", value: "Canada" },
          { label: "AP (Mumbai)", value: "AP (Mumbai)" },
          { label: "AP (Seoul)", value: "AP (Seoul)" },
          { label: "AP (Singapore)", value: "AP (Singapore)" },
          { label: "AP (Sydney)", value: "AP (Sydney)" },
          { label: "AP (Tokyo)", value: "AP (Tokyo)" },
          { label: "Europe (France)", value: "Europe (France)" },
          { label: "Europe (Frankfurt)", value: "Europe (Frankfurt)" },
          { label: "Europe (Ireland)", value: "Europe (Ireland)" },
          { label: "Europe (London)", value: "Europe (London)" },
          { label: "SA (Brazil)", value: "SA (Brazil)" },
        ],
        azure: [
          { label: "US East", value: "US East" },
          { label: "US East 2", value: "US East 2" },
          { label: "US Central", value: "US Central" },
          { label: "US North Central", value: "US North Central" },
          { label: "US South Central", value: "US South Central" },
          { label: "US West", value: "US West" },
          { label: "US West 2", value: "US West 2" },
          { label: "US West 3", value: "US West 3" },
          { label: "US West Central", value: "US West Central" },
          { label: "Canada Central", value: "Canada Central" },
          { label: "Canada East", value: "Canada East" },
          { label: "EU West", value: "EU West" },
          { label: "EU North", value: "EU North" },
          { label: "UK South", value: "UK South" },
          { label: "UK West", value: "UK West" },
          { label: "France Central", value: "France Central" },
          { label: "Norway East", value: "Norway East" },
          { label: "Switzerland North", value: "Switzerland North" },
          { label: "Switzerland West", value: "Switzerland West" },
          { label: "Sweden Central", value: "Sweden Central" },
          { label: "Germany West Central", value: "Germany West Central" },
          { label: "Asia East", value: "Asia East" },
          { label: "Asia Southeast", value: "Asia Southeast" },
          { label: "Japan East", value: "Japan East" },
          { label: "Japan West", value: "Japan West" },
          { label: "Korea Central", value: "Korea Central" },
          { label: "India Central", value: "India Central" },
          { label: "India South", value: "India South" },
          { label: "India West", value: "India West" },
          { label: "UAE North", value: "UAE North" },
          { label: "Australia Central", value: "Australia Central" },
          { label: "Australia Central 2", value: "Australia Central 2" },
          { label: "Australia East", value: "Australia East" },
          { label: "Australia Southeast", value: "Australia Southeast" },
          { label: "Brazil South", value: "Brazil South" },
          { label: "South Africa North", value: "South Africa North" },
        ],
      },
      sql: {
        aws: {
          serverless: [
            {
              label: translate("pricing.region.us-east"),
              value: "US East (N. Virginia)",
            },
            {
              label: translate("pricing.region.us-east-2"),
              value: "US East (Ohio)",
            },
            {
              label: translate("pricing.region.us-west"),
              value: "US West (Oregon)",
            },
            { label: "Canada", value: "Canada" },
            {
              label: translate("pricing.region.europe"),
              value: "Europe (Frankfurt)",
            },
            { label: "Europe (France)", value: "Europe (France)" },
            {
              label: translate("pricing.region.europe-2"),
              value: "Europe (Ireland)",
            },
            { label: "SA (Brazil)", value: "SA (Brazil)" },
            { label: "AP (Mumbai)", value: "AP (Mumbai)" },
            { label: translate("pricing.region.apac"), value: "AP (Sydney)" },
            { label: "AP (Singapore)", value: "AP (Singapore)" },
            { label: "AP (Tokyo)", value: "AP (Tokyo)" },
          ],
          sqlproonly: [
            { label: "US West (California)", value: "US West (California)" },
            { label: "Europe (London)", value: "Europe (London)" },
            { label: "AP (Seoul)", value: "AP (Seoul)" },
          ],
        },
        google: {
          sqlproonly: [
            { label: "US-East (Virginia)", value: "US-East (Virginia)" },
            { label: "US-East (South Carolina)", value: "US-East (South Carolina)" },
            { label: "US-Central (Iowa)", value: "US-Central (Iowa)" },
            { label: "US-West (Nevada)", value: "US-West (Nevada)" },
            { label: "US-West (Oregon)", value: "US-West (Oregon)" },
            { label: "Canada (Quebec)", value: "Canada (Quebec)" },
            { label: "Europe-West (Belgium)", value: "Europe-West (Belgium)" },
            { label: "Europe-West (England)", value: "Europe-West (England)" },
            { label: "Europe-West (Frankfurt)", value: "Europe-West (Frankfurt)" },
            { label: "Asia-Northeast (Tokyo)", value: "Asia-Northeast (Tokyo)" },
            {
              label: "Asia-Southeast (Singapore)",
              value: "Asia-Southeast (Singapore)",
            },
            {
              label: "Australia-Southeast (Sydney)",
              value: "Australia-Southeast (Sydney)",
            },
          ],
        },
        azure: {
          serverless: [
            { label: "US East", value: "US East" },
            { label: "US East 2", value: "US East 2" },
            { label: "US West", value: "US West" },
            { label: "US West 2", value: "US West 2" },
            { label: "US Central", value: "US Central" },
            { label: "US North Central", value: "US North Central" },
            { label: "US South Central", value: "US South Central" },
            { label: "Canada Central", value: "Canada Central" },
            { label: "West Europe", value: "West Europe" },
            { label: "North Europe", value: "North Europe" },
            { label: "Australia East", value: "Australia East" },
            { label: "UK South", value: "UK South" },
            { label: "Brazil South", value: "Brazil South" },
            { label: "Asia Southeast", value: "Asia Southeast" },
            { label: "India Central", value: "India Central" },
            { label: "Japan East", value: "Japan East" },
          ],
          sqlproonly: [
            { label: "US West 3", value: "US West 3" },
            { label: "US West Central", value: "US West Central" },
            { label: "US North Central", value: "US North Central" },
            { label: "Canada East", value: "Canada East" },
            { label: "UK West", value: "UK West" },
            { label: "Asia East", value: "Asia East" },
            { label: "Japan West", value: "Japan West" },
            { label: "France Central", value: "France Central" },
            { label: "Norway East", value: "Norway East" },
            { label: "Germany West Central", value: "Germany West Central" },
            { label: "Switzerland West", value: "Switzerland West" },
            { label: "Switzerland North", value: "Switzerland North" },
            { label: "Sweden Central", value: "Sweden Central" },
            { label: "Australia Central 2", value: "Australia Central 2" },
            { label: "Australia Central", value: "Australia Central" },
            { label: "Australia Southeast", value: "Australia Southeast" },
            { label: "South Africa North", value: "South Africa North" },
            { label: "UK South", value: "UK South" },
            { label: "Brazil South", value: "Brazil South" },
            { label: "India West", value: "India West" },
            { label: "India South", value: "India South" },
            { label: "India Central", value: "India Central" },
            { label: "Japan East", value: "Japan East" },
            { label: "Korea Central", value: "Korea Central" },
            { label: "UAE North", value: "UAE North" },
            { label: "CN East 2", value: "CN East 2" },
            { label: "CN North 2", value: "CN North 2" },
            { label: "CN East 3", value: "CN East 3" },
            { label: "CN North 3", value: "CN North 3" },
          ],
        },
      },
      managedServices: {
        aws: [
          {
            label: translate("pricing.region.us-east"),
            value: "US East (N. Virginia)",
          },
          {
            label: translate("pricing.region.us-east-2"),
            value: "US East (Ohio)",
          },
          { label: "US West (N. California)", value: "US West (N. California)" },
          { label: "US West (Oregon)", value: "US West (Oregon)" },
          { label: "Canada", value: "Canada" },
          { label: "Europe (France)", value: "Europe (France)" },
          {
            label: translate("pricing.region.europe"),
            value: "Europe (Frankfurt)",
          },
          {
            label: translate("pricing.region.europe-2"),
            value: "Europe (Ireland)",
          },
          { label: "Europe (London)", value: "Europe (London)" },
          { label: "SA (Brazil)", value: "SA (Brazil)" },
          { label: "AP (Mumbai)", value: "AP (Mumbai)" },
          { label: "AP (Seoul)", value: "AP (Seoul)" },
          { label: "AP (Singapore)", value: "AP (Singapore)" },
          { label: "AP (Sydney)", value: "AP (Sydney)" },
          { label: "AP (Tokyo)", value: "AP (Tokyo)" },
        ],
        azure: [
          { label: "US East", value: "US East" },
          { label: "US East 2", value: "US East 2" },
          { label: "US West", value: "US West" },
          { label: "US West 2", value: "US West 2" },
          { label: "US West 3", value: "US West 3" },
          { label: "US Central", value: "US Central" },
          { label: "US West Central", value: "US West Central" },
          { label: "US North Central", value: "US North Central" },
          { label: "US South Central", value: "US South Central" },
          { label: "Canada Central", value: "Canada Central" },
          { label: "Canada East", value: "Canada East" },
          { label: "EU North", value: "EU North" },
          { label: "EU West", value: "EU West" },
          { label: "UK South", value: "UK South" },
          { label: "UK West", value: "UK West" },
          { label: "France Central", value: "France Central" },
          { label: "Germany West Central", value: "Germany West Central" },
          { label: "Switzerland North", value: "Switzerland North" },
          { label: "Switzerland West", value: "Switzerland West" },
          { label: "Sweden Central", value: "Sweden Central" },
          { label: "Norway East", value: "Norway East" },
          { label: "Brazil South", value: "Brazil South" },
          { label: "South Africa North", value: "South Africa North" },
          { label: "Australia Central", value: "Australia Central" },
          { label: "Australia Central 2", value: "Australia Central 2" },
          { label: "Australia East", value: "Australia East" },
          { label: "Australia Southeast", value: "Australia Southeast" },
          { label: "India Central", value: "India Central" },
          { label: "India South", value: "India South" },
          { label: "India West", value: "India West" },
          { label: "Japan East", value: "Japan East" },
          { label: "Japan West", value: "Japan West" },
          { label: "Korea Central", value: "Korea Central" },
          { label: "Asia Southeast", value: "Asia Southeast" },
          { label: "Asia East", value: "Asia East" },
          { label: "UAE North", value: "UAE North" },
        ],
      },
    },
  }

  return regionData
}

const getPlanData = () => {
  const { translate } = useTranslate()

  const planData = {
    title: translate("pricing.plan.selector"),
    options: [
      {
        label: translate("pricing.plan.standard"),
        value: "standard",
        disabled: false,
      },
      {
        label: translate("pricing.plan.premium"),
        value: "premium",
        disabled: false,
      },
      {
        label: translate("pricing.plan.enterprise"),
        value: "enterprise",
        disabled: false,
      },
    ],
  }

  return planData
}

const getCloudData = () => {
  const { translate } = useTranslate()

  const cloudData = {
    title: translate("pricing.cloud.selector"),
    options: [
      { label: translate("pricing.cloud.aws"), value: "aws", disabled: false },
      { label: translate("pricing.cloud.azure"), value: "azure", disabled: false },
      { label: translate("pricing.cloud.gcp"), value: "google", disabled: false },
    ],
  }

  return cloudData
}

export { getRegionData, getPlanData, getCloudData }
