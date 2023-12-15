import React from "react"
import PropTypes from "prop-types"
import Tippy from "@tippyjs/react"
import Grid from "../../Grid"
import Tile from "./Tile"
import "tippy.js/dist/tippy.css"

const PricingTiles = ({ tiles }) => {
  if (tiles.length == 0) {
    return (
      <div className='h5 text-orange-04 border bg-white p-2.5'>
        This product is not available in the selected plan, on the selected cloud.
      </div>
    )
  }

  return (
    <Grid columns={3} gap={3}>
      {tiles?.map(
        ({ title, subtitle, description, eyebrow, price, disclaimer, cta }) => {
          // vector search tiles always use hour as unit, rest use DBU
          const unit =
            title === "Vector Search" ? (
              <span className='ml-1 inline-block'>
                / <span className='text-orange-04 text-3.5 ml-1'>hour</span>
              </span>
            ) : (
              <span className='ml-1 inline-block'>
                /{" "}
                <Tippy
                  content={
                    <span>
                      <strong>Databricks Unit (DBU)</strong>
                      <p>
                        A Databricks Unit (DBU) is a normalized unit of processing
                        power on the Databricks Lakehouse Platform used for
                        measurement and pricing purposes. The number of DBUs a
                        workload consumes is driven by processing metrics, which may
                        include the compute resources used and the amount of data
                        processed.
                      </p>
                    </span>
                  }
                >
                  <span className='text-orange-04 text-3.5 ml-1'>DBU</span>
                </Tippy>
              </span>
            )

          return (
            <Tile
              key={`${title}-${price}`}
              eyebrow={eyebrow}
              price={price}
              disclaimer={disclaimer}
              title={title}
              subtitle={subtitle}
              description={description}
              cta={cta}
              unit={unit}
            />
          )
        }
      )}
    </Grid>
  )
}

PricingTiles.propTypes = {
  tiles: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    eyebrow: PropTypes.string,
    price: PropTypes.string,
    disclaimer: PropTypes.string,
    cta: PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PricingTiles
