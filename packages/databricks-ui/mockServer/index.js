const { createServer } = require("miragejs")

const smallPromoBlock = {
  title: "Data + AI Summit returns, June 10–13 2024",
  cta: { label: "Attend", to: "/" },
  image: {
    src: "/static/images/sm-promo-block.svg",
    alt: "",
  },
}

const HeroPromo = {
  v1: {
    variant: "v1",
    title: "Generation AI",
    datePlace: "JUNE 26–29 // MOSCONE CENTER, SAN FRANCISCO",
    description: `<div>
            <p>
              Join the global event for the data and AI community to hear from the
              world’s top experts in LLMs and machine learning, data science, data
              engineering, data warehousing and more!
            </p>
          </div>`,
    cta: { label: "Learn more", to: "/" },
  },
  v2: {
    variant: "v2",
    title: "Generation AI",
    datePlace: "JUNE 26–29 // MOSCONE CENTER, SAN FRANCISCO",
    description: `<div>
            <p>
              Join the global event for the data and AI community to hear from the
              world’s top experts in LLMs and machine learning, data science, data
              engineering, data warehousing and more!
            </p>
          </div>`,
    cta: { label: "Learn more", to: "/" },
    items: [
      {
        key: 1,
        name: "Satya Nadella",
        title: "Chairman and CEO at Microsoft, Live Virtual Guest",
        image: { src: "/static/images/avatar.png" },
      },
      {
        key: 2,
        name: "Lin Qiao",
        title: "Co-creator of PyTorch, Co-founder and CEO at Fireworks",
        image: { src: "/static/images/avatar.png" },
      },
      {
        key: 3,
        name: "Ali Ghodsi",
        title: "Co-founder and CEO at Databricks",
        image: { src: "/static/images/avatar.png" },
      },
      {
        key: 4,
        name: "Eric Schmidt",
        title: "Former CEO and Chairman, Google; Co-Founder at Schmidt Futures",
        image: { src: "/static/images/avatar.png" },
      },
    ],
  },
}

const bulletedList = {
  title: "Databricks trial:",
  items: [
    "Collaborative environment for data teams to build solutions together.",
    "Interactive notebooks to use Apache SparkTM, SQL, Python, Scala, Delta Lake, MLflow, TensorFlow, Keras, Scikit-learn and more.",
    "Available as a 14-day full trial in your own cloud, or as a lightweight trial hosted by Databricks.",
  ],
}

const bioSliderData = [
  {
    key: 1,
    name: "Jonathan Chadwick",
    title: "Board Member",
    description: `<p className="b2">Jonathan Chadwick has over 30 years of experience both in the US and the UK and has lived in Silicon Valley for over 25 years. He has worked for some of the most significant technology companies and has a broad background in strategy, mergers and acquisitions, operational and financial management and has extensive team leadership experience.</p>
    <br>
    <p className="b2">He is currently a board member and advisor to a number of public and private companies.</p>
    <br>
    <p className="b2">He is the Chair of the Audit Committees of ServiceNow, Inc. the Enterprise Cloud Company (NYSE: NOW; since 2016); of Zoom Video Communications, Inc., the provider of video-first unified communications (Nasdaq: ZM; since 2017); and of Elastic, Inc, the enterprise search company (NYSE: ESTC; since 2018). Jonathan previously served on the boards of Cognizant Technology Solutions Inc., the $15bn IT, business process and consulting company, (Nasdaq: CTSH) between 2016 and 2019.</p>`,
    image: { src: "/static/images/jonathan-chadwick-headshot.png" },
  },
  {
    key: 2,
    name: "Rick Schultz",
    title: "Chief Marketing Officer",
    description: `<p className="b2">Rick Schultz joined Databricks in 2017 as Chief Marketing Officer. He leads the company’s worldwide marketing efforts, spanning product marketing, demand generation, branding and creative, global communications, events and field marketing as well as community evangelism. He previously served as Senior Vice President of Marketing for Alteryx, helping fuel its growth from early stage (Series A) to pre-IPO and from 100 customers to over 2,200. Rick also ran technology product marketing for Oracle from 2008 to 2012, leading the positioning, content and demand generation strategies for a broad, $6 billion portfolio of database, analytics, security and management products. He holds a BS in Finance from UC Berkeley’s Haas School of Business.</p>`,
    image: { src: "/static/images/image-portrait-rick-schultz.png" },
  },
  {
    key: 3,
    name: "Jonathan Chadwick",
    title: "Board Member",
    description: `<p className="b2">Jonathan Chadwick has over 30 years of experience both in the US and the UK and has lived in Silicon Valley for over 25 years. He has worked for some of the most significant technology companies and has a broad background in strategy, mergers and acquisitions, operational and financial management and has extensive team leadership experience.</p>
    <br>
    <p className="b2">He is currently a board member and advisor to a number of public and private companies.</p>
    <br>
    <p className="b2">He is the Chair of the Audit Committees of ServiceNow, Inc. the Enterprise Cloud Company (NYSE: NOW; since 2016); of Zoom Video Communications, Inc., the provider of video-first unified communications (Nasdaq: ZM; since 2017); and of Elastic, Inc, the enterprise search company (NYSE: ESTC; since 2018). Jonathan previously served on the boards of Cognizant Technology Solutions Inc., the $15bn IT, business process and consulting company, (Nasdaq: CTSH) between 2016 and 2019.</p>`,
    image: { src: "/static/images/jonathan-chadwick-headshot.png" },
  },
  {
    key: 4,
    name: "Rick Schultz",
    title: "Chief Marketing Officer",
    description: `<p className="b2">Rick Schultz joined Databricks in 2017 as Chief Marketing Officer. He leads the company’s worldwide marketing efforts, spanning product marketing, demand generation, branding and creative, global communications, events and field marketing as well as community evangelism. He previously served as Senior Vice President of Marketing for Alteryx, helping fuel its growth from early stage (Series A) to pre-IPO and from 100 customers to over 2,200. Rick also ran technology product marketing for Oracle from 2008 to 2012, leading the positioning, content and demand generation strategies for a broad, $6 billion portfolio of database, analytics, security and management products. He holds a BS in Finance from UC Berkeley’s Haas School of Business.</p>`,
    image: { src: "/static/images/image-portrait-rick-schultz.png" },
  },
  {
    key: 5,
    name: "Jonathan Chadwick",
    title: "Board Member",
    description: `<p className="b2">Jonathan Chadwick has over 30 years of experience both in the US and the UK and has lived in Silicon Valley for over 25 years. He has worked for some of the most significant technology companies and has a broad background in strategy, mergers and acquisitions, operational and financial management and has extensive team leadership experience.</p>
    <br>
    <p className="b2">He is currently a board member and advisor to a number of public and private companies.</p>
    <br>
    <p className="b2">He is the Chair of the Audit Committees of ServiceNow, Inc. the Enterprise Cloud Company (NYSE: NOW; since 2016); of Zoom Video Communications, Inc., the provider of video-first unified communications (Nasdaq: ZM; since 2017); and of Elastic, Inc, the enterprise search company (NYSE: ESTC; since 2018). Jonathan previously served on the boards of Cognizant Technology Solutions Inc., the $15bn IT, business process and consulting company, (Nasdaq: CTSH) between 2016 and 2019.</p>`,
    image: { src: "/static/images/jonathan-chadwick-headshot.png" },
  },
  {
    key: 6,
    name: "Rick Schultz",
    title: "Chief Marketing Officer",
    description: `<p className="b2">Rick Schultz joined Databricks in 2017 as Chief Marketing Officer. He leads the company’s worldwide marketing efforts, spanning product marketing, demand generation, branding and creative, global communications, events and field marketing as well as community evangelism. He previously served as Senior Vice President of Marketing for Alteryx, helping fuel its growth from early stage (Series A) to pre-IPO and from 100 customers to over 2,200. Rick also ran technology product marketing for Oracle from 2008 to 2012, leading the positioning, content and demand generation strategies for a broad, $6 billion portfolio of database, analytics, security and management products. He holds a BS in Finance from UC Berkeley’s Haas School of Business.</p>`,
    image: { src: "/static/images/image-portrait-rick-schultz.png" },
  },
]

const tabData = {
  tabs: [
    {
      id: 1,
      label: "Item One ",
      content: {
        headline: "Headline content here 1",
        body: `<p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut.</p>
        <br>
        <p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut. </p>`,
        cta: { label: "Label", to: "/" },
        image: {
          src: "/static/images/image-container.png",
          alt: "image container",
        },
      },
    },
    {
      id: 2,
      label: "Item Two ",
      content: {
        headline: "Headline content here 2",
        body: `<p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut.</p>
        <br>
        <p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut. </p>`,
        cta: { label: "Label", to: "/" },
      },
    },
    {
      id: 3,
      label: "Item Three ",
      content: {
        headline: "Headline content here 3",
        body: `<p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut.</p>
        <br>
        <p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut. </p>`,
        cta: { label: "Label", to: "/" },
        image: {
          src: "/static/images/image-container.png",
          alt: "image container",
        },
      },
    },
    {
      id: 4,
      label: "Item Four ",
      content: {
        headline: "Headline content here 4",
        body: `<p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut.</p>
        <br>
        <p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut. </p>`,
        cta: { label: "Label", to: "/" },
      },
    },
    {
      id: 5,
      label: "Item Five ",
      content: {
        headline: "Headline content here 5",
        body: `<p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut.</p>
        <br>
        <p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut. </p>`,
        cta: { label: "Label", to: "/" },
        image: {
          src: "/static/images/image-container.png",
          alt: "image container",
        },
      },
    },
    {
      id: 6,
      label: "Item Six ",
      content: {
        headline: "Headline content here 6",
        body: `<p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut.</p>
        <br>
        <p>Non est fuga libero nemo reiciendis nemo quo. Omnis et est est aliquid. Placeat aut ducimus iste nisi quia accusantium. Et et ut quos reprehenderit. Aut hic modi. Quae voluptatibus maxime magnam ut. </p>`,
        cta: { label: "Label", to: "/" },
      },
    },
  ],
}

const textRow = {
  title: `This is a section headline.`,
  titleRightCta: `<h2>This is a section headline.</h2>`,
  description: `This is a supporting body copy section, which is optional. This is a supporting body copy section, which is optional.`,
  cta: {
    to: "https://www.databricks.com/blog/category/company",
    textLink: "Your CTA here",
  },
}

const verticalTabs = [
  {
    title: "Customer engagement",
    subtitle: "Bring relevance and hyper-personalization to every touchpoint",
    subchildren:
      "With real-time, accurate 360° views of their customers, retailers have everything they need to create relationships on each customer’s terms: understanding sentiment across channels and personalizing recommendations. The result? Increased profitability and loyalty.",
    children: `<iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/U15lKkzLlTA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    customer: {
      eyebrow: "Customer Story",
      text: "80% Growth in email marketing from personalization",
      image: {
        label: "Pandora",
        src: "/static/images/logo-color-pandora-Jewelry.svg",
      },
      cta: {
        to: "/",
        label: "See how",
      },
    },
  },
  {
    title: "Operational efficiency",
    subtitle: "Optimize efficiency, maximize profitability across the supply chain",
    subchildren:
      "With real-time, accurate 360° views of their customers, retailers have everything they need to create relationships on each customer’s terms: understanding sentiment across channels and personalizing recommendations. The result? Increased profitability and loyalty.",
    customer: {
      eyebrow: "Customer Story",
      text: "80% Growth in email marketing from personalization",
      image: {
        label: "Walgreens",
        src: "/static/images/logo-color-walgreens.svg",
      },
      cta: {
        to: "/",
        label: "See how",
      },
    },
  },
  {
    title: "Employee productivity",
    subtitle: "Unlock productivity through access to real-time insights",
    subchildren:
      "With real-time, accurate 360° views of their customers, retailers have everything they need to create relationships on each customer’s terms: understanding sentiment across channels and personalizing recommendations. The result? Increased profitability and loyalty.",
    customer: {
      eyebrow: "Customer Story",
      text: "80% Growth in email marketing from personalization",
      image: {
        label: "",
        src: "/static/images/logo-color-burberry.svg",
      },
      cta: {
        to: "/",
        label: "See how",
      },
    },
  },
  {
    title: "Product performance",
    subtitle:
      "Apply predictability and precision to drive performance in every product and service",
    subchildren:
      "With real-time, accurate 360° views of their customers, retailers have everything they need to create relationships on each customer’s terms: understanding sentiment across channels and personalizing recommendations. The result? Increased profitability and loyalty.",
    children: `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/U15lKkzLlTA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    customer: {
      eyebrow: "Customer Story",
      text: "80% Growth in email marketing from personalization",
      image: {
        label: "",
        src: "/static/images/logo-color-8481.svg",
      },
      cta: {
        to: "/",
        label: "See how",
      },
    },
  },
]

const customerHubCard = [
  {
    logoImage: {
      src: "https://i.ibb.co/tzszN5W/logo-arcion-no-Padding.png",
      alt: "Customer Hub Card Logo",
    },
    cta: {
      to: "https://www.arcion.com",
      text: "Watch the video",
    },
    description: "Nemo sapiente deleniti officia fugiat illo ratione et et.",
    withTooltip: true,
    tooltipCta: {
      to: "https://www.arcion.com",
      text: "Watch the video",
    },
    tooltipContent:
      "We provide world-class integration, consulting and execution, and data and analytics services. We have a wealth of development and integration experience in moving clients from around the world onto cloud platforms.    ",
  },
  {
    logoImage: {
      src: "https://i.ibb.co/tzszN5W/logo-arcion-no-Padding.png",
      alt: "Customer Hub Card Logo",
    },
    withTooltip: true,
    tooltipCta: {
      to: "https://www.arcion.com",
      text: "Watch the video",
    },
    tooltipContent:
      "We provide world-class integration, consulting and execution, and data and analytics services. We have a wealth of development and integration experience in moving clients from around the world onto cloud platforms.    ",
  },
  {
    logoImage: {
      src: "https://i.ibb.co/tzszN5W/logo-arcion-no-Padding.png",
      alt: "Customer Hub Card Logo",
    },
    cta: {
      to: "https://www.arcion.com",
      text: "Watch the video",
    },
    withTooltip: true,
    tooltipCta: {
      to: "https://www.arcion.com",
      text: "Watch the video",
    },
    tooltipContent:
      "We provide world-class integration, consulting and execution, and data and analytics services. We have a wealth of development and integration experience in moving clients from around the world onto cloud platforms.    ",
  },
  {
    logoImage: {
      src: "https://i.ibb.co/tzszN5W/logo-arcion-no-Padding.png",
      alt: "Customer Hub Card Logo",
    },
    cta: {
      to: "https://www.arcion.com",
      text: "Watch the video",
    },
    description: "Nemo sapiente deleniti officia fugiat illo ratione et et.",
    withTooltip: true,
    tooltipCta: {
      to: "https://www.arcion.com",
      text: "Watch the video",
    },
    tooltipContent:
      "We provide world-class integration, consulting and execution, and data and analytics services. We have a wealth of development and integration experience in moving clients from around the world onto cloud platforms.    ",
  },
]
const filtersFields = {
  industry: {
    title: "Industry : All",
    items: [
      { value: "1", label: "Advertising and Marketing Technology" },
      { value: "2", label: "Education" },
      { value: "3", label: "Energy and Industrials" },
      { value: "4", label: "Financial Services" },
      { value: "5", label: "Government and Public Sector" },
      { value: "6", label: "Healthcare and Life Sciences" },
      { value: "7", label: "Manufacturing and Logistics" },
      { value: "8", label: "Media and Entertainment" },
      { value: "9", label: "Retail and Consumer Goods" },
      { value: "10", label: "Technology and Software" },
      { value: "11", label: "Travel and Hospitality" },
    ],
  },
  region: {
    title: "Region",
    items: [
      { value: "21", label: "Americas" },
      { value: "22", label: "Asia-Pacific & Japan" },
      { value: "23", label: "Latin Amarica" },
      { value: "24", label: "Middle East & Africa" },
      { value: "25", label: "UK & Europe" },
    ],
  },
  platform: {
    title: "Platform",
    items: [
      { value: "31", label: "Delta Lake" },
      { value: "32", label: "Data Science" },
      { value: "33", label: "Machine Learning" },
      { value: "34", label: "Databricks SQL" },
      { value: "35", label: "ETL" },
    ],
  },
  cloud: {
    title: "Cloud",
    items: [
      { value: "41", label: "AWS" },
      { value: "42", label: "Azure" },
      { value: "43", label: "Google Cloud" },
    ],
  },
}

const videoTranscriptData = {
  fullDatatranscripts: [
    {
      title: "Denny Lee",
      startTime: "07:11",
      timeSeconds: 431,
      transcript:
        "Wow. These numbers are completely mind-blowing, which is pretty cool. So then I’m going to dive right into the thing that I always will want to talk about. Then what data are you recording in order to be able to facilitate this type of change, where you’re seeing the such great ROI and great productivity? Are these wearable devices? What data are you recording? Is it a lot? Is it a little bit? Just want to understand a little bit better about the data involved in all this now.",
    },
    {
      title: "Sean Petterson",
      startTime: "16:21",
      timeSeconds: 981,
      transcript:
        "The biggest challenges with employers is really just educating in the right way, making sure that we are using the data for the right reasons and we’re translating that. Our biggest fear is that our industrial athletes get wins that this isn’t a tool specifically built for them and it very much is. But if you have a C-suite manager or a regional manager come down into a warehouse and they’re been before and tell people to wear things, they’re on edge, right? Our biggest challenge there is always just providing the tools for those managers, making sure that they know how to educate the workforce, making sure they know how to leverage the data in the right ways across their workforce, and work very closely with our data science teams to come up with those prescriptive roadmaps and adhere to them.",
    },
    {
      title: "Elena Donio",
      startTime: "32:14",
      timeSeconds: 1934,
      transcript:
        "A great majority of the folks that we protect inside of warehousing and logistics and 3PL are working two jobs. So, it’s not just going home and going to the gym or doing your daily routine. It’s a lot of people will work from 4:00 AM to 1:00 PM and then go do landscaping until 8:00 PM. That is a very, very common thing. Understanding what that does to an individual’s physiology on a weekly and monthly basis is really interesting insights, not only just around what happens operationally to those individuals, but just demographically, what happens to the areas that these people operate in. Really learning more about that, reaching deeper into those areas is going to help us uncover, again, a better way to manage and value manual labor.",
    },
  ],
  simplifiedDatatranscripts: [
    {
      title: "Denny Lee",
      startTime: "07:11",
      timeSeconds: 431,
      transcript:
        "Wow. These numbers are completely mind-blowing, which is pretty cool. So then I’m going to dive right into the thing that I always will want to talk about. Then what data are you recording in order to be able to facilitate this type of change, where you’re seeing the such great ROI and great productivity? Are these wearable devices? What data are you recording? Is it a lot? Is it a little bit? Just want to understand a little bit better about the data involved in all this now.",
      timestamps: false,
    },
    {
      title: "Sean Petterson",
      startTime: "16:21",
      timeSeconds: 981,
      transcript:
        "The biggest challenges with employers is really just educating in the right way, making sure that we are using the data for the right reasons and we’re translating that. Our biggest fear is that our industrial athletes get wins that this isn’t a tool specifically built for them and it very much is. But if you have a C-suite manager or a regional manager come down into a warehouse and they’re been before and tell people to wear things, they’re on edge, right? Our biggest challenge there is always just providing the tools for those managers, making sure that they know how to educate the workforce, making sure they know how to leverage the data in the right ways across their workforce, and work very closely with our data science teams to come up with those prescriptive roadmaps and adhere to them.",
      timestamps: false,
    },
    {
      title: "Elena Donio",
      startTime: "32:14",
      timeSeconds: 1934,
      transcript:
        "A great majority of the folks that we protect inside of warehousing and logistics and 3PL are working two jobs. So, it’s not just going home and going to the gym or doing your daily routine. It’s a lot of people will work from 4:00 AM to 1:00 PM and then go do landscaping until 8:00 PM. That is a very, very common thing. Understanding what that does to an individual’s physiology on a weekly and monthly basis is really interesting insights, not only just around what happens operationally to those individuals, but just demographically, what happens to the areas that these people operate in. Really learning more about that, reaching deeper into those areas is going to help us uncover, again, a better way to manage and value manual labor.",
      timestamps: false,
    },
  ],
}

const alert = {
  cta: { label: "Register now", to: "/" },
  image: {
    src: "/static/images/promo-thumbnail.png",
    alt: "",
  },
  backgroundImage: {
    src: "/static/images/helloBanner-backgroundImage-1.png",
    alt: "",
  },
  content: {
    primary: `<p><strong>Data + AI Summit 2022: June 27–30, Moscone Center + Virtual</strong></p>
  <p>Join us for unique community-driven content, deep technical training and outstanding speakers like Andrew Ng and Ali Ghodsi.</p>`,
    secondary: `<p><strong>Attention: Databricks applicants</strong></p>
    <p>Due to reports of phishing, all Databricks applicants should apply on our official <a href="/">Careers page</a> (good news — you are here). All official communication from Databricks will come from email addresses ending with @databricks.com, @us-greenhouse-mail.io or @goodtime.io.</p>`,
    secondarySmall: `<p class="h5"><strong>Extended Time SQL Price Promotion - Save 40%+ </strong></p>
    <p "b6">Take advantage of our 15-month promotion on SQL Serverless and the brand new SQL Pro</p>`,
  },
}

const agenda = {
  title: "Morning Agenda",
  items: [
    {
      key: "9:30-10:30 AM",
      title: "9:30-10:30 AM",
      description: "Breakfast and Networking",
      footer: undefined,
    },
    {
      key: "10:30-11:00 AM",
      title: "10:30-11:00 AM",
      description: "The Future of Care is Integrated, Real Time and Predictive",
      footer: "DATABRICKS",
    },
    {
      key: "11:00-11:30 AM",
      title: "11:00-11:30 AM",
      description: "Strategies for Building a Data-Driven Organization",
      footer: "DATABRICKS",
    },
    {
      key: "11:30 AM-12:00 PM",
      title: "11:30 AM-12:00 PM",
      description:
        "Succeeding ad Forecasting for a $160B Pharmacy Business With the Lakehouse",
      footer: "CVS HEALTH",
    },
  ],
}

const bigHero = {
  typeWriterMessages: [
    "data warehouse",
    "AI platform",
    "real time analytics solution",
    "data engineering platform",
    "cloud data platform",
  ],
  ctas: [
    { label: "cta 1", to: "/" },
    { label: "cta 2", to: "/" },
  ],
  typeWriterTopText: "The best",
  typeWriterBottomText: "is a lakehouse",
  typeWriterPauseTime: 2800,
  typeWriterDelayTime: 90,
  lottie: { animationSrc: "/static/images/home-heroAnimation-looping.json" },
  fallbackImage: {
    src: "/static/images/home-heroAnimation-staticFallback-right.png",
    alt: "",
  },
  description:
    "<h3>Unify all your data, analytics and </br> AI on one platform</h3>",
  backgroundImage: { src: "/static/images/grid-bg.svg", alt: "" },
}

const blogBody = `<div>
<p>Databricks customers, regardless of size and industry, are increasingly seeking to unify their data onto a single platform. To do this, they need a simple, scalable and performant solution for moving data that resides in systems of record and operational data stores – whether in the cloud or on premises – to the <a href="https://www.databricks.com/product/data-lakehouse" target="_blank" rel="noopener">Databricks Lakehouse Platform</a>. They also need to sync this data in real-time to enable the processing of business-critical analytics and machine learning workloads on the freshest possible data. Since traditional databases provide little interconnectivity, customers often have to invest months of time and development effort to build their own custom data pipelines that support business-critical needs.</p>
<br /><p>We recently established <a href="https://www.databricks.com/databricks-ventures" target="_blank" rel="noopener">Databricks Ventures</a> to support companies that share our view on the future of data and AI. We’ve already announced investments via the Lakehouse Fund in several innovative startups that are helping drive business-critical use cases for our customers, such as <a href="https://www.databricks.com/blog/2022/01/27/investing-in-ticksmith-enabling-an-e-commerce-data-experience-with-open-data-exchange.html" target="_blank" rel="noopener">TickSmith</a> (open data exchange for e-commerce) and <a href="https://www.databricks.com/blog/2022/01/25/hunters-and-databricks-ventures-partner-for-advanced-security-on-the-lakehouse.html" target="_blank" rel="noopener">Hunters</a> (advanced security on the lakehouse).</p>
<br /><p>Today, we’re thrilled to add to this portfolio of game-changing companies with our new investment in <a href="http://www.arcion.io/" target="_blank" rel="noopener">Arcion</a>, the cloud-native, zero-code data mobility platform. Databricks first got to know the Arcion team a year ago. Since then, our two companies have been building toward a tight partnership focused on enabling real-time data sync with the lakehouse. From the start, we were impressed by Arcion’s fast, low-impact data replication technology and ability to deliver high-performance, high-volume data streaming for some of the most demanding enterprise customers. Arcion’s capabilities have expanded over the past year to support ingestion and replication of more than a dozen popular enterprise-class data stores, including Oracle, SyBase and MySQL, into Databricks. Together, Arcion and Databricks will help customers quickly connect their data sources to the lakehouse at scale, unifying their data, analytics and AI workloads onto one simple platform.</p>
<br /><p>This is just the beginning of what we know will be a powerful partnership between Databricks and Arcion. In the future, our joint customers can expect to see enhanced <a href="http://www.arcion.io/partners/databricks" target="_blank" rel="noopener">integrations</a> and support for the Databricks Lakehouse, including Arcion’s availability within <a href="https://www.databricks.com/blog/2021/11/18/now-generally-available-introducing-databricks-partner-connect-to-discover-and-connect-popular-data-and-ai-tools-to-the-lakehouse.html" target="_blank" rel="noopener">Databricks Partner Connect</a>. Look out for additional announcements later this calendar year.</p>
</div>`

const codeSnippet = `from pyspark.ml.feature import Word2Vec

with mlflow.start_run(run_name='shopping_trips') as run:

 word2Vec_model = Word2Vec()
   .setVectorSize(255)
   .setWindowSize(3)
   .setMinCount(5)
   .setInputCol('walks')
   .setOutputCol(vectors)
   .fit(shopping_trips)

  mlflow.spark.log_model(word2Vec_model, "model")`

const blogHead = {
  title: `How Gemini Built a Cryptocurrency Analytics Platform Using Lakehouse for Financial Services`,
  metadata: `<p class="mb-1">by <a href="/">Sri Ghattamaneni</a>, <a href="/">Anil Kovvuri</a> and <a href="/">Sriram Rajappa</a></p> <p>February 15, 2022 in <a href="/">Platform Blog</a></p>`,
  avatars: [
    {
      src: "/static/images/sri-g-1.jpeg",
      alt: "author name",
      to: "/1",
    },
    {
      src: "/static/images/avatar.png",
      alt: "author name",
      to: "/2",
    },
    {
      src: "/static/images/sri-rajappa.jpeg",
      alt: "author name",
      to: "/3",
    },
  ],
}

