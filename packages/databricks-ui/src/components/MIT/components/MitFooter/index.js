import React from "react"
import logo from "./assets/logo-databricks-black.png"
import mit from "./assets/mit.svg"

const MitFooter = () => {
  return (
    <section className='bg-gray-warm-light border-t border-[#dce0e2]'>
      <div className='mx-auto max-w-[508px] md:max-w-[704px] lg:max-w-[966px] xl:max-w-[1146px]'>
        <div className='mx-2 py-5 md:mx-0'>
          <div className='flex items-center justify-between'>
            <img className='h-12 w-20' src={mit} alt='MIT' />
            <img className='w-25 h-4' src={logo} alt='Logo Databricks' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MitFooter
