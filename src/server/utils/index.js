
const reducer = (selections, initial) => {
  return selections.reduce((projs, selection) => {
    if (selection.kind === 'InlineFragment') {
      return {
        ...projs,
        ...reducer(selection.selectionSet.selections, {})
      }
    }

    return {
      ...projs,
      [selection.name.value]: 1
    }
  }, initial)
}

export function getProjections (fieldASTs) {
  const { selections } = fieldASTs.selections
  return reducer(selections)
}