const breadcrumbsNavigation = {
  items: [
    {
      id: "1",
      text: "Company",
      to: "https://www.databricks.com/blog",
    },
    {
      id: "2",
      text: "Partners",
      to: "https://www.databricks.com/blog/category/company",
    },
    {
      id: "3",
      text: "Technology Partner Program Program",
      to: "https://www.databricks.com/blog/category/company/culture",
    },
    {
      id: "4",
      text: "Hypothetical Item",
      to: "https://www.databricks.com/blog",
    },
  ],
}

const breadcrumbs = {
  items: [
    {
      text: "All",
      to: "https://www.databricks.com/blog",
    },
    {
      text: "Company Blog",
      to: "https://www.databricks.com/blog/category/company",
    },
    {
      text: "Culture",
      to: "https://www.databricks.com/blog/category/company/culture",
    },
  ],
}

const carousel = [
  {
    src: "/static/images/Forbes_US_BESU2021_Siegel_white_s.svg",
    alt: "Siegel",
  },
  {
    src: "/static/images/fortunebesttechnology2021.jpg",
    alt: "Fortune Best",
  },
  {
    src: "/static/images/enterprise-tech-30-1.png",
    alt: "Enterprise",
  },
  {
    src: "/static/images/award-techfast500.png",
    alt: "Techfast",
  },
  {
    src: "/static/images/award-linkedin2019.png",
    alt: "LinkedIn",
  },
  {
    src: "/static/images/Great-place-to-work-certified-2021-min.jpg",
    alt: "Place to work",
  },
]

const ctas = {
  text: `Try Databricks for free`,
  ctas: [
    { to: "/", text: "Get started" },
    { to: "/", text: "Learn more" },
  ],
}

const quotes = [
  {
    text: "“At Databricks, the opportunity to work on such an innovative product is only outweighed by the people I get to work with. I’m constantly learning from people on all sides of the business — not only through work, but also at monthly board game nights and Women of Databricks events.”",
    author: "— Anna Shrestinian, Senior Product Manager",
  },
  {
    text: "“Our customers use the Databricks platform to build cutting edge AI, Machine Learning and Analytical solutions that make the lives of people easier. The experience has been fantastic and the learning curve, exponential.”",
    author: "— Sohan Shah, Senior Customer Success Engineer",
  },
  {
    text: "“The knowledge that I will be working alongside and challenged by an outstanding team of super bright and focused experts in their field, gets me excited. Being able to contribute to the creation of the Databricks EMEA business, has offered me an outstanding opportunity to develop further as a leader, for which I’m very thankful.”",
    author: "— Nick Cochran, VP Customer Success (LDN)",
  },
  {
    text: "“To be given the opportunity to help scale the company internationally with the brightest people in the industry is incredible. I've learned from and built friendships with people across different teams globally.”",
    author: "— Yvette Ramirez, Jr. Recruiter (AMS)",
  },
  {
    text: "“I feel incredibly lucky to work with such driven and collaborative teammates to help organizations provide better service to their customers, optimize patient care, fight cyber bullying and more by getting them started on some of the best technology out there.”",
    author: "— Caryl Yuhas, Sr. Manager Field Engineering",
  },
]

const ctaImageBlock = [
  {
    image: {
      src: "/static/images/leading-edge-talent.jpg",
      alt: "",
    },
    title: "Cutting-edge work needs leading-edge talent",
    content: `<p>Get trained and certified through Databricks Academy. Learn how to master data  anayltics from the team that started the Spark research project at UC Berkeley.</p>`,
    cta: {
      to: "/",
      label: "Explore opportunities",
    },
  },
  {
    image: {
      src: "/static/images/databricks-university-recruiting.jpg",
      alt: "",
    },
    title: "Databricks University Recruiting",
    content: `<p>We’re committed to learning and development at every level, so it’s important to our teams that we recruit and develop our next generation of Databricks leaders. Our University Program ensures that interns and new college grads play an integral role in developing our platform, while participating in fun events to get to know each other and the larger Databricks team.</p>`,
    cta: {
      to: "/",
      label: "Explore opportunities",
    },
  },
]

const ctaHexImage = {
  title: "Ready to Learn More",
  items: [
    {
      image: {
        src: "/static/images/leading-edge-talent.jpg",
        alt: "",
      },
      title: "Future proof your data management architecture",
      children: `<p>Receive a Lakehouse architecture consultation and a personalized data and AI maturity assessment for your business.</p>`,
      cta: {
        to: "/",
        label: "Learn more",
      },
    },
    {
      image: {
        src: "/static/images/databricks-university-recruiting.jpg",
        alt: "",
      },
      title: "Get a tailored AI/ML plan for your business",
      children: `<p>Our industry experts will work with you to build a personalized framework to enable your enterprise wide AI/ML strategy.</p>`,
      cta: {
        to: "/",
        label: "Learn more",
      },
    },
  ],
  ctas: [
    { to: "/", label: "Personalized demo" },
    { to: "/", label: "Try for free" },
  ],
}

const calloutRow = {
  title: "Ready to learn more?",
  description:
    "We'd love to understand your business goals and how our services team can help you succeed.",
  ctas: [
    { to: "/", label: "Get started" },
    { to: "/", label: "Learn more" },
    { to: "/", label: "Talk to an expert" },
  ],
  graphic: {
    green: "/static/images/graphic-footer-pattern-green.png",
    blue: "/static/images/graphic-footer-pattern-blue.png",
    red: "/static/images/graphic-footer-pattern-red.png",
  },
  image: {
    green: "/static/images/image-footer-green-2.png",
    blue: "/static/images/image-footer-blue-1.png",
    red: "/static/images/image-footer-orange-1.png",
  },
}

const ctaSection = {
  content: `<h3>Be the next success story</h3>`,
  cta: {
    label: "Contact us",
    to: "/",
  },
}

const ctaVideoBlock = [
  {
    image: {
      src: "/static/images/meet-databricks-video.png",
      alt: "",
    },
    video: {
      src: "https://www.youtube.com/embed/lKqro_1i3Zs",
      title: "Embedded youtube",
    },
    content: `Powered by Delta Lake, the Databricks Lakehouse combines the best of data warehouses and data lakes`,
    cta: {
      to: "/",
      label: "See open jobs",
    },
  },
  {
    image: {
      src: "/static/images/what-is-databricks-video.png",
      alt: "",
    },
    video: {
      src: "https://www.youtube.com/embed/EJW2v1g_8vc",
      title: "Embedded youtube",
    },
    content: `Powered by Delta Lake, the Databricks Lakehouse combines the best of data warehouses and data lakes`,
    cta: {
      to: "/",
      label: "See open jobs worldwide",
    },
  },
]

const featureTextBox = {
  description: `Hyperloop is pioneering the fifth mode of transportation. Before they even broke ground, Virgin Hyperloop’s data team built the whole thing out of data. See how.`,
  cta: {
    to: "/",
    label: "Learn more",
  },
  image: {
    src: "/static/images/logo-hyperloop.png",
    alt: "",
  },
}

const footerLanguage = {
  text: "Worldwide",
  items: [
    { label: "English (United States)", to: "/" },
    { label: "Deutsch (Germany)", to: "/de" },
    { label: "Français (France)", to: "/fr" },
    { label: "日本語 (Japan)", to: "/jp" },
    { label: "한국어 (South Korea)", to: "/kr" },
    { label: "Italiano (Italy)", to: "/it" },
    { label: "Português (Brazil)", to: "/br" },
  ],
}

const footer = {
  menus: [
    [
      { label: "Product", to: "/product" },
      { label: "Platform Overview", to: "/product-2" },
      { label: "Pricing", to: "/product-3" },
      { label: "Feature Comparison", to: "/product-4" },
      { label: "Open Source Tech", to: "/produc-t5" },
      { label: "Try Databricks", to: "/product-6" },
      { label: "Demo", to: "/product-7" },
    ],
    [
      { label: "Learn & Support", to: "/learnAndSupport" },
      { label: "Documentation", to: "/learnAndSupport-2" },
      { label: "Online Community", to: "/learnAndSupport-3" },
      { label: "Training & Certification", to: "/learnAndSupport-4" },
      { label: "Help Center", to: "/learnAndSupport-5" },
      { label: "Legal", to: "/learnAndSupport-6" },
    ],
    [
      { label: "Solutions", to: "/solutions" },
      { label: "By Industries", to: "/solutions-2" },
      { label: "Professional Services", to: "/solutions-3" },
      { label: "Feature Comparison", to: "/solutions-4" },
      { label: "Open Source Tech", to: "/solutions-5" },
    ],
    [
      { label: "Company", to: "/company" },
      { label: "About Us", to: "/company-2" },
      { label: "Careers at Databricks", to: "/company-3" },
      { label: "Newsroom", to: "/company-4" },
      { label: "Company Blog", to: "/company-5" },
      { label: "Contact Us", to: "/company-6" },
    ],
  ],
  disclaimer: {
    copyright: `© Databricks 2023. All rights reserved. Apache, Apache Spark, Spark and
    the Spark logo are trademarks of the Apache Software Foundation.`,
    links: [
      { label: "Privacy Policy", to: "/1" },
      { label: "Terms of Use", to: "/2" },
    ],
  },
  regions: {
    careers: {
      image: {
        src: "/static/images/Simple-Administration-1.png",
        alt: "careers",
      },
      info: `<p>
      See Careers
      <br />
      at Databricks
    </p>`,
    },
    about: {
      image: {
        src: "/static/images/databricks_logo_sm.svg",
        alt: "",
      },
      language: footerLanguage,
      info: `<p>
      Databricks Inc. 160 Spear Street, 13th Floor San Francisco, CA
      94105 1-866-330-0121
    </p>`,
    },
  },
}

const footerSimple = [
  { label: "© Databricks 2023" },
  { label: "Privacy policy", to: "/" },
  { label: "Terms of use", to: "/" },
]

const heroCtas = [
  {
    to: "/",
    label: "Get Started",
  },
  {
    to: "/",
    label: "Learn More",
  },
]

const hero = {
  twoColumns: {
    title: "Careers at Databricks",
    content:
      "We’re on a mission. Join us to help data teams solve the world’s toughest problems.",
    image: {
      src: "/static/images/careers-graphic-header.svg",
      alt: "Hero image",
    },
    ctas: heroCtas,
  },
  textHeader: {
    title: "Your Page Title",
    content:
      "<p class='text-gray-text'>Impedit aperiam et. Quaerat voluptas vel molestias quo occaecati nobis. Suscipit est laboriosam qui sed repudiandae. Corrupti perferendis facere tempora.</p>",
    ctas: heroCtas,
    background: "bg-oat-light",
    bottomSpacing: "pb-2.5 md:pb-0",
    topSpacing: "pt-2.5",
  },
  banner: {
    title: "Databricks on AWS 3-part training series",
    content: "Get up to speed with all-new course content available on demand.",
    image: {
      src: "/static/images/aws-databricks-hero-banner.png",
      alt: "Hero image",
    },
    topLabel: "Free training",
    ctas: heroCtas,
  },
  bannerLarge: {
    title: "Thank you for your interest",
    content: "You can watch the webinar now or access it later from your inbox.",
    image: {
      src: "/static/images/thankyou-hero.png",
      alt: "Hero image",
    },
    ctas: [
      {
        to: "/",
        label: "Read now",
      },
    ],
  },
}

const icons = [
  "facebook",
  "facebookRounded",
  "glassdoor",
  "linkedIn",
  "close",
  "menuBars",
  "chevronDown",
  "rss",
  "twitter",
  "youtube",
  "arrowDown",
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "geospatial",
  "plus",
  "minus",
  "acceleratorDb",
  "acceleratorPartner",
  "search",
  "sort",
  "energy",
  "financial",
  "media",
  "healthcare",
  "hourglass",
  "retail",
  "manufacturing",
  "publicSector",
  "technology",
  "refresh",
  "maliciousDocument",
  "dot",
  "vector",
  "unifiedData",
  "partnerSolutions",
  "accelerateOutcomes",
  "collaboration",
  "facebookCircle",
  "play",
  "pause",
  "arrowDrop",
  "quote",
  "dbce",
  "checked",
  "checkboxEmpty",
  "ellipses",
  "transcriptPlay",
  "transcriptPlayActive",
  "plusCircle",
  "minusCircle",
  "linkArrow",
  "databricksLoading",
]

const iconList = [
  { to: "https://www.linkedin.com/company/databricks", icon: "linkedIn" },
  {
    to: "https://www.facebook.com/pages/Databricks/560203607379694",
    icon: "facebook",
  },
  { to: "https://twitter.com/databricks", icon: "twitter" },
  { to: "https://www.databricks.com/feed", icon: "rss" },
  {
    to: "https://www.glassdoor.com/Overview/Working-at-Databricks-EI_IE954734.11,21.htm",
    icon: "glassdoor",
  },
  { to: "https://www.youtube.com/c/Databricks", icon: "youtube" },
]

const innerMenu = [
  { text: "Managed MLflow", to: "/", key: "1" },
  { text: "ML Runtime", to: "/", key: "2" },
  { text: "Model Registry", to: "/", key: "3" },
  { text: "Collaborative Notebooks", to: "/", key: "4" },
  { text: "Feature Store", to: "/", key: "5" },
  { text: "AutoML", to: "/", key: "6" },
  { text: "Explainable AI", to: "/", key: "7" },
  { text: "Repos", to: "/", key: "8" },
]

const accordionList = {
  title: "Agenda",
  data: [
    {
      description: `<p class="font-bold h5">Example of session title that is longer and possibly wraps to a second line</p><p class="font-bold b6">December 22, 10:00AM</p>`,
      children: `<p>Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.</p>
    <ul><li>List #1</li><li>List #2</li><li>List #3</li></ul>`,
      key: 1,
    },
    {
      description: `<p class="font-bold h5">Example of session title that is longer and possibly wraps to a second line</p><p class="font-bold b6">December 22, 10:00AM</p>`,
      children: `<p>Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.</p>
    <ul><li>List #1</li><li>List #2</li><li>List #3</li></ul>`,
      key: 2,
    },
    {
      description: `<p class="font-bold h5">Example of session title that is longer and possibly wraps to a second line</p><p class="font-bold b6">December 22, 10:00AM</p>`,
      children: `<p>Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.</p>
    <ul><li>List #1</li><li>List #2</li><li>List #3</li></ul>`,
      key: 3,
    },
    {
      description: `<p class="font-bold h5">Example of session title that is longer and possibly wraps to a second line</p><p class="font-bold b6">December 22, 10:00AM</p>`,
      children: `<p>Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.</p>
    <ul><li>List #1</li><li>List #2</li><li>List #3</li></ul>`,
      key: 4,
    },
    {
      description: `<p class="font-bold h5">Example of session title that is longer and possibly wraps to a second line</p><p class="font-bold b6">December 22, 10:00AM</p>`,
      children: `<p>Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.</p>
    <ul><li>List #1</li><li>List #2</li><li>List #3</li></ul>`,
      key: 5,
    },
  ],
}

const image = {
  src: "/static/images/CategoryIcon-Company-1.png",
  featuredImageSrc: "/static/images/CategoryHeader-Company-1.png",
  alt: "databricks",
  caption:
    "Ingesting 35TB/day with 365-day lookbacks can potentially cost 10s of millions per year in Splunk Cloud. Databricks can be leveraged for big resources like DNS, Cloud Native, PCAP — all from the comfort of Splunk — without new personnel skillsets needed and at lower costs.",
}

const pagination = {
  previousLink: {
    to: "/",
    label: "Previous Page",
  },
  nextLink: {
    to: "/",
    label: "Next Page",
  },
  children: "Page 2",
}

const playlistVideo = {
  rightVideo: false,
  items: [
    {
      id: "1",
      title: "Diam urna nec suspendisse luctus diam.",
      subtitle: "Episode 1",
      description: "Jane Doe",
      footer: "Chief Analytics Officer, Estée Lauder",
      video: {
        label: "video label",
        to: "https://www.youtube.com/embed/lKqro_1i3Zs",
      },
    },
    {
      id: "2",
      title: "Vel sem in morbi praesent vel. ",
      subtitle: "Episode 2",
      description: "John Doe",
      footer: "Chief Information and Digital Officer, Rolls-Royce",
      video: {
        label: "video label",
        to: "https://www.youtube.com/embed/EJW2v1g_8vc",
      },
    },
    {
      id: "3",
      title: "Media button. Turpis nunc sem a aliquam orci tortor. ",
      subtitle: "Episode 3",
      description: "Jane Doe",
      footer: "Chief Analytics Officer, Estée Lauder",
      video: {
        label: "video label",
        to: "https://www.youtube.com/embed/lKqro_1i3Zs",
      },
      image: {
        src: "/static/images/thankyou-hero.png",
        alt: "",
      },
      mediaButton: true,
    },
    {
      id: "4",
      title: "Suspendisse curabitur lacinia porttitor non.",
      subtitle: "Episode 4",
      description: "John Doe",
      footer: "Chief Information and Digital Officer, Rolls-Royce",
      video: {
        label: "video label",
        to: "https://www.youtube.com/embed/EJW2v1g_8vc",
      },
      image: {
        src: "/static/images/meet-databricks-video.png",
        alt: "",
      },
    },
    {
      id: "5",
      title: "Diam urna nec suspendisse luctus diam.",
      subtitle: "Episode 5",
      description: "Jane Doe",
      footer: "Chief Analytics Officer, Estée Lauder",
      video: {
        label: "video label",
        to: "https://www.youtube.com/embed/lKqro_1i3Zs",
      },
    },
    {
      id: "6",
      title: "Suspendisse curabitur lacinia porttitor non.",
      subtitle: "Episode 4",
      description: "John Doe",
      footer: "Chief Information and Digital Officer, Rolls-Royce",
      video: {
        label: "video label",
        to: "https://www.youtube.com/embed/EJW2v1g_8vc",
      },
      image: {
        src: "/static/images/meet-databricks-video.png",
        alt: "",
      },
    },
    {
      id: "7",
      title: "Diam urna nec suspendisse luctus diam.",
      subtitle: "Episode 5",
      description: "Jane Doe",
      footer: "Chief Analytics Officer, Estée Lauder",
      video: {
        label: "video label",
        to: "https://www.youtube.com/embed/lKqro_1i3Zs",
      },
    },
  ],
}

const promotion = [
  {
    src: "/static/images/Blog-promo-image.png",
    alt: "",
  },
  {
    src: "/static/images/performance-tuning-best-practices-ad.jpg",
    alt: "",
  },
  {
    src: "/static/images/2021-11-partners-connect-page-pop-up-500x649-1.jpg",
    alt: "",
  },
]

const stickyNavigation = {
  items: [
    { to: "/", label: "Overview" },
    { to: "#", label: "Open Jobs" },
    { to: "#", label: "How We Work" },
    { to: "#", label: "Benefits" },
    { to: "#", label: "Diversity" },
    { to: "#", label: "For Students" },
    { to: "#", label: "Applying" },
  ],
  cta: {
    to: "/",
    label: "Report an issue",
  },
}

const secondaryNavigation = {
  title: "Categories",
  links: [
    {
      label: "All Blog Posts",
      to: "https://www.databricks.com/blog",
    },
    {
      label: "Company",
      to: "https://www.databricks.com/blog/category/company",
      links: [
        {
          label: "Culture",
          to: "https://www.databricks.com/blog/category/company/culture",
          current: true,
        },
        {
          label: "Customers",
          to: "https://www.databricks.com/blog/category/company/customers",
        },
        {
          label: "Events",
          to: "https://www.databricks.com/blog/category/company/events",
        },
        {
          label: "News",
          to: "https://www.databricks.com/blog/category/company/news",
        },
      ],
    },
    {
      label: "Platform",
      to: "https://www.databricks.com/blog/category/platform",
      links: [
        {
          label: "Announcements",
          to: "https://www.databricks.com/blog/category/platform/announcements",
        },
        {
          label: "Partners",
          to: "https://www.databricks.com/blog/category/platform/partners",
        },
        {
          label: "Product",
          to: "https://www.databricks.com/blog/category/platform/product",
        },
        {
          label: "Solutions",
          to: "https://www.databricks.com/blog/category/platform/solutions",
        },
        {
          label: "Security and Trust",
          to: "https://www.databricks.com/blog/category/platform/security-and-trust",
        },
      ],
    },
    {
      label: "Engineering",
      to: "https://www.databricks.com/blog/category/engineering",
      links: [
        {
          label: "Data Science and ML",
          to: "https://www.databricks.com/blog/category/engineering/data-science-machine-learning",
        },
        {
          label: "Open Source",
          to: "https://www.databricks.com/blog/category/engineering/open-source",
        },
        {
          label: "Solutions Accelerators",
          to: "https://www.databricks.com/blog/category/engineering/solution-accelerators",
        },
        {
          label: "Data Engineering",
          to: "https://www.databricks.com/blog/category/engineering/data-engineering",
        },
        {
          label: "Tutorials",
          to: "https://www.databricks.com/blog/category/engineering/tutorials",
        },
      ],
    },
    {
      label: "Data + AI",
      to: "https://www.databricks.com/blog/category/data-and-ai",
      links: [
        {
          label: "Best Practices",
          to: "https://www.databricks.com/blog/category/data-and-ai/best-practices",
        },
        {
          label: "Data Leader",
          to: "https://www.databricks.com/blog/category/data-and-ai/data-leader",
        },
        {
          label: "Industry Insights",
          to: "https://www.databricks.com/blog/category/data-and-ai/industry-insights",
        },
      ],
    },
  ],
}

const inlineNavigation = {
  samePageNested: [
    { label: "Introduction", to: "#el1" },
    {
      label: "Quick Lorem ipsum dolor sit amet sonsecteur",
      to: "#el2",
      links: [
        { label: "Overview", to: "#el2-1" },
        { label: "Datasets", to: "#el2-2" },
        { label: "Machine Learning", to: "#el2-3" },
      ],
    },
    { label: "Dataframes", to: "#el3" },
    { label: "Datasets", to: "#el4" },
    {
      label: "Machine Learning",
      to: "https://aws.amazon.com/solutions/partners/databricks/",
    },
  ],
  samePageFlat: [
    { label: "Introduction", to: "#el2-1" },
    { label: "Quick Lorem ipsum dolor sit amet sonsecteur", to: "/product" },
    { label: "Dataframes", to: "www.databricks.com/dataset" },
    { label: "Datasets", to: "/" },
    { label: "Machine Learning", to: "#el2-3" },
  ],
  mixedNested: [
    {
      label: "All Blog Posts",
      to: "https://aws.amazon.com/solutions/partners/databricks/",
    },
    {
      label: "Company",
      to: "/blog/category/company",
      links: [
        {
          label: "All Blog Posts",
          to: "https://www.databricks.com/blog",
        },
        {
          label: "Company",
          to: "/blog/category/company",
        },
        {
          label: "Platform",
          to: "/",
        },
      ],
    },
    {
      label: "Platform",
      to: "/test",
    },
    {
      label: "Engineering",
      to: "https://aws.amazon.com/solutions/partners/databricks/",
    },
    {
      label: "Data + AI",
      to: "https://www.databricks.com/blog/category/data-and-ai",
    },
    {
      label: "Best Practices",
      to: "https://www.databricks.com/blog/category/data-and-ai/best-practices",
    },
    {
      label: "Data Leader",
      to: "https://www.databricks.com/blog/category/data-and-ai/data-leader",
    },
    {
      label: "Industry Insights",
      to: "https://www.databricks.com/blog/category/data-and-ai/industry-insights",
    },
  ],
  internalFlat: [
    {
      label: "All Blog Posts",
      to: "/solutions/partners/databricks/",
    },
    {
      label: "Platform",
      to: "/test",
    },
    {
      label: "Engineering",
      to: "/solutions/partners/databricks/",
    },
    {
      label: "Data + AI",
      to: "/blog/category/data-and-ai",
    },
    {
      label: "Best Practices",
      to: "/blog/category/data-and-ai/best-practices",
    },
    {
      label: "Data Leader",
      to: "/blog/category/data-and-ai/data-leader",
    },
  ],
  externalFlat: [
    {
      label: "All Blog Posts",
      to: "https://aws.amazon.com/solutions/partners/databricks/",
    },
    {
      label: "Company",
      to: "https://aws.amazon.com/blog/category/company",
    },
    {
      label: "Platform",
      to: "https://aws.amazon.com/test",
    },
  ],
}

