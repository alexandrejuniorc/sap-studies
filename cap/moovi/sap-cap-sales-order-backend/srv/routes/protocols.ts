import { Request } from '@sap/cds';

export type FullRequestParameters<T> = Request & { results: T };
