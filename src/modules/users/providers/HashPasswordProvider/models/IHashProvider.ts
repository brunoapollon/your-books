export default interface IHashProvider {
  generateHash(payloda: string): Promise<string>;
  compareHash(payloda: string, hashed: string): Promise<boolean>;
}
