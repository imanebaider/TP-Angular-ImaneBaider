export class Product {
  public selected: boolean;
  public originalStock?: number;
  public discountPrice?: number;
  public promotionEndTime?: Date;

  // Constructeur de la classe Product
  constructor(
    public productId: number,
    public productTitle: string,
    public productPrice: number,
    public quantity: number,
    public description: string,
    public imageUrl: string[],
    public rating: number = 0,
    public type: string,
    discountPrice?: number,
    selected: boolean = true,
    originalStock?: number,          // براميطر جديد اختياري
  ) {
    this.selected = selected;
    this.originalStock = originalStock;  // تخزين البراميطر في الخاصية
  }
  

  // Méthode pour afficher les informations du produit sous forme de chaîne
  public printProduct(): string {
    return `Product ID: ${this.productId}, Title: ${this.productTitle}, Price: ${this.productPrice}`;
  }

  // Méthodes pour obtenir les différentes informations du produit
  public getProductId(): number {
    return this.productId; // Retourne l'identifiant du produit
  }

  public getProductTitle(): string {
    return this.productTitle; // Retourne le titre du produit
  }

  public getProductPrice(): number {
    return this.productPrice; // Retourne le prix du produit
  }

  public getQuantity(): number {
    return this.quantity; // Retourne la quantité disponible du produit
  }

  public getDescription(): string {
    return this.description; // Retourne la description du produit
  }

  // Méthode pour obtenir les images du produit
  public getImageUrl(): string[] {
    return this.imageUrl; // Retourne le tableau des URL des images du produit
  }

  // Méthode pour définir les images du produit
  public setImageUrl(imageUrl: string[]): void {
    this.imageUrl = imageUrl; // Met à jour les URL des images du produit
  }

  // Méthode pour définir la quantité du produit
  public setQuantity(quantity: number): void {
    this.quantity = quantity; // Met à jour la quantité du produit
  }

  // Méthode pour définir la description du produit
  public setDescription(description: string): void {
    this.description = description; // Met à jour la description du produit
  }

  // Méthode pour définir la note (évaluation) du produit
  public setRating(rating: number): void {
    this.rating = rating; // Met à jour la note du produit
  }

  // Méthode pour obtenir la note (évaluation) du produit
  public getRating(): number {
    return this.rating; // Retourne la note du produit
  }

}
