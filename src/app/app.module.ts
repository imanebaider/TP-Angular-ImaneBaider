// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // ضروري!
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // استيراد الروتس
import { LoginComponent } from './login/login.component';
import { CatalogComponentComponent } from './catalog-component/catalog-component.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // 👈 هنا التوجيهات
  ],
  
})
export class AppModule {}
