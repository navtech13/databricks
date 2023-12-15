const descriptionMove = (formElem, range) => {
  let counter = range[0]
  while (counter <= range[1]) {
    const descElems =
      formElem[0].children[counter + 1].querySelectorAll(".mktoFieldWrap")

    const fieldElems = formElem[0].children[counter].querySelectorAll(
      ".mktoFieldDescriptor.mktoFormCol"
    )

    descElems.forEach((elem, index) => {
      fieldElems[index].appendChild(elem.cloneNode(true))
      elem.parentElement.remove()
    })
    counter = counter + 2
  }
}

export default descriptionMove
