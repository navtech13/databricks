const removeColonsMkto = (form) =>
  form
    ?.getFormElem()?.[0]
    ?.querySelectorAll("label.mktoLabel")
    ?.forEach((el) =>
      el?.childNodes?.forEach((node) => {
        if (node?.nodeType === 3 && node?.textContent) {
          node.textContent = node.textContent.replace(":", "")
        }
      })
    )

export default removeColonsMkto
