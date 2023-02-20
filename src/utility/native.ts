export const setNativeValue = (element: any, value: any) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, "value")!.set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    "value"
  )!.set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter!.call(element, value);
  } else {
    valueSetter!.call(element, value);
  }
};
