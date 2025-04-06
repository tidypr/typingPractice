export class User {
  // public id: string
  public name: string
  public score: number

  constructor(username: string, score: number) {
    // this.id = id
    this.name = username 
    this.score = score
  }
}