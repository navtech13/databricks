import PropTypes from "prop-types"
import React from "react"
import CollapseList from "../CollapsingList/CollapseList"
import SideImageCards from "../SideImageCards/SideImageCards"

function LeftAlignedSubParent({ searchedBool }) {
  return (
    <div>
      {searchedBool && <CollapseList />}
      <SideImageCards />
    </div>
  )
}

LeftAlignedSubParent.propTypes = {
  searchedBool: PropTypes.bool.isRequired,
}

export default LeftAlignedSubParent
