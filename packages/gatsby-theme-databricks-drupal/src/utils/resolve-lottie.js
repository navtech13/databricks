const resolveLottie = ({ entity }) => {
  if (!entity?.fieldMediaLottieFile) {
    return null
  }

  // Add support for client side preview
  // where gatsby is not available
  if (!entity.lottieFile) {
    return {
      animationSrc: entity.fieldMediaLottieFile.entity.url,
      loop: entity.fieldLoopAnimation,
      ariaLabel: entity.name,
    }
  }

  return {
    animationSrc: entity.lottieFile.publicURL,
    placeholderRatio: entity.placeholderRatio,
    loop: entity.fieldLoopAnimation,
    ariaLabel: entity.name,
  }
}

export default resolveLottie
