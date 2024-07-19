import { Component, OnInit } from '@angular/core';
import { CommandeService} from "../../services/commande.service";
import { Commande} from "../../models/commande/commande.module";
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, CommonModule],
  providers: [CommandeService]
})
export class OrdersComponent implements OnInit{
  orders!: Commande[];

  cols!: Column[];

  constructor(private commandeService: CommandeService) {}

  ngOnInit() {
     this.commandeService.getOrders().subscribe(res => { this.orders = res; });


    this.cols = [
      { field: 'adresse', header: 'Adresse' },
      { field: 'email', header: 'Email' },
      { field: 'listeProduits', header: 'Liste Produits' },
      { field: 'number', header: 'number' },
      { field: 'paiement', header: 'paiement' },
      { field: 'prixtotale', header: 'prixtotale' }
    ];
  }

}
