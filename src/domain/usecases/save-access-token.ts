export interface SaveAccessToken {
  save: (accessTokes: string) => Promise<void> | void;
}