const sidebar = {
  image: {
    src: "/static/images/db-nav-logo.svg",
    to: "/",
    alt: "go to homepage",
  },
  menus: [
    {
      key: "1",
      divider: true,
      // 1st Level items
      items: [
        {
          label: "Platform",
          key: "Platform",
          to: "/",
          subsidebar: {
            promotion: {
              cta: {
                to: "/",
                text: "Find out more",
                label: "Get Bill Inmon's latest book",
              },
              content:
                "<img src='/static/images/Lakehouse-for-Financial-Services-Ad.jpg' /> <br/> <p>Explore the next generation of data architecture with the father of the data warehouse, Bill Inmon.</p>",
            },
            // 2nd Level menus
            menus: [
              [
                {
                  label: "The Databricks Lakehouse Platform",
                  key: "The Databricks Lakehouse Platform",
                  to: "/",
                  // 3rd Level items
                  items: [
                    {
                      label: "Delta Lake",
                      key: "Delta Lake",
                      to: "/",
                    },
                    {
                      label: "Data Engineering",
                      key: "Data Engineering",
                      to: "/",
                    },
                    {
                      label: "Machine Learning",
                      key: "Machine Learning",
                      to: "/",
                    },
                    {
                      label: "Data Science",
                      key: "Data Science",
                      to: "/",
                    },
                    {
                      label: "SQL Analytics",
                      key: "SQL Analytics",
                      to: "/",
                    },
                    {
                      label: "Platform Security and Administration",
                      key: "Platform Security and Administration",
                      to: "/",
                    },
                  ],
                },
                { label: "Pricing", key: "Pricing", to: "/" },
                {
                  label: "Open source tech",
                  key: "Open source tech",
                  to: "/",
                },
              ],
            ],
          },
        },
        {
          label: "Solutions",
          key: "Solutions",
          to: "/",
          subsidebar: {
            promotion: {
              cta: {
                to: "/",
                text: "Find out more",
                label: "Get Bill Inmon's latest book",
              },
              content:
                "<img src='/static/images/Lakehouse-for-Financial-Services-Ad.jpg' /> <br/> <p>Explore the next generation of data architecture with the father of the data warehouse, Bill Inmon.</p>",
            },
            menus: [
              [
                {
                  key: "By Industry",
                  label: "By Industry",
                  to: "/",
                },
                {
                  key: "By Use Case",
                  label: "By Use Case",
                  to: "/",
                },
                {
                  key: "By Role",
                  label: "By Role",
                  to: "/",
                },
                {
                  key: "Professional Services",
                  label: "Professional Services",
                  to: "/",
                },
              ],
            ],
          },
        },
        {
          label: "Learn",
          key: "Learn",
          to: "/",
          subsidebar: {
            promotion: {
              cta: {
                to: "/",
                text: "Find out more",
                label: "Get Bill Inmon's latest book",
              },
              image: {
                src: "/static/images/Lakehouse-for-Financial-Services-Ad.jpg",
                alt: "Get Bill Inmon's latest book",
              },
              content:
                "<p>Explore the next generation of data architecture with the father of the data warehouse, Bill Inmon.</p>",
            },
            // 2nd Level menus
            menus: [
              [
                {
                  label: "Documentation",
                  key: "Documentation",
                  to: "/",
                },
                {
                  label: "Training & Certification",
                  key: "Training & Certification",
                  to: "/",
                },
                {
                  label: "Notebook Gallery",
                  key: "Notebook Gallery",
                  to: "/",
                },
                { label: "Demos", key: "Demos", to: "/" },
                { label: "Resources", key: "Resources", to: "/" },
                {
                  label: "Online Community",
                  key: "Online Community",
                  to: "/",
                },
                {
                  label: "University Alliance",
                  key: "University Alliance",
                  to: "/",
                },
              ],
              [
                { label: "Events", key: "Events", to: "/" },
                {
                  label: "Data + AI Summit",
                  key: "Data + AI Summit",
                  to: "/",
                },
                { label: "Blog", key: "Blog", to: "/" },
                { label: "Research", key: "Research", to: "/" },
                { label: "Labs", key: "Labs", to: "/" },
                { label: "Beacons", key: "Beacons", to: "/" },
              ],
            ],
          },
        },
        {
          key: "Customers",
          label: "Customers",
          to: "/",
        },
        {
          label: "Partners",
          key: "Partners",
          to: "/",
          subsidebar: {
            promotion: {
              cta: {
                to: "/",
                text: "Find out more",
                label: "Get Bill Inmon's latest book",
              },
              content:
                "<img src='/static/images/Lakehouse-for-Financial-Services-Ad.jpg' /> <br/>  <p>Explore the next generation of data architecture with the father of the data warehouse, Bill Inmon.</p>",
            },
            // 2nd Level menus
            menus: [
              [
                {
                  label: "Cloud Partners",
                  key: "Cloud Partners",
                  to: "/",
                  items: [
                    {
                      key: "AWS",
                      label: "AWS",
                      to: "/",
                    },
                    {
                      key: "AZURE",
                      label: "Azure",
                      to: "/",
                    },
                    {
                      key: "Google Cloud",
                      label: "Google Cloud",
                      to: "/",
                    },
                  ],
                },
                {
                  label: "Partner Connect",
                  key: "Partner Connect",
                  to: "/",
                },
                {
                  label: "Technology Partners",
                  key: "Technology Partners",
                  to: "/",
                  items: [
                    {
                      key: "Technology Partner Program",
                      label: "Technology Partner Program",
                      to: "/",
                    },
                  ],
                },
                {
                  label: "Consulting & SI Partners",
                  key: "Consulting & SI Partners",
                  to: "/",
                },
              ],
            ],
          },
        },
        {
          label: "Company",
          key: "Company",
          to: "/",
          subsidebar: {
            promotion: {
              cta: {
                to: "/",
                text: "Find out more",
                label: "Get Bill Inmon's latest book",
              },
              content:
                "<img src='/static/images/Lakehouse-for-Financial-Services-Ad.jpg' /> <br/>  <p>Explore the next generation of data architecture with the father of the data warehouse, Bill Inmon.</p>",
            },
            // 2nd Level menus
            menus: [
              [
                { label: "About Us", key: "About Us", to: "/" },
                {
                  label: "Careers at Databricks",
                  key: "Careers at Databricks",
                  to: "/",
                },
                { label: "Our Team", key: "Our Team", to: "/" },
                {
                  label: "Board of Directors",
                  key: "Board of Directors",
                  to: "/",
                },
                { label: "Company Blog", key: "Company Blog", to: "/" },
                { label: "Newsroom", key: "Newsroom", to: "/" },
                {
                  label: "Databricks Ventures",
                  key: "Databricks Ventures",
                  to: "/",
                },
                { label: "Contact Us", key: "Contact Us", to: "/" },
              ],
            ],
          },
        },
      ],
    },
    {
      key: "2",
      items: [
        {
          label: "Try databricks",
          to: "/",
          type: "button",
          key: "databricks",
        },
        { label: "Watch Demos", to: "/", type: "text", key: "Demos" },
        { label: "Contact us", to: "/", type: "text", key: "Contact" },
        { label: "Login", to: "/", type: "text", key: "Login" },
      ],
    },
  ],
}

const social = {
  children: "Share this post",
  items: [
    {
      to: "https://www.linkedin.com/shareArticle?mini=true&url=https://databricks.com/blog/2014/01/21/spark-and-hadoop.html&summary=&source=",
      token: "linkedIn",
      label: "LinkedIn",
    },
    {
      to: "https://www.facebook.com/sharer/sharer.php?u=https://databricks.com/blog/2014/01/21/spark-and-hadoop.html",
      token: "facebookRounded",
      label: "Facebook",
    },
    {
      to: "https://twitter.com/intent/tweet?text=https://databricks.com/blog/2014/01/21/spark-and-hadoop.html",
      token: "twitter",
      label: "Twitter",
    },
  ],
}

const teasers = [
  {
    image: {
      src: "/static/images/CategoryIcon-Platform-1.png",
      alt: "databricks",
    },
    key: "1",
    title:
      "How Gemini Built a Cryptocurrency Analytics Platform Using Lakehouse for Financial Services",
    meta: `February 15, 2022<span> by </span><a href="https://www.databricks.com/blog/author/sri-ghattamaneni" title="Posts by Sri Ghattamaneni" rel="author"> Sri Ghattamaneni</a>, <a href="https://www.databricks.com/blog/author/anil-kovvuri" title="Posts by Anil Kovvuri" rel="author">Anil Kovvuri</a> and <a href="https://www.databricks.com/blog/author/sriram-rajappa" title="Posts by Sriram Rajappa" rel="author">Sriram Rajappa</a> in <a href="https://www.databricks.com/blog/category/platform">Platform Blog</a>`,
    children:
      "This blog has been co-authored by Gemini. We would like to thank the Gemini team, Anil Kovvuri and Sriram Rajappa, for their contributions.…",
    link: {
      to: `/`,
      label: `Go to databricks page`,
    },
  },
  {
    image: {
      src: "/static/images/CategoryIcon-Company-1.png",
      alt: "databricks",
    },
    key: "2",
    title:
      "Databricks Ventures Partners With dbt Labs to Welcome Analytics Engineers to the Lakehouse",
    meta: `<div ">February 24, 2022<span> by </span><a href="https://www.databricks.com/blog/author/bilal-aslam" title="Posts by Bilal Aslam" rel="author">Bilal Aslam</a>, <a href="https://www.databricks.com/blog/author/shant-hovsepian" title="Posts by Shant Hovsepian" rel="author">Shant Hovsepian</a>, <a href="https://www.databricks.com/blog/author/robert-saxby" title="Posts by Robert Saxby" rel="author">Robert Saxby</a> and <a href="https://www.databricks.com/blog/author/andrew-ferguson" title="Posts by Andrew Ferguson" rel="author">Andrew Ferguson</a>				in
    <a href=""></a><span><a href="https://www.databricks.com/blog/category/company">Company Blog</a></span>
  </div>`,
    children:
      "Today, we are thrilled to announce Databricks Ventures’ investment in dbt Labs. With this investment, we are proud to support the growth of…",
    link: {
      to: `/`,
      label: `Go to databricks page`,
    },
  },
  {
    image: {
      src: "/static/images/CategoryIcon-Company-2.png",
      alt: "databricks",
    },
    key: "3",
    title:
      "Databricks Ventures Invests in Arcion to Enable Real-Time Data Sync with the Lakehouse",
    meta: `<div>February 17, 2022<span> by </span><a href="https://www.databricks.com/blog/author/andrew-ferguson" title="Posts by Andrew Ferguson" rel="author">Andrew Ferguson</a>				in
    <a href=""></a><span><a href="https://www.databricks.com/blog/category/company/news">News</a></span>
  </div>`,
    children:
      "Databricks customers, regardless of size and industry, are increasingly seeking to unify their data onto a single platform. To do this, they need…",
    link: {
      to: `/`,
      label: `Go to databricks page`,
    },
  },
  {
    image: {
      src: "/static/images/CategoryIcon-DataAI-1.png",
      alt: "databricks",
    },
    key: "4",
    title: "Beyond LDA: State-of-the-art Topic Models With BigARTM",
    meta: `<div>February 16, 2022<span> by </span><a href="https://www.databricks.com/blog/author/srijith-rajamohan-ph-d" title="Posts by Srijith Rajamohan, Ph.D." rel="author">Srijith Rajamohan, Ph.D.</a>				in
    <a href=""></a><span><a href="https://www.databricks.com/blog/category/data-and-ai">Data + AI Blog</a></span>
  </div>`,
    children:
      "This post follows up on the series of posts in Topic Modeling for text analytics. Previously, we looked at the LDA (Latent Dirichlet…",
    link: {
      to: `/`,
      label: `Go to databricks page`,
    },
  },
  {
    image: {
      src: "/static/images/CategoryIcon-Company-3.png",
      alt: "databricks",
    },
    key: "5",
    title:
      "Lakehouse for Financial Services: Paving the Way for Data-Driven Innovation in FSIs",
    meta: `<div>February 15, 2022<span> by </span><a href="https://www.databricks.com/blog/author/antoine-amend" title="Posts by Antoine Amend" rel="author">Antoine Amend</a> and <a href="https://www.databricks.com/blog/author/juntanakai" title="Posts by Junta Nakai" rel="author">Junta Nakai</a>				in
    <a href=""></a><span><a href="https://www.databricks.com/blog/category/company/news">News</a></span>
  </div>`,
    children:
      "When it comes to “data-driven innovation,” financial service institutions (FSI) aren’t what typically come to mind. But with massive amounts of data at…",
    link: {
      to: `/`,
      label: `Go to databricks page`,
    },
  },
]

const textColumns = {
  title: "What unifies us",
  items: [
    "<p>Be customer obsessed</p>",
    "<p>Let the data decide</p>",
    "<p>Own it</p>",
    "<p>Teamwork makes the dream work</p>",
  ],
}

const topHeader = {
  image: {
    src: "/static/images/db-nav-mobile-logo-black.svg",
  },
  to: `/`,
  alt: `Databricks`,
}

const videoEmbed = {
  src: "https://www.youtube.com/embed/EJW2v1g_8vc",
  title: "Embedded youtube",
}

