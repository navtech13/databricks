function getResourceCampaignIdbyNodeId(tracks, nodeId) {
  let campaignId
  Object.values(tracks).forEach((track) => {
    track?.resources?.forEach((resource) => {
      if (resource?.id === nodeId && resource?.campaignId) {
        campaignId = resource?.campaignId
      }
    })
  })

  return campaignId
}

function getResourceTrack(tracks, id) {
  const track = Object.keys(tracks).find((key) => {
    const { resources } = tracks[key]
    const target = resources?.find((item) => item?.id === id)

    return !!target
  })

  return track ? tracks[track] : {}
}

module.exports.getResourceCampaignIdbyNodeId = getResourceCampaignIdbyNodeId
module.exports.getResourceTrack = getResourceTrack
