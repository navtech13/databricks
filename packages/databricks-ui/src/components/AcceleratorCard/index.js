import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import RichText from "../RichText"
import Badge from "../Badge"
import IconResolver from "../IconResolver"
import ModalForm from "./ModalForm"

const AcceleratorCard = ({
  badges,
  partner,
  content,
  href,
  image,
  lock,
  marketo,
}) => {
  let Component = marketo ? ModalForm : "a"
  Component = href || marketo ? Component : "div"
  const filteredBadges = badges.filter((badge) => badge)
  return (
    <div
      data-cy='AcceleratorCard'
      className='md:hover:border-b-orange-03 accelerator-card-form md:hover:shadow-shadow-2 shadow-shadow-1 group h-full min-h-[160px] w-full border-b-2 border-b-white bg-white transition-all delay-75 duration-75 ease-linear'
    >
      <Component
        className='flex h-full flex-col hover:no-underline'
        href={href}
        {...(marketo && { ...marketo, href })}
      >
        {image && (
          <div className='relative h-20 flex-shrink-0'>
            <Image
              className='h-full'
              imageOptions={{ className: "w-full h-full object-cover" }}
              {...image}
            />
            {lock && (
              <div className='bg-navy-800 absolute top-2 left-2 flex h-4 w-4 items-center justify-center rounded-full'>
                <IconResolver token='lock' className='w-2 text-white' />
              </div>
            )}
          </div>
        )}
        <div className='flex h-full flex-col items-start p-2'>
          <div className='flex w-full flex-row items-center justify-between'>
            <div className='flex flex-row items-center'>
              {!image &&
                (partner?.toLowerCase() === "databricks" ? (
                  <IconResolver token='acceleratorDb' className='mr-0.5' />
                ) : (
                  <IconResolver token='acceleratorPartner' className='mr-0.5' />
                ))}
              <RichText className='text-navy-06 text-1.25 font-mono font-medium uppercase opacity-70'>
                {partner}
              </RichText>
            </div>
            <div className='-rotate-45'>
              <IconResolver
                token='arrowRight'
                className='text-navy-02 transition-all delay-75 duration-75 ease-linear md:group-hover:text-orange-600'
              />
            </div>
          </div>
          <RichText className='b-4 text-navy-06 line-clamp-3 md:line-clamp-4 mt-1'>
            {content}
          </RichText>
          <div className='mt-2 flex flex-1 items-end'>
            <div className={`flex items-end ${image ? "flex-wrap gap-y-1" : ""}`}>
              {filteredBadges?.map((badge) => (
                <Badge key={badge} type={badge} />
              ))}
            </div>
          </div>
        </div>
      </Component>
    </div>
  )
}

AcceleratorCard.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.string),
  partner: PropTypes.string,
  content: PropTypes.string,
  href: PropTypes.string.isRequired,
  image: PropTypes.shape({}),
  lock: PropTypes.bool,
  marketo: PropTypes.shape({}),
}

AcceleratorCard.defaultProps = {
  partner: "",
  content: "",
  badges: [],
  image: undefined,
  lock: false,
  marketo: undefined,
}

export default AcceleratorCard