const ctaBlocks = {
  profileExtraSmall: [
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Ali Ghodsi",
      },
      description: `<p class="font-bold mb-0">Ali Ghodsi - 1</p><p class="mb-0">Technical Curriculum Developer</p>`,
    },
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Ali Ghodsi",
      },
      description: `<p class="font-bold mb-0">Ali Ghodsi - 2</p><p class="mb-0">Technical Curriculum Developer</p>`,
    },
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Ali Ghodsi",
      },
      description: `<p class="font-bold mb-0">Ali Ghodsi - 3</p><p class="mb-0">Technical Curriculum Developer</p>`,
    },
  ],
  profileSmall: [
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 1</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
    },
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 2</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
    },
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 3</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
    },
  ],
  profileLarge: [
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 1</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
      summary:
        "Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.",
    },
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 2</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
      summary:
        "Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.",
    },
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 3</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
      summary:
        "Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.",
    },
  ],
  profileGray: [
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 1</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
      summary:
        "Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.",
    },
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 2</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
      summary:
        "Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.",
    },
    {
      image: {
        src: "/static/images/image-portrait-ali-ghodsi.jpg",
        alt: "Image",
      },
      description: `<p class="title">Kate Sullivan - 3</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
      summary:
        "Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.",
    },
  ],
  promo: [
    {
      image: {
        src: "/static/images/The-Delta-Lakes-COVER.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/federal-government",
        text: "Label",
      },
      description: `<p class="title">The Delta Lake Series — Fundamentals and Performance</p><p>Learn about Delta Lake on Databricks, why reliability and performance matter, and how Delta Lake brings these capabilities and more to your data lake.</p>`,
    },
    {
      image: {
        src: "/static/images/The-Delta-Lakes-COVER.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/federal-government",
        text: "Label",
      },
      description: `<p class="title">The Delta Lake Series— Features</p><p>Dive deep into the features of Delta Lake and how those features provide performance, reliability and security — all in an open format.</p>`,
    },
    {
      image: {
        src: "/static/images/The-Delta-Lakes-COVER.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/federal-government",
        text: "Label",
      },
      description: `<p class="title">The Delta Lake Series — Lakehouse</p><p>Understand the lakehouse — get insight into this new architecture and its advantages over previous approaches and how to implement a lakehouse architecture with Delta Lake.</p>`,
    },
    {
      image: {
        src: "/static/images/The-Delta-Lakes-COVER.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/federal-government",
        text: "Label",
      },
      description: `<p class="title">The Delta Lake Series — Streaming</p><p>Uncover how Delta Lake solves common pain points in streaming and simplifies streaming stock data analysis for better customer experiences.</p>`,
    },
    {
      image: {
        src: "/static/images/The-Delta-Lakes-COVER.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/federal-government",
        text: "Label",
      },
      description: `<p class="title">The Delta Lake Series — Customer Use Cases</p><p>Explore a range of customer use cases from healthcare to media to entertainment. And see how customers are using Delta Lake to rapidly innovate.</p>`,
    },
  ],
  tile: [
    {
      image: {
        src: "/static/images/pricing-tile-1.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/federal-government",
        text: "Label",
      },
      eyebrow: "Knowledge base",
      description:
        "<h3 class='font-normal mb-1 h4'>Pay as you go</h3><p class='b4'>Databricks offers you a pay-as-you-go approach with no up-front costs. Only pay for the compute resources you use at per second granularity. Save up to 90% with unused compute capacity through Spot instances.</p>",
    },
    {
      image: {
        src: "/static/images/pricing-tile-2.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/federal-government",
        text: "Label",
      },
      eyebrow: "Community",
      description:
        "<h3 class='font-normal mb-1 h4'>Save more with committed-use discounts</h3><p class='b4'>Databricks helps you lower your costs with discounts when you commit to certain levels of usage. The larger your usage commitment, the greater your discount compared to on-demand usage. You can use spending commitments across multiple clouds.</p>",
    },
  ],
  columns: [
    {
      image: {
        src: "/static/images/HH-SQL-icon-shell.svg",
        alt: "Image",
      },
      eyebrow: "Workshop",
      description: `<p>“Shell has been undergoing a digital transformation as part of our ambition to deliver more and cleaner energy solutions. As part of this, we have been investing heavily in our data lake architecture. Our ambition has been to enable our data teams to rapidly query our massive data sets in the simplest possible way. The ability to execute rapid queries on petabyte-scale data sets using standard BI tools is a game changer for us. Our co-innovation approach with Databricks has allowed us to influence the product roadmap, and we are excited to see this come to market.”</p><p class='text-dark-gray b4 mt-1'>— Dan Jeavons, General Manager — Data Science, Shell</p>`,
    },
  ],
  icon: [
    {
      image: {
        src: "/static/images/HH-SQL-icon-graph.svg",
        alt: "Image",
      },
      description: `<h2 class='b1 mb-1 md:mb-2.5'>Analytics on all your data with your tools of choice</h2>
      <p>Leverage your preferred tools like dbt, Fivetran, PowerBI or Tableau to ingest, query and analyze the most recent and complete data, without having to move it into a separate data warehouse. DB SQL also empowers every analyst across your organization to quickly find and share new insights with the built-in SQL editor, visualizations and dashboards.</p>`,
    },
    {
      image: {
        src: "/static/images/HH-SQL-icon-fingersnap.svg",
        alt: "Image",
      },
      description: `<h2 class='b1 mb-1 md:mb-2.5'>Simplified administration and governance</h2>
      <p>Quickly setup instant, elastic SQL compute decoupled from storage with serverless. Databricks automatically determines instance types and configuration for the best price/performance. Then, easily manage users, data, and resources with endpoint monitoring, query history, and fine-grained governance.</p>`,
    },
    {
      image: {
        src: "/static/images/HH-SQL-icon-graph.svg",
        alt: "Image",
      },
      description: `<h2 class='b1 mb-1 md:mb-2.5'>In-place, lightning-fast analytics on data lake data</h2>
      <p>Leverage your preferred tools like dbt, Fivetran, PowerBI or Tableau to ingest, query and analyze the most recent and complete data, without having to move it into a separate data warehouse. DB SQL also empowers every analyst across your organization to quickly find and share new insights with the built-in SQL editor, visualizations and dashboards.</p>`,
    },
  ],
}

const quoteCombo = {
  content:
    "<p class='b2'>“Donec nibh risus, vulputate sed commodo, rhoncus. Elementum odio consequat imperdiet quis enim tellus, at.“</p>",
  image: {
    src: "/static/images/HH-SQL-icon-shell.svg",
    alt: "Image",
  },
  graphic: {
    src: "/static/images/icn_download_file.svg",
    alt: "Graphic",
  },
  cta: {
    to: "/",
    text: "Label",
  },
  attribution: "<p>— Quote attribution</p>",
}

const cards = {
  simple: [
    {
      image: {
        src: "/static/images/HH-solutions-icon-advertising-and-marketing-technology.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
        text: "Learn more",
      },
      description: "Advertising and Marketing Technology",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-communication-service-providers.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/telco-industry-solutions",
        text: "Learn more",
      },
      description: "Communication Service Providers",
    },
    {
      image: { src: "/static/images/HH-solutions-icon-education.svg", alt: "Image" },
      cta: {
        to: "https://www.databricks.com/solutions/industries/education",
        text: "Learn more",
      },
      description: "Healthcare and Life Sciences",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-energy-and-utilities.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/oil-and-gas",
        text: "Learn more",
      },
      description: "Energy and Utilities",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-federal-government.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/federal-government",
        text: "Learn more",
      },
      description: "Federal Government",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-financial-services.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/financial-services",
        text: "Learn more",
      },
      description: "Financial Services",
    },
    {
      image: { src: "/static/images/HH-solutions-icon-gaming.svg", alt: "Image" },
      link: "https://www.databricks.com/solutions/industries/gaming",
      description: "Gaming",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-healthcare.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/healthcare-and-life-sciences",
        text: "Learn more",
      },
      description: "Healthcare and Life Sciences.",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-manufacturing.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/manufacturing-industry-solutions",
        text: "Learn more",
      },
      description: "Manufacturing",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-media-and-entertainment.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/media-and-entertainment",
        text: "Learn more",
      },
      description: "Communications, Media & Entertainment",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-retail-and-consumer-goods.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/retail-industry-solutions",
        text: "Learn more",
      },
      description: "Retail and consumer goods",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-state-and-local-goverment.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/state-local-government",
        text: "Learn more",
      },
      description: "State and local government",
    },
    {
      image: {
        src: "/static/images/HH-solutions-icon-enterprise-technology-and-software.svg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/technology-and-software",
        text: "Learn more",
      },
      description: "Technology and Software",
    },
  ],
  largeCustomerCard: [
    {
      key: 1,
      description:
        "With 25,000+ electric adventure vehicles on the road, Rivian knows how every vehicle is performing and how it impacts each driver. Equipped with these insights, Rivian is innovating faster, and a character limit of 220.",
      stat: "5000%",
      headline: "Rivian drives on data + AI with a 56 character limit",
      context:
        "increase in platform users in one year leads to a max character count",
      cta: {
        to: "https://www.databricks.com",
        label: "See the full story",
      },
      logo: {
        src: "/static/images/logo-color-walgreens.svg",
        alt: "Walgreens",
      },
      image: {
        src: "/static/images/media-block.png",
        link: "",
      },
    },
    {
      key: 2,
      description:
        "With 25,000+ electric adventure vehicles on the road, Rivian knows how every vehicle is performing and how it impacts each driver. Equipped with these insights, Rivian is innovating faster, and a character limit of 220.",
      stat: "5000%",
      headline: "Rivian drives on data + AI with a 56 character limit",
      context:
        "increase in platform users in one year leads to a max character count",
      cta: {
        to: "https://www.databricks.com",
        label: "See the full story",
      },
      logo: {
        src: "/static/images/logo-color-walgreens.svg",
        alt: "Walgreens",
      },
      image: {
        src: "/static/images/media-block.png",
        link: "",
      },
    },
    {
      key: 3,
      description: "Test of a smaller description",
      stat: "5000%",
      headline: "Rivian drives on data + AI with a 56 character limit",
      context:
        "increase in platform users in one year leads to a max character count",
      cta: {
        to: "https://www.databricks.com",
        label: "See the full story",
      },
      logo: {
        src: "/static/images/logo-color-walgreens.svg",
        alt: "Walgreens",
      },
      image: {
        src: "/static/images/media-block.png",
        link: "",
      },
    },
  ],
  resource: [
    {
      image: {
        src: "/static/images/2022-04-pf-track-target-mofu-demand-forecasting-ty-tn-362x190-2x.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
        text: "Self-guided tour",
      },
      additionalLinks: [
        {
          to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
          title: "Learn More 1",
        },
        {
          to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
          title: "Learn More 2",
        },
        {
          to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
          title: "Learn More 3",
        },
      ],
      description:
        "<p class='h6 text-navy-06'>Report</p><p class='h4 md:mt-1.5 mt-2 text-navy-06 font-bold'>Evaluating Data Science and Machine Learning Platforms</p> <div class='mt-2 md:mt-1.5'>Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>",
    },
    {
      image: {
        src: "/static/images/2022-04-databricks-for-financial-services-ty-tn-362x190-2x.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
        text: "Self-guided tour",
      },
      description:
        "<span class='text-navy-06 h6'>Report</span><p class='h4 md:mt-1.5 mt-2 text-navy-06 font-bold'>Evaluating Data Science and Machine Learning Platforms</p> <div class='mt-2 md:mt-1.5'>Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>",
    },
    {
      image: {
        src: "/static/images/manufacturing-leaders-forum-og-image.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
        text: "Webinar",
      },
      description:
        "<p class='text-navy-06 h6'>Report</p> <p class='h4 md:mt-1.5 mt-2 text-navy-06 font-bold'>Evaluating Data Science and Machine Learning Platforms</p> <div class='mt-2 md:mt-1.5'>Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>",
    },
    {
      image: {
        src: "/static/images/2022-02-VE-Reshaping-Retail-Banking-With-Personalization-OG-1200x628-1.jpg",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
        text: "Webinar",
      },
      description: "FinServ Workshop: Personalization",
    },
    {
      image: {
        src: "/static/images/2022-02-ve-how-to-improve-manufacturings-part-level-forecasting-og-1200x628-1.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
        text: "Webinar",
      },
      description: "Manufacturing Workshop – Part Level Forecasting w/ FiveTran",
    },
    {
      image: {
        src: "/static/images/2022-01-computer-vision-in-me-og-1200x628-1.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
        text: "Webinar",
      },
      description: "M&E Workshop: Computer Vision",
    },
  ],
  tile: [
    {
      image: {
        src: "/static/images/logo-aws.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: "Databricks pricing on AWS",
      id: "tile-1",
    },
    {
      image: {
        src: "/static/images/logo-aws.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/telco-industry-solutions",
      },
      description: "Databricks pricing on Azure",
      id: "tile-2",
    },
    {
      image: {
        src: "/static/images/logo-aws.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/education",
      },
      description: "Databricks pricing on Google Cloud",
      id: "tile-3",
    },
    {
      image: {
        src: "/static/images/logo-aws.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: "Databricks pricing on AWS",
      id: "tile-4",
    },
    {
      image: {
        src: "/static/images/logo-aws.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/telco-industry-solutions",
      },
      description: "Databricks pricing on Azure",
      id: "tile-5",
    },
    {
      image: {
        src: "/static/images/logo-aws.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/education",
      },
      description: "Databricks pricing on Google Cloud",
      id: "tile-6",
    },
  ],
  icon: [
    {
      image: {
        src: "/static/images/microsoft-azure-logo-1.png",
        alt: "Image",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p>“Databricks delivered the time to market as well as the analytics and operational uplift that we needed in order to be able to meet the new demands of the healthcare sector.”</p><p>– Peter James, Chief Architect, Healthdirect Australia</p>`,
    },
    {
      image: {
        src: "/static/images/microsoft-azure-logo-1.png",
        alt: "Image",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p>“ Databricks delivered the time to market as well as the analytics and operational uplift that we needed in order to be able to meet the new demands of the healthcare sector.”</p><p>– Peter James, Chief Architect, Healthdirect Australia</p>`,
    },
    {
      image: {
        src: "/static/images/microsoft-azure-logo-1.png",
        alt: "Image",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p>“Databricks delivered the time to market as well as the analytics and operational uplift that we needed in order to be able to meet the new demands  of the healthcare sector.”</p><p>– Peter James, Chief Architect, Healthdirect Australia</p>`,
    },
    {
      image: {
        src: "/static/images/microsoft-azure-logo-1.png",
        alt: "Image",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p>“Databricks delivered the time to market as well as the analytics and operational uplift that we needed in order to be able to meet the new demands  of the healthcare sector.”</p><p>– Peter James, Chief Architect, Healthdirect Australia</p>`,
    },
  ],
  iconSmall: [
    {
      image: {
        src: "/static/images/iconsmall.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p>Reliable data engineering</p>`,
    },
    {
      image: {
        src: "/static/images/iconsmall.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p>Collaborative data science</p>`,
    },
    {
      image: {
        src: "/static/images/iconsmall.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p>SQL Analytics on all your data</p>`,
    },
    {
      image: {
        src: "/static/images/iconsmall.png",
        alt: "Image",
      },
      cta: {
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p>Production on machine learning</p>`,
    },
  ],
  assetPromo: [
    {
      image: {
        src: "/static/images/logo-color-aws.png",
        alt: "Image",
      },
      cta: {
        text: "Download now",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description:
        "<h2 class='h4 font-bold mb-1'>Your short promotional title</h2><p class='b4'>Get the free eBook to learn how to make filler copy work for you.</p>",
      id: "tile-1",
    },
    {
      image: {
        src: "/static/images/pricing-logo-google-cloud.svg",
        alt: "Image",
      },
      cta: {
        text: "Download now",
        to: "https://www.databricks.com/solutions/industries/telco-industry-solutions",
      },
      description: "Databricks pricing on Azure",
      id: "tile-2",
    },
    {
      image: {
        src: "/static/images/pricing-logo-microsoft-azure-stacked.svg",
        alt: "Image",
      },
      cta: {
        text: "Download now",
        to: "https://www.databricks.com/solutions/industries/education",
      },
      description: "Databricks pricing on Google Cloud",
      id: "tile-3",
    },
    {
      image: {
        src: "/static/images/logo-color-aws.png",
        alt: "Image",
      },
      cta: {
        text: "Download now",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: "Databricks pricing on AWS",
      id: "tile-4",
    },
    {
      image: {
        src: "/static/images/pricing-logo-google-cloud.svg",
        alt: "Image",
      },
      cta: {
        text: "Download now",
        to: "https://www.databricks.com/solutions/industries/telco-industry-solutions",
      },
      description: "Databricks pricing on Azure",
      id: "tile-5",
    },
    {
      image: {
        src: "/static/images/pricing-logo-microsoft-azure-stacked.svg",
        alt: "Image",
      },
      cta: {
        text: "Download now",
        to: "https://www.databricks.com/solutions/industries/education",
      },
      description: "Databricks pricing on Google Cloud",
      id: "tile-6",
    },
  ],
  partnerSolutionCard: [
    {
      image: {
        src: "/static/images/logo-gray-devon-energy.svg",
        alt: "agl",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/company/partners/consulting-and-si/partner-solutions",
      },
      eyebrow: "financial services",
      title: "Migrate Legacy Cards and Core Banking Portfolios",
      id: "1",
    },
    {
      image: {
        src: "/static/images/logo-color-capgemini.png",
        alt: "capgemini",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/company/partners/consulting-and-si/partner-solutions",
      },
      eyebrow: "financial services",
      title: "Migrate Legacy Cards",
      id: "2",
    },
    {
      image: {
        src: "/static/images/logo-color-agl.png",
        alt: "agl",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/company/partners/consulting-and-si/partner-solutions",
      },
      eyebrow: "COMMUNICATIONS, MEDIA AND ENTERTAINMENT",
      title: "Migrate Legacy Cards and Core Banking Portfolios",
      id: "3",
    },
    {
      image: {
        src: "/static/images/pricing-logo-microsoft-azure-stacked.svg",
        alt: "capgemini",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/company/partners/consulting-and-si/partner-solutions",
      },
      eyebrow: "financial services",
      title: "Migrate Legacy Cards and Core Banking Portfolios",
      id: "4",
    },
  ],
  iconLeft: [
    {
      image: {
        src: "/static/images/icon-orange-energy.png",
        alt: "Image",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p class="h4 font-bold">Collaborative Notebooks 1</p><p class="mt-4">Databricks notebooks natively support Python, R, SQL, and Scala so practitioners can work together with the languages and libraries of their choice to discover, visualize and share insights</p>`,
    },
    {
      image: {
        src: "/static/images/icon-orange-energy.png",
        alt: "Image",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p class="h4 font-bold">Collaborative Notebooks 2</p><p class="mt-4">Databricks notebooks natively support Python, R, SQL, and Scala so practitioners can work together with the languages and libraries of their choice to discover, visualize and share insights</p>`,
    },
    {
      image: {
        src: "/static/images/icon-orange-energy.png",
        alt: "Image",
      },
      cta: {
        text: "Learn more",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p class="h4 font-bold">Collaborative Notebooks 3</p><p class="mt-4">Databricks notebooks natively support Python, R, SQL, and Scala so practitioners can work together with the languages and libraries of their choice to discover, visualize and share insights</p>`,
    },
  ],
  iconLeftLocalized: [
    {
      image: {
        src: "/static/images/icon-orange-energy.png",
        alt: "Image",
      },
      cta: {
        text: "En savoir plus",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p class="h4 font-bold">Carnets collaboratifs 1</p><p class="mt-4">Les carnets Databricks prennent en charge nativement Python, R, SQL et Scala, ce qui permet aux professionnels de travailler ensemble avec les langages et les bibliothèques de leur choix pour découvrir, visualiser et partager des informations</p>`,
    },
    {
      image: {
        src: "/static/images/icon-orange-energy.png",
        alt: "Image",
      },
      cta: {
        text: "En savoir plus",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p class="h4 font-bold">Carnets collaboratifs 2</p><p class="mt-4">Les carnets Databricks prennent en charge nativement Python, R, SQL et Scala, ce qui permet aux professionnels de travailler ensemble avec les langages et les bibliothèques de leur choix pour découvrir, visualiser et partager des informations</p>`,
    },
    {
      image: {
        src: "/static/images/icon-orange-energy.png",
        alt: "Image",
      },
      cta: {
        text: "En savoir plus",
        to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      },
      description: `<p class="h4 font-bold">Carnets collaboratifs 3</p><p class="mt-4">Les carnets Databricks prennent en charge nativement Python, R, SQL et Scala, ce qui permet aux professionnels de travailler ensemble avec les langages et les bibliothèques de leur choix pour découvrir, visualiser et partager des informations</p>`,
    },
  ],
  accelerator: [
    {
      badges: ["featured", "new", "hot"],
      partner: "databricks",
      image: {
        src: "/static/images/careers-graphic-header.svg",
        alt: "picture",
      },
      content:
        "Building forward-looking intelligence with external data and a third line here and maybe even a fourth",
    },
    {
      badges: ["featured", "new", "hot"],
      partner: "databricks",
      image: {
        src: "/static/images/careers-graphic-header.svg",
        alt: "picture",
      },
      content:
        "Building forward-looking intelligence with external data and a third line here and maybe even a fourth",
    },
    {
      badges: ["featured", "new", "hot"],
      partner: "databricks",
      image: {
        src: "/static/images/careers-graphic-header.svg",
        alt: "picture",
      },
      content:
        "Building forward-looking intelligence with external data and a third line here and maybe even a fourth",
    },
  ],
  drawer: [
    {
      eyebrow: "On-Demand Video",
      cta: {
        to: "www.google.com",
      },
      image: {
        src: "/static/images/image-footer-blue-1.png",
        alt: "Image",
      },
      title:
        "Card title goes here and might sometime be pretty annoyingly long, like really longer that expected",
      smallDescription:
        "In this demo, you’ll see how to go from zero to 100 on AWS, starting from initial setup all the way to running your first ML notebook. way to running your first ML notebook.",
      largeDescription:
        "In this demo, you’ll see how to go from zero to 100 on AWS, starting from initial setup all the way to running your first ML notebook. way to running your first ML notebook.",
      videoSrc: "https://www.youtube.com/embed/lKqro_1i3Zs",
      videoTime: "6:34",
    },
    {
      eyebrow: "On-Demand Video",
      cta: {
        to: "www.google.com",
      },
      image: {
        src: "/static/images/HH-solutions-icon-advertising-and-marketing-technology.svg",
        alt: "Image",
      },
      title:
        "Card title goes here and might sometime be pretty annoyingly long, like really longer that expected",
      smallDescription:
        "Your card description goes here, and should be truncated after a three line maximum. Your card description goes here, and should be truncated after a three line maximum. Your card description goes here, and should be truncated after a three line maximum.",
      largeDescription:
        "In this demo, you’ll see how to go from zero to 100 on AWS, starting from initial setup all the way to running your first ML notebook. way to running your first ML notebook.",
      videoSrc: "https://www.youtube.com/embed/lKqro_1i3Zs",
      videoTime: "6:34",
    },
    {
      eyebrow: "On-Demand Video",
      cta: {
        to: "www.google.com",
      },
      image: {
        src: "/static/images/graphic-card-4cl-report.png",
        alt: "Image",
      },
      title:
        "Card title goes here and might sometime be pretty annoyingly long, like really longer that expected",
      smallDescription:
        "Your card description goes here, and should be truncated after a three line maximum.",
      largeDescription:
        "In this demo, you’ll see how to go from zero to 100 on AWS, starting from initial setup all the way to running your first ML notebook. way to running your first ML notebook.",
      videoSrc: "https://www.youtube.com/embed/lKqro_1i3Zs",
      videoTime: "6:34",
    },
  ],
}

const publicationCard = {
  eyebrow: "Applications",
  title: "Evaluating Data Science and Machine Learning Platforms",
  description: "D. Karger, H. Balakrishnan, I. Stoica, M.F. Kaashoek, R. Morris",
  linkText: "Learn more",
  linkUrl: "https://www.google.com",
}

const transparentTextCard = [
  {
    headline: "Training and Certification",
    description:
      "Id culpa sit ducimus reprehenderit cupiditate ut aperiam facilis sed. Id culpa sit ducimus reprehenderit cupiditate ut aperiam facilis sed.",
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Learn more",
    },
  },
  {
    headline: "Training and Certification",
    description:
      "Id culpa sit ducimus reprehenderit cupiditate ut aperiam facilis sed. Id culpa sit ducimus ",
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Learn more",
    },
  },
  {
    headline: "Training and Certification",
    description:
      "Id culpa sit ducimus reprehenderit cupiditate ut aperiam facilis sed. Id culpa sit ducimus reprehenderit cupiditate ut aperiam facilis sed.",
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Learn more",
    },
  },
  {
    headline: "Training and Certification",
    description:
      "Id culpa sit ducimus reprehenderit cupiditate ut aperiam facilis sed. Id culpa sit ducimus reprehenderit cupiditate ut aperiam facilis sed.",
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Learn more",
    },
  },
]

const landingPageContent = {
  backgroundImageDesktop: {
    src: "/static/images/bg-landing-desktop.png",
    alt: "",
  },
  backgroundImageTablet: {
    src: "/static/images/bg-landing-tablet.png",
    alt: "",
  },
}

const smallTileCard = [
  {
    id: "",
    to: "",
    image: {
      src: "/static/images/HH-solutions-icon-advertising-and-marketing-technology.svg",
      alt: "Image",
    },
    eyebrow: "EYEBROW",
    title: "Nam pariatur numquam non. Nam pariatur numquam non.",
  },
  {
    id: "",
    to: "",
    image: {
      src: "/static/images/icon-orange-simple.svg",
      alt: "Image",
    },
    eyebrow: "EYEBROW",
    title: "Nam pariatur numquam non. Nam pariatur numquam non.",
    backgroundColor: "orange-100",
  },
  {
    id: "",
    to: "",
    image: {
      src: "/static/images/HH-solutions-icon-advertising-and-marketing-technology.svg",
      alt: "Image",
    },
    eyebrow: "EYEBROW",
    title: "Nam pariatur numquam non. Nam pariatur numquam non.",
  },
  {
    id: "",
    to: "",
    image: {
      src: "/static/images/icon-orange-simple.svg",
      alt: "Image",
    },
    eyebrow: "EYEBROW",
    title: "Nam pariatur numquam non. Nam pariatur numquam non.",
    backgroundColor: "orange-100",
  },
  {
    id: "",
    to: "",
    image: {
      src: "/static/images/HH-solutions-icon-advertising-and-marketing-technology.svg",
      alt: "Image",
    },
    eyebrow: "EYEBROW",
    title:
      "Nam pariatur numquam non. Nam pariatur numquam non. Nam pariatur numquam non. Nam pariatur numquam non.",
  },
  {
    id: "",
    to: "",
    image: {
      src: "/static/images/icon-orange-simple.svg",
      alt: "Image",
    },
    eyebrow: "EYEBROW",
    title: "Nam pariatur numquam non. Nam pariatur numquam non.",
    backgroundColor: "orange-100",
  },
]

const labelAndLinks = {
  title: "Ready to Learn More",
  ctas: [
    { to: "/", label: "Personalized demo" },
    { to: "/", label: "Try for free" },
  ],
}

const legalPageContent = {
  header: "Legal",
  title: "Master Cloud Services Agreement",
  content: `<p>This Master Cloud Services Agreement (the&nbsp;<strong>“MCSA”</strong>) is entered into as of the Effective Date between<br />
  Databricks, Inc. (“<strong>Databricks</strong>” or “<strong>we</strong>“) and&nbsp;<strong>Customer</strong>&nbsp;(as defined below) and governs Customer’s use of the Databricks Services, including the right to access and use the Databricks data processing platform services (the “<strong>Platform Services</strong>“), on each cloud service where Databricks directly provides customers with access to such Platform Services. Please see the Cloud Provider Directory for information relating to these available Cloud Service Providers. For the avoidance of doubt, this Agreement does not govern the use of Databricks Powered Services (as defined below), the use of which is governed by a direct contract between the user and the third party offering the Databricks Powered Service. Unless otherwise indicated, capitalized terms have the meaning assigned to them in this MCSA or in an incorporated Schedule.</p>

  <p>If you are entering into this MCSA on behalf of a company (such as your employer) or other legal entity, you represent and warrant that You are authorized to bind that entity to this MCSA, in which case “Customer,” “you,” or “your” will refer to that entity (otherwise, such terms refer to you as an individual). If you do not have authority to bind Your entity or do not agree with any provision of this MCSA, you must not accept this MCSA and may not use the Databricks Services.</p>

  <p>By accepting this MCSA, either by executing this MCSA, an Order Form, or another agreement that explicitly incorporates this MCSA by reference, Customer, on behalf of itself and any Affiliates, enters into the MCSA and the following Schedules, each of which are incorporated into the MCSA and apply to the provision of the applicable Databricks Services upon your ordering such service:</p>

  <ul>
    <li><a href="https://www.databricks.com/advisory-services-schedule">Advisory Services</a></li>
    <li><a href="https://www.databricks.com/training-services-schedule">Training Services</a></li>
    <li><a href="https://www.databricks.com/us-pub-sector-services">U.S. Public Sector Services</a></li>
  </ul>

  <p>Your Order Form (whether entered into directly with Databricks or through a reseller purchasing via a marketplace or similar authorized model) may include specific terms governing the Databricks Services you have ordered, which may include one or more of the following: (a) the Platform Services, (b) contractual volume-based commitment arrangements applicable to any Platform Services or Databricks Powered Service indicated in an Order Form (“<strong>Universal Usage Commitment</strong>“), (c) support services (“<strong>Support Services</strong>“), (d) training services (the “<strong>Training Services</strong>“), or (e) advisory services (the “<strong>Advisory Services</strong>,” and together with any other services provided by Databricks, (a), (b), (c), (d) and (e) shall be defined as the “<strong>Databricks Services</strong>“). You acknowledge that any Order Form entered into via a reseller is subject to Databricks’ prior approval and agree that no term in any such Order Form will be deemed to modify the Agreement unless pre-authorized in writing by Databricks.</p>

  <ol>
    <li><strong>Definitions.</strong>&nbsp;Certain terms not defined elsewhere in the Agreement are defined below in this Section. Capitalized terms used but not defined in a Schedule or an Order Form will have the meaning assigned to them, if any, within this MCSA.

    <ol>
      <li><strong>“Acceptable Use Policy”</strong>&nbsp;means the acceptable use policy governing the Platform Services, made available at&nbsp;<a href="https://www.databricks.com/databricks.com/aup">databricks.com/aup</a>&nbsp;(or such other location as Databricks may provide, and as may be updated from time to time on notice (which notice may be provided by email or within the Platform Services)).</li>
      <li><strong>“Affiliate”&nbsp;</strong>of a party means an entity that controls, is controlled by, or is under common control with such party.</li>
      <li><strong>“Agreement”&nbsp;</strong>means this MCSA, the referenced Schedules, and any accompanying or future Order Form you enter into under this MCSA.</li>
      <li><strong>“Authorized User”</strong>&nbsp;means employees or agents of Customer or Affiliates (or other individuals solely to the extent explicitly permitted in an Order Form) selected by Customer to access and use the Platform Services.</li>
      <li><strong>“BAA”&nbsp;</strong>means a business associate agreement as defined by HIPAA, governing the parties’ respective obligations with respect to any PHI that may be contained within Customer Content.</li>
      <li><strong>“Beta Service”&nbsp;</strong>means any Databricks Service (or feature of a Databricks Service) that is clearly designated as “beta”, “experimental”, “preview” or similar, that is provided prior to general commercial release, and that Databricks at its sole discretion offers to Customer, and Customer at its sole discretion elects to use.</li>
      <li><strong>“Cloud Environment”&nbsp;</strong>of a party means the cloud or other compute or storage infrastructure controlled by the party and utilized under the Agreement.</li>
      <li><strong>“Cloud Provider Directory”</strong>&nbsp;means information relating to the Cloud Service Providers on which Databricks makes available the Platform Services, located at&nbsp;<a href="https://www.databricks.com/cloud-provider-directory">databricks.com/cloud-provider-directory&nbsp;</a>.</li>
      <li><strong>“Cloud Service Provider”</strong>&nbsp;means a cloud service provider on whose platform Databricks directly provides the Platform Services. For clarity, the Databricks Powered Services are not directly provided by Databricks and are not considered Platform Services in the Agreement.</li>
      <li><strong>“Compute Plane”&nbsp;</strong>means the portion of the applicable Cloud Environment where compute resources of the Platform Services are deployed during use of the Platform Services for the primary processing of Customer Data. In the case of Serverless Compute, the Compute Plane is within the Databricks Cloud Environment (the “<strong>Databricks Compute Plane</strong>”). In all other cases, the Compute Plane is within the Customer Cloud Environment (the “<strong>Customer Compute Plane</strong>”), and in such cases the processing activity results in fees being charged directly to Customer by the Cloud Service Provider. For the avoidance of doubt, none of the terms “Compute Plane”, “Customer Compute Plane” or “Databricks Compute Plane” include Customer’s cloud storage. In certain Databricks agreements and Documentation, the Compute Plane may be interchangeably referred to as the “Data Plane”.</li>
      <li><strong>“Customer Content”&nbsp;</strong>means all Customer Data, Customer Instructional Input, and Customer Results.</li>
      <li><strong>“Customer Data”</strong>&nbsp;means the data, other than Customer Instructional Input, made available by Customer and its Authorized Users for processing within the Platform Services or Support Services.</li>
      <li><strong>“Customer Instructional Input”</strong>&nbsp;means information other than Customer Data that Customer inputs into the Platform Services to direct how the Platform Services process Customer Data, including without limitation the code and any libraries (including third party libraries) Customer utilizes within the Platform Services.</li>
      <li><strong>“Customer Results”</strong>&nbsp;means any output Customer or its Authorized Users generate from their use of the Platform Services.</li>
      <li><strong>“Databricks Control Plane”</strong>&nbsp;means the elements of the Platform Services residing within the Databricks Cloud Environment, other than the Databricks Compute Plane, including without limitation the user interface of the Platform Services.</li>
      <li><strong>“Databricks Global Code of Conduct”</strong>&nbsp;means the Databricks Global Code of Conduct available at&nbsp;<a href="https://www.databricks.com/wp-content/uploads/2022/03/Databricks-Global-Code-of-Conduct.pdf">databricks.com/global-code-of-conduct</a>.</li>
      <li><strong>“Databricks Powered Service”</strong>&nbsp;means any software or service powered by Databricks Runtime that is provided to you under contract between you and a third party, and this Agreement does not amend any term of such contract; the Databricks Powered Services are not considered Databricks Services (and, for the avoidance of doubt, are not considered Platform Services) under the Agreement and Databricks shall have no liability to you relating to your use of the Databricks Powered Services.</li>
      <li><strong>“Databricks Runtime”</strong>&nbsp;means Databricks’ proprietary data processing engine, as further described at&nbsp;<a href="https://docs.databricks.com/runtime/">docs.databricks.com/runtime</a>.</li>
      <li><strong>“Documentation”</strong>&nbsp;means the documentation related to the Platform Services located at&nbsp;<a href="https://www.databricks.com/documentation">databricks.com/documentation</a>&nbsp;(or such other location as Databricks may provide, and as may be updated from time to time).</li>
      <li><strong>“Effective Date”</strong>&nbsp;means the earliest to occur of: the effective date of the initial Order Form that references this MCSA, the date of last signature of the MCSA, or the date you first access or use any Databricks Services.</li>
      <li><strong>“Fees”</strong>&nbsp;means all amounts payable for Databricks Services under an applicable Order Form.</li>
      <li><strong>“HIPAA”</strong>&nbsp;means the Health Insurance Portability and Accountability Act of 1996, as amended and supplemented from time to time.</li>
      <li><strong>“IP Claim”</strong>&nbsp;will have the meaning assigned in Section 6.1 (Indemnification by Databricks).</li>
      <li><strong>“Intellectual Property Rights”</strong>&nbsp;means all worldwide intellectual property rights available under applicable laws including without limitation rights with respect to patents, copyrights, moral rights, trademarks, trade secrets, know-how, and databases.</li>
      <li><strong>“Monthly PAYG Service”</strong>&nbsp;means the Platform Services provided on a month-to-month basis with payment based only on Customer’s usage of the Platform Services during the billing month.</li>
      <li><strong>“Order Form”</strong>&nbsp;means an order form, online order (including click-thru setup of any Databricks Services) or similar agreement for the provision of Databricks Services, entered into by the parties, incorporated by reference into, and governed by, the Agreement.</li>
      <li><strong>“PCI-DSS”</strong>&nbsp;means the Payment Card Industry Data Security Standard.</li>
      <li><strong>“PHI”</strong>&nbsp;means health information regulated by HIPAA or by any similar privacy Law governing the use of or access to health information.</li>
      <li><strong>“Platform Services DPA”</strong>&nbsp;means the Platform Services Data Processing Addendum located at&nbsp;<a href="https://www.databricks.com/databricks.com/dpa">databricks.com/dpa</a>.</li>
      <li><strong>“Security Addendum”</strong>&nbsp;means the Platform Security Addendum located at&nbsp;<a href="https://www.databricks.com/security-addendum">databricks.com/security-addendum</a>&nbsp;(or such other location as Databricks may provide, and as may be updated from time to time in accordance with the Agreement).</li>
      <li><strong>“Schedule”</strong>&nbsp;means any of the schedules referenced herein or otherwise set forth on an Order Form.</li>
      <li><strong>“Serverless Compute”</strong>&nbsp;means a Platform Service where the Compute Plane is located in Databricks’ Cloud Environment rather than in Customer’s Cloud Environment.</li>
      <li><strong>“Service Specific Terms”</strong>&nbsp;means the additional terms applicable to specific Platform Services located at&nbsp;<a href="https://www.databricks.com/databricks.com/service-specific-terms">databricks.com/service-specific-terms</a>&nbsp;or such other location as Databricks may provide, and as may be updated from time to time in accordance with the Agreement by Databricks notifying an administrator user within the Platform Services or disclosing the existence of new or changed Service Specific Terms in the applicable section of the Databricks Release Notes (located in the Documentation); Databricks will provide a means by which Customer may subscribe to receive updates to the Service Specific Terms. Service Specific Terms for new Platform Services will be presented for click-through acceptance by an administrator Authorized User prior to enablement of the new Platform Service.</li>
      <li><strong>“Support Policy”</strong>&nbsp;means the available Support Services plans as described at&nbsp;<a href="https://www.databricks.com/databricks.com/support">databricks.com/support</a>.</li>
      <li><strong>“System”</strong>&nbsp;means any application, computing or storage device, or network.</li>
      <li><strong>“Workspace”</strong>&nbsp;means a Platform Services environment; a Customer may have multiple Workspaces.</li>
    </ol>
    </li>
    <li><strong>Confidentiality.</strong>
    <ol>
      <li><strong>Confidential Information</strong>.&nbsp;<strong>“Confidential Information”</strong>&nbsp;means any business or technical information disclosed by either party to the other that is designated as confidential at the time of disclosure or that, under the circumstances, a person exercising reasonable business judgment would understand to be confidential or proprietary. Without limiting the foregoing, all non-public elements of the Databricks Services are Databricks’ Confidential Information, Customer Content is Customer’s Confidential Information, and the terms of the Agreement and any information that either party conveys to the other party concerning data security measures, incidents, or findings constitute Confidential Information of both parties. Confidential Information will not include information that the receiving party can demonstrate (a) is or becomes publicly known through no fault of the receiving party, (b) is, when it is supplied, already known to whoever it is disclosed to in circumstances in which they are not prevented from disclosing it to others, (c) is independently obtained by whoever it is disclosed to in circumstances in which they are not prevented from disclosing it to others or (d) was independently developed by the receiving party without use of or reference to the Confidential Information.</li>
      <li><strong>Confidentiality.</strong>&nbsp;A receiving party will not use the disclosing party’s Confidential Information except as permitted under the Agreement or to enforce its rights under the Agreement and will not disclose such Confidential Information to any third party except to those of its employees and/or subcontractors who have a bona fide need to know such Confidential Information for the performance or enforcement of the Agreement; provided that each such employee and/or subcontractor is bound by a written agreement that contains use and disclosure restrictions consistent with the terms set forth in this Section 2.2. Each receiving party will protect the disclosing party’s Confidential Information from unauthorized use and disclosure using efforts equivalent to those that the receiving party ordinarily uses with respect to its own Confidential Information of similar nature and in no event using less than a reasonable standard of care; provided, however, that a party may disclose such Confidential Information as required by applicable laws, subject to the party required to make such disclosure giving reasonable notice to the other party to enable it to contest such order or requirement or limit the scope of such request. The provisions of this Section 2.2 will supersede any non-disclosure agreement by and between the parties and/or their Affiliates (whether entered into before, on or after the Effective Date) that would purport to address the confidentiality and security of Customer Content (including ‘customer data’ regardless of how defined) and such agreement will have no further force or effect with respect to Customer Content.</li>
      <li><strong>Equitable Relief.</strong>&nbsp;Each party acknowledges and agrees that the other party may be irreparably harmed in the event that such party breaches Section 2.2 (Confidentiality), and that monetary damages alone cannot fully compensate the non-breaching party for such harm. Accordingly, each party hereto hereby agrees that the non-breaching party will be entitled to seek injunctive relief to prevent or stop such breach, and to obtain specific enforcement thereof. Any such equitable remedies obtained will be in addition to, and not foreclose, any other remedies that may be available.</li>
    </ol>
    </li>
    <li><strong>Intellectual Property.</strong>
    <ol>
      <li><strong>Ownership of the Databricks Services</strong>. Except for the limited licenses expressly set forth in the Agreement, Databricks retains all Intellectual Property Rights and all other proprietary rights related to the Databricks Services. You will not delete or alter the copyright, trademark, or other proprietary rights notices or markings appearing within the Databricks Services as delivered to you. You agree that the Databricks Services are provided on a non-exclusive basis and that no transfer of ownership of Intellectual Property Rights will occur. You further acknowledge and agree that portions of the Databricks Services, including but not limited to the source code and the specific design and structure of individual modules or programs, constitute or contain trade secrets and other Intellectual Property Rights of Databricks and its licensors.</li>
      <li><strong>Ownership of Customer Content</strong>. As between you and Databricks, you retain all ownership or license rights in Customer Content.</li>
      <li><strong>Feedback.</strong>&nbsp;You are under no duty to provide any suggestions, enhancement requests, or other feedback regarding the Databricks Services (“<strong>Feedback</strong>”). If you choose to offer Feedback to Databricks, you hereby grant Databricks a perpetual, irrevocable, non-exclusive, worldwide, fully-paid, sub-licensable, assignable license to incorporate into the Databricks Services or otherwise use any Feedback Databricks receives from you solely to improve Databricks products and services, provided that such Feedback is used in a manner that is not attributable to you. You also irrevocably waive in favor of Databricks any moral rights which you may have in such Feedback pursuant to applicable copyright law. Databricks acknowledges that any Feedback is provided on an “as-is” basis with no warranties of any kind.</li>
    </ol>
    </li>
    <li><strong>Use of the Platform Services.</strong>
    <ol>
      <li><strong>Access and Support</strong>.
      <ol>
        <li><strong>Use Authorization</strong>. If your Order Form includes Platform Services or you have created a Platform Services account through online setup, you and your Authorized Users may, subject to the terms of such Order Form and the Agreement, including any applicable Schedule or addendum, access and use the Platform Services on any permitted Cloud Service Provider solely for your internal business purposes; if such rights have not been expressly provided to you, you may not use the Platform Services and this Section 4 (Use of the Platform Services) does not apply.</li>
        <li><strong>Cloud Service Providers</strong>. A list of, and applicable information relating to the use of the Platform Services on, available Cloud Service Providers is set forth in the Cloud Provider Directory which is incorporated into the Agreement by reference. Databricks may add additional Cloud Service Providers at any time. Instructions on how you may use the Platform Services on the new Cloud Service Provider without needing to enter into a new Order Form may, as applicable, be provided on the Cloud Provider Directory or within a given Order Form.</li>
        <li><strong>Modifications; No Material Diminishment</strong>. Databricks reserves the right to improve or otherwise modify the Platform Services and its System architecture or update the Service Specific Terms or Security Addendum at any time subject to maintaining appropriate industry standards of practice relating to the provision and security of the Platform Services, and provided that any such modification (including any modification to the Service Specific Terms or the Security Addendum) does not materially diminish the core functionality or security of the Platform Services.</li>
        <li><strong>Selecting Authorized Users</strong>. You must obtain separate credentials (e.g., user IDs and passwords) via the Platform Services for each Authorized User and may not permit the sharing of Authorized User credentials.</li>
        <li><strong>Your Responsibilities Regarding Authorized Users</strong>. You will at all times be responsible for and expressly assume the risks associated with all use of the Platform Services under an Authorized User’s account (including for the payment of Fees related to such use), whether such action was taken by an Authorized User or by another party, and whether or not such action was authorized by an Authorized User, provided that such action was not (1) taken by Databricks or by a party acting under the direction of Databricks, or (2) an action by a third party that Databricks should reasonably have prevented. This responsibility includes the security of each Authorized User’s credentials, and you will not share (and will instruct each Authorized User not to share) such credentials with any other person or entity, or otherwise permit any other person or entity to access or use the Platform Services, except to the extent permitted in an Order Form.</li>
        <li><strong>Support Services</strong>. Databricks will provide you with the level of Support Services specified on an Order Form in accordance with the Support Policy. If Support Services are not specified on an Order Form, your support shall be limited to public Documentation and forums.</li>
      </ol>
      </li>
      <li><strong>Use Limits</strong>. You will not, and will not permit your Authorized Users to:
      <ol>
        <li>violate the Acceptable Use Policy or use the Platform Services other than in accordance with the Documentation;</li>
        <li>copy, modify, disassemble, decompile, reverse engineer, or attempt to view or discover the source code of the Platform Services, in whole or in part, or permit or authorize a third party to do so, except to the extent such activities are expressly permitted by the Agreement or by law notwithstanding this prohibition;</li>
        <li>sell, resell, license, sublicense, distribute, rent, lease, or otherwise provide access to the Platform Services to any third party except to the extent explicitly authorized in writing by Databricks;</li>
        <li>use the Platform Services to develop or offer a service made available to any third party that could reasonably be seen to serve as a substitute for such third party’s possible purchase of any Databricks product or service;</li>
        <li>transfer or assign any of your rights hereunder except as permitted under Section 11.4 (Assignment) of the MCSA; or</li>
        <li>during any free trial period granted by Databricks, including during the use of any Beta Service, use the Databricks Services for any purpose other than to evaluate whether to purchase the Databricks Services.</li>
      </ol>
      </li>
      <li><strong>Customer Content</strong>.
      <ol>
        <li><strong>Limits on What Customer Content May Contain</strong>. You agree that you may not include in Customer Data or Customer Instructional Input, or generate any Customer Results that include:
        <ol>
          <li>any data for which you do not have all rights, power and authority necessary for its collection, use and processing as contemplated by the Agreement;</li>
          <li>any data that is prohibited by the Acceptable Use Policy;</li>
          <li>any PHI unless (1) you are processing the PHI in a PHI Permitted Workspace and configure and operate such Workspace in accordance with the Documentation; and (2) you have entered into (a) an Order Form that explicitly permits you to process PHI within the Platform Services, and then only with respect to the Workspace(s) identified in such Order Form (the “<strong>PHI Permitted Workspaces</strong>”); and (b) if you are a Covered Entity or a Business Associate (each as defined under HIPAA), a BAA with Databricks which, upon mutual execution, will be incorporated by reference into and subject to the Agreement. If you have not entered into a BAA with Databricks or if you provide PHI to Databricks other than through the PHI Permitted Workspaces, Databricks will have no liability under the Agreement relating to PHI, notwithstanding anything in the Agreement or in HIPAA or any similar laws to the contrary;</li>
          <li>any cardholder data as defined under PCI-DSS (“<strong>Cardholder Data</strong>”) unless (1) you are processing the Cardholder Data in a PCI Permitted Workspace and configure and operate such Workspace in accordance with the Documentation; and (2) you have entered into an Order Form that (a) specifies Databricks then-current certification status under PCI-DSS; and (b) explicitly permits you to process Cardholder Data within the Platform Services (including specifying the types and quantities of such data) and, and then only with respect to the Workspace(s) identified in such Order Form (the “<strong>PCI Permitted Workspaces</strong>”). If you have not entered into such mutually executed Order Form with Databricks, or if you provide Cardholder Data to Databricks other than through the PCI Permitted Workspaces, Databricks will have no liability under the Agreement relating to Cardholder Data, notwithstanding anything in the Agreement or in PCI-DSS or any similar regulations to the contrary.</li>
        </ol>
        </li>
        <li><strong>Usage Data</strong>. You acknowledge and agree that, notwithstanding anything to the contrary in the Agreement, Databricks may collect usage data and telemetry regarding your Authorized Users’ use of the Platform Services and that such usage data may occasionally contain Customer Instructional Input (e.g., it may contain the queries entered by an Authorized User) but will not contain Customer Data or Customer Results (“<strong>Usage Data</strong>”). Databricks will not share (other than with third parties providing services to Databricks who agree in writing to terms at least as restrictive regarding the processing of Usage Data as those set forth in the Agreement) or publicly make available any Usage Data that identifies Customer, or any of its Authorized Users, other data subjects, or customers, nor use any Usage Data in a manner that derives its value from the unique aspects of your Customer Instructional Input.</li>
      </ol>
      </li>
      <li><strong>Security; Data Protection</strong>.
      <ol>
        <li><strong>Shared Responsibility</strong>. Customer acknowledges that the Platform Services are implemented in a manner that divides the Platform Services between the Customer Cloud Environment and the Databricks Cloud Environment, and that accordingly each party must undertake certain technical and organizational measures in order to protect the Platform Services and the Customer Content. Without limiting the foregoing, Customer acknowledges and agrees that (1) in order to utilize the current Platform Services other than Serverless Compute, Customer must have an account with the applicable Cloud Service Provider; (2) Databricks does not host the Customer Cloud Environment into which certain parts of the Platform Services may be deployed or the Systems in which your Customer Data may be stored (e.g., an AWS S3 bucket); (3) while certain Customer Data may in some cases be present within the Databricks Cloud Environment of the Platform Services (e.g., within the Customer Results), Databricks’ current Platform Services are not designed to archive or permanently retain Customer Data (e.g., they are intended to provide an environment to facilitate Customer’s processing of Customer Data by permitting Customer to execute Customer Instructional Input and view Customer Results); and (4) Databricks’ current Platform Services do not provide backup services to enable recovery of Customer Data. Accordingly, and without limiting the foregoing, Databricks is not responsible for any loss, destruction, alteration, or corruption of Customer Content, except to the extent caused by the gross negligence or willful misconduct of Databricks.</li>
        <li><strong>Different Architectures</strong>. Databricks provides the Platform Services according to different architectural models depending on the specific feature being used by Customer, as further described in the Documentation. Accordingly, Customer acknowledges and agrees that different portions of the Platform Services are and may in the future be subject to Service Specific Terms that provide for different rights and responsibilities of the parties.</li>
        <li><strong>Databricks Responsibilities</strong>. Databricks acknowledges and agrees that, as between the parties and except to the extent caused by the action or intentional or negligent inaction of you or your Authorized Users, including without limitation any customizations or configurations of the Platform Services by you or anything specified to be your responsibility above, Databricks is primarily responsible for the operation (excluding to the extent such operation is directed by the Customer Instructional Input) of the Databricks Cloud Environment (including the user interface of the Platform Services, the Databricks Compute Plane with respect to Serverless Compute, and the portion of the Platform Services within the Databricks Control Plane in which the Customer Instructional Input and Customer Results are held until deleted by you) and, with respect to Platform Services other than Serverless Compute, the Databricks software that operates the computing resources in the Customer Compute Plane. Databricks shall implement reasonable administrative, physical, and technical safeguards to protect the security of the Platform Services and the Customer Content as set forth in the Security Addendum (“<strong>Security Measures</strong>”); and shall, without limiting the foregoing, maintain throughout the term of the Agreement certification to ISO/IEC 27001:2013 or equivalent/greater standards. Additionally, while it is your responsibility to back up Customer Instructional Input, Databricks will, at your reasonable request, provide commercially reasonable assistance with recovery efforts where reasonably possible.</li>
        <li><strong>Customer Responsibilities</strong>. You acknowledge and agree that you are responsible for:
        <p>and Customer expressly assumes the risks associated with the responsibilities set forth above in this Section;</p>

        <ol>
          <li>protecting the security of all your credentials used to access the Platform Services (with Databricks also responsible for taking adequate steps to protect Customer credentials to the extent such credentials are within the control of Databricks);</li>
          <li>securing the Customer Cloud Environment, including without limitation the Customer Compute Plane, and any Customer System (with such steps to include without limitation the regular rotation of access keys and other industry standard steps to preclude unauthorized access);</li>
          <li>backing up Customer Instructional Input (e.g., via Github or other third party System);</li>
          <li>all Customer Instructional Input and any consequences arising from Databricks’ execution of such Customer Instructional Input except to the extent caused by Databricks’ breach of its Security Measures or gross negligence or willful misconduct;</li>
          <li>backing up and securing Customer Data under Customer’s control within the Customer Cloud Environment or other Customer controlled System (e.g., by turning on versioning and encryption within AWS S3);</li>
          <li>configuring the Platform Services in an appropriate way taking into account the sensitivity of the Customer Content that you choose to process using the Platform Services;</li>
          <li>using commercially reasonable efforts to ensure that your Authorized Users review the portions of Documentation relevant to your use of the Platform Services and any security information published by Databricks and referenced therein that is designed to assist you in securing Customer Content;</li>
          <li>complying with your security obligations as set forth in the Agreement, including any applicable Schedule or addendum;</li>
          <li>managing and paying the charges associated with your usage of the Customer Cloud Environment (e.g., compute and storage fees); and</li>
          <li>ensuring that Databricks at all times has updated and accurate contact information for the appropriate person for Databricks to notify regarding data security issues relating to the Databricks Services, with such contact information to be updated in each Order Form and any subsequent changes to be provided by email to&nbsp;<a href="mailto:customercontact@databricks.com">customercontact@databricks.com</a>&nbsp;(with “Contact Detail Change” in the subject)</li>
        </ol>
        </li>
        <li><strong>Platform Services DPA</strong>. Except with respect to a free trial, the terms of the Platform Services DPA are hereby incorporated by reference and shall apply to the extent Customer Content includes Personal Data, as defined in the Platform Services DPA.</li>
      </ol>
      </li>
      <li><strong>Suspension and Termination of Platform Services</strong>.
      <ol>
        <li><strong>Suspension</strong>. Databricks may temporarily suspend any or all Platform Services Workspaces at any time: (i) immediately without notice if Databricks reasonably suspects that you have violated your obligations under Section 4.2 (Use Limits), Section 4.3(a) (Limits on what Customer Content may Contain), Section 4.4(d) (Customer Responsibilities) or Section 10 (Compliance with Laws) in a manner that may cause material harm or material risk of harm to Databricks or to any other party; (ii) upon ten (10) business days’ notice (x) if Databricks reasonably suspects that you have committed any other violation of the terms set forth in the Sections listed above in (i); or (y) you fail to pay undisputed Fees after receiving notice that you are delinquent in payment (or if any third party responsible for making payment on your behalf fails to make such timely payments).</li>
        <li><strong>Termination; Workspace Cancellation</strong>. Databricks may terminate your use of the Platform Services and any Platform Services Workspaces and any applicable Order Form or Schedule for material breach of the Agreement or any applicable Schedule, including without limitation your breach of any of the terms set forth in the Sections listed above in Section 4.5(a)(i), that in each case is either not cured within thirty days of notice of the breach or that by its nature is incapable of cure. If the Agreement or any applicable Order Form or Schedule is terminated for any reason or upon your written request, Databricks may cancel your Workspaces. Upon termination of the Agreement for any reason, you will delete all stored elements of the Platform Services from your Systems.</li>
        <li><strong>Deletion of Customer Content upon Workspace Cancellation</strong>. Databricks will delete all Customer Content contained within a Workspace within thirty (30) days following the cancellation of such Workspace.</li>
        <li><strong>Monthly PAYG Services</strong>. Notwithstanding anything in the Agreement to the contrary, Databricks may suspend or terminate any Monthly PAYG Services Workspace, and delete any Customer Content relating to such Workspace that may be stored within the Platform Services or other Databricks’ Systems, upon thirty (30) day’s prior written notice (email sufficient) if Databricks reasonably determines the account is inactive as set forth in the Acceptable Use Policy.</li>
        <li><strong>Notice</strong>. Notwithstanding Section 11.5 (Notice) of the MCSA, notice under this Section 4.5 (Suspension; Termination) may be provided by email sent to a person the party providing notice reasonably believes to have responsibility for the other party’s activities under the Agreement.</li>
      </ol>
      </li>
    </ol>
    </li>
    <li><strong>Warranties; Remedy.</strong>
    <ol>
      <li><strong>Warranties</strong>. Each party warrants that it is validly entering into the Agreement and has the legal authority to do so. In addition to the warranties provided by the parties as set forth in any applicable Schedule, Databricks warrants that, during the term of any Order Form for Platform Services: (a) the Platform Services will function substantially in accordance with the Documentation; and (b) Databricks will employ commercially reasonable efforts in accordance with industry standards to prevent the transmission of malware or malicious code via the Platform Services.</li>
      <li><strong>Disclaimer</strong>. THE WARRANTIES PROVIDED BY DATABRICKS IN SECTION 5.1 (WARRANTIES) ARE EXCLUSIVE AND IN LIEU OF ALL OTHER WARRANTIES, EXPRESS, IMPLIED OR STATUTORY, REGARDING DATABRICKS AND DATABRICKS’ SERVICES PROVIDED HEREUNDER. DATABRICKS AND ITS LICENSORS SPECIFICALLY DISCLAIM ALL IMPLIED WARRANTIES, CONDITIONS AND OTHER TERMS, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, SATISFACTORY QUALITY OR FITNESS FOR A PARTICULAR PURPOSE. NOTWITHSTANDING ANYTHING TO THE CONTRARY HEREIN: (a) ANY SERVICES PROVIDED UNDER ANY FREE TRIAL PERIOD ARE PROVIDED “AS-IS” AND WITHOUT WARRANTY OF ANY KIND; (b) WITHOUT LIMITATION, DATABRICKS DOES NOT MAKE ANY WARRANTY OF ACCURACY, COMPLETENESS, TIMELINESS, OR UNINTERRUPTABILITY, OF THE PLATFORM SERVICES; (c), DATABRICKS IS NOT RESPONSIBLE FOR RESULTS OBTAINED FROM THE USE OF THE DATABRICKS SERVICES OR FOR CONCLUSIONS DRAWN FROM SUCH USE; AND (d) EXCEPT AS OTHERWISE STATED IN SECTION 4 (USE OF THE PLATFORM SERVICES), DATABRICKS’ REASONABLE EFFORTS TO RESTORE LOST OR CORRUPTED CUSTOMER INSTRUCTIONAL INPUT DESCRIBED THEREIN SHALL BE DATABRICKS’ SOLE LIABILITY AND YOUR SOLE AND EXCLUSIVE REMEDY IN THE EVENT OF ANY LOSS OR CORRUPTION OF CUSTOMER CONTENT IN CONNECTION WITH THE DATABRICKS SERVICES.</li>
      <li><strong>Platform Services Warranty Remedy</strong>. FOR ANY BREACH OF THE WARRANTIES RELATED TO THE PLATFORM SERVICES PROVIDED BY DATABRICKS IN SECTION 5.1 (WARRANTIES), YOUR EXCLUSIVE REMEDY AND DATABRICKS’ ENTIRE LIABILITY WILL BE THE MATERIAL CORRECTION OF THE DEFICIENT SERVICES THAT CAUSED THE BREACH OF WARRANTY, OR, IF WE CANNOT SUBSTANTIALLY CORRECT THE DEFICIENCY IN A COMMERCIALLY REASONABLE MANNER, DATABRICKS WILL END THE DEFICIENT SERVICES AND REFUND TO YOU THE PORTION OF ANY PREPAID FEES PAID BY YOU TO DATABRICKS APPLICABLE TO THE PERIOD FOLLOWING THE EFFECTIVE DATE OF TERMINATION.</li>
    </ol>
    </li>
    <li><strong>Indemnification.</strong>
    <ol>
      <li><strong>Indemnification by Databricks</strong>. Subject to Section 6.5 (Conditions of Indemnification), Databricks will defend Customer against any claim, demand, suit or proceeding made or brought against Customer by a third party (a “<strong>Claim Against Customer</strong>”) alleging that the Databricks Services as provided to Customer by Databricks or Customer’s use of the Databricks Services in accordance with the Documentation and the Agreement infringes or misappropriates such party’s Intellectual Property Rights (an “<strong>IP Claim</strong>”), and will indemnify Customer from and against any damages, attorney fees and costs finally awarded against Customer as a result of, or for amounts paid by Customer under a settlement approved by Databricks in writing of, a Claim Against Customer. Notwithstanding the foregoing, Databricks will have no liability for any infringement or misappropriation claim of any kind if such claim arises from: (a) the public open source version of Apache Spark (located at&nbsp;<a href="https://www.databricks.com/github.com/apache/spark">github.com/apache/spark</a>), if the claim of infringement or misappropriation does not allege with specificity that the infringement or misappropriation arises from the Platform Services (as opposed to Apache Spark itself); (b) the combination, operation or use of the Databricks Services with equipment, devices, software or data (including without limitation your Confidential Information) not supplied by Databricks, if a claim would not have occurred but for such combination, operation or use; or (c) your or an Authorized User’s use of the Databricks Services other than in accordance with the Documentation and the Agreement.</li>
      <li><strong>Other Remedies</strong>. If Databricks receives information about an infringement or misappropriation claim related to a Databricks Service or otherwise becomes aware of a claim that the provision of any of the Databricks Services is unlawful in a particular territory, then Databricks may at its sole option and expense: (a) replace or modify the applicable Databricks Services to make them non-infringing and of substantially equivalent functionality; (b) procure for you the right to continue using the Databricks Services under the terms of the Agreement; or (c) if Databricks is unable to accomplish either (a) or (b) despite using its reasonable efforts, terminate your rights and Databricks’ obligations under the Agreement with respect to such Databricks Services and refund to you any Fees prepaid by you to Databricks for Databricks Services not yet provided.</li>
      <li><strong>Indemnification by Customer</strong>. Subject to Section 6.5 (Conditions of Indemnification), Customer will defend Databricks and its Affiliates and its and each of their officers, employees, directors, and agents (each, a “<strong>Databricks Indemnitee</strong>”) against any claim, demand, suit or proceeding made or brought against a Databricks Indemnitee by a third party (a “<strong>Claim Against Databricks</strong>”) arising from or related to (a) Customer’s use of the Databricks Services in violation of any applicable laws or the Agreement, or (b) Customer Content or its use with the Databricks Services, including without limitation any claim that such Customer Content infringes or misappropriates such party’s Intellectual Property Rights, and will indemnify each Databricks Indemnitee from and against any damages, attorney fees and costs finally awarded against a Databricks Indemnitee as a result of, or for amounts paid by a Databricks Indemnitee under a settlement approved by Customer in writing of, a Claim Against Databricks.</li>
      <li><strong>Sole Remedy</strong>. SUBJECT TO SECTION 6.5 (CONDITIONS OF INDEMNIFICATION) BELOW, THE FOREGOING SECTIONS 6.1 (INDEMNIFICATION BY DATABRICKS) AND 6.2 (OTHER REMEDIES) STATE THE ENTIRE OBLIGATION OF DATABRICKS AND ITS LICENSORS WITH RESPECT TO ANY ALLEGED OR ACTUAL INFRINGEMENT OR MISAPPROPRIATION OF INTELLECTUAL PROPERTY RIGHTS BY THE DATABRICKS SERVICES.</li>
      <li><strong>Conditions of Indemnification</strong>. As a condition to an indemnifying party’s (each, an “<strong>Indemnitor</strong>”) obligations under this Section 6 (Indemnification), a party seeking indemnification (each, an ”<strong>Indemnitee</strong>”) will: (a) promptly notify the Indemnitor of the claim for which the Indemnitee is seeking indemnification (but late notice will only relieve Indemnitor of its obligation to indemnify to the extent that it has been prejudiced by the delay); (b) grant the Indemnitor sole control of the defense (including selection of counsel) and settlement of the claim; (c) provide the Indemnitor, at the Indemnitor’s expense, with all assistance, information and authority reasonably required for the defense and settlement of the claim; and (d) preserve and will not waive legal, professional or any other privilege attaching to any of the records, documents, or other information in relation to such claim without prior notification of consent by the Indemnitor. The Indemnitor will not settle any claim in a manner that does not fully discharge the claim against an Indemnitee or that imposes any obligation on, or restricts any right of, an Indemnitee without the Indemnitee’s prior written consent, which may not be unreasonably withheld or delayed. An Indemnitee has the right to retain counsel, at the Indemnitee’s expense, to participate in the defense or settlement of any claim. The Indemnitor will not be liable for any settlement or compromise that an Indemnitee enters into without the Indemnitor’s prior written consent.</li>
    </ol>
    </li>
    <li><strong>Limitation of Liability.</strong>
    <ol>
      <li>EXCEPT WITH RESPECT TO (I) LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED BY APPLICABLE LAWS, (II) LIABILITY ARISING OUT OF FRAUD OR FRAUDULENT MISREPRESENTATION, OR (III) CUSTOMER’S INDEMNIFICATION OBLIGATIONS, NEITHER PARTY WILL HAVE ANY LIABILITY FOR: (A) INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL LOSS OR DAMAGES; (B) LOST PROFITS OR REVENUE; (C) LOSS FROM DAMAGE TO BUSINESS OR GOODWILL; (D) LOSS OF DATA; OR (E) LOSS ARISING FROM INACCURATE OR UNEXPECTED RESULTS ARISING FROM THE USE OF THE DATABRICKS SERVICES, REGARDLESS OF WHETHER SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSSES OR DAMAGES ARISING.</li>
      <li>SUBJECT TO SECTIONS 7.1, 7.3, 7.4 AND 7.5, EXCEPT WITH RESPECT TO LIABILITY ARISING OUT OF: (I) PERSONAL INJURY OR DEATH CAUSED BY THE NEGLIGENCE OF A PARTY, ITS EMPLOYEES, AFFILIATES, OR AGENTS; (II) DATABRICKS’ INDEMNIFICATION OBLIGATIONS FOR AN IP CLAIM; OR (III) CUSTOMER’S INDEMNIFICATION OBLIGATIONS, IN NO EVENT WILL THE AGGREGATE LIABILITY OF EACH PARTY TOGETHER WITH ALL OF ITS AFFILIATES ARISING OUT OF OR RELATED TO THE AGREEMENT EXCEED THE TOTAL AMOUNT PAID BY CUSTOMER AND ITS AFFILIATES FOR THE DATABRICKS SERVICES GIVING RISE TO THE LIABILITY IN THE TWELVE (12) MONTHS PRECEDING THE FIRST INCIDENT OUT OF WHICH THE LIABILITY AROSE (THE “<strong>GENERAL CAP</strong>”). THE FOREGOING LIMITATION WILL APPLY WHETHER AN ACTION IS IN CONTRACT OR TORT AND REGARDLESS OF THE THEORY OF LIABILITY, BUT WILL NOT LIMIT CUSTOMER’S AND ITS AFFILIATES’ PAYMENT OBLIGATIONS UNDER SECTION 9 (PAYMENT).</li>
      <li>SUBJECT TO SECTIONS 7.1, 7.4 AND 7.5, DATABRICKS’ AGGREGATE LIABILITY FOR ANY CLAIMS OR DAMAGES, DIRECT OR OTHERWISE, ARISING OUT OF OR IN CONNECTION WITH DATABRICKS’ BREACH OF ITS CONFIDENTIALITY OBLIGATIONS (SECTION 2.2) OR, WITH RESPECT TO THE PROVISION BY DATABRICKS OF THE PLATFORM SERVICES (IF APPLICABLE), THE DATA PROTECTION AND SECURITY OBLIGATIONS SET FORTH IN SECTION 4.4(c) (DATABRICKS RESPONSIBILITIES) OR THE PLATFORM SERVICES DPA, WHERE SUCH BREACH RESULTS IN UNAUTHORIZED DISCLOSURE OF CUSTOMER CONTENT, EXCEPT TO THE EXTENT SUCH CLAIMS OR DAMAGES ARE CAUSED BY DATABRICKS’ GROSS NEGLIGENCE OR WILLFUL MISCONDUCT, SHALL BE LIMITED TO TWO (2) TIMES THE GENERAL CAP (“<strong>DATA PROTECTION CLAIMS CAP</strong>”).</li>
      <li>IN NO EVENT SHALL DATABRICKS BE LIABLE FOR THE SAME EVENT UNDER BOTH THE GENERAL CAP AND THE DATA PROTECTION CLAIMS CAP. SIMILARLY, THOSE CAPS SHALL NOT BE CUMULATIVE; IF THERE ARE ONE OR MORE CLAIMS SUBJECT TO EACH OF THOSE CAPS, THE MAXIMUM TOTAL LIABILITY FOR ALL CLAIMS IN THE AGGREGATE SHALL NOT EXCEED THE DATA PROTECTION CLAIMS CAP.</li>
      <li>NOTWITHSTANDING ANYTHING CONTAINED ABOVE, ANY LIABILITY RELATING TO BETA SERVICES OR ANY DATABRICKS SERVICES PROVIDED FREE OF CHARGE, INCLUDING ANY DATABRICKS SERVICES PROVIDED DURING A FREE TRIAL PERIOD, WILL BE LIMITED TO FIVE THOUSAND US DOLLARS (USD $5,000).</li>
    </ol>
    </li>
    <li><strong>Term</strong>
    <ol>
      <li><strong>Term of Agreement.</strong>&nbsp;The Agreement will become effective on the Effective Date and will continue in full force and effect until terminated by either party pursuant to this Section 8 (Term). The Agreement may be terminated (i) by either party on thirty (30) days’ prior written notice if (a) there are no operative Order Forms outstanding or (b) the other party is in material breach of the Agreement and the breaching party fails to cure the breach prior to the end of the notice period; or (ii) by Databricks upon thirty (30) days’ prior written notice following your receipt of a notice that you are delinquent in the payment of undisputed Fees. If the Agreement terminates pursuant to the prior sentence due to Databricks’ material breach, Databricks will refund to you that portion of any prepayments made to Databricks related to Databricks Services not yet provided. Either party can immediately terminate the Agreement if the other becomes insolvent, makes an assignment for the benefit of its creditors, has a receiver, examiner, or administrator of its undertaking of the whole or a substantial part of its assets appointed, or an order is made, or an effective resolution is passed, for its administration, examinership, receivership, liquidation, winding-up or other similar process, or has any distress, execution or other process levied or enforced against the whole or a substantial part of its assets (which is not discharged, paid out, withdrawn or removed within 30 days), or is subject to any proceedings which are equivalent or substantially similar to any of the foregoing under any applicable jurisdiction, or ceases to conduct business or threatens to do so.</li>
      <li><strong>Term of Order Forms.</strong>&nbsp;The Term of an Order Form will be as specified in the Order Form.</li>
      <li><strong>Survival.</strong>&nbsp;All provisions of the Agreement that by their nature should survive termination will so survive.</li>
    </ol>
    </li>
    <li><strong>Payment.</strong>&nbsp;Unless your usage of the Databricks Services is being paid for by a third party under contract with Databricks, you will pay all Fees specified in the applicable Order Form. With respect to direct Order Forms, except as otherwise specified therein: (a) all Fees owed to Databricks will be paid in U.S. Dollars; (b) invoiced payments will be due within 30 days of the date of your receipt of each invoice; (c) Fees for all prepaid committed Databricks Services will be invoiced in full upon execution of the applicable Order Form; and (d) all excess usage will be invoiced monthly in arrears. With respect to an Order Form entered into with a reseller, payment terms will be specified on such Order Form, provided that should you fail to pay Fees when due to a Databricks-authorized reseller, Databricks may seek payment directly from you. All past due payments, except to the extent reasonably disputed, will accrue interest at the highest rate allowed under applicable laws but in no event more than one and one-half percent (1.5%) per month. You will be solely responsible for payment of any applicable sales, value added or use taxes, or similar government fees or taxes.</li>
    <li><strong>Compliance with Laws.</strong>
    <ol>
      <li><strong>By Databricks Generally</strong>. Databricks will provide the Databricks Services in accordance with its obligations under laws and government regulations applicable to Databricks’ provision of the Databricks Services to its customers generally, including, without limitation those related to data protection and data privacy, irrespective of Customer’s particular use of the services.</li>
      <li><strong>By Customer Generally</strong>. You represent and warrant to Databricks that your use of Databricks Services will comply with all applicable laws and government regulations, including without limitation those related to data protection and data privacy.</li>
      <li><strong>Export Controls; Trade Sanctions</strong>. The Databricks Services may be subject to export controls and trade sanctions laws of the United States and other jurisdictions. Customer acknowledges and agrees that it will comply with all applicable export controls and trade sanctions laws, regulations and/or any other relevant restrictions in Customer’s use of the Databricks Services, including that you will not permit access to or use of any Databricks Services in any country where such access or use is subject to a trade embargo or prohibition, and that you will not use Databricks Services in support of any controlled technology, industry, or goods or services without having a valid governmental license, authority, or permission to engage in such conduct. Each party further represents that it is not named on any governmental or quasi-governmental denied party or debarment list that would restrict access to, or use or delivery of, the Databricks Services, including without limitation lists maintained by the U.S. Department of Commerce, U.S. Department of State, U.S. Department of Treasury, or other agency.</li>
      <li><strong>Business Practices; Code of Conduct</strong>. Databricks maintains a set of business practice principles and policies in the Databricks Global Code of Conduct, which employees are required to follow. Databricks will abide by these principles and policies in the conduct of all business for Customer and expects your use of any Databricks Services to be conducted utilizing principles of business ethics and social responsibility and, with respect to any Platform Services, in accordance with Databricks’ Acceptable Use Policy and the applicable Platform Services terms set forth in the Agreement.</li>
    </ol>
    </li>
    <li><strong>General.</strong>
    <ol>
      <li><strong>Governing Law and Venue.</strong>&nbsp;The governing law and exclusive venue applicable to any lawsuit or other dispute arising in connection with the Agreement will be determined by the location of Customer’s principal place of business (“<strong>Domicile</strong>”), as follows:
      <p><strong>Customer’s Domicile</strong><strong>Governing Law</strong><strong>Venue (courts with exclusive jurisdiction)</strong></p>

      <p>CaliforniaCaliforniaSan Francisco (state and U.S. federal courts)</p>

      <p>Americas except California and Canada; Middle East; AfricaDelawareDelaware (state and U.S. federal courts)</p>

      <p>CanadaOntarioToronto</p>

      <p>United KingdomEngland &amp; WalesLondon</p>

      <p>Europe except United Kingdom (including all of Russia and Turkey)IrelandDublin</p>

      <p>Pacific &amp; Asia (excluding Middle East, Australia and New Zealand)SingaporeSingapore</p>

      <p>Australia and New ZealandAustraliaVictoria</p>

      <p>The parties hereby irrevocably consent to the personal jurisdiction and venue of the courts in the venues shown above. In all cases, the application of law will be without regard to, or application of, conflict of law rules or principles, and the United Nations Convention on Contracts for the International Sale of Goods will not apply.</p>
      </li>
      <li><strong>Insurance Coverage.</strong>&nbsp;Databricks will maintain commercially appropriate insurance coverage given the nature of the Databricks Services and Databricks’ obligations under the Agreement. Such insurance will be in an industry standard form with licensed insurance carriers with A.M. Best ratings of A-IX or better, and will include commercially appropriate cyber liability insurance coverage. Upon request, Databricks will provide Customer with certificates of insurance evidencing such coverage.</li>
      <li><strong>Entire Agreement, Construction, Amendment and Execution.</strong>&nbsp;The Agreement (including any referenced Schedule and all Order Forms) is the complete and exclusive understanding and agreement between the parties regarding its subject matter, provided that to the extent Customer uses any Databricks Services subject to Schedules not included in the Agreement, the relevant Schedule in effect at the time of first use at&nbsp;<a href="https://www.databricks.com/mcsa">www.databricks.com/mcsa</a>&nbsp;shall be deemed to govern use of such Databricks Services unless the parties agree otherwise in writing and any reference to a term in such Schedule shall be interpreted accordingly; for the avoidance of doubt, the Agreement does not provide for or govern the acquisition or use of any Databricks Powered Service. To the extent any provision in an Order Form clearly conflicts with a provision of this MCSA, a Schedule, or a provision of an earlier Order Form, the provision in the new Order Form will be binding and the conflicting provision in this MCSA or in the earlier Order Form will be deemed modified solely to the extent reasonably necessary to eliminate the conflict and solely with respect to the new Order Form (unless expressly intended to permanently amend the Agreement including any Schedule). If any provision of the Agreement is held to be unenforceable or invalid, that provision will be enforced to the maximum extent possible, and the other provisions will remain in full force and effect. The headings in the Agreement and the Schedules are solely for convenience and will not be taken into consideration in interpretation of the Agreement. Any translation of the Agreement or an Order Form that is provided as a courtesy shall not be legally binding and the English language version will always prevail. Each party acknowledges and agrees that it has adequate sophistication, including legal representation, to fully review and understand the Agreement; therefore, in interpretation of the Agreement with respect to any drafting ambiguities that may be identified or alleged, no presumption will be given in favor of the non-drafting party. The Agreement may not be modified or amended except by mutual written agreement of the parties. Without limiting the foregoing, no Customer purchase order will be deemed to modify an Order Form or the Agreement or any Schedule unless expressly pre-authorized in writing by Databricks. The Agreement may be executed in two or more counterparts, each of which will be deemed an original and all of which, taken together, will constitute one and the same instrument. A party’s electronic signature or transmission of any document by electronic means will be deemed to bind such party as if signed and transmitted in physical form.</li>
      <li><strong>Assignment.</strong>&nbsp;No assignment, novation or transfer of a party’s rights and obligations under the Agreement (“<strong>Assignment</strong>”) is permitted except with the prior written approval of the other party, which will not be unreasonably withheld; provided, however, that either party may freely make an Assignment to a successor in interest upon a change of control, except that if such Assignment is to a direct competitor of the other party or would cause the other party to become in violation of applicable laws that is not reasonably addressable, such other party may terminate the Agreement upon written notice.</li>
      <li><strong>Notice.</strong>&nbsp;Any required notice under the Agreement will be deemed given when received by letter delivered by nationally recognized overnight delivery service or recorded prepaid mail. Unless notified in writing of a change of address, you will send any required notice to Databricks, Inc., 160 Spear Street, Suite 1300, San Francisco, CA 94105, USA, attention: Legal Department, or to the alternative Databricks Affiliate (if any) identified in an applicable Order Form, and Databricks will send any required notice to you directed to the most recent address you have provided to Databricks for such notice.</li>
      <li><strong>Force Majeure.</strong>&nbsp;Neither party will be liable or responsible to the other party nor be deemed to have defaulted under or breached the Agreement for any failure or delay in fulfilling or performing any term of the Agreement (except for any obligations to make payments to the other party), when and to the extent such failure or delay is caused by or results from acts beyond the impacted party’s (“<strong>Impacted Party</strong>”) reasonable control, including without limitation the following force majeure events (“<strong>Force Majeure Event(s)</strong>“): (a) acts of God, (b) acts of government, including any changes in law or regulations, (c) acts or omissions of third parties, (d) flood, fire, earthquakes, civil unrest, wars, acts of terror, pandemics, or strikes or other actions taken by labor organizations, (e) computer, telecommunications, the Internet, Internet service provider or hosting facility failures or delays involving hardware, software or power systems not within the Impacted Party’s possession or reasonable control, (f) network intrusions or denial of service attacks, or (g) any other cause, whether similar or dissimilar to any of the foregoing, that is beyond the Impacted Party’s reasonable control.</li>
    </ol>
    </li>
  </ol>

  <p>Last Updated March 28, 2022. For earlier versions, please send a request to&nbsp;<a href="mailto:databricks-tos@databricks.com">databricks-tos@databricks.com</a>&nbsp;(with “TOS Request” in the subject).</p>`,
  legalNavigation: {
    title: "Legal",
    links: [
      {
        __typename: "Drupal_MenuLink",
        text: "Terms",
        url: {
          routed: true,
          path: "",
        },
        links: [
          {
            __typename: "Drupal_MenuLink",
            text: "Databricks Master Cloud Services Agreement",
            url: {
              routed: false,
              path: "/mcsa",
            },
            links: [
              {
                __typename: "Drupal_MenuLink",
                text: "Advisory Services",
                url: {
                  routed: false,
                  path: "/advisory-services-schedule",
                },
              },
              {
                __typename: "Drupal_MenuLink",
                text: "Training Services",
                url: {
                  routed: false,
                  path: "/training-services-schedule",
                },
              },
              {
                __typename: "Drupal_MenuLink",
                text: "US Public Sector Services",
                url: {
                  routed: false,
                  path: "/us-pub-sector-services",
                },
              },
              {
                __typename: "Drupal_MenuLink",
                text: "External User Terms",
                url: {
                  routed: false,
                  path: "/external-user-terms",
                },
              },
            ],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Website Terms of Use",
            url: {
              routed: false,
              path: "/terms-of-use",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Community Edition Terms of Service",
            url: {
              routed: false,
              path: "/ce-termsofuse",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Acceptable Use Policy",
            url: {
              routed: false,
              path: "/aup",
            },
            links: [],
          },
        ],
      },
      {
        __typename: "Drupal_MenuLink",
        text: "Privacy",
        url: {
          routed: true,
          path: "",
        },
        links: [
          {
            __typename: "Drupal_MenuLink",
            text: "Privacy Policy",
            url: {
              routed: false,
              path: "/privacypolicy",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Cookie Policy",
            url: {
              routed: false,
              path: "/cookie-policy",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Applicant Privacy Policy",
            url: {
              routed: false,
              path: "/applicant-privacy-policy",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Databricks Subprocessors",
            url: {
              routed: false,
              path: "/databricks-subprocessors",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Privacy FAQs",
            url: {
              routed: false,
              path: "/gdpr-faqs",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Advisory Services Data Processing Addendum",
            url: {
              routed: false,
              path: "/non-platform-dpa",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Platform Services Data Processing Addendum",
            url: {
              routed: false,
              path: "/wp-content/uploads/2021/09/Databricks_Data_Processing_Addendum_25_Sept_2021_FINAL.pdf",
            },
            links: [],
          },
        ],
      },
      {
        __typename: "Drupal_MenuLink",
        text: "Security",
        url: {
          routed: true,
          path: "",
        },
        links: [
          {
            __typename: "Drupal_MenuLink",
            text: "Databricks Security",
            url: {
              routed: false,
              path: "/trust",
            },
            links: [],
          },
          {
            __typename: "Drupal_MenuLink",
            text: "Security Addendum",
            url: {
              routed: false,
              path: "/security-addendum",
            },
            links: [],
          },
        ],
      },
    ],
  },
}

const logos = [
  {
    src: "/static/images/logo-gray-hotels.com_.svg",
    alt: "Hotels.com",
  },
  {
    src: "/static/images/logo-gray-hm-1.svg",
    alt: "H&M",
  },
  {
    src: "/static/images/logo-gray-devon-energy.svg",
    alt: "Devon Energy",
  },
  {
    src: "/static/images/logo-gray-comcast.svg",
    alt: "Comcast",
  },
  {
    src: "/static/images/logo-gray-sams-club.svg",
    alt: "sam's club",
  },
  {
    src: "/static/images/logo-gray-kabbage.svg",
    alt: "Kabbage",
  },
  {
    src: "/static/images/logo-gray-nielsen.svg",
    alt: "Nielsen",
  },
]

const colorLogos = [
  {
    src: "/static/images/logo-color-bose.svg",
    alt: "Bose",
  },
  {
    src: "/static/images/logo-color-8451.svg",
    alt: "841=51",
  },
  {
    src: "/static/images/logo-color-wehkamp.svg",
    alt: "Wehkamp",
  },
  {
    src: "/static/images/logo-color-burberry.svg",
    alt: "Burberry",
  },
  {
    src: "/static/images/logo-color-columbia.svg",
    alt: "Columbia",
  },
  {
    src: "/static/images/logo-color-walgreens.svg",
    alt: "Walgreens",
  },
  {
    src: "/static/images/logo-color-sam's-club.svg",
    alt: "Sam's Club",
  },
  {
    src: "/static/images/logo-color-estee-lauder.svg",
    alt: "Estee Lauder",
  },
  {
    src: "/static/images/logo-color-mars.svg",
    alt: "Mars",
  },
]

const rowsCarousel = {
  logos,
  description: `<p>In addition to the native query and visualization tools, SQL Analytics provides support for all of your existing BI applications. Setting up reliable connections to your Delta Lake tables is simple, and you can integrate your existing authentication solution.</p>`,
  footer: `<p>+ Any other Apache Spark™️ compatible client</p>`,
  className: "gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-10 lg:gap-x-10 lg:gap-y-10",
}

const quote = {
  text: `<p>“Now more than ever, organizations need a data strategy that enables speed and agility to be adaptable. As organizations are rapidly moving their data to the cloud, we’re seeing growing interest in doing analytics on the data lake. Databricks SQL delivers an entirely new experience for customers to tap into insights from massive volumes of data with the performance, reliability and scale they need. We’re proud to partner with Databricks to bring that opportunity to life.”</p>`,
  source: "— Francois Ajenstat, Chief Product Officer, Tableau",
  image: {
    src: "/static/images/logo-color-tableau.png",
    alt: "Tableau",
  },
}

const longFormQuote = {
  text: `Sed vitae egestas malesuada mattis. Quam egestas blandit ornare egestas sed eget turpis morbi.`,
  source: "– Quote attribution (Optional)",
}

const flatIconCards = [
  {
    image: {
      src: "/static/images/icon-flat-icon.svg",
      alt: "icon",
    },
    eyebrow: "Eyebrow",
    title: "Fuel productivity",
    description:
      "Cultivate a data culture that’s innovative and collaborative, where data teams drive business results. Open data sharing ensures the right data goes to the right people at the right time.",
    cta: {
      to: "/",
      label: "Learn more",
    },
  },
  {
    image: {
      src: "/static/images/icon-flat-icon.svg",
      alt: "icon",
    },
    eyebrow: "Eyebrow",
    title:
      "This title is just about the longest length that should be included in the card",
    description:
      "Cultivate a data culture that’s innovative and collaborative, where data teams drive business results. Open data sharing ensures the right data goes to the right people at the right time. Allow everyone in your organization to discover insights from your data in the language of your business.",
    cta: {
      to: "/",
      label: "Learn more",
    },
  },
  {
    image: {
      src: "/static/images/icon-flat-icon.svg",
      alt: "icon",
    },
    title: "Data culture",
    description:
      "Cultivate a data culture that’s innovative and collaborative, where data teams drive business results. Open data sharing ensures the right data goes to the right people at the right time.",
  },
]

const tab = [
  {
    value: `
        The Azure Databricks Lakehouse Platform gives you the best of data lakes and
        data warehouses, on a simple, open and collaborative platform that securely
        integrates with your existing Azure services. In this demo, we cover several
        of the most common Azure Databricks integrations, including Azure Data Lake
        Storage (ADLS), Azure Data Factory (ADF), Azure IoT Hub, Azure Synapse
        Analytics, Power BI and more.
      `,
    label: "Azure Databricks Cloud Integration",
  },
  {
    value: `
        Databricks runs on AWS and integrates with all of the major services you use like S3, EC2, Redshift, and more. We provide the platform that enables you to combine all of these services to build a lakehouse architecture. In this demo, we’ll show you how Databricks integrates with each of these services simply and seamlessly.
    `,
    label: "Databricks on AWS Cloud Integration",
  },
  {
    value: `
      Databricks on Google Cloud is a jointly developed service that allows you to store all your data on a simple, open lakehouse platform that combines the best of data warehouses and data lakes. Unify all your analytics and AI workloads on a single platform. Tight integration with Google Cloud Storage, BigQuery and the Google Cloud AI Platform enables Databricks to work seamlessly across data and AI services on Google Cloud.
    `,
    label: "Deploying Databricks on Google Cloud",
  },
]

const cardColumns = {
  title: "Lakehouse for Financial Services",
  items: [
    {
      icon: "unifiedData",
      title: "Unified data and AI platform",
      description:
        "A single platform that brings together all your data and analytics workloads to enable transformative innovations for modern financial services institutions.",
    },
    {
      icon: "partnerSolutions",
      title: "Partner solutions",
      description:
        "The world's leading solution providers are building for the Lakehouse for Financial Services. Take advantage of pre-built offerings that accelerate data-driven transformation.",
    },
    {
      icon: "accelerateOutcomes",
      title: "Tools to accelerate business outcomes",
      description:
        "Databricks and its partners have created a full range of Solution Accelerators that make it easy to tackle common financial services use cases, from ESG investing to fraud prevention.",
    },
    {
      icon: "collaboration",
      title: "Industry collaboration",
      description:
        "Enable secure and open data sharing with our data ecosystem — featuring S&P Global, Intercontinental Exchange, FactSet and Nasdaq — to unlock innovations that drive sustainable value creation.",
    },
  ],
}

const imageColumns = {
  title: "Four data challenges in financial services",
  items: [
    {
      image: {
        src: "/static/images/ImageColumns/financial-services-data-governance-img.png",
        alt: "Image",
      },
      title: "Data governance and management",
      description:
        "Lack of data agility and model reproducibility makes it challenging to meet the regulatory requirements unique to financial services.",
    },
    {
      image: {
        src: "/static/images/ImageColumns/financial-services-deeper-customer-insights-img.png",
        alt: "Image",
      },
      title: "Deeper customer insights",
      description:
        "Data silos prevent a complete view of customer behaviors, cross-selling opportunities and the insights needed for hyper-personalization at scale.",
    },
    {
      image: {
        src: "/static/images/ImageColumns/financial-services-real-time-decisions-img.png",
        alt: "Image",
      },
      title: "Real-time decisions",
      description:
        "Vendor lock-in and disjointed tools hinder the ability to do real-time analytics that drive and democratize smarter financial decisions.",
    },
    {
      image: {
        src: "/static/images/ImageColumns/financial-services-access-to-third-party-img.png",
        alt: "Image",
      },
      title: "Access to third-party data",
      description:
        "Legacy technologies can't harness financial and customer insights from fast-growing unstructured and alternative data sets and don't offer open data sharing capabilities to fuel collaboration.",
    },
  ],
}

const heroCampaign = {
  title: `Your landing page headline goes here, can be up to 65 characters`,
  text: `Your landing page subheadline phrase goes here and can be up to 130 characters in length`,
  eyebrow: `Eyebrow header`,
  image: {
    src: "/static/images/image-graphic-container.png",
    alt: "image-graphic-container",
  },
}
const heroCustomer = {
  title: `Banking transformation at a global scale`,
  text: `How ABN AMRO puts data and AI into action with Databricks Lakehouse`,
  eyebrow: `Customer Story`,
  image: {
    src: "/static/images/hero-customer.png",
    alt: "image-graphic-container",
  },
  ctas: [
    {
      id: 1,
      to: "/",
      label: "Get started",
    },
    {
      id: 2,
      to: "/",
      label: "Learn more",
    },
  ],
  items: [
    {
      id: 1,
      title: "10x",
      description: "Faster time to market",
    },
    {
      id: 2,
      title: "100+",
      description: "Use cases",
    },
    {
      id: 3,
      title: "500+",
      description: "Empowered users",
    },
  ],
}
const heroCustomerVariant = {
  title: `Discover lorem ipsum et etalis mon septing`,
  text: `Value statement. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `,
  eyebrow: `Lakehouse for Retail`,
  logo: {
    src: "/static/images/informatica-logo.svg",
    alt: "image-graphic-container",
  },
  image: {
    src: "/static/images/hero-customer-variant.svg",
    alt: "image-graphic-container",
  },
  ctas: [
    {
      id: 1,
      to: "/",
      label: "Sign up",
    },
    {
      id: 2,
      to: "/",
      label: "Contact us",
    },
  ],
}
const leadCombo = {
  title: `Databricks Header`,
  text: `Viverra turpis quisque tristique convallis mauris tellus. Lectus feugiat dictumst in suscipit praesent ac potenti aliquet. Amet donec nisl turpis accumsan, cursus egestas.`,
  ctas: [
    {
      id: 1,
      to: "/",
      label: "Get started",
    },
    {
      id: 2,
      to: "/",
      label: "Learn more",
    },
  ],
  textLink: {
    to: "/",
    label: "Label",
  },
}

const heroSmall = {
  title: `Try Databricks for free`,
  text: `An open and unified data analytics platform for data engineering, data science, machine learning, and analytics. From the original creators of Apache Spark™️, Delta lake, MLflow, and Koalas.`,
  ctas: [
    {
      id: 1,
      to: "/",
      text: "Get started",
    },
    {
      id: 2,
      to: "/",
      text: "Schedule a demo",
    },
  ],
}

const bigCombo = {
  title: `Your H2 headline here`,
  text: `Analytics allows customers to operate a multi-cloud <span style='color:#FF3621'>lakehouse architecture</span> that provides data warehousing performance at data lake economics for up to 4x better price/performance for SQL workloads than traditional cloud data warehouses.`,
  items: [
    {
      id: 1,
      title: `Subheadline here for scannability`,
      description: `SQL Analytics integrates with BI tools, like Tableau and Microsoft Power BI, you use today to query your most complete and recent data in your data lake.`,
    },
    {
      id: 2,
      title: `Subheadline here for scannability`,
      description: `SQL Analytics integrates with BI tools, like Tableau and Microsoft Power BI, you use today to query your most complete and recent data in your data lake.`,
    },
    {
      id: 3,
      title: `Subheadline here for scannability`,
      description: `SQL Analytics integrates with BI tools, like Tableau and Microsoft Power BI, you use today to query your most complete and recent data in your data lake.`,
    },
    {
      id: 4,
      title: `Subheadline here for scannability`,
      description: `SQL Analytics integrates with BI tools, like Tableau and Microsoft Power BI, you use today to query your most complete and recent data in your data lake.`,
    },
  ],
  ctas: [
    {
      id: 1,
      to: "/",
      text: "Get started",
    },
    {
      id: 2,
      to: "/",
      text: "Learn more",
    },
  ],
}

const longFormPromo = {
  text: `Lakehouse Architecture: from Vision to Reality`,
  source:
    "Implement one simplified platform for data analytics, data science and Machine Learning",
  cta: {
    label: "Register today",
    to: "/",
  },
  image: {
    src: "/static/images/CategoryIcon-Company-1.png",
    alt: "databricks",
  },
}

const teamSlider = [
  {
    id: "1",
    intro: "intro",
    items: ctaBlocks.profileGray[0],
  },
  {
    id: "2",
    intro: "intro",
    items: ctaBlocks.profileGray[1],
  },
  {
    id: "3",
    intro: "intro",
    items: ctaBlocks.profileGray[2],
  },
]

const trialBlade = {
  title: "Try Databricks for free",
  subtitle: "Here’s what you’ll need:",
  cloudType: "awspaygo",
  ctaLabel: "Continue",
  FormTitle: "",
  redirectUrl: "https://databricks.com",
  entity: {
    fieldFreeTrialDisplayType: "",
  },
  items: [
    {
      headline: "An AWS Account",
      body: 'Don’t have one? <a class="text-gray-text hover:text-gray-text underline" href="www.google.com" alt="item-test" target="__black"> Create an AWS Account.  </a>',
    },
    {
      headline: "Databricks Login Info",
      body: "The password used to setup your Databricks account",
    },
    {
      headline: "A workspace name",
      body: 'New to creating a workspace? <a class="text-gray-text hover:text-gray-text underline" href="www.google.com" alt="item-test" target="__black"> See how. </a>',
    },
  ],
}

const paginationList = {
  label: "Page",
  maxItemsShown: 6,
  items: [
    {
      label: "1",
      id: 1,
    },
    {
      label: "2",
      id: 2,
    },
    {
      label: "3",
      id: 3,
    },
    {
      label: "4",
      id: 4,
    },
    {
      label: "5",
      id: 5,
    },
    {
      label: "6",
      id: 6,
    },
    {
      label: "7",
      id: 7,
    },
    {
      label: "8",
      id: 8,
    },
    {
      label: "9",
      id: 9,
    },
    {
      label: "10",
      id: 10,
    },
    {
      label: "11",
      id: 11,
    },
    {
      label: "12",
      id: 12,
    },
    {
      label: "13",
      id: 13,
    },
    {
      label: "14",
      id: 14,
    },
    {
      label: "15",
      id: 15,
    },
    {
      label: "16",
      id: 16,
    },
    {
      label: "17",
      id: 17,
    },
  ],
}

const floatingBox = {
  topBackgroundColor: {
    color: " #1B3139",
    opacity: 1,
  },
  bottomBackgroundColor: {
    color: "#EEEDE9",
    opacity: 1,
  },
}

const ctaRow = {
  item: [
    {
      id: 1,
      variantButton: "primary",
      linkName: "Primary",
    },
    {
      id: 2,
      variantButton: "secondary",
      linkName: "Secondary",
    },
    {
      id: 3,
      isLink: true,
      linkName: "Learn more",
      linkUrl: "/",
    },
  ],
}

const largePageHeader = {
  title: "Ut urna velit sapien porta feugiat sed quis amet mauris.",
  description: `
  <h3>Nulla arcu habitant lobortis turpis bibendum massa aliquam ut eget. Scelerisque sit tristique sit amet rutrum.</h3>
  <h4>Vestibulum integer sed faucibus volutpat vestibulum. Imperdiet dictum at sit cursus id cras. Fermentum justo duis donec vel et diam tristique etiam. Ut laoreet magna consectetur mauris scelerisque nibh mauris magna neque. Pharetra at felis odio vitae augue ornare risus odio orci. Tincidunt sed phasellus et semper. Aliquam egestas nisl.</h4>
  `,
  ctas: [
    {
      id: 1,
      to: "/",
      text: "Primary",
    },
    {
      id: 2,
      to: "/",
      text: "Secondary",
    },
  ],
  image: {
    src: "/static/images/Header-Graphic.png",
    alt: "",
  },
  imageHeightDesktop: "530px",
  imageHeightTablet: "259px",
  contentWidthDesktop: "6",
  contentWidthTablet: 7,
  lottie: { animationSrc: "/static/images/home-heroAnimation-looping.json" },
}

const binarySelector = {
  description: "<p>Start a 14-day free trial, then only pay for what you use.</p>",
  ctaLabel: "Get started",
  disclaimer: "<p>Legal disclaimer text can go here if necessary</p>",
  options: [
    {
      id: "credit_card_payment",
      title: "Pay with credit card",
      image: {
        src: "/static/images/card-icon.svg",
        alt: "Image",
      },
      description:
        "<p>No credit card required to start your trial. If you use Databricks after the trial, add a credit card and you’ll be billed monthly.</p>",
    },
    {
      id: "aws_account_payment",
      title: "Pay with your AWS account",
      image: {
        src: "/static/images/aws-icon.svg",
        alt: "Image",
      },
      description:
        "<p>No credit card required to start your trial. If you use Databricks after the trial, add a credit card and you’ll be billed monthly.</p>",
    },
  ],
}

const promoRow = {
  eyebrow: ["partner workshop", "March 20"],
  headline: "How to ingest data from anywhere using FiveTran ",
  body: "<p>Join our next live workshop and learn how to seamlessly integrate FiveTran ingestion on the Databricks platform.</p>",
  cta: {
    label: "See details",
    to: "/",
  },
  image: {
    src: "/static/images/promo-image-div.png",
    alt: "",
  },
  videoSrc: "https://www.youtube.com/embed/PftRBoqjhZM",
  videoImage: { src: "/static/images/demo-preview-video.png", alt: "" },
  lottie: {
    animationSrc: "/static/images/home-heroAnimation-looping.json",
  },
}

const customerStoryTabs = [
  {
    id: 1,
    title:
      "Moving to the cloud ushers in a new era of data-driven retailing for Columbia",
    body: "Columbia is a data-driven enterprise, integrating data from all line-of-business systems to manage its wholesale and retail businesses across all its brands. However, their legacy ETL and analytics infrastructure was unable to support both batch and real-time use cases at scale, blocking their ability to meet the demands of the business and data teams. After migrating to Databricks, they are now able to process and prepare data more efficiently and reliably — driving valuable insights needed to make smarter business decisions.",
    image: { src: "/static/images/Header-Graphic.png" },
    tabImage: { src: "/static/images/logo-color-grab.svg" },
    stats: [
      {
        id: "stat1",
        title: "70%",
        description: "Reduction in data pipeline creation time",
      },
      {
        id: "stat2",
        title: "48%",
        description: "Faster ETL workloads",
      },
    ],
    cta: {
      label: "Read customer story",
      to: "/",
    },
    headline: "Headline for tab, can go up to 50 characters",
  },
  {
    id: 2,
    title: "Streamlining food delivery fulfillment to delight customers",
    body: "Gousto doubled deliveries to 5 million recipe meals a month in the first half of 2020, but were held back by systems that couldn’t ingest data fast enough, couldn’t talk to each other and wouldn’t scale. Just when the pandemic exploded demand, Gousto had to temporarily stop accepting new customers. Now, with Databricks in place, Gousto is set up to achieve exciting ambitions for menu expansion, sophisticated personalization and next-day delivery.",
    image: { src: "/static/images/Header-Graphic.png" },
    tabImage: { src: "/static/images/logo-color-virgin.svg" },
    stats: [
      {
        id: "stat3",
        title: "60%",
        description: "Lorem ipsum",
      },
      {
        id: "stat4",
        title: "40%",
        description: "Lorem ipsum",
      },
      {
        id: "stat5",
        title: "99.6%",
        description: "Lorem ipsum",
      },
    ],
    cta: {
      label: "Read customer story",
      to: "/",
    },
    headline: "Small Headline example",
  },
  {
    id: 3,
    title:
      "Dolor pulvinar lectus donec bibendum suspendisse mi sed. Semper lectus malesuada.",
    body: "Hac pellentesque quis malesuada volutpat duis mi. Malesuada consequat sed neque mauris magna adipiscing non. Ut tellus amet consequat integer curabitur. Risus scelerisque eget eget quis. Erat in faucibus tristique adipiscing integer morbi. Ultrices bibendum pellentesque eros dignissim tincidunt nibh lectus. Arcu orci cras adipiscing nisl at sed. Arcu velit aliquet gravida in lorem proin. Non turpis arcu quam commodo gravida morbi nunc ante. Et laoreet amet nibh risus accumsan aliquet mollis. Praesent ut.",
    image: { src: "/static/images/Header-Graphic.png" },
    tabImage: { src: "/static/images/logo-color-grab.svg" },
    stats: [
      {
        id: "stat6",
        title: "90%",
        description: "Lorem ipsum",
      },
    ],
    cta: {
      label: "Read customer story",
      to: "/",
    },
    headline: "Quisque eu maecenas varius magnis donec.",
  },
  {
    id: 4,
    title: "Democratizing data for better shopping experiences",
    body: "As a leading e-commerce company in fashion, Wehkamp has dedicated itself to providing the best possible shopping experience for their customers. With that mission in mind, they trust in Databricks for data analytics and machine learning — allowing them to build an exciting and highly engaging web shop that is personalized to each of their customers.",
    image: { src: "/static/images/Header-Graphic.png" },
    tabImage: { src: "/static/images/logo-color-virgin.svg" },
    stats: [
      {
        id: "stat7",
        title: "70%",
        description: "Lorem ipsum",
      },
      {
        id: "stat8",
        title: "2x",
        description: "Lorem ipsum",
      },
      {
        id: "stat9",
        title: "100s",
        description: "Lorem ipsum",
      },
    ],
    cta: {
      label: "Read customer story",
      to: "/",
    },
    headline: "Quisque eu maecenas varius magnis donec.",
  },
  {
    id: 5,
    title:
      "Dolor pulvinar lectus donec bibendum suspendisse mi sed. Semper lectus malesuada",
    body: "Hac pellentesque quis malesuada volutpat duis mi. Malesuada consequat sed neque mauris magna adipiscing non. Ut tellus amet consequat integer curabitur. Risus scelerisque eget eget quis. Erat in faucibus tristique adipiscing integer morbi. Ultrices bibendum pellentesque eros dignissim tincidunt nibh lectus. Arcu orci cras adipiscing nisl at sed. Arcu velit aliquet gravida in lorem proin. Non turpis arcu quam commodo gravida morbi nunc ante. Et laoreet amet nibh risus accumsan aliquet mollis. Praesent ut.",
    image: { src: "/static/images/Header-Graphic.png" },
    tabImage: { src: "/static/images/logo-color-grab.svg" },
    stats: [
      {
        id: "stat10",
        title: "90%",
        description: "Lorem ipsum",
      },
    ],
    cta: {
      label: "Read customer story",
      to: "/",
    },
    headline: "Quisque eu maecenas varius magnis donec.",
  },
]
const drawerCard = {
  eyebrow: "On-Demand Video",
  cta: {
    to: "www.google.com",
  },
  image: {
    src: "/static/images/image-footer-blue-1.png",
    alt: "Image",
  },
  title:
    "Card title goes here and might sometime be pretty annoyingly long, like really longer that expected",
  smallDescription:
    "Your card description goes here, and should be truncated after a three line maximum.",
  largeDescription:
    "In this demo, you’ll see how to go from zero to 100 on AWS, starting from initial setup all the way to running your first ML notebook. way to running your first ML notebook.",
  videoSrc: "https://www.youtube.com/embed/lKqro_1i3Zs",
  videoTime: "6:34",
}

const technicalTable = {
  guidance: {
    headerRows: [
      {
        rows: [
            {
              content: "Use Case",
              rowspan: 2,
            },
            {
              content: "Open Source Model",
              rowspan: 2,
            },
            {
              content: "Official guidance",
              rowspan: 2,
            },
            {
              colspan: 2,
              content: "Databricks support",
              textAlign: "center",
            },
            {
              content: "Simple code",
              rowspan: 2,
            },
        ],
      },
      {
        rows: [
          {
            content: "Use Case",
          },
          {
            content: "Open Source Model",
          },
        ]
      }
    ],
    bodyRows: [
      {
        row: [
          {
            children:
              "<h5 class='font-bold'>General text generation and instruction following</h5>",
            rowspan: 4,
          },
          {
            children: `<a>MPT-7B-Instruct</a>`,
          },
          {
            children:
              "State of the art model in open source. We suggest trying this model first if you want to try open source models for tasks other than what is listed below.",
          },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "warning",
            iconPosition: "top",
            align: "center",
          },
          {
            children: `<p class='pb-2'>Work in progress</p>
        <p class='pb-2'>Will contain links to instructions & sample code for</p>
        <ul class='pl-3 list-disc'>
          <li>Fine tuning</li>
          <li>Model serving</li>
        </ul>
        `,
            rowspan: 14,
          },
        ],
      },
      {
        row: [
          { children: `<a>Dolly-y2-12B</a>` },
          {
            children:
              "MPT is better for almost all use cases, but Dolly is worth trying as a 2nd choice of MPT does not work.",
          },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "warning",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: `<a>INCITE-3B</a>` },
          { children: "Similar model that is worth trying for some use cases." },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "warning",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "Azure OpenAI gpt-3.5 and gpt-4" },
          {
            children:
              "State of the art of the model if customer’s security policies allow it, Azure OpenAI’s allows customers to disable. Only available via API.",
          },
          {
            children: "Can be logged into MLflow+logged",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "Not possible due to vendor limits",
            icon: "failed",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: "<h6 class='font-bold'>Retrieval Embeddings</h6>",
            rowspan: 4,
          },
          { children: `<a>Instructor-xl</a>` },
          { children: "Best for quality optimized embeddings-slower/higher cost." },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: `<a>all-mpnet-base-v2</a>` },
          { children: "Speed optimized-faster/lower cost." },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: `<a>e5-large</a>` },
          { children: "Balance of speed/quality" },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "Azure OpenAI gpt-3.5 and gpt-4" },
          {
            children:
              "Out of the box quality is good, but can’t be fine tuned. Can be more expensive than open source.",
          },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: "<h6 class='font-bold'>Transcription (speech to text)</h6>",
            rowspan: 2,
          },
          { children: `<a>Whisper Large v2</a>` },
          {
            children:
              "Best available model - open source or proprietary - for speech to text. Works across languages, we suggest starting with this model and only moving to Whisper medium if this model doesn’t meet your requirements.",
          },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: `<a>Whisper Medium</a>` },
          {
            children:
              "Works well for English only. Only try if Large v2 does not work for your use case’s requirements.",
          },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "<h6 class='font-bold'>Image generation</h6>", rowspan: 2 },
          { children: `<a>stable-diffusion-2-1</a>` },
          {
            children:
              "State of the art for image generation. We recommend you try this model first, unless you’ve worked extensively with Stable Diffusion 1.5 as the prompts that work well with 2.1 are quite different from those for 1.5.",
          },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: `<a>stable-diffusion-v1-5</a>` },
          {
            children:
              "The latest generation of v1 Stable Diffusion models. We generally recommend 2.1 first, unless you have worked extensively with Stable Diffusion v1, as the prompts are quite different between major versions.",
          },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "<h6 class='font-bold'>Code generation</h6>", rowspan: 2 },
          { children: `<a>StarCoderBase</a>` },
          {
            children:
              "Larger code generation model, state of the art performance for open source.",
          },
          {
            children: "Q2",
            icon: "error",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: `<a>replit-code-v1-3b</a>` },
          { children: "Smaller code generation model." },
          {
            children: "Requires GPU PrPr",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
          {
            children: "",
            icon: "success",
            iconPosition: "top",
            align: "center",
          },
        ],
      },
    ],
  },
  support: {
    headerRows: [
      {
        rows: [
          {
            content: "Feature",
          },
          {
            content: "Business",
          },
          {
            content: "Enhanced",
          },
          {
            content: "Production",
          },
        ],
      }
    ],
    bodyRows: [
      {
        row: [
          {
            children: `<h5 class="font-bold">Multi-Cloud Support</h5>
        Support for Databricks on permitted Cloud Service Providers and Databricks-Powered Services; Complimentary Success Credits available based on commitment size`,
          },
          {
            children: "--",
            align: "center",
          },
          {
            children: "Yes",
            align: "center",
          },
          {
            children: "Yes",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Single-Cloud Support</h5>
          Support for Platform Services on a single-chosen Cloud Service Provider`,
          },
          {
            children: "Yes",
            align: "center",
          },
          {
            children: "Yes",
            align: "center",
          },
          {
            children: "Yes",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Support Portal Access</h5>
          Online repository of documentation, guides, best practices, and more`,
          },
          {
            children: "Yes",
            align: "center",
          },
          {
            children: "Yes",
            align: "center",
          },
          {
            children: "Yes",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Updates & Patches</h5>
          Receive updates, bug fixes, and patches without impact to your business`,
          },
          {
            children: "Yes",
            align: "center",
          },
          {
            children: "Yes",
            align: "center",
          },
          {
            children: "Yes",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Service Level Agreement (SLA)</h5>
            Receive support responses according to issue severity`,
          },
          {
            colspan: 3,
            children: "Initial Response Time",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Standard Support Severity 1</h5>
          Production system is down or severely impacted such that routine operation is impossible`,
          },
          {
            rowspan: 4,
            children: `1st contact responsetime: within 1business day`,
            align: "center",
          },
          {
            children: `1st contact response time: within 4 Hours`,
            align: "center",
          },
          {
            children: `1st contact response time: within 1 Hour`,
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Updates & Patches</h5>
          Receive updates, bug fixes, and patches without impact to your business`,
          },
          {
            rowspan: 3,
            children: `1st contact response time: within 4 Hours`,
            align: "center",
          },
          {
            children: `1st contact response time: within 4 Hours`,
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Standard Support Severity 3</h5>
          Issue where minor functionality is impacted or a development issue occurs`,
          },
          {
            rowspan: 2,
            children: `1st contact response time: within 1 business day`,
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Standard Support Severity 4</h5>
          Request for information or feature request with no impact on business operations`,
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Support Service Hours</h5>
          Live support during customer’s choice of time zone`,
          },
          {
            children: `9am – 6pm Business Days*`,
            align: "center",
          },
          {
            children: `9am – 6pm Business Days*`,
            align: "center",
          },
          {
            children: `<p><span class='font-bold'>Severity 1 & 2:</span> 24x7x365</p>
            <span class='font-bold'>Severity 3 & 4:</span> 9am – 6pm Business Days*`,
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Support Service Hours</h5>
          Live support during customer’s choice of time zone`,
          },
          {
            children: `9am – 6pm Business Days*`,
            align: "center",
          },
          {
            children: `9am – 6pm Business Days*`,
            align: "center",
          },
          {
            children: `<p><span class='font-bold'>Severity 1 & 2:</span> 24x7x365</p>
            <span class='font-bold'>Severity 3 & 4:</span> 9am – 6pm Business Days*`,
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Support Service Hours</h5>
          Live support during customer’s choice of time zone`,
          },
          {
            children: `9am – 6pm Business Days*`,
            align: "center",
          },
          {
            children: `9am – 6pm Business Days*`,
            align: "center",
          },
          {
            children: `<p><span class='font-bold'>Severity 1 & 2:</span> 24x7x365</p>
            <span class='font-bold'>Severity 3 & 4:</span> 9am – 6pm Business Days*`,
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class="font-bold">Support Service Hours</h5>
          Live support during customer’s choice of time zone`,
          },
          {
            children: `<p class='font-bold'>9am – 6pm</p> Business Days*`,
            align: "center",
          },
          {
            children: `<p class='font-bold'>9am – 6pm</p> Business Days*`,
            align: "center",
          },
          {
            children: `<p><span class='font-bold'>Severity 1 & 2:</span> 24x7x365</p>
            <span class='font-bold'>Severity 3 & 4:</span> 9am – 6pm Business Days*`,
            align: "center",
          },
        ],
      },
    ],
  },
  pricing: {
    headerRows: [
     {
      rows:  [
        {
          content: "Feature",
        },
        {
          content: "Business",
        },
        {
          content: "Enhanced",
        },
        {
          content: "Production",
        },
      ],
     }
    ],
    bodyRows: [
      {
        row: [
          { children: "<p class='font-bold text-1.75'>Managed Apache Spark</p>" },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>Photon Engine Performance (Massively parallel processing)</p>",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>Job Scheduling With Libraries</p>",
          },
          {
            icon: "empty",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>Job Scheduling With Notebooks</p>",
          },
          {
            icon: "empty",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "<p class='font-bold text-1.75'>Autopilot Clusters</p>" },
          {
            icon: "empty",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children: "<p class='font-bold text-1.75'>Databricks Runtime for ML</p>",
          },
          {
            icon: "empty",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "<p class='font-bold text-1.75'>Managed MLflow</p>" },
          {
            icon: "empty",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>Delta Lake With Delta Engine</p>",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>Broad Support of Different VM Instance Types</p>",
          },
          {
            children:
              "See the <a>Pricing calculator</a> for hourly DBU emission by instance type",
            align: "center",
          },
          {
            children:
              "See the <a>Pricing calculator</a> for hourly DBU emission by instance type",
            align: "center",
          },
          {
            children:
              "DBU emission rate 2.9x vs. non-Photon. See the <a>Pricing calculator</a>",
            align: "center",
          },
        ],
      },
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>Governance and Manageability</p>",
          },
          {
            children: "See <a>Platform Capabilities and Add-Ons</a> for details",
            colspan: 3,
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "<p class='font-bold text-1.75'>Enterprise Security</p>" },
          {
            children: "See <a>Platform Capabilities and Add-Ons</a> for details",
            colspan: 3,
            align: "center",
          },
        ],
      },
    ],
  },
  pricingSecondary: {
    headerRows: [
      {
        rows: [
          {
            content: "Feature",
          },
          {
            content: "Business",
          },
          {
            content: "Enhanced",
          },
          {
            content: "Production",
          },
        ],
      }
    ],
    bodyRows: [
      {
        row: [
          { children: "<p class='font-bold text-1.75'>Managed Apache Spark</p>" },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "<p class='font-bold text-1.75'>Managed Apache Spark</p>" },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
      },
      {
        row: [
          { children: "<p class='font-bold text-1.75'>Managed Apache Spark</p>" },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
        subRows: [
          [
            { children: "Subrow 1" },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
          ],
          [
            { children: "<p class='font-bold text-1.75'>Subrow 2</p>" },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
          ],
          [
            { children: "Subrow 3" },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
          ],
        ],
      },
      {
        row: [
          { children: "<p class='font-bold text-1.75'>Managed Apache Spark</p>" },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
          {
            icon: "success",
            align: "center",
          },
        ],
        subRows: [
          [
            { children: "Subrow 3" },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
          ],
          [
            { children: "Subrow 4" },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
            {
              icon: "success",

              align: "center",
            },
          ],
        ],
      },
    ],
  },
  blog: {
    headerRows: [
      {
        rows: [
          { content: "Original Model", columnWidth: "5/12" },
          {
            content: "Original Model: Dolly",
            columnWidth: "7/12",
          },
        ],
      }
    ],
    bodyRows: [
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>Write a love letter to Edgar Allan Poe.</p>",
            colspan: 2,
          },
        ],
      },
      {
        row: [
          {
            children: `<p class='font-bold text-1.75'>Original Model:</p>Original Model:</h5>
      HISTORY: Edgar Allan Poe rose to fame in the 19th Century. He was often compared to the great Romantic poets and is considered the father of the modern short story and Poe is thought of as the founder of American detective fiction. He has been dead for 130 years.
      PATRICK CAMPOS: You should never try to write a love letter to a dead person.
      PATRICK CAMPOS: Poe was more than just the author of The Raven. He was a master of atmosphere.
      BUDDY FRITZLER: Edgar Allan Poe lived in Baltimore from 1831 until his death in 1849. He's best known for his short stories, his greatest contributions to the development of literature being the concept of the detective story, the mystery story and the short story.
      BUDDY FRITZLER: Poe's most famous story, "The Gold-Bug", was written in 1843. It's about a treasure hunter who searches for buried treasure. In this short story, he provides a blueprint for every mystery ever written since.
      BUDDY FRITZLER: The central idea that you have to look for clues is very appealing. It was even used as …`,
          },
          {
            children: `<h5 class='font-bold mb-2'>Original Model:</h5>
          HISTORY: Edgar Allan Poe rose to fame in the 19th Century. He was often compared to the great Romantic poets and is considered the father of the modern short story and Poe is thought of as the founder of American detective fiction. He has been dead for 130 years.
          PATRICK CAMPOS: You should never try to write a love letter to a dead person.
          PATRICK CAMPOS: Poe was more than just the author of The Raven. He was a master of atmosphere.
          BUDDY FRITZLER: Edgar Allan Poe lived in Baltimore from 1831 until his death in 1849. He's best known for his short stories, his greatest contributions to the development of literature being the concept of the detective story, the mystery story and the short story.
          BUDDY FRITZLER: Poe's most famous story, "The Gold-Bug", was written in 1843. It's about a treasure hunter who searches for buried treasure. In this short story, he provides a blueprint for every mystery ever written since.
          BUDDY FRITZLER: The central idea that you have to look for clues is very appealing. It was even used as …`,
          },
        ],
      },
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>Write a tweet announcing Dolly, a large language model from Databricks.</p>",
            colspan: 2,
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class='font-bold mb-2'>Original Model:</h5>
          In your tweet, provide a short summary of the challenge, how you analyzed it, and how Dolly performed.
          After your tweet, I will retweet it to Databricks’ Twitter account.
          Clean up your social media page for the next week by removing any mentions of Dolly or Databricks.
          Data Preparation
          Our first step is to generate word vector embeddings for each document. We can obtain these vector representations in two different ways:
          Using a tokenized document set (in this case, everything in our download folder)
          Loads a word2vec model from the Google Search API (in this case, vector2vec.c)
          In our case, we want to use the first method, which is easier, but the second may be more robust. We will use the word2vec model above to create a vocabulary file for any new words found in the file. This process gives us a quick way to identify new words and find contextually related terms.
          We can start by copying word2vec.c to a local directory called /tmp/word2vec.
          #/tmp/word2vec/word2vec.c FILE_NAME /tmp/word`,
          },
          {
            children: `<h5 class='font-bold mb-2'>Dolly:</h5>
            Databricks just announced Dolly - a new language model for natural language processing with large capacity and improved efficiency!
            #DataScience #NaturalLanguageProcessing
            [Link to Dolly model release]`,
          },
        ],
      },
      {
        row: [
          {
            children:
              "<p class='font-bold text-1.75'>I'm selling my Nikon D-750, write a short blurb for my ad.</5>",
          },
        ],
      },
      {
        row: [
          {
            children: `<h5 class='font-bold mb-2'>Original Model:</h5>
          I'm not sure if you can post a location - anything on the website will work.
          I've only had it a week. It is in mint condition with the charging cable and window case intact. Bought it for $1800 for in store pickup at a store in San Francisco. Plus tax and the undisclosed Costco price.
          Some one please let me know that this is a scam and not really an offer.
          I just received and e-mail that said the camera is at someones house so someone else can pick it up and did I want to message them, well no I'm selling it as I would never …`,
          },
          {
            children: `<h5 class='font-bold mb-2'>Dolly:</h5>
        Looking to get a reliable camera for photo and video work? Check out the Nikon D-750! This sleek, lightweight camera has a 24.2MP sensor and 1080/60p video recording, making it a great choice for capturing those moments in life. The ergonomic grip and nine-point autofocus system make it easy to work with and shoot without hassle. With Wi-Fi, you can upload your pictures easily to your computer or smartphone without having to buy a dedicated external storage. Buy the Nikon D-750 now to experience why it is the best choice for photography and videography!`,
          },
        ],
      },
    ],
  },
}

