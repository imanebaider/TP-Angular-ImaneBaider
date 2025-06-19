import { Routes } from '@angular/router';
import { CatalogComponentComponent } from './catalog-component/catalog-component.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { ColliersPerlesComponent } from './colliers-perles/colliers-perles.component';
import { ColliersEmeraudeComponent } from './colliers-emeraude/colliers-emeraude.component';
import { ColliersOrComponent } from './colliers-or/colliers-or.component';
import { CartComponent } from './cart/cart.component';
import { ColliersDiamantComponent } from './colliers-diamant/colliers-diamant.component';
import { HomeComponent } from './home/home.component';
import { ParfumsComponent } from './parfums/parfums.component';
import { SacsComponent } from './sacs/sacs.component';
import { TalonsComponent } from './talons/talons.component';
import { RobeComponent } from './robe/robe.component';
import { ValidationComponent } from './validation/validation.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProductParfumsComponent } from './product-parfums/product-parfums.component';
import { DetailSacsComponent } from './detail-sacs/detail-sacs.component';
import { CommandeComponent } from './commande/commande.component';
import { StockComponent } from './stock/stock.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CommandeClientComponent } from './commande-client/commande-client.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponentComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'colliers-perles', component: ColliersPerlesComponent },
  { path: 'colliers-emeraude', component: ColliersEmeraudeComponent },
  { path: 'colliers-or', component: ColliersOrComponent },
  { path: 'colliers-diamant', component: ColliersDiamantComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'parfums', component: ParfumsComponent },
  { path: 'sacs', component: SacsComponent },
  { path: 'talons', component: TalonsComponent },
  { path: 'robes', component: RobeComponent },
  { path: 'validation', component: ValidationComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'parfums/:id', component: ProductParfumsComponent },
  { path: 'sacs/:id', component: DetailSacsComponent },
  { path: 'commande', component: CommandeComponent, canActivate: [AuthGuard] },
  { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent },
    { path: 'commande_client', component: CommandeClientComponent },

  { path: '**', redirectTo: '' }
];
