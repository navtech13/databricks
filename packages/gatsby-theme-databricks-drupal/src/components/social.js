import React from "react"
import PropTypes from "prop-types"
import { Social as SocialComponent } from "databricks-ui"

const Social = ({ url, children, ...props }) => {
  const items = [
    {
      to: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=&source=`,
      token: "linkedIn",
      label: "LinkedIn",
    },
    {
      to: `https://twitter.com/intent/tweet?text=${url}`,
      token: "twitter",
      label: "Twitter",
    },
    {
      to: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      token: "facebookRounded",
      label: "Facebook",
    },
  ]
  return (
    <SocialComponent items={items} {...props}>
      {children}
    </SocialComponent>
  )
}

Social.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
}

Social.defaultProps = {
  children: "Share this post",
}

export default Social