const mediaPlayer = {
  vimeoUrl: "https://vimeo.com/81400335",
  youtubeUrl: "https://youtu.be/lKqro_1i3Zs",
  internalVideo: {
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    image: {
      src: "/static/images/leading-edge-talent.jpg",
      alt: "thumbnail",
    },
  },
}
const chooseDemo = {
  title: "Ready to become a data + AI company?",
  description: "Take the first steps in your transformation",
  ctas: [
    {
      id: "choose-demo",
      variant: "primary",
      text: "Choose demo",
      to: "/",
    },
    {
      id: "try-free",
      variant: "secondary",
      text: "Try it free",
      to: "/",
    },
  ],
}

const regionalCloudMap = {
  tabs: [
    {
      id: 1,
      color: "orange-04",
      label: "All",
      content: {
        image: {
          src: "/static/images/01-cloud-regions-all.png",
          alt: "image container",
        },
      },
    },
    {
      id: 2,
      label: "AWS",
      color: "yellow-600",
      content: {
        image: {
          src: "/static/images/02-cloud-regions-aws.png",
          alt: "image container",
        },
      },
    },
    {
      id: 3,
      label: "Azure",
      color: "blue-500",
      content: {
        image: {
          src: "/static/images/03-cloud-regions-azure.png",
          alt: "image container",
        },
      },
    },
    {
      id: 4,
      label: "Google",
      color: "green-04",
      content: {
        image: {
          src: "/static/images/04-cloud-regions-google.png",
          alt: "image container",
        },
      },
    },
  ],
}

