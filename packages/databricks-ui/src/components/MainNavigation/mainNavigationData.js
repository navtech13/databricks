import React from "react"
import PromotionBlock from "../PromotionBlock"

const promotionBlock = {
  cta: {
    to: "/",
    text: "Find out more",
    label: "Get Bill Inmon's latest book",
  },
  image: {
    src: "/static/images/Lakehouse-for-Financial-Services-Ad.jpg",
    alt: "Bill Inmon",
  },
  content:
    "<p>Explore the next generation of data architecture with the father of the data warehouse, Bill Inmon.</p>",
}

const mainNavigation = {
  image: {
    desktop: { src: "/static/images/db-nav-logo.svg" },
    mobile: { src: "/static/images/db-nav-mobile-logo.svg" },
    to: "/",
    alt: "go to homepage",
  },
  menus: [
    {
      divider: true,
      links: [
        {
          label: "Platform",
          to: "/",
          links: [
            {
              label: null,
              to: null,
              links: [
                {
                  label: "The Databricks Lakehouse Platform",
                  to: "/",
                  links: [
                    {
                      label: "Delta Lake",
                      to: "/",
                    },
                    {
                      label: "Data Engineering",
                      to: "/",
                    },
                    {
                      label: "Machine Learning",
                      to: "/",
                    },
                    {
                      label: "Data Science",
                      to: "/",
                    },
                    {
                      label: "SQL Analytics",
                      to: "/",
                    },
                    {
                      label: "Platform Security and Administration",
                      to: "/",
                    },
                  ],
                },
                {
                  label: "Pricing",
                  to: "/",
                },
                {
                  label: "Open source tech",
                  to: "/",
                },
              ],
            },
            {
              items: [
                <PromotionBlock
                  className='lg:block'
                  key={promotionBlock.content}
                  cta={promotionBlock.cta}
                  image={promotionBlock.image}
                >
                  {promotionBlock.content}
                </PromotionBlock>,
              ],
            },
          ],
        },
        {
          label: "Solutions",
          to: "/",
          links: [
            {
              label: null,
              to: null,

              links: [
                {
                  label: "By Industry",
                  to: "/",
                },
                {
                  label: "By Use Case",
                  to: "/",
                },
                {
                  label: "By Role",
                  to: "/",
                },
                {
                  label: "Professional Services",
                  to: "/",
                },
              ],
            },
            {
              items: [
                <PromotionBlock
                  className='lg:block'
                  key={promotionBlock.content}
                  cta={promotionBlock.cta}
                  image={promotionBlock.image}
                >
                  {promotionBlock.content}
                </PromotionBlock>,
              ],
            },
          ],
        },
        {
          label: "Learn",
          to: "/",
          links: [
            {
              label: null,
              to: null,

              links: [
                {
                  label: "Documentation",
                  to: "/",
                },
                {
                  label: "Training & Certification",
                  to: "/",
                },
                {
                  label: "Notebook Gallery",
                  to: "/",
                },
                {
                  label: "Demos",
                  to: "/",
                },
                {
                  label: "Resources",
                  to: "/",
                },
                {
                  label: "Online Community",
                  to: "/",
                },
                {
                  label: "University Alliance",
                  to: "/",
                },
              ],
            },
            {
              label: null,
              to: null,
              links: [
                {
                  label: "Events",
                  to: "/",
                },
                {
                  label: "Data + AI Summit",
                  to: "/",
                },
                {
                  label: "Blog",
                  to: "/",
                },
                {
                  label: "Research",
                  to: "/",
                },
                {
                  label: "Labs",
                  to: "/",
                },
                {
                  label: "Beacons",
                  to: "/",
                },
              ],
            },
            {
              items: [
                <PromotionBlock
                  className='lg:block'
                  key={promotionBlock.content}
                  cta={promotionBlock.cta}
                  image={promotionBlock.image}
                >
                  {promotionBlock.content}
                </PromotionBlock>,
              ],
            },
          ],
        },
        {
          label: "Customers",
          to: "/",
        },
        {
          label: "Partners",
          to: "/",
          links: [
            {
              label: null,
              to: null,

              links: [
                {
                  label: "Cloud Partners",
                  to: "/",
                  links: [
                    {
                      label: "AWS",
                      to: "/",
                    },
                    {
                      label: "Azure",
                      to: "/",
                    },
                    {
                      label: "Google Cloud",
                      to: "/",
                    },
                  ],
                },
                {
                  label: "Partner Connect",
                  to: "/",
                },
                {
                  label: "Technology Partners",
                  to: "/",
                  links: [
                    {
                      label: "Technology Partner Program",
                      to: "/",
                    },
                  ],
                },
                {
                  label: "Consulting & SI Partners",
                  to: "/",
                },
              ],
            },
            {
              items: [
                <PromotionBlock
                  className='lg:block'
                  key={promotionBlock.content}
                  cta={promotionBlock.cta}
                  image={promotionBlock.image}
                >
                  {promotionBlock.content}
                </PromotionBlock>,
              ],
            },
          ],
        },
        {
          label: "Company",
          to: "/",
          links: [
            {
              label: null,
              to: null,

              links: [
                {
                  label: "About Us",
                  to: "/",
                },
                {
                  label: "Careers at Databricks",
                  to: "/",
                },
                {
                  label: "Our Team",
                  to: "/",
                },
                {
                  label: "Board of Directors",
                  to: "/",
                },
                {
                  label: "Company Blog",
                  to: "/",
                },
                {
                  label: "Newsroom",

                  to: "/",
                },
                {
                  label: "Databricks Ventures",
                  to: "/",
                },
                {
                  label: "Contact Us",
                  to: "/",
                },
              ],
            },
            {
              items: [
                <PromotionBlock
                  className='lg:block'
                  key={promotionBlock.content}
                  cta={promotionBlock.cta}
                  image={promotionBlock.image}
                >
                  {promotionBlock.content}
                </PromotionBlock>,
              ],
            },
          ],
        },
      ],
    },
    {
      links: [
        {
          label: "Try databricks",
          to: "/",
          type: "button",
        },
        {
          label: "Watch Demos",
          to: "/",
          type: "text",
        },
        {
          label: "Contact us",
          to: "/",
          type: "text",
        },
        {
          label: "Login",
          to: "/",
          type: "text",
        },
      ],
    },
  ],
}

export default mainNavigation
