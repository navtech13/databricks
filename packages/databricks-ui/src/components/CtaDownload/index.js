import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import RichText from "../RichText"

const CtaDownload = ({
  buttonLabel,
  downloadLink,
  linkCopyLabel,
  message,
  checksum,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(checksum)
    setCopied(true)
  }

  return (
    <>
      <Button
        as='a'
        href={downloadLink}
        download
        variant='primary'
        to={downloadLink}
      >
        {buttonLabel}
      </Button>
      <p className='mt-5'>
        <a
          className='text-2.5 text-navy-06 hover:no-underline'
          role='link'
          onClick={handleCopy}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCopy()
            }
          }}
          tabIndex='0'
        >
          {linkCopyLabel}
        </a>
      </p>
      {copied && <RichText>{message}</RichText>}
    </>
  )
}

CtaDownload.propTypes = {
  buttonLabel: PropTypes.string,
  checksum: PropTypes.string.isRequired,
  downloadLink: PropTypes.string.isRequired,
  linkCopyLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

CtaDownload.defaultProps = {
  buttonLabel: "Download",
}

export default CtaDownload
