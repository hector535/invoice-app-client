export const classnames = (...args: any[]) => {
  const result = [] as string[];

  args.forEach((arg) => {
    if (typeof arg === "string") {
      result.push(arg);
    } else if (typeof arg === "object") {
      Object.keys(arg).forEach((key: any) => {
        if (typeof arg[key] === "boolean" && arg[key]) {
          result.push(key);
        }
      });
    }
  });

  return result.join(" ");
};
