export interface ICars {
  items: any[];
}

export default class TestService {

  static getItems(): Promise<ICars> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          items: [
            {name: "Ford", model: "Focus"},
            {name: "BMW", model: "X5"},
            {name: "Fiat", model: "500"}
          ]
        });
      }, 1000);
    });
  }
}
