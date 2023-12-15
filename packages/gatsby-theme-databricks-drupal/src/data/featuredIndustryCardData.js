import AbnLogo from "../../../databricks-ui/static/images/logo-gray-abn-amro.svg"
import TDLogo from "../../../databricks-ui/static/images/logo-gray-td-Bank.svg"
import FinraLogo from "../../../databricks-ui/static/images/logo-gray-finra.svg"
import ZurichLogo from "../../../databricks-ui/static/images/logo-gray-zurich.svg"
import ProvidenceLogo from "../../../databricks-ui/static/images/logo-gray-providence-st-joseph.png"
import CvsLogo from "../../../databricks-ui/static/images/logo-gray-cvs.svg"
import RegeneronLogo from "../../../databricks-ui/static/images/logo-gray-regeneron.svg"
import AstrazenecaLogo from "../../../databricks-ui/static/images/logo-gray-astrazeneca.svg"
import ParamountLogo from "../../../databricks-ui/static/images/logo-gray-paramount.svg"
import LaligaLogo from "../../../databricks-ui/static/images/logo-gray-laliga.svg"
import NielsenLogo from "../../../databricks-ui/static/images/logo-gray-nielsen.svg"
import WarnerBrosDiscoveryLogo from "../../../databricks-ui/static/images/logo-gray-warner-bros-discovery.svg"
import MarsLogo from "../../../databricks-ui/static/images/logo-gray-mars.svg"
import ReckittLogo from "../../../databricks-ui/static/images/logo-gray-reckitt.svg"
import SamsClubLogo from "../../../databricks-ui/static/images/logo-gray-sams-club.svg"
import ColumbiaLogo from "../../../databricks-ui/static/images/logo-gray-columbia.svg"

const featuredIndustryCardData = [
  {
    title: "Communications, Media & Entertainment",
    content: "Earn more attention, capture more imaginations",
    type: "media",
    cta: {
      label: "Learn how",
      link: "/solutions/industries/media-and-entertainment",
    },
    logos: [
      {
        company: ParamountLogo,
        name: "Paramount",
      },
      {
        company: LaligaLogo,
        name: "La Liga",
      },
      {
        company: NielsenLogo,
        name: "Nielsen",
      },
      {
        company: WarnerBrosDiscoveryLogo,
        name: "Warner Bros Discovery",
      },
    ],
  },
  {
    title: "Financial Services",
    content: "Build more trust, ensure peace of mind",
    type: "financial",
    cta: {
      label: "Learn how",
      link: "/solutions/industries/financial-services",
    },
    logos: [
      {
        company: AbnLogo,
        name: "ABN AMRO",
      },
      {
        company: TDLogo,
        name: "TD Ameritrade",
      },
      {
        company: FinraLogo,
        name: "FINRA",
      },
      {
        company: ZurichLogo,
        name: "Zurich",
      },
    ],
  },
  {
    title: "Healthcare and Life Sciences",
    content: "Discover and deliver better care",
    type: "healthcare",
    cta: {
      label: "Learn how",
      link: "/solutions/industries/healthcare-and-life-sciences",
    },
    logos: [
      {
        company: ProvidenceLogo,
        name: "Providence",
      },
      {
        company: CvsLogo,
        name: "CVS",
      },
      {
        company: RegeneronLogo,
        name: "Regeneron",
      },
      {
        company: AstrazenecaLogo,
        name: "AstraZeneca",
      },
    ],
  },
  {
    title: "Retail and Consumer Goods",
    content: "Lead customers on their journey and champion your brand",
    type: "retail",
    cta: {
      label: "Learn how",
      link: "/solutions/industries/retail-industry-solutions",
    },
    logos: [
      {
        company: SamsClubLogo,
        name: "Sam's Club",
      },
      {
        company: ColumbiaLogo,
        name: "Columbia",
      },
      {
        company: ReckittLogo,
        name: "Reckitt",
      },
      {
        company: MarsLogo,
        name: "Mars",
      },
    ],
  },
]

export default featuredIndustryCardData
