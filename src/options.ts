
export interface IsEmptyOptions {
  treatBooleanAsNonEmpty?: boolean;
  treatSpaceAsEmpty?: boolean;
  treatZeroAsEmpty?: boolean;
  treatNumericStringsAsNumbers?: boolean;
  testArraysRecursively?: boolean;
  testFunctionsBody?: boolean;
}

export let defaultOptions: IsEmptyOptions = {
  treatBooleanAsNonEmpty: true,
  treatSpaceAsEmpty: true,
  treatZeroAsEmpty: true,
  treatNumericStringsAsNumbers: true,
  testArraysRecursively: true,
  testFunctionsBody: false,
};

export let globalOptions: Partial<IsEmptyOptions> = {};

export function setGlobalOptions(options: Partial<IsEmptyOptions>): void {
  globalOptions = options;
}