const headerSection = {
  eyebrow: "PLATFORM",
  title: "The Databricks Lakehouse",
  subtitle: "Infinite possibilities. Zero compromise.",
}

export const mockServer = createServer({
  routes() {
    this.get("/buttons/:variant", (schema, request) => {
      return {
        data: {
          text: `${request.params.variant} button`,
          variant: request.params.variant,
        },
      }
    })
    this.get("/bulletedList", () => {
      return {
        data: bulletedList,
      }
    })
    this.get("/HeroPromo/:variant", (schema, request) => {
      return {
        data: HeroPromo[request.params.variant],
      }
    })
    this.get("/smallPromoBlock", () => {
      return {
        data: smallPromoBlock,
      }
    })
    this.get("/bioSliderData", () => {
      return {
        data: bioSliderData,
      }
    })
    this.get("/ctas", () => {
      return {
        data: ctas,
      }
    })
    this.get("/image", () => {
      return {
        data: image,
      }
    })
    this.get("/smallTileCard", () => {
      return {
        data: smallTileCard,
      }
    })
    this.get("/richText/:variant", (schema, request) => {
      const map = {
        blog: `<p>Sed vitae egestas malesuada mattis. Quam egestas blandit ornare egestas sed eget turpis morbi. Sed sit ac ante orci molestie. Massa dui malesuada vivamus at nisl arcu nisi ullamcorper lorem. Neque donec malesuada morbi <a href="#">sapien purus tincidunt</a> suspendisse. Scelerisque diam pulvinar etiam consectetur vestibulum nec porta justo, nunc.</p>
        <p>Cursus enim tortor amet sit sed. Amet rhoncus et leo metus pellentesque mi. Etiam sit nunc mi nibh aliquam maecenas. Nibh est ut habitasse in fermentum molestie. At pharetra nibh tellus orci aliquam sed at enim. Hac diam mattis odio aenean pharetra ipsum. Lacus molestie ut lorem suspendisse turpis. Sed amet, sapien in aenean elementum arcu, imperdiet. <a href="#">Accumsan ut viverra mauris</a> proin vel, ultrices risus. Elit imperdiet netus amet, etiam nunc ipsum morbi nec. Nisi amet nisl cursus vestibulum in tellus est ultrices magna. Magna dolor, ut fermentum sit.</p>
        <h4>My optional list header</h4>
        <ol>
          <li>My ordered list item</li>
          <li>My ordered list item</li>
          <li>My ordered list item</li>
          <li>My ordered list item</li>
        </ol>
        <h4>My optional list header</h4>
        <ul>
          <li>My ordered list item</li>
          <li>My ordered list item</li>
          <li>My ordered list item</li>
          <li>My ordered list item</li>
        </ul>`,
        trialPage: `
        <ul class="circle-check">
          <li>Simplify data ingestion and automate ETL<br /><span class="subtle">Ingest data from hundreds of sources. Use a simple declarative approach to build data pipelines.</span></li>
          <li>Collaborate in your preferred language<br /><span class="subtle">Code in Python, R, Scala and SQL with coauthoring, automatic versioning, Git integrations and RBAC.</span></li>
          <li>Better price/performance than other cloud data warehouses<br /><span class="subtle">Over 7,000 customers worldwide are getting up to 12x better price/performance.</span></li>
          </ul>`,
      }

      return {
        data: {
          text:
            map[request.params.variant] ||
            `<p><strong>November 27-30, 2022</strong><br /><strong>11:00 AM–3:00 PM PST</strong></p>
          <h4>Optional introductory sentence styling dicta vel dolorem sint soluta non aspernatur autem vero.</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed felis ac mauris tempus volutpat. Quisque tincidunt dui quis odio congue, sit amet mollis tortor porta. Vestibulum volutpat ullamcorper viverra. Sed tempus turpis semper, mattis tortor eget, blandit magna. In scelerisque ipsum ut cursus auctor. In hac habitasse platea dictumst. Etiam eu turpis quis elit venenatis mollis. Maecenas ac faucibus nisi. Vivamus lobortis velit sed maximus auctor.</p>
          <p>Cras eu est tincidunt, accumsan nisl vitae, pulvinar augue. Fusce dolor augue, eleifend et hendrerit et, malesuada id lorem. Sed ut aliquam sem. Donec in malesuada mi, nec vulputate lacus. Phasellus in malesuada ligula, eget fringilla quam. Quisque nec finibus enim. Ut efficitur ullamcorper ligula vitae scelerisque.</p>
          <p><strong>Example of List subheadline</strong></p>
          <ul>
              <li>List item one</li>
              <li>Another one here</li>
              <li>Wow a third</li>
          </ul>
          <p>Cras eu est tincidunt, accumsan nisl vitae, pulvinar augue. Fusce dolor augue, eleifend et hendrerit et, malesuada id lorem. Sed ut aliquam sem. Donec in malesuada mi, nec vulputate lacus. Phasellus in malesuada ligula, eget fringilla quam. Quisque nec finibus enim. Ut efficitur ullamcorper ligula vitae scelerisque.</p>`,
        },
      }
    })
    this.get("/carousel", () => {
      return {
        data: carousel,
      }
    })
    this.get("/technicalTable/:variant", (schema, request) => {
      return {
        data: technicalTable[request.params.variant],
      }
    })
    this.get("/sidebar", () => {
      return {
        data: sidebar,
      }
    })
    this.get("/quote", () => {
      return {
        data: quote,
      }
    })
    this.get("/longFormQuote", () => {
      return {
        data: longFormQuote,
      }
    })
    this.get("/teasers", () => {
      return {
        data: teasers,
      }
    })
    this.get("/link", () => {
      return {
        data: {
          text: `Try databricks`,
          to: `/`,
          label: `Go to databricks page`,
        },
      }
    })
    this.get("/modalMarketoForm", () => {
      return {
        data: {
          formId: `1001`,
          cta: `Submit`,
        },
      }
    })
    this.get("/linkModal", () => {
      return {
        data: {
          text: `Try databricks`,
          videoSource: "https://www.youtube.com/embed/8TDwdIsslVw",
        },
      }
    })
    this.get("/breadcrumbs", () => {
      return {
        data: breadcrumbs,
      }
    })
    this.get("/breadcrumbsNavigation", () => {
      return {
        data: breadcrumbsNavigation,
      }
    })
    this.get("/stickyNavigation", () => {
      return {
        data: stickyNavigation,
      }
    })
    this.get("/secondaryNavigation", () => {
      return {
        data: secondaryNavigation,
      }
    })
    this.get("/inlineNavigationHorizontal", () => {
      return {
        data: inlineNavigationHorizontal.mixedLinks,
      }
    })
    this.get("/inlineNavigationHorizontal/internal", () => {
      return {
        data: inlineNavigationHorizontal.internalLinks,
      }
    })
    this.get("/inlineNavigationHorizontal/external", () => {
      return {
        data: inlineNavigationHorizontal.externalLinks,
      }
    })
    this.get("/inlineNavigation/:variant", (schema, request) => {
      return {
        data: { links: inlineNavigation[request.params.variant] },
      }
    })
    this.get("/pagination", () => {
      return {
        data: pagination,
      }
    })
    this.get("/social", () => {
      return {
        data: social,
      }
    })
    this.get("/textButton", () => {
      return {
        data: {
          text: `Label`,
        },
      }
    })
    this.get("/blogHead", () => {
      return {
        data: blogHead,
      }
    })
    this.get("/icons", () => {
      return {
        data: icons,
      }
    })
    this.get("/footer", () => {
      return {
        data: footer,
      }
    })
    this.get("/footerSimple", () => {
      return {
        data: footerSimple,
      }
    })
    this.get("/blogPage", async () => {
      const button = await fetch(`/buttons/primary`).then((response) =>
        response.json()
      )
      return {
        data: {
          pagination,
          breadcrumbs,
          secondaryNavigation,
          teasers,
          button,
          icons,
          promotion,
        },
      }
    })
    this.get("/promotion", async () => {
      return {
        data: promotion,
      }
    })
    this.get("/calloutRow", async () => {
      return {
        data: calloutRow,
      }
    })
    this.get("/thankYouPage", () => {
      return {
        data: {
          hero: hero.bannerLarge,
          topHeader,
          related: {
            title: "Here's more to explore",
            cards: [
              {
                image: {
                  src: "/static/images/graphic-card-4cl-report.png",
                  alt: "Image",
                },
                cta: {
                  to: "https://databricks.com/solutions/industries/media-and-entertainment",
                  text: "Label",
                },
                description: `<div class="h6 mb-2">Report<//div>
              <div class="h4 mb-2 font-bold">Evaluating Data Science and Machine Learning Platforms</div>
              <div class="b3 mb-2">Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>`,
              },
              {
                image: {
                  src: "/static/images/graphic-card-4cl-report.png",
                  alt: "Image",
                },
                cta: {
                  to: "https://databricks.com/solutions/industries/media-and-entertainment",
                  text: "Label",
                },
                description: `<div class="h6">Report<//div>
              <div class="h4 font-bold">Evaluating Data Science and Machine Learning Platforms</div>
              <div class="b3">Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>`,
              },
              {
                image: {
                  src: "/static/images/graphic-card-4cl-report.png",
                  alt: "Image",
                },
                cta: {
                  to: "https://databricks.com/solutions/industries/media-and-entertainment",
                  text: "Label",
                },
                description: `<div class="h6">Report<//div>
              <div class="h4 font-bold">Evaluating Data Science and Machine Learning Platforms</div>
              <div class="b3">Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>`,
              },
            ],
          },
          calloutRow: {
            ...calloutRow,
            variant: "blue",
            image: { src: calloutRow.image.blue, alt: "image" },
            graphic: { src: calloutRow.graphic.blue, alt: "image" },
          },
        },
      }
    })
    this.get("/trialPage", async () => {
      const richText = await fetch(`/richText/trialPage`).then((response) =>
        response.json()
      )
      return {
        data: {
          image: {
            src: "/static/images/sb-databricks.svg",
            alt: "Databricks",
          },
          title: "Try Databricks free",
          subtitle:
            "Test-drive the full Databricks platform free for 14 days on your choice of AWS, Microsoft Azure or Google Cloud.",
          footerSimple,
          richText,
          logos: [
            {
              src: "/static/images/logo-color-nielsen-2021.svg",
              alt: "Nielsen",
            },
            {
              src: "/static/images/logo-color-grab.svg",
              alt: "Grab",
            },
            {
              src: "/static/images/logo-color-virgin.svg",
              alt: "Virgin",
            },
            {
              src: "/static/images/logo-color-edmunds.svg",
              alt: "Edmunds",
            },
          ],
        },
      }
    })
    this.get("/blogDetail", async () => {
      const button = await fetch(`/buttons/primary`).then((response) =>
        response.json()
      )
      // Set current item to false
      const parsedSecondaryNavigation = JSON.parse(
        JSON.stringify(secondaryNavigation)
      )
      parsedSecondaryNavigation.links[1].links[0].current = false
      return {
        data: {
          pagination,
          breadcrumbs,
          secondaryNavigation: parsedSecondaryNavigation,
          teasers,
          button,
          icons,
          ctas,
          image,
          promotion,
          blog: {
            blogBody,
            social,
            blogHead,
          },
        },
      }
    })
    this.get("/ctaImageBlock", () => {
      return {
        data: { ...ctaImageBlock[0] },
      }
    })
    this.get("/ctaHexImage", () => {
      return {
        data: ctaHexImage,
      }
    })
    this.get("/ctaVideoBlock", () => {
      return {
        data: { ...ctaVideoBlock[0] },
      }
    })
    this.get("/slider", () => {
      return {
        data: quotes,
      }
    })
    this.get("/textColumns", () => {
      return {
        data: textColumns,
      }
    })
    this.get("/verticalTabs", () => {
      return {
        data: verticalTabs,
      }
    })
    this.get("/cardColumns", () => {
      return {
        data: cardColumns,
      }
    })
    this.get("/imageColumns", () => {
      return {
        data: imageColumns,
      }
    })
    this.get("/labelAndLinks", () => {
      return {
        data: labelAndLinks,
      }
    })
    this.get("/language", () => {
      return {
        data: footerLanguage,
      }
    })
    this.get("/hero/:variant", (schema, request) => {
      return {
        data: hero[request.params?.variant],
      }
    })
    this.get("/codeSnippet", () => {
      return {
        data: codeSnippet,
      }
    })
    this.get("/quoteCombo", () => {
      return {
        data: quoteCombo,
      }
    })
    this.get("/videoEmbed", () => {
      return {
        data: videoEmbed,
      }
    })
    this.get("/careers", () => {
      return {
        data: {
          hero: hero.twoColumns,
          ctaVideoBlock,
          textColumns,
          textColumnImage: "/static/images/databricks-team.jpg",
          carousel,
          slider: quotes,
          ctaImageBlock,
          icons,
        },
      }
    })
    this.get("/iconList", () => {
      return {
        data: iconList,
      }
    })
    this.get("/tabData", () => {
      return {
        data: tabData,
      }
    })
    this.get("/blogContent", () => {
      return {
        data: {
          sidebar,
          pagination,
          breadcrumbs,
          secondaryNavigation,
          teasers,
          promotion,
          ctas,
          blog: {
            blogBody,
            social,
            blogHead,
          },
          featuredImage: {
            src: image.featuredImageSrc,
            alt: image.alt,
          },
        },
      }
    })
    this.get("/ctaBlocks/:variant", (schema, request) => {
      return {
        data: { elements: ctaBlocks[request.params.variant] },
      }
    })
    this.get("/cards/:variant", (schema, request) => {
      return {
        data: { elements: cards[request.params.variant] },
      }
    })
    this.get("/cards/publication-card", () => {
      return {
        data: publicationCard,
      }
    })
    this.get("/accordions", () => {
      return {
        data: { accordions: accordionList.data, title: accordionList.title },
      }
    })
    this.get("/logos", () => {
      return {
        data: {
          logos,
        },
      }
    })
    this.get("/colorLogos", () => {
      return {
        data: {
          colorLogos,
        },
      }
    })
    this.get("/rowsCarousel", () => {
      return {
        data: rowsCarousel,
      }
    })
    this.get("/topHeader", () => {
      return {
        data: topHeader,
      }
    })
    this.get("/landingPageContent", () => {
      return {
        data: landingPageContent,
      }
    })
    this.get("/legalPageContent", () => {
      return {
        data: legalPageContent,
      }
    })
    this.get("/innerMenu", () => {
      return {
        data: innerMenu,
      }
    })
    this.get("/ctaSection", () => {
      return {
        data: ctaSection,
      }
    })
    this.get("/tab", () => {
      return {
        data: tab,
      }
    })
    this.get("/flatIconCards", () => {
      return {
        data: flatIconCards,
      }
    })
    this.get("/industryCardItems", () => {
      return {
        data: {
          image: {
            src: `/static/images/icon-orange-energy.png`,
            alt: `icon-orange-energy`,
          },
          text: `Energy and Utilities`,
          cta: {
            link: `https://www.databricks.com/solutions/industries/oil-and-gas`,
            label: `Overview`,
          },
          information: [
            {
              title: `EXPLORE RESOURCES`,
              links: [
                {
                  id: 1,
                  label: `Industry Overview`,
                  to: `https://www.databricks.com/solutions/industries/media-and-entertainment`,
                },
                {
                  id: 2,
                  label: `Solution Acceleration`,
                  to: `https://www.databricks.com/solutions/accelerators?filters=media`,
                },
                {
                  id: 3,
                  label: `eBooks and Downloads`,
                  to: `https://www.databricks.com/p/ebook/the-big-book-of-media-entertainment-use-cases`,
                },
              ],
            },
            {
              title: `SUCCESS STORIES`,
              links: [
                {
                  id: 1,
                  label: `Explore Customer Stories`,
                  to: `https://www.databricks.com/customers/laliga`,
                },
              ],
            },
            {
              title: `RELATED INDUSTRIES`,
              links: [
                {
                  id: 1,
                  label: `State and Local Government`,
                  to: `https://www.databricks.com/solutions/industries/state-local-government`,
                },
                {
                  id: 2,
                  label: `Federal Agencies`,
                  to: `https://www.databricks.com/solutions/industries/federal-government`,
                },
              ],
            },
          ],
        },
      }
    })
    this.get("/industryCard", () => {
      return {
        data: {
          image: {
            src: `/static/images/icon-orange-energy.png`,
            alt: `icon-orange-energy`,
          },
          text: `Financial Services`,
          description: `Explore how Databricks is helping companies across all aspects of finance to make smart decisions faster.`,
          cta: {
            link: `https://www.databricks.com/solutions/industries/financial-services`,
            label: `Overview`,
          },
          logos: [
            {
              id: 1,
              src: "/static/images/logo-gray-laliga.svg",
              alt: "logo-gray-laliga",
            },
            {
              id: 2,
              src: "/static/images/logo-gray-warner-bros.svg",
              alt: "logo-gray-warner-bro",
            },
            {
              id: 3,
              src: "/static/images/logo-gray-finra.svg",
              alt: "logo-gray-finra",
            },
            {
              id: 4,
              src: "/static/images/logo-gray-columbia.svg",
              alt: "logo-gray-columbia",
            },
          ],
        },
      }
    })
    this.get("/alert", () => {
      return {
        data: alert,
      }
    })
    this.get("/bigCombo", () => {
      return {
        data: bigCombo,
      }
    })
    this.get("/radioButton", () => {
      return {
        data: {
          text: `Keep me informed with occasional updates about Databricks and related open source products.`,
          errorMessage: `Error message appears here`,
        },
      }
    })
    this.get("/radioCard", () => {
      return {
        data: [
          {
            text: `Amazon Web Services`,
            image: {
              src: `/static/images/logo-color-aws-icon.svg`,
              alt: `icon-orange-cloud`,
            },
          },
          {
            text: `Microsoft Azure`,
            errorMessage: `Error message appears here`,
            image: {
              src: `/static/images/logo-color-microsoft-azure-icon.svg`,
              alt: `icon-orange-cloud`,
            },
          },
          {
            text: `Google Cloud Platform`,
            image: {
              src: `/static/images/logo-color-google-cloud-icon.svg`,
              alt: `icon-orange-cloud`,
            },
          },
        ],
      }
    })
    this.get("/checkBox", () => {
      return {
        data: {
          text: `Keep me informed with occasional updates about Databricks and related open source products.`,
          errorMessage: `Error message appears here`,
        },
      }
    })
    this.get("/leadCombo", () => {
      return {
        data: leadCombo,
      }
    })
    this.get("/heroSmall", () => {
      return {
        data: heroSmall,
      }
    })
    this.get("/heroCampaign", () => {
      return {
        data: heroCampaign,
      }
    })
    this.get("/dropdownField", () => {
      return {
        data: {
          label: `Label`,
          errorMessage: `Error message appears here`,
          options: [
            {
              id: "",
              text: "",
            },
            {
              id: 2,
              text: "Input",
            },
            {
              id: 3,
              text: "Selected Choice",
            },
          ],
        },
      }
    })
    this.get("/select", () => {
      return {
        data: {
          label: `Label`,
          errorMessage: `Error message appears here`,
          options: [
            {
              value: "",
              label: "Select",
            },
            {
              value: "2",
              label: "Input",
            },
            {
              value: "3",
              label: "Selected Choice",
            },
          ],
        },
      }
    })
    this.get("/messageField", () => {
      return {
        data: {
          label: `Label`,
          errorMessage: `Error message appears here`,
        },
      }
    })
    this.get("/textInput", () => {
      return {
        data: {
          label: `Label`,
          errorMessage: `Error message appears here`,
        },
      }
    })
    this.get("/pillButton", () => {
      return {
        data: {
          buttons: [
            {
              id: 1,
              label: "Dataframes",
            },
            {
              id: 2,
              label: "Databricks",
            },
          ],
        },
      }
    })
    this.get("/longFormPromo", () => {
      return {
        data: longFormPromo,
      }
    })
    this.get("/playlistVideo", () => {
      return {
        data: playlistVideo,
      }
    })
    this.get("/agenda", () => {
      return {
        data: agenda,
      }
    })

    this.passthrough("https://trial-databricksinc.pantheonsite.io/**")
    this.passthrough("https://www.databricks.com/**")

    this.passthrough("/static/**")

    this.get("/heroCustomer", () => {
      return {
        data: heroCustomer,
      }
    })
    this.get("/heroCustomerVariant", () => {
      return {
        data: heroCustomerVariant,
      }
    })

    this.get("/featureTextBox", () => {
      return {
        data: featureTextBox,
      }
    })
    this.get("/teamSlider", () => {
      return {
        data: teamSlider,
      }
    })
    this.get("/transparentTextCard", () => {
      return {
        data: transparentTextCard,
      }
    })
    this.get("/customerHubCard", () => {
      return {
        data: customerHubCard,
      }
    })
    this.get("/filtersFields", () => {
      return {
        data: filtersFields,
      }
    })
    this.get("/trialBlade", () => {
      return {
        data: trialBlade,
      }
    })
    this.get("/paginationList", () => {
      return {
        data: paginationList,
      }
    })
    this.get("/bigHero", () => {
      return {
        data: bigHero,
      }
    })
    this.get("/textRow", () => {
      return {
        data: textRow,
      }
    })
    this.get("/customerStory", () => {
      return {
        data: {
          heroCustomer,
          customerComponent: [
            {
              image: {
                src: "/static/images/databricks-logo-1.png",
                alt: "image-for-description",
              },
              text: `Embark’s data analysts leverage internal metrics and generate dashboards via Tableau to better understand how their software and sensors are performing. Today, their data analyst team has a number of Tableau dashboards running — all powered by Databricks — including the performance of their software versions, sensor calibration performance, and more.`,
            },
          ],
          quoteCustomer: [
            {
              text: `<p class='text-navy-03 text-5'>"Databricks has greatly improved collaboration within our cross-functional data team, empowering us to collectively work towards new data-driven innovations to improve workplace safety."</p>`,
              source:
                "<p class='b4 gray-text'>Bryant Eadon, CIO, StrongArm Technologies</p>",
            },
          ],
          richTextCustomer: [
            {
              text: `<p class='b1 text-3.5'>Many industrial injuries don’t happen overnight. They develop slowly, over long periods of repetitive harmful motion, ultimately leading to physical damage that can, in worst cases, be irreparable. StrongArm Tech is tackling this problem with wearable devices that track daily motion and activity as well as the wearer’s immediate surroundings. With Databricks, they are able to ingest massive amounts of real time IoT data for downstreaming machine learning that provides proprietary Safety Scores and classifications of activities to predict risk, resulting in a smarter, safer environment: StrongArm has been able to reduce industrial workplace injury rates by over half, and deliver millions in health and insurance cost savings for both their customers and their customers’ employees.<p>`,
            },
          ],
          richBodyCustomer: [
            {
              text: `
              <div><h4 class='h3 text-3.5'>The complexity of leveraging data to improve workplace safety</h4><p class='b2'>Industrial injury is a big problem that can have significant cost implications, not only for the employer but also for the employees who must bear the brunt of medical costs.</p>
              <p class='b2'>“Lower-back injuries are the most common types of injury in the industrial workspace. Every time a worker gets injured, it typically costs more than $65,000 in terms of medical expenses,” explained Bryant Eadon, CIO at StrongArm Technologies.</p>
              <p class='b2'>StrongArm’s goal is to capture every relevant data point—roughly 1.2 million data points per day, per person—to predict injuries and prevent these runaway costs from occurring. With such large volumes of time-series data flowing in real time, they struggled to build reliable and performant ETL pipelines that could scale to meet data science needs. Maintaining infrastructure also required significant resources, often taking an entire week to provision clusters that were stable enough to handle their workloads.</p>
              <p class='b2'>From a data science perspective, working from a single laptop proved to limit their ability to efficiently perform ad hoc queries and weren’t able to train their models against their entire datasets.</p>
              <p class='b2'>Across the various data teams, collaboration among both systems and personnel was challenging. Data professionals already struggle with collaboration as teams are often siloed, their jobs historically being less about cross-pollination and more about urgency, but without the right tools to foster the teamwork needed, it just exacerbated the situation.</p></div>
              `,
            },
            {
              text: `
              <div><h4 class='h3 text-3.5'>A unified data lake and streamlined machine learning lifecycle</h4> <p class='b2'>With the Databricks unified data analytics platform, iteration and collaboration are no longer an issue as data engineering, data science and the analysts are able to more easily work on the data together.</p>
              <p class='b2'>Delta Lake solved their data reliability issues, allowing them to easily ingest real-time IOT data from various sources with ease. With data pipelines flowing seamlessly to the data science team, the data science team was able to more easily innovate with machine learning. MLflow streamlined the entire machine learning lifecycle, to ensure the best models make it to production.</p>
              <p class='b2'>“Before Databricks, I had no way to structure my data science research project. If I had a model and iterated 20 times, I would forget what the results for my first model were, so I would have to dig through so much,” said Siva Bommireddy, Data Scientist at StrongArm. “MLflow makes that easier to manage, and solves for the iterative nature of data science in general.”</p>
              <p class='b2'>The last group to benefit from the unification of data across the organization was the analyst team. Matt added that being able to produce results for non-technical teams has been incredibly fulfilling. “I can actually deliver results that make sense to all teams, data-specific or not, within 15 minutes,” he said. “Databricks has solved so many data use cases.”</p></div>`,
            },
            {
              text: `<div><h4 class='h3 text-3.5'>60% reduction in injury resulting in over $5M in cost savings</h4> <p class='b2'>StrongArm is now able to unlock insights from their sensor data, translating into new strategies their customers can employ to potentially improve workplace safety and the livelihoods of their employees.</p>
              <p class='b2'>After performing a deep dive analysis of one of their largest Fortune 100 customers, StrongArm measured a reduction of workplace injury by up to 60%, delivering a 355% ROI on $5,347,368 in gross savings. At the same time, StrongArm has been able to reduce the margin of error for evaluating injury risk from 23% to just 5%—an improvement of 78%.</p>
              <p class='b2'>“We are in the business of protecting the Industrial Athlete.,” explained Eadon. “Databricks allows us to unleash the power of data and machine learning to help workplaces become safer, more productive, and a better environment for tens of thousands of industrial workers that we count on in our own everyday lives.”</p></div>`,
            },
          ],
          ctaVideoBlockCustomer: [
            {
              image: {
                src: "/static/images/meet-databricks-video.png",
                alt: "image alt",
              },
              video: {
                src: "https://www.youtube.com/embed/lKqro_1i3Zs",
                title: "Embedded youtube",
              },
              content: `Behind the story: <span class='orange-06'>The Data Team Effect</span> Meet the great data team that’s behind Strongarm Tech
              Data teams are the united force that are solving the world’s toughest problems.`,
              cta: {
                to: "/",
                label: "Learn more",
              },
            },
          ],
          calloutRowCustomer: calloutRow,
        },
      }
    })
    this.get("/videoTranscriptData", () => {
      return {
        data: videoTranscriptData,
      }
    })
    this.get("/floatingBox", () => {
      return {
        data: floatingBox,
      }
    })
    this.get("/ctaRow", () => {
      return {
        data: ctaRow,
      }
    })
    this.get("/largePageHeader", () => {
      return {
        data: largePageHeader,
      }
    })
    this.get("/binarySelector", () => {
      return {
        data: binarySelector,
      }
    })
    this.get("/inPagestickyNavigation", () => {
      return {
        data: [
          {
            to: "/",
            text: "Community Login",
            variant: "secondary",
          },
          {
            to: "/",
            text: "Academy Login",
            variant: "primary",
          },
        ],
      }
    })
    this.get("/drawerCard", () => {
      return {
        data: drawerCard,
      }
    })
    this.get("/promoRow", () => {
      return {
        data: promoRow,
      }
    })
    this.get("/customerStoryTabs", () => {
      return {
        data: customerStoryTabs,
      }
    })
    this.get("/mediaPlayer", () => {
      return {
        data: mediaPlayer,
      }
    })
    this.get("/regionalCloudMap", () => {
      return {
        data: regionalCloudMap,
      }
    })
    this.get("/headerSection", () => {
      return {
        data: headerSection,
      }
    })
    this.get("/chooseDemo", () => {
      return {
        data: chooseDemo,
      }
    })
  },
})
