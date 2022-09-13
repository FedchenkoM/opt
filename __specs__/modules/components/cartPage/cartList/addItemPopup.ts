import { Component } from "@Core/component";

type PopupInputFillField = "quantity" | "price" | "name";

const SELECTORS = {
  name: './/input[@name="name"]',
  price: './/input[@name="price"]',
  quantity: './/input[@name="quantity"]',

  quantityError: './/div[@class="error" and contains(text(),"This field should be greater or equal then 1" )]',

  createButton: './/button[contains(text(), "Создать")]'
}

export class AddItemPopup extends Component {

  public async getName(): Promise<string> {
    const [nameElement] = await this.element.waitForXpath(SELECTORS.name);
    return nameElement.getAttribute('value');
  }

  public async getPrice(): Promise<number> {
    const [nameElement] = await this.element.waitForXpath(SELECTORS.price);
    return Number(nameElement.getAttribute('value'));
  }

  public async getQuantity(): Promise<number> {
    const [nameElement] = await this.element.waitForXpath(SELECTORS.quantity);
    return Number(nameElement.getAttribute('value'));
  }

  public async fillPopupInput(fieldName: PopupInputFillField, fieldValue: string): Promise<void> {
    const [input] = await this.element.waitForXpath(SELECTORS[fieldName]);
    input.setAttribute('value', fieldValue);
  }

  public async clickCreateButton(): Promise<void> {
    await this.element.clickByXpath(SELECTORS.createButton);
  }

  public async getErrorMessage(): Promise<string> {
    const [errorMessage] = await this.element.waitForXpath(SELECTORS.quantityError)
    return errorMessage.textContent;
  }
}