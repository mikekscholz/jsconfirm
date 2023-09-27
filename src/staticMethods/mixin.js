/**
 * Returns an extended version of `Jsc` containing `params` as defaults.
 * Useful for reusing Jsc configuration.
 *
 * For example:
 *
 * Before:
 * const textPromptOptions = { input: 'text', showCancelButton: true }
 * const {value: firstName} = await Jsc.fire({ ...textPromptOptions, title: 'What is your first name?' })
 * const {value: lastName} = await Jsc.fire({ ...textPromptOptions, title: 'What is your last name?' })
 *
 * After:
 * const TextPrompt = Jsc.mixin({ input: 'text', showCancelButton: true })
 * const {value: firstName} = await TextPrompt('What is your first name?')
 * const {value: lastName} = await TextPrompt('What is your last name?')
 *
 * @param {JsConfirmOptions} mixinParams
 * @returns {JsConfirm}
 */
export function mixin(mixinParams) {
  class MixinJsc extends this {
    _main(params, priorityMixinParams) {
      return super._main(params, Object.assign({}, mixinParams, priorityMixinParams))
    }
  }
  // @ts-ignore
  return MixinJsc
}
