interface Encryption {

  encrypt(clearText: string): Promise<string>;

  compare(clearText: string, encryptedText: string): Promise<boolean>;
}

export {Encryption};
