

export const isObject = (value: unknown): boolean =>
  typeof value === 'object'
  &&  value !== null
  &&  !Array.isArray(value)
  &&  !(value instanceof Map)
  &&  !(value instanceof Set)

export const isPrimitive = (value: unknown): boolean =>
  typeof value !== 'object'
  &&  typeof value !== 'function'
  || (
    typeof value === 'object'
    && !value
  )

export function assignDefaultPropertiesDeep<T, E>(target: T, source: E): T & E {
  for (const [key, value] of Object.entries(source)) {
    if (!(key in target)) {
      // @ts-ignore
      target[key] = value
    } else if (isObject(value)) {
      // @ts-ignore
      if (!isObject(target[key])) {
        // @ts-ignore
        target[key] = {}
      }
      // @ts-ignore
      assignDefaultPropertiesDeep(target[key], source[key])
    }
  }
  // @ts-ignore
  return target
}