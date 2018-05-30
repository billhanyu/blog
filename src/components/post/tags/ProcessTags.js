export function addFilterTag(tag, lastSelected) {
  const selected = lastSelected.slice();
  if (!selected.includes(tag)) {
    selected.push(tag);
  }
  return selected;
}

export function removeFilterTag(tag, lastSelected) {
  const selected = lastSelected.slice();
  const index = selected.indexOf(tag);
  selected.splice(index, 1);
  return selected;
}
