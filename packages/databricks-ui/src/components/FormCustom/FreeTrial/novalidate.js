import React from "react"

export const novalidateCommunityEditionOnClick = () => {
  window.db_freetrial("action", "process_trial")
  window.db_freetrial("validate_type", "novalidate")
  window.db_freetrial("cloud", "CE")
}
