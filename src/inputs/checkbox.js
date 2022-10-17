import {
  outer,
  inner,
  help,
  boxHelp,
  messages,
  message,
  prefix,
  suffix,
  fieldset,
  decorator,
  box,
  icon,
  legend,
  boxOption,
  boxOptions,
  boxWrapper,
  boxLabel,
  options,
  checkboxes,
  $if,
  $extend,
  defaultIcon,
  createSection
} from '@formkit/inputs'

const other = createSection('other', () => ({
  $el: 'input',
  attrs: {
    onInput: '$handlers.setOther',
    disabled: '$fns.isChecked($option.value) === false',
    value: '$otherValue'
  }
}))

function allowOther(node) {
  node.addProps(['allowOther', 'otherValue'])
  node.on('created', () => {
    if (!node.props.allowOther) return
    
    // Add a listener so when the 'otherValue' changes
    // our option’s value gets updated to match.
    node.on('prop:otherValue', ({ payload }) => {
      const otherOption = node.props.options.find(option => option.isOther)
      const valueIndex = node._value.indexOf(otherOption.value)
      otherOption.value = payload
      node._value.splice(valueIndex, 1, payload)
      node.input(node._value)
    })
    
    // Inject our "other" option
    node.props.options.push({
      value: '',
      label: 'Other',
      isOther: true
    })
    
    // Add an input handler for the other input
    node.context.handlers.setOther = (e) => {
      node.props.otherValue = e.target.value
    }
  })
}

/**
 * Input definition for a checkbox(ess).
 * @public
 */
export const customCheckbox = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    $if(
      '$options == undefined',
      /**
       * Single checkbox structure.
       */
      boxWrapper(
        inner(prefix(), box(), decorator(icon('decorator'))),
        $if('$label', boxLabel('$label')),
      ),
      /**
       * Multi checkbox structure.
       */
      fieldset(
        help('$help'),
        boxOptions(
          boxOption(
            boxWrapper(
              inner(
                prefix(),
                $extend(box(), {
                  bind: '$option.attrs',
                  attrs: {
                    id: '$option.attrs.id',
                    value: '$option.value',
                    checked: '$fns.isChecked($option.value)',
                  },
                }),
                decorator(icon('decorator')),
              ),
              $if('$option.label', boxLabel('$option.label')),
              $if('$option.isOther', other())
            ),
            boxHelp('$option.help'),
          )
        )
      )
    ),
    // Help text only goes under the input when it is a single.
    $if('$options == undefined && $help', help('$help')),
    messages(message('$message.value'))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'box',
  /**
   * An array of extra props to accept for this input.
   */
  props: ['options', 'onValue', 'offValue', 'optionsLoader'],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'checkbox',
  /**
   * Additional features that should be added to your input
   */
  features: [
    options,
    checkboxes,
    defaultIcon('decorator', 'checkboxDecorator'),
    allowOther
  ],
}
