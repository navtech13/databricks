import React, { useState } from "react"
import PropTypes from "prop-types"
import { Document, Page, pdfjs } from "react-pdf"
import { Button, Image, Link, LoadingSpinner } from "databricks-ui"
import ZoomOutIcon from "./assets/icon-zoom-out.svg"
import ZoomInIcon from "./assets/icon-zoom-in.svg"
import DownloadIcon from "./assets/download.svg"
import { useWindowSize } from "../../hooks/useScreenSize"
import useTranslate from "../../../../gatsby-theme-databricks-drupal/src/utils/translate"
import { downloadFromUrl } from "../../../../gatsby-theme-databricks-drupal/src/utils/downloadAsset"

export function EmbedPdf({ src, fallbackLabel }) {
  const [numPages, setNumPages] = useState(null)
  const [pageScale, setPageScale] = useState(1.0)
  const { width } = useWindowSize()
  const { translate } = useTranslate()

  const url = `${process.env.GATSBY_DEPLOY_URL}${src}#navpanes=0`
  const isDesktop = width > 1346

  if (isDesktop) {
    return (
      <object data={url} width='100%' height='100%' type='application/pdf'>
        <Button as={Link} variant='primary' to={src}>
          {fallbackLabel}
        </Button>
      </object>
    )
  }

  const Loader = <LoadingSpinner className='min-h-[32rem]' />

  if (!pdfjs || width === 0) {
    return Loader
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

  const onDocumentLoadSuccess = (document) => {
    setNumPages(document.numPages)
  }

  const changePageScale = (scale) => {
    setPageScale((prevPageScale) => prevPageScale + scale)
  }

  const pdfSize = width <= 950 ? width : 950
  const pages = [...Array(numPages).keys()].map((page) => (
    <Page
      key={page}
      pageNumber={page + 1}
      scale={pageScale}
      width={pdfSize}
      renderAnnotationLayer={false}
      renderTextLayer={false}
      className='flex justify-center'
    />
  ))

  return (
    <div className='flex min-h-[32rem] flex-col overflow-scroll pb-0 xl:min-h-[100%]'>
      <div className='px-1.6 flex flex-row justify-end py-2'>
        <div className='flex items-center'>
          <button
            type='button'
            className='disabled:opacity-50'
            onClick={() => changePageScale(0.1)}
            aria-label='zoom-in'
            disabled={pageScale >= 1.3}
          >
            <Image src={ZoomInIcon} />
          </button>
          <button
            type='button'
            className='ml-2 disabled:opacity-50'
            onClick={() => changePageScale(-0.1)}
            aria-label='zoom-out'
            disabled={pageScale <= 0.8}
          >
            <Image src={ZoomOutIcon} />
          </button>
          <button
            type='button'
            onClick={() => downloadFromUrl(src)}
            className='ml-5'
            aria-label='download'
          >
            <Image src={DownloadIcon} />
          </button>
        </div>
      </div>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={Loader}
        error={
          <p className='text-navy-02 flex min-h-[32rem] items-center justify-center'>
            {translate("pdf.error")}
          </p>
        }
        externalLinkTarget='_blank'
        renderMode='canvas'
        className='max-h-[90vh] min-h-[32rem] w-[100%] overflow-scroll'
      >
        {numPages && <>{pages}</>}
      </Document>
    </div>
  )
}

EmbedPdf.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackLabel: PropTypes.string,
}

EmbedPdf.defaultProps = {
  fallbackLabel: "Download",
}

export default EmbedPdf
