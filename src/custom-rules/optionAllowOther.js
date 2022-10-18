export default function optionAllowOther(node){
  if(!node.props.allowOther) return true;
  const otherOption = node.props.options.find(option => option.isOther);
  
  // Check if the other option is included in the value array:
  const otherValueIndex = node.value.indexOf(otherOption.value)
  if (otherValueIndex !== -1) {
    // In this case the "other" option is checked, so make sure it isnt
    // an empty string
    return node.value[otherValueIndex].trim() !== ''
  }
  
  return true
}